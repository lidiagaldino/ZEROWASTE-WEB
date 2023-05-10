import { io } from 'socket.io-client';
const URL = 'https://zero-waste-logistic.azurewebsites.net';
export const connectionWebSocket = io(URL, {
autoConnect: true,
    auth: {
        token: localStorage.getItem('token')
    }
});

