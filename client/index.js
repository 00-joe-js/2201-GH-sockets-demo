import React from "react";
import ReactDOM from "react-dom";

import socket from "socket.io-client";

class App extends React.Component {
    componentDidMount() {
        const socketConnectionToServer = socket(window.location.origin);
        socketConnectionToServer.on("connect", () => {
            console.log("Connection to server established!");
        });
    }
    render() {
        return <h1>Humble beginnings.</h1>;
    }
}
 
ReactDOM.render(<App />, document.querySelector("#app"));