const GAME_ROOMS = new Map();
const ALL_USERS = [];

const randomGameNumber = Math.floor(Math.random() * 90000) + 10000;
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

export default func = {
  GAME_ROOMS,
  ALL_USERS,
  randomGameNumber,
  validateGameRoomId,
  generateValidGameId,
};
