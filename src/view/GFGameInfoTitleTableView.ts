module view{
    import list = laya.ui.List;
    import Box = laya.ui.Box;
    export class GFGameInfoTableView extends list{
        // public selectIndex:(index:number) => void;
        public selectIndex:Handler;
        constructor(){
            super();
            this.setup();
        }
        private setup(){
            this.itemRender = Item;
            this.repeatX = 1;
            this.vScrollBarSkin = "";
            this.selectEnable = true;
            this.renderHandler = new Handler(this, this.updateItem);
            this.selectHandler = new Handler(this, this.onselect);
            // this.selectedIndex = this.cells[0];
        }
        private onselect(index:number) {
            // this.selectIndex(index);
            this.selectIndex.runWith(index);
        }
        private updateItem(cell: Item, index:number):void {
            if (index<this.array.length) {
                cell.setData();
            }
        }
    }

    export class Item extends Box{
        public infoCell = new ui.GFGameInfoTitleCellUI();
        constructor(){
            super();
            this.setup();
        }
        private setup() {
            this.infoCell.pos(0,0);
            this.addChild(this.infoCell);
        }
        public setData() {
            this.infoCell.InfoTitle.text = this.dataSource.title;
        }
    }
}