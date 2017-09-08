
const GFGameEntryError = "GFGameEntryError";
const GFGameEntryResponse = 'GFGameEntryResponse';
module model {
    // import GFNetworkRequest = model.getUrlRequestResponse;
    import Timer = laya.utils.Timer;
    export enum GFUserType {
        Player,
        Audience
    }

    export enum GFRoomType {
        Normal,
        Arena
    }

    export enum GFEntryType {
        Normal,
        Back
    }

    /**
     * GFGameRoomViewModel
     */
    export class GFGameRoomViewModel {
        private _socket: GFWebSocket;
        public audienceNumber: number;
        public bet: number;
        public myself: GFPlayer;
        public playerActionSignal: GFSignal<GFGameMessage>;
        public bankerPlayer: GFPlayer;
        public challenger: GFPlayer;
        public isGameing: boolean;
        public level: number;
        public currentChip: GFChip;
        public isComparing: boolean;
        public isDispatching: boolean;
        public onlyFriend: boolean;
        public autoFollow: boolean;
        private originChallengerUrid: string;
        private messageTimer: Timer;
        private messageQueue: Array<GFGameMessage>;
        private baseChipUrl: string;
        public socketSignalBinding:GFSignalBinding;
        public get socket(): GFWebSocket {
            if (!this._socket) {
                this._socket = new GFWebSocket(7272);
                this.playerActionSignal = new GFSignal<GFGameMessage>();
                this.socketSignalBinding = this._socket.statusSignal.add(status => {//socket status signal
                    GFLog(status);
                    switch (status) {
                        case GFWebSocketStatus.Close: {
                            Laya.stage.event(GFGameEntryError);
                            new view.GFCenterMsgDialog("网络异常");
                        }
                            break;
                        case GFWebSocketStatus.Open: {
                            this.enterRoom();
                        }
                            break;
                        case GFWebSocketStatus.Error: {
                            this.socket = null;
                        }
                        break;
                    }
                });
                this._socket.messageSignal.add(message => {//socket message signal
                    GFLog(message);
                    if (message.length > 0) {
                        let msgObj: GFGameMessage = JSON.parse(message);
                        if (msgObj.action == GFGameMessageActionType.AddBaseChip) {//do not add base chip action to queue
                            this.dealWithGameMessage(msgObj)
                        } else {
                            this.messageQueue.push(msgObj);
                        }
                    }
                });
            }
            return this._socket;
        }


        public get myselfIsPlaying(): boolean {
            if (this.myself) {
                return this.isGameing && this.myself.isActive;
            } else {
                return false;
            }
        }

        public get isOriginChallenger(): boolean {
            return this.myself.urid == this.originChallengerUrid;
        }

        constructor(public grid: string, public entryType: GFEntryType, public roomID?: string, public userType?: GFUserType, public roomType?: GFRoomType) {
            this.socket.connect();
            this.isGameing = false;
            this.isComparing = false;
            this.isDispatching = false;
            this.onlyFriend = false;
            this.autoFollow = false;
            if (userType == undefined) {
                this.userType = GFUserType.Player;
            }
            if (roomType == undefined) {
                this.roomType = GFRoomType.Normal;
            }
            this.messageQueue = new Array<GFGameMessage>();
            this.messageTimer = new Timer();
            this.messageTimer.loop(100, this, this.messageProcesser);
        }

        public enterRoom() {
            if (this.roomType == GFRoomType.Normal) {
                model.getUrlRequestResponse("game/entry", { "grid": this.grid, "roid": this.roomID, "type":this.entryType }, Handler.create(this, function (param: any) {
                    this.dealWithRoomResponse(param);
                    this.entryType = GFEntryType.Normal;
                }), true, true);
            } else {
                model.getUrlRequestResponse("arena/entry", { "roid": this.roomID, "type": this.userType }, Handler.create(this, function (param: any) {
                    this.dealWithRoomResponse(param);
                }), true, true);
            }
        }

        public sendEnterAction() {
            let action = {
                "action": GFGameMessageActionType.Enter,
                "roid": this.roomID,
                "urid": GFPlayer.myUrid,
                "userType": this.userType,
                "roomType": this.roomType
            }
            this.socket.send(JSON.stringify(action));
        }

        public sendQuitAction(type: number = 0) {
            let action = {
                "action": GFGameMessageActionType.Quit,
                "roid": this.roomID,
                "urid": GFPlayer.myUrid,
                "userType": this.userType,
                "roomType": this.roomType,
                "quitType": type
            }
            this.socket.send(JSON.stringify(action));
        }

        public sendPrepareAction() {
            let action = {
                "action": GFGameMessageActionType.Prepare,
                "roid": this.roomID,
                "urid": GFPlayer.myUrid,
                "userType": this.userType,
                "roomType": this.roomType
            }
            this.socket.send(JSON.stringify(action));
        }

        public sendBasicChipAction() {
            let basicChip = null;
            if (this.roomType == GFRoomType.Arena) {
                basicChip = new GFChip(100000, this.currentChip.level, Math.floor(this.bet / 100000));
            } else {
                let minChip = GFChip.getMinChipOfLevel(this.level);
                basicChip = new GFChip(this.bet, minChip.level, 1);
            }

            let action = {
                "action": GFGameMessageActionType.AddBaseChip,
                "roid": this.roomID,
                "urid": GFPlayer.myUrid,
                "chip": basicChip,
                "userType": this.userType,
                "roomType": this.roomType
            }
            this.socket.send(JSON.stringify(action));
        }

        public sendFollowChipAction() {
            if (this.myself.status == GFPlayerStatus.HidePoker) {
                this.currentChip.multiply = 1;
            } else {
                this.currentChip.multiply = 2;
            }
            let action = {
                "action": GFGameMessageActionType.Follow,
                "roid": this.roomID,
                "urid": GFPlayer.myUrid,
                "chip": this.currentChip,
                "userType": this.userType,
                "roomType": this.roomType
            }
            this.socket.send(JSON.stringify(action));
        }

        public sendAddChipAction(chip: GFChip) {
            if (this.myself.status == GFPlayerStatus.HidePoker) {
                chip.multiply = 1;
            } else {
                chip.multiply = 2;
            }
            let action = {
                "action": GFGameMessageActionType.AddChip,
                "roid": this.roomID,
                "urid": GFPlayer.myUrid,
                "chip": chip,
                "userType": this.userType,
                "roomType": this.roomType
            }
            this.socket.send(JSON.stringify(action));
        }

        public sendLookAction() {
            let action = {
                "action": GFGameMessageActionType.Look,
                "roid": this.roomID,
                "urid": GFPlayer.myUrid,
                "userType": this.userType,
                "roomType": this.roomType
            }
            this.socket.send(JSON.stringify(action));
        }

        public sendCompareAction(toUrid: string) {
            if (this.myself.status == GFPlayerStatus.HidePoker) {
                this.currentChip.multiply = 2;
            } else {
                this.currentChip.multiply = 4;
            }
            let action = {
                "action": GFGameMessageActionType.Compare,
                "roid": this.roomID,
                "urid": GFPlayer.myUrid,
                "toUrid": toUrid,
                "chip": this.currentChip,
                "userType": this.userType,
                "roomType": this.roomType
            }
            this.socket.send(JSON.stringify(action));
        }

        public sendFinishAction() {
            if (this.myself.status == GFPlayerStatus.HidePoker) {
                this.currentChip.multiply = 2;
            } else {
                this.currentChip.multiply = 4;
            }
            let action = {
                "action": GFGameMessageActionType.Finish,
                "roid": this.roomID,
                "urid": GFPlayer.myUrid,
                "chip": this.currentChip,
                "userType": this.userType,
                "roomType": this.roomType
            }
            this.socket.send(JSON.stringify(action));
        }

        public sendGiveUpAction() {
            let action = {
                "action": GFGameMessageActionType.GiveUp,
                "roid": this.roomID,
                "urid": GFPlayer.myUrid,
                "userType": this.userType,
                "roomType": this.roomType
            }
            this.socket.send(JSON.stringify(action));
        }

        public sendVoiceAction(index: number) {
            let action = {
                "action": GFGameMessageActionType.SendVoice,
                "roid": this.roomID,
                "urid": GFPlayer.myUrid,
                "resourceIdx": index,
                "userType": this.userType,
                "roomType": this.roomType
            }
            this.socket.send(JSON.stringify(action));
        }

        public sendEmojiAction(index: number) {
            let action = {
                "action": GFGameMessageActionType.SendEmoji,
                "roid": this.roomID,
                "urid": GFPlayer.myUrid,
                "resourceIdx": index,
                "userType": this.userType,
                "roomType": this.roomType
            }
            this.socket.send(JSON.stringify(action));
        }

        public resetMessageTimer() {
            this.messageQueue.length = 0;
            this.messageTimer.clear(this, this.messageProcesser);
        }
        //private method
        private messageProcesser() {
            if (this.messageQueue.length > 0 && !this.isComparing && !this.isDispatching) {
                let message = this.messageQueue[0];
                this.messageQueue.splice(0, 1);
                this.dealWithGameMessage(message);
            }
        }

        private dealWithRoomResponse(param: any) {
            GFLog("entry result:" + JSON.stringify(param));
            if (param.errcode == 0 || param.errcode == 203) {
                this.level = param.ground.level;
                this.roomID = param.roid;
                this.bet = param.ground.bet;
                if (this.roomType == GFRoomType.Normal){
                    this.baseChipUrl = param.ground.beturl;
                    Laya.loader.load(this.baseChipUrl);
                }
                if (this.roomType == GFRoomType.Arena) {
                    this.onlyFriend = param.friend;
                    this.originChallengerUrid = param.oboss;
                }
                this.currentChip = GFChip.getMinChipOfLevel(this.level);
                this.sendEnterAction();
                Laya.stage.event(GFGameEntryResponse);
            } else {
                Laya.stage.event(GFGameEntryError);
            }
        }

        private dealWithGameMessage(message: GFGameMessage) {
            if (!message) {
                return;
            }
            if (message.action) {
                message = new GFGameMessage().deserialize(message);//json object to class instance
                //arrange user position if needed
                let myself = message.getMyself();
                if (myself) {
                    this.myself = myself;
                }
                if (this.myself) {
                    message.users.forEach(user => {
                        let newPosition = user.position - this.myself.position;
                        if (newPosition < 0) {
                            newPosition += 5;
                        }
                        user.referPosition = newPosition;
                    });
                } else {
                    message.users.forEach(user => {
                        user.referPosition = user.position;
                    });
                }

                switch (message.action) {
                    case GFGameMessageActionType.Enter:
                        if (message.isStart) {
                            this.isGameing = message.isStart;
                        }
                        message.users.forEach(user => {
                            if (user.urid == this.originChallengerUrid){
                                this.challenger = user;
                            }
                        });
                        break;
                    case GFGameMessageActionType.Quit:

                        break;
                    case GFGameMessageActionType.Prepare:

                        break;
                    case GFGameMessageActionType.AddBaseChip:
                        if (this.roomType == GFRoomType.Normal){
                            message.chip.isBaseChip = true;
                            message.chip.baseChipUrl = this.baseChipUrl;
                        }
                        break;
                    case GFGameMessageActionType.Follow:
                        this.currentChip = message.chip;
                        break;
                    case GFGameMessageActionType.AddChip:
                        this.currentChip = message.chip;
                        break;
                    case GFGameMessageActionType.Look:

                        break;
                    case GFGameMessageActionType.Compare:

                        break;
                    case GFGameMessageActionType.Finish:
                        this.isGameing = false;
                        break;
                    case GFGameMessageActionType.GiveUp:

                        break;
                    case GFGameMessageActionType.SendVoice:

                        break;
                    case GFGameMessageActionType.SendEmoji:

                        break;
                    case GFGameMessageActionType.SendGift:

                        break;
                    case GFGameMessageActionType.RoundBegin:
                        this.isGameing = true;
                        this.currentChip = GFChip.getMinChipOfLevel(this.level);
                        break;
                    case GFGameMessageActionType.PokerTurn:

                        break;
                    case GFGameMessageActionType.BankerChange:
                        this.bankerPlayer = message.users[0];
                        break;
                    case GFGameMessageActionType.Relieve:

                        break;
                    case GFGameMessageActionType.Audience:
                        this.audienceNumber = message.viewers;
                        break;
                    case GFGameMessageActionType.ForceQuit:

                        break;
                    case GFGameMessageActionType.Challenger:
                        this.challenger = message.users[0];
                        break;
                    case GFGameMessageActionType.TipMsg:

                        break;
                    case GFGameMessageActionType.PointChange:

                        break;
                    case GFGameMessageActionType.MultiCard:

                        break;
                    default:
                        break;
                }

                this.playerActionSignal.dispatch(message);
            }
        }

    }
}