import React, { createContext, useContext, useEffect, useState } from 'react';
import socket from '../../common/socket';
import { SocketAction, SocketListner, UserType } from '../../common/types';
import { useNavigate } from 'react-router-dom';

interface BoardContextProps {
  coinPosition: Record<string, string>;
  playerInfo: UserType[];
  activePlayer: number | null;
  currentPlayerId: string;
  room: string;
  updateBoard: ({
    coinPosition,
    playerInfo,
    activePlayer,
  }: {
    coinPosition: Record<string, string>;
    playerInfo?: UserType[];
    activePlayer?: number;
  }) => void;
}
const BoardConetext = createContext({} as BoardContextProps);
export const BoardContextProvider = ({
  children,
  room,
  id,
}: {
  children: React.ReactChild;
  room: string;
  id: string;
}) => {
  const [coinPosition, setCoinPostion] = useState<Record<string, string>>({});
  const [currentPlayerId] = useState<string>(id.substring(1, id.length - 1));
  const [playerInfo, setPlayerInfo] = useState<UserType[]>([]);
  const [activePlayer, setActivePlayer] = useState<number | null>(null);
  const navigate = useNavigate();
  const updateBoard = ({
    coinPosition,
    playerInfo,
    activePlayer,
  }: {
    coinPosition: Record<string, string>;
    playerInfo?: UserType[];
    activePlayer?: number;
  }) => {
    if (coinPosition) {
      setCoinPostion(coinPosition);
    }
    if (playerInfo) {
      setPlayerInfo(playerInfo);
    }
    if (activePlayer) {
      setActivePlayer(activePlayer);
    }
  };
  useEffect(() => {
    socket.emit(SocketAction.GET_ROOM_INFO, { room, id: id.replaceAll('^"|"$', '') });
  }, [room, id]);
  useEffect(() => {
    socket.on(SocketListner.ROOM_INFO, (data) => {
      if (!data?.isActive) {
        navigate('/user-selection');
      }
      if (data?.board) setCoinPostion(data.board);
      if (data?.users) setPlayerInfo(data.users);
      if (data?.activePlayer !== undefined) setActivePlayer(data.activePlayer);
    });
    socket.on(SocketListner.ERROR_MESSAGE, (data) => {
      if (!data?.isActive) {
        navigate('/user-selection');
      }
    });
    socket.on(SocketListner.MOVE_INFO, (data) => {
      if (data?.activePlayer !== undefined) setActivePlayer(data.activePlayer);
      if (data?.board) setCoinPostion(data.board);
      if (data?.currentPlayerInfo)
        setPlayerInfo((prevState) => [
          ...prevState.map((cv) => {
            if (cv?.id === data?.currentPlayerInfo?.id) {
              return { ...data?.currentPlayerInfo };
            } else return cv;
          }),
        ]);
    });
    return () => {
      socket.off(SocketListner.ROOM_INFO);
      socket.off(SocketListner.ERROR_MESSAGE);
      socket.off(SocketListner.MOVE_INFO);
    };
  }, []);

  return (
    <BoardConetext.Provider
      value={{ currentPlayerId, coinPosition, playerInfo, activePlayer, updateBoard, room }}
    >
      {children}
    </BoardConetext.Provider>
  );
};
export const useBoardContext = () => {
  const conetxt = useContext(BoardConetext);
  if (!conetxt) {
    console.error('useBoardContext Should be used inside BoardConetextProvider');
  }
  return conetxt;
};
