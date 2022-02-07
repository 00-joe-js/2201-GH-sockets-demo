import React from "react";
import ReactDOM from "react-dom";

import socket from "socket.io-client";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            connectedSocket: null,
            mice: {}
        };
    }
    componentDidMount() {
        const socketConnectionToServer = socket(window.location.origin);
        socketConnectionToServer.on("connect", () => {
            this.setState({ connectedSocket: socketConnectionToServer });


            socketConnectionToServer.on("anotherMouseMove", (data) => {
                this.setState({
                    mice: { ...this.state.mice, [data.id]: { x: data.x, y: data.y } }
                })
            })

            socketConnectionToServer.on("imGone", (idThatsGone) => {
                const myUpdatedMice = { ...mice };
                delete myUpdatedMice[idThatsGone];
                this.setState({
                    mice: myUpdatedMice
                })
            })

        });
    }
    render() {

        if (this.state.connectedSocket === null) {
            return <img src="/200.gif" />
        }

        const eachMouse = Object.entries(this.state.mice);

        console.log(eachMouse);

        return (
            <div>
                <h1>real interface</h1>
                <div id="mouse-box" onMouseMove={(eventInformation) => {
                    this.state.connectedSocket.emit("whereMyMouseIs", {
                        x: eventInformation.clientX,
                        y: eventInformation.clientY
                    });
                }}>
                    {eachMouse.map(oneMouse => {
                        const id = oneMouse[0];
                        const coordinates = oneMouse[1];
                        return <div key={id} className="mouse-square" style={{top: `${coordinates.y}px`, left: `${coordinates.x}px`}}></div>
                    })}
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector("#app"));