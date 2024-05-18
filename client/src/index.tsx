import {ThemeProvider, createTheme} from "@mui/material/styles";
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import React from 'react';

import reportWebVitals from './reportWebVitals';
import { store } from './core/store';
import App from './App';
import './index.css';

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
                {/*<SnackbarProvider maxSnack={3}>*/}
                    <App session_id={session_id}/>
                {/*</SnackbarProvider>*/}
            </ThemeProvider>
        </Provider>
    </React.StrictMode>
);

reportWebVitals();
