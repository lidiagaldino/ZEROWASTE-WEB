import { io } from 'socket.io-client';
const URL = 'https://zero-waste-logistic.azurewebsites.net';
export const connectionWebSocket = io(URL, {
    auth: {
        token: localStorage.getItem('token')
    }
});

