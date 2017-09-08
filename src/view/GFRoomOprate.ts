module view {
    import Dialog = laya.ui.Dialog;
    import Handler = laya.utils.Handler;
    import Sprite = laya.display.Sprite;
    import Button = laya.ui.Button;
    import Image = laya.ui.Image;
    import Panel = laya.ui.Panel;
    import Label = laya.ui.Label;
    import Tween = laya.utils.Tween;

    export class GFRoomOprateDialog extends Dialog {
        private bgImg : Sprite = new Sprite();
        private opBG : Panel = new Panel();
        private backBtn : Button = new Button();
        private changeBtn : Button = new Button();
        public backHandler : Handler;
        public changeHandler : Handler;
        constructor() {
            super();
            this.configUI();
        }
        private configUI() {
            this.size(1136 , 640);

            this.addChild(this.bgImg);
            // this.bgImg.loadImage("comp/bg_zhezhao.png")
            this.bgImg.size(1136 , 600);
            this.bgImg.pos(0 , 0);
            this.bgImg.on(laya.events.Event.CLICK , this , this.dismiss);

            this.addChild(this.opBG);
            this.opBG.loadImage("comp/bg_huanzhuo.png");
            // this.opBG.size(204 , 164);
            // this.opBG.pivot(102 , 82);
            // this.opBG.pos(102 , 82);

            this.opBG.addChild(this.backBtn);
            this.backBtn.size(160 , 64);
            this.backBtn.centerX = 0;
            this.backBtn.centerY = -32;
            this.backBtn.on(laya.events.Event.CLICK , this , this.back);
            this.backBtn.label = "返回";
            this.backBtn.labelColors = "#ffffff,#ffffff,#ffffff,#ffffff";
            this.backBtn.labelSize = 26;
            this.backBtn.labelPadding = "15 , 0 , 15 , 80";

            let backImg : Image = new Image();
            this.opBG.addChild(backImg);
            backImg.loadImage("comp/btn_yixi_fanhui.png");
            backImg.size(46 , 42);
            backImg.top = 26;
            backImg.left = 48;

            this.opBG.addChild(this.changeBtn);
            this.changeBtn.size(160 , 65);
            this.changeBtn.centerX = 0;
            this.changeBtn.centerY = 32;
            this.changeBtn.on(laya.events.Event.CLICK , this , this.change);
            this.changeBtn.label = "换桌";
            this.changeBtn.labelColors = "#ffffff,#ffffff,#ffffff,#ffffff";
            this.changeBtn.labelSize = 26;
            this.changeBtn.labelPadding = "15 , 0 , 15 , 80";

            let changeImg : Image = new Image();
            this.opBG.addChild(changeImg);
            changeImg.loadImage("comp/btn_yixi_huanzhuo.png");
            changeImg.size(46 , 42);
            changeImg.bottom = 31;
            changeImg.left = 48;
        }
        public show() {
            super.show();
            GFLog("hhehehehhehe");
            // this.opBG.size(204 , 164);
            // this.opBG.pivot(102 , 82);
            // this.opBG.pos(102 , 82);

            this.opBG.size(0 , 0);
            this.opBG.pivot(102 , 0);
            this.opBG.pos(102 , 0);
            this.opBG.scale(0 , 0);

            Tween.to(this.opBG , {width : 204 , height : 164 , pivotY : 82 , y : 82 , scaleX : 1 , scaleY : 1} , 100);
        }

        public dismiss() {
            Tween.to(this.opBG , {width : 0 , height : 0 , pivotY : 0 , y : 0 , scaleX : 0 , scaleY : 0} , 100 , null , Handler.create(this , function(){
                this.close();
            }));
        }
        private back() {
            this.backHandler.run();
        }
        private change() {
            this.changeHandler.run();
        }
    }
}