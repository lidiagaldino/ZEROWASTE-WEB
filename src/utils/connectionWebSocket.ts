import { io } from "socket.io-client";
export const URL = "https://zero-waste-chat.azurewebsites.net/";

export const connectionWebSocket = io(URL, {
  auth: {
    token: localStorage.getItem("token"),
  },
});

connectionWebSocket.on("connect", () => {
  localStorage.setItem("socket", "conectado");
  console.log("Conectado");
});

connectionWebSocket.on("disconnect", () => {
  localStorage.setItem("socket", "desconectado");
  connectionWebSocket.close();

  if (!connectionWebSocket.connected) {
    console.log("Instância de socket fechada corretamente.");
  } else {
    console.log("Falha ao fechar a instância de socket.");
  }
  console.log("Desconectado");
});
