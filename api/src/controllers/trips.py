from fastapi import HTTPException
from ..models.prompt import Prompt
from ..utils.tools import tools
from ..utils.validator import validate_prompt_input, validate_prompt_injection
from ..utils.context import context
import json
import openai
import os

client = openai.OpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
)


def plan_trip_controller(prompt):
    if not validate_prompt_injection(prompt):
        raise HTTPException(status_code=403, detail="Prompt injection attempt detected")

    messages = [
        {"role": "system", "content": context},
        {"role": "user", "content": prompt}
    ]

    response = client.chat.completions.create(
        model="gpt-3.5-turbo-0125",
        messages=messages,
        tools=tools,
        tool_choice="auto",
    )

    tool_calls = response.choices[0].message.tool_calls
    if tool_calls:
        for tool_call in tool_calls:
            function_args = json.loads(tool_call.function.arguments)
            if validate_prompt_input(location=function_args.get("location"),
                                         budget=function_args.get("budget"),
                                         duration=function_args.get("duration")) is False:
                return json.dumps({"error": "Invalid input"})
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
            model="gpt-3.5-turbo-0125",
            messages=messages,
        )
        return enriched_response.choices[0].message.model_dump()