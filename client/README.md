## Trip Planner Client ##

The trip planner Client, developed using React.js, Redux, and Material UI, exposes three endpoints:
1) GET / - A basic home page which allos the user to explore the different features that trip planner offers.
1) POST /newtrip - A page that allows the user to send a natural language trip planning request, and presents a
   natural language trip planning suggestion, retrieved from the backend.
2) GET /recenttrips - Presents the 5 last valid requests sent to the system alongside their responses.

### Get Started ###

#### Prerequisites ####
- npm

#### Setup ####
1. In the frontend root, fetch the latest information on available packages:
    ```bash
    sudo apt get update
    ```
    Make sure to replace <your-python-version> with the python version installed on your machine.
2. Install the frontend dependencies:
    ```bash
    npm i
    ```
3. Create an .env file in the frontend root according to the .env.example file
4. Run the server locally:
   ```bash
   npm start
   ```
#### Manual Testing ####

To manually test this code on your local machine:
1. Run the api (as explained in the api README.md)
2. Run the client (as explained in the previous section)
3. In you browser, open `http://localhost:3000/`.
4. Test each feature and component separately.


#### Design ####


### Test Design ###

Testing Trip Planner's frontend involves various strategies and test cases to ensure robustness and reliability

### 1. **Unit Testing**
- Background Component 
  - Rendering: Test if the component renders a video and navigation bar without crashing.
  - Props: Ensure the dispatch function is passed correctly to NavigationBar.
  - Styles: Verify the styling of the video and div overlay, ensuring they match expected values for layout and visibility.
    ChatBox Component
- State and Redux Hook: 
  Mock the useAppSelector to return different states (like empty and populated chat history).
  - Rendering:
    - Check that messages are rendered correctly based on the chatHistory. 
    - Verify the presence of the loader when status is 'loading'. 
    - Avatar Display: Ensure the correct avatar appears based on the speaker (AI or user).
- Layout Component 
  - Conditional Rendering: Test that elements like the header and footer are rendered only when not on the root path.
  - Children Propagation: Verify that children components are rendered correctly in the main section.
- NavigationBar Component 
  - Interaction: Test button clicks, especially the Recent Trips button to ensure it dispatches the correct action (getHistoryAsync). 
  - Routing: Ensure that buttons link to the correct paths (/newtrip, /recenttrips). 
  - Styling: Check that the passed style props are applied correctly to buttons.
2. Integration Tests
- Background and NavigationBar:
  - Ensure that clicking navigation buttons updates the route correctly and that dispatch is called when expected.
