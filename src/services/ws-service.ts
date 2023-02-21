import { BASE_WS_URL, CHATS_API_URL } from '../utils/const-variables/api';
import { Observable } from './observable';
import { displayModal } from '../utils/util-functions/modal';

export enum WsContentTypes {
  MESSAGE = 'message',
  GET_OLD = 'get old',
  PING = 'ping',
  FILE = 'file',
  STICKER = 'sticker',
}

export enum WsServerTypes {
  PONG = 'pong',
  USER_CONNECTED = 'user connected',
}

export enum WsEvents {
  CONNECTED = 'connected',
  NEW_MESSAGE = 'message',
  OLD_MESSAGES = 'old_messages',
}

export class WsService extends Observable {
  private _socket: WebSocket;
  private _interval = 0;
  private PING_TIMEOUT = 20_000;

  constructor(userId: string, chatId: string, token: string) {
    super({
      [WsEvents.NEW_MESSAGE]: [],
      [WsEvents.OLD_MESSAGES]: [],
      [WsEvents.CONNECTED]: [],
    });
    this._socket = new WebSocket(
      `${BASE_WS_URL}/${CHATS_API_URL}/${userId}/${chatId}/${token}`
    );
    this._addEventListeners = this._addEventListeners.bind(this);
    this._ping = this._ping.bind(this);
    this.send = this.send.bind(this);
    this.close = this.close.bind(this);
    this._addEventListeners();
  }

  private _addEventListeners() {
    this._socket.addEventListener('open', () => {
      console.log(`WS connection established`);
      this.emit(WsEvents.CONNECTED);
      this._interval = window.setInterval(
        () => this._ping(),
        this.PING_TIMEOUT
      );
    });

    this._socket.addEventListener('close', event => {
      if (event.wasClean) {
        console.log('Connection close was clean');
      } else {
        // TODO: try to reconnect
        console.warn('Connection was lost');
        displayModal({
          type: 'info',
          message: 'Connection was lost. Please reload the page.',
        });
      }
      console.log(`Code: ${event.code} | Reason: ${event.reason}`);
      clearInterval(this._interval);
    });

    this._socket.addEventListener('message', event => {
      const message = JSON.parse(event.data);
      if (Array.isArray(message)) {
        this.emit(WsEvents.OLD_MESSAGES, message);
      }
      if (
        message.type === WsContentTypes.MESSAGE ||
        message.type === WsContentTypes.FILE
      ) {
        this.emit(WsEvents.NEW_MESSAGE, message);
      }
    });

    this._socket.addEventListener('error', event => {
      console.error('Error', event);
    });
  }

  private _ping() {
    this.send(WsContentTypes.PING);
  }

  send(type: WsContentTypes, message = '') {
    this._socket.send(
      JSON.stringify({
        content: message,
        type,
      })
    );
  }

  close(code?: number, reason?: string) {
    this._socket.close(code, reason);
  }
}
