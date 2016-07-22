import { Injectable } from '@angular/core';

export interface IWindow {
  navigator: any;
  location: any;
  innerWidth: number;
  localStorage: any;
  innerHeight: number;
  alert(msg: string): void;
  confirm(msg: string): void;
  open(url: string): void;
}

@Injectable()
export class WindowService implements IWindow {
  public navigator: any = {};
  public location: any = {};
  public innerWidth: number;
  public innerHeight: number;
  public localStorage: any;
  public alert(msg: string): void { return; }
  public confirm(msg: string): void { return; }
  public open(url: string): void { return; }
}
