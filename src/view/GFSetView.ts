module view {

    export class GFSetView extends ui.GFGameSetViewUI {
        // private hSlider1 = new laya.ui.HSlider();
        // private hSlider2 = new laya.ui.HSlider();
        private hSliderValue1: number;
        private hSliderValue2: number;
        constructor() {

            super();
            this.setup();
            this.size(736, 550)
            this.exitBtn.on(laya.events.Event.CLICK, this, this.exit);
            this.setCloseBtn.on(laya.events.Event.CLICK, this, this.close);
            // this.selectHiden.selected = !view.GFPostMessageView.showMessage;
            // this.selectHiden.on(laya.events.Event.CLICK, this, this.setHidden);

            this.exitBtn.visible = !GameMain.ISYK;
            if(model.GFChannels.isFromChannel()) {
                this.exitBtn.visible = false;
            }
        }
        private setup() {
            if (localStorage.getItem("hSliderValue1")) {
            } else {
                localStorage.setItem("hSliderValue1", "50")
            }
            if (localStorage.getItem("hSliderValue2")) {
            } else {
                localStorage.setItem("hSliderValue2", "50")
            }
            // if (localStorage.getItem("hiddenAd")) {
            // }else{
            //     localStorage.setItem("hiddenAd","0")
            // }
            // this.selectHiden.selected = Number(localStorage.getItem("hiddenAd"))?true:false;
            this.hSliderValue1 = Number(localStorage.getItem("hSliderValue1"));
            this.hSliderValue2 = Number(localStorage.getItem("hSliderValue2"));
            // this.hSlider1.bar.skin = "comp/bg_shezhitiao$bar.png";
            this.hSlider1.bar.stateNum = 2;
            this.hSlider1.bar.width = 23;
            this.hSlider1.bar.height = 33;
            // this.hSlider1.skin = "comp/bg_shezhitiao.png";
            this.hSlider1.showLabel = false;
            this.hSlider1.min = 0;
            this.hSlider1.max = 100;
            this.hSlider1.value = this.hSliderValue1;
            this.hSlider1.x = 260;
            this.hSlider1.y = 205;
            this.hSlider1.changeHandler = new Handler(this, this.onChange1);
            // this.hSlider2.bar.skin = "comp/bg_shezhitiao$bar.png";
            this.hSlider2.bar.stateNum = 2;
            this.hSlider2.bar.width = 23;
            this.hSlider2.bar.height = 33;
            // this.hSlider2.skin = "comp/bg_shezhitiao.png";
            this.hSlider2.showLabel = false;
            this.hSlider2.min = 0;
            this.hSlider2.max = 100;
            this.hSlider2.value = this.hSliderValue2;
            this.hSlider2.x = 260;
            this.hSlider2.y = 280;
            this.hSlider2.changeHandler = new Handler(this, this.onChange2);
            this.addChild(this.hSlider1);
            this.addChild(this.hSlider2);
        }
        private onChange1(value: number): void {
            localStorage.setItem("hSliderValue1", String(value));
            laya.media.SoundManager.setSoundVolume(value / 100.00);
        }
        private onChange2(value: number): void {
            localStorage.setItem("hSliderValue2", String(value));
            laya.media.SoundManager.setMusicVolume(value / 100.00);
        }
        // private setHidden() {
        //     this.selectHiden.selected = !this.selectHiden.selected;
        //     localStorage.setItem("hiddenAd",this.selectHiden.selected?"1":"0");
        //     view.GFPostMessageView.showMessage = !view.GFPostMessageView.showMessage;
        // }
        private exit() {
            let isShow: string = localStorage.getItem("selectRemindInfo");
            stopBgm();
             let app = localStorage.getItem("app"); 
            let action = {
                "action": 2,
                "urid": model.UserModel.urid
            }
            GFHomePageView.socket.sendMsg(JSON.stringify(action));
            if (laya.utils.Browser.onAndriod && !laya.utils.Browser.onWeiXin) {
                if (isShow == "1" || app == "1") {
                    localStorage.removeItem("urid");
                    localStorage.setItem("role", "0");
                    if (model.GFConduitResourceManager.showLogin(model.NetWorking.distNumber)) {
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

                } else {

                    let dialog = new view.GFGameCancelAccount();
                    dialog.popup();
                    this.close();

                }
            } else {
                localStorage.removeItem("urid");
                localStorage.setItem("role", "0");
                if (model.GFConduitResourceManager.showLogin(model.NetWorking.distNumber)) {
                    loadRes(LogInRes, Handler.create(this, function () {
                        this.close();
                        let loginView = Laya.stage.getChildByName(GFLoginView.str);
                        let homeView = Laya.stage.getChildByName(GFHomePageView.name);
                        if (loginView) {
                            homeView.addChild(loginView);
                        } else {
                            let login = new view.GFLoginView();
                            login.name = view.GFLoginView.str;
                            homeView.addChild(login);
                        }
                    }));
                } else {
                    this.close();
                    let api = "api/start";
                    let platform = 0;
                    if (Browser.onAndriod) {
                        platform = 2;
                    } else if (Browser.onIOS) {
                        platform = 1;
                    }
                    if (model.GFChannels.ISQUNHEi) {
                        localStorage.setItem("role", "5");
                    }

                    let param = { "v": Version, "platform": platform };

                    model.getUrlRequestResponse(api, param, Handler.create(this, function (result: any) {
                        if (result.errcode == "0") {
                            if (result.udid)
                                localStorage.setItem("udid", result.udid);

                            GameMain.YKLogin();
                        }
                    }));
                }
            }
        }
    }
}