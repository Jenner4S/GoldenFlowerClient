module view {
    export class GFChatListTableView extends Laya.List {
        constructor() {
            super();
            this.setup();
        }
        private setup() {
            this.itemRender = GFChatListCell;
            this.repeatX = 1;

            this.selectEnable = true;
            this.vScrollBarSkin = "";
            this.renderHandler = new Handler(this, this.updateItem);
        }
        private updateItem(cell: GFChatListCell, index: number): void {
            if (index < this.array.length) {
                cell.setData();
            }
        }
    }

    /**
     * name
     */
    import Image = Laya.Image;
    import Label = Laya.Label;
    class GFChatListCell extends Laya.Box{
        private messageLabel: Laya.Label;
        private timeLabel: Laya.Label;
        private userImage: Laya.Image;
        private label: Laya.Label;
        constructor() {
            super();
            this.addSubView();
            this.height = this.messageLabel.height + 20 + 10 +15 + 30;
        }
        public setData() {
            if (this.dataSource.suser.urid == Number(model.UserModel.urid)) {//self
                this.userImage.x = 500;
                this.timeLabel.align = "right";
            } else { //other
                this.userImage.x = 20;
                this.timeLabel.align = "left";
                // this.timeLabel.pos(100,100);
            }
            //test
            let messageModel =  this.dataSource;
            this.userImage.skin = messageModel.suser.imgurl;//"comp/image_touxiang1.png";
            this.timeLabel.text = messageModel.time;//"9月11日 20:20;20";
            let text = messageModel.content;
            this.messageLabel.text = text;
            if (this.dataSource.suser.urid == Number(model.UserModel.urid)) {//self
                if (this.messageLabel.height > 20) {
                    this.messageLabel.align = "left";
                } else {
                    this.messageLabel.align = "right";
                }
            }
            else {
                this.messageLabel.align = "left";
            }
        }

        private addSubView() {
            this.addMessageLabel();
            this.addUserImage();
            this.addTimeLabel();
        }

        private addUserImage() {
            this.userImage = new Image();
            this.userImage.size(50, 50);
            this.userImage.y = 20;
            this.addChild(this.userImage);
        }

        private addTimeLabel() {
            this.timeLabel = new Label();
            this.timeLabel.alpha = 0.6;
            this.timeLabel.width = 390;
            this.timeLabel.x = 90;
            this.timeLabel.y = 20;
            this.timeLabel.color = "#ffffff";
            this.timeLabel.fontSize = 18;
            this.timeLabel.wordWrap = true;
            this.addChild(this.timeLabel);
        }
        private addMessageLabel() {
            this.messageLabel = new Label();
            this.messageLabel.width = 390;
            this.messageLabel.x = 90;
            this.messageLabel.y = 50;
            this.messageLabel.color = "#ffffff";
            this.messageLabel.fontSize = 18;
            this.messageLabel.wordWrap = true;
            this.messageLabel.text = "测试 ";
            this.addChild(this.messageLabel);
        }


    }
}
