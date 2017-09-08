module view {
    /**
     * ZjhLoginView 
     */
    import Browser = laya.utils.Browser;
    export class GFLoginView extends ui.GFGameIndexUI {
        static str: string = "loginView";
        private type: number;
        private loginModel: any;
        constructor() {
            super();
            GFLog('old login view')
            this.YKLogin.on(laya.events.Event.CLICK, this, this.onBtnYKLogin);
            this.MobileLogin.on(laya.events.Event.CLICK, this, this.onBtnMobileLogin);
            // this.showGuidePage();
            // this.showWeinxinGuideOnAndroid();
            laya.utils.Browser.window.MtaH5.clickStat('loginpage');
            this.loginFunnelModelstat();
            this.QQLogin.on(laya.events.Event.CLICK, this, this.onBtnQQLogin);
            this.backImage.skin = model.GFConduitResourceManager.getLoginBackImage(model.NetWorking.distNumber);
            this.MobileLogin.skin = model.GFConduitResourceManager.getLoginByPhoneImage(model.NetWorking.distNumber);
            this.YKLogin.skin = model.GFConduitResourceManager.getLoginTempImage(model.NetWorking.distNumber);
            this.QQLogin.skin = model.GFConduitResourceManager.getLoginByQQImage(model.NetWorking.distNumber);

            if (model.NetWorking.distNumber >= 30 && model.NetWorking.distNumber <= 99) {
                this.MobileLogin.visible = false;
                this.YKLogin.visible = false;
            }
            if (model.NetWorking.distNumber >= 100 && model.NetWorking.distNumber <= 150) {
                this.QQLogin.visible = false;
                this.YKLogin.visible = false;
            }
        }

        private loginFunnelModelstat() {
            laya.utils.Browser.window.MtaH5.clickStat('quanxitongliuch', { 'loginpage': 'true' });
            if (Browser.onIOS) {
                laya.utils.Browser.window.MtaH5.clickStat('ioszhuizong', { 'loginpage': 'true' });
            } else if (Browser.onAndriod) {
                laya.utils.Browser.window.MtaH5.clickStat('anzhuoliuchengz', { 'loginpage': 'true' });
            }
        }


        private showGuidePage() {
            if (Browser.onIOS) {
                let showguide = localStorage.getItem("isguideshowed");
                if (showguide == "1") {

                } else {
                    let guideview = new GFGuideView();
                    laya.utils.Browser.window.MtaH5.clickStat('iosguidepage');
                    this.addChild(guideview);
                }

            }

        }

        private showWeinxinGuideOnAndroid() {
            if (Browser.onAndriod) {
                if (Browser.onWeiXin) {
                    if (GFHomePageView.clickedWeixinClose) {

                    } else {
                        let guideview = new GFWeiXinGuideView();
                        this.addChild(guideview);
                    }
                }


            }
        }

        private onBtnYKLogin(): void {
            this.requsetData("0");

            laya.utils.Browser.window.MtaH5.clickStat('clickcustom');
        }


        private onBtnMobileLogin(): void {
            laya.utils.Browser.window.MtaH5.clickStat('clickmobile');

            let diolag = new view.GFGameMobileLoginView();
            this.addChild(diolag);
        }
        private onBtnQQLogin(): void {
            laya.utils.Browser.window.MtaH5.clickStat('clickqqlogin');
            let display: string;
            if (Browser.onMobile) {
                display = "mobile";
            } else {
                display = "default";
            }
            if (model.NetWorking.tudid) {
                let href = "https://graph.qq.com/oauth2.0/authorize?which=ConfirmPage&display=" + display + "&client_id=101353227&response_type=code&redirect_uri=http://" + GAMEURL + "?ADTAG=" + model.NetWorking.distNumber.toString() + "&from=qq&state=qq" + "&tudid=" + model.NetWorking.tudid.toString();
                laya.utils.Browser.window.location.href = encodeURI(href)
            } else {
                let href = "https://graph.qq.com/oauth2.0/authorize?which=ConfirmPage&display=" + display + "&client_id=101353227&response_type=code&redirect_uri=http://" + GAMEURL + "?ADTAG=" + model.NetWorking.distNumber.toString() + "&from=qq&state=qq";
                laya.utils.Browser.window.location.href = encodeURI(href)
            }
        }
        public requsetData(type, code?: string) {
            let api = "user/login";
            let param = {};
            this.type = type;
            if (code) {
                param = {
                    type: type,
                    tpid: code
                };
            } else {
                param = {
                    type: type
                };
            }
            if (localStorage.getItem("tudid")) {
                param["tudid"] = localStorage.getItem("tudid");
            }
            if (localStorage.getItem("dist") && type == "1") {//QQLogin
                model.NetWorking.distNumber = Number(localStorage.getItem("dist"));
            }
            model.getUrlRequestResponse(api, param, Handler.create(this, this.finishLoad));
        }
        private finishLoad(result: any) {

            this.loginModel = result;
            if (this.loginModel.errcode == 0) {
                localStorage.setItem("urid", this.loginModel.user.urid);
                localStorage.setItem("role", this.loginModel.user.role);
                model.UserModel = this.loginModel.user;
                model.GFPlayer.myUrid = model.UserModel.urid;
                let action = {
                    "action": 1,
                    "urid": model.UserModel.urid
                }
                view.GFHomePageView.socket.sendMsg(JSON.stringify(action));
                if (this.type == 1) {
                    let href: string = "http://" + GAMEURL + "/?";
                    if (localStorage.getItem("dist")) {
                        href = href + "ADTAG=" + localStorage.getItem("dist");
                    }
                    if (localStorage.getItem("tudid")) {
                        href = href + "&tudid=" + localStorage.getItem("tudid");
                    }
                    laya.utils.Browser.window.location.href = href;
                } else {
                    loadRes(HomePageRes, Handler.create(this, function () {
                        let homeView = Laya.stage.getChildByName(GFHomePageView.name);
                        if (homeView) {
                            Laya.stage.event(GFRefreshUserInfo, model.UserModel);
                            homeView.removeChildByName(GFLoginView.str);
                            playBgm();
                        } else {
                            let homePage = new GFHomePageView(this.loginModel);
                            homePage.name = GFHomePageView.name;
                            Laya.stage.addChild(homePage);
                            playBgm();
                        }
                    }))
                }
            }
        }
    }
}