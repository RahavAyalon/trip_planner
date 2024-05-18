import React from "react";

import NavigationBar from "./NavigationBar";

// @ts-ignore
function Background({ dispatch }) {
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}>
            <video src="/logo.mp4" autoPlay={true} muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <NavigationBar dispatch={dispatch} style={{backgroundColor: 'black', color: 'white',}} />
            </div>
        </div>
    );
}

export default Background;