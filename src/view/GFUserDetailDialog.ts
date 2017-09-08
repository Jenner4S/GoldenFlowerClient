module view {
    import Event = laya.events.Event;

    export class GFUserDetailDialog extends ui.GFUserDetailDialogUI {
        private friendInfoResponse:any;
        private badgeView1 = new view.GiftBadgeView();
        private badgeView2 = new view.GiftBadgeView();
        private badgeView3 = new view.GiftBadgeView();
        private badgeView4 = new view.GiftBadgeView();
        private badgeView5 = new view.GiftBadgeView();
        private badgeArray = [this.badgeView1,this.badgeView2,this.badgeView3,this.badgeView4,this.badgeView5];
        private imageArray = [this.image1, this.image2, this.image3, this.image4, this.image5];
        constructor(private urid:any ,private userResponse = undefined,private showLeave = false,private roomID = "") {
            super();
            this.btn_close.on(Event.CLICK, this, this.close);
            this.bg.on(Event.CLICK, this, this.close);
            this.btn_gift.on(Event.CLICK, this, function () {
                this.showGiftWithTyoe(0);
            });
            this.btn_addFriend.on(Event.CLICK, this, function () {
                this.showGiftWithTyoe(1);
            });
            this.btn_leave.on(Event.CLICK,this,this.leaveAction);
            this.addBadgeView();
            Laya.loader.load(["comp/bg_touming.png"],Handler.create(this,function finish(){
                if (userResponse) {
                    this.friendInfoResponse = userResponse;
                    this.setData();
                } else {
                    this.requestData();
                }

            }));
        }

        private addBadgeView() {
            for (var index in this.imageArray) {
                let image = this.imageArray[index];
                let badge = this.badgeArray[index];
                image.addChild(badge);
                badge.y = -10;
                // badge.setBadgeValue(23);
            }
        }

        private requestData(){
            let api = "friend/info";
            let param = {furid:this.urid
                        };
            model.getUrlRequestResponse(api,param,Handler.create(this,function(result:any) {
                this.friendInfoResponse = result;
                if (this.friendInfoResponse.errcode == 0) {
                    this.setData();
                }
            }));
        }
        public setData() {
            if (this.friendInfoResponse) {
                let user = this.friendInfoResponse.user;
                this.user_image.skin = this.friendInfoResponse.user.imgurl;
                this.user_name.text = this.friendInfoResponse.user.name;
                let idStr = this.friendInfoResponse.user.urid;
                this.user_ID.text = "ID：" + idStr;
                this.user_IP.text = "IP地址：" + this.friendInfoResponse.user.ipaddr;
                this.user_point.text = "金币："+ this.friendInfoResponse.user.point;
                this.user_record.text = "战绩：" + this.friendInfoResponse.user.win + "胜 " + this.friendInfoResponse.user.lose + "负";
                this.user_sign.wordWrap = true;
                this.user_sign.text = this.friendInfoResponse.user.sign.length?this.friendInfoResponse.user.sign:"这家伙什么什么也没留下！";
                if (this.friendInfoResponse.user.sex == 1) {//男
                    this.user_sex.skin = "comp/image_nan.png";
                }else if (this.friendInfoResponse.user.sex == 2) {//女
                    this.user_sex.skin = "comp/image_nv.png";
                }
                //add belle tag
                if (user.belle == 1) {
                    this.user_belle.skin = "comp/image_meinv.png";
                }
                if (Number(model.UserModel.urid) == Number(this.urid)) {
                    this.btn_addFriend.visible = false;
                    this.btn_gift.visible = false;
                    this.btn_leave.visible = false;
                } else {
                    // this.showLeave = true;
                    this.btn_gift.visible = true;
                    if (this.friendInfoResponse.sub != 1) {//不是陌生人
                        this.btn_addFriend.visible = true;
                    }
                    if (this.showLeave) {
                        this.btn_leave.visible = true;
                        if (this.friendInfoResponse.sub == 1) { // 如果是好友 width = 180
                            this.btn_leave.centerX = -100;
                            this.btn_gift.centerX = 100;
                        }
                    } else {
                        this.btn_leave.visible = false;
                        if (this.friendInfoResponse.sub == 1) { // 如果是好友
                            this.btn_gift.centerX = 0;
                        } else {
                            this.btn_gift.centerX = -100;
                            this.btn_addFriend.centerX = 100;
                        }
                    }
                }
                //vip
                if (this.friendInfoResponse.user.svip == 1) {//显示 vip
                    this.image_vip.visible = true;
                    this.image_vip.skin = "comp/image_vip" + this.friendInfoResponse.user.vip + ".png";
                } else if (this.friendInfoResponse.user.vip>0){
                    this.image_vip.visible = true;
                    this.image_vip.skin = "comp/image_vip_wu.png";
                }else{
                    this.image_vip.visible = false;
                }

                for (var index in this.friendInfoResponse.gift_list) {
                    var giftModel = this.friendInfoResponse.gift_list[index];
                    let badgeView = this.badgeArray[index];
                    let length = String(giftModel.count).length;
                    let labelWidth = 24;
                    if (length > 1) {
                        labelWidth = (length - 1) * 10 + 30;
                    }
                    badgeView.width = labelWidth;
                    badgeView.x = this.image1.width - labelWidth +5;
                    badgeView.setBadgeValue(giftModel.count);
                    let image = this.imageArray[index];
                    let imageIndex = Number(index)+1;
                    if (giftModel.count>0) {
                        image.skin = "comp/image_yonghuliwu"+imageIndex+".png";
                    }else{
                        image.skin = "comp/image_yonghuliwu"+imageIndex+"_dis.png";
                    }
                }
            }
        }

        private leaveAction(){//请他离开
            let api = "game/pre-kick";
            let params = {"roid":this.roomID,
                            "kurid":this.urid};
            model.getUrlRequestResponse(api, params, Handler.create(this, function (result: any) {
                if (result.errcode <= 1) {
                    this.close();
                }
                if (result.errcode == 0) {
                    let dialog = new view.GFAlmsDialog("要花费"+result.point+"金币请他离开房间。", 1);
                    dialog.certain = Handler.create(this, function () {
                        model.getUrlRequestResponse("game/kick", params, Handler.create(this, function (result: any) {
                            if (result.errcode == 1) {
                                let dialog = new view.GFAlmsDialog(result.msg, 0);
                                dialog.show();
                            } else {
                                if (result.errcode > 0 && result.msg && result.msg.length > 0) {
                                    new view.GFCenterMsgDialog(result.msg);
                                }
                            }
                        }))
                    })
                    dialog.show();
                }else if (result.errcode == 1){
                    let dialog = new view.GFAlmsDialog(result.msg, 0);
                    dialog.show();
                } else {
                    if (result.msg && result.msg.length > 0) {
                        new view.GFCenterMsgDialog(result.msg);
                    }
                }
            }))

        }

        private showGiftWithTyoe(typeNum: number): void {
            GFLog("presentGift");
            type = typeNum;
            let giftView = new GFGiftView();

            model.getUrlRequestResponse("gift/list", undefined, Handler.create(this, function (result: any) {
                if (result.errcode == 0) {
                    giftView.applyDataWith(result.list);//添加数据 @test
                    giftView.popup();
                    giftView.selectedIndexHandler = Handler.create(this, function (index: number) {
                        GFLog("点击了第" + (index) + "个");
                        let giftModel = result.list[index];
                        let gfid = giftModel.gfid;
                        let param,api;
                        if (type == 0) {
                            param = {
                                gfid: gfid,
                                rurid: this.urid
                            };
                            api = "gift/give";
                        } else {
                            param = {
                                gfid: gfid,
                                furid: this.urid
                            };
                            api = "friend/add";
                        }
                        model.getUrlRequestResponse(api, param, Handler.create(this, function (result: any) {
                            if (result.errcode == 0) {
                                // Laya.Dialog.closeAll();
                                giftView.close();
                                this.close();
                                if(type == 1){
                                    Laya.stage.event("AddUserFinish");
                                }
                            }
                        }),true)

                    },undefined,false);
                }
            }))
        }
    }

    /**
     * GFGiftView extends 
     */

    let type: number;
    export class GFGiftView extends ui.GFGiftViewDialogUI {
        public selectedIndexHandler : Handler;
        public buttonArray:Array<Laya.Button>;
        constructor() {
            super();
            GFLog("presentGift");
            this.btn_close.on(Event.CLICK, this, this.close);
            this.buttonArray = [this.btn1,this.btn2,this.btn3,this.btn4,this.btn5];
            for (let i = 0;i<this.buttonArray.length;i++) {
                let btn:Laya.Button = this.buttonArray[i];
                btn.on(Event.CLICK, this, function () {
                    this.selectedIndexHandler.runWith(i);
                });
            }
            let showGift = type ? false : true;
            this.image_gift.visible = showGift;
            this.image_point.visible = !showGift;
        }
        public applyDataWith(array:Array<any>){
            let labelArray = [this.label1,this.label2,this.label3,this.label4,this.label5];
            for (let i = 0;i<array.length;i++) {
                let giftModel = array[i];
                let label:Laya.Label = labelArray[i];
                label.text = giftModel.point;  
                let button = this.buttonArray[i];
                button.skin = "comp/btn_liwu" + (i + 1) + ".png"; 
            }
        }
    }
}