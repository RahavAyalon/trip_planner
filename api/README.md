### Get Started ###

#### Prerequisites ####
- pip
- **python version between 3.9 and 3.11**

#### Setup ####
1. In the backend root, install venv, if not installed already:
```bash
python<your-python-version> -m venv venv
```
Make sure to replace <your-python-version> with the python version installed on your machine.
3. Activate the venv:
```bash
source venv/bin/activate
```
4. Install Redis (in memory cache for user queries and LLM responses)
```bash
sudo apt install lsb-release curl gpg
curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list
sudo apt-get update
sudo apt-get install redis 
```
5. Start the redis server:
```bash
sudo systemctl service redis-server start
```
6. Make sure the redis-server works properly:
```bash
sudo systemctl service redis-server status
```
or using
```bash
redis-cli
```
7. Install the backend's dependencies:
```bash
pip install -r requirements.txt
```
8. Create an .env file in the backend root according to 
the .env.example file

### Test Design ###

Testing Trip Planner's backend involves various strategies and test cases to ensure robustness and reliability.

### 1. **Unit Testing**
   - **Tools:** `pytest`
   - **Techniques:**
     - **Mocking:** Mock external dependencies such as calls to OpenAI, Redis or llm-guard.

   **Test Cases:**
   - get_cached_response():
     - if key is in cache, returns it; Otherwise, returns None
   - validate_prompt_input():
     - if one of the required fields (e.g. duration, destination, budget) is missing, returns False
     - If all fields are present, returns True.
   - validate_prompt_injection():
     - If user's query is prompt injection, returns False; Otherwise, False. (according to mocked llm-guard responses)
   - **Input Validation:** Test each endpoint with valid and invalid inputs (e.g., invalid budget formats, non-existent destinations).
   - **Error Handling:** Test how the system handles and returns errors when Redis is unreachable or if OpenAI service is down.
   - **Output Correctness:** Verify that the API returns the correct response given a set of mocked inputs and conditions.


### 2. **Integration Testing**
- **Tools:** `pytest`, FastAPI's `TestClient`
   - **Techniques:**
     - **Mocking:** Mock external dependencies such as calls to OpenAI, Redis, or llm-guard. 

   **Test Cases:**
   - /newtrip:
     - User's query is prompt injection
       - Status Code: 403
       - Body: A descriptive error message for the user's query
       - The user's query, along OpenAI's response shouldn't be saved in the history
       - The user's query, along OpenAI's response shouldn't be cached
       - User's query is on a different topic
         - Status Code: 200
         - Body: OPENAI's descriptive response for the user's query (should say he's not able to answer this type of questions)
         - The user's query, along OpenAI's response shouldn't be saved in the history
         - The user's query, along OpenAI's response shouldn't be cached
       - User's query is missing some of the required input variables (e.g. destination, budget, duration):
         - Status Code: 400
         - Body: OPENAI's descriptive error message for the user's invalid query
         - The user's query, along OpenAI's response shouldn't be saved in the history
         - The user's query, along OpenAI's response shouldn't be cached
       - User's query is containing invalid required input variables (e.g. destination, budget, duration) :
         - Status Code: 400
         - Body: OPENAI's generated response for the user's invalid query
         - The user's query, along OpenAI's response shouldn't be saved in the history
         - The user's query, along OpenAI's response shouldn't be cached
       - User's query is containing valid required input variables (e.g. destination, budget, duration):
         - Status Code: 200
         - if query is cached:
           - The response should be extracted from the cache
           - The user's query, along OpenAI's response shouldn't be saved in the history
           - The user's query, along OpenAI's response shouldn't be cached again
         - else:
           - The response should be OPENAI's generated response for the user's query
           - The user's query, along OpenAI's response should be saved in the history
           - The user's query, along OpenAI's response should be cached
       - Error Handling when Redis is unreachable or if OpenAI service is down
   - /recenttrips:
     - 5 most recent trips are returned
     - Error handling when there's no connection to the DB

### 3. **Functional Testing**
   - **Objective:** Test the application as a whole, from an end-user perspective.
   - **Tools:** `selenium`, `TestClient` from FastAPI.
   - **Techniques:** Use real or near-real interactions, possibly integrating with the actual OpenAI API and Redis in a controlled environment.

   **Test Cases:**
   - **User Scenario Simulation:** Simulate real user scenarios to see how the system handles various combinations of inputs and conditions.
   - **Session Management:** Ensure that user sessions are handled correctly, respecting login states and session data across requests.

### 4. **Performance Testing**
   - **Objective:** Ensure that the system performs well under expected and peak load conditions.
   - **Tools:** `locust`, `jMeter`.
   - **Techniques:** Simulate multiple users or requests to test system scalability and responsiveness.

   **Test Cases:**
   - **Load Handling:** Test how the system handles a large number of concurrent users or requests.
   - **Response Time:** Measure response times under different load conditions to ensure they meet acceptable thresholds.
