module view {
    import UIImage = laya.ui.Image;
    import UIButton = laya.ui.Button;
    import UILabel = laya.ui.Label;
    /**
     * GFArenaGoDialog 
     */
    export class GFArenaGoDialog extends Dialog {
        public clickSignal:model.GFSignal<Number>;
        constructor(private msg:string) {
            super();
            this.loadImage("comp/bg_gaoshi.png");
            let titleImage = new UIImage("comp/image_tishi.png");
            titleImage.centerX = 0;
            titleImage.centerY = -210;
            this.addChild(titleImage);
            let goButton = new UIButton("comp/btn_qianwang.png");
            goButton.tag = 1;
            goButton.stateNum = 2;
            goButton.centerX = -120;
            goButton.centerY = 170;
            goButton.on(laya.events.Event.CLICK, this, this.buttonEventHandler, [goButton.tag]);
            this.addChild(goButton);
            let cancelButton = new UIButton("comp/btn_bujinru.png");
            cancelButton.tag = 2;
            cancelButton.stateNum = 2;
            cancelButton.centerX = 120;
            cancelButton.centerY = 170;
            cancelButton.on(laya.events.Event.CLICK, this, this.buttonEventHandler, [cancelButton.tag]);
            this.addChild(cancelButton);
            let msgLabel = new UILabel(msg);
            msgLabel.size(400, 300);
            msgLabel.fontSize = 32;
            msgLabel.centerX = 0;
            msgLabel.centerY = 0;
            msgLabel.wordWrap = true;
            msgLabel.color = "#ffffff";
            msgLabel.valign = "middle";
            msgLabel.align = "center";
            this.addChild(msgLabel);

            this.clickSignal = new model.GFSignal<Number>();
        }

        private buttonEventHandler(tag: any) {
            this.close();
            this.clickSignal.dispatch(tag);
            // GFLog("button click:"+tag);
        }
    }
}