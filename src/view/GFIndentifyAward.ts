module view {
    import HttpRequest = laya.net.HttpRequest;
    import Event = laya.events.Event;
    import Button = laya.ui.Button;
    const inputMaxNum: number = 4;

    export class GFIndentifyAward extends ui.GFIndentifyAwardUI {
        //记录已经输入的字符 
        private inputcode: string = "";
        private continuousLoginInfo;
        protected numberButtonArray: Array<Button>;
        private showDisclaimer: number;
        constructor(parameters, showdisclaimer: number) {
            super();
            this.numberButtonArray = new Array<Button>();
            this.numberButtonArray.push(this.btn_key_0, this.btn_key_1, this.btn_key_2, this.btn_key_3, this.btn_key_4, this.btn_key_5, this.btn_key_6, this.btn_key_7, this.btn_key_8, this.btn_key_9)
            this.onBtnClick();
            if (parameters)
                this.showIndentifyInfo(parameters);

            this.getContinuousLoginData();
            this.showDisclaimer = showdisclaimer;

        }

        onBtnClick(): void {
            this.numberButtonArray.forEach((button, index) => {
                button.on(laya.events.Event.CLICK, this, this.onKeyBtnClick, [index]);
            });

            this.btn_delete_code.on(laya.events.Event.CLICK, this, this.onDeleteBtnClick);
            this.btn_submit.on(laya.events.Event.CLICK, this, this.onSubmitBtnClick);
        }

        private onKeyBtnClick(index: number): void {
            this.insertInputText(index.toString());

        }


        private onDeleteBtnClick(): void {
            let length: number = this.inputcode.length;

            if (length > 0) {
                let remainlenth: number = length - 1;
                if (remainlenth > 0) {
                    let num: string = this.inputcode.substr(0, length - 1);
                    this.inputcode = num;
                    this.label_input.text = " " + this.inputcode;
                } else {
                    this.resetInputText();
                }
            }

        }

        private onSubmitBtnClick(): void {
            if (this.inputcode.length == inputMaxNum) {
                this.btn_submit.disabled = true;
                this.commitIndentifyCode();
            } else {
                new GFCenterMsgDialog(" 请输入4位验证码");

            }

        }

        resetInputText(): void {
            this.inputcode = "";
            this.insertInputText(this.inputcode);
        }

        insertInputText(num: string): void {
            if (this.inputcode.length < inputMaxNum) {
                this.inputcode = this.inputcode + num;
                this.label_input.text = " " + this.inputcode;
            }

        }



        private showIndentifyInfo(codeinfo): void {
            this.label_coin_num.text = codeinfo.point;
            this.label_coin_end.x = this.label_coin_num.x + this.label_coin_num.width + 8;
            this.img_indentify_code.dataSource = codeinfo.imgurl;
        }



        private commitIndentifyCode(): void {
            let api = "user/captcha-commit";
            let params = { captcha: this.inputcode };
            model.getUrlRequestResponse(api, params, Handler.create(this, function (result: any) {
                GFLog(result);

                if (result.errcode == "0") {
                    //输入正确

                    let msg = "恭喜获得" + result.point + "金币";
                    new GFCenterMsgDialog(msg, Handler.create(this, function () {
                        if (this.showDisclaimer == 1) {
                            let disclaimerDialog = new GFDisClaimerDialog("");
                            disclaimerDialog.popup();
                        } else if (this.continuousLoginInfo) {
                            let dialog = new GFContinuousLogin(this.continuousLoginInfo);
                            dialog.popup();
                        }
                        this.close();
                    }));


                } else if (result.errcode == "1") {
                    let remaininputcount: number = result.count;
                    if (remaininputcount > 0) {
                        this.btn_submit.disabled = false;
                        this.label_input_num.text = result.msg;
                        this.resetInputText();
                    } else {
                        //弹气泡“result.msg”
                        new GFCenterMsgDialog(result.msg, Handler.create(this, function () {
                            if (this.showDisclaimer == 1) {
                                let disclaimerDialog = new GFDisClaimerDialog("");
                                disclaimerDialog.popup();
                            } else if (this.continuousLoginInfo) {
                                let dialog = new GFContinuousLogin(this.continuousLoginInfo);
                                dialog.popup();
                            }
                            this.close();
                        }));

                    }
                }

            }));

        }

        private getContinuousLoginData(): void {
            let api = "user/login-reward";

            model.getUrlRequestResponse(api, undefined, Handler.create(this, function (result: any) {
                GFLog(result);
                if (result.errcode == "0") {
                    this.continuousLoginInfo = result;
                }

            }));

        }


    }

}