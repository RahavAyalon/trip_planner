tools = [
    {
        "type": "function",
        "function": {
            "name": "extract_trip_info",
            "description": "Get the trip information from the body of the input text.",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {
                        "type": "string",
                        "description": "The destination city or state for the trip, e.g. San Francisco, CA",
                    },
                    "budget": {
                        "type": "string",
                        "description": "The budget for the trip, e.g. 2000$, one thousand dollars",
                    },
                    "duration": {
                        "type": "string",
                        "description": "The duration of the trip, e.g. three days, 5 weeks",
                    },
                    "concept": {
                        "type": "string",
                        "description": "The concept of the trip, e.g. romantic, friends, family",
                    },
                },
                "required": [],
            },
        }
    }
]
