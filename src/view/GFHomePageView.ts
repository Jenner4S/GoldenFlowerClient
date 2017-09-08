const GFAddToScreenEvent = "GFAddToScreenEvent";
const GFShowAddToScreenEvent = "GFShowAddToScreenEvent";
const GFRefreshUserInfo = "GFRefreshUserInfo";
const GFRefreshDiamondList = "GFRefreshDiamondList";
const GFOnlyRefreshUserInfo = "GFOnlyRefreshUserInfo";
const GFRefreshActsdList = "GFRefreshActsdList";
/**
 * GFHomePageView 
 */
module view {
    import Tween = laya.utils.Tween;
    import Ease = laya.utils.Ease;
    import RoomInfo = model.GFGroundInfo;
    import user = model.UserModel;
    import Image = Laya.Image;
    import Sprite = Laya.Sprite;
    import Browser = laya.utils.Browser;
    import Rotation = laya.device.motion.RotationInfo;
    import List = Laya.List;

    export class GFHomePageView extends ui.GFGameHomeUI {
        static name = "homepageview";
        static moreBgNodeName = "morebgnode";
        static diamondList: any;
        static clickedWeixinClose:boolean = false;
        static informationDialog;
        static belleDialog: GFBelleDialog;
        static socket: model.GFSocket;
        private actsList: any;
        private roomList: Array<RoomInfo>;
        private popupDisclaimerDialog: number = 0;
        private reminderStr: string = "进场金币不足，请先兑换金币";
        private badgeView: view.UserBadgeView;
        private moreBadgeView: view.UserBadgeView;
        private chargeDialog: ChargeDiamondDialog;
        private actsDialog: GFActsDialog;
        private weixinzhifujson: any;
        private logo: Image;
        private presentPoints;
        private bottomView : Sprite;
        private actsBadge:Laya.Image;
        private enterRoomList: List;
        private white: String;
        private yellow: String;
    
        static connectSocket() {
            if (!GFHomePageView.socket) {
                GFHomePageView.socket = new model.GFSocket();
            }
        }
        constructor(parameters) {
            super();
            laya.utils.Browser.window.MtaH5.clickStat('homepage');
            this.homePageFunnelModelstat();
         
            this.enterRoomList = new List();
            this.enterRoomList.itemRender = EnterRoomItem;
            this.enterRoomList.repeatX = 2;
            this.enterRoomList.width = 960;
            this.enterRoomList.height = 270;
            this.enterRoomList.hScrollBarSkin = "";
            this.enterRoomList.spaceX = 18;
            this.enterRoomList.spaceY = 4;
            this.enterRoomList.selectEnable = true;
            this.enterRoomList.renderHandler = new Handler(this, this.updateItem);
            this.enterRoomList.pos(100, 160);

            this.logo = new Image(model.GFConduitResourceManager.getLoadingIconImage(model.NetWorking.distNumber));
            this.btn_quick_start.skin = model.GFConduitResourceManager.getQuickStartIconImage(model.NetWorking.distNumber);
            this.logo.centerX = 0;
            this.logo.y = 0;
            this.logo.size(140,97);
            this.addChild(this.logo);
            this.showAddtoScreenOnAndroid();
            let app =  localStorage.getItem("app");
            if(app != "1"){
                 this.showGuidePage();
            }else{
                this.image_add_to_screen.visible = false;
                this.image_present_information.visible = false;
            }
               
            this.showWeinxinGuideOnAndroid();
            this.getData();

            GFHomePageView.getDiamondList();
            this.getActsList();
            this.addMsgView();
            this.getUserBadgeValue();
            if (Browser.onMobile && !model.GFConduitResourceManager.shouldHideAddGroupInfo()) {
                this.btn_add_group.visible = true;
            } else {
                this.btn_add_group.visible = false;
            }

            this.onBtnClick();
            this.addBadgeView();
            this.addActsButtonBadge();
           
            if (parameters) {
                if (parameters.user) {
                    this.sendSocketMsg(parameters.user.urid);
                    this.showUserInfo(parameters.user);
                    if(parameters.user.role == 0){
                        this.btn_login.visible = true;
                        this.btn_login.visible = !model.GFConduitResourceManager.showLogin(model.NetWorking.distNumber);
                    }else{
                        this.btn_login.visible = false;
                    }
                }

                this.popupDisclaimerDialog = parameters.popup;
            }

            this.rigisterReceiveEventHandler();

                        //接着微信支付
            this.getWeiXinDiamondOrder();

            this.getLastOrderStatusOnAndroid();

            playBgm();

            Laya.stage.offAll('BeKickedBack');
            Laya.stage.on('BeKickedBack' , this , this.beKickedBack)
        }
        private beKickedBack(roid , isArena) {
            let gameroom ;
            stopBgm();
            if(isArena) {
                gameroom = new GFGameRoom(null , model.GFEntryType.Back , roid , model.GFUserType.Player , model.GFRoomType.Arena);
            }else {
                gameroom = new GFGameRoom(null , model.GFEntryType.Back , roid);
            }
            this.addChild(gameroom);
        }
	
        private updateItem(cell: EnterRoomItem, index: number): void {
            if (index < this.enterRoomList.array.length) {
                cell.setData();
            }
        }

        private homePageFunnelModelstat() {
            laya.utils.Browser.window.MtaH5.clickStat('quanxitongliuch', { 'homepage': 'true' });
            if (Browser.onIOS) {
                laya.utils.Browser.window.MtaH5.clickStat('ioszhuizong', { 'homepage': 'true' });
            } else if (Browser.onAndriod) {
                laya.utils.Browser.window.MtaH5.clickStat('anzhuoliuchengz', { 'homepage': 'true' });
            }
        }        


        private addBottomInformation() {
            if (this.bottomView != null)
                return;
            this.bottomView = new GFBottomInformationView(this.white, this.yellow);
            this.bottomView.pos(0, 588);
            this.bottomView.zOrder = 1000;
            this.addChild(this.bottomView);
        }

        public updateBottomViewZOrder(zOrder: number) {
            if (this.bottomView) {
                this.bottomView.zOrder = zOrder;
                this.bottomView.updateZOrder();
            }
        }

        private showAddToScreenImage() {
            if (Browser.onWeiXin) {
                this.image_add_to_screen.visible = false;
            } else {
                let app = localStorage.getItem("app");
                if (app != "1") {
                    this.image_add_to_screen.visible = true;
                }else{
                    this.image_add_to_screen.visible = false;
                }

            }
        }

        private showAddtoScreenOnAndroid() {
            if (laya.utils.Browser.onAndriod) {
                let showguide = localStorage.getItem("isguideshowed");
                if (showguide == "1") {
                    this.showAddToScreenImage();
                } else {
                    this.image_add_to_screen.visible = false;
                }

                if (localStorage.getItem("isinstalled") == "1") {
                    this.image_present_information.visible = false;
                } else{
                    if(Browser.onWeiXin){
                        this.image_present_information.visible = false;
                    }else{
                          let app = localStorage.getItem("app");
                        if (app != "1") {
                            this.image_present_information.visible = true;
                        }else{
                            this.image_present_information.visible = false;
                        }
                        
                    }
                }
                   
            } else {
                this.image_add_to_screen.visible = false;
                this.image_present_information.visible = false;

            }

        }

        private showGuidePage() {
            if (Browser.onAndriod) {
                if (!Browser.onWeiXin) {
                    let showguide = localStorage.getItem("isguideshowed");
                    if (showguide == "1") {

                    } else {

                        let guideview = new GFGuideView();
                        laya.utils.Browser.window.MtaH5.clickStat('androidguidepage');
                        this.guidePageFunnelModelstat();
                        guideview.zOrder = 80;
                        this.addChild(guideview);
                    }
                }

            }

        }

        private guidePageFunnelModelstat() {
            laya.utils.Browser.window.MtaH5.clickStat('quanxitongliuch', { 'androidguidepage': 'true' });
            if (Browser.onAndriod) {
                laya.utils.Browser.window.MtaH5.clickStat('anzhuoliuchengz', { 'androidguidepage': 'true' });
            }
        } 
        private showWeinxinGuideOnAndroid() {
            if (Browser.onAndriod) {

                if (Browser.onWeiXin) {
                    if (GFHomePageView.clickedWeixinClose) {
                        this.removeChildByName("weixinguide");
                    } else {
                        let guideview = new GFWeiXinGuideView();
                        guideview.name = "weixinguide";
                        guideview.zOrder = 80;
                        this.addChild(guideview);
                    }

                }

            }
        }

        private sendSocketMsg(urid: string) {
            GFLog("sendSocketMsg urid" + urid);
            let action = {
                "action": 1,
                "urid": urid
            }
            GFHomePageView.socket.sendMsg(JSON.stringify(action));

        }

        private rigisterReceiveEventHandler() {
            Laya.stage.on("user_point_changed", this, function (points: any) {
                GFLog("user_point_changed:" + points);
                model.UserModel.point = points;
                this.label_coins.text = points;
                user.pointnums = Number(points);
            });

            Laya.stage.on("receive_arena_challenge", this, function (obj: any) {
                GFLog("receive_arena_challenge:" + obj);
                this.getArenaChallengeInfo(obj.roid, obj.user.urid, obj.content);

            });
            Laya.stage.on("user_receive_message", this, function (roid: any) {
                this.getUserBadgeValue();
            });
            Laya.stage.on("refresh_homepage_badge", this, function (roid: any) {
                this.getUserBadgeValue();
            });

            Laya.stage.on(GFAddToScreenEvent, this, this.addToScreen);
            Laya.stage.on(GFShowAddToScreenEvent, this, this.showAddToScreenImage);
            Laya.stage.on(GFRefreshUserInfo, this, this.updateUserInfo);
            Laya.stage.on(GFOnlyRefreshUserInfo, this, this.onlyUpdateUserInfo);
            Laya.stage.on(GFRefreshDiamondList, this, this.updateDiamondList);
            Laya.stage.on(GFRefreshActsdList, this, this.updateActsList);
        }

        onBtnClick(): void {
            this.img_head.on(laya.events.Event.CLICK, this, this.onHeaderBtnClick);
            //快速开始
            this.btn_quick_start.on(laya.events.Event.CLICK, this, this.onQuickStartBtnClick);
            //充值
            this.btn_recharge.on(laya.events.Event.CLICK, this, this.onRechargeBtnClick);
            //金币
            this.btn_gold_coin.on(laya.events.Event.CLICK, this, this.onGoldenCoinBtnClick);
            //活动
            this.btn_acts.on(laya.events.Event.CLICK, this, this.onActsBtnClick);
            //好友
            this.btn_friends.on(laya.events.Event.CLICK, this, this.onFriendsBtnClick);
            //美女
            this.btn_belle.on(laya.events.Event.CLICK, this, this.onBelleBtnClick);
            //排行
            this.btn_rank.on(laya.events.Event.CLICK, this, this.onRankBtnClick);
            //更多
            this.btn_more.on(laya.events.Event.CLICK, this, this.onMoreBtnClick);

            //加qq群
            this.btn_add_group.on(laya.events.Event.CLICK, this, this.onAddGroupBtnClick);
            //登录
            this.btn_login.on(laya.events.Event.CLICK, this, this.onLoginBtnClick);

            //添加到主屏幕
            this.image_add_to_screen.on(laya.events.Event.CLICK, this, this.addToScreen);

        }

        //进入个人信息
        private onHeaderBtnClick(): void {
            laya.utils.Browser.window.MtaH5.clickStat('headimage');
            GFHomePageView.informationDialog = new GFUserInfomation();
            GFHomePageView.informationDialog.popup();

        }

        //进入游戏
        private enterRoomWithGrid(grid: string) {
            loadRes(GameRoomRes, Handler.create(this, function () {
                stopBgm();
                let room = new GFGameRoom(grid,model.GFEntryType.Normal);
                this.addChild(room);
            }))
        }
        //进入夺宝机
        private configTigerHome() {
            model.getUrlRequestResponse("indiana/imglist", undefined, Handler.create(this, function (result: any) {
                IndianaBGImage.splice(0 ,IndianaBGImage.length)
                for (var obj in result.imglist) {
                    if (result.imglist.hasOwnProperty(obj)) {
                        var element = result.imglist[obj];
                        IndianaBGImage.push(element)
                        if(TigerHome.indexOf(element.imgurl) < 0) {
                            TigerHome.push(element.imgurl)
                        }
                    }
                }
                loadRes(TigerHome, Handler.create(this, function () {
                    BGM(BGMType.Indiana)
                    let aaa = new view.GFTigerIndianaView();
                    this.addChild(aaa);
                }))
            }), true);
        }
        public enterRoom(type:number, index: number) {
            if (type == 4) {
                let needpoints = Number(this.roomList[0].point);
                if (user.pointnums >= needpoints) {
                    // 进入夺宝机
                    this.configTigerHome()
                } else {
                    this.onGoldenCoinBtnClick();
                    new GFCenterMsgDialog("进场金币不足，请先兑换金币");
                }
            } else if (type == 3) {
                let needpoints = Number(this.roomList[1].point);
                if (user.pointnums >= needpoints) {
                    loadRes(TigerHome, Handler.create(this, function () {
                        stopBgm();
                        let tigerHomeView = new view.GFTigerHome();
                        tigerBgm();
                        this.addChild(tigerHomeView);
                    }))
                } else {
                    this.onGoldenCoinBtnClick();
                    new GFCenterMsgDialog("进场金币不足，请先兑换金币");
                }
            } else if (type == 1) {
                //进入初级场 中级场 至尊场
                if (this.roomList && this.roomList[index + 2] && this.roomList[index + 2].point >= 0) {
                    GFLog("need points = " + this.roomList[index + 2].point + "user.pointnums=" + user.pointnums);
                    let needpoints = Number(this.roomList[index + 2].point);
                    if (user.pointnums >= needpoints) {
                        this.enterRoomWithGrid(this.roomList[index + 2].grid);
                    } else {
                        this.onGoldenCoinBtnClick();
                        new GFCenterMsgDialog("进场金币不足，请先兑换金币");
                    }
                    if (index == 0) {
                        laya.utils.Browser.window.MtaH5.clickStat('clickseniorroom');
                    } else if (index == 1) {
                        laya.utils.Browser.window.MtaH5.clickStat('clicksuperroom');
                    } else {
                        laya.utils.Browser.window.MtaH5.clickStat('clicksupermeroom');
                    }
                }
            } else {
                //进入擂台赛
                this.showArenaListDialog();
                laya.utils.Browser.window.MtaH5.clickStat('clickarenaroom');
            }
        }

        private showArenaListDialog() {
            let arenadialog = new GFArenaListDialog("");
            arenadialog.zOrder = 500;
            view.updateBottomViewZOrder(400);
            this.addChild(arenadialog);
        }


        //快速开始
        private onQuickStartBtnClick(): void {
            laya.utils.Browser.window.MtaH5.clickStat('quickstart');
            if (this.roomList && this.roomList.length > 0) {
                if (user.pointnums >= this.roomList[2].point) {
                    //初级场
                    this.enterRoomWithGrid("0");//this.roomList[2].grid
                } else {
                    this.onGoldenCoinBtnClick();
                    new GFCenterMsgDialog("进场金币不足，请先兑换金币");
                }
            }
        }

        public quickStartOutside(): void {
            laya.utils.Browser.window.MtaH5.clickStat('quickstart');
            if (this.roomList && this.roomList.length > 0) {
                if (user.pointnums >= this.roomList[0].point) {
                    //高级场
                    this.quickEnterRoomWithGrid(this.roomList[0].grid);
                } else {
                    this.onGoldenCoinBtnClick();
                    new GFCenterMsgDialog("进场金币不足，请先兑换金币");
                }

            }
        }

        private quickEnterRoomWithGrid(grid: string) {
            loadRes(GameRoomRes, Handler.create(this, function () {
                stopBgm();
                let room = new GFGameRoom(grid,model.GFEntryType.Normal);
                this.addChild(room);
            }))
        }



        //充值
        private onRechargeBtnClick(): void {
            laya.utils.Browser.window.MtaH5.clickStat('clickcharge');
            this.showChargeDialogWithType(0);
        }

        //金币
        private onGoldenCoinBtnClick(): void {
            laya.utils.Browser.window.MtaH5.clickStat('clickcoins');
            this.showChargeDialogWithType(1);
        }

        public showChargeDialogWithType(type: number) {
            if (GFHomePageView.diamondList) {
                GFLog("GFHomePageView.diamondList is not empty");
                if (!this.chargeDialog) {
                    this.chargeDialog = new ChargeDiamondDialog("");
                }
                this.chargeDialog.setTypeAndShowContent(type);
                this.chargeDialog.popup();
            } else {
                GFLog("GFHomePageView.diamondList is empty");
                GFHomePageView.getDiamondList();
                new GFCenterMsgDialog("正在获取数据，请稍后再试！");
            }
        }

        //活动
        private onActsBtnClick(): void {
            laya.utils.Browser.window.MtaH5.clickStat('clickacts');
            this.btn_acts.dataSource = { scaleX: 1.0, scaleY: 1.0 };
            if (this.actsList && this.actsList.errcode == 0) {
                GFLog("this.actsList is not empty"); 
                this.btn_acts.removeChildAt(0);        
                this.actsDialog = new GFActsDialog("");
                this.actsDialog.showContent(this.actsList.list);
                this.actsDialog.popup();
            } else if (this.actsList && this.actsList.errcode == 1) {
                GFLog("this.actsList is not empty---this.actsList.errcode=1");
                this.btn_acts.removeChildAt(0);
                this.actsDialog = new GFActsDialog("");
                this.actsDialog.showNoDataContent(this.actsList.msg);
                this.actsDialog.popup();
            } else {
                GFLog("GFHomePageView.diamondList is empty");
                this.getActsList();
                new GFCenterMsgDialog("正在获取数据，请稍后再试！");
            }
        }

        //好友
        private onFriendsBtnClick(): void {
            laya.utils.Browser.window.MtaH5.clickStat('clickfriend');
            let dialog = new GFFriendListView();
            dialog.popup();
        }

        //美女
        private onBelleBtnClick(): void {
            laya.utils.Browser.window.MtaH5.clickStat('clickbelle');
            GFHomePageView.belleDialog = new GFBelleDialog();
            GFHomePageView.belleDialog.popup();
        }

        //排行
        private onRankBtnClick(): void {
            laya.utils.Browser.window.MtaH5.clickStat('clickrank');
            let dialog = new GFRankView();
            dialog.popup();
        }

        //更多
        private onMoreBtnClick(): void {
            laya.utils.Browser.window.MtaH5.clickStat('clickmore');
            let spMoreDialogBg = new Sprite();
            spMoreDialogBg.size(1136, 640);
            spMoreDialogBg.name = GFHomePageView.moreBgNodeName;
            Laya.stage.addChild(spMoreDialogBg);

            let moreView = new GFMore(this.moreBadgeView.badgeValue);
            spMoreDialogBg.addChild(moreView);
            Tween.to(moreView, { x: 776 }, 400);
            spMoreDialogBg.on(laya.events.Event.CLICK, this, this.hideViewRemoveBg, [moreView]);
        }

        //登录
        private onLoginBtnClick():void{
            if (model.GFChannels.ISHOOWU) {
                let ext = encodeURIComponent('hoowu=1');
                let url = HWURL + ext;
                laya.utils.Browser.window.location.href = url
            } else {
                let loginView = new GFAccountLogin(undefined);
                this.addChild(loginView);
                GFLog('~~~~~~~~~~~~~~~~~')
            }
        }


        private onAddGroupBtnClick(){
            laya.utils.Browser.window.MtaH5.clickStat('addtoqqgroup');
            if(model.GFChannels.ISYOUZU){
                laya.utils.Browser.window.open("mqqapi://card/show_pslcard?src_type=internal&version=1&uin=330973429&card_type=group&source=qrcode","_self");
            }else{
                laya.utils.Browser.window.open("mqqapi://card/show_pslcard?src_type=internal&version=1&uin=622731802&card_type=group&source=qrcode","_self");
            }
            
        }

        private hideViewRemoveBg(moreView) {
            Tween.to(moreView, { x: 1136 }, 400);
            Laya.timer.once(400, this, function () {
                Laya.stage.removeChildByName(GFHomePageView.moreBgNodeName);
            });

        }


        private showPresentInfo(content: string) {
            if (laya.utils.Browser.onAndriod) {
                if (localStorage.getItem("isinstalled") == "1") {
                    this.image_present_information.visible = false;
                } else {
                    if (Browser.onWeiXin) {
                        this.image_present_information.visible = false;
                    } else {
                        let app = localStorage.getItem("app");
                        if (app != "1") {
                            this.image_present_information.visible = true;
                        }else{
                            this.image_present_information.visible = false;
                        }

                    }

                }

            }

            let label: Label = new Label();
            label.fontSize = 18;
            label.bold = true;
            label.text = "赠送" + content + "金币";
            label.color = model.getColorWithNumber(1);
            label.x = 40;
            label.y = 11;
            this.image_present_information.addChild(label);

        }


        private addToScreen() {
            this.showAddToScreenImage();
            
            laya.utils.Browser.window.MtaH5.clickStat('androidaddicon');
            let api = "more/add-icon";
            model.getUrlRequestResponse(api, undefined, Handler.create(this, function (result: any) {
                GFLog(result);

                this.image_present_information.visible = false;


                if (result.errcode == "0") {

                    if (localStorage.getItem("isinstalled") == "1") {
                        window.location.href = "com.zjh://app";//android app协议                       
                        window.location.href = result.url;
                    } else {
                        new GFCenterMsgDialog("已获得" + this.presentPoints + "金币");
                        Laya.timer.once(1500, this, function () {
                            window.location.href = "com.zjh://app";//android app协议                       
                            window.location.href = result.url;
                            localStorage.setItem("isinstalled", "1");
                        });
                    }


                } else {
                    new GFCenterMsgDialog(result.msg);
                }

            }));

        }

        private showUserInfo(userinfo): void {
            this.img_head.dataSource = userinfo.imgurl;
            GFLog(userinfo.name);
            GFLog(userinfo.point);
            if (userinfo.role == 0) {
                this.btn_login.visible = true;
            } else {
                this.btn_login.visible = false;
            }

            
            let subname: string = userinfo.name;
            if (subname.length > 6)
                subname = subname.substring(0, 5) + "...";
            this.label_name.text = subname;
            this.label_coins.text = userinfo.point;
            user.pointnums = Number(userinfo.point);
            if (userinfo.vip > 0) {
                this.img_vip.skin = "comp/image_vip.png";
            } else {
                this.img_vip.skin = "comp/image_vip_zhihui.png";
            }

        }

        private updateUserInfo(): void {
            this.removeChildByName("weixinguide");
            this.getData();
            let userinfo = model.UserModel;
            this.showUserInfo(userinfo);
        }

         private onlyUpdateUserInfo(): void {
            let userinfo = model.UserModel;
            this.showUserInfo(userinfo);
        }

        private addBadgeView() {
            this.badgeView = new view.UserBadgeView();
            this.badgeView.x = this.btn_friends.width - 29;
            this.btn_friends.addChild(this.badgeView);

            this.moreBadgeView = new view.UserBadgeView();
            this.moreBadgeView.x = this.btn_friends.width - 29;
            this.btn_more.addChild(this.moreBadgeView);
        }

        private addActsButtonBadge(){
            this.actsBadge = new Laya.Image();
            this.actsBadge.skin = "comp/image_hongdian1.png";
            this.actsBadge.x = this.btn_acts.width - 29;
            this.btn_acts.addChild(this.actsBadge);
        }

        private getContinuousLoginData(): void {
            let api = "user/login-reward";
            model.getUrlRequestResponse(api, undefined, Handler.create(this, function (result: any) {
                GFLog(result);
                if (result.errcode == "0") {
                    let dialog = new GFContinuousLogin(result);
                    dialog.zOrder = 1001;
                    this.addChild(dialog);
                    // dialog.show();

                }

                if(result.bulletin){
                    let notice = new GFActsNoticeView(result.bulletin);
                    notice.zOrder = 100;
                    this.addChild(notice);
                }

            }));

        }

        private getData(): void {
            let api = "game/ground";

            model.getUrlRequestResponse(api, undefined, Handler.create(this, function (result: any) {
                GFLog(result);
                if (result.errcode == "0") {
                    if (result.tip) {
                        this.showPresentInfo(result.tip);
                        this.presentPoints = result.tip;
                    } else {
                        this.image_present_information.visible = false;
                    }

                    this.roomList = result.ground_list;
                    this.enterRoomList.array = result.ground_list;
                    this.enterRoomList.repeatX = this.enterRoomList.length;
                    this.addChild(this.enterRoomList);

                    let code = result.captcha;
                    if (code) {
                        Laya.loader.load([{ url: "comp/bg_kantuyoujiang.png", type: Loader.IMAGE }], Handler.create(this, function () {
                            let indentifyDialog = new GFIndentifyAward(code, this.popupDisclaimerDialog);
                            indentifyDialog.popup();
                        }))

                    } else {
                        if (this.popupDisclaimerDialog == 1) {
                            let disclaimerDialog = new GFDisClaimerDialog("");
                            disclaimerDialog.popup();
                        } else {
                            this.getContinuousLoginData();
                        }

                    }
                    if (result.white)
                        this.white = result.white;
                    if (result.yellow)
                        this.yellow = result.yellow;
                    if (!model.GFConduitResourceManager.shouldHideAddGroupInfo())
                        this.addBottomInformation();
                }

            }));

        }

        /**
      * 金币列表 
      */
        static getDiamondList(): void {
            let api = "diamond/list";

            model.getUrlRequestResponse(api, undefined, Handler.create(this, function (result: any) {
                GFLog(result);
                if (result.errcode == "0") {
                    GFHomePageView.diamondList = result;
                }
            }));
        }

        private updateDiamondList(): void {
            let api = "diamond/list";

            model.getUrlRequestResponse(api, undefined, Handler.create(this, function (result: any) {
                GFLog(result);
                if (result.errcode == "0") {
                    GFHomePageView.diamondList = result;
                    this.chargeDialog.showContent();
                }
            }));
        }

        
        private updateActsList(): void {
            let api = "activity/index";
            model.getUrlRequestResponse(api, undefined, Handler.create(this, function (result: any) {
                GFLog(result);
                if (result.errcode == "0" || result.errcode == "1") {
                    this.actsList = result;
                    if(this.actsDialog != null){
                        this.actsDialog.updateList(this.actsList.list);
                    }
                }
            }));
        }


        private getActsList(): void {
            let api = "activity/index";
            model.getUrlRequestResponse(api, undefined, Handler.create(this, function (result: any) {
                GFLog(result);
                if (result.errcode == "0" || result.errcode == "1") {
                    this.actsList = result;
                }
            }));
        }

        private getArenaChallengeInfo(roid: any, curid:any, content:any): void {
            let api = "game/challenge-info";
            let params = { "roid": roid ,"curid":curid,"content":content};
            
            model.getUrlRequestResponse(api, params, Handler.create(this, function (result: any) {
                GFLog(result);
                if (result.errcode == 0 || result.errcode == 203) {
                    let dialog = new GFArenaNoticeDialog("");
                    dialog.showContent(result, roid, true);
                    dialog.popup();
                }
            }));
        }

        private getUserBadgeValue() {
            model.getUrlRequestResponse("badge/index", undefined, Handler.create(this, function (result: any) {
                if (result.errcode == 0) {
                    for (var index in result.list) {
                        let keyValue = result.list[index];
                        let key = keyValue.key;
                        let value = keyValue.value;
                        
                        if (key == "index") {
                            this.badgeView.setBadgeValue(value);
                        }else if (key == "cs") {
                            this.moreBadgeView.setBadgeValue(value);
                        }

                    }
                }
            }));
        }

        private addMsgView() {
            let messageView = new view.GFPostMessageView(view.GFPostMessageViewPosition.homepage);
            this.addChild(messageView);
        }



        private getLastOrderStatusOnAndroid(): void {
            if (laya.utils.Browser.onAndriod) {

                if(Browser.onWeiXin){
                    return;
                }          

                let noNeedRemind: string = localStorage.getItem("selectRemindInfo");
                if (noNeedRemind == "1") {
                    return;
                }

                let doid: String = localStorage.getItem("lastDoid");
                GFLog("getLastOrderStatusOnAndroid--lastDoid = " + doid);
                if (doid == undefined) {
                    return;
                }
                localStorage.removeItem("lastDoid");

                let app =  localStorage.getItem("app");
                if(app == "1"){
                    return;
                }
                
                let api = "diamond/check-order";
                let params = { "doid": doid };
                model.getUrlRequestResponse(api, params, Handler.create(this, function (result: any) {
                    GFLog(result);
                    if (result.errcode == 0) {
                        ////在线支付状态(0-未支付; 1-支付成功) 
                        if (result.paystatus == 1) {
                            let dialog = new view.GFGameCancelAccount();
                            dialog.setIsAfterPay(true);
                            dialog.popup();
                        }
                    }
                }));
            }
        }

         /////调用微信JS api 支付  start
        private jsApiCall(): void {
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest',
                this.weixinzhifujson,//json串
                function (res) {
                    WeixinJSBridge.log(res.err_msg);
                }
            );
        }
        
        private callpay() {
            var abc = new Object();
            if (typeof WeixinJSBridge == "undefined") {
                if (document.addEventListener) {
                    document.addEventListener('WeixinJSBridgeReady', this.jsApiCall, false);
                }
                // else if (document.attachEvent) {
                //     document.attachEvent('WeixinJSBridgeReady', this.jsApiCall);
                //     document.attachEvent('onWeixinJSBridgeReady', this.jsApiCall);
                // }
                else {
                    new GFCenterMsgDialog("对不起，暂不支持微信支付！");
                }
            }
            else {
                this.jsApiCall();
            }
        }

        public static getValueByNameFromUrl(url:any, name:any): any {
            var pattern = new RegExp("[?&]" + name + "\=([^&]+)", "g");
            var matcher = pattern.exec(url);
            var items = null;
            if (null != matcher) {
                try {
                    items = decodeURIComponent(decodeURIComponent(matcher[1]));
                } catch (e) {
                    try {
                        items = decodeURIComponent(matcher[1]);
                    } catch (e) {
                        items = matcher[1];
                    }
                }
            }
            return items;
        };


        private getWeiXinDiamondOrder(): void {

            if (!this.chargeDialog) {
                this.chargeDialog = new ChargeDiamondDialog("");
            }

            let money:any = localStorage.getItem("weixinzhifumoney");
            let diid:any = localStorage.getItem("weixinzhifudiid");
            let lasttime:any = localStorage.getItem("weixinzhifutime");
            localStorage.removeItem("weixinzhifumoney");
            localStorage.removeItem("weixinzhifudiid");
            localStorage.removeItem("weixinzhifutime");

            if(!Browser.onWeiXin){
               return;
            }          

            if (diid == undefined) {
                return;
            }

            if(lasttime == undefined){
                 return;
            }

            let time: laya.utils.Timer = new laya.utils.Timer();
            let curtime: number = time.currTimer / 1000;
            let oldtime: number = Number(lasttime);
            //精确到秒，10分钟超时
            if (curtime > oldtime + 600) {
                return;
            }

            let href: string = laya.utils.Browser.window.location.href;
            let code = "";
            if (href) {
               code = GFHomePageView.getValueByNameFromUrl(href, 'code')
            }
            let apipreorder = "diamond/preorder";
            let paramspreorder = { "code": code};
            model.getUrlRequestResponse(apipreorder, paramspreorder, Handler.create(this, function (result: any) {
                if (result.errcode == "0") {
                    let api = "diamond/order";
                    let params = { "diid": diid, "paytype": 4 };

                    model.getUrlRequestResponse(api, params, Handler.create(this, function (result: any) {
                        GFLog(result);                                 
                        if (result.errcode == "0") {
                            this.weixinzhifujson = result.pay.payinfo.jsApiParameters;
                            this.callpay();
                        } else {
                            new GFCenterMsgDialog(result.msg);
                        }
                        
                    }));

                } else {
                    new GFCenterMsgDialog(result.msg);
                }
            }));

       }
        /////调用微信JS api 支付  end  

    }


    export function updateHomepageUserImgUrl(imgrul: any) {
        let home = Laya.stage.getChildByName(GFHomePageView.name);
        (<view.GFHomePageView>home).img_head.dataSource = imgrul;
    }



    export function updateHomepageUserName(name: any) {
        let home = Laya.stage.getChildByName(GFHomePageView.name);
        let subname: string = name;
        if (subname.length > 6)
            subname = subname.substring(0, 5) + "...";
        (<view.GFHomePageView>home).label_name.text = subname;
    }

    export function changeUserToVip() {
        let home = Laya.stage.getChildByName(GFHomePageView.name);
        (<view.GFHomePageView>home).img_vip.skin = "comp/image_vip.png";
    }

    export function showChargeDialogWithType(type: number) {
        let home = Laya.stage.getChildByName(GFHomePageView.name);
        (<view.GFHomePageView>home).showChargeDialogWithType(type);
    }
    export function updateBottomViewZOrder(zorder: number) {
        let home = Laya.stage.getChildByName(GFHomePageView.name);
        (<view.GFHomePageView>home).updateBottomViewZOrder(zorder);
    }

    export function enterRoomWithIndex(type: number, index: number) {
        let home = Laya.stage.getChildByName(GFHomePageView.name);
        (<view.GFHomePageView>home).enterRoom(type, index);
    }

    import Box = laya.ui.Box;
    import RoomItem = ui.GFGameHomeItemUI;
    class EnterRoomItem extends Box {
        private roomItem: RoomItem;

        constructor() {
            super();

            this.roomItem = new RoomItem();
            this.roomItem.pos(0, 0);
            this.addChild(this.roomItem);
            this.roomItem.image_bg.on(laya.events.Event.CLICK, this, this.enter);
        }

        private enter() {
            let info = this.dataSource;
            view.enterRoomWithIndex(info.type, info.level);
        }

        public setData() {
            let info = this.dataSource;
            GFLog("setData: info.url = " + info.url);
            this.roomItem.image_bg.dataSource = info.imgurl;

            if (info.point == 0)
                this.roomItem.label_point.text = "无限制进场";
            else
                this.roomItem.label_point.text = model.getStrNumber(info.point) + "金币可进场";

            if (info.type == 2)
                this.roomItem.label_bet.text = "每局底注至少" + model.getStrNumber(info.bet);
            else
                this.roomItem.label_bet.text = "每局底注" + model.getStrNumber(info.bet) + "金币";
        }
    }

}
