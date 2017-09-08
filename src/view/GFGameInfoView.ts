module view {
    import list = laya.ui.List;
    import Handler = laya.utils.Handler;
    import GameInfoTableView = view.GFGameInfoTableView;
    export class GFGameInfoView extends ui.GFGameInfoViewUI {
        private list: GameInfoTableView = new GameInfoTableView();
        private resultResponse:any;
        private selectIndex:number;
        constructor() {
            super();
            this.closeRankBtn.on(laya.events.Event.CLICK, this, this.close);
            this.selectIndex = 0;
            this.addTableView();
            this.requsetData();
        }
        private addTableView() {
            this.list.width = 218;
            this.list.height = 460;
            this.list.pos(17,126);
            this.addChild(this.list);
            // this.list.selectIndex = function (index:number) {
            //     this.selectIndex = index;
            //     this.configeView();
            // }
            this.list.selectIndex = Handler.create(this,function (index:number) {
                this.selectIndex = index;
                this.configeView();
            },undefined,false);
        }
        private requsetData() {
            let api = "notice/index";
            model.getUrlRequestResponse(api,null,Handler.create(this,this.finishLoad));            
        }
        private finishLoad(result:any){
            this.resultResponse = result;
            this.configeView();
        }

        private configeView() {
            if (this.resultResponse.errcode == 0) {
                let selectMethod:any = this.resultResponse.list[this.selectIndex];
                this.noInfo.visible= false;
                this.titleInfo.visible = true;
                this.detailInfo.visible = true;
                this.titleInfo.text = selectMethod.title;
                this.detailInfo.text = selectMethod.content;
            }else{
                this.noInfo.visible= true;
                this.titleInfo.visible = false;
                this.detailInfo.visible = false;              
            }   
                this.configTable();
     
        }
        private configTable() {
            this.list.array = this.resultResponse.list;
            this.list.refresh();
        }

    }
}