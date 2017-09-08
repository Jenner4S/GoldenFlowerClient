/**
 * 点击广播消息弹出
 */

module view {

    export class GFArenaNoticeDialog extends ui.GFArenaNoticeDialogUI {
        private challengeinfo: any;
        private roid: any;
        private roomType: any = model.GFRoomType.Normal;
        private giveUpDialog: view.GFAlmsDialog;
        private ground = "初级场";
        constructor(parameters) {
            super();

            this.btn_arena_notice_close.on(laya.events.Event.CLICK, this, this.onDialogClose);
            this.btn_arena_accept.on(laya.events.Event.CLICK, this, this.onArenaAccept);
            this.btn_arena_view.on(laya.events.Event.CLICK, this, this.onArenaView);

            this.image_type.centerX = 0;

            Laya.stage.on("be_kicked_by_other", this, function (roid: any) {
                if (this.giveUpDialog != null) {
                    this.giveUpDialog.close();
                }
            });
        }

        /**
         * isAcceptArena：true---挑战，收到消息自动弹出，false--宣战，点击广播栏
         */
        public showContent(challengeinfo: any, roid: any, isAcceptArena: boolean): void {
            this.challengeinfo = challengeinfo;
            this.roid = roid;

            if (challengeinfo == undefined) {
                return;
            }

            if (challengeinfo.ground == undefined) {
                return;
            }

           

            ///level：0初级场，1高级场，2至尊场，3擂台赛，仅诈金花游戏使用 
            if (!isAcceptArena) {//宣战
                if (challengeinfo.ground.level == 0) {
                    this.image_type.skin = "comp/image_chuji_xuan.png";
                    this.ground = "初级场";
                } else if (challengeinfo.ground.level == 1) {
                    this.image_type.skin = "comp/image_zhongji_xuan.png";
                    this.ground = "高级场";
                } else if (challengeinfo.ground.level == 2) {
                    this.image_type.skin = "comp/image_zhizun_xuan.png";
                    this.ground = "至尊场";
                } else if (challengeinfo.ground.level == 3) {
                    this.image_type.skin = "comp/image_leitai_xuan.png";
                    this.ground = "擂台";
                }
            } else {//挑战
                if (challengeinfo.ground.level == 0) {
                    this.image_type.skin = "comp/image_chuji_tiao.png";
                    this.ground = "初级场";
                } else if (challengeinfo.ground.level == 1) {
                    this.image_type.skin = "comp/image_zhongji_tiao.png";
                    this.ground = "高级场";
                } else if (challengeinfo.ground.level == 2) {
                    this.image_type.skin = "comp/image_zhizun_tiao.png";
                    this.ground = "至尊场";
                } else if (challengeinfo.ground.level == 3) {
                    this.image_type.skin = "comp/image_leitai_tiao.png";
                    this.ground = "擂台";
                }
            }


            this.htmltext_title.style.font = "Impact";
            this.htmltext_title.style.fontSize = 24;

            let titlestr: any;
            let name: any;
            if (challengeinfo.ground.level == 3) {
                this.roomType = model.GFRoomType.Arena;
                name = challengeinfo.arena.boss;
                titlestr = "摆下" + challengeinfo.finalbet + "擂台"
            } else {
                this.roomType = model.GFRoomType.Normal;
                name = challengeinfo.user.name;
                titlestr = "正在" + this.ground + "火热开战！"
            }

            // if (name.length > 6) {
            //     name = name.substr(0, 5) + "…";
            // }

            var html: string = "<span color='#ffcc19'>" + name + "</span>"
                + "<span color='#ffffff'>" + titlestr + "</span>";

            this.htmltext_title.innerHTML = html;

            this.label_tip.text = challengeinfo.content;

            if (!isAcceptArena) {
                this.label_arena_master.text = "宣战者：" + challengeinfo.user.name;
            } else {
                this.label_arena_master.text = "挑战者：" + challengeinfo.user.name;
            }

            this.label_arena_participant.text = "人数：" + challengeinfo.finalpnum;
            this.label_arena_viewer.text = "观战：" + challengeinfo.finalwnum;
            this.label_arena_point.text = "底注：" + challengeinfo.finalbet;

            if (this.roomType == model.GFRoomType.Normal || challengeinfo.arena.watch == 0) {
                this.btn_arena_view.visible = false;
                this.btn_arena_accept.centerX = 0;
                this.label_arena_viewer.visible = false;
            }else{
                this.btn_arena_view.visible = true;
                this.label_arena_viewer.visible = true;
            }

        }

        private quitTiger() {
            let gameHome = Laya.stage.getChildByName(GFHomePageView.name);
            let room = gameHome.getChildByName("GFTigerHomeName");
            if(room) {
                (<GFTigerHome>room).back()
            }
  
            let roomIndiana = gameHome.getChildByName("GFTigerIndianaViewName");
            if(roomIndiana) {
                (<GFTigerIndianaView>roomIndiana).back()
            }

            let arenaList = gameHome.getChildByName("GFArenaListDialog");
            if(arenaList) {
                (<GFArenaListDialog>arenaList).closeBtnClick()
            }
        }

        private onDialogClose(): void {
            this.close();
        }

        //观战
        private onArenaView(): void {
            let api = "arena/preentry";
            let params = { "type": 1, "roid": this.roid };
            model.getUrlRequestResponse(api, params, Handler.create(this, function (result: any) {
                if (result.errcode == 0) {
                    loadRes(GameRoomRes, Handler.create(this, function () {
                        stopBgm();
                        let gameHome = Laya.stage.getChildByName(GFHomePageView.name);
                        let oldGameRoom = gameHome.getChildByName("GFGameRoom");
                        if (oldGameRoom) {
                            (<GFGameRoom>oldGameRoom).hardQuitGame();
                        }
                        this.quitTiger()
                        let gameRoom = new GFGameRoom(null, model.GFEntryType.Normal, result.roid, model.GFUserType.Audience, model.GFRoomType.Arena);
                        gameHome.addChild(gameRoom);
                        Laya.Dialog.closeAll();
                    }))
                } else if (result.errcode == 203) {
                    
                    if (this.giveUpDialog == null) {
                        this.giveUpDialog = new view.GFAlmsDialog("确定放弃当前牌局进入"+this.ground+"？", 1);
                    }
                    this.giveUpDialog.certain = Handler.create(this, function () {
                        let gameHome = Laya.stage.getChildByName(GFHomePageView.name);
                        let oldGameRoom = gameHome.getChildByName("GFGameRoom");
                        (<GFGameRoom>oldGameRoom).hardQuitGame();
                        this.quitTiger()
                        let gameRoom = new GFGameRoom(null, model.GFEntryType.Normal, result.roid, model.GFUserType.Audience, model.GFRoomType.Arena);
                        gameHome.addChild(gameRoom);
                        Laya.Dialog.closeAll();
                    })
                    this.giveUpDialog.show();

                }

            }), true);
        }



        //应战
        private onArenaAccept(): void {
            let api;
            let params: any;
            if (this.roomType == model.GFRoomType.Arena) {//擂台赛
                api = "arena/preentry";
                params = { "type": 0, "roid": this.roid };
            } else {//经典场
                api = "game/preentry";
                params = { "roid": this.roid };
            }

            model.getUrlRequestResponse(api, params, Handler.create(this, function (result: any) {

                if (result.errcode == 0) {
                    this.enterArenaGame(result.roid);
                } else if (result.errcode == 203) {
                    if (this.giveUpDialog == null) {
                        this.giveUpDialog = new view.GFAlmsDialog("确定放弃当前牌局进入"+this.ground+"？", 1);
                    }
                    this.giveUpDialog.certain = Handler.create(this, function () {
                        let gameHome = Laya.stage.getChildByName(GFHomePageView.name);
                        let oldGameRoom = gameHome.getChildByName("GFGameRoom");
                        (<GFGameRoom>oldGameRoom).hardQuitGame();
                        this.quitTiger()
                        let gameRoom = new GFGameRoom(null, model.GFEntryType.Back, result.roid, model.GFUserType.Player, this.roomType);
                        gameHome.addChild(gameRoom);
                        Laya.Dialog.closeAll();
                    })
                    this.giveUpDialog.show();

                } else if (result.errcode == 210) {
                    let goDialog = new GFArenaGoDialog(result.msg);
                    goDialog.popup();
                    goDialog.clickSignal.add(tag => {
                        if (tag == 1) {
                            this.enterArenaGame(result.roid);
                        }
                    });
                } else {
                    new GFCenterMsgDialog(result.msg);
                }

            }));
        }

        private enterArenaGame(roid: string) {
            loadRes(GameRoomRes, Handler.create(this, function () {
                stopBgm();
                let gameHome = Laya.stage.getChildByName(GFHomePageView.name);
                let oldGameRoom = gameHome.getChildByName("GFGameRoom");
                if (oldGameRoom) {
                    (<GFGameRoom>oldGameRoom).hardQuitGame();
                }
                this.quitTiger()
                let gameRoom = new GFGameRoom(null, model.GFEntryType.Back, roid, model.GFUserType.Player, this.roomType);
                gameHome.addChild(gameRoom);
                Laya.Dialog.closeAll();
            }))
        }

    }
}