import React, { Component, useEffect }from "react";
import { SOCKET_ROOT_URL } from "../../constants/constant";
import { w3cwebsocket } from "websocket"

interface SocketState {
    ws: w3cwebsocket
    thread: string
    acceptFunc: Function
}

export class Socket extends Component<any, SocketState> {
    constructor(props : any) {
        super(props);

        if(this.props.thread === undefined || this.props.acceptFunc === undefined)
        {
            this.state = {
                ws: new w3cwebsocket(SOCKET_ROOT_URL),
                thread : undefined,
                acceptFunc : undefined,
            };
        }
        else
        {
            this.state = {
                ws: new w3cwebsocket(SOCKET_ROOT_URL),
                thread : this.props.thread,
                acceptFunc : this.props.acceptFunc,
            };
        }

        this.state.ws.onopen = () => {
            if(this.state.thread === undefined)
            {
                this.state.ws.send(JSON.stringify({
                    type: "setup",
                    data: "",
                }))
                console.log("Log: Socket Open");
            }
            else
            {
                const socketData = JSON.stringify({
                    type: "setup",
                    data: this.state.thread,
                });
                this.state.ws.send(socketData);
                console.log("Log: socket open (now room: " + this.state.thread + ")");
            }
        }

        this.state.ws.onmessage = (message) => {
            try {
                var socketData = JSON.parse(message.data)
                if (socketData.type === "message") {
                    var data = JSON.parse(socketData.data);
                    if (data.thread == this.props.thread) {
                        this.state.acceptFunc(data)
                    }
                    else {
                        notifycations(data);
                    }
                }
                else if (socketData.type === "notice") {
                    console.log("Notice:" + socketData.data);
                }
            }
            catch (e) {
                console.log("Log: Incorrect socket data: " + message)
            }
        }

        this.state.ws.onclose = () => {
            console.log("Log: Socket Connection Closed");
            this.setState({
                ws : new w3cwebsocket(SOCKET_ROOT_URL)
            })
        }

        this.state.ws.onerror = (err: ErrorEvent) => {
            console.log("Log: Socket Error: ", err);
        }

    };
    componentDidUpdate(){
    }
    

    sendMessage(message: string, grade: Number) {
        if(this.state.ws == null || this.state.ws.readyState === WebSocket.CLOSED){
            this.setState({
                ws : new w3cwebsocket(SOCKET_ROOT_URL)
            })
        }
        const socketdata = JSON.stringify({
            type: "message",
            data: JSON.stringify({
                message:    message,
                grade:      grade,
            })
        })
        this.state.ws.send(socketdata)
    }
}

function Ex() {
    let ws = new Socket({thread:"room1", acceptFunc:(msg)=>{console.log(msg)}})
    ws.sendMessage("message", 1)
}

function notifycations(message: any) {
    if (!("Notification" in window)) {
        alert("This browser does not support notifications");
    }
    else if (Notification.permission !== 'granted') {
        alert('Notification is disabled')
    }
    else {
        var notification = new Notification(message.thread_id, {
            body: message.message
        })
        notification.onclick = function () {
            //change url
            window.open('http://localhost:3000/threads/' + message.thread_id + "/messages")
        }
        setTimeout(function () {
            notification.close()
        }, 10000)
    }
}