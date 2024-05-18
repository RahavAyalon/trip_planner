import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, {useEffect} from "react";
import { v4 as uuidv4 } from 'uuid';

import {getCookie, setCookie} from "./features/Cookies";
import RecentTrips from './components/RecentTrips';
import Background from "./components/Background";
import { useAppDispatch } from "./core/hooks";
import NewTrip from './components/NewTrip';
import Layout from './components/Layout';
import './App.css';


// @ts-ignore
function App({ session_id }) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const userCookie = getCookie('userCookie');
        if (!userCookie) {
            setCookie('userCookie', String(uuidv4()), 365);
        }
    }, []);

    return (
        <Router>
            <Layout dispatch={dispatch}>
                <Routes>
                    <Route path="/newtrip" element={<NewTrip dispatch={dispatch} session_id={getCookie('userCookie')} />} />
                    <Route path="/recenttrips" element={<RecentTrips />} />
                    <Route path="/" element={<Background dispatch={dispatch} />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;