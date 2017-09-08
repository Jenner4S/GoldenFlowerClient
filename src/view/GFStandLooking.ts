/**
 * 擂台赛观战列表
 * @Author: Zhang chaochao
 * @since 2016-09-29
 */
module view {
    import List = Laya.List;
    export class GFStandLooking extends ui.GFStandLookingUI {
        private arenaList: List;
        private roomid: String;

        constructor(roomID: String, isTipVisible: boolean, private isChallengeFriend?: boolean) {
            super();
            this.roomid = roomID;

            this.initList();
            this.setClick();
            this.getUserList();
            if (isTipVisible)
                this.btn_tip.visible = true;
            else
                this.btn_tip.visible = false;

            if (isChallengeFriend) {
                this.btn_tip.visible = false;
            }
        }

        private initList(): void {
            this.arenaList = new List();
            this.arenaList.itemRender = ArenaItem;
            this.arenaList.repeatX = 2;
            this.arenaList.height = 350;
            this.arenaList.vScrollBarSkin = "";
            this.arenaList.spaceX = 16;
            this.arenaList.spaceY = 20;
            this.arenaList.selectEnable = true;
            this.arenaList.renderHandler = new Handler(this, this.updateItem);
            this.arenaList.pos(55, 125);
        }

        private setClick(): void {
            this.btn_close.on(laya.events.Event.CLICK, this, this.onBtnClose);
            this.btn_tip.on(laya.events.Event.CLICK, this, this.onBtnTip);
        }

        private updateItem(cell: ArenaItem, index: number): void {
            if (index < this.arenaList.array.length) {
                cell.setData();
            }
        }

        private getUserList(): void {
            let api = "arena/watch-list";
            let params = { roid: this.roomid };
            if (this.isChallengeFriend) {
                api = "game/friend-list";
            }
            model.getUrlRequestResponse(api, params, Handler.create(this, function (result: any) {
                GFLog(result);
                if (result.errcode == "0") {
                    if (result.list) {
                        if (this.isChallengeFriend) {
                            result.list.forEach(userModel => {
                                userModel.isChallengeFriend = 1;
                                userModel.roomID = this.roomid;
                            });
                        }
                        this.arenaList.array = result.list;
                        let length = result.list.length;
                        let num = length / 2 + length % 2;
                        this.arenaList.repeatY = num;
                        this.addChild(this.arenaList);
                    }
                }
            }));
        }

        private onBtnClose(): void {
            this.close();
        }

        private onBtnTip(): void {
            let tipDialog = new GFGameTip();
            tipDialog.popup();
            this.close();
        }

    }

    import Box = laya.ui.Box;
    import ArenaItemView = ui.GFArenaLookingItemUI;
    class ArenaItem extends Box {
        private arenaView: ArenaItemView;
        constructor() {
            super();
            this.arenaView = new ArenaItemView();
            this.arenaView.pos(0, 0);
            this.addChild(this.arenaView);
            this.arenaView.btn_go.on(laya.events.Event.CLICK, this, this.btnView);
        }

        private btnView() {
            if (this.dataSource.isChallengeFriend) {
                model.getUrlRequestResponse("game/challenge-friend", { "furid": this.dataSource.urid, "roid":this.dataSource.roomID }, Handler.create(this, function (result: any) {
                    if (result.errcode == 0) {
                        this.dataSource.challengeFinish = 1;
                        this.arenaView.btn_go.disabled = true;
                    }
                }), true)
            } else {
                let userDetail = new GFUserDetailDialog(this.dataSource.urid);
                userDetail.popup();
            }
        }

        public setData() {
            let arenaInfo = this.dataSource;
            GFLog("setData: arenaInfo = " + arenaInfo);
            if (arenaInfo) {
                this.arenaView.img_head.dataSource = arenaInfo.imgurl;
                if (1 == arenaInfo.sex)
                    this.arenaView.img_sex.skin = "comp/image_nan.png";
                else if (2 == arenaInfo.sex)
                    this.arenaView.img_sex.skin = "comp/image_nv.png";
                this.arenaView.label_name.text = arenaInfo.name.substring(0, 4);
                this.arenaView.label_coins.text = arenaInfo.point;
                if (arenaInfo.urid == model.UserModel.urid)
                    this.arenaView.btn_go.visible = false;
                else
                    this.arenaView.btn_go.visible = true;
                if (arenaInfo.isChallengeFriend) {
                    this.arenaView.btn_go.label = "挑战";
                    if (this.dataSource.challengeFinish == 1) {
                        this.arenaView.btn_go.disabled = true;
                    } else {
                        this.arenaView.btn_go.disabled = false;
                    }
                }
            }
        }
    }

}
