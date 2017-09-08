    const GFCloseAccountLogin = "GFCloseAccountLogin";
    module view{
    import GFColorFacotry = model.getColorWithNumber;
    export class GFAccountLogin extends ui.GFAccountLoginUI{
   
        constructor(parameters) {
            super();
            this.initUI();
            this.onButtonClick();
            Laya.stage.on(GFCloseAccountLogin,this,this.removeSelf);
            
        }

        private initUI() {
            this.input_phone_number.prompt = "输入手机号码";
            this.input_phone_number.promptColor = GFColorFacotry(5);
            this.input_phone_number.fontSize = 28;
            this.input_phone_number.maxChars = 11;
            this.input_phone_number.color = GFColorFacotry(11);

            this.input_passward.prompt = "输入6-12位密码";
            this.input_passward.promptColor = GFColorFacotry(5);
            this.input_passward.fontSize = 28;
            this.input_passward.maxChars = 12;
            this.input_passward.color = GFColorFacotry(11);
  

            this.changeUiByState(false);
        }


        private changeUiByState(showpsdbtn : boolean){
            if(showpsdbtn){
                this.input_passward.width = 260;
                this.btn_reget_password.visible = true;
            }else{
                this.input_passward.width = 460;
                this.btn_reget_password.visible = false;
            }
        }

        private onButtonClick(){
            this.btn_close.on(laya.events.Event.CLICK, this, this.removeSelf); 
            this.btn_reget_password.on(laya.events.Event.CLICK, this, this.regetPassword); 
            this.btn_register_login.on(laya.events.Event.CLICK, this, this.registerOrlogin); 
            this.btn_qq_login.on(laya.events.Event.CLICK, this, this.onBtnQQLogin); 
        }

        private regetPassword() {
            let activiteView = new view.GFActiviteAccount("");
            activiteView.setPhoneNumAndPassword(this.input_phone_number.text);
            this.addChild(activiteView);

        }

        private registerOrlogin() {
            var regex = "^1[3,4,5,7,8]\\d{9}$";

            if (this.input_phone_number.text.length == 0) {
                new GFCenterMsgDialog("请输入11位手机号码");
                return;
            }
            if (!this.input_phone_number.text.match(regex)) {
                new GFCenterMsgDialog("请输入11位手机号码");
                return;
            }

            if (this.input_passward.text.length < 6 || this.input_passward.text.length > 12) {
                new GFCenterMsgDialog("请输入6-12位密码");
                return;
            }
            var api = "user/prelogin";

            model.getUrlRequestResponse(api, { "phone": this.input_phone_number.text, "passwd": this.input_passward.text }, Handler.create(this, function (result) {
                GFLog(result);
                if (result.errcode == "0") {
                    let param = {
                        "type": 3,
                        "tpid": this.input_phone_number.text,
                        "passwd": this.input_passward.text
                    };
                    this.loginRequest(param);
                } else if (result.errcode == "208") {
                    //密码错误
                    new GFCenterMsgDialog(result.msg);
                    this.changeUiByState(true);
                    
                } else if (result.errcode == "209") {
                    //手机号未注册
                    let activiteView = new view.GFActiviteAccount("");
                    activiteView.setPhoneNumAndPassword(this.input_phone_number.text,this.input_passward.text);
                    this.addChild(activiteView);


                }
            }));
        }


        private loginRequest(param) {
            let api = "user/login";
            model.getUrlRequestResponse(api, param, Handler.create(this, function (result: any) {
                this.loginModel = result;
                if (this.loginModel.errcode == 0) {
                     new GFCenterMsgDialog(result.msg);
                    this.removeSelf();
                    localStorage.setItem("urid", this.loginModel.user.urid);
                    model.UserModel = this.loginModel.user;
                    model.GFPlayer.myUrid = model.UserModel.urid;
                    let action = {
                        "action": 1,
                        "urid": model.UserModel.urid
                    }
                    view.GFHomePageView.socket.sendMsg(JSON.stringify(action));
                    loadRes(HomePageRes, Handler.create(this, function () {
                        let homeView = Laya.stage.getChildByName(GFHomePageView.name);
                        if (homeView) {
                            homeView.removeChildByName(GFLoginView.str);
                            Laya.stage.event(GFRefreshUserInfo, model.UserModel);
                            Laya.stage.event(GFRefreshDiamondList);
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

    }
}