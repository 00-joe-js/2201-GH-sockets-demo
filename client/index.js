import React from "react";
import ReactDOM from "react-dom";

import socket from "socket.io-client";

class App extends React.Component {
    constructor() {
        super();
        this.state = { theDate: null };
    }
    componentDidMount() {
        const socketConnectionToServer = socket(window.location.origin);
        socketConnectionToServer.on("connect", () => {
            socketConnectionToServer.on("time-change", theDateFromServer => {
                this.setState({ theDate: theDateFromServer });
            })
        });
    }
    render() {
        return <h1>{this.state.theDate}</h1>;
    }
}

ReactDOM.render(<App />, document.querySelector("#app"));