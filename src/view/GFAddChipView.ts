module view {
    /**
     * name
     */
    import Image = Laya.Image;
    import GFChip = model.GFChip;
    import List = laya.ui.List;
    export class GFAddChipView extends laya.ui.Dialog {
        private backGroundView: Image;
        private chipList: List;
        public selectedHandler: Handler;
        constructor(public limitChip?: GFChip) {
            super();
            this.popupCenter = false;
            Laya.loader.load([{ url: "comp/bg_touming.png", type: Loader.IMAGE }], Handler.create(this, function () {
                this.configUI();
            }))
            Laya.stage.on(GFCloseAddChipViewEvent,this,this.close);
        }

        private configUI() {
            this.addImage();
            this.addChipList();
        }

        private addImage() {
            let image = new Image("comp/bg_touming.png");
            image.size(1136,640);
            this.addChild(image);
            image.on(laya.events.Event.CLICK,this,this.close);

            this.backGroundView = new Image("comp/bg_youxi_jiazhu.png");
            this.backGroundView.pos(150, 640 - 160 - 126);
            this.addChild(this.backGroundView);
        }
        private addChipList() {
            this.chipList = new List();
            this.addChild(this.chipList);
            this.chipList.itemRender = ChipListCell;
            this.chipList.repeatX = 5;
            this.chipList.pos(this.backGroundView.x + 60, this.backGroundView.y + 30);
            this.chipList.spaceX = 20;
            this.chipList.selectEnable = true;
            let array: Array<GFChip> = [];
            let valueArray = GFChip.valueArray[this.limitChip.level];
            for (var key in valueArray) {
                let value = valueArray[key];
                let chip: GFChip = new GFChip(value, this.limitChip.level);
                array.push(chip);
            }
            this.chipList.array = array;//["1","2","2","2","2"];
            this.chipList.selectHandler = new Handler(this, this.onSelect);
            this.chipList.renderHandler = new Handler(this, this.updateItem);
        }
        private updateItem(cell: ChipListCell, index: number): void {
            if (index < this.chipList.array.length) {
                cell.setData();
                if (cell.dataSource.value > this.limitChip.value) {
                    cell.chipView.gray = false;
                } else {
                    cell.chipView.gray = true;
                }
            }
        }

        private onSelect(index: number): void {
            if (index < this.chipList.array.length) {
                let selectedChip = this.chipList.selection.dataSource;
                if (selectedChip.value > this.limitChip.value) {
                    this.selectedHandler.runWith(selectedChip);
                    this.close();
                }
            }
        }
    }

    /**
     *  ChipListCell extends Laya.Box
     */
    class ChipListCell extends Laya.Box {
        public chipView: view.GFChipView;
        public chip: GFChip;
        public gray: boolean;
        constructor() {
            super();
            this.addChipView();
        }

        private addChipView() {
            this.chipView = new view.GFChipView();
            this.chipView.rendChip();
            this.chipView.pivot(0, 0);
            this.chipView.scale(1.67, 1.67);
            this.addChild(this.chipView);
        }

        public setData() {
            this.chipView.rendChip(this.dataSource);
        }
    }
}