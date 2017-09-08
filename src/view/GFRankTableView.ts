
module view {
    import list = laya.ui.List;
    import Handler = laya.utils.Handler;
    import Box = laya.ui.Box;
    // import RankCell = ui.GFRankCellUI;

    export class GFRankTableView extends list {
        public type: any;
        constructor() {
            super();
            this.setup();
        }
        private setup(): void {
            this.vScrollBarSkin = "";
            this.repeatX = 1;
            this.repeatY = 100;
            this.itemRender = Item;
            this.renderHandler = new Handler(this, this.updateItemjj);
        }
        private updateItemjj(cell: Item, index: number): void {
            if (index < this.array.length) {
                cell.setData(this.type);
            }
        }

    }

    class Item extends Box {
        public static width: number = 720;
        public static height: number = 74;
        public rankcell = new ui.GFRankCellUI();
        constructor() {
            super();
            this.size(Item.width, Item.height);
            // this.rankcell = new ui.GFRankCellUI();
            this.rankcell.width = 720;
            this.rankcell.height = 74;
            this.rankcell.pos(0, 0);
            this.addChild(this.rankcell);

            this.on(laya.events.Event.CLICK, this, function () {
                if(this.dataSource.user != undefined && this.dataSource.user.urid != undefined){
                    Laya.stage.event("ClickBelleRankItem", this.dataSource.user.urid);
                }
            });

        }
        public setData(type: any) {
            if (type == 4) {
                this.rankcell.money_image.visible = false;
            } else {
                this.rankcell.money_image.visible = true;
            }

            if(this.dataSource.name != undefined){
                this.rankcell.rankName.text = this.dataSource.name;
            }else if(this.dataSource.user != undefined && this.dataSource.user.name != undefined){
                this.rankcell.rankName.text = this.dataSource.user.name;
            }

            if(this.dataSource.score != undefined){
                this.rankcell.rankMoney.text = this.dataSource.score;
            }else if(this.dataSource.point != undefined){
                this.rankcell.rankMoney.text = this.dataSource.point+"";
            }

            if (this.dataSource.rank == "1" || this.dataSource.rank == "2" || this.dataSource.rank == "3") {
                this.rankcell.rankNum.visible = false;
                this.rankcell.imageNum.visible = true;
                if (this.dataSource.rank == "1") {
                    this.rankcell.imageNum.skin = "comp/image_paihang1.png";
                } else if (this.dataSource.rank == "2") {
                    this.rankcell.imageNum.skin = "comp/image_paihang2.png";
                } else {
                    this.rankcell.imageNum.skin = "comp/image_paihang3.png";
                }
            } else {
                this.rankcell.rankNum.visible = true;
                this.rankcell.rankNum.text = this.dataSource.rank;
                this.rankcell.imageNum.visible = false;
            }
        }
    }
}
