module view {
    export class GFGameCancelAccount extends ui.GFGameSetCancelAccountViewUI {
        public selectRemindInfo: boolean;
        private isAfterPay: boolean = false;
        constructor() {
            super();
            this.setup();
            this.selectRemindInfo = false;
            this.btn_close.on(laya.events.Event.CLICK, this, this.close);
            this.btn_seleteRemind.on(laya.events.Event.CLICK, this, this.selectRemind);
            this.btn_addScreen.on(laya.events.Event.CLICK, this, this.addScreen);
            this.btn_cancel.on(laya.events.Event.CLICK, this, this.cancelAccount);
        }
        private setup() {
            this.label_addScreen.wordWrap = true;
            this.label_addScreen.text = "建议您将本游戏添加到主屏幕以免找不到游戏。添加后可以直接从主屏幕进入游戏。";
        }

        public setIsAfterPay(isafterpay: boolean) {
            this.isAfterPay = isafterpay;
        }

        private selectRemind() {
            this.selectRemindInfo = !this.selectRemindInfo;
            this.btn_seleteRemind.selected = !this.btn_seleteRemind.selected;
            localStorage.setItem("selectRemindInfo", this.selectRemindInfo ? "1" : "0");
        }
        private addScreen() {
            let api = "more/add-icon";
            model.getUrlRequestResponse(api, undefined, Handler.create(this, function (result: any) {
                GFLog(result);
                if (result.errcode == "0") {
                    window.location.href = "com.zjh://app";//android app协议                       
                    window.location.href = result.url;
                    this.close();
                } else {
                    new GFCenterMsgDialog(result.msg);
                }

            }));

        }
        private cancelAccount() {
            if (this.isAfterPay) {
                this.close();
                return;
            }
            if (model.GFConduitResourceManager.showLogin(model.NetWorking.distNumber)) {
                localStorage.removeItem("urid");
                localStorage.setItem("role", "0");
                loadRes(LogInRes, Handler.create(this, function () {
                    this.close();

                    let loginView = Laya.stage.getChildByName(GFLoginView.str);
                    let homeView = Laya.stage.getChildByName(GFHomePageView.name);
                    if (loginView) {
                        GFLog("======!!!!!");
                        homeView.addChild(loginView);
                    } else {
                        let login = new view.GFLoginView();
                        login.name = view.GFLoginView.str;
                        homeView.addChild(login);
                    }
                }));
            } else {
                this.close();
                GameMain.YKLogin();

            }

        }
    }
}