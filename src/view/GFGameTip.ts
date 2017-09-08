/**
 * 擂台赛 - 给小费
 * @Author: Zhang chaochao
 * @since 2016-10-11 
 */
module view {

    export class GFGameTip extends ui.GFGameTipUI {
        private tip1: number;
        private tip2: number;
        private tip3: number;
        private tip4: number;

        constructor() {
            super();

            this.setClick();
            this.getTipList();
        }

        private setClick(): void {
            this.btn_close.on(laya.events.Event.CLICK, this, this.onBtnClose);
            this.btn_tip1.on(laya.events.Event.CLICK, this, this.onBtnTip1);
            this.btn_tip2.on(laya.events.Event.CLICK, this, this.onBtnTip2);
            this.btn_tip3.on(laya.events.Event.CLICK, this, this.onBtnTip3);
            this.btn_tip4.on(laya.events.Event.CLICK, this, this.onBtnTip4);
        }

        private getTipList(): void {
            let api = "arena/tip-list";
            model.getUrlRequestResponse(api, undefined, Handler.create(this, function (result: any) {
                GFLog("arena/tip-list    result = " + result);
                if (result.errcode == "0") {
                    this.label_1.text = result.list[0] + "万";
                    this.label_2.text = result.list[1] + "万";
                    this.label_3.text = result.list[2] + "万";
                    this.label_4.text = result.list[3] + "万";
                    this.label_tip.text = result.percentage;

                    this.tip1 = result.list[0];
                    this.tip2 = result.list[1];
                    this.tip3 = result.list[2];
                    this.tip4 = result.list[3];
                }
            }));
        }

        private onBtnClose(): void {
            this.close();
        }

        private onBtnTip1(): void {
            this.giveTip(this.tip1);
        }

        private onBtnTip2(): void {
            this.giveTip(this.tip2);
        }

        private onBtnTip3(): void {
            this.giveTip(this.tip3);
        }

        private onBtnTip4(): void {
            this.giveTip(this.tip4);
        }

        private giveTip(tip: number): void {
            let api = "arena/tip";
            model.getUrlRequestResponse(api, { point: tip }, Handler.create(this, function (result: any) {
                GFLog("arena/tip    result = " + result);
                if (result.errcode == "0") {
                    new GFCenterMsgDialog("给小费成功！");
                    this.close();
                } else {
                    new GFCenterMsgDialog(result.msg);
                }
            }));
        }
    }

}
