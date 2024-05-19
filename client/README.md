## Trip Planner Client ##

The trip planner Client, developed using React.js, Redux, and Material UI, exposes three endpoints:
1) GET / - A basic home page which allos the user to explore the different features that trip planner offers.
1) POST /newtrip - A page that allows the user to send a natural language trip planning request, and presents a
   natural language trip planning suggestion, retrieved from the backend.
2) GET /recenttrips - Presents the 5 most recent requests sent to the system alongside their responses.

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
## Manual Testing ##

To manually test this code on your local machine:
1. Run the api (as explained in the api README.md)
2. Run the client (as explained in the previous section)
3. In you browser, open `http://localhost:3000/`.
4. Test each feature and component separately.


### Test Design ###

Testing Trip Planner's frontend involves various strategies and test cases to ensure robustness and reliability

### 1. **Unit Testing**

**What Should be Tested:**
- Background Component 
  - Test if the component renders a video and navigation bar without crashing.
  - Ensure the dispatch function is passed correctly to NavigationBar.
  - Verify the styling of the video and div overlay, ensuring they match expected values for layout and visibility.
    ChatBox Component
- State and Redux Hook: 
  Mock the useAppSelector to return different states (like empty and populated chat history).
  - Rendering:
    - Check that messages are rendered correctly based on the chatHistory. 
    - Verify the presence of the loader when status is 'loading'. 
    - Avatar Display: Ensure the correct avatar appears based on the speaker (AI or user).
- Layout Component 
  - Test that elements like the header and footer are rendered only when not on the root path.
  - Verify that children components are rendered correctly in the main section.
- NavigationBar Component 
  - Test button clicks, especially the Recent Trips button to ensure it dispatches the correct action (getHistoryAsync). 
  - Ensure that buttons link to the correct paths (/newtrip, /recenttrips). 
  - Check that the passed style props are applied correctly to buttons.
- ChatBox Component
  - Verify that the component renders the messages from `chatHistory` properly, with each message displayed according to its index (even or odd styling).
  - Ensure that a loading indicator is visible when the `status` is set to 'loading'.
  - Test that the correct avatar appears for different speakers (`AI` vs. user), where AI messages show a black avatar and user messages show a standard icon.
- NewTrip Component
  - Confirm that clicking the 'Send' button dispatches the correct actions when there is input text, and that it does not dispatch actions when the input is empty.
  - Ensure that clicking the 'Reset' button reloads the page to reset the form state.
  - Test that the textarea updates its value correctly when users type into it, and that this value is cleared after sending a message.
- RecentTrips Component
  - Check that the component correctly renders a table with the trip requests and their corresponding responses.
  - Ensure that the component handles and displays empty data states appropriately, such as showing a message when no trip history is available.
  - Verify that all table cells apply the correct styling to maintain consistency with the theme.
- TextAreaElement Component
  - Test that the component captures user input correctly and triggers onChange events.
  - Confirm that the styled component respects dark mode settings and applies the correct color schemes based on the theme.
  - Ensure that focus and hover states trigger visual changes, like border color changes, as defined in the component styling.
 App Component (Integration with Router)**
 - Verify that the correct components are rendered when navigating to different routes (`/newtrip`, `/recenttrips`, `/`).
 - Test that the session ID cookie is set if not already present and that it is used correctly within the `NewTrip` component.
 - Confirm that the `Layout` component properly wraps around the routed components, and that headers and footers appear as expected based on the route.

### 2. **Integration Testing**
**What Should be Tested:**
- Component Interactions
 - Test the flow of data between components, ensuring that state changes in one component (like submitting a new trip request in `NewTrip`) correctly update the UI in others (like adding a new entry in `ChatBox` or `RecentTrips`).
 - Ensure components correctly render or update based on changes in state or props, reflecting the correct content and layout after interactions.
- Redux Store Integration
 - Verify that dispatching actions updates the Redux store as expected, and that these updates propagate correctly to all connected components.
 - Test asynchronous actions (like fetching recent trips or submitting a new trip request) to ensure they handle API responses correctly, including loading states and error handling.
- Routing and Navigation
 - Test the application’s routing logic to ensure that navigating to different routes displays the correct components without errors.
 - Link and Navigation Interactions: Ensure that navigation elements like buttons and links route to the correct paths and that parameters (like session IDs) are handled correctly.
- API Integration
 - Use tools like Mock Service Worker (MSW) to simulate API endpoints. Test how your application handles both successful responses and errors from these endpoints.
 - Ensure that the entire flow from inputting data (e.g., a trip planning request) to receiving and displaying responses works seamlessly.
- Error Handling and Edge Cases
 - Test how the application handles network errors or invalid responses from the backend. Verify that error states are managed gracefully and communicated to the user effectively.
 - Test unusual or extreme cases, such as submitting empty forms, rapid sequential inputs, or invalid data formats, to ensure the application remains stable and user-friendly.
### 3. **Performance and Security**
- Verify that the application handles expected and high loads gracefully, especially when dealing with data-intensive operations or when rendering large lists, like chat histories or trip logs.
- Ensure that the application correctly implements security best practices, especially in handling user data and interactions with external systems.
