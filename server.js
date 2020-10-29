const express = require("express");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(server, {
  debug: true,
});
const { v4: uuidV4, validate: uuidV4Validate } = require("uuid");

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use("/peerjs", peerServer);

app.get("/", (req, res) => {
  //   res.redirect(`/${uuidV4()}`);
  res.render("index");
});

app.get("/create", (req, res) => {
  res.redirect(`/${uuidV4()}`);
});

app.get("/validateName/:roomName", (req, res) => {
  console.log(req.params.roomName);
  res.status(200).json({ valid: uuidV4Validate(req.params.roomName) });
});

app.get("/:room", (req, res) => {
  if (uuidV4Validate(req.params.room)) {
    res.render("room", { roomId: req.params.room });
  } else {
    res.status(404).json({ error: true, msg: "Room Not found" });
  }
});

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected", userId);
    socket.on("message", (message) => {
      io.to(roomId).emit("createMessage", message, userId);
    });
  });
});

server.listen(process.env.PORT || 3030);
