export type COLOR_TYPE = "RED" | "GREEN" | "BLUE";
export interface UserInfoType {
  userName?: string;
  id: string;
  color?: COLOR_TYPE;
  room?: string;
  isAdmin?: boolean;
  cards?: string[];
}
export interface GameInfoType {
  users: UserInfoType[];
  playerSize: number;
  cardDeck: string[];
  board: Record<string, string>;
  activePlayer: number;
  isActive: boolean;
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
  action: "PUT" | "REMOVE";
  location: string;
  card: string;
}
