// Purpose: Server-side code for the chat application

import express from "express";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// fileURLToPath and dirname are used to get the current directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const expressStatic = express.static;
const app = express();
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

// serve static files
app.use(expressStatic(join(__dirname, "public")));
const io = new Server(server);

let socketsConnected = new Set();

// socket server-side connection
io.on("connection", onConnection);

function onConnection(socket) {
  console.log(socket.id);
  socketsConnected.add(socket.id);

  io.emit("clients-total", socketsConnected.size);

  socket.on("disconnect", () => {
    console.log("Client disconnected - ", socket.id);
    socketsConnected.delete(socket.id);
    io.emit("clients-total", socketsConnected.size);
  });
  socket.on("message", (data) => {
    // send to all clients except the sender
    socket.broadcast.emit("chat-message", data);
  });

  socket.on("feedback", (data) => {
    // send to all clients except the sender
    socket.broadcast.emit("feedback", data);
  });
}
