module view {
    import Button = laya.ui.Button;
    export class GFAlmsDialog extends ui.GFAlmsDialogUI {
        private label: Laya.Label = new Laya.Label();
        public certain: Handler;
        public cancel: Handler;
        constructor(private msg: string = "", type: number = 0, public showclose?: boolean) {//type 0(一个确定按钮) 1 (确定 取消)）
            super();
            this.configUI(type);
            Laya.stage.offAll('GFAlmsDialogClose')
            Laya.stage.on('GFAlmsDialogClose' , this , function() {
                this.destroy();
            })
        }
        public show() {
            Laya.stage.addChild(this);
        }
        private configUI(type: number) {
            // this.certain.on(laya.events.Event.CLICK , this , this.destroy);
            this.addChild(this.label);
            this.label.text = this.msg;
            this.label.fontSize = 30;
            this.label.color = "#ffffff";
            this.label.leading = 10;
            this.label.valign = "middle";
            this.label.align = "center";
            this.label.top = 246;
            this.label.centerX = 0;
            this.label.width = 520;
            this.label.wordWrap = true;

            let certain = new Button("comp/btn_150x58.png", "确定");
            let cancel = new Button("comp/btn_fanhui_quxiao.png", "取消");
            let close = new Button("comp/btn_dialog_close.png", "取消");
            certain.stateNum = 2;
            cancel.stateNum = 2;
            close.stateNum = 2;
            certain.size(150, 58);
            close.size(73, 73);
            close.label = "";
            certain.labelSize = 24;
            certain.labelColors = "#721e01,#721e01,#721e01,#721e01";
            certain.labelBold = true;
            certain.labelPadding = "0 , 0 , 5 , 0";
            cancel.labelSize = 24;
            cancel.labelColors = "#ffffff,#ffffff,#ffffff,#ffffff";
            cancel.labelBold = true;
            cancel.labelPadding = "0 , 0 , 5 , 0";
            certain.on(laya.events.Event.CLICK, this, this.clickCertain);
            cancel.on(laya.events.Event.CLICK, this, this.clickCancel);
            close.on(laya.events.Event.CLICK, this, this.clickClose);
            if (type == 0) {
                certain.centerX = 0;
                certain.bottom = 182;
                this.addChild(certain);
            } else {
                certain.centerX = -100;
                cancel.centerX = 100;
                certain.bottom = 182;
                cancel.bottom = 182;
                this.addChild(certain);
                this.addChild(cancel);
            }

            if (this.showclose) {
                close.pos(811, 105);
                this.addChild(close);
            }
        }


        private clickCertain() {
            if (this.certain) {
                this.certain.run();
            }
            this.destroy();
        }
        private clickCancel() {
            if (this.cancel) {
                this.cancel.run();
            }
            this.destroy();
        }

        private clickClose() {
            if (this.cancel) {
                this.cancel.run();
            }
            this.destroy();
        }
    }
}