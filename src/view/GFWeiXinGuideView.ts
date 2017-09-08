module view {
    import Sprite = Laya.Sprite;
    import Browser = laya.utils.Browser;
    import Image = laya.ui.Image;

    export class GFWeiXinGuideView extends Sprite {
        constructor() {
            super();
            this.size(796, 58);
            this.showWeixinGuideImage();
        }


        private showWeixinGuideImage() {
            this.loadImage("comp/bg_weixintishi.png", 0, 0, this.width, this.height, Handler.create(this, function () {
             let icon_close = new Image();
                icon_close.size(58, 58);
                icon_close.skin = "comp/icon_weixin_guanbi.png";
                icon_close.pos(738, 0);
                icon_close.on(laya.events.Event.CLICK, this, this.closeView);
                this.addChild(icon_close);
            }));

        }

        private closeView(){
            GFHomePageView.clickedWeixinClose = true;
            this.removeSelf();
        }

    }


}