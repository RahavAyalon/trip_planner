## AI TRIP PLANNER ##

### Overview ###

Trip Planner is a LLM-based travel planner app, with prompt engineering guardrails.
The app receives a natural language request to plan a specific trip, makes sure it’s valid and safe and returns an up to
3 lines of trip plan in natural language.

<p align="center">
  <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXZnMjVtZm83eXczcWY2NGN4a3FnMG81ZXh4cjVhanFoNGdtYnA1ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dgIGW95eulWfKFQk0G/giphy.gif" alt="Sublime's custom image" width="60%"/>
</p>
The program consists of two microservices (Each one has a designated README.md):

- api (backend)<br/>
- client (frontend)


# Future Improvements

- Session Management: Currently, all the users see a shared history of all the users. To enable each user to
                      view only its data, session management can be implemented using cookies, together with
                      the maintenance of a DB for users data and metadata. A suitable DB for this issue could
                      be a scalable non-relational DB, like MongoDB.
- Improved Prompt Injection Detection: Some queries which include prompt injection are not always detected by llm-guard,
                      or using Hugging Face models. Further research in the topic is necessary for improving the detection.
- Conversational Chat: As of today, the interaction of the bot and the user is "One-Shot" - the user sends a query and
                       the bot responds. A more holistic solution will enable the user to have a conversation with the                        bot, enabling him to update or add new details. 
- Logging: At the moment, logging is implemented using Python's logging (only in the backend). In the future, incorporating
           a customized logger or a 3rd party logging service in the backend as well as the frontend could help increase
           error detection.
