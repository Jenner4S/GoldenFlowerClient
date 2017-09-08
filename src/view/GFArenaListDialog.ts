module view {
    /**
      * GFArenaListDialog 
      */
    import List = Laya.List;
    import GFUserType = model.GFUserType;
    import GFRoomType = model.GFRoomType;

    export class GFArenaListDialog extends ui.GFArenaListViewUI {
        private arenaList: List;
        constructor(parameters) {
            super();
            this.name = "GFArenaListDialog";
            localStorage.setItem("arenalistdialog", "on");
            this.initList();
            if (parameters == "1") {

            } else {
                this.getArenaList();
            }

            this.onBtnClick();
            this.label_information.text = "每人底注最低10万";
            Laya.stage.on("refresh_arenalist_message", this, function () {
                if (localStorage.getItem("arenalistdialog") == "on")
                    this.getArenaList();
            });
            Laya.stage.on("GFEnterArenaRoom", this, function () {
                this.closeBtnClick();
            });
        }



        private initList() {
            this.arenaList = new List();
            this.arenaList.name = "arenaList";
            this.arenaList.array = [];
            this.arenaList.itemRender = ArenaItem;
            this.arenaList.repeatX = 2;
            this.arenaList.height = 350;
            this.arenaList.vScrollBarSkin = "";
            this.arenaList.selectEnable = true;
            this.arenaList.renderHandler = new Handler(this, this.updateItem);
            this.arenaList.pos(216, 125);
            this.addChild(this.arenaList);

        }

        private updateItem(cell: ArenaItem, index: number): void {
            cell.setData();
        }

        private onBtnClick() {
            this.btn_close.on(laya.events.Event.CLICK, this, this.closeBtnClick);

            this.btn_open_arena.on(laya.events.Event.CLICK, this, this.onOpenArenaBtnClick);

        }

        public closeBtnClick() {
            this.removeSelf();
            view.updateBottomViewZOrder(1000);
            localStorage.setItem("arenalistdialog", "close");
        }

        private onOpenArenaBtnClick() {
            let api = "arena/precommit";

            model.getUrlRequestResponse(api, undefined, Handler.create(this, function (result: any) {
                GFLog(result);
                if (result.errcode == "0") {
                    //进入摆擂台
                    view.updateBottomViewZOrder(1000);
                    let arenaSetView = new view.GFArenaSetView(result.point);
                    arenaSetView.popup();
                } else {
                    new GFCenterMsgDialog(result.msg);
                }

            }));
        }

        private getArenaList(): void {
            let api = "arena/list";

            model.getUrlRequestResponse(api, undefined, Handler.create(this, function (result: any) {
                GFLog(result);
                if (!this.parent) {
                    let homePage = Laya.stage.getChildByName(GFHomePageView.name);
                    if (homePage.getChildByName(this.name)) {
                        homePage.removeChildByName(this.name);
                        homePage.addChild(this);
                    } else {
                        return;
                    }
                }
                if (result.errcode == "0") {
                    if (result.list) {
                        this.arenaList.array = result.list;
                        let length = result.list.length;
                        let num = length / 2 + length % 2;
                        this.arenaList.repeatY = num;
                        this.arenaList.refresh();
                    }

                } else if (result.errcode == "1") {

                    this.arenaList.array = [];
                    this.arenaList.refresh();

                } else {
                    this.removeSelf();
                    view.updateBottomViewZOrder(1000);
                    new GFCenterMsgDialog(result.msg);
                }

            }));
        }


    }
    import Box = laya.ui.Box;
    import ArenaItemView = ui.GFArenaItemViewUI;
    class ArenaItem extends Box {
        private arenaView: ArenaItemView;
        constructor() {
            super();
            this.arenaView = new ArenaItemView();
            this.arenaView.pos(0, 0);
            this.addChild(this.arenaView);
            this.arenaView.btn_watch.on(laya.events.Event.CLICK, this, this.watchArenaGame);
            this.arenaView.btn_join.on(laya.events.Event.CLICK, this, this.joinArenaGame);

        }

        private watchArenaGame() {
            this.enterAnenaGameByType(GFUserType.Audience, this.dataSource.roid);
        }

        private joinArenaGame() {
            this.enterAnenaGameByType(GFUserType.Player, this.dataSource.roid);
        }

        private enterAnenaGameByType(userType: GFUserType, enterRoid: string) {
            GFLog("enterRoid = " + enterRoid);
            let api = "arena/preentry";
            let params = { "type": userType, "roid": this.dataSource.roid };
            model.getUrlRequestResponse(api, params, Handler.create(this, function (result: any) {
                if (result.errcode == 0) {
                    this.enterArenaGame(userType,enterRoid);
                } else if (result.errcode == 210) {
                    let goDialog = new GFArenaGoDialog(result.msg);
                    goDialog.popup();
                    goDialog.clickSignal.add(tag => {
                        if (tag == 1) {
                            this.enterArenaGame(userType,enterRoid);
                        }
                    });
                }else {
                    new GFCenterMsgDialog(result.msg);
                }
            }), false);
        }

        public enterArenaGame(userType: GFUserType, enterRoid: string) {
            loadRes(GameRoomRes, Handler.create(this, function () {
                stopBgm();
                let gameRoom = new GFGameRoom(null, model.GFEntryType.Normal, enterRoid, userType, GFRoomType.Arena);
                let homePage = Laya.stage.getChildByName(GFHomePageView.name);
                homePage.addChild(gameRoom);
            }))
        }

        public setData() {
            let arenaInfo = this.dataSource;
            if (arenaInfo) {
                this.arenaView.visible = true;
                let masterName: string = arenaInfo.boss;
                if (masterName.length > 6)
                    masterName = masterName.substring(0, 5);
                this.arenaView.label_arena_master.text = "擂主：" + masterName;
                this.arenaView.label_base_chip.text = "底注：" + arenaInfo.bet;
                this.arenaView.label_person_num.text = "人数：" + arenaInfo.pnum;

                if (arenaInfo.watch == 1) {
                    this.arenaView.label_watcher_num.text = "观战：" + arenaInfo.wnum;
                    this.arenaView.btn_watch.visible = true;
                } else {
                    this.arenaView.label_watcher_num.text = "观战：禁止";
                    this.arenaView.btn_watch.visible = false;
                }
                if (arenaInfo.friend == 1) {
                    this.arenaView.image_only_friend.visible = true;
                } else {
                    this.arenaView.image_only_friend.visible = false;
                }
            } else {
                this.arenaView.visible = false;
            }

        }

    }
}