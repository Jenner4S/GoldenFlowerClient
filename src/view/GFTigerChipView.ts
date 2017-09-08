const GFJINBICHOUMAEVENT = "GFJINBICHOUMAEVENT";
module view {
    import List = Laya.List;
    import Handler = laya.utils.Handler;
    import Button = Laya.Button;
    import BitmapFont = Laya.BitmapFont;
    import Image = Laya.Image;
    export class GFTigerChipView extends Laya.List{
        private mBitmapFont:BitmapFont;
        public selectedCell:GFTigerChipViewCell;
        public isGame:boolean = false;
        private animationImage:Image;
        public selectedHandler:Handler;
        constructor(){
            super();
            this.mBitmapFont = new BitmapFont();
            this.mBitmapFont.loadFont("comp/jinbichouma.fnt",new Handler(this,this.loadFontComplete));
        }
        private loadFontComplete(){
            Laya.Text.registerBitmapFont("jinbichouma", this.mBitmapFont);
            this.mBitmapFont.autoScaleSize = true;
            this.setup();
            Laya.stage.on(GFJINBICHOUMAEVENT,this,function(selectedCell:GFTigerChipViewCell){
                GFLog("received msg GFJINBICHOUMAEVENT");
                this.onSelect(selectedCell);
            })
        }

        private setup(){
            this.itemRender = GFTigerChipViewCell;
            this.renderHandler = new Handler(this,this.updateItem);

            let image = new Image("comp/bg_buttonkuang.png");
            image.centerX = -5;
            image.centerY = -5;
            this.animationImage = image;
            this.animationImage.visible = false;
            this.addChild(this.animationImage);
        }
        public setSelectedFirstCell() {
            Laya.timer.once(500, this, function () {
                if (this.getCell(0)) {
                    this.onSelect(<GFTigerChipViewCell>this.getCell(0));
                }
            })
        }
        public showAnimation(){
            let i = 0;
            this.animationImage.visible = true;
            this.timer.loop(300, this, function () {
                if (i == 9) {
                    this.timer.clearAll(this);
                    this.animationImage.visible = false;
                    return;
                }
                i++;
                this.animationImage.visible = !this.animationImage.visible;
            })
        }


        public setData(dataArray:Array<any>){
            this.array = dataArray;
            this.repeatX = this.array.length;
            this.refresh();
            if (dataArray.length && this.array[0] <= Number(model.UserModel.point)) {
                this.setSelectedFirstCell()
            }
        }
        private updateItem(cell: GFTigerChipViewCell, index: number): void {
            if (index < this.array.length) {
                cell.setData();
            }
        }

        private onSelect(selectedCell: GFTigerChipViewCell) {
            if (this.isGame){
                return;
            }
            if (!selectedCell.canSelected) {
                view.showChargeDialogWithType(1);
                new view.GFCenterMsgDialog("金币不足，请先兑换金币");
                return;
            }
            if (this.selectedCell) {
                this.selectedCell.chipButton.skin = "comp/btn_jinhuchouma.png";
                this.selectedCell.chipButton.selected = false;
            }
            selectedCell.chipButton.selected = true;
            selectedCell.chipButton.skin = "comp/btn_jinhuchouma_sel.png";
            this.selectedCell = selectedCell;
            this.selectedHandler.runWith(this.array.indexOf(selectedCell.dataSource));
        }
    }

    import Box = laya.ui.Box;
    import GFFriendViewUI = ui.GFFriendViewUI;
    class GFTigerChipViewCell extends Box {
        public chipButton:Button;
        public canSelected:boolean = false;
        private isShow:boolean = false;
        constructor(){
            super();
            this.setup();
            this.size(120,86);
        }
        private setup(){
            this.chipButton = new Button("comp/btn_jinhuchouma.png","");
            this.chipButton.size(120,86);
            this.chipButton.stateNum = 2;
            this.addChild(this.chipButton);

            this.chipButton.labelFont = "jinbichouma";
            this.chipButton.labelSize = 24;
            this.chipButton.labelPadding =  "60,0,0,0";
            this.chipButton.on(laya.events.Event.CLICK,this,function(){
                if (!this.isShow){
                    GFLog (this.dataSource)
                    Laya.stage.event(GFJINBICHOUMAEVENT,this);
                }
                Laya.timer.once(1000,this,function(){
                    this.isShow = false;
                })
                this.isShow = true;
            })
        }

        public setData(){
            this.chipButton.label = this.getChipValueWithPoint();
            if (model.UserModel.point < this.dataSource){
                this.chipButton.gray = true;
                this.canSelected = false;
            }else{
                this.canSelected = true;
                this.chipButton.gray = false;
            }
        }

        public getChipValueWithPoint() : string{
            let point = this.dataSource;
            if(point < 10000){
                return point;
            }else if (point >= 1000*10000){
                return "" + point/(1000*10000) + "千万";
            }else {
                return "" + point/10000 + "万";
            }
        }
    }
}