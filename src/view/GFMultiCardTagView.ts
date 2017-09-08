module view {
    import UILabel = laya.ui.Label;
    import GFDoubleCard = model.GFDoubleCard;
    export class GFMultiCardTagView extends UILabel {

        constructor (public doubleCard?:GFDoubleCard){
            super();
            if (doubleCard){
                this.renderDoubleCard(doubleCard);
            }
            this.size(120,30);
            this.dataSource = {"fontSize":18,"color":"#ffffff","align":"center","valign":"middle"};
        }

        renderDoubleCard(doubleCard:GFDoubleCard){
            if (doubleCard){
                this.doubleCard = doubleCard;
            }
            if (this.doubleCard){
                this.visible = true;
                this.loadImage("comp/image_fanbeikatishi.png");
                this.changeText("翻倍卡 x"+this.doubleCard.multiple);
            }else{
                this.visible = false;
            }
        }
    }
}