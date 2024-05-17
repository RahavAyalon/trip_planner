import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import NewTrip from './components/NewTrip';
import RecentTrips from './components/RecentTrips';
import { useAppDispatch } from "./core/hooks";

function App({ session_id }: { session_id: string }) {
    const dispatch = useAppDispatch();

    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <NavigationBar dispatch={dispatch} />
                </header>
                <main className="App-main">
                    <Routes>
                        <Route path="/newtrip" element={<NewTrip dispatch={dispatch} session_id={session_id} />} />
                        <Route path="/recenttrips" element={<RecentTrips />} />
                    </Routes>
                </main>
                <footer className="App-footer">
                    Powered by Rahav Ayalon
                </footer>
            </div>
        </Router>
    );
}

export default App;
