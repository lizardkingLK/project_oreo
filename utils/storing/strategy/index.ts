import { strategyTypes } from '@/utils/enums';
import { Local } from './local';
import { Cloud } from './cloud';

export interface IStoring {
  store: (content: any) => void;
  initialize: (options: object) => void;
}

export class Storing implements IStoring {
  private strategy: IStoring;

  constructor(strategy: IStoring) {
    this.strategy = strategy;
  }

  private static get(type: string | undefined): IStoring | null {
    if (type === strategyTypes.local) {
      return new Local();
    } else if (type === strategyTypes.cloud) {
      return new Cloud();
    }
    return null;
  }

  public static create(type: string | undefined, options: object): IStoring {
    const storing = Storing.get(type)!;
    storing.initialize(options);
    return storing;
  }

  public initialize(options: object) {
    this.strategy.initialize(options);
  }

  public store(content: object) {
    this.strategy.store(content);
  }
}
