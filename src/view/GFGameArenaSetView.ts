module view {
    import GFUserType = model.GFUserType;
    import GFRoomType = model.GFRoomType;
    import GFEntryType = model.GFEntryType;
    import Button = laya.ui.Button;
    export class GFArenaSetView extends ui.GFGameArenaSetViewUI {
        private isWatch: boolean = true;
        private bet: number = 100000;
        private maxPoint: number;
        private friendList: any = [];
        constructor(private point: number) {
            super();
            let str = String(point);
            str = str.substring(0, str.length - 5);
            this.maxPoint = Number(str + "00000");
            this.setup();

            this.btn_close.on(laya.events.Event.CLICK, this, this.close);
            this.btn_select.on(laya.events.Event.CLICK, this, this.selected);
            this.btn_sure.on(laya.events.Event.CLICK, this, this.sure , [0]);
            this.btn_friend.on(laya.events.Event.CLICK, this, this.chooseFriend);
        }
        private setup() {

            this.btn_select.selected = true;
            this.slider.bar.skin = "comp/bg_shezhitiao$bar.png";
            this.slider.bar.stateNum = 2;
            this.slider.bar.width = 23;
            this.slider.bar.height = 33;
            this.slider.skin = "comp/bg_shezhitiao.png";
            this.slider.showLabel = false;
            this.slider.min = 100000;
            this.slider.max = this.maxPoint;
            this.slider.value = 100000;
            if (this.maxPoint == 100000) {
                this.slider.tick = 0;
                this.slider.allowClickBack = false;
            } else {
                this.slider.tick = 100000;
                this.slider.allowClickBack = true;

            }
            // this.slider.x = 260;
            // this.slider.y = 205;
            this.slider.changeHandler = new Handler(this, function (value: number) {
                if (value > this.maxPoint) {
                    value = this.maxPoint;
                }
                if (value < 100000 || value == NaN) {
                    value = 100000;
                }
                this.bet = value;
                this.label_money.text = '' + this.bet;
            });
        }
        private chooseFriend() {
            GFLog(this.friendList)
            let chooseView = new GFChooseFriends(this.friendList.concat(), Handler.create(this, function (chooseUrids: any) {
                this.friendList = chooseUrids;
                this.btn_friend.selected = this.friendList.length > 0;
            }));
            chooseView.show();
        }
        private selected() {
            this.btn_select.selected = !this.btn_select.selected;
            this.isWatch = !this.isWatch;
        }
        private sure(confirm : number = 0) {
            this.btn_sure.disabled = false;
            let api = "arena/commit";
            let param = {
                "bet": this.bet,
                "watch": this.isWatch ? 1 : 0,
                "confirm" : confirm
            };
            if (this.friendList.length) {
                let str = '['
                for (var key in this.friendList) {
                    if (this.friendList.hasOwnProperty(key)) {
                        var element = this.friendList[key];
                        GFLog(key)
                        str = str + '"' + element + '"';
                        if (Number(key) < this.friendList.length - 1) {
                            str = str + ','
                        }
                    }
                }
                str = str + ']'
                param['friends'] = str
            }
            model.getUrlRequestResponse(api, param, Handler.create(this, function (result: any) {
                this.btn_sure.disabled = true;
                if (result.errcode == 0) {
                    loadRes(GameRoomRes, Handler.create(this, function () {
                        stopBgm();
                        let gameRoom = new GFGameRoom(null, GFEntryType.Normal, result.roid, GFUserType.Player, GFRoomType.Arena);
                        let homePage = Laya.stage.getChildByName(GFHomePageView.name);
                        homePage.addChild(gameRoom);
                        this.close();
                    }))
                } else if (result.errcode == 210) {
                    let go = new GFArenaGoDialog(result.msg);
                    go.popup();
                    go.clickSignal.add(tag => {
                        if (tag == 1) {
                            this.sure(1);
                        } else {
                            this.close();
                        }
                    })
                }else {
                    if(!result.msg.length) {
                        this.btn_sure.disabled = false;
                        new view.GFCenterMsgDialog(result.msg);
                    }
                }
            }), false);

        }
    }
}