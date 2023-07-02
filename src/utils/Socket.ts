import { checkPrime } from 'crypto';
export default class Socket {

  ws!: WebSocket;
  events: { [e: string]: { id: string, f: Function, t?: any }[] } = {};
  pingInterval!: NodeJS.Timer;
  stInterval!: NodeJS.Timer;

  Connect(url: string, port: number, address: string) {
    this.ws = new WebSocket(url + ':' + port + "/" + address);
    this.ws.onopen = this.OnOpenSocket.bind(this);
    this.ws.onclose = this.OnCloseSocket.bind(this);
    this.ws.onmessage = this.OnSocketMessage.bind(this);
    this.ws.onerror = this.OnSocketError.bind(this);

    // this.Listen(NetworkReceiveEvents.SERVER_TIME, this.onServerTime, this)
  }

  Disconnect(code: number, reason: any) {
    console.log("Disconnecting from server!");
    this.ws.close(code, reason);
  }

  startTid!: NodeJS.Timeout;
  //Socket functions
  async OnOpenSocket(event: any) {
    console.log("Connected to server!");

    this.startTid = setInterval(() => {
      this.Start()
    }, 100);

  }

  private Start() {
    if (this.ws.readyState === WebSocket.OPEN) {
      clearInterval(this.startTid);
      // this.startTid = null;
      // this.pingInterval = setInterval(() =>
      //   this.Send("Ping", ""), 5000);
      // this.stInterval = setInterval(() => {
      //   this.Send(NetworkSendEvents.SERVER_TIME, '')
      // }, 10000);
      // GlobalIns.fire(GlobalEvents.Soket_Connected, null)
    }
  }

  OnCloseSocket(event: any) {
    console.log("Closed connection");

    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      // this.pingInterval = null;
    }
    if (this.startTid) {
      clearInterval(this.startTid);
      // this.startTid = null;
    }
    if (this.stInterval) {
      clearInterval(this.stInterval);
      // this.stInterval = null;
    }

    console.log(event.code + " : " + event.reason);

    if (event.code == 3001) {
      this.InvokeListeners('FailedAuth', event.reason);
    }
    if (event.code == 3002) {
      this.InvokeListeners('DuplicateUser', event.reason);
    }
    if (event.code == 3003) {
      this.InvokeListeners('ChangeAccount', event.reason);
    }
    if (event.code !== 3001 && event.code !== 3002) {
      // this.InvokeListeners(GlobalEvents.Soket_Disconnect, '')
    }
    //todo
    //auto connect

  }

  onServerTime(data: { time: number }) {
    // GlobalIns.serverTime = data.time;
  }

  OnSocketError(event: any) {
    console.error("WebSocket error observed: " + event.message);

  }

  OnSocketMessage(msg: any) {
    msg = JSON.parse(msg.data);

    this.InvokeListeners(msg.e, msg.d);
  }
  //

  Listen(eventName: string, cb: Function, thisObj: any = null) {
    // if (!this.events[eventName]) {
    //   this.events[eventName] = [];
    // }
    //
    // let eventID = pc.guid.create();
    //
    // this.events[eventName].push({
    //   id: eventID,
    //   f: cb,
    //   t: thisObj
    // });
    //
    // return eventID;
  }

  RemoveListener(eventName: string, id: string) {
    if (!this.events[eventName] || this.events[eventName].length == 0)
      return;

    let eventArr = this.events[eventName];

    for (let i = 0; i < eventArr.length; i++) {
      if (eventArr[i].id !== id) {
        continue;
      }

      let it = this.events[eventName].splice(i, 1);
      break;
    }
  }

  ClearListeners() {
    this.events = {};
  }

  InvokeListeners(eventName: string, data: any) {
    if (!this.events[eventName] || this.events[eventName].length == 0)
      return;

    let eventArr = this.events[eventName];
    for (let i = 0; i < eventArr.length; i++) {
      let o = eventArr[i]
      o.f.call(o.t, data);
    }
  }

  Send(eventName: string, data: any) {
    let pkg = { "e": eventName, "d": data };
    let s = JSON.stringify(pkg);
    if (!this.ws || !this.isConnected) {
      if (this.ws) {
        console.warn('socket is not connected, state: ' + this.ws.readyState + '  ' + s);
      } else {
        console.warn('socket is not inited,' + s);
      }

      return false;
    }
    this.ws.send(s);
    return true;
  }

  get isConnected() { return this.ws && this.ws.readyState == WebSocket.OPEN; }
};
