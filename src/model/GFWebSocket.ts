module model {
    import Socket = laya.net.Socket;
    import Event = laya.events.Event;
    export enum GFWebSocketStatus {
        Open = 0,
        Close,
        Message,
        Error
    }
    /**
     * GFSocket
     */
    export class GFWebSocket {
        private socket: Socket = new Socket();
        public statusSignal: GFSignal<number>;
        public messageSignal: GFSignal<string>;
        constructor(public port: number, public host: string = HOST, connect: boolean = false) {
            this.statusSignal = new GFSignal<number>();
            this.messageSignal = new GFSignal<string>();
            this.socket.on(Event.OPEN, this, this.socketStatusHandler, [GFWebSocketStatus.Open]);
            this.socket.on(Event.CLOSE, this, this.socketStatusHandler, [GFWebSocketStatus.Close]);
            this.socket.on(Event.MESSAGE, this, this.socketStatusHandler, [GFWebSocketStatus.Message]);
            this.socket.on(Event.ERROR, this, this.socketStatusHandler, [GFWebSocketStatus.Error]);
            if (connect) {
                this.socket.connect(host, port);
            }
        }


        public get connected(): boolean {
            return this.socket.connected;
        }


        public connect() {
            this.socket.connect(this.host, this.port);
        }

        public send(message: string) {
            if (message.length > 0) {
                GFLog("SEND:"+message);
                if (this.socket.connected) {
                    this.socket.send(message);
                } else {
                    let gameHome = Laya.stage.getChildByName(view.GFHomePageView.name);
                    let oldGameRoom = gameHome.getChildByName("GFGameRoom");
                    if (oldGameRoom){
                        Laya.timer.once(100, this, this.send, [message]);
                    }
                }
            }
        }

        public close() {
            try {
                this.socket.close();
                Laya.timer.clear(this,this.send);
            } catch (error) {

            }
        }
        //private method
        private socketStatusHandler(...param: any[]) {
            let status: GFWebSocketStatus = param[0];
            this.statusSignal.dispatch(status);
            if (status == GFWebSocketStatus.Message) {
                if (param[1] == "{\"ping\"}"){
                    this.send("{\"pong\"}");
                }else{
                    this.messageSignal.dispatch(param[1]);
                }
            }
        }
    }
}