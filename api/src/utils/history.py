import json
import os


def load_history(file_path):
    if os.path.exists(file_path):
        with open(file_path, 'r') as file:
            return json.load(file)
    else:
        return []


def save_history(file_path, history):
    with open(file_path, 'w+') as file:
        json.dump(history, file)


def update_history(prompt, response, file_path='chat_history.json'):
    history = load_history(file_path)

    new_interaction = {"request": prompt, "plan": response.choices[0].message.content}
    history.insert(__index=0, __object=new_interaction)
    if len(history) > 5:
        history.pop()

    save_history(file_path, history)
