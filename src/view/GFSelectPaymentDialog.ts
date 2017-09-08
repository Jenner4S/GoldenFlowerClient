/**
 * GFActsDialog 
 */
import Browser = laya.utils.Browser;
module view {
    export class GFSelectPaymentDialog extends ui.GFSelectPaymentDialogUI {
        private money: any;
        private diid: any;
        private currentType: any;
        private jsondata: any;

        constructor(parameters) {
            super();

            this.btn_pay_dialog_close.on(laya.events.Event.CLICK, this, this.onDialogClose);
            this.image_pay_zhifubao.on(laya.events.Event.CLICK, this, this.onPayZhiFuBao);
            this.image_pay_weixin.on(laya.events.Event.CLICK, this, this.onPayWeiXin);
            this.image_pay_yinlian.on(laya.events.Event.CLICK, this, this.onYinLian);

            if(Browser.onWeiXin){
                this.image_pay_weixin.visible = true;
            }else{
                this.image_pay_weixin.visible = false;
            }
        }

        public setMoneyAndDiamondId(money: any, diid: any): void {
            this.money = money;
            this.diid = diid;
        }

        private onPayZhiFuBao(): void {
            this.getDiamondOrder(3);
        }

        private onPayWeiXin(): void {
            //      this.getDiamondOrder(4);
            localStorage.setItem("weixinzhifumoney",this.money);
            localStorage.setItem("weixinzhifudiid",this.diid);

            let time:laya.utils.Timer = new laya.utils.Timer();
            //精确到秒
            localStorage.setItem("weixinzhifutime",time.currTimer/1000+"");

            this.getWeiXinAuthority();
        }

        private onYinLian(): void {
            this.getDiamondOrder(2);
        }

        private onDialogClose(): void {
            this.close();
        }

        private getWeiXinAuthority() {
            
            let url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx0c610e8428388f6f&redirect_uri=http://"+GAMEURL+"?ADTAG=" + model.NetWorking.distNumber.toString() +"&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect";
            window.location.href = url;
        }

        /**
         * 2-银联，3-支付宝，4-微信 
         */
        private getDiamondOrder(paytype: number): void {
            GFLog("paytype=" + paytype + " this.diid=" + this.diid + " this.money=" + this.money);

            this.currentType = paytype;
            let api = "diamond/order";
            let params = { diid: this.diid, paytype: paytype };
            model.getUrlRequestResponse(api, params, Handler.create(this, function (result: any) {
                GFLog(result.pay.payinfo);
                localStorage.removeItem("lastDoid");
                if (result.errcode == 0) { 
                    localStorage.setItem("lastDoid",result.doid);
                    GFLog("getDiamondOrder--lastDoid = "+result.doid);
                    
                    //获取url跳转
                    if (this.currentType == 2 || this.currentType == 3) {
                        window.location.href = result.pay.payinfo;
                    } else if (this.currentType == 4) {
                 //       this.callpay();
                    }
                    this.close();
                } else {
                    new GFCenterMsgDialog(result.msg);
                }

            }));
        }

        // //调用微信JS api 支付
        // private jsApiCall(): void {
        //     WeixinJSBridge.invoke(
        //         'getBrandWCPayRequest',
        //         this.jsondata,//json串
        //         function (res) {
        //             WeixinJSBridge.log(res.err_msg);
        //             new GFCenterMsgDialog(res.err_code + res.err_desc + res.err_msg);
        //         }
        //     );
        // }

        // private callpay() {
        //     var abc = new Object();
        //     if (typeof WeixinJSBridge == "undefined") {
        //         if (document.addEventListener) {
        //             document.addEventListener('WeixinJSBridgeReady', this.jsApiCall, false);
        //         }
        //         // else if (document.attachEvent) {
        //         //     document.attachEvent('WeixinJSBridgeReady', this.jsApiCall);
        //         //     document.attachEvent('onWeixinJSBridgeReady', this.jsApiCall);
        //         // }
        //         else {
        //             new GFCenterMsgDialog("对不起，暂不支持微信支付！");
        //         }
        //     }
        //     else {
        //         this.jsApiCall();
        //     }
        // }

    }
}