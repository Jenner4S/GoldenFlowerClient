module view {

    import List = Laya.List;
    import Handler = laya.utils.Handler;
    export class GFActsListTableView extends List {
        public selectedCell: GFActsListtableViewCell;
        constructor() {
            super();
        }
        public setup(data: any): void {
            this.itemRender = GFActsListtableViewCell;
            this.repeatX = 1;
            this.repeatY = 500;
            this.selectEnable = true;
            this.vScrollBarSkin = "";
            this.renderHandler = new Handler(this, this.updateItem);
            data[0].selected = 1;
            this.array = data;
            // this.selectedIndex = 0;
            // this.selectedCell = this.cells[0];
            
        }

        private updateItem(cell: GFActsListtableViewCell, index: number): void {
            if (index < this.array.length) {
                cell.setData();
            }
        }

        public clearSelected(){   
            this.array.forEach(element => {
                element.selected = 0;
            });
            this.refresh();
            // this.selectedIndex = 0;
            // this.selectedCell = this.cells[0];
        }
    }
    /**
     * name
     */
    import Box = laya.ui.Box;
    import GFActsItemViewUI = ui.GFActsItemViewUI;
    export class GFActsListtableViewCell extends Box {
        public ActsItemView: GFActsItemViewUI;

        constructor(parameters) {
            super();
            this.setup();
        }

        private setup() {
            this.ActsItemView = new GFActsItemViewUI();
            this.ActsItemView.pos(0, 0);
            this.addChild(this.ActsItemView);
        }

        public setData() {
            let item: any = this.dataSource;
            this.ActsItemView.label_acts_item_name.text = item.title;
            if (item.flag) {
                this.ActsItemView.image_acts_item.visible = true;
                this.ActsItemView.label_acts_item_mark.text = item.flag;
            } else { 
                this.ActsItemView.image_acts_item.visible = false;
            }

            if (item.selected) {
                this.ActsItemView.btn_acts_item.selected = true;
            }else{
                this.ActsItemView.btn_acts_item.selected = false;
            }
        }

    }

}