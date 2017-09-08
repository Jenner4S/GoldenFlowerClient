module view {
    import timer = laya.utils.Timer;
    export class GFGameMobileLoginView extends ui.GFGameMobileLoginViewUI {
        constructor() {
            super();
            this.btn_close.on(laya.events.Event.CLICK, this, this.removeSelf);
            this.btn_yanzheng.on(laya.events.Event.CLICK, this, this.yanzheng);
            this.btn_yanzheng.selected = false;
            this.btn_yanzheng.label = '获取验证码';
            this.btn_sureLogin.on(laya.events.Event.CLICK, this, this.sureLogin);
            this.text_mobile.maxChars = 11;
        }
        private yanzheng() {
         if (this.text_mobile.text.length == 0) {
                new GFCenterMsgDialog("请输入手机号");
                return;
            }
            if (this.text_mobile.text.substring(0, 1) != "1" ||this.text_mobile.text.length < 11) {
                new GFCenterMsgDialog("请输入正确的手机号");
                return;
            }
          
            if (this.text_mobile.text.length == 11) {
                if (this.btn_yanzheng.selected == false) {
                    this.btn_yanzheng.selected = true;
                    let api = "api/captcha";
                    let param = { "phone": this.text_mobile.text };
                    model.getUrlRequestResponse(api, param, Handler.create(this, function (result: any) {
                        this.setTimer();
                        new GFCenterMsgDialog(result.msg);
                    }));
                }
            }
        }
        private setTimer() {
            let time = 60;
            this.timer.loop(1000, this, function () {
                time = time - 1;
                if (time > 0) {
                    this.btn_yanzheng.label = '重新获取' + time + 's';
                } else {
                    this.btn_yanzheng.label = '获取验证码';
                    this.btn_yanzheng.selected = false;
                    this.timer.clearAll(this);
                }
            });
        }
        private sureLogin() {
              if (this.text_mobile.text.length == 0) {
                new GFCenterMsgDialog("请输入手机号");
                return;
            }
            if (this.text_mobile.text.substring(0, 1) != "1" ||this.text_mobile.text.length < 11) {
                new GFCenterMsgDialog("请输入正确的手机号");
                return;
            }
          
            if (this.text_yanzheng.text.length == 0) {
                new GFCenterMsgDialog("请输入验证码");
                return;
            }
            if (this.text_yanzheng.text.length > 0 && this.text_mobile.text.length == 11) {
                let api = "user/login";
                let param = {
                    "type": 3,
                    "tpid": this.text_mobile.text,
                    "captcha": this.text_yanzheng.text
                };
                model.getUrlRequestResponse(api, param, Handler.create(this, function (result: any) {
                    this.loginModel = result;
                    if (this.loginModel.errcode == 0) {
                        this.removeSelf();
                        localStorage.setItem("urid", this.loginModel.user.urid);
                        localStorage.setItem("role", this.loginModel.user.role);
                        model.UserModel = this.loginModel.user;
                        let action = {
                            "action": 1,
                            "urid": model.UserModel.urid
                        }
                        view.GFHomePageView.socket.sendMsg(JSON.stringify(action));
                        model.GFPlayer.myUrid = model.UserModel.urid;
                        loadRes(HomePageRes, Handler.create(this, function () {
                            let homeView = Laya.stage.getChildByName(GFHomePageView.name);
                            if (homeView) {
                                homeView.removeChildByName(GFLoginView.str);
                                Laya.stage.event(GFRefreshUserInfo, model.UserModel);
                                playBgm();
                            } else {
                                let homePage = new GFHomePageView(this.loginModel);
                                homePage.name = GFHomePageView.name;
                                Laya.stage.addChild(homePage);
                                playBgm();
                            }

                        }))
                    }
                }), true);
            }
        }
    }
}