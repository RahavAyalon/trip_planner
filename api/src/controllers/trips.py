from ..utils.cache import get_cached_response, set_response_in_cache
from ..utils.history import update_history
from ..utils.validator import validate_prompt_input, validate_prompt_injection
from ..utils.context import context
from ..utils.tools import tools
from src.utils.logger import logger

from dotenv import load_dotenv
import openai
import json
import os

load_dotenv()

client = openai.OpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
)


def plan_trip_controller(prompt):
    logger.info(prompt)
    if not validate_prompt_injection(prompt):
        logger.warning("Prompt injection attempt detected for prompt: " + prompt)
        return {"error": "Prompt injection attempt detected", "status_code": 403}

    messages = [
        {"role": "system", "content": context},
        {"role": "user", "content": prompt}
    ]

    response = client.chat.completions.create(
        model=os.getenv("OPENAI_MODEL"),
        messages=messages,
        tools=tools,
        tool_choice="auto",
    )
    logger.info(str(response.choices))
    cache_key = prompt
    cached_response = get_cached_response(cache_key)
    if cached_response:
        return json.loads(cached_response)

    tool_calls = response.choices[0].message.tool_calls
    if tool_calls:
        for tool_call in tool_calls:
            function_args = json.loads(tool_call.function.arguments)
            if validate_prompt_input(location=function_args.get("location"),
                                     budget=function_args.get("budget"),
                                     duration=function_args.get("duration")):
                function_response = json.dumps({
                    "location": function_args.get("location"),
                    "budget": function_args.get("budget"),
                    "duration": function_args.get("duration"),
                    "concept": function_args.get("concept")
                })
                messages.append({
                    "role": "function",
                    "tool_call_id": tool_call.id,
                    "name": tool_call.function.name,
                    "content": function_response
                })

        enriched_response = client.chat.completions.create(
            model=os.getenv("OPENAI_MODEL"),
            messages=messages,
        )
        logger.info(str(enriched_response))
        set_response_in_cache(cache_key, json.dumps(enriched_response.choices[0].message.model_dump()))
        update_history(prompt, enriched_response)
        return enriched_response.choices[0].message.model_dump()
    return {"content": response.choices[0].message.content} # lacking info
