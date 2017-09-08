module view {
    export enum PlayerMessageType {
        PlayerMessageTypeLook = 0,//看牌
        PlayerMessageTypeAddChip,//加注
        PlayerMessageTypeFollow,//跟注
        PlayerMessageTypeCompare,//比牌
        PlayerMessageTypeFinish,//开牌
        PlayerMessageTypeGiveUp//放弃
    }
    import GFPlayerViewUI = ui.GFPlayerViewUI;
    import GFColorFacotry = model.getColorWithNumber;
    import GFPlayer = model.GFPlayer;
    import GFPlayerPosition = model.GFPlayerPosition;
    import GFplayerStatus = model.GFPlayerStatus;
    import GFPoker = model.GFPoker;
    import GFPokerStatus = model.GFPokerStatus;
    import Stage = laya.display.Stage;
    import Image = laya.ui.Image;
    import Tween = laya.utils.Tween;
    import Point = laya.maths.Point;
    import Ease = laya.utils.Ease;
    import ProgressBar = laya.ui.ProgressBar;
    export class GFPlayerView extends GFPlayerViewUI {
        static messageImageArray: Array<string> = [
            "comp/image_kanpai_zuo.png",
            "comp/image_kanpai_you.png",
            "comp/image_jiazhu_zuo.png",
            "comp/image_jiazhu_you.png",
            "comp/image_genzhu_zuo.png",
            "comp/image_genzhu_you.png",
            "comp/image_bipai_zuo.png",
            "comp/image_bipai_you.png",
            "comp/image_kaipai_zuo.png",
            "comp/image_kaipai_you.png",
            "comp/image_fangqi_zuo.png",
            "comp/image_fangqi_you.png"];
        static vipImageArray: Array<string> = [
            "comp/image_dengji.png",
            "comp/image_dengji1.png",
            "comp/image_dengji2.png",
            "comp/image_dengji3.png",
            "comp/image_dengji4.png",
            "comp/image_dengji5.png",
            "comp/image_dengji6.png",
            "comp/image_dengji7.png",
            "comp/image_dengji8.png",
            "comp/image_dengji9.png",
            "comp/image_dengji10.png"
        ];
        static selfPokerViewScaleFactor: number = 1.3;
        public isPokerDispathing: boolean;
        private _pokerGroupView: GFPokerGroupView;
        private _prepareView: Image;
        private _pokerGroupViewPos: Point;
        private _bankerView: Image;
        private _progressView: ProgressBar;
        private _vipImage: Image;
        private _multiCardTag : GFMultiCardTagView;
        constructor(public player?: GFPlayer) {
            super();
            this.dataSource = { width: 120, height: 180 };
            this.playerName.dataSource = { color: GFColorFacotry(11), fontSize: 20, align: Stage.ALIGN_CENTER, overflow: "hidden", valign: Stage.ALIGN_MIDDLE };
            this.lottery.dataSource = { color: GFColorFacotry(11), fontSize: 18, align: Stage.ALIGN_LEFT, overflow: "visible", valign: Stage.ALIGN_MIDDLE };
            this.money.dataSource = { color: GFColorFacotry(2), fontSize: 18, align: Stage.ALIGN_LEFT, overflow: "visible", valign: Stage.ALIGN_MIDDLE };
            this.scale(0, 0);
            this.pivot(this.width / 2.0, this.height / 2.0);
            this.playerImage.on(laya.events.Event.CLICK, this, function () {
                this.parent.event(GFClickPlayerEvent,[this.player])
            });
            this.isPokerDispathing = false;
            this._vipImage = new Image();
            this.playerImage.addChild(this._vipImage);
            this._vipImage.size(38, 38);
            if (player) {
                this.renderPlayer();
            }
            this.playerImage.on(laya.events.Event.LOADED,this,function (params:any) {
                if (!this.playerImage.source){
                    this.playerImage.skin = "comp/image_youxitouxiang.png"
                }
            })
        }


        public get progressView(): ProgressBar {
            if (!this._progressView) {
                this._progressView = new ProgressBar("comp/progress_game.png");
                this._progressView.size(180, 120);
                this._progressView.pivot(90, 60);
                this._progressView.pos(60, 90);
                this._progressView.rotation = 90;
                this.addChild(this._progressView);
            }
            return this._progressView;
        }


        public get bankerView(): Image {
            if (!this._bankerView) {
                this._bankerView = new Image("comp/image_zhuangjia.png");
                this._bankerView.size(30, 30);
                this._bankerView.right = 0;
                this._bankerView.top = 35;
                this._bankerView.visible = false;
                this.addChild(this._bankerView);
            }
            return this._bankerView;
        }


        public get prepareView(): Image {
            if (!this._prepareView) {
                this._prepareView = new Image("comp/image_zhunbei.png");
                this._prepareView.pivot(this._prepareView.width / 2, this._prepareView.height / 2);
            }
            return this._prepareView;
        }

        public set prepareView(v: Image) {
            this._prepareView = v;
        }

        public get pokerGroupView(): GFPokerGroupView {
            if (!this._pokerGroupView) {
                this._pokerGroupView = new GFPokerGroupView();
                if (this.arrangeFromLeftToRight()) {
                    this._pokerGroupView.pos(this.width + 40, this.height / 2);
                    this._pokerGroupView.pokerDirection = GFPokerGroupDirection.FromLeftToRight;
                } else {
                    this._pokerGroupView.pos(- 40, this.height / 2);
                    this._pokerGroupView.pokerDirection = GFPokerGroupDirection.FromRightToLeft;
                }
                if (this.player.isMyself) {//
                    this._pokerGroupView.scale(GFPlayerView.selfPokerViewScaleFactor, GFPlayerView.selfPokerViewScaleFactor);
                }
                this.addChild(this._pokerGroupView);
                this._pokerGroupViewPos = new Point(this._pokerGroupView.x, this._pokerGroupView.y);
            }
            return this._pokerGroupView;
        }

        public set pokerGroupView(v: GFPokerGroupView) {
            this._pokerGroupView = v;
        }
 
        public get multiCardTag() : GFMultiCardTagView {
            if (!this._multiCardTag){
                this._multiCardTag = new GFMultiCardTagView()
                this.addChild(this._multiCardTag);
            }
            return this._multiCardTag;
        }
        

        private resetPokerGroupView() {
            this.removeChild(this._pokerGroupView);
            this.pokerGroupView = null;
        }

        public startTimerAnimation(completeHandler: Handler) {
            let progress = 0;
            this.progressView.value = 0;
            this.progressView.visible = true;
            if (this.player.isMyself) {
                playMedia(VoiceType.CountDown);
            }
            this.progressView.timer.loop(100, this, function () {//20 seconds
                this.progressView.value += 0.005;
                if (this.progressView.value == 1) {
                    this.progressView.timer.clearAll(this);
                    completeHandler.run();
                }
            });
        }

        public stopTimerAnimation() {
            if (this.player.isMyself) {
                stopMedia(VoiceType.CountDown);
            }
            this.progressView.timer.clearAll(this);
            this.progressView.value = 0;
            this.progressView.visible = false;
        }
        public renderPlayer(player?: GFPlayer, renderPoker:boolean = true) {
            if (player) {
                this.player = player;
            }
            if (this.player) {
                this.playerName.text = this.player.name;
                this.playerImage.skin = this.player.imgurl;
                this.money.text = this.player.point;
                if (this.player.vip > 0) {
                    if (this.player.svip == 1 && (this.player.vip < GFPlayerView.vipImageArray.length)) {
                        this._vipImage.skin = GFPlayerView.vipImageArray[this.player.vip];
                    } else {
                        this._vipImage.skin = GFPlayerView.vipImageArray[0];
                    }
                }
                if (this.player.status == GFplayerStatus.Prepare) {
                    this.resetPokerGroupView();
                    this.showPrepareStatus(true);
                } else {
                    this.showPrepareStatus(false);
                }
                if (this.player.status >= GFplayerStatus.Prepare) {
                    this.lotteryBack.visible = true;
                    let chipNumber = this.player.chipnumber;
                    this.lottery.text = chipNumber ? chipNumber : "0";
                } else {
                    this.lotteryBack.visible = false;
                    this.lottery.text = "";
                }
                switch (this.player.referPosition) {
                    case GFPlayerPosition.LeftTop:
                        this.pos(140, 200);
                        break;
                    case GFPlayerPosition.RightTop:
                        this.pos(990, 200);
                        break;
                    case GFPlayerPosition.LeftBottom:
                        this.pos(140, 410);
                        break;
                    case GFPlayerPosition.RightBottom:
                        this.pos(990, 410);
                        break;
                    case GFPlayerPosition.Center:
                    default:
                        this.pos(540, 490);
                        break;
                }
                if (this.player.hasPoker && !this.isPokerDispathing && renderPoker) {
                    let status = GFPokerGroupStatus.HiddenValue;
                    switch (this.player.status) {

                        case GFplayerStatus.HidePoker:
                            status = GFPokerGroupStatus.HiddenValue;
                            this.player.changePokersStatus(GFPokerStatus.HiddenValue);
                            break;
                        case GFplayerStatus.LookPoker:
                            status = GFPokerGroupStatus.AlreadyLook;
                            this.player.changePokersStatus(GFPokerStatus.HiddenValue);
                            if (this.player.isMyself && !this.player.isInitialPokers) {
                                status = GFPokerGroupStatus.ShowValue;
                                this.player.changePokersStatus(GFPokerStatus.ShowValue);
                            }
                            break;
                        case GFplayerStatus.GiveUp:
                            status = GFPokerGroupStatus.GiveUp;
                            this.player.changePokersStatus(GFPokerStatus.Giveup);
                            break;
                        case GFplayerStatus.Loser:
                            status = GFPokerGroupStatus.Loser;
                            this.player.changePokersStatus(GFPokerStatus.Loser);
                            break;
                        case GFplayerStatus.ShowPoker:
                            if (!this.player.isInitialPokers){
                                status = GFPokerGroupStatus.ShowValue;
                                this.player.changePokersStatus(GFPokerStatus.ShowValue);
                            }
                            break;
                        default:
                            break;
                    }
                    this.pokerGroupView.renderPlayerPokers(this.player.pokers, status);
                }
                this.showDoubleCard();
            }
        }

        public showWithAnimation(animation: boolean) {
            if (animation) {
                Tween.to(this, { scaleX: 1.0, scaleY: 1.0 }, 500);
            } else {
                this.scale(1, 1);
            }
        }

        public showPrepareStatus(show: boolean) {
            if (show) {
                if (this.arrangeFromLeftToRight()) {
                    this.prepareView.pos(this.width + this.prepareView.width / 2 + 20, this.height / 2);
                } else {
                    this.prepareView.pos(-this.prepareView.width / 2 - 20, this.height / 2);
                }
                this.addChild(this.prepareView);
            } else {
                this.removeChild(this.prepareView);
            }
        }

        public showMessageWithType(messageType: PlayerMessageType) {
            let messageImage: Image;
            let startPoint: Point;
            if (this.arrangeFromLeftToRight()) {
                messageImage = new Image(GFPlayerView.messageImageArray[messageType * 2]);
                startPoint = new Point(this.width + this.prepareView.width / 2 + 20, this.height / 2);
            } else {
                messageImage = new Image(GFPlayerView.messageImageArray[messageType * 2 + 1]);
                startPoint = new Point(-this.prepareView.width / 2 - 20, this.height / 2);
            }
            messageImage.alpha = 0;
            messageImage.pivot(messageImage.width / 2, messageImage.height / 2);
            messageImage.pos(startPoint.x, startPoint.y);
            this.addChild(messageImage);
            Tween.to(messageImage, { alpha: 1, y: startPoint.y - 60 }, 1000, Ease.bounceOut, Handler.create(messageImage, messageImage.removeSelf))
        }

        public addPokerView(...pokerViews: GFPokerView[]) {
            this.pokerGroupView.addPokerView(pokerViews);
        }

        public addEmptyPokerWithNumber(num: number) {
            for (var index = 0; index < num; index++) {
                this.player.addPoker(new GFPoker());
            }
        }
        public showPokerView() {
            if (!this.pokerGroupView.parent) {
                this.addChild(this.pokerGroupView);
            }
            this.pokerGroupView.visible = true;
        }

        public hidePokerView() {
            this.pokerGroupView.visible = false;
            this.pokerGroupView.removeSelf();
        }

        public getPokerViewPosition(index: number) {
            let position = this.pokerGroupView.getPokerViewPosition(index);
            return this.toParentPoint(position);
        }

        public getGroupPokerViewGlobalPosition() {
            return this.toParentPoint(new Point(this._pokerGroupViewPos.x, this._pokerGroupViewPos.y));
        }

        public getBackTheGroupPokerView() {
            this.pokerGroupView.pos(this._pokerGroupViewPos.x, this._pokerGroupViewPos.y);
            this.addChild(this.pokerGroupView);
            this.pokerGroupView.updateZOrder();
            GFLog("displayedInStage:"+this.pokerGroupView.displayedInStage);
        }

        public becomeLoser() {
            this.player.changePokersStatus(GFPokerStatus.Loser);
            this.pokerGroupView.renderPlayerPokers(this.player.pokers, GFPokerGroupStatus.Loser);
        }

        public becomeWinner() {
            if (this.player.isMyself) {
                playMedia(VoiceType.Win);
            }
            this.victor_kuang.visible = true;
            this.victor_rasor.visible = true;
            this.victor_text.visible = true;
            this.victor_rasor.timer.loop(500, this, function () {
                Tween.to(this.victor_rasor, { rotation: this.victor_rasor.rotation + 60 }, 500, Ease.linearInOut, null, 0, true);
            });

        }

        public resetWinner() {
            if (this.player.isMyself) {
                stopMedia(VoiceType.Win);
            }
            this.victor_kuang.visible = false;
            this.victor_rasor.visible = false;
            this.victor_text.visible = false;
            this.victor_rasor.timer.clearAll(this);
            Tween.to(this.victor_rasor, { rotation: 0 }, 100);
        }

        public sendGiftToPlayerView(playerView: GFPlayerView, gift: model.GFGift) {
            let giftItem = new Image(gift.imgurl);
            giftItem.zOrder = GFGameRoomLevel.GiftView;
            giftItem.pivot(giftItem.width / 2, giftItem.height / 2);
            giftItem.pos(this.x, this.y);
            this.parent.addChild(giftItem);
            Tween.to(giftItem, { x: playerView.x, y: playerView.y }, 1000, Ease.cubicInOut, Handler.create(giftItem, giftItem.removeSelf));
        }
        public showFace(index: number = 0) {
            let res: string = GFMediaMsgDialog.faceArr[index];
            let face = new FaceMediaAnimation(res);
            switch (this.player.referPosition) {
                case GFPlayerPosition.LeftTop:
                    face.pos(190, 120);
                    break;
                case GFPlayerPosition.RightTop:
                    face.pos(-70, 120);
                    break;
                case GFPlayerPosition.LeftBottom:
                    face.pos(190, 60);
                    break;
                case GFPlayerPosition.RightBottom:
                    face.pos(-70, 60);
                    break;
                case GFPlayerPosition.Center:
                    face.pos(190, -10);
                    break;
            }
            this.addChild(face);
            face.show();
        }
        public showVoice(index: VoiceType = 0, show: boolean = false) {
            if (show) {
                let title: string = GFMediaMsgDialog.voiceArr[index - 7];
                let voice = new VoiceMediaAnimation(this.player.referPosition, title);
                this.addChild(voice);
                voice.show();
            }
            playMedia(index, this.player.sex);
        }

        public arrangeFromLeftToRight(): boolean {
            let result: boolean = true;
            switch (this.player.referPosition) {
                case GFPlayerPosition.LeftTop:
                case GFPlayerPosition.LeftBottom:
                case GFPlayerPosition.Center:
                default:
                    result = true;
                    break;
                case GFPlayerPosition.RightTop:
                case GFPlayerPosition.RightBottom:
                    result = false;
                    break;
            }
            return result;
        }

        public showDoubleCard(){
            if (this.player.doublecard){//render the double card
                switch (this.player.referPosition) {
                    case GFPlayerPosition.LeftTop:
                    case GFPlayerPosition.LeftBottom:
                        this.multiCardTag.centerY = -this.height/2 + this.multiCardTag.height/2 + 10;
                        this.multiCardTag.centerX = this.width/2+this.multiCardTag.width/2 +5;
                    break;
                    case GFPlayerPosition.RightTop:
                    case GFPlayerPosition.RightBottom:
                        this.multiCardTag.centerY = -this.height/2 + this.multiCardTag.height/2 + 10;
                        this.multiCardTag.centerX = -(this.width/2+this.multiCardTag.width/2 + 5);
                    break;
                    case GFPlayerPosition.Center:
                        this.multiCardTag.centerY = -this.height/2 + this.multiCardTag.height/2 + 10;
                        this.multiCardTag.centerX = this.width/2+this.multiCardTag.width/2 + 5;
                    break;
                }
                this.multiCardTag.renderDoubleCard(this.player.doublecard);
                // this.multiCardTag.renderDoubleCard(new model.GFDoubleCard("1",4,"100"));
            }
        }

        public clearDoubleCard(){
            if (this._multiCardTag){
                this._multiCardTag.doubleCard = null;
                this.multiCardTag.visible = false;
            }
        }

        public resetStatus() {
            this.player.status = GFplayerStatus.Tourist;
            this.pokerGroupView.removeSelf();
            this.pokerGroupView = null;
            this.renderPlayer();
            this.clearDoubleCard();
        }
    }
}