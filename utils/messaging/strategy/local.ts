import { apiUrls } from '@/utils/http';
import {
  IMessaging,
  setFriendType,
  setOnlineType,
  setOutputType,
  setUpdatedType,
} from '.';
import io, { Socket } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { IActiveProps, IDeletedMessageProps, IMessageProps } from '@/types';

type setActiveType = (state: IActiveProps) => void;
type setRoomsType = (state: boolean) => void;
type setDeletedType = (state: IDeletedMessageProps) => void;

export class Local implements IMessaging {
  private socket: Socket<DefaultEventsMap, DefaultEventsMap> | null = null;
  private setOnline: setOnlineType | null = null;
  private setFriend: setFriendType | null = null;
  private setOutput: setOutputType | null = null;
  private setUpdated: setUpdatedType | null = null;
  private setActive: setActiveType | null = null;
  private setDeleted: setDeletedType | null = null;
  private setRooms: setRoomsType | null = null;

  private initializeSocket = async () => {
    await fetch(apiUrls.socket);
    this.socket = io();

    this.socket.on('connect', () => console.log('connected'));

    this.socket.on('new-message', (msg) => {
      this.setOutput?.(msg);
    });

    this.socket.on('is-active', (active) => {
      this.setActive?.(active);
    });

    this.socket.on('delete-message', (msg) => {
      this.setDeleted?.(msg);
    });

    this.socket.on('update-message', (msg) => {
      this.setUpdated?.(msg);
    });

    this.socket.on('new-friend', (msg) => {
      this.setFriend?.(msg);
    });

    this.socket.on('set-rooms', () => {
      this?.setRooms?.(true);
    });

    this.socket.on('set-online', (user) => {
      this.setOnline?.(user);
    });
  };

  public initialize({
    userId,
    setOnline,
    setFriend,
    setOutput,
    setUpdated,
    setActive,
    setDeleted,
    setRooms,
  }: any) {
    this.setOnline = setOnline;
    this.setFriend = setFriend;
    this.setOutput = setOutput;
    this.setUpdated = setUpdated;
    this.setActive = setActive;
    this.setDeleted = setDeleted;
    this.setRooms = setRooms;
    this.initializeSocket().then(() => this.emitMessage('identity', userId));
  }

  public sendMessage = (msg: IMessageProps) => {
    this.socket?.emit('new-message', msg);
  };

  public emitMessage = (event: string, msg: any) => {
    this.socket?.emit(event, msg);
  };

  public dispose = () => {
    this.socket?.close();
  };
}
