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
const invalidRoomError = (socket, msg) => {
  socket.emit("ERROR_MESSAGE", {
    message: msg,
  });
};
const playerInfoMsg = (socket, msg, room, playerInfo, start = false) => {
  socket.in(room).emit("PLAYER_MESSAGE", {
    message: msg,
    gameInfo: playerInfo,
    start,
  });
  socket.emit("PLAYER_MESSAGE", {
    message: msg,
    gameInfo: playerInfo,
    start,
  });
};
io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  // Create a room when inititaion id Matches with the code
  socket.on("CREATE_ROOM", (data) => {
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

      socket.emit("ROOM_CREATED", { room: gameId, user });
    } else {
      invalidRoomError(
        socket,
        `Intiation Id: ${initiationId} is not autorised to create a game. Try to joining the game.`
      );
    }
  });

  socket.on("JOIN_GAME", (data) => {
    const { userName, room, id } = data;

    const gamePlayerInfo = GAME_ROOMS.get(room);

    if (!gamePlayerInfo) {
      invalidRoomError(socket, "Game room is not valid");
    } else if (gamePlayerInfo.users.length >= gamePlayerInfo.playerSize) {
      invalidRoomError(socket, "Game room is full, Please join other game");
    } else {
      gamePlayerInfo.users.push({ id, userName, isAdmin: false });
      // join the socket
      GAME_ROOMS.set(room, gamePlayerInfo);
      socket.join(room);

      playerInfoMsg(
        socket,
        `${userName} has joined the game room`,
        room,
        gamePlayerInfo,
        false
      );
    }
  });

  socket.on("UPDATE_COLOR", (data) => {
    const { room, id, color } = data;
    const gamePlayerInfo = GAME_ROOMS.get(room);
    if (!gamePlayerInfo) {
      invalidRoomError(socket, "Game room is not valid");
    } else {
      // Check color validation
      gamePlayerInfo.users = gamePlayerInfo.users.map((cv) => {
        if (cv.id === id) {
          return { ...cv, color: color };
        } else return cv;
      });
      GAME_ROOMS.set(room, gamePlayerInfo);
      if (
        gamePlayerInfo.users.filter((cv) => cv.color).length ==
        gamePlayerInfo.playerSize
      ) {
        playerInfoMsg(socket, "", room, gamePlayerInfo, true);
      } else {
        playerInfoMsg(socket, "", room, gamePlayerInfo, false);
      }
    }
  });
});

app.post("/create-user", function (req, res) {
  res.send({ ...req.body, id: uuidv4() });
});

server.listen(4000, () => "Server is running on port 4000");
