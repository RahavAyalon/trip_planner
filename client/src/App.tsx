import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import {useEffect} from "react";

import NavigationBar from './components/NavigationBar';
import {getCookie, setCookie} from "./features/Cookies";
import RecentTrips from './components/RecentTrips';
import { useAppDispatch } from "./core/hooks";
import NewTrip from './components/NewTrip';
import './App.css';

function App({ session_id }: { session_id: string }) {
    const dispatch = useAppDispatch();
    useEffect(() => {
    const userCookie = getCookie('userCookie');

    if (!userCookie) {
      setCookie('userCookie', String(uuidv4()), 365);
    }
  }, []);
    return (
        <Router>
            <div className="App">
                <header className="App-section App-header">
                    <NavigationBar dispatch={dispatch} />
                </header>
                <main className="App-section App-main">
                    <Routes>
                        <Route path="/newtrip" element={<NewTrip dispatch={dispatch} session_id={getCookie('userCookie')} />} />
                        <Route path="/recenttrips" element={<RecentTrips />} />
                    </Routes>
                </main>
                <footer className="App-section App-footer">
                    Powered by Rahav Ayalon
                </footer>
            </div>
        </Router>
    );
}

export default App;
