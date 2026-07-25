import http from "http";
import app from "./app.js";
import env from "./config/env.js";

import { initializeSocket } from "./socket.js";

const server = http.createServer(app);

initializeSocket(server);

server.listen(env.PORT, () => {
  console.log(`🚀 Servidor ejecutándose en ${env.PORT}`);
});

export default server;
