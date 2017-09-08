module view{
     import GFColorFacotry = model.getColorWithNumber;
    export class GFActiviteAccount extends ui.GFActiviteAccountUI{
        private phonenum:string;
        private password:string;
        private onlyIndentify:boolean = false;
        constructor(parameters) {
            super();
            this.initUI();
            this.onButtonClick();
            
        }

        public setPhoneNumAndPassword(phoneNum:string,psd?:string){
            this.phonenum = phoneNum;
            if(psd){
                this.onlyIndentify = true;
                this.password = psd;
                this.changeUiByState(false);
            }else{
                this.onlyIndentify = false;
                this.changeUiByState(true);
            }
             this.getIndentifyCode();   
        }

         private initUI() {
            this.label_information.visible = false;
            this.input_indentify_code.prompt = "输入验证码";
            this.input_indentify_code.promptColor = GFColorFacotry(5);
            this.input_indentify_code.fontSize = 28;
            this.input_indentify_code.maxChars = 4;
            this.input_indentify_code.color = GFColorFacotry(11);

            this.input_password.prompt = "输入6-12位新密码";
            this.input_password.promptColor = GFColorFacotry(5);
            this.input_password.fontSize = 28;
            this.input_password.maxChars = 12;
            this.input_password.color = GFColorFacotry(11);
          
        }

        private onButtonClick(){
            this.btn_close.on(laya.events.Event.CLICK, this, this.closeDialog); 
            this.btn_get_code.on(laya.events.Event.CLICK, this, this.getIndentifyCode);
            this.btn_activite.on(laya.events.Event.CLICK, this, this.activiteAccount);
            this.btn_cancel.on(laya.events.Event.CLICK, this, this.closeDialog);
        }

        private closeDialog(){
            this.removeSelf();
            Laya.stage.event(GFCloseAccountLogin);
        }

        private getIndentifyCode(){
            if (this.btn_get_code.selected == false) {
                    this.btn_get_code.selected = true;
                    let api = "api/captcha";
                    var type = 2;
                    if(this.onlyIndentify){
                        type = 1;
                    }
                    let param = { "phone": this.phonenum,"type":type};
                    model.getUrlRequestResponse(api, param, Handler.create(this, function (result: any) {
                        this.showTopInformation();
                        this.setTimer();
                        new GFCenterMsgDialog(result.msg);
                    }));
                }
        }

        private showTopInformation(){
            if(this.phonenum && this.phonenum.length == 11){
                let subnum1 = this.phonenum.substring(0,3);
                let subnum2 = this.phonenum.substring(7,11);
                this.label_information.visible = true;
                this.label_information.text ="验证码已发送到"+ subnum1+"xxxx"+ subnum2;
                 
            }
        }

        private setTimer() {
            let time = 60;
            this.timer.loop(1000, this, function () {
                time = time - 1;
                if (time > 0) {
                    this.btn_get_code.label = '重新获取' + time + 's';
                    this.btn_get_code.disabled = true;
                } else {
                    this.btn_get_code.label = '获取验证码';
                    this.btn_get_code.disabled = false;
                    this.btn_get_code.selected = false;
                    this.timer.clearAll(this);
                }
            });
        }

        private activiteAccount(){
            if(this.input_indentify_code.text.length ==0 ){
                new GFCenterMsgDialog("请输入验证码");
                return;
            }
            if(this.onlyIndentify){
                let param = {
                        "type": 3,
                        "tpid": this.phonenum,
                        "passwd": this.password,
                        "captcha":this.input_indentify_code.text
                    };
                this.loginRequest(param);

            }else{
                if(this.input_password.text.length < 6 || this.input_password.text.length > 12){
                    new GFCenterMsgDialog("请输入输入6-12位新密码");
                    return;
                }

                let param = {
                        "type": 3,
                        "tpid": this.phonenum,
                        "passwd": this.input_password.text,
                        "captcha":this.input_indentify_code.text
                    };
                this.loginRequest(param);
            }
            

        }

        private changeUiByState(showpsd: boolean) {
            if (showpsd) {
                this.input_indentify_code.y = 260;
                this.btn_get_code.y = 266;
                this.input_password.visible =true;
            } else {
                this.input_indentify_code.y = 290;
                this.btn_get_code.y = 296;
                this.input_password.visible =false;
            }
        }

        private loginRequest(param) {
            let api = "user/login";
            model.getUrlRequestResponse(api, param, Handler.create(this, function (result: any) {
                this.loginModel = result;
                if (this.loginModel.errcode == 0) {
                    this.closeDialog();
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


    }
}