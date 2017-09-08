module model {

    export class GFChannels {

        static ISHOOWU: boolean = false;
        static ISQUNHEi: boolean = false;
        static IsFALAOMIAO: boolean = false;
        static IsHAIWANWAN: boolean = false;
        static IsTONGBUTUI: boolean = false;
        static ISLAYA: boolean = false;
        static ISYOUTAN: boolean = false;
        static ISYOUTANLOGIN: boolean = false;
        static ISYOUZU: boolean = false;
        static ISSISHENSHOU: boolean = false;
        static ISShOUYOUBANG: boolean = false;
        static ISLBWAN: boolean = false;
        static ISNice:boolean = false;
        static ISJZ : boolean = false;
        static ISBL : boolean = false;
        static ISDH : boolean = false
        static ISLEGUYU : boolean = false
        private laya_market;
        constructor() {
            //群黑
            this.setQunHeiChannel();
            //法老喵
            this.setFaLaoMiaoChannel();
            //嗨玩玩
            this.setHaiWanWanChannel();
            //同步推
            this.setTongBuTuiChannel();
            //LayaBoxMarket
            this.setLayaChannel();
            //优谈
            this.setYouTanChannel();
            //游族
            this.setYouZuChannel();
            //四神兽
            this.setSiShenShouChannel();
            //手游帮
            this.setShouYouBangChannel();
            //nice
            this.setNiceChannel();
            //萝卜玩
            this.setLBWanChannel();
            //白鹭
            this.setBLChannel();
            //桔子
            this.setJZChannel();
            //电魂
            this.setDHChannel();
            //电魂
            this.setLEGUYUChannel();
        }

        //---------------------- 群黑 --------------------//

        private setQunHeiChannel() {
            let href: string = laya.utils.Browser.window.location.href;
            let channel: string = view.GFHomePageView.getValueByNameFromUrl(href, "type");
            if (channel && channel.length) {
                if ("5" == channel) {
                    GFChannels.ISQUNHEi = true;
                    let username: string = view.GFHomePageView.getValueByNameFromUrl(href, "username");
                    if (username && username.length) {
                        localStorage.setItem("qhusername", username);
                    }
                    let serverid: string = view.GFHomePageView.getValueByNameFromUrl(href, "serverid");
                    if (serverid && serverid.length) {
                        localStorage.setItem("qhserverid", serverid);
                    }
                    let time: string = view.GFHomePageView.getValueByNameFromUrl(href, "time");
                    if (time && time.length) {
                        localStorage.setItem("qhtime", time);
                    }

                    let isadult: string = view.GFHomePageView.getValueByNameFromUrl(href, "isadult");
                    if (isadult && isadult.length) {
                        localStorage.setItem("qhisadult", isadult);
                    }

                    let uimg: string = view.GFHomePageView.getValueByNameFromUrl(href, "uimg");
                    if (uimg && uimg.length) {
                        localStorage.setItem("qhuimg", uimg);
                    }

                    let flag: string = view.GFHomePageView.getValueByNameFromUrl(href, "flag");
                    if (flag && flag.length) {
                        localStorage.setItem("qhflag", flag);
                    }
                } else {
                    GFChannels.ISQUNHEi = false;
                }
            } else {

                GFChannels.ISQUNHEi = false;
            }

        }

        private QHUserLogin() {
            let param = { type: 5 };
            if (localStorage.getItem("tudid")) {
                param["tudid"] = localStorage.getItem("tudid");
            }

            if (localStorage.getItem("qhusername")) {
                param["username"] = localStorage.getItem("qhusername");
            }

            if (localStorage.getItem("qhserverid")) {
                param["serverid"] = localStorage.getItem("qhserverid");
            }

            if (localStorage.getItem("qhisadult")) {
                param["isadult"] = localStorage.getItem("qhisadult");
            }

            if (localStorage.getItem("qhtime")) {
                param["time"] = localStorage.getItem("qhtime");
            }

            if (localStorage.getItem("qhuimg")) {
                param["uimg"] = localStorage.getItem("qhuimg");
            }

            if (localStorage.getItem("qhflag")) {
                param["flag"] = localStorage.getItem("qhflag");
            }

            this.channelLogin(param);
        }


        private removeQhItem() {
            if (localStorage.getItem("qhusername"))
                localStorage.removeItem("qhusername");
            if (localStorage.getItem("qhserverid"))
                localStorage.removeItem("qhserverid");
            if (localStorage.getItem("qhisadult"))
                localStorage.removeItem("qhisadult");
            if (localStorage.getItem("qhtime"))
                localStorage.removeItem("qhtime");
            if (localStorage.getItem("qhuimg"))
                localStorage.removeItem("qhuimg");
            if (localStorage.getItem("qhflag"))
                localStorage.removeItem("qhflag");

        }

        //---------------------- 群黑 --------------------//

        //-------------------- 法老喵 --------------------//

        private setFaLaoMiaoChannel() {
            let href: string = laya.utils.Browser.window.location.href;
            let channel: string = view.GFHomePageView.getValueByNameFromUrl(href, "dist");
            if (channel && channel.length) {
                if ("1018" == channel) {
                    GFChannels.IsFALAOMIAO = true;
                    let flm_user_id: string = view.GFHomePageView.getValueByNameFromUrl(href, "user_id");
                    if (flm_user_id && flm_user_id.length) {
                        localStorage.setItem("flm_user_id", flm_user_id);
                    }
                    let flm_game_appid: string = view.GFHomePageView.getValueByNameFromUrl(href, "game_appid");
                    if (flm_game_appid && flm_game_appid.length) {
                        localStorage.setItem("flm_game_appid", flm_game_appid);
                    }
                    let flm_email: string = view.GFHomePageView.getValueByNameFromUrl(href, "email");
                    if (flm_email && flm_email.length) {
                        localStorage.setItem("flm_email", flm_email);
                    }

                    let flm_new_time: string = view.GFHomePageView.getValueByNameFromUrl(href, "new_time");
                    if (flm_new_time && flm_new_time.length) {
                        localStorage.setItem("flm_new_time", flm_new_time);
                    }

                    let flm_sign: string = view.GFHomePageView.getValueByNameFromUrl(href, "sign");
                    if (flm_sign && flm_sign.length) {
                        localStorage.setItem("flm_sign", flm_sign);
                    }
                } else {
                    GFChannels.IsFALAOMIAO = false;
                }
            } else {
                GFChannels.IsFALAOMIAO = false;
            }


        }


        private FLMUserLogin() {
            let param = { type: 7 };
            if (localStorage.getItem("tudid")) {
                param["tudid"] = localStorage.getItem("tudid");
            }

            if (localStorage.getItem("flm_user_id")) {
                param["user_id"] = localStorage.getItem("flm_user_id");
                param["tpid"] = localStorage.getItem("flm_user_id");
            }

            if (localStorage.getItem("flm_game_appid")) {
                param["game_appid"] = localStorage.getItem("flm_game_appid");
            }

            if (localStorage.getItem("flm_email")) {
                param["email"] = localStorage.getItem("flm_email");
            }

            if (localStorage.getItem("flm_new_time")) {
                param["new_time"] = localStorage.getItem("flm_new_time");
            }

            if (localStorage.getItem("flm_sign")) {
                param["sign"] = localStorage.getItem("flm_sign");
            }

            this.channelLogin(param);


        }

        private removeFlmItem() {
            if (localStorage.getItem("flm_user_id"))
                localStorage.removeItem("flm_user_id");
            if (localStorage.getItem("flm_game_appid"))
                localStorage.removeItem("flm_game_appid");
            if (localStorage.getItem("flm_email"))
                localStorage.removeItem("flm_email");
            if (localStorage.getItem("flm_new_time"))
                localStorage.removeItem("flm_new_time");
            if (localStorage.getItem("flm_sign"))
                localStorage.removeItem("flm_sign");

        }

        //-------------------- 法老喵 --------------------//



        //-------------------- 嗨玩玩 --------------------//

        private setHaiWanWanChannel() {
            let href: string = laya.utils.Browser.window.location.href;
            let channel: string = view.GFHomePageView.getValueByNameFromUrl(href, "dist");
            if (channel && channel.length) {
                if ("1012" == channel) {
                    GFChannels.IsHAIWANWAN = true;
                    let hww_userAccount: string = view.GFHomePageView.getValueByNameFromUrl(href, "userAccount");
                    if (hww_userAccount && hww_userAccount.length) {
                        localStorage.setItem("hww_userAccount", hww_userAccount);
                    }
                    let hww_loginTime: string = view.GFHomePageView.getValueByNameFromUrl(href, "loginTime");
                    if (hww_loginTime && hww_loginTime.length) {
                        localStorage.setItem("hww_loginTime", hww_loginTime);
                    }
                    let hww_sign: string = view.GFHomePageView.getValueByNameFromUrl(href, "sign");
                    if (hww_sign && hww_sign.length) {
                        localStorage.setItem("hww_sign", hww_sign);
                    }
                } else {
                    GFChannels.IsHAIWANWAN = false;
                }
            } else {
                GFChannels.IsHAIWANWAN = false;
            }

        }


        private HWWUserLogin() {
            let param = { type: 6 };

            if (localStorage.getItem("hww_userAccount")) {
                param["userAccount"] = localStorage.getItem("hww_userAccount");
                param["tpid"] = localStorage.getItem("hww_userAccount");
            }

            if (localStorage.getItem("hww_loginTime")) {
                param["loginTime"] = localStorage.getItem("hww_loginTime");
            }

            if (localStorage.getItem("hww_sign")) {
                param["sign"] = localStorage.getItem("hww_sign");
            }

            this.channelLogin(param);
        }


        private removeHwwItem() {
            if (localStorage.getItem("hww_userAccount"))
                localStorage.removeItem("hww_userAccount");
            if (localStorage.getItem("hww_loginTime"))
                localStorage.removeItem("hww_loginTime");
            if (localStorage.getItem("hww_sign"))
                localStorage.removeItem("hww_sign");

        }

        //-------------------- 嗨玩玩 --------------------//

        //-------------------- 同步推 --------------------//

        private setTongBuTuiChannel() {
            let href: string = laya.utils.Browser.window.location.href;
            let channel: string = view.GFHomePageView.getValueByNameFromUrl(href, "dist");
            if (channel && channel.length) {
                if ("1011" == channel) {
                    GFChannels.IsTONGBUTUI = true;
                    let tbt_uid: string = view.GFHomePageView.getValueByNameFromUrl(href, "uid");
                    if (tbt_uid && tbt_uid.length) {
                        localStorage.setItem("tbt_uid", tbt_uid);
                    }
                    let tbt_email: string = view.GFHomePageView.getValueByNameFromUrl(href, "email");
                    if (tbt_email && tbt_email.length) {
                        localStorage.setItem("tbt_email", tbt_email);
                    }

                    let tbt_t: string = view.GFHomePageView.getValueByNameFromUrl(href, "t");
                    if (tbt_t && tbt_t.length) {
                        localStorage.setItem("tbt_t", tbt_t);
                    }

                    let tbt_sign: string = view.GFHomePageView.getValueByNameFromUrl(href, "sign");
                    if (tbt_sign && tbt_sign.length) {
                        localStorage.setItem("tbt_sign", tbt_sign);
                    }
                } else {
                    GFChannels.IsTONGBUTUI = false;
                }
            } else {
                GFChannels.IsTONGBUTUI = false;
            }

        }

        private TBTUserLogin() {

            let param = { type: 8 };

            if (localStorage.getItem("tbt_uid")) {
                param["uid"] = localStorage.getItem("tbt_uid");
                param["tpid"] = localStorage.getItem("tbt_uid");
            }

            if (localStorage.getItem("tbt_email")) {
                param["email"] = localStorage.getItem("tbt_email");
            }

            if (localStorage.getItem("tbt_t")) {
                param["t"] = localStorage.getItem("tbt_t");
            }


            if (localStorage.getItem("tbt_sign")) {
                param["sign"] = localStorage.getItem("tbt_sign");
            }

            this.channelLogin(param);
        }


        private removeTbTItem() {
            if (localStorage.getItem("tbt_uid"))
                localStorage.removeItem("tbt_uid");
            if (localStorage.getItem("tbt_email"))
                localStorage.removeItem("tbt_email");
            if (localStorage.getItem("tbt_t"))
                localStorage.removeItem("tbt_t");
            if (localStorage.getItem("tbt_sign"))
                localStorage.removeItem("tbt_sign");

        }

        //-------------------- 同步推 --------------------//

        //-------------------- laya market --------------------//

        private setLayaChannel() {
            let href: string = laya.utils.Browser.window.location.href;
            let relatedId: string = view.GFHomePageView.getValueByNameFromUrl(href, "relatedId");
            if (relatedId && relatedId.length) {

                GFChannels.ISLAYA = true;
                model.NetWorking.distNumber = 1014;

            } else {
                GFChannels.ISLAYA = false;
            }

        }



        private checkLayaMarket() {
            Laya.timer.loop(150, this, this.isLayaMarketOk);
        }

        private isLayaMarketOk() {
            this.laya_market = laya.utils.Browser.window.LayaBoxMarket && laya.utils.Browser.window.LayaBoxMarket.getInstance();
            if (this.laya_market) {
                GFLog("this.laya_market ！=null");
                this.laya_market.login("", function (param: string): void {
                    GFLog("laya_market callback param= " + param);
                    var callback = JSON.parse(param);
                    if (callback) {
                        if ("0" == callback.result) {
                            GFLog("result = 0 ");
                            let param1 = { type: 9 };

                            param1["spId"] = callback.spId;
                            if (callback.data) {
                                param1["tpid"] = callback.data.unionUserId;
                                param1["unionUserId"] = callback.data.unionUserId;
                                param1["accessToken"] = callback.data.accessToken;
                            }

                            let api = "user/login";
                            model.getUrlRequestResponse(api, param1, Handler.create(this, function (result: any) {
                                this.loginModel = result;
                                if (this.loginModel.errcode == 0) {
                                    GameMain.ISYK = false;
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
                        } else {
                            GFLog("result != 0 ");
                            new view.GFCenterMsgDialog(callback.msg);
                        }
                    } else {
                        GFLog("result == null ");
                        new view.GFCenterMsgDialog("未成功登陆");
                    }
                });

                Laya.timer.clear(this, this.isLayaMarketOk);
            } else {
                GFLog("this.laya_market ==null");
            }

        }
        //-------------------- laya market --------------------//

        //---------------------- 优谈 --------------------//

        private setYouTanChannel() {
            let href: string = laya.utils.Browser.window.location.href;
            let channel: string = view.GFHomePageView.getValueByNameFromUrl(href, "dist");
            if (channel && channel.length) {
                if ("1019" == channel) {
                    GFChannels.ISYOUTAN = true;
                    let yt_uid: string = view.GFHomePageView.getValueByNameFromUrl(href, "uid");
                    if (yt_uid && yt_uid.length) {
                        if (localStorage.getItem("yt_uid")) {
                            let uid:string = localStorage.getItem("yt_uid");
                            if (yt_uid == uid){
                                GFChannels.ISYOUTANLOGIN = false;
                            } else {
                                 GFChannels.ISYOUTANLOGIN = true;
                            }
                        } else {
                            GFChannels.ISYOUTANLOGIN = true;
                        }

                        localStorage.setItem("yt_uid", yt_uid);


                    } else {
                        GFChannels.ISYOUTANLOGIN = true;
                        window.top.postMessage(JSON.stringify({ event: 'login' }), '*');
                    }

                    let yt_gameId: string = view.GFHomePageView.getValueByNameFromUrl(href, "gameId");
                    if (yt_gameId && yt_gameId.length) {
                        localStorage.setItem("yt_gameId", yt_gameId);
                    }

                    let yt_channel: string = view.GFHomePageView.getValueByNameFromUrl(href, "channel");
                    if (yt_channel && yt_channel.length) {
                        localStorage.setItem("yt_channel", yt_channel);
                    }

                    let yt_time: string = view.GFHomePageView.getValueByNameFromUrl(href, "time");
                    if (yt_time && yt_time.length) {
                        localStorage.setItem("yt_time", yt_time);
                    }

                    let yt_sign: string = view.GFHomePageView.getValueByNameFromUrl(href, "sign");
                    if (yt_sign && yt_sign.length) {
                        localStorage.setItem("yt_sign", yt_sign);
                    }

                } else {
                    GFChannels.ISYOUTAN = false;
                }
            } else {
                GFChannels.ISYOUTAN = false;
            }


        }

        private YTUserLogin() {
            let param = { type: 10 };

            if (localStorage.getItem("yt_uid")) {
                param["uid"] = localStorage.getItem("yt_uid");
                param["tpid"] = localStorage.getItem("yt_uid");
            }

            if (localStorage.getItem("yt_gameId")) {
                param["gameId"] = localStorage.getItem("yt_gameId");
            }

            if (localStorage.getItem("yt_channel")) {
                param["channel"] = localStorage.getItem("yt_channel");
            }

            if (localStorage.getItem("yt_time")) {
                param["time"] = localStorage.getItem("yt_time");
            }

            if (localStorage.getItem("yt_sign")) {
                param["sign"] = localStorage.getItem("yt_sign");
            }

            this.channelLogin(param);
        }


        private removeYtItem() {
            if (localStorage.getItem("yt_uid"))
                localStorage.removeItem("yt_uid");
            if (localStorage.getItem("yt_gameId"))
                localStorage.removeItem("yt_gameId");
            if (localStorage.getItem("yt_channel"))
                localStorage.removeItem("yt_channel");
            if (localStorage.getItem("yt_time"))
                localStorage.removeItem("yt_time");
            if (localStorage.getItem("yt_sign"))
                localStorage.removeItem("yt_sign");

        }
        //---------------------- 优谈 --------------------//

        //-------------------- 四神兽 --------------------//

        private setSiShenShouChannel() {
            let href: string = laya.utils.Browser.window.location.href;
            let channel: string = view.GFHomePageView.getValueByNameFromUrl(href, "email");
            if (channel && channel.length) {
                if ("1020" == channel) {
                    GFChannels.ISSISHENSHOU = true;
                    let sss_user_id: string = view.GFHomePageView.getValueByNameFromUrl(href, "user_id");
                    if (sss_user_id && sss_user_id.length) {
                        localStorage.setItem("sss_user_id", sss_user_id);
                    }
                    let sss_game_appid: string = view.GFHomePageView.getValueByNameFromUrl(href, "game_appid");
                    if (sss_game_appid && sss_game_appid.length) {
                        localStorage.setItem("sss_game_appid", sss_game_appid);
                    }

                    let sss_email: string = view.GFHomePageView.getValueByNameFromUrl(href, "email");
                    if (sss_email && sss_email.length) {
                        localStorage.setItem("sss_email", sss_email);
                    }

                    let sss_new_time: string = view.GFHomePageView.getValueByNameFromUrl(href, "new_time");
                    if (sss_new_time && sss_new_time.length) {
                        localStorage.setItem("sss_new_time", sss_new_time);
                    }

                    let sss_channelExt: string = view.GFHomePageView.getValueByNameFromUrl(href, "channelExt");
                    if (sss_channelExt && sss_channelExt.length) {
                        localStorage.setItem("sss_channelExt", sss_channelExt);
                    }

                    let sss_sign: string = view.GFHomePageView.getValueByNameFromUrl(href, "sign");
                    if (sss_sign && sss_sign.length) {
                        localStorage.setItem("sss_sign", sss_sign);
                    }
                } else {
                    GFChannels.ISSISHENSHOU = false;
                }
            } else {
                GFChannels.ISSISHENSHOU = false;
            }

        }

        private SSSUserLogin() {

            let param = { type: 13 };

            if (localStorage.getItem("sss_user_id")) {
                param["user_id"] = localStorage.getItem("sss_user_id");
                param["tpid"] = localStorage.getItem("sss_user_id");
            }

            if (localStorage.getItem("sss_game_appid")) {
                param["game_appid"] = localStorage.getItem("sss_game_appid");
            }

            if (localStorage.getItem("sss_email")) {
                param["email"] = localStorage.getItem("sss_email");
            }

            if (localStorage.getItem("sss_new_time")) {
                param["new_time"] = localStorage.getItem("sss_new_time");
            }

            if (localStorage.getItem("sss_channelExt")) {
                param["channelExt"] = localStorage.getItem("sss_channelExt");
            }

            if (localStorage.getItem("sss_sign")) {
                param["sign"] = localStorage.getItem("sss_sign");
            }

            param["dist"] = "1020";
            this.channelLogin(param);
        }


        private removeSssItem() {
            if (localStorage.getItem("sss_user_id"))
                localStorage.removeItem("sss_user_id");
            if (localStorage.getItem("sss_game_appid"))
                localStorage.removeItem("sss_game_appid");
            if (localStorage.getItem("sss_email"))
                localStorage.removeItem("sss_email");
            if (localStorage.getItem("sss_new_time"))
                localStorage.removeItem("sss_new_time");
            if (localStorage.getItem("sss_channelExt"))
                localStorage.removeItem("sss_channelExt");
            if (localStorage.getItem("sss_sign"))
                localStorage.removeItem("sss_sign");

        }

        //-------------------- 四神兽 --------------------//

        //-------------------- 手游帮 --------------------//

        private setShouYouBangChannel() {
            let href: string = laya.utils.Browser.window.location.href;
            let channel: string = view.GFHomePageView.getValueByNameFromUrl(href, "dist");
            if (channel && channel.length) {
                if ("1017" == channel) {
                    GFChannels.ISShOUYOUBANG = true;
                    let syb_open_id: string = view.GFHomePageView.getValueByNameFromUrl(href, "open_id");
                    if (syb_open_id && syb_open_id.length) {
                        localStorage.setItem("syb_open_id", syb_open_id);
                    }
                    let syb_token: string = view.GFHomePageView.getValueByNameFromUrl(href, "token");
                    if (syb_token && syb_token.length) {
                        localStorage.setItem("syb_token", syb_token);
                    }

                    let syb_timestamp: string = view.GFHomePageView.getValueByNameFromUrl(href, " timestamp");
                    if (syb_timestamp && syb_timestamp.length) {
                        localStorage.setItem("syb_timestamp", syb_timestamp);
                    }

                    let syb_nickname: string = view.GFHomePageView.getValueByNameFromUrl(href, "nickname");
                    if (syb_nickname && syb_nickname.length) {
                        localStorage.setItem("syb_nickname", syb_nickname);
                    }

                } else {
                    GFChannels.ISShOUYOUBANG = false;
                }
            } else {
                GFChannels.ISShOUYOUBANG = false;
            }

        }

        private SYBUserLogin() {

            let param = { type: 15 };

            if (localStorage.getItem("syb_open_id")) {
                param["open_id"] = localStorage.getItem("syb_open_id");
                param["tpid"] = localStorage.getItem("syb_open_id");
            }

            if (localStorage.getItem("syb_token")) {
                param["token"] = localStorage.getItem("syb_token");
            }

            if (localStorage.getItem("syb_timestamp")) {
                param["timestamp"] = localStorage.getItem("syb_timestamp");
            }

            if (localStorage.getItem("syb_nickname")) {
                param["nickname"] = localStorage.getItem("syb_nickname");
            }

            this.channelLogin(param);
        }


        private removeSybItem() {
            if (localStorage.getItem("syb_open_id"))
                localStorage.removeItem("syb_open_id");
            if (localStorage.getItem("syb_token"))
                localStorage.removeItem("syb_token");
            if (localStorage.getItem("syb_timestamp"))
                localStorage.removeItem("syb_timestamp");
            if (localStorage.getItem("syb_nickname"))
                localStorage.removeItem("syb_nickname");
        }

        //-------------------- 手游帮 --------------------//

        //--------------------- nice --------------------//

        private setNiceChannel() {
            let href: string = laya.utils.Browser.window.location.href;
            let channel: string = view.GFHomePageView.getValueByNameFromUrl(href, "dist");
            if (channel && channel.length) {
                if ("1023" == channel) {
                    GFChannels.ISNice = true;
                    let nc_loginTicket: string = view.GFHomePageView.getValueByNameFromUrl(href, "loginTicket");
                    if (nc_loginTicket && nc_loginTicket.length) {
                        localStorage.setItem("nc_loginTicket", nc_loginTicket);
                    }else{
                        let param = {
                            appId:10006,
                            channelId:10000,
                            debug:true,
                            onLogout:undefined

                        }
                        Nice.config(param);
                        Nice.login();
                    } 

                } else {
                    GFChannels.ISNice = false;
                }
            } else {
                GFChannels.ISNice = false;
            }

        }

        private NiceUserLogin() {

            let param = { type: 17 };

            if (localStorage.getItem("nc_loginTicket")) {
                param["loginTicket"] = localStorage.getItem("nc_loginTicket");
                param["tpid"] = localStorage.getItem("nc_loginTicket");
            }

            this.channelLogin(param);
        }


        private removeNiceItem() {
            if (localStorage.getItem("nc_loginTicket"))
                localStorage.removeItem("nc_loginTicket");
        }

        //----------------------- nice --------------------//

        //---------------------- 白鹭 --------------------//
        private setBLChannel() {
            let href: string = laya.utils.Browser.window.location.href;
            let channel: string = view.GFHomePageView.getValueByNameFromUrl(href, "dist");
            if (channel && channel.length) {
                if ("1013" == channel) {
                    GFChannels.ISBL = true;
                    let bl_token: string = view.GFHomePageView.getValueByNameFromUrl(href, "token");
                    if (bl_token && bl_token.length) {
                        localStorage.setItem("bl_token", bl_token);
                    } else {

                    }

                } else {
                    GFChannels.ISBL = false;
                }
            } else {
                GFChannels.ISBL = false;
            }

        }

        private BLLogin() {
            var info: any = {};
            //设置游戏id。如果是通过开放平台接入，请在开放平台游戏信息-》基本信息-》游戏ID 找到。
            info.egretAppId = 88888;
            //设置使用 Nest 版本。请传递2
            info.version = 2;
            //在debug模式下，请求nest接口会有日志输出。建议调试时开启
            info.debug = true;

            if (localStorage.getItem("bl_token")) {
                let param = { type: 18 };
                param["tpid"] = localStorage.getItem("bl_token");
                param["token"] = localStorage.getItem("bl_token");
                this.channelLogin(param);
            } else {
                nest.easyuser.startup(info, function (data) {
                    if (data.result == 0) {
                        //初始化成功，进入游戏
                        nest.easyuser.login({}, function (data: any) {
                            if (data.result == 0) {
                                GFLog("result = 0 ");

                                localStorage.setItem("bl_token", data.token);
                                let param1 = { type: 18, "tpid": data.token, "token": data.token };

                                let api = "user/login";
                                model.getUrlRequestResponse(api, param1, Handler.create(this, function (result: any) {
                                    this.loginModel = result;
                                    if (this.loginModel.errcode == 0) {
                                        GameMain.ISYK = false;
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
                            else {
                                GFLog("login--bl--error");
                            }
                        });
                    } else {
                        GFLog("startup-bl-error");
                    }

                })
            }

        }

        private removeBLItem() {
            if (localStorage.getItem("bl_token"))
                localStorage.removeItem("bl_token");
        }
        //---------------------- 白鹭 --------------------//

        //---------------------- 萝卜玩 --------------------//
        private setLBWanChannel(){
            let href: string = laya.utils.Browser.window.location.href;
            let channel: string = view.GFHomePageView.getValueByNameFromUrl(href, "dist");
            if (channel && channel.length) {
                if ("1021" == channel) {
                    GFChannels.ISLBWAN = true;
                    let uid: string = view.GFHomePageView.getValueByNameFromUrl(href, "uid");
                    if (uid && uid.length) {
                        localStorage.setItem("lbw_uid", uid);
                    }
                    let time: string = view.GFHomePageView.getValueByNameFromUrl(href, "time");
                    if (time && time.length) {
                        localStorage.setItem("lbw_time", time);
                    }

                    let gameId: string = view.GFHomePageView.getValueByNameFromUrl(href, "gid");
                    if (gameId && gameId.length) {
                        localStorage.setItem("lbw_gameID", gameId);
                    }

                    let tbt_sign: string = view.GFHomePageView.getValueByNameFromUrl(href, "sign");
                    if (tbt_sign && tbt_sign.length) {
                        localStorage.setItem("lbw_sign", tbt_sign);
                    }
                } else {
                    GFChannels.ISLBWAN = false;
                }
            } else {
                GFChannels.ISLBWAN = false;
            }

        }

        private LBWanLogin() {

            let param = { type: 12 };

            if (localStorage.getItem("lbw_uid")) {
                param["uid"] = localStorage.getItem("lbw_uid");
                param["tpid"] = localStorage.getItem("lbw_uid");
            }

            if (localStorage.getItem("lbw_time")) {
                param["time"] = localStorage.getItem("lbw_time");
            }

            if (localStorage.getItem("lbw_gameID")) {
                param["gid"] = localStorage.getItem("lbw_gameID");
            }


            if (localStorage.getItem("lbw_sign")) {
                param["sign"] = localStorage.getItem("lbw_sign");
            }

            this.channelLogin(param);
        }

        private removeLBWanItem() {
            if (localStorage.getItem("lbw_uid"))
                localStorage.removeItem("lbw_uid");
            if (localStorage.getItem("lbw_time"))
                localStorage.removeItem("lbw_time");
            if (localStorage.getItem("lbw_gameID"))
                localStorage.removeItem("lbw_gameID");
            if (localStorage.getItem("lbw_sign"))
                localStorage.removeItem("lbw_sign");
        }
         //---------------------- 萝卜玩 --------------------//
         //---------------------- 乐谷鱼 --------------------//
        private setLEGUYUChannel(){
            let href: string = laya.utils.Browser.window.location.href;
            let channel: string = view.GFHomePageView.getValueByNameFromUrl(href, "dist");
            if (channel && channel.length) {
                if ("1025" == channel) {
                    GFChannels.ISLEGUYU = true;
                    let gameId: string = view.GFHomePageView.getValueByNameFromUrl(href, "appid");
                    if (gameId && gameId.length) {
                        localStorage.setItem("lgy_appid", gameId);
                    }
                    let uid: string = view.GFHomePageView.getValueByNameFromUrl(href, "uid");
                    if (uid && uid.length) {
                        localStorage.setItem("lgy_uid", uid);
                    }

                    let token: string = view.GFHomePageView.getValueByNameFromUrl(href, "token");
                    if (gameId && gameId.length) {
                        localStorage.setItem("lgy_token", token);
                    }

                    let time: string = view.GFHomePageView.getValueByNameFromUrl(href, "time");
                    if (time && time.length) {
                        localStorage.setItem("lgy_time", time);
                    }
                    let tbt_sign: string = view.GFHomePageView.getValueByNameFromUrl(href, "sign");
                    if (tbt_sign && tbt_sign.length) {
                        localStorage.setItem("lgy_sign", tbt_sign);
                    }
                } else {
                    GFChannels.ISLEGUYU = false;
                }
            } else {
                GFChannels.ISLEGUYU = false;
            }

        }

        private LEGUYULogin() {

            let param = { type: 19 };

            if (localStorage.getItem("lgy_uid")) {
                param["uid"] = localStorage.getItem("lgy_uid");
            }

            if (localStorage.getItem("lgy_time")) {
                param["time"] = localStorage.getItem("lgy_time");
            }

            if (localStorage.getItem("lgy_appid")) {
                param["appid"] = localStorage.getItem("lgy_appid");
            }

            if (localStorage.getItem("lgy_token")) {
                param["token"] = localStorage.getItem("lgy_token");
                param["tpid"] = localStorage.getItem("lgy_token");
            }

            if (localStorage.getItem("lgy_sign")) {
                param["sign"] = localStorage.getItem("lgy_sign");
            }

            this.channelLogin(param);
        }

        private removeLEGUYUItem() {
            if (localStorage.getItem("lgy_uid"))
                localStorage.removeItem("lgy_uid");
            if (localStorage.getItem("lgy_time"))
                localStorage.removeItem("lgy_time");
            if (localStorage.getItem("lgy_appid"))
                localStorage.removeItem("lgy_appid");
            if (localStorage.getItem("lgy_token"))
                localStorage.removeItem("lgy_token");
            if (localStorage.getItem("lgy_sign"))
                localStorage.removeItem("lgy_sign");
        }
         //---------------------- 乐谷鱼 --------------------//

        //---------------------- 游族 --------------------//

        private setYouZuChannel() {
            let href: string = laya.utils.Browser.window.location.href;
            let channel: string = view.GFHomePageView.getValueByNameFromUrl(href, "dist");
            if (channel && channel.length) {
                if ("1015" == channel) {
                    GFChannels.ISYOUZU = true;

                    let yt_sign: string = view.GFHomePageView.getValueByNameFromUrl(href, "token");
                    if (yt_sign && yt_sign.length) {
                        localStorage.setItem("yz_token", yt_sign);
                    }

                } else {
                    GFChannels.ISYOUZU = false;
                }
            } else {
                GFChannels.ISYOUZU = false;
            }


        }

        private YZUserLogin() {
            let param = { type: 11 };

            if (localStorage.getItem("yz_token")) {
                param["tpid"] = localStorage.getItem("yz_token");
                param["token"] = localStorage.getItem("yz_token");
            }


            this.channelLogin(param);
        }


        private removeYzItem() {
            if (localStorage.getItem("yz_token"))
                localStorage.removeItem("yz_token");
        }
        //---------------------- 游族 --------------------//

        //---------------------- 桔子 --------------------//
        private setJZChannel() {
            let href: string = laya.utils.Browser.window.location.href;
            let channel: string = view.GFHomePageView.getValueByNameFromUrl(href, "dist");
            if (channel && channel.length) {
                if ("1016" == channel) {
                    GFChannels.ISJZ = true;
                    let access: string = view.GFHomePageView.getValueByNameFromUrl(href, "access");
                    if (access && access.length) {
                        localStorage.setItem("jz_access", access);
                    }
                } else {
                    GFChannels.ISJZ = false;
                }
            } else {
                GFChannels.ISJZ = false;
            }
        }
        private JZLogin() {
            let param = { type: 14 };
            if (localStorage.getItem("jz_access")) {
                param["access"] = localStorage.getItem("jz_access");
            }
            this.channelLogin(param);
        }

        private removeJZItem() {
            if (localStorage.getItem("jz_access"))
                localStorage.removeItem("jz_access");
        }
        //---------------------- 桔子 --------------------//

        //---------------------- 电魂 --------------------//
        private setDHChannel() {
            let href: string = laya.utils.Browser.window.location.href;
            let channel: string = view.GFHomePageView.getValueByNameFromUrl(href, "dist");
            if (channel && channel.length) {
                if ("1024" == channel) {
                    GFChannels.ISDH = true;
                    let uid: string = view.GFHomePageView.getValueByNameFromUrl(href, "uid");
                    if (uid && uid.length) {
                        localStorage.setItem("dh_uid", uid);
                    }
                    let sign: string = view.GFHomePageView.getValueByNameFromUrl(href, "sign");
                    if (sign && sign.length) {
                        localStorage.setItem("dh_sign", sign);
                    }
                    let nick: string = view.GFHomePageView.getValueByNameFromUrl(href, "nick");
                    if (nick && nick.length) {
                        localStorage.setItem("dh_nick", nick);
                    }
                    let avatar: string = view.GFHomePageView.getValueByNameFromUrl(href, "avatar");
                    if (avatar && avatar.length) {
                        localStorage.setItem("dh_avatar", avatar);
                    }
                    let sex: string = view.GFHomePageView.getValueByNameFromUrl(href, "sex");
                    if (sex && sex.length) {
                        localStorage.setItem("dh_sex", sex);
                    }
                    let channel: string = view.GFHomePageView.getValueByNameFromUrl(href, "channel");
                    if (channel && channel.length) {
                        localStorage.setItem("dh_channel", channel);
                    }
                    let time: string = view.GFHomePageView.getValueByNameFromUrl(href, "time");
                    if (time && time.length) {
                        localStorage.setItem("dh_time", time);
                    }
                    let gid: string = view.GFHomePageView.getValueByNameFromUrl(href, "gid");
                    if (gid && gid.length) {
                        localStorage.setItem("dh_gid", gid);
                    }
                    let appid: string = view.GFHomePageView.getValueByNameFromUrl(href, "appid");
                    if (appid && appid.length) {
                        localStorage.setItem("dh_appid", appid);
                    }
                    let openid: string = view.GFHomePageView.getValueByNameFromUrl(href, "openid");
                    if (openid && openid.length) {
                        localStorage.setItem("dh_openid", openid);
                    }
                    let cburl: string = view.GFHomePageView.getValueByNameFromUrl(href, "cburl");
                    if (cburl && cburl.length) {
                        localStorage.setItem("dh_cburl", cburl);
                    }
                    let reurl: string = view.GFHomePageView.getValueByNameFromUrl(href, "reurl");
                    if (reurl && reurl.length) {
                        localStorage.setItem("dh_reurl", reurl);
                    }
                } else {
                    GFChannels.ISDH = false;
                }
            } else {
                GFChannels.ISDH = false;
            }
        }
        private DHLogin() {
            let param = { type: 16 };
            if (localStorage.getItem("dh_uid")) {
                param["tpid"] = localStorage.getItem("dh_uid");
                param['uid'] = localStorage.getItem("dh_uid");
            }
            if (localStorage.getItem("dh_sign")) {
                param["sign"] = localStorage.getItem("dh_sign");
            }
            if (localStorage.getItem("dh_nick")) {
                param["nick"] = localStorage.getItem("dh_nick");
            }
            if (localStorage.getItem("dh_avatar")) {
                param["avatar"] = localStorage.getItem("dh_avatar");
            }
            if (localStorage.getItem("dh_sex")) {
                param["sex"] = localStorage.getItem("dh_sex");
            }
            if (localStorage.getItem("dh_channel")) {
                param["channel"] = localStorage.getItem("dh_channel");
            }
            if (localStorage.getItem("dh_time")) {
                param["time"] = localStorage.getItem("dh_time");
            }
            if (localStorage.getItem("dh_gid")) {
                param["gid"] = localStorage.getItem("dh_gid");
            }
            if (localStorage.getItem("dh_appid")) {
                param["appid"] = localStorage.getItem("dh_appid");
            }
            if (localStorage.getItem("dh_openid")) {
                param["openid"] = localStorage.getItem("dh_openid");
            }
            if (localStorage.getItem("dh_cburl")) {
                param["cburl"] = localStorage.getItem("dh_cburl");
            }
            if (localStorage.getItem("dh_reurl")) {
                param["reurl"] = localStorage.getItem("dh_reurl");
            }
            this.channelLogin(param);
        }

        private removeDHItem() {
            if (localStorage.getItem("dh_uid"))
                localStorage.removeItem("dh_uid");
            if (localStorage.getItem("dh_sign"))
                localStorage.removeItem("dh_sign");
            if (localStorage.getItem("dh_nick"))
                localStorage.removeItem("dh_nick");
            if (localStorage.getItem("dh_avatar"))
                localStorage.removeItem("dh_avatar");
            if (localStorage.getItem("dh_sex"))
                localStorage.removeItem("dh_sex");
            if (localStorage.getItem("dh_channel"))
                localStorage.removeItem("dh_channel");
            if (localStorage.getItem("dh_time"))
                localStorage.removeItem("dh_time");
            if (localStorage.getItem("dh_gid"))
                localStorage.removeItem("dh_gid");
            if (localStorage.getItem("dh_appid"))
                localStorage.removeItem("dh_appid");
            if (localStorage.getItem("dh_openid"))
                localStorage.removeItem("dh_openid");
            if (localStorage.getItem("dh_cburl"))
                localStorage.removeItem("dh_cburl");
            if (localStorage.getItem("dh_reurl"))
                localStorage.removeItem("dh_reurl");
        }
        //---------------------- 电魂 --------------------//
        private channelLogin(params: any) {
            let api = "user/login";
            model.getUrlRequestResponse(api, params, Handler.create(this, function (result: any) {
                this.loginModel = result;
                if (this.loginModel.errcode == 0) {
                    GameMain.ISYK = false;
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

        static setChannelRole(){
            if(model.GFChannels.ISQUNHEi){
                localStorage.setItem("role", "5");
            }else if(model.GFChannels.IsHAIWANWAN){
                localStorage.setItem("role", "6");
            }else if(model.GFChannels.IsFALAOMIAO){
                localStorage.setItem("role", "7");
            }else if(model.GFChannels.IsTONGBUTUI){
                localStorage.setItem("role", "8");
            }else if(model.GFChannels.ISLAYA){
                localStorage.setItem("role", "9");
            } else if (model.GFChannels.ISYOUTAN) {
                localStorage.setItem("role", "10");
            } else if (model.GFChannels.ISYOUZU) {
                localStorage.setItem("role", "11");
            } else if (model.GFChannels.ISLBWAN) {
                localStorage.setItem("role", "12");
            } else if (model.GFChannels.ISSISHENSHOU) {
                localStorage.setItem("role", "13");
            } else if (model.GFChannels.ISShOUYOUBANG) {
                localStorage.setItem("role", "15");
            } else if (model.GFChannels.ISNice) {
                localStorage.setItem("role", "17");
            } else if (model.GFChannels.ISBL) {
                localStorage.setItem("role", "18");
            } else if (model.GFChannels.ISJZ) {
                localStorage.setItem("role", "14");
            } else if (model.GFChannels.ISDH) {
                localStorage.setItem("role", "16");
            } else if (model.GFChannels.ISLEGUYU) {
                localStorage.setItem("role", "19");
            }  else {
                localStorage.setItem("role", "0");
            }
        }

        public channelDistLogin() {
            if (GFChannels.ISQUNHEi) {
                this.QHUserLogin();
            } else {
                this.removeQhItem();
            }

            if (GFChannels.IsFALAOMIAO) {
                this.FLMUserLogin();
            } else {
                this.removeFlmItem();
            }

            if (GFChannels.IsHAIWANWAN) {
                this.HWWUserLogin();
            } else {
                this.removeHwwItem();
            }


            if (GFChannels.IsTONGBUTUI) {
                this.TBTUserLogin();
            } else {
                this.removeTbTItem();
            }

            if (GFChannels.ISLAYA) {
                Laya.timer.once(1500, this, this.checkLayaMarket);
            } else {
                this.removeBLItem();
            }

            if (GFChannels.ISYOUTAN) {
                this.YTUserLogin();
            } else {
                this.removeYtItem();
            }
            if (GFChannels.ISYOUZU) {
                this.YZUserLogin();
            } else {
                this.removeYzItem();
            }

            if (GFChannels.ISSISHENSHOU) {
                this.SSSUserLogin();
            } else {
                this.removeSssItem();
            }

            if (GFChannels.ISShOUYOUBANG) {
                this.SYBUserLogin();
            } else {
                this.removeSybItem();
            }

            if (GFChannels.ISNice) {
                this.NiceUserLogin();
            } else {
                this.removeNiceItem();
            }

            if (GFChannels.ISBL) {
                this.BLLogin();
            } else {
                this.removeBLItem();
            }

            if (GFChannels.ISLBWAN) {
                this.LBWanLogin();
            } else {
                this.removeLBWanItem();
            }

            if (GFChannels.ISJZ) {
                this.JZLogin();
            } else {
                this.removeJZItem();
            }

            if (GFChannels.ISDH) {
                this.DHLogin();
            } else {
                this.removeDHItem();
            }

            if (GFChannels.ISLEGUYU) {
                this.LEGUYULogin();
            } else {
                this.removeLEGUYUItem();
            }
            if(!GFChannels.isFromChannel()){
                GameMain.YKLogin();
            }
        }


        static channelPay(diid): boolean {
            let api = "diamond/order";
            if (GFChannels.ISHOOWU) {
                let params = { diid: diid, paytype: "5" };
                model.getUrlRequestResponse(api, params, Handler.create(this, function (result: any) {
                    GFLog(result.pay.payinfo);
                    if (result.errcode == 0) {
                    } else {
                        new view.GFCenterMsgDialog(result.msg);
                    }

                }));
                return true;
            } else if (GFChannels.ISQUNHEi) {
                let params = { diid: diid, paytype: "6" };
                model.getUrlRequestResponse(api, params, Handler.create(this, function (result: any) {
                    GFLog(result.pay.payinfo);
                    if (result.errcode == 0) {
                        window.location.href = result.pay.payinfo;
                    } else {
                        new view.GFCenterMsgDialog(result.msg);
                    }

                }));
                return true;
            } else if (GFChannels.IsFALAOMIAO) {
                let params = { diid: diid, paytype: "8" };
                model.getUrlRequestResponse(api, params, Handler.create(this, function (result: any) {
                    GFLog(result.pay.payinfo);
                    if (result.errcode == 0) {
                        top.location.href = result.pay.payinfo;
                    } else {
                        new view.GFCenterMsgDialog(result.msg);
                    }

                }));
                return true;
            } else if (GFChannels.IsHAIWANWAN) {
                let params = { diid: diid, paytype: "7" };
                model.getUrlRequestResponse(api, params, Handler.create(this, function (result: any) {
                    GFLog(result.pay.payinfo);
                    if (result.errcode == 0) {
                        let payinfo = result.pay.payinfo;
                        laya.utils.Browser.window.Hwwsdk.pay(payinfo.goodsName, payinfo.amount, payinfo.roleName, payinfo.callBackInfo, payinfo.sign);
                    } else {
                        new view.GFCenterMsgDialog(result.msg);
                    }

                }));
                return true;
            } else if (GFChannels.IsTONGBUTUI) {
                let params = { diid: diid, paytype: "9" };
                model.getUrlRequestResponse(api, params, Handler.create(this, function (result: any) {
                    GFLog(result.pay.payinfo);
                    if (result.errcode == 0) {
                        window.location.href = result.pay.payinfo;

                    } else {
                        new view.GFCenterMsgDialog(result.msg);
                    }

                }));
                return true;
            } else if (GFChannels.ISYOUTAN) {
                let params = { diid: diid, paytype: "11" };
                model.getUrlRequestResponse(api, params, Handler.create(this, function (result: any) {
                    GFLog(result.pay.payinfo);
                    if (result.errcode == 0) {
                        window.top.postMessage(JSON.stringify(result.pay.payinfo), '*');
                    } else {
                        new view.GFCenterMsgDialog(result.msg);
                    }

                }));
                return true;

            } else if(GFChannels.ISYOUZU){
                let params = { diid: diid, paytype: "12" };
                model.getUrlRequestResponse(api, params, Handler.create(this, function (result: any) {
                    GFLog(result.pay.payinfo);
                    if (result.errcode == 0) {
                        h5_sdk.charge(result.pay.payinfo)
                    } else {
                        new view.GFCenterMsgDialog(result.msg);
                    }

                }));
                return true;

            }else if(GFChannels.ISSISHENSHOU){
                let params = { diid: diid, paytype: "15" };
                model.getUrlRequestResponse(api, params, Handler.create(this, function (result: any) {
                    GFLog(result.pay.payinfo);
                    if (result.errcode == 0) {
                        window.location.href = result.pay.payinfo;
                    } else {
                        new view.GFCenterMsgDialog(result.msg);
                    }

                }));
                return true;

            }else if(GFChannels.ISShOUYOUBANG){
                let params = { diid: diid, paytype: "16" };
                model.getUrlRequestResponse(api, params, Handler.create(this, function (result: any) {
                    GFLog(result.pay.payinfo);
                    if (result.errcode == 0) {
                        top.location.href = result.pay.payinfo;
                    } else {
                        new view.GFCenterMsgDialog(result.msg);
                    }

                }));
                return true;

            }else if(GFChannels.ISNice){
                let params = { diid: diid, paytype: "18" };
                model.getUrlRequestResponse(api, params, Handler.create(this, function (result: any) {
                    GFLog(result.pay.payinfo);
                    if (result.errcode == 0) {
                        let payinfo = result.pay.payinfo;
                        Nice.pay(payinfo.amount,payinfo.orderId,payinfo.attachment,payinfo.desc,payinfo.sign);
                    } else {
                        new view.GFCenterMsgDialog(result.msg);
                    }

                }));
                return true;

            } else if (GFChannels.ISBL) {
                let params = { diid: diid, paytype: "19" };
                model.getUrlRequestResponse(api, params, Handler.create(this, function (result: any) {
                    GFLog(result.pay.payinfo);
                    if (result.errcode == 0) {
                        let payinfo = result.pay.payinfo;
                        nest.iap.pay(payinfo, function (data) {
                            
                            if (result.result == 0) {
                                new view.GFCenterMsgDialog("支付成功");

                                let api = "user/info";
                                model.getUrlRequestResponse(api, undefined, Handler.create(this, function (result1: any) {
                                    if (result1.errcode == "0") {
                                        model.UserModel = result1.user;
                                        Laya.stage.event(GFOnlyRefreshUserInfo, model.UserModel);

                                        let dialog = new view.GFGameCancelAccount();
                                        dialog.setIsAfterPay(true);
                                        dialog.popup();
                                    }
                                }));
                            }
                            else if (result.result == -1) {
                                new view.GFCenterMsgDialog("你已经取消了支付");
                            }
                            else if (result.result == -3) {
                                new view.GFCenterMsgDialog("登录失效,请重新登录");
                            }
                            else {
                                new view.GFCenterMsgDialog("充值失败，请重新尝试");
                            }
                        })
                    } else {
                        new view.GFCenterMsgDialog(result.msg);
                    }

                }));
                return true;

            } else if (GFChannels.ISLAYA) {
                let params = { diid: diid, paytype: "10" };
                model.getUrlRequestResponse(api, params, Handler.create(this, function (result: any) {
                    GFLog(result.pay.payinfo);
                    if (result.errcode == 0) {
                        let payinfo = result.pay.payinfo;
                        let laya_market = laya.utils.Browser.window.LayaBoxMarket && laya.utils.Browser.window.LayaBoxMarket.getInstance();
                        laya_market.recharge(payinfo, function (param: string) {
                            var result = JSON.parse(param);
                            if (result.result == 0) {
                                new view.GFCenterMsgDialog("支付成功");

                                let api = "user/info";
                                model.getUrlRequestResponse(api, undefined, Handler.create(this, function (result1: any) {
                                    if (result1.errcode == "0") {
                                        model.UserModel = result1.user;
                                        Laya.stage.event(GFOnlyRefreshUserInfo, model.UserModel);

                                        let dialog = new view.GFGameCancelAccount();
                                        dialog.setIsAfterPay(true);
                                        dialog.popup();
                                    }
                                }));
                            }
                            else if (result.result == -1) {
                                new view.GFCenterMsgDialog("你已经取消了支付");
                            }
                            else if (result.result == -3) {
                                new view.GFCenterMsgDialog("登录失效,请重新登录");
                            }
                            else {
                                new view.GFCenterMsgDialog("充值失败，请重新尝试");
                            }
                        });
                    } else {
                        new view.GFCenterMsgDialog(result.msg);
                    }
                }));
                return true;
            } else if (GFChannels.ISLBWAN) {
                let params = { diid: diid, paytype: "13" };
                model.getUrlRequestResponse(api, params, Handler.create(this, function (result: any) {
                    GFLog(result.pay.payinfo);
                    if (result.errcode == 0) {
                        let YLgame = laya.utils.Browser.window.ylGame;
                        let ylgame = new YLgame();
                        ylgame.pay(result.pay.payinfo,"",function(ylresult:any){});
                    }
                }),true);
                return true;
            } else if (GFChannels.ISJZ) {
                let params = { diid: diid, paytype: "14" };
                model.getUrlRequestResponse(api, params, Handler.create(this, function (result: any) {
                    GFLog(result.pay.payinfo);
                    if (result.errcode == 0) {
                        window.location.href = result.pay.payinfo;
                    } else {
                        new view.GFCenterMsgDialog(result.msg);
                    }
                }),true);
                return true;
            } else if (GFChannels.ISDH) {
                let params = { diid: diid, paytype: "17" };
                if (localStorage.getItem("dh_channel")) {
                    params["channel"] = localStorage.getItem("dh_channel");
                }
                if (localStorage.getItem("dh_uid")) {
                    params["tpid"] = localStorage.getItem("dh_uid");
                }
                model.getUrlRequestResponse(api, params, Handler.create(this, function (result: any) {
                    GFLog(result.pay.payinfo);
                    result.pay.payinfo.complete = function () {
                        GFLog('dh complete')
                    }
                    if (result.errcode == 0) {
                        let payinfo = result.pay.payinfo;
                        sdw.chooseSDWPay(payinfo)
                    }
                }), true);
                return true;
            }

            return false;
        }

        static isFromChannel(): boolean {
            return (GFChannels.ISHOOWU || GFChannels.ISQUNHEi || GFChannels.IsFALAOMIAO || GFChannels.IsHAIWANWAN || GFChannels.IsTONGBUTUI || GFChannels.ISLAYA || GFChannels.ISBL
                || GFChannels.ISYOUTAN ||GFChannels.ISLBWAN || GFChannels.ISYOUZU || GFChannels.ISSISHENSHOU || GFChannels.ISJZ || GFChannels.ISShOUYOUBANG || GFChannels.ISNice || GFChannels.ISDH || GFChannels.ISLEGUYU);
        }

    }


}