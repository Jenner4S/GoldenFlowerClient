module view {
    import Sprite = Laya.Sprite;
    import Browser = laya.utils.Browser;
    import Button = laya.ui.Button;
    import Image = laya.ui.Image;
    import Tween = laya.utils.Tween;

    export class GFGuideView extends Sprite {
        private addscreen;
        private bottomArrow;
        constructor() {
            super();
            this.size(1136, 640);
            this.addscreen = new Image();
            this.addscreen.pivot(43, 40);
            this.bottomArrow = new Image();
            this.bottomArrow.pivot(28, 13);
            this.showGuideImageByOs();
        }
        private showGuideImageByOs() {
            if (Browser.onAndriod) {
                this.showGuideImageOnAndroid();
            } else if (Browser.onIOS) {
                if(Browser.onWeiXin){
                    let url = "comp/bg_ios_weixin.jpg";
                    this.showGuideImageOnIos(url,false);
                }else{
                    let url = "comp/bg_ios_yindao.jpg";
                    this.showGuideImageOnIos(url,true);
                }
                
            }
        }

        private showGuideImageOnAndroid() {
            this.loadImage("comp/bg_anzhuoyindao.png", 0, 0, this.width, this.height, Handler.create(this, function () {


                this.addscreen.skin = "comp/image_jiadaopinmu.png";
                this.addscreen.pos(1079, 56);
                Laya.timer.loop(1200, this, this.addToScreenButtonScale);
                this.addscreen.on(laya.events.Event.CLICK, this, this.addToScreen);
                this.addChild(this.addscreen);

                let btn_i_know = new Button();
                btn_i_know.skin = "comp/btn_wozhidaole.png";
                btn_i_know.stateNum = 2;
                btn_i_know.pos(443, 496);
                btn_i_know.on(laya.events.Event.CLICK, this, this.iKnowButonClick);
                this.addChild(btn_i_know);
            }));

        }


        private addToScreenButtonScale(): void {
           
            Tween.to(this.addscreen, { scaleX: 0.8, scaleY: 0.8 }, 400);
            Tween.to(this.addscreen, { scaleX: 1, scaleY: 1 }, 400, null, null, 400);

        }

        private addToScreen() {

            localStorage.setItem("isguideshowed", "1");
            Laya.stage.event(GFAddToScreenEvent);
            this.removeSelf();


        }

        private showGuideImageOnIos(url, showArrow: boolean) {
            this.loadImage(url, 0, 0, this.width, this.height, Handler.create(this, function () {
                if (showArrow) {
                    this.bottomArrow.skin = "comp/image_jiantou.png";
                    this.bottomArrow.pos(1103, 320);
                    Laya.timer.loop(1200, this, this.bottomArrowScale);
                    this.addChild(this.bottomArrow);
                }


                let btn_i_know = new Button();
                btn_i_know.skin = "comp/btn_tiaoguo.png";
                btn_i_know.stateNum = 1;
                btn_i_know.pos(30, 20);
                btn_i_know.on(laya.events.Event.CLICK, this, this.iKnowButonClick);
                this.addChild(btn_i_know);

            }));

        }

        private iKnowButonClick() {
           
            localStorage.setItem("isguideshowed", "1");
            if (Browser.onAndriod){
                Laya.stage.event(GFShowAddToScreenEvent);
                laya.utils.Browser.window.MtaH5.clickStat('clickflipandroidguidepage');
            }else if (Browser.onIOS){
                laya.utils.Browser.window.MtaH5.clickStat('clickflipiosguidepage');
            }
            this.removeSelf();

        }

         private bottomArrowScale(): void {
           
            Tween.to(this.bottomArrow, { scaleX: 0.8, scaleY: 0.8 }, 400);
            Tween.to(this.bottomArrow, { scaleX: 1, scaleY: 1 }, 400, null, null, 400);

        }


    }
}