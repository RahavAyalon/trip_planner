import {useLocation} from "react-router-dom";

import NavigationBar from "./NavigationBar";

// @ts-ignore
function Layout({ children, dispatch }) {
    const location = useLocation();
    const isRoot = location.pathname === "/";

    return (
        <div className="App">
            {!isRoot && (
                <header className="App-section App-header">
                    <NavigationBar dispatch={dispatch} style={undefined} />
                </header>
            )}
            <main className="App-section App-main">
                {children}
            </main>
            {!isRoot && (
                <footer className="App-section App-footer">
                    Powered by Rahav Ayalon
                </footer>
            )}
        </div>
    );
}

export default Layout;