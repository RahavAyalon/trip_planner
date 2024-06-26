## Trip Planner API ##

The trip planner API, developed using Python's FastAPI, exposes two endpoints:
1) POST api/trips - gets a natural language trip planning request from the user, and responses with a
   natural language trip planning suggestion, generated using OpenAI Models.
   - The API uses OpenAI function calling to validate all required fields are present in the user
     query (duration, budget, location). 
   - The API also provides the OpenAI client context to enhance the accuracy of the responses - 
     mainly in regard to hallucination and responses to unrelated topics.
   - The API utilizes LLM-guard to block any attempt for prompt injection.
   - The API uses Redis to cache user's valid requests along their responses.
2) GET api/trips/history - returns the 5 last valid requests sent to the system alongside their responses.

The API utilizes a designated logger for debugging and logging purposes.

### Get Started ###

#### Prerequisites ####
- pip
- python (Between 3.9 and 3.11)

#### Setup ####
1. In the backend root, create a venv:
    ```bash
    python<your-python-version> -m venv venv
    ```
    Make sure to replace <your-python-version> with the python version installed on your machine.
2. Activate the venv:
    ```bash
    source venv/bin/activate
    ```
3. Install Redis:
    ```bash
    sudo apt install lsb-release curl gpg
    curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg
    echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list
    sudo apt-get update
    sudo apt-get install redis 
    ```
4. Start the redis server:
    ```bash
    sudo systemctl service redis-server start
    ```
5. Make sure the redis-server works properly:
    ```bash
    sudo systemctl service redis-server status
    ```
    or using
    ```bash
    redis-cli
    ```
6. Install the backend's dependencies:
    ```bash
    pip install -r requirements.txt
    ```
7. Create an .env file in the backend root according to the .env.example file
8. Run the server locally:
   ```bash
   python3 main.py
   ```
### Design ###

The design in the backend is quite straightforward as it exposes three routes only. Some interesting points, though:
1) The current workflow of the /newtrip route goes as follows:
   - Check input for prompt injection
   - If input is valid, preform NER using OpenAI's function calling (1st call for OpenAI)
   - In regard to old and new information, generate a suitable response (2nd call for OpenAI)
1. Function Calling: There are various methods to extract and validate the required fields in the input (duration, length, budget),
   the backend. After exploring different solutions, including `scipy` and `transformers` that were insufficient, the 
   solution of OpenAI's function calling stood out in its simplicity and accuracy. 
1. AI Model: The AI model I used for the implementation is the cheapest one that supports function calling: 
   gpt-3.5-turbo-0125. 

### Manual Testing ###

To manually test this code:
1. Run the program, as explained in the previous section.
2. Using some 3rd party requests service ike Curl or Postman, send requests to the routes to examine their responses.

### Test Design ###

Testing Trip Planner's backend involves various strategies and test cases to ensure robustness and reliability

#### 1. **Unit Testing**
   - **Tools:** `pytest`
   - **Techniques:**
     - **Mocking:** Mock external dependencies such as calls to OpenAI, Redis or llm-guard.

   **Test Cases:**
   - get_cached_response():
     - If key is in cache, it should return its value
     - Otherwise, it should return None
   - validate_prompt_input():
     - If one of the required fields (e.g. duration, destination, budget) is missing, it should return False
     - Otherwise, it should return True
   - validate_prompt_injection():
     - If user's query is a prompt injection, should return False
       - Otherwise, should return True
   - plan_trip_controller():
     - If user's query is a prompt injection attempt
       - Should return a descriptive error message
       - The user's query, along OpenAI's response should be saved in the history
       - The user's query, along OpenAI's response should be cached
     - User's query is on a different topic
       - Should return OpenAI's descriptive response for the user's query (he's not able to answer these type of questions)
       - The user's query, along OpenAI's response should be saved in the history
       - The user's query, along OpenAI's response should be cached
     - User's query is missing some of the required input variables (e.g. destination, budget, duration):
       - Should return OpenAI's descriptive error message for the user's invalid query
       - The user's query, along OpenAI's response should be saved in the history
       - The user's query, along OpenAI's response should be cached
     - User's query is containing invalid required input variables (e.g. destination, budget, duration) :
       - Should return OpenAI's generated response for the user's invalid query
       - The user's query, along OpenAI's response should be saved in the history
       - The user's query, along OpenAI's response should be cached
     - User's query is containing valid required input variables (e.g. destination, budget, duration):
       - if query is cached:
         - The response should be extracted from the cache
         - The user's query, along OpenAI's response shouldn't be saved in the history
         - The user's query, along OpenAI's response shouldn't be cached again
       - else:
         - The response should be OpenAI's generated response for the user's query
         - The user's query, along OpenAI's response should be saved in the history
         - The user's query, along OpenAI's response should be cached
   - Ensure error Handling when external services are unreachable (Redis, OpenAI, llm-guard)


#### 2. **Integration/E2E Testing**
- **Tools:** `pytest`, FastAPI's `TestClient`
- **Test Cases:**
   - /recenttrips:
     - 5 most recent trips are returned properly
     - Error handling when there's no connection to the DB
   - /newtrip:
     - All cases from the previous part, make sure the correct status has been sent, too.
     
### 4. **Performance Testing**
   - **Objective:** Ensure that the system performs well under expected and peak load conditions.
   - **Techniques:** Simulate multiple users or requests to test system scalability and responsiveness.

   **Test Cases:**
   - **Load Handling:** Test how the system handles a large number of concurrent users or requests.
   - **Response Time:** Measure response times under different load conditions to ensure they meet acceptable thresholds.

