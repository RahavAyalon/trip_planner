import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './core/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import {ThemeProvider, createTheme} from "@mui/material/styles";
import { v4 as uuidv4 } from 'uuid';

// import {SnackbarProvider} from "notistack";

const container = document.getElementById('root')!;
const root = createRoot(container);
const session_id = uuidv4();

// Customize mui theme.
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
                {/*<SnackbarProvider maxSnack={3}>*/}
                    <App session_id={session_id}/>
                {/*</SnackbarProvider>*/}
            </ThemeProvider>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
