module view {
    import Sprite = laya.display.Sprite;
    import Handler = laya.utils.Handler;
    import Label = laya.ui.Label;
    import TimeLine = laya.utils.TimeLine;
    import ColorSize = model.getColorWithNumber;

    export class GFCenterMsgDialog extends Sprite {
        private label : Label = new Label();
        private timeLine : TimeLine = new TimeLine();
        constructor(private msg : string = '',public callBack?: Handler) {
            super();
            Laya.loader.load("comp/bg_qipao.png" , Handler.create(this , this.configUI));
        }
        configUI() {
            Laya.stage.addChild(this);
            this.size(1136 , 100);
            this.pos(568 , 320);
            this.pivot(568 , 50);
            this.loadImage("comp/bg_qipao.png");

            this.addChild(this.label);
            this.label.size(1136 , 100);
            this.label.pos(568 , 100);
            this.label.pivot(568 , 50);
            this.label.align = "center";
            this.label.valign = "middle";
            this.label.overflow = "hidden";
            this.label.color = ColorSize(11);
            this.label.fontSize = 34;
            this.label.bold = false;
            this.label.text = this.msg;

            this.timeLine.to(this.label , { y : 50 } , 200).to( this.label , {} , 1500);
            this.timeLine.play();
            this.timeLine.on(laya.events.Event.COMPLETE , this , this.complete);
        }
        complete() {
            this.removeSelf();
            if(this.callBack){
                 this.callBack.run();
              }
        }
    }
    import MovieClip = Laya.MovieClip;
    import Image = laya.ui.Image;
    export class GFGivingPointCenterMsgDialog extends Sprite {
        private label : Label = new Label();
        private timeLine : TimeLine = new TimeLine();
        private bg : Image = new Image();
        private mc : MovieClip = new MovieClip();
        constructor(private msg : string = '',public callBack?: Handler) {
            super();
            Laya.loader.load("comp/bg_zhezhao.png" , Handler.create(this , this.configUI));
        }
        configUI() {
            Laya.stage.addChild(this);
            this.size(1136 , 640);
            this.pos(568 , 320);
            this.pivot(568 , 320);
            this.loadImage("comp/bg_zhezhao.png");

            this.addChild(this.mc);
            this.mc.size(440, 640);
            this.mc.pivot(220, 320);
            this.mc.pos(1136 / 2, 640 / 2);
            this.mc.load("output/givingPoint.swf");

            this.addChild(this.bg);
            this.bg.size(1136 , 100);
            this.bg.pos(568 , 320);
            this.bg.pivot(568 , 50);
            this.bg.loadImage("comp/bg_qipao.png");

            this.addChild(this.label);
            this.label.size(1136 , 100);
            this.label.pos(568 , 320);
            this.label.pivot(568 , 50);
            this.label.align = "center";
            this.label.valign = "middle";
            this.label.overflow = "hidden";
            this.label.color = ColorSize(11);
            this.label.fontSize = 34;
            this.label.bold = false;
            this.label.text = this.msg;

            this.timeLine.to( this.label , {} , 1900);
            this.timeLine.play();
            this.timeLine.on(laya.events.Event.COMPLETE , this , this.complete);

            
        }
        complete() {
            this.removeSelf();
            if(this.callBack){
                 this.callBack.run();
              }
        }
    }
}