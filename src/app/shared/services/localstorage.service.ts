import { Injectable, Inject, forwardRef } from '@angular/core';
import { WindowService } from './window.service';

interface IKEYS {
  facebookAuth: string;
  googleAuth: string;
  twitterAuth: string;
}

const PREFIX: string = `universalApp.`;

@Injectable()
export class LocalStorageService {
  public static KEYS: IKEYS = {
    facebookAuth: `${PREFIX}facebookAuth`,
    googleAuth: `${PREFIX}googleAuth`,
    twitterAuth: `${PREFIX}twitterAuth`
  };

  constructor(@Inject(forwardRef(() => WindowService)) private win: WindowService) {}

  public setItem(key: string, data: any): void {
    if (this.win.localStorage) {
      this.win.localStorage.setItem(key, JSON.stringify(data));
    }
  }

  public getItem(key: string): any {
    if (this.win.localStorage) {
      let value = this.win.localStorage.getItem(key);
      if (value) {
        return JSON.parse(value);
      } else {
        return null;
      }
    }
  }

  public removeItem(key: string): void {
    if (this.win.localStorage) {
      this.win.localStorage.removeItem(key);
    }
  }
}
