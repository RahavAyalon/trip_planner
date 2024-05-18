from dotenv import load_dotenv
import openai
import json
import os

from ..utils.validator import validate_prompt_input, validate_prompt_injection
from ..utils.cache import get_cached_response, set_response_in_cache
from ..utils.history import update_history
from ..utils.context import context
from ..utils.logger import logger
from ..utils.tools import tools


load_dotenv()

client = openai.OpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
    max_retries=3,
    timeout=10
)


def send_query_to_ai(messages, openai_tools=None, tool_choice=None):
    try:
        return client.chat.completions.create(
            model=os.getenv("OPENAI_MODEL"),
            messages=messages,
            tools=openai_tools,
            tool_choice=tool_choice,
        )
    except Exception as e:
        logger.error("OpenAI API call failed: {}".format(str(e)))
        return None


def add_structured_query_to_messages(tool_call, messages):
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


def plan_trip_controller(prompt):
    logger.info(prompt)
    if not validate_prompt_injection(prompt):
        logger.warning("Prompt injection attempt detected for prompt: " + prompt)
        return {"error": "Prompt injection attempt detected", "status_code": 403}

    cached_response = get_cached_response(prompt)
    if cached_response:
        return json.loads(cached_response)

    messages = [
        {"role": "system", "content": context},
        {"role": "user", "content": prompt}
    ]
    response = send_query_to_ai(messages=messages, openai_tools=tools, tool_choice="auto")
    if not response:
        return {"error": "OpenAI Service Unreachable", "status_code": 503}
    logger.info(str(response.choices))

    tool_calls = response.choices[0].message.tool_calls
    if not tool_calls:
        return {"content": response.choices[0].message.content}  # Trip information is missing

    add_structured_query_to_messages(tool_calls[0], messages)
    enriched_response = send_query_to_ai(messages=messages)
    if not response:
        return {"error": "OpenAI Service Unreachable", "status_code": 503}

    logger.info(str(enriched_response))
    set_response_in_cache(prompt, json.dumps(enriched_response.choices[0].message.model_dump()))
    update_history(prompt, enriched_response)
    return enriched_response.choices[0].message.model_dump()
