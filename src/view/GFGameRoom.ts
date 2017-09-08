const GFCloseAddChipViewEvent = "GFCloseAddChipViewEvent";
const GFClickPlayerEvent = "GFClickPlayerEvent";
const GFRemovePlayerEvent = "GFRemovePlayerEvent";
    
module view {
    import GFGameRoomUI = ui.GFGameRoomUI;
    import Event = laya.events.Event;
    import Image = laya.ui.Image;
    import Button = laya.ui.Button;
    import Tween = laya.utils.Tween;
    import Ease = laya.utils.Ease;
    import Handler = laya.utils.Handler;
    import GFChip = model.GFChip;
    import GFPoker = model.GFPoker;
    import GFPlayer = model.GFPlayer;
    import GFPlayerStatus = model.GFPlayerStatus;
    import GFGift = model.GFGift;
    import GFGameRoomViewModel = model.GFGameRoomViewModel;
    import GFGameMessageActionType = model.GFGameMessageActionType;
    import GFGameMessage = model.GFGameMessage;
    import Label = laya.ui.Label;
    import MovieClip = laya.ani.swf.MovieClip;
    import Point = laya.maths.Point;
    import GFUserType = model.GFUserType;
    import GFRoomType = model.GFRoomType;
    import GFEntryType = model.GFEntryType;

    export enum GFGameRoomLevel {
        Background = 0,
        BaseChipView,
        ChipView,
        GiftView,
        OperationButton,
        PlayerView,
        CompareView,
        PokerView,
        TopMost = 100
    }

    const CompareSwfWidth = 428;
    const CompareSwfHeight = 120;
    export class GFGameRoom extends GFGameRoomUI {
        static pokerNumber: number = 3;
        public roomViewModel: GFGameRoomViewModel;
        private playerArray: Array<GFPlayerView>;
        private chipArray: Array<GFChipView>;
        private giftView: GFGiftButton = new GFGiftButton();
        private activePlayerView: GFPlayerView;
        protected helpView: Image;
        protected compareSwf: MovieClip;
        protected operationButtonArray: Array<Button>;
        private messageView: GFPostMessageView;
        private compareFinishCount: number = 0;
        private tagImage = new Image()
        constructor(grid: string, entryType: GFEntryType, roomID?: string, userType?: GFUserType, roomType?: GFRoomType) {
            super();
            this.zOrder = 600;
            view.updateBottomViewZOrder(1000);
            this.roomViewModel = new GFGameRoomViewModel(grid, entryType, roomID, userType, roomType);
            this.initializee();
            this.configGameMessageHandler();
            this.configEventHandler();
            this.messageUI();
            this.name = "GFGameRoom";
            laya.utils.Browser.window.MtaH5.clickStat('enterroom');
            this.roomPageFunnelModelstat();
            this.configBG()
            BGM(BGMType.Game)
        }
        private configBG() {
            this.addChild(this.tagImage)
            this.tagImage.size(80 , 30)
            this.tagImage.top = 138
            this.tagImage.left = 528
            this.tagImage.zOrder = GFGameRoomLevel.BaseChipView
            if(this.roomViewModel.roomType == GFRoomType.Arena) {
                this.tagImage.visible = false
                this.BGImage.loadImage('comp/bg_youxi_leitai.png')
            }else {
                this.tagImage.visible = true
                this.BGImage.loadImage("comp/bg_youxi.png")
            }
            Laya.stage.offAll(GFGameEntryResponse)
            Laya.stage.on(GFGameEntryResponse , this , function() {
                if (this.roomViewModel.roomType != GFRoomType.Arena) {
                    let levelRes = ['comp/image_chuji_icon.png', 'comp/image_zhongji_icon.png', 'comp/image_zhizun_icon.png']
                    this.tagImage.loadImage(levelRes[this.roomViewModel.level])
                }
            })
        }

        private roomPageFunnelModelstat() {
            laya.utils.Browser.window.MtaH5.clickStat('quanxitongliuch', { 'enterroom': 'true' });
            if (Browser.onIOS) {
                laya.utils.Browser.window.MtaH5.clickStat('ioszhuizong', { 'enterroom': 'true' });
            } else if (Browser.onAndriod) {
                laya.utils.Browser.window.MtaH5.clickStat('anzhuoliuchengz', { 'enterroom': 'true' });
            }
        }

        private initializee() {
            this.playerArray = new Array<GFPlayerView>();
            this.chipArray = new Array<GFChipView>();
            this.operationButtonArray = new Array<Button>();
            this.operationButtonArray.push(this.btnFollow, this.btnAddChip, this.btnShow, this.btnCompare, this.btnGiveUp, this.btnAutoFollow, this.btnMultiCard);
            this.operationButtonArray.forEach(button => {
                button.visible = false;
            });
            this.btnPrepare.visible = false;
            if (this.roomViewModel.roomType == GFRoomType.Normal) {
                this.btnAudienceNumber.visible = false;
                this.labelChips.visible = true;
                this.labelMessage.visible = false;
            } else {
                this.btnAudienceNumber.visible = true;
                this.labelChips.visible = false;
                this.labelMessage.visible = true;
                this.labelMessage.changeText("");
                this.btnChange.visible = false;
            }
            if (this.roomViewModel.userType == GFUserType.Player) {
                this.btnEmoj.visible = true;
                this.giftUI();
            } else {
                this.btnEmoj.visible = false;
            }
            this.compareSwf = new MovieClip();
            this.compareSwf.load("comp/bipai.swf");
            this.compareSwf.size(CompareSwfWidth, CompareSwfHeight);
            this.compareSwf.pos(this.width / 2 - CompareSwfWidth / 2, this.height / 2 - CompareSwfHeight / 2);
            if (localStorage.getItem("app") == "1"){
                let btnArray = [this.btnAddChip,this.btnFollow, this.btnShow,this.btnCompare,this.btnGiveUp];
                btnArray.forEach(btn => {
                    btn.y += 50;
                });
            }
            GFPokerView.loadPokerClip();
            GFChipView.loadChipClip();
            Laya.stage.on(GFGameEntryError, this, this.hardQuitGame);
            this.on(GFClickPlayerEvent, this, this.clickPlayer);
        }

        private clickPlayer(player: GFPlayer) {
            let showKickout = false;
            if (!player.isMyself) {
                if (this.roomViewModel.userType == GFUserType.Player) {
                    showKickout = true;
                }
                let userDetail = new GFUserDetailDialog(player.urid, null, showKickout, this.roomViewModel.roomID);
                userDetail.popup();
            }
        }

        //game message handler
        private configGameMessageHandler() {
            this.roomViewModel.playerActionSignal.add(message => {
                if (message.totalChip) {
                    this.changeTotalChip(message.totalChip);
                }
                switch (message.action) {
                    case GFGameMessageActionType.Enter:
                        this.addPlayer(message.users, message.chip);
                        break;
                    case GFGameMessageActionType.Quit:
                        this.removePlayer(message.users, message.msg, message.quitType, message.urid);
                        break;
                    case GFGameMessageActionType.Prepare:
                        this.playerPrepare(message.users);
                        break;
                    case GFGameMessageActionType.Follow:
                        this.playerFollowChip(message.users[0], message.chip);
                        break;
                    case GFGameMessageActionType.AddBaseChip:
                        this.playerAddBaseChip(message.users, message.chip);
                        break;
                    case GFGameMessageActionType.AddChip:
                        this.playerAddChip(message.users[0], message.chip);
                        break;
                    case GFGameMessageActionType.Look:
                        this.playerLook(message.users[0]);
                        break;
                    case GFGameMessageActionType.Compare:
                        this.playerCompare(message.users, message.urid, message.toUrid, message.result, message.chip);
                        break;
                    case GFGameMessageActionType.Finish:
                        this.playerFinishiRound(message.users, message.urid, message.toUrid, message.result, message.chip);
                        break;
                    case GFGameMessageActionType.GiveUp:
                        this.playerGiveUp(message.users);
                        break;
                    case GFGameMessageActionType.SendVoice:
                        this.playerSendVoice(message.users, message.resourceIdx);
                        break;
                    case GFGameMessageActionType.SendEmoji:
                        this.playerSendEmoji(message.users, message.resourceIdx);
                        break;
                    case GFGameMessageActionType.SendGift:
                        this.playerSendGift(message.users, message.urid, message.toUrid, message.gift);
                        break;
                    case GFGameMessageActionType.RoundBegin:
                        this.roundBegin();
                        break;
                    case GFGameMessageActionType.PokerTurn:
                        this.playerTurn(message.users[0], message.canFollow, message.canAdd, message.canCompare);
                        break;
                    case GFGameMessageActionType.BankerChange:
                        this.playerBecomeBanker(message.users[0]);
                        break;
                    case GFGameMessageActionType.Relieve:
                        this.relieve(message.users, message.msg);
                        break;
                    case GFGameMessageActionType.Audience:
                        this.updateAudienceNumber(message.users, message.viewers);
                        break;
                    case GFGameMessageActionType.ForceQuit:
                        this.forceQuit(message.msg);
                        break;
                    case GFGameMessageActionType.Challenger:
                        this.playerBecomeChallenger(message.users[0]);
                        break;
                    case GFGameMessageActionType.TipMsg:
                        this.receiveTipMessage(message.users, message.msg);
                        break;
                    case GFGameMessageActionType.PointChange:
                    case GFGameMessageActionType.MultiCard:
                        this.playerInfoChange(message.users);
                        break;
                    default:
                        break;
                }
            });
        }

        private getPlayerViewByUrid(urid: string): GFPlayerView {
            for (let index = 0; index < this.playerArray.length; index++) {
                let playerView = this.playerArray[index];
                if (playerView.player.urid == urid) {
                    return playerView;
                }
            }
            return null;
        }

        private addPlayer(players: GFPlayer[], chip?: GFChip) {
            players.forEach(player => {
                if (!this.getPlayerViewByUrid(player.urid)) {//if the user already exist then drop it
                    let playerView = new GFPlayerView(player);
                    playerView.zOrder = GFGameRoomLevel.PlayerView;
                    this.addChild(playerView);
                    this.playerArray.push(playerView);
                    playerView.showWithAnimation(true);
                    if (player.isMyself) {
                        playerView.zOrder = GFGameRoomLevel.TopMost;
                        this.btnPrepare.visible = !this.roomViewModel.isGameing;
                        this.changeChallengButtonState(true);
                    }
                    if (this.roomViewModel.roomType == GFRoomType.Arena && !this.roomViewModel.isGameing) {
                        this.labelMessage.changeText("每人底注:" + this.roomViewModel.bet.toString());
                    } else {
                        this.labelMessage.changeText("");
                    }
                }
            });
            if (chip && chip.value > 0) {//show the history chip
                for (var index = 0; index < chip.multiply; index++) {
                    let chipView = new GFChipView(chip);
                    let point = chipView.randomDestination;
                    chipView.pos(point.x, point.y);
                    chipView.rendChip();
                    let lastChipIndex = 0;
                    if (this.chipArray.length) {
                        lastChipIndex = this.getChildIndex(this.chipArray[this.chipArray.length - 1]);
                        lastChipIndex++;
                    }
                    chipView.zOrder = GFGameRoomLevel.BaseChipView;
                    if (lastChipIndex) {
                        this.addChildAt(chipView, lastChipIndex);
                    } else {
                        this.addChild(chipView);
                    }
                    this.chipArray.push(chipView);
                }
            }
        }

        private removePlayer(players: GFPlayer[], msg: string, type: number, urid: string) {
            players.forEach(player => {
                let playerView = this.getPlayerViewByUrid(player.urid);
                if (playerView) {
                    Laya.stage.event(GFRemovePlayerEvent,player.urid);
                    this.removeChild(playerView);
                    this.playerArray.splice(this.playerArray.indexOf(playerView), 1);
                    if (playerView.player.isMyself) {//if force quit then back to the home room
                        if (msg && msg.length) {
                            new GFCenterMsgDialog(msg);
                        }
                        if (type == 0) {
                            this.hardQuitGame();
                        } else if (type == 1) {
                            this.prepareForChangeRoom();
                        }
                    }
                }
            });
            if (players.length == 0 && urid.length > 0) {//protect error condition
                if (urid == model.UserModel.urid) {
                    this.hardQuitGame();
                }
            }
        }

        private playerPrepare(players: GFPlayer[]) {
            players.forEach(player => {
                let playerView = this.getPlayerViewByUrid(player.urid);
                if (playerView) {
                    playerView.renderPlayer(player);
                    if (player.isMyself) {
                        this.btnPrepare.visible = false;
                    }
                    playerView.clearDoubleCard();
                    playMedia(VoiceType.Zhunbei, player.sex)
                }
            });
        }

        private relieve(players: GFPlayer[], msg: string) {
            let arr = msg.split('发放')
            let rMsg = arr[0] + '发放\n' + arr[1]
            // new GFCenterMsgDialog(msg);
            let alert = new GFAlmsDialog(rMsg)
            alert.show()
            players.forEach(player => {
                let playerView = this.getPlayerViewByUrid(player.urid);
                if (playerView) {
                    playerView.renderPlayer(player, false);
                    playMedia(VoiceType.Coin, player.sex);
                }
            });
        }

        private receiveTipMessage(players: GFPlayer[], msg: string) {
            if (this.roomViewModel.userType == GFUserType.Audience) {
                new GFCenterMsgDialog(msg);
                players.forEach(player => {
                    let playerView = this.getPlayerViewByUrid(player.urid);
                    if (playerView) {
                        playerView.renderPlayer(player, false);
                    }
                });
            }
        }

        private updateAudienceNumber(players: GFPlayer[], num: number) {
            this.btnAudienceNumber.text.changeText("观众:" + num.toString());
            players.forEach(player => {
                let playerView = this.getPlayerViewByUrid(player.urid);
                if (playerView) {
                    playerView.renderPlayer(player, false);
                }
            });
        }

        private forceQuit(msg: string) {
            if (msg && msg.length) {
                new GFCenterMsgDialog(msg);
            }
            this.hardQuitGame();
        }

        private changeChallengButtonState(state: boolean) {
            if (state && this.roomViewModel.userType == GFUserType.Player && !this.roomViewModel.isGameing) {
                 if (this.roomViewModel.onlyFriend) {
                    this.btnChallengeAll.visible = false;
                    this.btnChallengeFriend.centerX = 0;
                    if (this.roomViewModel.isOriginChallenger) {
                        this.btnChallengeFriend.visible = true;
                    } else {
                        this.btnChallengeFriend.visible = false;
                    }
                } else {
                    this.btnChallengeAll.visible = true;
                    this.btnChallengeFriend.visible = true;
                }
            } else {
                this.btnChallengeAll.visible = false;
                this.btnChallengeFriend.visible = false;
            }
        }

        private playerBecomeChallenger(player: GFPlayer) {
            if (playBgm && player.isMyself){
                this.changeChallengButtonState(true);
            }else{
                this.changeChallengButtonState(false);
            }
        }

        private playerAddBaseChip(players: GFPlayer[], chip: GFChip) {
            players.forEach(player => {
                let playerView = this.getPlayerViewByUrid(player.urid);
                if (playerView) {
                    playerView.renderPlayer(player, false);
                    player.status = GFPlayerStatus.Prepare;
                    this.playerViewAddChip(playerView, chip);
                }
            });
        }

        private playerFollowChip(player: GFPlayer, chip: GFChip) {
            let playerView = this.getPlayerViewByUrid(player.urid);
            if (playerView) {
                playerView.renderPlayer(player, false);
                playerView.showMessageWithType(PlayerMessageType.PlayerMessageTypeFollow);
                this.playerViewAddChip(playerView, chip);
                playMedia(VoiceType.Follow, player.sex);
            }
        }

        private playerAddChip(player: GFPlayer, chip: GFChip) {
            let PlayerView = this.getPlayerViewByUrid(player.urid);
            if (PlayerView) {
                PlayerView.renderPlayer(player, false);
                PlayerView.showMessageWithType(PlayerMessageType.PlayerMessageTypeAddChip);
                this.playerViewAddChip(PlayerView, chip);
                playMedia(VoiceType.AddChip, player.sex);
            }
        }

        private playerGiveUp(players: GFPlayer[]) {
            players.forEach(player => {
                let playerView = this.getPlayerViewByUrid(player.urid);
                if (playerView) {
                    playerView.renderPlayer(player);
                    playerView.showMessageWithType(PlayerMessageType.PlayerMessageTypeGiveUp);
                    if (player.isMyself) {
                        this.operationButtonArray.forEach(button => {
                            button.visible = false;
                        });
                    }
                    playMedia(VoiceType.GiveUp, player.sex);
                }
            });
        }

        private playerSendEmoji(players: GFPlayer[], emojiIdx: number) {
            players.forEach(player => {
                let playerView = this.getPlayerViewByUrid(player.urid);
                playerView.showFace(emojiIdx);
            });
        }

        private playerSendVoice(players: GFPlayer[], voiceIndex: number) {
            players.forEach(player => {
                let playerView = this.getPlayerViewByUrid(player.urid);
                if (playerView) {
                    playerView.showVoice(voiceIndex, true);
                }
            });
        }

        private playerLook(player: GFPlayer) {
            let playerView = this.getPlayerViewByUrid(player.urid);
            if (playerView) {
                playerView.renderPlayer(player);
                if (player.isMyself) {
                    this.btnShow.disabled = true;
                }
                playMedia(VoiceType.Look, player.sex);
            }
        }

        private playerSendGift(players: GFPlayer[], urid: string, toUrid: string, gift: GFGift) {
            let fromPlayerView: GFPlayerView = null;
            let toPlayerView: GFPlayerView = null;
            players.forEach(player => {
                let playerView = this.getPlayerViewByUrid(player.urid);
                if (playerView) {
                    playerView.renderPlayer(player, false);
                    if (player.urid == urid) {
                        fromPlayerView = playerView;
                    }
                    if (player.urid == toUrid) {
                        toPlayerView = playerView;
                    }
                }
            });
            if (fromPlayerView && toPlayerView) {
                fromPlayerView.sendGiftToPlayerView(toPlayerView, gift);
            }
        }

        private playerCompare(players: GFPlayer[], urid: string, toUrid: string, result: boolean, chip: GFChip = null) {
            this.roomViewModel.isComparing = true;
            let playerView = this.getPlayerViewByUrid(urid);
            let toPlayerView = this.getPlayerViewByUrid(toUrid);
            let playerOriginScale = playerView.pokerGroupView.scaleX;
            let toPlayerOriginScale = toPlayerView.pokerGroupView.scaleX;
            let destScale = 1.3;
            let playerViewPokerPosition = playerView.getGroupPokerViewGlobalPosition();
            let toPlayerViewPokerPosition = toPlayerView.getGroupPokerViewGlobalPosition();
            //if has chip then render it
            if (chip) {
                this.playerViewAddChip(playerView, chip);
            }
            if (result) {
                toPlayerView.player.status = GFPlayerStatus.Loser;
            } else {
                playerView.player.status = GFPlayerStatus.Loser;
            }

            if (toPlayerView.player.isMyself){//close the double card view
                Laya.stage.event(GFDoubleCardViewClose);
            }

            //add mask Image
            let maskImage = new Image("comp/bg_zhezhao.png");
            maskImage.zOrder = GFGameRoomLevel.CompareView;
            maskImage.on(Event.CLICK, null, null);
            this.addChild(maskImage);

            playMedia(VoiceType.VS);
            playerView.pokerGroupView.pos(playerViewPokerPosition.x, playerViewPokerPosition.y);
            playerView.pokerGroupView.zOrder = GFGameRoomLevel.PokerView;
            this.addChild(playerView.pokerGroupView);
            toPlayerView.pokerGroupView.pos(toPlayerViewPokerPosition.x, toPlayerViewPokerPosition.y);
            toPlayerView.pokerGroupView.zOrder = GFGameRoomLevel.PokerView;
            this.addChild(toPlayerView.pokerGroupView);
            let destPostion: Point;
            let toDestPostion: Point;
            if (playerView.arrangeFromLeftToRight()) {
                destPostion = new Point(this.compareSwf.x - playerView.pokerGroupView.width - 10, this.compareSwf.y + playerView.pokerGroupView.height / 2 + 20);
            } else {
                destPostion = new Point(this.compareSwf.x - playerView.pokerGroupView.width + 50, this.compareSwf.y + playerView.pokerGroupView.height / 2 + 20);
            }
            if (toPlayerView.arrangeFromLeftToRight()) {
                toDestPostion = new Point(this.compareSwf.x + this.compareSwf.width + toPlayerView.pokerGroupView.width / 2, this.compareSwf.y + toPlayerView.pokerGroupView.height / 2 + 20);
            } else {
                toDestPostion = new Point(this.compareSwf.x + this.compareSwf.width + toPlayerView.pokerGroupView.width / 2 + 60, this.compareSwf.y + toPlayerView.pokerGroupView.height / 2 + 20);
            }
            Tween.to(playerView.pokerGroupView, { x: destPostion.x, y: destPostion.y, scaleX: destScale, scaleY: destScale }, 500);
            Tween.to(toPlayerView.pokerGroupView, { x: toDestPostion.x, y: toDestPostion.y, scaleX: destScale, scaleY: destScale }, 500);
            this.timer.once(500, this, function () {
                this.addChild(this.compareSwf);
            });
            let loserPlayer: GFPlayer = null;
            this.timer.once(1500, this, function () {
                try {
                    if (result) {
                        playMedia(VoiceType.WinAfterVS);
                        toPlayerView.becomeLoser();
                        loserPlayer = toPlayerView.player;
                    } else {
                        playMedia(VoiceType.LoseAfterVS);
                        playerView.becomeLoser();
                        loserPlayer = playerView.player;
                    }
                } catch (error) {

                }
            });
            this.timer.once(2000, this, function () {
                Tween.to(playerView.pokerGroupView, { x: playerViewPokerPosition.x, y: playerViewPokerPosition.y, scaleX: playerOriginScale, scaleY: playerOriginScale }, 500, Ease.linearInOut, Handler.create(this, this.compareFinishHandler, [playerView, toPlayerView, loserPlayer, players, maskImage]));
                Tween.to(toPlayerView.pokerGroupView, { x: toPlayerViewPokerPosition.x, y: toPlayerViewPokerPosition.y, scaleX: toPlayerOriginScale, scaleY: toPlayerOriginScale }, 500, Ease.linearInOut, Handler.create(this, this.compareFinishHandler, [playerView, toPlayerView, loserPlayer, players, maskImage]));
                this.removeChild(this.compareSwf);
            });
        }

        private compareFinishHandler(playerView: GFPlayerView, toPlayerView: GFPlayerView, loserPlayer: GFPlayer, players: GFPlayer[], maskImage: Image) {
            this.compareFinishCount++;
            if (this.compareFinishCount < 2) {
                return;
            }
            try {
                if (playerView) {
                    playerView.pokerGroupView.zOrder = GFGameRoomLevel.PokerView;
                    playerView.getBackTheGroupPokerView();
                }
                if (toPlayerView) {
                    toPlayerView.pokerGroupView.zOrder = GFGameRoomLevel.PokerView;
                    toPlayerView.getBackTheGroupPokerView();
                }
                if (loserPlayer.isMyself) {
                    this.operationButtonArray.forEach(button => {
                        button.visible = false;
                    });
                }
                players.forEach(player => {
                    let playerView = this.getPlayerViewByUrid(player.urid);
                    if (playerView) {
                        playerView.renderPlayer(player, false);
                    }
                });
            } catch (error) {

            } finally {
                this.removeChild(maskImage);
                this.compareFinishCount = 0;
                this.roomViewModel.isComparing = false;
            }
        }

        private playerFinishiRound(players: GFPlayer[], urid: string, toUrid: string, result: boolean, chip: GFChip = null) {
            Laya.stage.event(GFDoubleCardViewClose);
            let victoryUrid = result ? urid : toUrid;
            players.forEach(player => {
                let playerView = this.getPlayerViewByUrid(player.urid);
                if (playerView) {
                    playerView.renderPlayer(player);
                }
                if (urid == player.urid) {
                    playMedia(VoiceType.Finish, player.sex);
                    if (chip) {
                        this.playerViewAddChip(playerView, chip);
                    }
                }
                if (victoryUrid == player.urid) {
                    this.playerWin(playerView);
                }
                if (this.roomViewModel.userType == GFUserType.Player) {
                    this.timer.once(3000, this, function () {
                        if (!this.roomViewModel.isGameing) {//protecte the background timer stop
                            this.btnPrepare.visible = true;
                        }
                    });
                    this.changeChallengButtonState(true);
                    // this.playerBecomeChallenger(this.roomViewModel.challenger);
                }
                if (this.roomViewModel.roomType == GFRoomType.Arena) {
                    this.labelMessage.visible = true;
                }

            });
            if (this.activePlayerView) {
                this.activePlayerView.stopTimerAnimation();
            }
            this.operationButtonArray.forEach(button => {
                button.visible = false;
                button.disabled = true;
            });
            //reset the auto follow button
            this.btnAutoFollow.skin = "comp/btn_zidonggenzhu.png";
            this.btnAutoFollow.disabled = false;
            this.roomViewModel.autoFollow = false;
            Laya.stage.event(GFCloseAddChipViewEvent);
        }

        private roundBegin() {
            this.removeHelpView();
            this.btnPrepare.visible = false;
            this.changeChallengButtonState(false);
            this.labelMessage.visible = false;
            this.activePlayerView = null;
            this.playerArray.forEach(playerView => {
                playerView.showPrepareStatus(false);//hide the prepare view
                //if player is not prepare then reset the playerView
                if (playerView.player.status != GFPlayerStatus.Prepare) {
                    playerView.resetStatus();
                }
                playerView.resetWinner();
            });

            //update the total chip
            let activePlayerArray = this.getActivePlayerArray();
            if (activePlayerArray.length > 0) {
                this.changeTotalChip(this.roomViewModel.bet * activePlayerArray.length);
            }
            //send basic chip action
            if (this.roomViewModel.myselfIsPlaying) {
                this.roomViewModel.sendBasicChipAction();
            }

            //开始发牌
            this.roomViewModel.isDispatching = true;
            this.dispatchPokerAnimation(function () {
                stopMedia(VoiceType.Card);
                //发牌结束后,显示操作button
                this.playerArray.forEach(playerView => {
                    playerView.isPokerDispathing = false;
                });
                if (this.roomViewModel.myselfIsPlaying) {
                    this.operationButtonArray.forEach(button => {
                        button.visible = true;
                    });
                    this.btnShow.disabled = false;
                    this.btnGiveUp.disabled = false;
                    this.btnMultiCard.disabled = false;
                }
                this.roomViewModel.isDispatching = false;
            });
        }

        private dispatchPokerAnimation(completeHandler: Function) {
            let preparePlayerArray = this.playerArray.filter((playerView, index) => {
                return playerView.player.status == GFPlayerStatus.Prepare;
            })

            let pokerViewArray = new Array<GFPokerView>();
            for (var index = 0; index < preparePlayerArray.length * GFGameRoom.pokerNumber; index++) {
                let pokerView = new GFPokerView(new GFPoker());
                pokerView.pivot(pokerView.width / 2, pokerView.height / 2);
                pokerView.pos(this.width / 2, this.height / 2 - 30);
                pokerView.zOrder = GFGameRoomLevel.PokerView;
                this.addChildAt(pokerView, index);
                pokerViewArray.push(pokerView);

            }
            let gap = -25;
            pokerViewArray.forEach(pokerView => {
                Tween.to(pokerView, { x: pokerView.x - gap }, 200);
                gap += 5;
            });

            let bankerPosition = this.roomViewModel.bankerPlayer ? this.roomViewModel.bankerPlayer.referPosition : 0;
            let sortPlayerArray = preparePlayerArray.sort((playera, playerb) => {
                let playeraPosition = playera.player.referPosition - bankerPosition;
                let playerbPosition = playerb.player.referPosition - bankerPosition;
                let multiplyResult = playeraPosition * playerbPosition;
                if (multiplyResult > 0) {//同号
                    return playeraPosition < playerbPosition ? -1 : 1;
                } else if (multiplyResult < 0) {//异号
                    return playeraPosition < playerbPosition ? 1 : -1;
                } else {// =0
                    return playeraPosition == 0 ? 1 : -1;
                }
            })
            sortPlayerArray.forEach(playerView => {
                playerView.addEmptyPokerWithNumber(GFGameRoom.pokerNumber);
                playerView.isPokerDispathing = true;
            });
            pokerViewArray.reverse().forEach((pokerView, index) => {
                let playerView = sortPlayerArray[index % sortPlayerArray.length];
                let position = playerView.getPokerViewPosition(Math.floor(index / sortPlayerArray.length));
                let scale = playerView.player.isMyself ? GFPlayerView.selfPokerViewScaleFactor : 1;
                Tween.to(pokerView, { x: position.x, y: position.y, scaleX: -scale, scaleY: scale }, 300, Ease.linearInOut, Handler.create(this, this.playerViewAddPokerView, [playerView, pokerView]), 200 + index * 300);
                this.timer.once(200 + index * 300, this, function () {
                    playMedia(VoiceType.Card);
                });
            });
            Laya.timer.once(200 + pokerViewArray.length * 300, this, completeHandler);
        }
        private playerViewAddPokerView(playerView: GFPlayerView, pokerView: GFPokerView) {
            this.removeChild(pokerView);
            playerView.addPokerView(new GFPokerView(new GFPoker()));
        }

        private playerBecomeBanker(player: GFPlayer) {
            //clear old banker and set the new banker
            if (player) {
                this.playerArray.forEach(playerView => {
                    if (playerView.player.urid == player.urid) {
                        playerView.bankerView.visible = true;
                    } else {
                        playerView.bankerView.visible = false;
                    }
                });
            }
        }

        private playerTurn(player: GFPlayer, canFollow: boolean, canAdd: boolean, canCompare: boolean) {
            // player become active
            let playerView = this.getPlayerViewByUrid(player.urid);
            if (playerView) {
                playerView.startTimerAnimation(Handler.create(this, function () {
                    //the timer is done
                    if (player.isMyself) {
                        this.roomViewModel.sendGiveUpAction();
                        Laya.stage.event(GFCloseAddChipViewEvent);
                    }
                    GFLog("the timer is done");

                }));
            }
            if (this.activePlayerView) {
                this.activePlayerView.stopTimerAnimation();
            }
            this.activePlayerView = playerView;
            if (player.isMyself) {
                this.btnAutoFollow.disabled = true;
                this.btnCompare.disabled = false;
                this.btnFollow.disabled = !canFollow;
                if (this.roomViewModel.autoFollow && canFollow) {
                    this.btnFollow.disabled = true;
                    this.btnAddChip.disabled = true;
                    this.btnCompare.disabled = true;
                    this.timer.once(500, this.roomViewModel, this.roomViewModel.sendFollowChipAction);
                } else {
                    this.btnAddChip.disabled = !canAdd;
                    this.btnCompare.disabled = !canCompare;
                }
                let activePlayerArray = this.getActivePlayerArray();
                if (activePlayerArray.length > 2) {
                    this.btnCompare.text.text = "比牌";
                } else {
                    this.btnCompare.text.text = "开牌";
                }
                if (player.status == GFPlayerStatus.HidePoker) {
                    this.btnShow.disabled = false;
                } else {
                    this.btnShow.disabled = true;
                }
            } else {
                this.btnAutoFollow.disabled = false;
                this.btnCompare.disabled = true;
                this.btnFollow.disabled = true;
                this.btnAddChip.disabled = true;
            }
        }

        private playerInfoChange(players: GFPlayer[]) {
            if (players) {
                players.forEach(player => {
                    let playerView = this.getPlayerViewByUrid(player.urid);
                    if (playerView) {
                        playerView.renderPlayer(player, false);
                    }
                });
            }
        }

        //event handler
        private configEventHandler() {
            let operationArray = [this.labelChips, this.btnBack, this.btnChange, this.btnHelp, this.btnEmoj, this.btnCoin, this.btnFollow, this.btnAddChip, this.btnShow, this.btnCompare, this.btnGiveUp, this.btnPrepare, this.btnAutoFollow, this.btnMultiCard];
            operationArray.forEach(element => {
                element.zOrder = GFGameRoomLevel.OperationButton;
            });
            this.btnAudienceNumber.zOrder = GFGameRoomLevel.OperationButton;
            this.btnChallengeAll.zOrder = GFGameRoomLevel.OperationButton;
            this.btnChallengeFriend.zOrder = GFGameRoomLevel.OperationButton;
            this.labelMessage.zOrder = GFGameRoomLevel.OperationButton;
            this.btnAudienceNumber.on(Event.CLICK, this, this.onShowAudienceListAction);
            this.btnChallengeAll.on(Event.CLICK, this, this.onChallengeAllAction);
            this.btnChallengeFriend.on(Event.CLICK, this, this.onChallengeFriendAction);
            this.btnBack.on(Event.CLICK, this, this.onBackAction);
            this.btnChange.on(Event.CLICK, this, this.onChangeAction);
            this.btnHelp.on(Event.CLICK, this, this.onHelpAction);
            this.btnEmoj.on(Event.CLICK, this, this.onEmojAction);
            this.btnCoin.on(Event.CLICK, this, this.onCoinAction);
            this.btnFollow.on(Event.CLICK, this, this.onFollowAction);
            this.btnAddChip.on(Event.CLICK, this, this.onAddChipAction);
            this.btnShow.on(Event.CLICK, this, this.onShowAction);
            this.btnCompare.on(Event.CLICK, this, this.onCompareAction);
            this.btnGiveUp.on(Event.CLICK, this, this.onGiveUpAction);
            this.btnPrepare.on(Event.CLICK, this, this.onPrepareAction);
            this.btnAutoFollow.on(Event.CLICK, this, this.onAutoFollowAction);
            this.btnMultiCard.on(Event.CLICK, this, this.onUseMultiCard);
        }

        private changeTotalChip(value: number) {
            this.labelChips.text.changeText("总注:" + value.toString());
        }

        private changeRoom() {
            if (this.roomViewModel.roomType == GFRoomType.Arena) {
                this.roomViewModel.sendQuitAction(0);
                this.hardQuitGame();
                return;
            } else {
                this.softQuitGame(1);
            }
        }

        private prepareForChangeRoom() {
            this.changeTotalChip(0);
            this.roomViewModel.socketSignalBinding.detach();
            this.roomViewModel.socket.close();
            this.playerArray.forEach(playerView => {
                this.removeChild(playerView);
            });
            this.playerArray = [];
            this.chipArray.forEach(chipView => {
                this.removeChild(chipView);
            });
            this.operationButtonArray.forEach(button => {
                button.visible = false;
            });
            this.chipArray = [];
            this.activePlayerView = null;
            this.roomViewModel = new GFGameRoomViewModel(this.roomViewModel.grid, this.roomViewModel.entryType, this.roomViewModel.roomID);
            this.configGameMessageHandler();
        }

        private onChangeAction() {
            this.btnChange.disabled = true;
            this.timer.once(1000, this, function () {
                this.btnChange.disabled = false;
            });
            if (this.roomViewModel.myselfIsPlaying) {
                let dialog = new GFAlmsDialog("现在换桌本局将自动认输，\n确认换桌?", 1);
                dialog.certain = Handler.create(this, function () {
                    this.changeRoom();
                });
                dialog.cancel = Handler.create(this, function () { });
                dialog.show();
            } else {
                this.changeRoom();
            }
        }

        public softQuitGame(type: number) {
            if (this.roomViewModel.userType == GFUserType.Audience) {
                this.roomViewModel.sendQuitAction(0);
                this.hardQuitGame();
            } else {
                this.roomViewModel.sendQuitAction(type);
            }
        }

        public hardQuitGame() {
            view.updateBottomViewZOrder(400);
            laya.media.SoundManager.stopAll();
            this.roomViewModel.socketSignalBinding.detach();
            this.roomViewModel.socket.close();
            this.roomViewModel.resetMessageTimer();
            this.removeSelf();
            playBgm();
        }

        private onBackAction() {
            if (this.roomViewModel.myselfIsPlaying) {
                let dialog = new view.GFAlmsDialog("现在返回大厅本局将自动认输，\n确认返回大厅？", 1);
                dialog.certain = Handler.create(this, function () {
                    this.softQuitGame(0);
                })
                dialog.cancel = Handler.create(this, null);
                dialog.show();
            } else {
                this.softQuitGame(0);
            }
        }

        private removeHelpView() {
            this.removeChild(this.helpView);
            this.helpView = undefined;
            this.removeChildByName("HelpBackGround");
        }


        private onShowAudienceListAction() {
            if (this.roomViewModel.audienceNumber > 0) {
                let standDialog = new GFStandLooking(this.roomViewModel.roomID, this.roomViewModel.userType == GFUserType.Player ? true : false);
                standDialog.popup();
            }
        }

        private onChallengeAllAction() {
            //TODO: challenge all
            let msg = "";
            switch( this.roomViewModel.level) {
                case 0:
                    msg = this.roomViewModel.myself.name + '正在初级场火热开战！';
                    break;
                case 1:
                    msg = this.roomViewModel.myself.name + '正在中级场火热开战！';;
                    break;
                case 2:
                    msg = this.roomViewModel.myself.name + '正在至尊场火热开战！';;
                    break;
                case 3:
                    msg = this.roomViewModel.myself.name + '摆下' + this.roomViewModel.bet / 10000 + '万擂台，等你来战！';
                    break;
            }
            this.messageView.inputMode(msg, this.roomViewModel.roomID);
            new GFXuanzhantishi();
        }

        private onChallengeFriendAction() {
            //TODO: chanllenge friend
            let dialog = new view.GFStandLooking(this.roomViewModel.roomID, false, true);
            dialog.popup();
        }

        private onHelpAction() {
            if (this.roomViewModel.roomType == GFRoomType.Arena) {
                let helpDialog = new GFArenaHelpDialog();
                helpDialog.popup(true);
            } else {
                if (this.helpView != undefined) {
                    Tween.to(this.helpView, { scaleX: 0, scaleY: 0 }, 100, Ease.linearInOut, Handler.create(this, this.removeHelpView));
                } else {
                    this.helpView = new Image("comp/bg_youxibangzhu.png");
                    this.helpView.pos(this.btnHelp.x + 30, this.btnHelp.y + 30);
                    this.helpView.scale(0, 0);
                    this.helpView.on(Event.CLICK, this, this.onHelpAction);
                    this.addChild(this.helpView);
                    Tween.to(this.helpView, { scaleX: 1, scaleY: 1 }, 200);
                }
                let back = new Image("comp/bg_touming.png");
                back.size(this.width, this.height);
                back.name = "HelpBackGround"
                back.on(Event.CLICK, this, this.removeHelpView);
                this.addChild(back);
            }
        }
        private onEmojAction() {
            let emoj = new GFMediaMsgDialog()
            emoj.selectFace = Handler.create(this, function (index: number) {
                this.roomViewModel.sendEmojiAction(index);
            }, undefined, false);
            emoj.selectVoice = Handler.create(this, function (index: number) {
                this.roomViewModel.sendVoiceAction(index + 7);
            }, undefined, false);
            emoj.show()
        }
        private onCoinAction() {
            if (GFHomePageView.diamondList) {
                GFLog("GFHomePageView.diamondList is not empty");
                let dialog = new ChargeDiamondDialog("");
                dialog.setTypeAndShowContent(1);
                dialog.popup();
            } else {
                GFLog("GFHomePageView.diamondList is empty");
                GFHomePageView.getDiamondList();
                new GFCenterMsgDialog("正在获取数据，请稍后再试！");
            }
        }
        private onFollowAction() {
            //follow action
            this.roomViewModel.sendFollowChipAction();
        }
        private onAddChipAction() {
            let addChipView = new view.GFAddChipView(this.roomViewModel.currentChip);
            addChipView.selectedHandler = Handler.create(this, function (chip: GFChip) {
                //add chip action
                this.roomViewModel.sendAddChipAction(chip);
            })
            addChipView.popup();
        }
        private onShowAction() {
            this.roomViewModel.sendLookAction();
        }
        private onCompareAction() {
            //for test
            let activePlayerArray = this.getActivePlayerArray();
            if (activePlayerArray.length > 2) {
                let chooseItems = new Array<GFCompareChooseItem>();
                activePlayerArray.forEach(playerView => {
                    chooseItems.push({ "position": playerView.player.referPosition, "urid": playerView.player.urid });
                });
                //compare view
                // let items: Array<GFCompareChooseItem> = [{ "position": 1, "urid": "1" }, { "position": 2, "urid": "2" }, { "position": 3, "urid": "3" }, { "position": 4, "urid": "4" }];
                let compareChooseView = new GFCompareChooseView(chooseItems);
                compareChooseView.size(this.width, this.height);
                compareChooseView.show();
                compareChooseView.chooseSignal.add((urid) => {
                    this.roomViewModel.sendCompareAction(urid);
                });
            } else {
                this.roomViewModel.sendFinishAction();
            }
        }
        private onGiveUpAction() {
            this.roomViewModel.sendGiveUpAction();
        }

        private onPrepareAction() {
            let playerView = this.getPlayerViewByUrid(GFPlayer.myUrid);
            if (playerView) {
                playerView.resetWinner();
            }
            this.roomViewModel.sendPrepareAction();
        }

        private onUseMultiCard(){
            let doubleCard = new GFDoubleCardView(this.roomViewModel.roomID)
            doubleCard.zOrder = GFGameRoomLevel.TopMost;
            this.addChild(doubleCard)
        }

        private onAutoFollowAction() {
            this.roomViewModel.autoFollow = !this.roomViewModel.autoFollow;
            if (this.roomViewModel.autoFollow) {
                this.btnAutoFollow.skin = "comp/btn_quxiaogen.png";
            } else {
                this.btnAutoFollow.skin = "comp/btn_zidonggenzhu.png";
            }
        }

        private playerViewAddChip(playerView: GFPlayerView, chip: GFChip) {
            let count = chip.multiply > 100 ? 100 : chip.multiply;
            for (var index = 0; index < count; index++) {
                let chipView = new GFChipView(chip);
                chipView.rendChip();
                chipView.pos(playerView.x, playerView.y);
                let lastChipIndex = 0;
                if (this.chipArray.length) {
                    lastChipIndex = this.getChildIndex(this.chipArray[this.chipArray.length - 1]);
                    lastChipIndex++;
                }
                if (count > 5) {
                    chipView.zOrder = GFGameRoomLevel.BaseChipView;
                } else {
                    chipView.zOrder = GFGameRoomLevel.ChipView;
                }
                if (lastChipIndex) {
                    this.addChildAt(chipView, lastChipIndex);
                } else {
                    this.addChild(chipView);
                }
                this.chipArray.push(chipView);
                let point = chipView.randomDestination;
                Tween.to(chipView, { x: point.x, y: point.y }, 200);
            }
            playMedia(VoiceType.Coin);
        }

        private winAnimationComplete() {
            this.chipArray.forEach(element => {
                this.removeChild(element);
            });
            this.chipArray = [];
        }
        private playerWin(playerView: GFPlayerView) {
            let timeInvetal = 1;
            let length = this.chipArray.length;
            this.chipArray.forEach((element, index) => {
                let speed = timeInvetal++ / length;//TODO: using distance as the factor would be better
                let completeHandler = null;
                if (index + 1 == length) {
                    completeHandler = Handler.create(this, this.winAnimationComplete);
                }
                Tween.to(element, { x: playerView.x, y: playerView.y }, speed * 500, Ease.linearInOut, completeHandler);
            });
            if (playerView) {
                playerView.becomeWinner();
            }
        }

        private getActivePlayerArray(): Array<GFPlayerView> {
            return this.playerArray.filter((playerView, index) => {
                return playerView.player.isActive;
            })
        }

        private messageUI() {
            this.messageView = new view.GFPostMessageView(view.GFPostMessageViewPosition.gameroom);
            this.messageView.zOrder = GFGameRoomLevel.OperationButton;
            this.addChild(this.messageView);
        }
        private giftUI() {
            this.giftView.zOrder = GFGameRoomLevel.OperationButton;
            this.giftView.pos(387 + 41, 382 + 41);
            this.addChild(this.giftView);
        }
    }
}