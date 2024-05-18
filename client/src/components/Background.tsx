import React from "react";

import NavigationBar from "./NavigationBar";

// @ts-ignore
function Background({ dispatch }) {
    const rootNavStyle = {
        backgroundColor: 'black',
        color: 'white',
        border: 'none' // Remove border on the root route
    };
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}>
            <video src="/background.mp4" autoPlay={true} muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <NavigationBar dispatch={dispatch} style={rootNavStyle} />
            </div>
        </div>
    );
}

export default Background;