import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserType } from '../UserForm/UserSlection';
import socket from '../../common/socket';
import { SocketAction, SocketListner } from '../../common/types';
import { useNavigate } from 'react-router-dom';

interface BoardContextProps {
  coinPosition: Record<string, string>;
  playerInfo: UserType[];
  activePlayer: string;
  currentPlayerId: string;
  updateBoard: ({
    coinPosition,
    playerInfo,
    activePlayer,
  }: {
    coinPosition: Record<string, string>;
    playerInfo?: UserType[];
    activePlayer?: string;
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
  const [currentPlayerId] = useState(id);
  const [playerInfo, setPlayerInfo] = useState<UserType[]>([]);
  const [activePlayer, setActivePlayer] = useState<string>('');
  const navigate = useNavigate();

  const updateBoard = ({
    coinPosition,
    playerInfo,
    activePlayer,
  }: {
    coinPosition: Record<string, string>;
    playerInfo?: UserType[];
    activePlayer?: string;
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
    console.log(room, id.substring(1, id.length - 1));

    socket.emit(SocketAction.GET_ROOM_INFO, { room, id: id.replaceAll('^"|"$', '') });
  }, [room, id]);
  useEffect(() => {
    socket.on(SocketListner.ROOM_INFO, (data) => {
      console.log(data);
      if (!data?.isActive) {
        navigate('/user-selection');
      }
      if (data?.board) setCoinPostion(data.board);
      if (data?.users) setPlayerInfo(data.users);
      if (data?.users) setPlayerInfo(data.users);
    });
    socket.on(SocketListner.ERROR_MESSAGE, (data) => {
      if (!data?.isActive) {
        navigate('/user-selection');
      }
    });
    return () => {
      socket.off(SocketListner.ROOM_INFO);
      socket.off(SocketListner.ERROR_MESSAGE);
    };
  }, []);

  return (
    <BoardConetext.Provider
      value={{ currentPlayerId, coinPosition, playerInfo, activePlayer, updateBoard }}
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
