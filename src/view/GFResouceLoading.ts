module view {
    import ColorFilter = Laya.ColorFilter;
    import Image = laya.ui.Image;
    import Sprite = laya.display.Sprite;
    // import MovieClip = Laya.MovieClip;
    // import Timer = laya.utils.Timer;
    export class GFLoadingView extends View { 
        private label : Label = new Label();
        private logo : Image = new Image();
        private proBg : Image = new Image();
        private proL : Image = new Image();
        private proR : Image = new Image();
        private pro : Image = new Image();
        private labelFlag : number = 0;
        // private mc : MovieClip = new MovieClip();
        private labelContent :string;
        constructor(public type : number = 0) {
            super();
            this.configUI();
            this.on(laya.events.Event.CLICK , this , function() {})
        }
        private configUI() {
            this.setProgress(0);

            this.size(1136 , 640);
            this.pos(0 , 0);

            if(this.type) {
                this.loadImage('comp/bg_loading.jpg')
                // this.addChild(this.mc);
                // this.mc.size(436 , 410);
                // this.mc.pivot(218 , 205);
                // this.mc.pos(1136/2 , 640 / 2-40);
                // this.mc.load("output/loading.swf");
                this.labelContent = "游戏加载中.";
            } else {
                this.graphics.drawRect(0 , 0 , 1136 , 640 , "ffffff");
                this.addChild(this.logo);
                this.logo.size(420, 290);
                this.logo.centerX = 0;
                this.logo.top = 80;
                this.logo.loadImage(String(LoadingRes[1]));
                this.labelContent = "玩命加载中.";
            }
            this.addChild(this.label);
            this.addChild(this.proBg);
            this.proBg.addChild(this.proL);
            this.proBg.addChild(this.pro);
            this.proBg.addChild(this.proR);

            this.proBg.size(790 , 12);
            this.proBg.centerX = 0;
            this.proBg.bottom = 80;
            this.proBg.loadImage(String(LoadingRes[0]));

            this.proL.size(6 , 12);
            this.proL.centerY = 0;
            this.proL.left = 0;
            this.proL.loadImage(String(LoadingRes[2]));

            this.pro.size(778 , 12);
            this.pro.centerY = 0;
            this.pro.left = 6;
            this.pro.loadImage(String(LoadingRes[3]));

            this.proR.size(6 , 12);
            this.proR.centerY = 0;
            this.proR.right = 0;
            this.proR.loadImage(String(LoadingRes[4]));

            this.proL.visible = false;
            this.pro.visible = false;
            this.proR.visible = false;

            this.label.centerX = 0;
            this.label.bottom = 108;
            this.label.fontSize = 28;
            this.label.text = this.labelContent;
            this.label.color = "#000000";
            this.label.font = "STXingkai";

            if(this.type) {
                this.label.color = '#ffffff'
                this.proBg.bottom = 50;
                this.label.bottom = 78;
            }

            this.timer.loop(750 , this , this.labelChange);
        }
        public setProgress(pro : number) {
            let pixelsX = pro * 790;
            if (pixelsX == 0) {
                this.proL.visible = false;
                this.pro.visible = false;
                this.proR.visible = false;
            }else if (pixelsX < 6) {
                this.proL.visible = true;
            }else if (pixelsX <= 784) {
                if (pixelsX < 40) {
                    pixelsX = 40;
                }
                this.proL.visible = true;
                this.pro.visible = true;
                this.pro.scaleX = (pixelsX - 6) / 778;
            }else {
                this.proL.visible = true;
                this.pro.visible = true;
                this.proR.visible = true;
                this.pro.scaleX = 1;
            }
        }
        private labelChange() {
            switch (this.labelFlag) {
                case 0:
                    this.label.text = this.labelContent
                    break;
                case 1:
                    this.label.text = this.labelContent + '.';
                    break;
                case 2:
                    this.label.text = this.labelContent + '..';
                    break;
                default:
                    break;
            }
            this.labelFlag = ++this.labelFlag % 3;
        }

    }
}