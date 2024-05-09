export type COLOR_TYPE = 'RED' | 'GREEN' | 'BLUE';
export interface UserType {
  userName?: string;
  id?: string;
  color?: COLOR_TYPE;
  room?: string;
  isAdmin?: boolean;
  cards?: string[];
}
export enum SocketAction {
  CREATE_ROOM = 'CREATE_ROOM',
  JOIN_GAME = 'JOIN_GAME',
  UPDATE_COLOR = 'UPDATE_COLOR',
  MOVE = 'MOVE',
  GET_ROOM_INFO = 'GET_ROOM_INFO',
  GET_MY_CARDS = 'GET_MY_CARDS',
}
export enum SocketListner {
  ROOM_CREATED = 'ROOM_CREATED',
  PLAYER_MESSAGE = 'PLAYER_MESSAGE',
  ERROR_MESSAGE = 'ERROR_MESSAGE',
  ROOM_INFO = 'ROOM_INFO',
  MY_CARD = 'MY_CARD',
  MOVE_INFO = 'MOVE_INFO',
}
export interface CreateRoomPayload {
  userName: string;
  id: string;
  color: COLOR_TYPE;
  initiationId: string;
  playerSize: number;
}
export interface JoinRoomPayload {
  userName: string;
  room: string;
  id: string;
}
export interface UpdateColorPayload {
  room: string;
  id: string;
  color: COLOR_TYPE;
}
export interface MovePayload extends UpdateColorPayload {
  action: 'PUT' | 'REMOVE';
  location: string;
  card: string;
}
