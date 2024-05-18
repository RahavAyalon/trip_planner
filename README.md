## AI TRIP PLANNER ##

### Overview ###

Trip Planner is a LLM-based travel planner app, with prompt engineering guardrails.
The app receives a natural language request to plan a specific trip, makes sure it’s valid and safe and returns an up to
3 lines of trip plan in natural language.

[![Demo CountPages alpha](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXZnMjVtZm83eXczcWY2NGN4a3FnMG81ZXh4cjVhanFoNGdtYnA1ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dgIGW95eulWfKFQk0G/giphy.gif
)](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXZnMjVtZm83eXczcWY2NGN4a3FnMG81ZXh4cjVhanFoNGdtYnA1ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dgIGW95eulWfKFQk0G/giphy.gif
)

The program consists of two microservices (Each one has a designated README.md):
- api (backend)
- client (frontend)


# Future Improvements

- Session Management: will allow each user to view only its history using a designated DB (for example,
  MongoDB) to store each user's data and metadata. (Initial implementation of cookies for auth exists)
- Improved prompt injection detection: Some queries which include prompt injection are not detected by llm-guard,
  or using Hugging Face models. 
- Allow the user conversation with the bot rather than a one-shot message.
