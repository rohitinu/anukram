import { Socket } from "socket.io";
import { GameInfoType } from "../types";

export const GAME_ROOMS: Map<string, GameInfoType> = new Map();

export const randomGameNumber = (): number =>
  Math.floor(Math.random() * 90000) + 10000;
const validateGameRoomId = (newGameId: string): boolean => {
  const gameIds = Array.from(GAME_ROOMS.keys());
  return !gameIds.includes(newGameId);
};
export const generateValidGameId = (): string => {
  const gameId = randomGameNumber();
  if (validateGameRoomId(gameId.toString())) {
    return gameId.toString();
  } else return generateValidGameId();
};
export const invalidRoomError = (socket: Socket, msg: string) => {
  socket.emit("ERROR_MESSAGE", {
    message: msg,
  });
};
export const playerInfoMsg = (
  socket: Socket,
  msg: string,
  room: string,
  playerInfo: GameInfoType,
  start = false
) => {
  socket.in(room).emit("PLAYER_MESSAGE", {
    message: msg,
    gameInfo: playerInfo,
    start,
  });
  socket.emit("PLAYER_MESSAGE", {
    message: msg,
    gameInfo: playerInfo,
    room,
    start,
  });
};
