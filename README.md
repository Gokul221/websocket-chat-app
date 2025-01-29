[![Click to watch app demo](https://github.com/Gokul221/websocket-chat-app/blob/main/public/app-thumbnail.png)](https://drive.google.com/file/d/1QvXAd6_hW1O8JI0YyMjfuGV8z4KVtxrF/view?usp=drive_link)
<br>
<br>
This is a basic chat web application developed using HTML, CSS, Nodejs (Express.js) and Socket.io package. This app demonstrates the working of websockets in realtime.
<br>
<br>
HTTP limitations - <br>
As HTTP is a stateless, req-res protocol built on top of TCP, it has limitations. It cannot keep a persistent connection open between client and server by default.
So, each req-res cycle is independent and require a handshake initiated by client each time to establish communication. The server can only respond when it receives a request.
This design makes HTTP unsuitable for real-time communication and broadcasting (sending data to multiple clients).
There are workarounds like polling and long-polling but these processes are inefficient due to frequent requests and delays.
This is where Websockets come into picture.
<br><br>
Websockets - <br>
To overcome HTTP's limitations, modern real-time communication uses Websockets for persistent connections built on TCP that enables full-duplex communication between client and server
over a single TCP connection.
<br><br>
How Websocket works - <br>
For just the first time, the client sends an HTTP connection upgrade (to Websocket) request to the Websocket server. In response, the Websocket server responds with a 101 response stating
confirmation to protocol change (you can check this in the Browser Inspect option under Network tab > Select type of Request as 'WS').
<br><br>
Socket.io - <br>
A library built on Websocket that helps establish and manage WS connections. Some major advantages of Socket.io over plain WebSocket protocol -
1. If the connection drops, Socket.io automatically attempts to reconnect, Ensures communication even in environments where WebSocket is blocked or unsupported. While raw WS requires manual handling for this. <br>
2. Socket.io provides a cleaner interface for sending and receiving events using named channels. <br>
3. Socket.io allows Multiplexing. (enables multiple logical connections on the same physical connection) <br>
4. Fallback mechanisms when WebSocket is unavailable (switches to Long-Polling). <br>
5. Provides Namespaces - multiple, isolated communication channels on the same Socket.io server. <br>
6. Within a namespace, clients can be dynamically grouped into subgroups or “rooms” to send messages to subsets of connected clients that allows targeted messaging within a namespace. <br>
