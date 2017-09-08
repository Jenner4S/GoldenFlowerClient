
module view {
    import list = laya.ui.List;
    import Handler = laya.utils.Handler;
    import Box = laya.ui.Box;

    export class GFBellelLatestTableView extends list {
        constructor() {
            super();
            this.setup();
        }
        private setup(): void {
            this.vScrollBarSkin = "";
            this.repeatX = 5;
            this.repeatY = 3;
            this.itemRender = Item;
            this.renderHandler = new Handler(this, this.updateItemjj);
        }
        private updateItemjj(cell: Item, index: number): void {
            if (index < this.array.length) {
                cell.setData(index);
            }
        }

    }

    class Item extends Box {
        public static width: number = 140;
        public static height: number = 170;
        public rankcell = new ui.GFBelleLatestCellViewUI();
        constructor() {
            super();
            this.size(Item.width, Item.height);
            this.rankcell.width = 140;
            this.rankcell.height = 170;
            this.rankcell.pos(0, 0);
            this.addChild(this.rankcell);

            this.on(laya.events.Event.CLICK, this, function () {
                Laya.stage.event("ClickBelleRankItem", this.dataSource.user.urid);
            });
        }
        public setData(index: number) {
            if (this.dataSource.user.imgurl != undefined && "" != this.dataSource.user.imgurl) {
                this.rankcell.image_belle.skin = this.dataSource.user.imgurl;
            } else {
                this.rankcell.image_belle.skin = "comp/image_meinvmoren.png";
            }
            let name: string = this.dataSource.user.name;
            if (name.length > 6) {
                name = name.substr(0, 6);
            }
            this.rankcell.label_belle_name.text = name;

        }
    }
}
