import { strategyTypes } from '@/utils/enums';
import { Local } from './local';
import { Cloud } from './cloud';
import {
  IMessageDataProps,
  IMessageProps,
  IUpdatedMessageProps,
  IUserOnlineProps,
} from '@/types';

export type setOnlineType = (state: IUserOnlineProps) => void;
export type setFriendType = (state: IMessageDataProps) => void;
export type setOutputType = (state: IMessageProps) => void;
export type setUpdatedType = (state: IUpdatedMessageProps) => void;
export type strategyType = string | undefined;

export interface IMessaging {
  sendMessage: (message: IMessageProps) => void;
  emitMessage: (event: string, message: any) => void;
  initialize: (options: object) => void;
  dispose: () => void;
}

export class Messaging implements IMessaging {
  private strategy: IMessaging;

  constructor(strategy: IMessaging) {
    this.strategy = strategy;
  }

  public static create(type: strategyType, options: object): IMessaging {
    const messaging = Messaging.get(type)!;
    messaging.initialize(options);
    return messaging;
  }

  private static get(type: strategyType): IMessaging | null {
    if (type === strategyTypes.local) {
      return new Local();
    } else if (type === strategyTypes.cloud) {
      return new Cloud();
    }
    return null;
  }

  public initialize(options: object) {
    this.strategy.initialize(options);
  }

  public sendMessage(message: IMessageProps) {
    this.strategy.sendMessage(message);
  }

  public emitMessage = () => {};

  public dispose = () => {
    this.strategy.dispose();
  };
}
