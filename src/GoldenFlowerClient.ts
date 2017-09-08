import WebGL = laya.webgl.WebGL;
import Handler = laya.utils.Handler;
import Stage = laya.display.Stage;
import LoginView = view.GFLoginView;

// for production
const Version = "2.1.20";
const HOST = "interface.zjh8888.com";
const GAMEURL = "m.zjh8888.com";
const DEBUG = false;
const CHECK_VERSION = false;
const HWURL = 'http://web.51h5.com/sso.html?appid=oo224ike&force_login=1&ext='; 

//for alpha
// const Version = "2.1.0";
// const HOST = "interface.alpha.zjh8888.com"
// const GAMEURL = "m.alpha.zjh8888.com";
// const DEBUG = true;
// const CHECK_VERSION = false;
// const HWURL = 'http://dev.web.51h5.com/sso.html?appid=oo224ike&force_login=1&ext=';


function GFLog(message?: any, ...optionalParams: any[]) {
    if (DEBUG) {
        console.log(message, optionalParams);
    } else {
        //do noting
    }
}

class GameMain {

    static ISYK: boolean = false;
    private showUpdateView = false;
    private versioninfo;
    private  channelInfo;
    constructor() {
        if (laya.utils.Browser.onSafari) {
            laya.utils.Browser.window.applicationCache.update();
        }
        Laya.init(1136, 640, WebGL);
        if (DEBUG) {
            Laya.Stat.show(0, 0);
        }
        this.setup();
      
        Laya.stage.scaleMode = Stage.SCALE_EXACTFIT;
        Laya.stage.screenMode = Stage.SCREEN_HORIZONTAL;
        Laya.stage.fullScreenEnabled = true;
        if (window['WebSocket']) {
           
        } else {
            alert("感谢您关注我们的游戏，此浏览器不支持本游戏，请更换其他浏览器（如QQ浏览器）打开本游戏网址。");
        }
        this.onLoaded();
       

    }
    private setup() {
        let value1 = localStorage.getItem("hSliderValue1");
        let value2 = localStorage.getItem("hSliderValue2");
        if (value1) {
            laya.media.SoundManager.setSoundVolume(Number(value1) / 100.00);
        }
        if (value2) {
            laya.media.SoundManager.setMusicVolume(Number(value2) / 100.00);
        }

       

        //tudid configuration
        model.NetWorking.getTudid();
        //check source id
        model.NetWorking.getSourceID();
        //is app
        model.NetWorking.getISApp();
        //dist configuration
        model.NetWorking.getDistNumber();

        // 渠道相关
        this.channelInfo = new model.GFChannels();

        let dist = model.NetWorking.distNumber;
        if (model.GFConduitResourceManager.showLogin(dist)) {
            // if (view.NEWLOG) {
            //     LogInRes.push('comp/btn_denglu_kaishi.png')
            //     LogInRes.push('comp/btn_denglu_shouye.png')
            //     LogInRes.push('comp/btn_denglu_zhanghao.png')
            // } else {
                
            // }
            LogInRes.push(model.GFConduitResourceManager.getLoginByPhoneImage(dist));
            LogInRes.push(model.GFConduitResourceManager.getLoginTempImage(dist));
            LogInRes.push(model.GFConduitResourceManager.getLoginByQQImage(dist));
            LogInRes.push(model.GFConduitResourceManager.getLoginBackImage(dist));
        }
        HomePageRes.push(model.GFConduitResourceManager.getQuickStartIconImage(dist));
        LoadingRes[1] = model.GFConduitResourceManager.getLoadingIconImage(dist);
        laya.utils.Browser.window.document.title = model.GFConduitResourceManager.getTitle(dist);
    }
    private onLoaded() {
        view.GFHomePageView.connectSocket();
        let refer: string = laya.utils.Browser.window.document.referrer;
        let href: string = laya.utils.Browser.window.location.href;
        if (refer && refer.search('51h5.com') >= 0) {
            model.GFChannels.ISHOOWU = true;
            if (href.indexOf('hoowu') > 0) {

            }else {
                let ext = encodeURIComponent('hoowu=1');
                let url = HWURL + ext;
                laya.utils.Browser.window.location.href = url
            }
        } else {
            model.GFChannels.ISHOOWU = false;
        }



        GFLog('ishoowu:', model.GFChannels.ISHOOWU);

        if (href.indexOf("state=qq") > 0) {
            GFLog("login with qq");
            let code = view.GFHomePageView.getValueByNameFromUrl(href, 'code');
            let loginView = new view.GFLoginView();
            loginView.visible = false;
            Laya.stage.addChild(loginView);
            laya.utils.Browser.window.MtaH5.clickStat('showloginpage');
            this.loginPageFunnelModelstat();
            loginView.requsetData("1", code);
        } else if (href.indexOf('hoowu') > 0) {
            let code = view.GFHomePageView.getValueByNameFromUrl(href, 'code');
            let api = "user/login";
            let param = {
                    type: 4,
                    tpid: code
                };
            if (localStorage.getItem("tudid")) {
                param["tudid"] = localStorage.getItem("tudid");
            }
            model.getUrlRequestResponse(api, param, Handler.create(this, function (result: any) {
                this.loginModel = result;
                if (this.loginModel.errcode == 0) {
                    localStorage.setItem("urid", this.loginModel.user.urid);
                    model.UserModel = this.loginModel.user;
                    model.GFPlayer.myUrid = model.UserModel.urid;
                    loadRes(HomePageRes, Handler.create(this, function () {
                        let homeView = Laya.stage.getChildByName(view.GFHomePageView.name);
                        if (homeView) {
                            Laya.stage.event(GFRefreshUserInfo, model.UserModel);
                            playBgm();
                        } else {
                            let homePage = new view.GFHomePageView(this.loginModel);
                            homePage.name = view.GFHomePageView.name;
                            Laya.stage.addChild(homePage);
                            playBgm();
                        }
                    }))
                    let action = {
                        "action": 1,
                        "urid": model.UserModel.urid
                    }
                    view.GFHomePageView.socket.sendMsg(JSON.stringify(action));
                }
            }));
        } else {
            let api = "api/start";
            let platform = 0;
            if(Browser.onAndriod){
                platform = 2;
            }else if(Browser.onIOS){
                platform = 1;
            }
            model.GFChannels.setChannelRole();

            let param = { "v":Version,"platform": platform};
            model.getUrlRequestResponse(api, param, Handler.create(this, this.finishLoad));
        }

    }
    private finishLoad(result: any) {
        if (CHECK_VERSION && result.curv != Version){
            Laya.Browser.window.location.reload(true);
            return;
        }
        if(Browser.onAndriod){
            if(result.version){
                this.showUpdateView = true;
                this.versioninfo = result.version;
            }
        }
        if (result.udid) {
            localStorage.setItem("udid", result.udid);
        }

        if (localStorage.getItem("urid") && ! model.GFChannels.ISYOUTANLOGIN) {
            let api = "user/info";
            let param = {};
            model.getUrlRequestResponse(api, param, Handler.create(this, this.finishUserLoad));
        } else {
            if (model.GFConduitResourceManager.showLogin(model.NetWorking.distNumber)) {
                loadRes(LogInRes, Handler.create(this, function () {
                    let login = new LoginView();
                    login.name = LoginView.str;
                    Laya.stage.addChild(login);
                    if(this.showUpdateView){
                        let updatedialog = new view.GFUpdateView(this.versioninfo);
                        updatedialog.zOrder = 500;
                        login.addChild(updatedialog);
                    }
                    
                    laya.utils.Browser.window.MtaH5.clickStat('showloginpage');
                    this.loginPageFunnelModelstat();
                }));
            } else {
                
                loadRes(HomePageRes, Handler.create(this, function () {
                    let homePage = new view.GFHomePageView(undefined);
                        homePage.name = view.GFHomePageView.name;
                        Laya.stage.addChild(homePage);
                        if (this.showUpdateView) {
                            let updatedialog = new view.GFUpdateView(this.versioninfo);
                            updatedialog.zOrder = 500;
                            homePage.addChild(updatedialog);
                    }


                    playBgm();
                    this.channelInfo.channelDistLogin();

                }))
            }
            
        }
    }



    static YKLogin() {
        let api = "user/login";
        let param = { type: 0 };
        if (localStorage.getItem("tudid")) {
            param["tudid"] = localStorage.getItem("tudid");
        }
        model.getUrlRequestResponse(api, param, Handler.create(this, function (result: any) {
            this.loginModel = result;
            if (this.loginModel.errcode == 0) {
                GameMain.ISYK = true
                localStorage.setItem("urid", this.loginModel.user.urid);
                model.UserModel = this.loginModel.user;
                model.GFPlayer.myUrid = model.UserModel.urid;
                Laya.stage.event(GFRefreshUserInfo, model.UserModel);
                let action = {
                    "action": 1,
                    "urid": model.UserModel.urid
                }
                view.GFHomePageView.socket.sendMsg(JSON.stringify(action));
            }
        }));
    }

    private finishUserLoad(result: any) {
        if (!result.user) {
            localStorage.setItem("urid", "");
            localStorage.setItem("role", "0");
            new view.GFCenterMsgDialog("用户不存在，请刷新重新登陆");
        } else {
            if(result.user.role == 0 && !model.GFConduitResourceManager.showLogin(model.NetWorking.distNumber)) {
                GameMain.ISYK = true
            }
            model.UserModel = result.user;
            let action = {
                "action": 1,
                "urid": model.UserModel.urid
            }
            view.GFHomePageView.socket.sendMsg(JSON.stringify(action));
            model.GFPlayer.myUrid = model.UserModel.urid;
            loadRes(HomePageRes, Handler.create(this, function () {
                let homePage = new view.GFHomePageView(result);
                homePage.name = view.GFHomePageView.name;
                Laya.stage.addChild(homePage);
                if (this.showUpdateView) {
                    let updatedialog = new view.GFUpdateView(this.versioninfo);
                    updatedialog.zOrder = 500;
                    homePage.addChild(updatedialog);
                }
            }));
        }
    }


    private loginPageFunnelModelstat() {
        laya.utils.Browser.window.MtaH5.clickStat('quanxitongliuch', { 'showloginpage': 'true' });
        if (Browser.onIOS) {
            laya.utils.Browser.window.MtaH5.clickStat('ioszhuizong', { 'showloginpage': 'true' });
        } else if (Browser.onAndriod) {
            laya.utils.Browser.window.MtaH5.clickStat('anzhuoliuchengz', { 'showloginpage': 'true' });
        }
    }
}
new GameMain();