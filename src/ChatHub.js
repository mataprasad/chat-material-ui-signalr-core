import * as signalR from '@aspnet/signalr';
import * as URLParse from 'url-parse';

const extractId = (rawUrl) => {
    const url = new URLParse(rawUrl, true);
    return url.query.id;
}

export const initSignalR = (ReceiveMessageCallBack) => {
    const connectionInfo = {};
    const connection = new signalR.HubConnectionBuilder().withUrl("https://localhost:5001/chatHub").build();
    connection.on("ReceiveMessage", function (from, to, message) {
        console.log(`ReceiveMessage=> from:${from} | to:${to} | message: ${message}`)
        if (ReceiveMessageCallBack) {
            ReceiveMessageCallBack(from, to, message);
        }
    });
    connection.start().then(function () {
        const hub = connection;
        const connectionUrl = hub["connection"].transport.webSocket.url;
        connectionInfo.id = extractId(connectionUrl);
        console.log(`connection started at => ${connectionInfo.id}`)
    }).catch(function (err) {
        return console.error(err.toString());
    });

    const SendMessage = (from, to, message) => {
        connection.invoke("SendMessage", from, to, message).catch(function (err) {
            return console.error(err.toString());
        });
    };

    const ConnectionInfo = () => {
        return connectionInfo;
    };

    return {
        SendMessage,
        ConnectionInfo
    }
};