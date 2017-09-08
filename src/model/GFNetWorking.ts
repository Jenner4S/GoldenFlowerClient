module model {
    /**
     * netWorking
     */
    import HttpRequest = laya.net.HttpRequest;
    import Event = laya.events.Event;   
    import Text = laya.display.Text;
    export class NetWorking {
        public request: (result: any) => void;
        static distNumber: number;
        private httpRequest: HttpRequest;
        static tudid: number;
        static loadingApi: Array<string> = [];
        static apiTimeStamp: Array<string> = [];
        private showBadNet : boolean = true;
        constructor(private url: string, private showMsg: boolean = false, private error_continue: boolean = false) {
            this.httpRequest = new HttpRequest();
            this.httpRequest.once(Event.PROGRESS, this, this.onHttpRequestProgress);
            this.httpRequest.once(Event.COMPLETE, this, this.onHttpRequestComplete);
            this.httpRequest.once(Event.ERROR, this, this.onHttpRequestError);
            GFLog("url is " + "\n" + url + "\n");
            this.httpRequest.send(url, null, 'get', 'text');
        }

        private onHttpRequestError(e: any): void {
            this.finish();
            GFLog(e);
        }

        private onHttpRequestProgress(e: any): void {
            GFLog(e)
        }
        private finish(){
            this.showBadNet = false;
            // NetWorking.loadingApi.splice(NetWorking.loadingApi.indexOf(this.url), 1);
            NetWorking.spliceUrl(this.url)
            view.GFBadNetView.close();
        }

        static spliceUrl(url) {
            let index = NetWorking.loadingApi.indexOf(url)
            if(index >= 0) {
                NetWorking.loadingApi.splice(index, 1);
                NetWorking.apiTimeStamp.splice(index, 1);
            }
        }

        static addUrl(url) {
            NetWorking.loadingApi.push(url)
            NetWorking.apiTimeStamp.push(String(Laya.stage.timer.currTimer))
        }

        static searchUrl(url) {
            let index = NetWorking.loadingApi.indexOf(url)
            if(index >= 0) {
                let timeStamp : number = Number(NetWorking.apiTimeStamp[index])
                if (Laya.stage.timer.currTimer - timeStamp > 60000) {
                    NetWorking.loadingApi.splice(index, 1);
                    NetWorking.apiTimeStamp.splice(index, 1);
                    return false
                }else {
                    return true
                }
            }else {
                return false
            }
        }

        private onHttpRequestComplete(e: any): void {
            this.finish()
            let response = JSON.parse(e);
            GFLog(String(e));
            if (response.errcode == 205) {
                localStorage.removeItem("urid");
                localStorage.setItem("role", "0");
                location.reload(true);
            } else if (response.errcode == 202) {
                view.showChargeDialogWithType(1);
                if (this.error_continue) {
                    this.request(response);
                }
                if (response.msg && response.msg.length > 0) {
                    new view.GFCenterMsgDialog(response.msg);
                }
                return;
            }
            if (this.showMsg && response.errcode > 0 && response.msg && response.msg.length > 0) {
                new view.GFCenterMsgDialog(response.msg);
            }
            this.request(response);
        }
        static getDistNumber() {
            if (!NetWorking.distNumber) {
                let href: string = laya.utils.Browser.window.location.href;
                if (href) {
                    let adtag: string = view.GFHomePageView.getValueByNameFromUrl(href, "ADTAG");
                    if (adtag && adtag.length) {
                        NetWorking.distNumber = Number(adtag);
                        localStorage.setItem("dist", adtag);
                        return;
                    } else {
                        let dist: string = view.GFHomePageView.getValueByNameFromUrl(href, "dist");
                        if (dist && dist.length) {
                            NetWorking.distNumber = Number(dist);
                            localStorage.setItem("dist", dist);
                            return;
                        }
                    }
                    NetWorking.distNumber = 0;
                }
            }
        }

        // static setAnroidAppFlag() {
        //     let href: string = laya.utils.Browser.window.location.href;
        //     let app: string = view.GFHomePageView.getValueByNameFromUrl(href, "app");
        //     if (app && app.length) {
        //         localStorage.setItem("app", app);
        //     }
        // }
        static getTudid() {
            if (!NetWorking.tudid) {
                let href: string = laya.utils.Browser.window.location.href;
                if (href) {
                    let tudid: string = view.GFHomePageView.getValueByNameFromUrl(href, "tudid");
                    if (tudid && tudid.length) {
                        NetWorking.tudid = Number(tudid);
                        localStorage.setItem("tudid", tudid);
                        return;
                    }
                }
                NetWorking.tudid = undefined;
            }
            return NetWorking.tudid

        }

        static getSourceID() {
            let href: string = laya.utils.Browser.window.location.href;
            let app: string = view.GFHomePageView.getValueByNameFromUrl(href, "source");
            if (app && app.length) {
                localStorage.setItem("source", app);
            }
        }
        
        static getISApp() {
            let href: string = laya.utils.Browser.window.location.href;
            let app: string = view.GFHomePageView.getValueByNameFromUrl(href, "app");
            if (app && app.length) {
                localStorage.setItem("app", app);
            }
        }


    }






    export function getUrlRequestResponse(api: string, params: any, test: Handler, showMsg?: boolean, error_continue?: boolean) {
        if (api == "user/login") {
            GameMain.ISYK = false;
        }
        let url = model.getUrlWithParams(api, params);

        if(NetWorking.searchUrl(url)) {
            return 
        }else {
            NetWorking.addUrl(url)
            let netWorking = new NetWorking(url, showMsg,error_continue);
            netWorking.request = function (result: any) {
                test.runWith(result);
            }
        }

        // if (NetWorking.loadingApi.indexOf(url) >= 0) {
        //     return
        // } else {
        //     NetWorking.loadingApi.push(url)
        //     let netWorking = new NetWorking(url, showMsg,error_continue);
        //     netWorking.request = function (result: any) {
        //         test.runWith(result);
        //     }
        // }

    }
    export function getUrl(url: string , test : Handler) {

        if(NetWorking.searchUrl(url)) {
            return 
        }else {
            NetWorking.addUrl(url)
            let netWorking = new NetWorking(url);
            netWorking.request = function (result: any) {
                test.runWith(result);
            }
        }

        // if (NetWorking.loadingApi.indexOf(url) >= 0) {
        //     return
        // } else {
        //     NetWorking.loadingApi.push(url)
        //     let netWorking = new NetWorking(url);
        //     netWorking.request = function (result: any) {
        //         test.runWith(result);
        //     }
        // }
    }

    export function getUrlWithParams(api: string, params?: any): string {
        let paramsString: string = "";

        if (localStorage.getItem("udid")) {
            paramsString = paramsString + "udid=" + localStorage.getItem("udid") + "&";
        }

        if (NetWorking.tudid) {
            GFLog("tudid is " + NetWorking.tudid);
            paramsString = paramsString + "tudid=" + NetWorking.tudid + "&";
        }
        if (localStorage.getItem("urid")) {
            paramsString = paramsString + "urid=" + localStorage.getItem("urid") + "&";
        }
        if (localStorage.getItem("source")){
            paramsString = paramsString + "source=" + localStorage.getItem("source") + "&";
        }
        
        if (localStorage.getItem("app")){
            paramsString = paramsString + "app=" + localStorage.getItem("app") + "&";
        }
        //add role
        let role: string = localStorage.getItem("role");
        if (role && Number(role) >= 0) {
            paramsString = paramsString + "role=" + role + "&";
        }
        for (var key in params) {
            paramsString = paramsString + key + "=" + params[key] + "&";
        }
        if (paramsString.substring(paramsString.length - 1, paramsString.length) == "&") {
            paramsString = paramsString.substr(0, paramsString.length - 1);
        }

        //add dist
        if (NetWorking.distNumber) {
            paramsString = paramsString + "&dist=" + NetWorking.distNumber.toString();
        }
        let url = "http://" + HOST + "/" + api + "?" + paramsString;
        return url;
    }
}