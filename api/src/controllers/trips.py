from ..utils.cache import get_cached_response, set_response_in_cache
from ..utils.validator import validate_prompt_input, validate_prompt_injection
from ..utils.context import context
from ..utils.tools import tools

from fastapi import HTTPException
from dotenv import load_dotenv
import openai
import json
import os

load_dotenv()

client = openai.OpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
)


def load_history(file_path):
    if os.path.exists(file_path):
        with open(file_path, 'r') as file:
            return json.load(file)
    else:
        return []

def save_history(file_path, history):
    with open(file_path, 'w') as file:
        json.dump(history, file)


def update_history(prompt, response, file_path='chat_history.json'):
    # Load existing history from JSON file
    history = load_history(file_path)

    # Append new interaction and ensure history does not exceed five entries
    new_interaction = {"request": prompt, "plan": response.choices[0].message.content}
    history.append(new_interaction)
    if len(history) > 5:
        history.pop(0)  # Remove the oldest interaction

    # Save updated history back to JSON file
    save_history(file_path, history)

def plan_trip_controller(prompt):
    if not validate_prompt_injection(prompt):
        # TODO should be saved in history?
        raise HTTPException(status_code=403, detail="Prompt injection attempt detected")

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
    cache_key = prompt # TODO
    cached_response = get_cached_response(cache_key)
    if cached_response:
        # update_history(prompt, response)
        return json.loads(cached_response)

    tool_calls = response.choices[0].message.tool_calls
    if tool_calls:
        for tool_call in tool_calls:
            function_args = json.loads(tool_call.function.arguments)
            if validate_prompt_input(location=function_args.get("location"),
                                     budget=function_args.get("budget"),
                                     duration=function_args.get("duration")) is False:

                set_response_in_cache(cache_key, json.dumps({"error": response}))
                update_history(prompt, response)
                return {"content": response}
            else:
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

        set_response_in_cache(cache_key, json.dumps(enriched_response.choices[0].message.model_dump()))
        update_history(prompt, enriched_response)
        return enriched_response.choices[0].message.model_dump()
    return {"content": response.choices[0].message.content} # lacking info
