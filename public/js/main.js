const socket = io.connect();

// Conectamos el cliente y escuchamos el evento messages
socket.on("messages", (data) => {
    render(data);
});
