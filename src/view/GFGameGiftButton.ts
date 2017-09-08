module view {
    import Button = laya.ui.Button;
    import Sprite = laya.display.Sprite;
    import Tween = laya.utils.Tween;
    import TimeLine = laya.utils.TimeLine;
    import Timer = laya.utils.Timer;
    export class GFGiftButton extends Button {
        private giftText : Label = new Label();
        private giftObj = {time : 0 , orid : 0 , point : 0};
        private timeLine : TimeLine = new TimeLine();
        private scaleTimer : Timer = new Timer();
        private canAnimating : boolean = false;
        constructor() {
            super();
            this.configUI();
            this.requestGift();
        }
        private configUI() {
            this.on(laya.events.Event.CLICK , this , this.onGiftAction);
            this.size(82 , 82);
            this.skin = "comp/btn_liwu.png";
            this.stateNum = 1;
            this.pivot(41 , 41);
        }
        private onGiftAction() {
            if (this.giftObj.time > 0) {
                let time = this.giftObj.time;
                let word = '';
                if (time < 60) {
                    word = time + '秒';
                }else if(time % 60 == 0){
                    word = time / 60 + '分钟';
                }else {
                    word = Math.floor(time / 60) + 1 + '分钟';
                }
                new GFCenterMsgDialog("再等待" + word + '，领取' + this.giftObj.point + '金币')
            }else {
                model.getUrlRequestResponse("online/achieve" , {orid : this.giftObj.orid} , Handler.create(this , function(result : any) {
                    if (result.errcode == 0) {
                        new GFCenterMsgDialog('领取在线奖励' + this.giftObj.point + '金币');
                        this.stopAnimating();
                        this.freshGiftObj(result);
                        if (this.giftObj.time == undefined) {
                            this.visible = false;
                        }
                        if (this.giftObj.time < 0) {
                            this.visible = false;
                        } else {
                            this.giftText.visible = this.giftObj.time > 0;
                        }
                        this.freshGift(this.giftObj.time);
                    }
                }));
            }
        }
        private freshGiftObj(result : any) {
            this.giftObj.time = result.time;
            this.giftObj.point = result.point;
            this.giftObj.orid = result.orid;
        }
        private requestGift(time : number = 1000) {
            model.getUrlRequestResponse("online/reward" , null , Handler.create(this , function(result : any) {
                GFLog(result);
                if (result.errcode == 0) {
                    this.freshGiftObj(result);
                    if (this.giftObj.time < 0) {
                        this.visible = false;
                    }else {
                        this.addChild(this.giftText);
                        this.giftText.centerX = 0;
                        this.giftText.top = 86;
                        this.giftText.fontSize = 20;
                        this.giftText.color = model.getColorWithNumber(3);
                        this.giftText.align = "center";
                        this.giftText.width = 100;
                        this.giftText.visible = this.giftObj.time > 0;
                    }
                    this.freshGift(this.giftObj.time);
                }             
            }));
        }
        private freshGift(time : number) {
            if (time < 0) {
                this.visible = false;
                return ;
            }else {
                this.visible = true;
            }
            if (time > 0) {
                this.showTime(time);
                this.timer.loop(1000 , this , function() {
                    time = time - 1;
                    this.giftObj.time = time;                   
                    if (time <= 0) {
                        this.timer.clearAll(this);
                        this.freshGift(time);
                        this.startAnimating();
                    }else {
                        this.showTime(time);
                    }
                }); 
            }else {
                this.startAnimating();
                this.giftText.text = "";
            }
        }
        private startAnimating() {
            // this.canAnimating = true;
            this.scaleTimer.loop(1000 , this , this.animating);
        }
        private animating() {
            this.timeLine.to(this, { scaleX: 0.9, scaleY: 0.9 }, 500).to(this, { scaleX: 1, scaleY: 1 }, 500);
            this.timeLine.play();
        }
        private stopAnimating() {
            this.timeLine.pause();
            this.scaleTimer.clear(this , this.animating);
            // this.canAnimating = false;
        }
        private showTime(time : number) {
            let LM = 0;
            let RM = 0;
            let LS = 0;
            let RS = 0;
            let seconds = time % 60;
            RS = seconds % 10;
            LS = (seconds - RS) / 10;
            let minites = (time - seconds) / 60;
            RM = minites % 10;
            LM = (minites - RM) / 10;
            this.giftText.text = '' + LM + RM + ':' + LS + RS;
        }
    }
}