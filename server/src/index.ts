import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid";
import { pickACard, pickNCard, shuffledCard } from "./utils/cardInfo";
import {
  CreateRoomPayload,
  GameInfoType,
  MovePayload,
  UpdateColorPayload,
} from "./types.js";
import {
  GAME_ROOMS,
  generateValidGameId,
  invalidRoomError,
  playerInfoMsg,
} from "./utils";

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

io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  // Create a room when inititaion id Matches with the code
  socket.on("CREATE_ROOM", (data: CreateRoomPayload) => {
    const { userName, id, color, initiationId, playerSize } = data;
    let gameId;
    if (initiationId === INITIATION_ID) {
      gameId = generateValidGameId();
      const user = { id: id, userName: userName, color: color, isAdmin: true };
      GAME_ROOMS.set(gameId, {
        users: [user],
        playerSize: playerSize,
        cardDeck: [...shuffledCard()],
        board: {},
        activePlayer: 0,
        isActive: false,
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

  socket.on("UPDATE_COLOR", (data: UpdateColorPayload) => {
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
      if (
        gamePlayerInfo.users.filter((cv) => cv.color).length ==
        gamePlayerInfo.playerSize
      ) {
        playerInfoMsg(socket, "", room, gamePlayerInfo, true);
        gamePlayerInfo.users = gamePlayerInfo.users.map((cv) => {
          return { ...cv, cards: pickNCard(gamePlayerInfo.cardDeck, 5) };
        });
        gamePlayerInfo.isActive = true;
      } else {
        playerInfoMsg(socket, "", room, gamePlayerInfo, false);
      }
      GAME_ROOMS.set(room, gamePlayerInfo);
    }
  });

  socket.on("GET_ROOM_INFO", (data: Partial<UpdateColorPayload>) => {
    const { room = "", id = "" } = data;
    const gamePlayerInfo = GAME_ROOMS.get(room);
    if (!gamePlayerInfo) {
      invalidRoomError(socket, "Game room is not valid");
    } else {
      // Fix This
      const identity = id.substring(1, id.length - 1);
      const playerInfo = gamePlayerInfo.users.map((user) => {
        return {
          ...user,
          cards:
            user.id.toString() == identity
              ? user.cards
              : user.cards?.map(() => "LOGO"),
        };
      });
      console.log(playerInfo, room, id);
      socket.emit("ROOM_INFO", {
        users: playerInfo,
        board: gamePlayerInfo.board,
        activePlayer: gamePlayerInfo.activePlayer,
        isActive: gamePlayerInfo.isActive,
      });
    }
  });

  socket.on("MOVE", (data: MovePayload) => {
    const { room, color, action, location, card, id } = data;
    const gamePlayerInfo = GAME_ROOMS.get(room);
    if (!gamePlayerInfo) {
      invalidRoomError(socket, "Game room is not valid");
    } else {
      if (action == "PUT") {
        gamePlayerInfo.board = { ...gamePlayerInfo.board, [location]: color };
        gamePlayerInfo.users = gamePlayerInfo.users.map((user) => {
          if (user?.cards && user.id === id) {
            const index = user.cards.indexOf(card);
            user.cards[index] = pickACard(user.cards);
          }
          return user;
        });
      } else if (action == "REMOVE") {
        delete gamePlayerInfo.board[location];
        gamePlayerInfo.board = { ...gamePlayerInfo.board };
      }
      gamePlayerInfo.activePlayer =
        (gamePlayerInfo.activePlayer + 1) % gamePlayerInfo.playerSize;
      GAME_ROOMS.set(room, gamePlayerInfo);
      socket.in(room).emit("ROOM_INFO", {
        board: gamePlayerInfo.board,
        isActive: gamePlayerInfo.isActive,
      });
      socket.emit("ROOM_INFO", {
        board: gamePlayerInfo.board,
        activePlayer: gamePlayerInfo.activePlayer,
        isActive: gamePlayerInfo.isActive,
      });
    }
  });
});

app.post("/create-user", function (req, res) {
  res.send({ ...req.body, id: uuidv4() });
});

server.listen(4000, () => "Server is running on port 4000");
