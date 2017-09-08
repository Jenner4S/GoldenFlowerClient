/**
 * GFIndianaHall 
 */

module view {
    import Text = laya.display.Text;
    import Event = laya.events.Event;
    import List = Laya.List;
    import GFIndianaListTableView = view.GFIndianaListTableView;
    import Socket = laya.net.Socket;
    import Tween = laya.utils.Tween;

    export class GFIndianaHall extends ui.GFIndianaHallViewUI {
        private indianaList: any;
        private currentindex: any;
        private listview: GFIndianaListTableView;
        private rankList: List;
        private last_page: any;
        private socket: Socket = new Socket();

        constructor() {
            super();
            this.name = "GFIndianaHall";
            this.btn_back.on(laya.events.Event.CLICK, this, this.onClickBack);
            this.btn_change.on(laya.events.Event.CLICK, this, this.onClickChange);
            // let aa = [1, 2, 3, 4, 5, 6];
            // this.showContent(aa);
            this.getIndianaList();

            this.initRankList();
            this.getRankList();
            this.timer.loop(10 * 1000, this, this.getRankList);

            Laya.stage.on("ClickIndianaListGrabButton", this, function (irid: any) {
                let api = "indiana/entry";
                let params = { type: 2, irid: irid };
                model.getUrlRequestResponse(api, params, Handler.create(this, function (result: any) {
                    GFLog(result);
                    if (result.errcode == "0") {
                        Laya.stage.event("GrabIndiana", result);
                        Laya.stage.event('GFIndianaBoxChange')
                        this.onClickBack();
                    }else if (result.errcode == "212") {
                        new GFCenterMsgDialog(result.msg);
                        this.onClickBack();
                        let home = Laya.stage.getChildByName(GFHomePageView.name);
                        let Indianahomea = <GFTigerIndianaView>home.getChildByName("GFTigerIndianaViewName");
                        (<view.GFTigerIndianaView>Indianahomea).hardBack();
                    } else {
                        new GFCenterMsgDialog(result.msg);
                    }
                }));
            });

            this.connectUrl();
        }

        public connectUrl(url?: string) {
            if (!url) {
                url = "ws://" + HOST + ":6262/";
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
            GFLog("onSocketOpen---GFIndianaHall");
        }


        private onSocketClose(): void {
            GFLog("onSocketClose---GFIndianaHall");
            Laya.stage.timer.once(500, this, this.connectUrl)
        }

        private onConnectError(e: Event): void {
            GFLog("onConnectError---GFIndianaHall");
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
                if (obj.action == 1) {//1.单台夺宝机数据更新
                    
                    
                    this.refreshContent(obj.data);
                }
            }

        }

        public refreshContent(data: any): void {
            if (this.indianaList != undefined) {
                let i: number = 0;
                let j: number = -1;
                this.indianaList.forEach(dataSource => {
                    if (dataSource.room.irid == data.room.irid) {
                        j = i;
                    }
                    i++;
                });
                if (j >= 0) {

                    GFLog("---单台夺宝机数据更新---irid=" + data.room.irid);

                    this.indianaList[j] = data;
                    this.indianaList[j].play = true;
                    this.listview.array[j] = data;
                    this.listview.array[j].play = true;
                    let aa: GFIndianaListtableViewCell = <GFIndianaListtableViewCell>this.listview.getCell(j);
                    aa.dataSource = data;
                    aa.setData();
                    this.indianaList[j].play = aa.dataSource.play;
                   
                }
            }
        }

        public showContent(listdata: any): void {
            this.indianaList = listdata;
            if (this.listview == undefined) {
                this.listview = new view.GFIndianaListTableView();
                this.listview.pos(35, 154);
                this.listview.width = 850;
                this.listview.height = 570;
                this.addChild(this.listview);
                this.listview.setup(this.indianaList);
            } else {
                this.listview.array = this.indianaList;
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
            Laya.stage.event('IndianaHallBack')
            Laya.stage.offAll("ClickIndianaListGrabButton");
            this.removeSelf();
            GFLog("onClickBack---GFIndianaHall");
        }

        private onClickChange(): void {
            this.getIndianaList();
            if (this.indianaList == null || this.indianaList.length <= 0 || this.listview == undefined)
                return;
            for (let i = 0; i < this.indianaList.length; i++) {
                Tween.to(this.listview.getCell(i), { scaleX: 0, pivotX: -264 }, 500, null, Handler.create(this, function () {
                    Tween.to(this.listview.getCell(i), { scaleX: 1.0, pivotX: 0 }, 500, null, undefined, 0, true)
                }), 0, true);
            }
        }

        private getIndianaList(): void {
            let api = "indiana/list";
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
            let api = "indiana/rank";
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
                } else if(result.errcode == "1"){
                    this.label_myrank.text = result.msg;
                }
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
            this.point.text = "   中" + info.score + "宝贝";
        }
    }

}