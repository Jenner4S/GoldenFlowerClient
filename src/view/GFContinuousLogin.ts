module view {

    import GFDay = model.GFConinuousDays;
    import Image = Laya.Image;
    import Label = Laya.Label;
    enum DayState {
        willCollect = 0, //未领取的
        hasCollected, //已经领取
        currentCollect //当前要领取的   

    }


    export class GFContinuousLogin extends ui.GFContinuousLoginUI {
        private dayList: Array<GFDay>;
        private dayImageArray: Array<Image>;
        private dayLabelCoinArray: Array<Label>;
        constructor(parameters) {
            super();
            laya.utils.Browser.window.MtaH5.clickStat('continuousaward');
            this.continuousAwardFunnelModelstat();
            this.dayImageArray = new Array<Image>();
            this.dayLabelCoinArray = new Array<Label>();
            this.dayImageArray.push(this.img_1day, this.img_2day, this.img_3day, this.img_4day, this.img_5day);
            this.dayLabelCoinArray.push(this.label_coins_1day,this.label_coins_2day,this.label_coins_3day,this.label_coins_4day,this.label_coins_5day);
            this.onBtnClick();
            if (parameters) {
                this.dayList = parameters.reward_list;
                this.showDays();
                if(model.UserModel.vip > 0){
                    this.label_vip_award.x = 265;
                }else{
                     this.label_vip_award.x = 309;
                }   
                this.label_vip_award.text = parameters.tips;
            }


        }


        private continuousAwardFunnelModelstat() {
            laya.utils.Browser.window.MtaH5.clickStat('quanxitongliuch', { 'continuousaward': 'true' });
            if (Browser.onIOS) {
                laya.utils.Browser.window.MtaH5.clickStat('ioszhuizong', { 'continuousaward': 'true' });
            } else if (Browser.onAndriod) {
                laya.utils.Browser.window.MtaH5.clickStat('anzhuoliuchengz', { 'continuousaward': 'true' });
            }
        }

        onBtnClick(): void {
            this.btn_close.on(laya.events.Event.CLICK, this, this.onColseBtnClick);
            this.btn_get.on(laya.events.Event.CLICK, this, this.onGetBtnClick);


        }

        private onColseBtnClick(): void {
            laya.utils.Browser.window.MtaH5.clickStat('closecontinuoiusaward');
            this.close();

        }

        private onGetBtnClick(): void {
             laya.utils.Browser.window.MtaH5.clickStat('takecontinuousaward');
            this.getLoginAward();

        }


        private showDays(): void {
            if (this.dayList && this.dayList.length > 0) {
                if (this.dayList.length >= 5) {
                    this.dayList = this.dayList.filter((day, index) => {
                        return index < 5;
                    });
                }

                this.dayList.forEach((day,index) => {
                    this.showDayByState(day,index);
                });
               
            }
        }

        private showDayByState(day: GFDay,index:number): void {
            let state: number = day.get;
            let img_day = this.dayImageArray[index];
            let label_coins_day = this.dayLabelCoinArray[index];
            index += 1;
            if (DayState.hasCollected == state) {
                img_day.skin = "comp/image_liangdeng"+index+"_ok.png";
            } else if (DayState.currentCollect == state) {
                img_day.skin = "comp/image_liangdeng"+index+"_ing.png";
            } else {
                img_day.skin = "comp/image_liangdeng"+index+".png";
            }

            GFLog(img_day.skin);
            label_coins_day.text = day.point + "×" + day.multiple;
        }


        private getLoginAward(): void {
            let api = "user/reward-commit";

            model.getUrlRequestResponse(api, undefined, Handler.create(this, function (result: any) {
                GFLog(result);
                if (result.errcode == "0") {
                    let msg = "领取登录奖励" + result.point + "金币";
                    new GFGivingPointCenterMsgDialog(msg, Handler.create(this, function () {
                        this.close();
                    }));


                } else if (result.errcode == "1") {
                    new GFCenterMsgDialog(result.msg, Handler.create(this, function () {
                        this.close();
                    }));
                }

            }));
        }

    }

}