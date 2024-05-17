import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './core/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import {ThemeProvider, createTheme} from "@mui/material/styles";
import { v4 as uuidv4 } from 'uuid';

const container = document.getElementById('root')!;
const root = createRoot(container);
const session_id = uuidv4();

const theme = createTheme({
    palette: {
        primary: {
            main: '#1b2a07'
        }
    }
});

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                    <App session_id={session_id}/>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>
);

reportWebVitals();
