module view {
    /**
    * name
    */
    export class GFDisClaimerDialog extends ui.GFDisclaimerDialogUI {
        constructor(parameters) {
            super();
            this.btn_confirm.on(laya.events.Event.CLICK, this, this.onConfirmBtnClick);
        }

        private onConfirmBtnClick(): void {
            this.getContinuousLoginData();

        }

        private getContinuousLoginData(): void {
            let api = "user/login-reward";
    


            model.getUrlRequestResponse(api, undefined, Handler.create(this, function (result: any) {
                GFLog(result);
                this.close();
                if (result.errcode == "0") {
                    let dialog = new GFContinuousLogin(result);
                    dialog.popup();

                }

            }));

        }


    }
}