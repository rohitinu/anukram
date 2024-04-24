import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid";
const GAME_ROOMS = new Map();
const ALL_USERS = [];

const randomGameNumber = () =>
  (Math.floor(Math.random() * 90000) + 10000).toString();

const validateGameRoomId = (newGameId) => {
  const gameIds = Array.from(GAME_ROOMS.keys());
  return !gameIds.includes(newGameId);
};
const generateValidGameId = () => {
  const gameId = randomGameNumber();
  if (validateGameRoomId) {
    return gameId;
  } else generateValidGameId();
};
const app = express();
app.use(bodyParser.json()); // to support JSON-encoded bodies
const INITIATION_ID = "4365";
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

function leaveRoom(userID, chatRoomUsers) {
  return chatRoomUsers.filter((user) => user.id != userID);
}
io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  // Create a room when inititaion id Matches with the code

  socket.on("create_room", (data) => {
    const { userName, id, color, initiationId, playerSize } = data;
    let gameId;
    if (initiationId === INITIATION_ID) {
      gameId = generateValidGameId();
      const user = { id: id, userName: userName, color: color, isAdmin: true };
      GAME_ROOMS.set(gameId, {
        users: [user],
        playerSize: playerSize,
      });

      // join the socket
      socket.join(gameId);

      socket.emit("room_created", { room: gameId, user });
    } else {
      socket.emit("invalid_code", {
        message: `Intiation Id: ${initiationId} is not autorised to create a game. Try to joining the game.`,
      });
    }
    console.log(Array.from(GAME_ROOMS.keys()), gameId);
  });

  socket.on("join_game", (data) => {
    const { userName, room, id } = data;
    console.log(Array.from(GAME_ROOMS.keys()), room);
    const gamePlayerInfo = GAME_ROOMS.get(room);
    console.log(gamePlayerInfo.users.length);
    if (!gamePlayerInfo) {
      socket.emit("invalid_room", {
        room: room,
        message: "Game room is not valid",
      });
    } else if (gamePlayerInfo.users.length >= gamePlayerInfo.playerSize) {
      console.log("room is full");
      socket.emit("invalid_room", {
        room: room,
        message: "Game room is full, Please join other game",
      });
    } else {
      gamePlayerInfo.users.push({ id, userName, isAdmin: false });
      // join the socket
      GAME_ROOMS.set(room, gamePlayerInfo);
      socket.join(room);

      socket.in(room).emit("player_message", {
        message: `${userName} has joined the game room`,
        gameInfo: gamePlayerInfo,
      });
      socket.emit("player_message", {
        message: `${userName} has joined the game room`,
        gameInfo: gamePlayerInfo,
      });
    }
  });

  socket.on("update_color", (data) => {
    const { userName, room, id, color } = data;
    const gamePlayerInfo = GAME_ROOMS.get(room);
    if (!gamePlayerInfo) {
      socket.emit("invalid_room", {
        room: room,
        message: "Game room is not valid",
      });
    } else {
      gamePlayerInfo.users = gamePlayerInfo.users.map((cv) => {
        if (cv.id === id) {
          return { ...cv, color: color };
        } else return cv;
      });
      // join the socket
      GAME_ROOMS.set(room, gamePlayerInfo);
      socket.in(room).emit("player_message", {
        message: `${userName} has joined the game room`,
        gameInfo: gamePlayerInfo,
      });
      socket.emit("player_message", {
        message: `${userName} has joined the game room`,
        gameInfo: gamePlayerInfo,
      });
    }
  });

  // socket.on("leave_room", (data) => {
  //   const { userName, room } = data;
  //   socket.leave(room);
  //   const __createdtime__ = Date.now();

  //   allUsers = leaveRoom(socket.id, allUsers);

  //   socket.to(room).emit("chatroom_users", allUsers);

  //   socket.to(room).emit("receive_message", {
  //     userName: CHAT_BOT,
  //     message: `${userName} has left the chat`,
  //     __createdtime__,
  //   });
  //   console.log(`${userName} has left the chat`);
  // });
});

app.post("/create-user", function (req, res) {
  console.log(req.body);
  res.send({ ...req.body, id: uuidv4() });
});

server.listen(4000, () => "Server is running on port 4000");
