/**
 * GFTigerHall 
 */

module view {
    import Text = laya.display.Text;
    import Event = laya.events.Event;
    import List = Laya.List;
    import GFTigerListTableView = view.GFTigerListTableView;
    import Socket = laya.net.Socket;
    import Tween = laya.utils.Tween;

    export class GFTigerHall extends ui.GFTigerHallViewUI {
        private tigerList: any;
        private currentindex: any;
        private listview: GFTigerListTableView;
        private rankList: List;
        private last_page: any;
        private socket: Socket = new Socket();

        constructor(parameters) {
            super();
            this.name = "GFTigerHall";
            this.btn_back.on(laya.events.Event.CLICK, this, this.onClickBack);
            this.btn_change.on(laya.events.Event.CLICK, this, this.onClickChange);
            // let aa = [1, 2, 3, 4, 5, 6];
            // this.showContent(aa);
            this.getTigerList();

            this.initRankList();
            this.getRankList();
            this.timer.loop(10 * 1000, this, this.getRankList);

            Laya.stage.on("ClickTigerListGrabButton", this, function (trid: any) {
                let api = "tiger/entry";
                let params = { type: 2, trid: trid };
                model.getUrlRequestResponse(api, params, Handler.create(this, function (result: any) {
                    GFLog(result);
                    if (result.errcode == "0") {
                        Laya.stage.event("GrabTiger", result);
                        Laya.stage.event('GFTigerBoxChange')
                        this.onClickBack();
                    }else if (result.errcode == "212") {
                        new GFCenterMsgDialog(result.msg);
                        this.onClickBack();
                        let home = Laya.stage.getChildByName(GFHomePageView.name);
                        let Tigerhomea = <GFTigerHome>home.getChildByName("GFTigerHomeName");
                        (<view.GFTigerHome>Tigerhomea).hardBack();
                    } else {
                        new GFCenterMsgDialog(result.msg);
                    }
                }));
            });

            this.connectUrl();
        }

        public connectUrl(url?: string) {
            if (!url) {
                url = "ws://" + HOST + ":9292/";
            }

            if (this.socket.connected) {
                this.socket.close()
            }
            this.socket.offAll();
            this.socket.connectByUrl(url);
            this.socket.on(laya.events.Event.OPEN, this, this.onSocketOpen);
            this.socket.on(laya.events.Event.CLOSE, this, this.onSocketClose);
            this.socket.on(laya.events.Event.MESSAGE, this, this.onMessageReveived);
            this.socket.on(laya.events.Event.ERROR, this, this.onConnectError);
        }

        private onSocketOpen(): void {
            GFLog("onSocketOpen---GFTigerHall");
        }


        private onSocketClose(): void {
            GFLog("onSocketClose---GFTigerHall");
            Laya.stage.timer.once(500, this, this.connectUrl)
        }

        private onConnectError(e: Event): void {
            GFLog("onConnectError---GFTigerHall");
        }

        private onMessageReveived(message: any): void {
            if (typeof message == "string") {
                if (message === "null") {
                    return;
                }
                if (message == "{\"ping\"}") {
                    return;
                }
                let obj = JSON.parse(message);
                if (obj.action == 1) {//1.单台金虎机数据更新
                    
                    GFLog("---单台金虎机数据更新---trid=" + obj.data.room.trid);
                    this.refreshContent(obj.data);
                }
            }

        }

        public refreshContent(data: any): void {
            if (this.tigerList != undefined) {
                let i: number = 0;
                let j: number = -1;
                this.tigerList.forEach(dataSource => {
                    if (dataSource.room.trid == data.room.trid) {
                        j = i;
                    }
                    i++;
                });
                if (j >= 0) {
                    this.tigerList[j] = data;
                    this.tigerList[j].play = true;
                    this.listview.array[j] = data;
                    this.listview.array[j].play = true;
                    let aa: GFTigerListtableViewCell = <GFTigerListtableViewCell>this.listview.getCell(j);
                    aa.dataSource = data;
                    aa.setData();
                    this.tigerList[j].play = aa.dataSource.play;
                   
                }
            }
        }

        public showContent(listdata: any): void {
            this.tigerList = listdata;
            if (this.listview == undefined) {
                this.listview = new view.GFTigerListTableView();
                this.listview.pos(35, 154);
                this.listview.width = 850;
                this.listview.height = 570;
                this.addChild(this.listview);
                this.listview.setup(this.tigerList);
            } else {
                this.listview.array = this.tigerList;
            }
        }

        public onClickBack(): void {
            try {
                Laya.timer.clear(this, this.connectUrl);
                Laya.timer.clear(this, this.getRankList);
                this.socket.close();
                this.socket.offAll();
            } catch (error) {

            }
            Laya.stage.offAll("ClickTigerListGrabButton");
            this.removeSelf();
            GFLog("onClickBack---GFTigerHall");
        }

        private onClickChange(): void {
            this.getTigerList();
            if (this.tigerList == null || this.tigerList.length <= 0 || this.listview == undefined)
                return;
            for (let i = 0; i < this.tigerList.length; i++) {
                Tween.to(this.listview.getCell(i), { scaleX: 0, pivotX: -264 }, 500, null, Handler.create(this, function () {
                    Tween.to(this.listview.getCell(i), { scaleX: 1.0, pivotX: 0 }, 500, null, undefined, 0, true)
                }), 0, true);
            }
        }

        private getTigerList(): void {
            let api = "tiger/list";
            let params = { last_page: this.last_page };
            if (this.last_page == undefined) {
                params = undefined;
            }
            model.getUrlRequestResponse(api, params, Handler.create(this, function (result: any) {
                GFLog(result);
                if (result.errcode == "0") {
                    this.last_page = result.page;
                    if (result.room_list) {
                        this.showContent(result.room_list);
                    }
                } else {
                    new GFCenterMsgDialog(result.msg);
                }
            }));
        }

        private initRankList(): void {
            this.rankList = new List();
            this.rankList.itemRender = RankItem;
            this.rankList.repeatX = 1;
            this.rankList.width = 180;
            this.rankList.height = 400;
            this.rankList.vScrollBarSkin = "";
            this.rankList.selectEnable = false;
            this.rankList.renderHandler = new Handler(this, this.updateItem);
            this.rankList.pos(910, 160);
        }

        private getRankList(): void {
            let api = "tiger/rank";
            model.getUrlRequestResponse(api, null, Handler.create(this, function (result: any) {
                GFLog(result);
                if (result.errcode == "0") {
                    if (result.tips) {
                        this.label_myrank.text = result.tips;
                        if (result.status == "0")
                            this.label_myrank.color = model.getColorWithNumber(5);
                        else if (result.status == "1")
                            this.label_myrank.color = model.getColorWithNumber(1);
                    }
                    if (result.list) {
                        this.rankList.array = result.list;
                        let length = result.list.length;
                        this.rankList.repeatY = length;
                        this.addChild(this.rankList);
                    }
                }/* else {
                    new GFCenterMsgDialog(result.msg);
                }*/
            }));
        }

        private updateItem(cell: RankItem, index: number): void {
            if (index < this.rankList.array.length) {
                cell.setData(index);
            }
        }
    }

    import Box = laya.ui.Box;
    class RankItem extends Box {
        private rankName: Label;
        private point: Label;

        constructor() {
            super();

            this.rankName = new Label();
            this.rankName.pos(0, 0);
            this.rankName.color = "#ae8fdc";
            this.rankName.fontSize = 22;
            this.addChild(this.rankName);

            this.point = new Label();
            this.point.pos(0, 30);
            this.point.color = model.getColorWithNumber(11);
            this.point.fontSize = 22;
            this.addChild(this.point);
            this.height = 63;
        }

        public setData(index: number) {
            let info = this.dataSource;
            this.rankName.text = "" + (index + 1) + "." + info.name;
            this.point.text = "   中" + info.score + "金币";
        }
    }

}