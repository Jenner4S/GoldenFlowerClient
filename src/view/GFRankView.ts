
module view {
    import list = laya.ui.List;
    import Handler = laya.utils.Handler;
    import rankTableView = view.GFRankTableView;
   export class GFRankView extends ui.GFGameRankViewUI {
        private resultResponse:any;
        private list:rankTableView = new rankTableView();
        private type:number;
        constructor() {
            super();
            this.type = 1;
            this.addTableView();
            this.requsetData();
            this.rankTab.selectHandler = new Handler(this,this.onSelect);
            this.closeRankBtn.on(laya.events.Event.CLICK, this, this.close);
        }
        private addTableView():void{
            // let list:rankTableView = new rankTableView();
            this.list.width = 720;
            this.list.height = 370;
            this.list.pos(30, 170);
            this.addChild(this.list);
            GFLog("===========");
            
        }
        
        private requsetData(){
            let api = "game/rank";
            let param = {
                type:this.type,
                page:1
            }
            model.getUrlRequestResponse(api,param,Handler.create(this,this.finishLoad));
        }

        private finishLoad(result:any){
            this.resultResponse = result;
            if (this.resultResponse.errcode == 0) {
                this.myRank.text = this.resultResponse.tips;
                switch (this.type) {
                    case 3:
                        this.rankInfo.text = "单局赢得";
                        break;
                    case 4:
                        this.rankInfo.text = "胜利次数";
                        break;
                    case 5:
                        this.rankInfo.text = "礼物价值";
                        break;                                        
                    default:
                        this.rankInfo.text = "";
                        break;
                }
                this.configTable();
            }
        }

        private configTable(){
            this.list.array = this.resultResponse.list;
            this.list.type = this.type;
            this.list.scrollBar.setScroll(0,100,1);
            this.list.refresh();
        }
       private onSelect(index:number):void{
           this.type = index + 1;
           this.rankTab.selectedIndex = index;
           this.requsetData();
       }
    }
}
