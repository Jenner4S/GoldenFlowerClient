/**
 * ChargeDiamondDialog 
 */

module view {
    /**
 * displayType为 0--充值钻石，1--兑换金币
 */
    import Event = laya.events.Event;
    import HttpRequest = laya.net.HttpRequest;


    export class ChargeDiamondDialog extends ui.ChargeDiamondDialogUI {
        private displayType: number = 0;
        private diamondCoinData;
        constructor(parameters) {
            super();

            this.btn_charge_close.on(laya.events.Event.CLICK, this, this.onDialogClose);

            /**
             * 充值钻石
             */
            this.btn_charge_diamond.on(laya.events.Event.CLICK, this, this.onChargeDiamond);
            /**
             * 兑换金币
             */
            this.btn_change_coin.on(laya.events.Event.CLICK, this, this.onChargeCoin);

            /**
             * 点击充值钻石的6个item事件响应
             */
            this.pannel_diamond_1.on(laya.events.Event.CLICK, this, this.onPannelDiamond1);
            this.pannel_diamond_2.on(laya.events.Event.CLICK, this, this.onPannelDiamond2);
            this.pannel_diamond_3.on(laya.events.Event.CLICK, this, this.onPannelDiamond3);
            this.pannel_diamond_4.on(laya.events.Event.CLICK, this, this.onPannelDiamond4);
            this.pannel_diamond_5.on(laya.events.Event.CLICK, this, this.onPannelDiamond5);
            this.pannel_diamond_6.on(laya.events.Event.CLICK, this, this.onPannelDiamond6);

            /**
             * 点击兑换金币的6个item事件响应
             */
            this.pannel_coin_1.on(laya.events.Event.CLICK, this, this.onPannelCoin1);
            this.pannel_coin_2.on(laya.events.Event.CLICK, this, this.onPannelCoin2);
            this.pannel_coin_3.on(laya.events.Event.CLICK, this, this.onPannelCoin3);
            this.pannel_coin_4.on(laya.events.Event.CLICK, this, this.onPannelCoin4);
            this.pannel_coin_5.on(laya.events.Event.CLICK, this, this.onPannelCoin5);
            this.pannel_coin_6.on(laya.events.Event.CLICK, this, this.onPannelCoin6);

            Laya.stage.on("pay_finish_message", this, function () {
                this.getDiamondListAndShowContent();
                view.changeUserToVip();

            });

        }
        /**
         * dtype : 0--充值钻石 , 1--兑换金币
         */
        public setTypeAndShowContent(dtype: number = 0): void {
            this.displayType = dtype;
            this.showContent();
        }

        public showContent(): void {
            if (!GFHomePageView.diamondList) {
                return;
            }

            if (this.displayType == 0) {//充值钻石
                this.btn_charge_diamond.selected = true;
                this.btn_change_coin.selected = false;
                this.pannel_coin_1.visible = false;
                this.pannel_coin_2.visible = false;
                this.pannel_coin_3.visible = false;
                this.pannel_coin_4.visible = false;
                this.pannel_coin_5.visible = false;
                this.pannel_coin_6.visible = false;

                this.label_charge_level.text = GFHomePageView.diamondList.diamond + "";

                if (GFHomePageView.diamondList.tips) {
                    this.label_charge_message.text = GFHomePageView.diamondList.tips;
                }

                if (GFHomePageView.diamondList.recharge_list && GFHomePageView.diamondList.recharge_list[0]) {
                    this.pannel_diamond_1.visible = true;
                    this.label_diamond_t1.text = GFHomePageView.diamondList.recharge_list[0].diamond + "钻石";
                    this.label_diamond_b1.text = GFHomePageView.diamondList.recharge_list[0].price + "元";
                    let gif1: number = GFHomePageView.diamondList.recharge_list[0].give_rate * 100;
                    if (gif1 > 0) {
                        this.label_diamond_gif_1.text = "赠送" + gif1 + "%";
                        this.image_diamond_gif_1.visible = true;
                    } else {
                        this.image_diamond_gif_1.visible = false;
                    }
                } else {
                    this.pannel_diamond_1.visible = false;
                }

                if (GFHomePageView.diamondList.recharge_list && GFHomePageView.diamondList.recharge_list[1]) {
                    this.pannel_diamond_2.visible = true;
                    this.label_diamond_t2.text = GFHomePageView.diamondList.recharge_list[1].diamond + "钻石";
                    this.label_diamond_b2.text = GFHomePageView.diamondList.recharge_list[1].price + "元";
                    let gif2: number = GFHomePageView.diamondList.recharge_list[1].give_rate * 100;
                    if (gif2 > 0) {
                        this.label_diamond_gif_2.text = "赠送" + gif2 + "%";
                        this.image_diamond_gif_2.visible = true;
                    } else {
                        this.image_diamond_gif_2.visible = false;
                    }
                } else {
                    this.pannel_diamond_2.visible = false;
                }

                if (GFHomePageView.diamondList.recharge_list && GFHomePageView.diamondList.recharge_list[2]) {
                    this.pannel_diamond_3.visible = true;
                    this.label_diamond_t3.text = GFHomePageView.diamondList.recharge_list[2].diamond + "钻石";
                    this.label_diamond_b3.text = GFHomePageView.diamondList.recharge_list[2].price + "元";
                    let gif3: number = GFHomePageView.diamondList.recharge_list[2].give_rate * 100;
                    if (gif3 > 0) {
                        this.label_diamond_gif_3.text = "赠送" + gif3 + "%";
                        this.image_diamond_gif_3.visible = true;
                    } else {
                        this.image_diamond_gif_3.visible = false;
                    }
                } else {
                    this.pannel_diamond_3.visible = false;
                }



                if (GFHomePageView.diamondList.recharge_list && GFHomePageView.diamondList.recharge_list[3]) {
                    this.pannel_diamond_4.visible = true;
                    this.label_diamond_t4.text = GFHomePageView.diamondList.recharge_list[3].diamond + "钻石";
                    this.label_diamond_b4.text = GFHomePageView.diamondList.recharge_list[3].price + "元";
                    let gif4: number = GFHomePageView.diamondList.recharge_list[3].give_rate * 100;
                    if (gif4 > 0) {
                        this.label_diamond_gif_4.text = "赠送" + gif4 + "%";
                        this.image_diamond_gif_4.visible = true;
                    } else {
                        this.image_diamond_gif_4.visible = false;
                    }
                } else {
                    this.pannel_diamond_4.visible = false;
                }

                if (GFHomePageView.diamondList.recharge_list && GFHomePageView.diamondList.recharge_list[4]) {
                    this.pannel_diamond_5.visible = true;
                    this.label_diamond_t5.text = GFHomePageView.diamondList.recharge_list[4].diamond + "钻石";
                    this.label_diamond_b5.text = GFHomePageView.diamondList.recharge_list[4].price + "元";
                    let gif5: number = GFHomePageView.diamondList.recharge_list[4].give_rate * 100;
                    if (gif5 > 0) {
                        this.label_diamond_gif_5.text = "赠送" + gif5 + "%";
                        this.image_diamond_gif_5.visible = true;
                    } else {
                        this.image_diamond_gif_5.visible = false;
                    }
                } else {
                    this.pannel_diamond_5.visible = false;
                }

                if (GFHomePageView.diamondList.recharge_list && GFHomePageView.diamondList.recharge_list[5]) {
                    this.pannel_diamond_6.visible = true;
                    this.label_diamond_t6.text = GFHomePageView.diamondList.recharge_list[5].diamond + "钻石";
                    this.label_diamond_b6.text = GFHomePageView.diamondList.recharge_list[5].price + "元";
                    let gif6: number = GFHomePageView.diamondList.recharge_list[5].give_rate * 100;
                    if (gif6 > 0) {
                        this.label_diamond_gif_6.text = "赠送" + gif6 + "%";
                        this.image_diamond_gif_6.visible = true;
                    } else {
                        this.image_diamond_gif_6.visible = false;
                    }
                } else {
                    this.pannel_diamond_6.visible = false;
                }

            } else {//兑换金币
                this.btn_charge_diamond.selected = false;
                this.btn_change_coin.selected = true;
                this.pannel_diamond_1.visible = false;
                this.pannel_diamond_2.visible = false;
                this.pannel_diamond_3.visible = false;
                this.pannel_diamond_4.visible = false;
                this.pannel_diamond_5.visible = false;
                this.pannel_diamond_6.visible = false;

                this.label_charge_level.text = GFHomePageView.diamondList.diamond + "";

                this.label_charge_message.text = "";

                if (GFHomePageView.diamondList.exchange_list && GFHomePageView.diamondList.exchange_list[0]) {
                    this.pannel_coin_1.visible = true;
                    this.label_coin_t1.text = GFHomePageView.diamondList.exchange_list[0].point + "万金币";
                    this.label_coin_b1.text = GFHomePageView.diamondList.exchange_list[0].diamond;
                    let bonus1: number = GFHomePageView.diamondList.exchange_list[0].bonus;
                    if (bonus1 > 0) {
                        this.label_coin_gif_1.text = "赠送" + bonus1 + "万";;
                        this.image_coin_gif_1.visible = true;
                    } else {
                        this.image_coin_gif_1.visible = false;
                    }
                } else {
                    this.pannel_coin_1.visible = false;
                }

                if (GFHomePageView.diamondList.exchange_list && GFHomePageView.diamondList.exchange_list[1]) {
                    this.pannel_coin_2.visible = true;
                    this.label_coin_t2.text = GFHomePageView.diamondList.exchange_list[1].point + "万金币";
                    this.label_coin_b2.text = GFHomePageView.diamondList.exchange_list[1].diamond;
                    let bonus2: number = GFHomePageView.diamondList.exchange_list[1].bonus;
                    if (bonus2 > 0) {
                        this.label_coin_gif_2.text = "赠送" + bonus2 + "万";;
                        this.image_coin_gif_2.visible = true;
                    } else {
                        this.image_coin_gif_2.visible = false;
                    }
                } else {
                    this.pannel_coin_2.visible = false;
                }

                if (GFHomePageView.diamondList.exchange_list && GFHomePageView.diamondList.exchange_list[2]) {
                    this.pannel_coin_3.visible = true;
                    this.label_coin_t3.text = GFHomePageView.diamondList.exchange_list[2].point + "万金币";
                    this.label_coin_b3.text = GFHomePageView.diamondList.exchange_list[2].diamond;
                    let bonus3: number = GFHomePageView.diamondList.exchange_list[2].bonus;
                    if (bonus3 > 0) {
                        this.label_coin_gif_3.text = "赠送" + bonus3 + "万";;
                        this.image_coin_gif_3.visible = true;
                    } else {
                        this.image_coin_gif_3.visible = false;
                    }
                } else {
                    this.pannel_coin_3.visible = false;
                }


                if (GFHomePageView.diamondList.exchange_list && GFHomePageView.diamondList.exchange_list[3]) {
                    this.pannel_coin_4.visible = true;
                    this.label_coin_t4.text = GFHomePageView.diamondList.exchange_list[3].point + "万金币";
                    this.label_coin_b4.text = GFHomePageView.diamondList.exchange_list[3].diamond;
                    let bonus4: number = GFHomePageView.diamondList.exchange_list[3].bonus;
                    if (bonus4 > 0) {
                        this.label_coin_gif_4.text = "赠送" + bonus4 + "万";;
                        this.image_coin_gif_4.visible = true;
                    } else {
                        this.image_coin_gif_4.visible = false;
                    }
                } else {
                    this.pannel_coin_4.visible = false;
                }


                if (GFHomePageView.diamondList.exchange_list && GFHomePageView.diamondList.exchange_list[4]) {
                    this.pannel_coin_5.visible = true;
                    this.label_coin_t5.text = GFHomePageView.diamondList.exchange_list[4].point + "万金币";
                    this.label_coin_b5.text = GFHomePageView.diamondList.exchange_list[4].diamond;
                    let bonus5: number = GFHomePageView.diamondList.exchange_list[4].bonus;
                    if (bonus5 > 0) {
                        this.label_coin_gif_5.text = "赠送" + bonus5 + "万";;
                        this.image_coin_gif_5.visible = true;
                    } else {
                        this.image_coin_gif_5.visible = false;
                    }
                } else {
                    this.pannel_coin_5.visible = false;
                }


                if (GFHomePageView.diamondList.exchange_list && GFHomePageView.diamondList.exchange_list[5]) {
                    this.pannel_coin_6.visible = true;
                    this.label_coin_t6.text = GFHomePageView.diamondList.exchange_list[5].point + "万金币";
                    this.label_coin_b6.text = GFHomePageView.diamondList.exchange_list[5].diamond;
                    let bonus6: number = GFHomePageView.diamondList.exchange_list[5].bonus;
                    if (bonus6 > 0) {
                        this.label_coin_gif_6.text = "赠送" + bonus6 + "万";;
                        this.image_coin_gif_6.visible = true;
                    } else {
                        this.image_coin_gif_6.visible = false;
                    }
                } else {
                    this.pannel_coin_6.visible = false;
                }

            }

        }


        private onDialogClose(): void {
            this.close();
        }

        private onChargeDiamond(): void {
            this.displayType = 0;
            this.showContent();
        }

        private onChargeCoin(): void {
            this.displayType = 1;
            this.showContent();
        }



        /**
         * 点击充值钻石的6个item事件响应
         */
        private onPannelDiamond1(): void {
            this.selectPayment(0);
        }

        private onPannelDiamond2(): void {
            this.selectPayment(1);
        }

        private onPannelDiamond3(): void {
            this.selectPayment(2);
        }

        private onPannelDiamond4(): void {
            this.selectPayment(3);
        }

        private onPannelDiamond5(): void {
            this.selectPayment(4);
        }

        private onPannelDiamond6(): void {
            this.selectPayment(5);
        }

        private selectPayment(index: number): void {
            if (GFHomePageView.diamondList.recharge_list && GFHomePageView.diamondList.recharge_list[index]) {
              let diid =  GFHomePageView.diamondList.recharge_list[index].diid;
            if(model.GFChannels.channelPay(diid)){
                return;
            }

                if (model.UserModel.role == 0) {
                    let loginView = new GFAccountLogin(undefined);
                    loginView.pos(-156, -21);
                    this.addChild(loginView);
                } else {
                    let dialog = new GFSelectPaymentDialog(GFHomePageView.diamondList.recharge_list[index].diid);
                    dialog.setMoneyAndDiamondId(GFHomePageView.diamondList.recharge_list[index].price, GFHomePageView.diamondList.recharge_list[index].diid);
                    dialog.popup();
                }

            } else {
                new GFCenterMsgDialog("网络服务异常！");
            }
        }


        private LayaPayCallback(callback){
            if(callback){
                if("0" == callback.result){

                }else{
                    new GFCenterMsgDialog(callback.desc);
                }
            }
        }

        /**
         * 点击兑换金币的6个item事件响应
         */

        private onPannelCoin1(): void {
            this.ChangeToCoin(0);
        }

        private onPannelCoin2(): void {
            this.ChangeToCoin(1);
        }

        private onPannelCoin3(): void {
            this.ChangeToCoin(2);
        }

        private onPannelCoin4(): void {
            this.ChangeToCoin(3);
        }

        private onPannelCoin5(): void {
            this.ChangeToCoin(4);
        }

        private onPannelCoin6(): void {
            this.ChangeToCoin(5);
        }

        private ChangeToCoin(index: number): void {
            if (GFHomePageView.diamondList.exchange_list && GFHomePageView.diamondList.exchange_list[index]) {
                if (model.UserModel.role == 0) {
                    let loginView = new GFAccountLogin(undefined);
                    loginView.pos(-156, -21);
                    this.addChild(loginView);
                } else {
                    let yournum: number = Number(GFHomePageView.diamondList.diamond);
                    let neednum: number = Number(GFHomePageView.diamondList.exchange_list[index].diamond);

                    GFLog("yournum=" + yournum + " neednum=" + neednum);

                    if (yournum < neednum) {
                        new GFCenterMsgDialog("兑换金币钻石不足，请先充值钻石！");

                    } else {
                        let msg: string = GFHomePageView.diamondList.exchange_list[index].diamond + "钻石兑换" + GFHomePageView.diamondList.exchange_list[index].point + "万金币";
                        let dialog = new view.GFAlmsDialog(msg, 0, true);
                        dialog.certain = Handler.create(this, function () {
                            this.pointExchange(GFHomePageView.diamondList.exchange_list[index].poid);
                        })
                        dialog.show();
                    }
                }

            } else {
                new GFCenterMsgDialog("网络服务异常！");
            }
        }

        private pointExchange(poid: any): void {
            let api = "point/exchange";
            let params = { "poid": poid };

            model.getUrlRequestResponse(api, params, Handler.create(this, function (result: any) {
                GFLog(result);
                new GFCenterMsgDialog(result.msg);
                if (result.errcode == 0) {
                    this.getDiamondListAndShowContent();
                }
            }));

        }

        /**
    * 金币列表 
    */
        private getDiamondListAndShowContent(): void {
            let api = "diamond/list";
            model.getUrlRequestResponse(api, undefined, Handler.create(this, function (result: any) {
                GFLog(result);
                if (result.errcode == 0) {
                    GFHomePageView.diamondList = result;
                    this.showContent();
                }
            }));
        }

    }
}