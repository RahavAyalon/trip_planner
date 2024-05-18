import NavigationBar from "./NavigationBar";


// @ts-ignore
function Layout({ children, dispatch }) {
    return (
        <div className="App">
            <header className="App-section App-header">
                <NavigationBar dispatch={dispatch} style={undefined} />
            </header>
            <main className="App-section App-main">
                {children}
            </main>
            <footer className="App-section App-footer">
                Powered by Rahav Ayalon
            </footer>
        </div>
    );
}

export default Layout;