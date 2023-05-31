import { io } from 'socket.io-client';
const URL = 'https://zero-waste-chat.azurewebsites.net';
export const connectionChat = io(URL, {
    autoConnect: true,
    auth: {
        token: localStorage.getItem('token')
    }
});
