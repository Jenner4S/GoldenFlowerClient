
const GFRefreshPhotoSelf = "GFRefreshPhotoSelf";
const GFRefreshPhotoLife = "GFRefreshPhotoLife";
const GFBelleShowWaitPannel = "GFBelleShowWaitPannel";
const GFBelleHideWaitPannel = "GFBelleHideWaitPannel";

module view {
    import list = laya.ui.List;
    import Handler = laya.utils.Handler;
    let photoSelfUrl: any = null;
    let photoLifeUrl: any = null;
    let isInitialLandscape: boolean = true; //初始状态是否横屏  

    export class GFBelleDialog extends ui.GFBelleDialogUI {
        private latestlist: view.GFBellelLatestTableView = new view.GFBellelLatestTableView();
        private weeklist: view.GFRankTableView = new view.GFRankTableView();
        /**
         * 0--最新认证，1--上周排名，2--本周排名，3--我的认证
         */
        private tabType: number;
        /**
         * 0--认证特权，1--认证说明，2--申请认证
         */
        private cerType: number;
        static haveRegisterClickEvent = false;
        constructor() {
            super();
            this.tabType = 0;
            this.cerType = 0;
            photoLifeUrl = null;
            photoSelfUrl = null;
            this.initViews();
            this.belleTab.selectHandler = new Handler(this, this.onTabSelect);
            this.btn_belle_close.on(laya.events.Event.CLICK, this, this.onDialogClose);
            this.btn_cer_power.on(laya.events.Event.CLICK, this, this.onCerPower);
            this.btn_cer_instruction.on(laya.events.Event.CLICK, this, this.onCerInstruction);
            this.btn_cer_application.on(laya.events.Event.CLICK, this, this.onCerApplication);
            // this.image_life.on(laya.events.Event.CLICK, this, this.onImageLife);
            // this.image_self.on(laya.events.Event.CLICK, this, this.onImageSelf);
            this.btn_day_gift.on(laya.events.Event.CLICK, this, this.onDayGift);
            this.btn_rank_gift.on(laya.events.Event.CLICK, this, this.onRankGift);
            this.btn_app_cer_commit.on(laya.events.Event.CLICK, this, this.onAppCerCommit);
            this.pannel_belle_center_wait.on(laya.events.Event.CLICK, this, this.onBelleCenterWait);

            Laya.stage.on(GFRefreshPhotoSelf, this, this.GFRefreshPhotoSelf);
            Laya.stage.on(GFRefreshPhotoLife, this, this.GFRefreshPhotoLife);
            Laya.stage.on(GFBelleShowWaitPannel, this, this.GFBelleShowWaitPannel);
            Laya.stage.on(GFBelleHideWaitPannel, this, this.GFBelleHideWaitPannel);

            this.onTabSelect(0);
            
            if(!GFBelleDialog.haveRegisterClickEvent){
                GFBelleDialog.haveRegisterClickEvent = true;
                Laya.stage.on("ClickBelleRankItem", this, function (urid: any) {
                    let userDetail = new view.GFUserDetailDialog(urid);
                    userDetail.popup();
                });
            }
        }

        private GFRefreshPhotoSelf() {
            if (photoSelfUrl != undefined && photoSelfUrl != null) {
                this.image_self.skin = photoSelfUrl;
            }
        }

        private GFRefreshPhotoLife() {
            if (photoLifeUrl != undefined && photoLifeUrl != null) {
                this.image_life.skin = photoLifeUrl;
            }
        }

        private GFBelleShowWaitPannel() {
            this.pannel_belle_center_wait.visible = true;
            GFLog("----GFBelleShowWaitPannel---");
        }

        private GFBelleHideWaitPannel() {
            this.pannel_belle_center_wait.visible = false;
            GFLog("----GFBelleHideWaitPannel---");
        }

        private onDialogClose(): void {
            this.removePhotoButtons();
            this.close();
        }

        //认证特权tab
        private onCerPower() {
            this.cerType = 0;
            this.btn_cer_power.selected = true;
            this.btn_cer_instruction.selected = false;
            this.btn_cer_application.selected = false;
            this.showMyCerficationView();
        }

        //认证说明tab
        private onCerInstruction() {
            this.cerType = 1;
            this.btn_cer_power.selected = false;
            this.btn_cer_instruction.selected = true;
            this.btn_cer_application.selected = false;
            this.showMyCerficationView();
        }

        //申请认证tab
        private onCerApplication() {
            this.cerType = 2;
            this.btn_cer_power.selected = false;
            this.btn_cer_instruction.selected = false;
            this.btn_cer_application.selected = true;
            this.showMyCerficationView();
        }

        private onBelleCenterWait() {

        }
        // //修改生活照
        // private onImageLife() {

        // }

        // //修改自拍照
        // private onImageSelf() {

        // }

        //领日奖励
        private onDayGift() {
            let api = "belle/reward-commit";
            let param = { type: 1 };
            model.getUrlRequestResponse(api, param, Handler.create(this, function (result: any) {
                new GFCenterMsgDialog(result.msg);
                if (result.errcode == 0) {
                    this.getBellePrereward();
                }
            }));
        }

        //领排名奖
        private onRankGift() {
            let api = "belle/reward-commit";
            let param = { type: 2 };
            model.getUrlRequestResponse(api, param, Handler.create(this, function (result: any) {
                new GFCenterMsgDialog(result.msg);
                if (result.errcode == 0) {
                    this.getBellePrereward();
                }
            }));
        }

        //申请认证button
        private onAppCerCommit() {
            if (photoLifeUrl == undefined || photoLifeUrl == null) {
                new GFCenterMsgDialog("请上传生活照");
                return;
            }

            if (photoSelfUrl == undefined || photoSelfUrl == null) {
                new GFCenterMsgDialog("请上传自拍照");
                return;
            }

            this.btn_app_cer_commit.disabled = true;
            this.removePhotoButtons();

            let api = "belle/cer-commit";
            let params = { "imglive": photoLifeUrl, "imgself": photoSelfUrl };

            model.getUrlRequestResponse(api, params, Handler.create(this, function (result: any) {
                GFLog(result);
                new GFCenterMsgDialog(result.msg);
                if (result.errcode == 0) {
                    photoLifeUrl = null;
                    photoSelfUrl = null;
                    GFHomePageView.belleDialog.getBelleCertification();
                    GFHomePageView.belleDialog.getBellePrereward();
                } else {
                    if (this.tabType == 3 && this.cerType == 2) {
                        this.btn_app_cer_commit.disabled = false;
                        this.addLifeAndSelfPhotoButton();
                    }
                }
            }));

        }

        private initViews(): void {
            //最新认证
            this.latestlist.width = 720;
            this.latestlist.height = 350;
            this.latestlist.pos(62, 158);
            this.addChild(this.latestlist);

            //上周排行、本周排行
            this.weeklist.width = 720;
            this.weeklist.height = 370;
            this.weeklist.pos(50, 170);
            this.addChild(this.weeklist);

            //我的认证

        }

        private addLifeAndSelfPhotoButton() {
            if (this.btn_app_cer_commit.disabled == true) {
                return;
            }

            this.label_life_shadow.visible = true;
            this.label_self_shadow.visible = true;

            //0--生活照， 1--自拍照
            this.addPhotoButton(-1);
            this.addPhotoButton(0);
            this.addPhotoButton(1);
        }

        private addPhotoButton(phototype: number) {
            var body = laya.utils.Browser.document.body;
            var input = laya.utils.Browser.createElement("input");
            input.type = "file";
            input.id = "photo";
            input.accept = "image/*";
            input.onchange = function (e) {
                var fileSize = 0;
                let byte;
                var name = this.value;
                var fileName = name.substring(name.lastIndexOf(".") + 1).toLowerCase();
                if (fileName != "jpg" && fileName != "jpeg" && fileName != "png") {
                    alert("请选择图片格式文件上传(jpg,jpeg,png等)！");
                    this.value = "";
                    return;
                }
                // fileSize = this.files[0].size;
                // var filePath = this.value;

                // this.file = this.files[0];
                // var size = fileSize / 1024;
                // GFLog("size = " + size + " filePath=" + this.file.path);

                // if (size > 2000) {
                //     alert("附件不能大于2M");
                //     this.value = "";
                //     return;
                // }


                Laya.stage.event(GFBelleShowWaitPannel);


                laya.utils.Browser.window.lrz(this.files[0] , {width : 256 , height : 256 , quality : 0.7})
                    .then(function (rst) {
                        // 处理成功会执行
                        GFLog('---------get new obj')
                        GFLog(rst)

                        var oMyForm = new FormData();
                        //0--生活照， 1--自拍照

                        oMyForm.append("imgurl", rst.file);


                        let url = "http://" + HOST + "/belle/avatar?urid=" + localStorage.getItem("urid") + "&udid=" + localStorage.getItem("udid") + "&role=" + model.UserModel.role;
                        GFLog("  url = " + url + "\n");

                        var oReq = new XMLHttpRequest();
                        oReq.open("POST", url);
                        oReq.send(oMyForm);
                        oReq.onload = function (oEvent) {
                            Laya.stage.event(GFBelleHideWaitPannel);
                            if (oReq.status == 200) {
                                var response = JSON.parse(oReq.response);
                                if (response.errcode == 0) {
                                    if (phototype == 0) {
                                        photoLifeUrl = response.imgurl;
                                        Laya.stage.event(GFRefreshPhotoLife);
                                    } else {
                                        photoSelfUrl = response.imgurl;
                                        Laya.stage.event(GFRefreshPhotoSelf);
                                    }
                                } else {
                                    //传失败
                                    new GFCenterMsgDialog(response.msg);
                                }

                            } else {
                                new GFCenterMsgDialog("上传失败！");
                                GFLog("上传失败！result.errcode ==== " + JSON.stringify(oReq.response));
                            }
                        };

                    })
                    .catch(function (err) {
                        // 处理失败会执行
                        new GFCenterMsgDialog("上传失败！");
                        GFLog("上传失败");
                    })
                    .always(function () {
                        // 不管是成功失败，都会执行
                    });



                


            }
            if(phototype != -1){

            body.appendChild(input);
            }

            var div = laya.utils.Browser.getElementById("layaContainer");
            var mylabel = laya.utils.Browser.createElement("label");
            mylabel.type = "button";
            if(phototype != -1){
                mylabel.innerHTML = "点击修改照片";
            }else{
                mylabel.innerHTML = "";
            }
            if (phototype == 0) {
                mylabel.id = "photolife";
            } else {
                mylabel.id = "photoself";
            }


            let screenWidth = window.screen.width;
            let screenHeight = window.screen.height;


            if (screenWidth > screenHeight) {
                isInitialLandscape = true;
            } else {
                isInitialLandscape = false;
            }



            GFLog("screenWidth=" + screenWidth + "  screenHeight = " + screenHeight);

            let clientWidth = Browser.clientWidth;
            let clientHeight = Browser.clientHeight;

            if (Browser.onIOS) {
                if (clientWidth > clientHeight) {
                    isInitialLandscape = true;
                } else {
                    isInitialLandscape = false;
                }
            }

            GFLog("Browser.clientWidth=" + Browser.clientWidth + "  Browser.clientHeight = " + Browser.clientHeight);

            let fontsize = 28 * clientWidth / 1136;
            if (clientWidth < clientHeight) {
                fontsize = 28 * clientHeight / 1136;
            }

            let xh = clientWidth * 415 / 1136;
            if (phototype == 1) {
                xh = clientWidth * 682 / 1136;
            }
            let yh = clientHeight * 407 / 640;

            let yv = clientHeight * 477 / 1136;
            if (phototype == 1) {
                yv = clientHeight * 744 / 1136;
            }

            let xv = clientWidth * 150 / 640;


            if (clientWidth > clientHeight) {
                GFLog("xh=" + xh + "  yh = " + yh);
                mylabel.setAttribute("style", "color:#ffffff; font-size:" + fontsize + "px; position: fixed; left:" + xh + "px; top:" + yh + "px; z-index: 100010; background:transparent;  border-style:none;");
            } else {
                GFLog("xv=" + xv + "  yv = " + yv);
                mylabel.setAttribute("style", "color:#ffffff; font-size:" + fontsize + "px; position: fixed; left:" + xv + "px; top:" + yv + "px; z-index: 100010; background:transparent;  border-style:none; rotate:90");
                var deg90 = "rotate(90deg)";
                mylabel.style.transform = deg90;
            }

            window.addEventListener('orientationchange', function (event) {
               
                let xh1 = Browser.clientWidth * 415 / 1136;
                if (phototype == 1) {
                    xh1 = Browser.clientWidth * 682 / 1136;
                }
                let yh1 = Browser.clientHeight * 407 / 640;

                let yv1 = Browser.clientHeight * 477 / 1136;
                if (phototype == 1) {
                    yv1 = Browser.clientHeight * 744 / 1136;
                }

                let xv1 = Browser.clientWidth * 150 / 640;

                if (window.orientation == 180 || window.orientation == 0) {
                    if (isInitialLandscape) {
                        mylabel.setAttribute("style", "color:#ffffff; font-size:" + fontsize + "px; position: fixed; left:" + xv1 + "px; top:" + yv1 + "px; z-index: 100010; background:transparent;  border-style:none; rotate:90");
                    } else {
                        mylabel.setAttribute("style", "color:#ffffff; font-size:" + fontsize + "px; position: fixed; left:" + xv + "px; top:" + yv + "px; z-index: 100010; background:transparent;  border-style:none; rotate:90");
                    }
                    var deg90 = "rotate(90deg)";
                    mylabel.style.transform = deg90;
                }
                if (window.orientation == 90 || window.orientation == -90) {
                    if (isInitialLandscape && !Browser.onIOS) {
                        mylabel.setAttribute("style", "color:#ffffff; font-size:" + fontsize + "px; position: fixed; left:" + xh + "px; top:" + yh + "px; z-index: 100010; background:transparent;  border-style:none;");
                    } else {
                        mylabel.setAttribute("style", "color:#ffffff; font-size:" + fontsize + "px; position: fixed; left:" + xh1 + "px; top:" + yh1 + "px; z-index: 100010; background:transparent;  border-style:none;");
                    }
                }
            });

            mylabel.onclick = function (e) {
                input.click();
            }

            if(phototype != -1){
                div.appendChild(mylabel);
            }

        }

        private removePhotoButtons() {
            this.label_life_shadow.visible = false;
            this.label_self_shadow.visible = false;

            var buttonlife = laya.utils.Browser.getElementById("photolife");
            if (buttonlife != undefined && buttonlife != null) {
                buttonlife.parentNode.removeChild(buttonlife);
            }

            var buttonself = laya.utils.Browser.getElementById("photoself");
            if (buttonself != undefined && buttonself != null) {
                buttonself.parentNode.removeChild(buttonself);
            }
        }

        private getBelleRankData() {
            let api = "belle/rank";
            let param = { type: this.tabType, page: 1 };

            model.getUrlRequestResponse(api, param, Handler.create(this, function (result: any) {
                if (result.errcode == 0) {
                    if (this.tabType == 0) {
                        this.latestlist.array = result.list;
                        this.latestlist.refresh();
                    } else {
                        this.label_belle_rank_tip.text = result.tips;
                        this.weeklist.array = result.list;
                        this.weeklist.type = this.tabType;
                        this.weeklist.scrollBar.setScroll(0, 100, 1);
                        this.weeklist.refresh();
                    }
                } else {
                    if (this.tabType == 0) {
                        this.latestlist.visible = false;
                    } else if (this.tabType == 1 || this.tabType == 2) {
                        this.label_belle_rank_tip.visible = false;
                        this.label_belle_gift_rank.visible = false;
                        this.weeklist.visible = false;
                    }

                }
            }));
        }

        public getBellePrereward() {
            let api = "belle/pre-reward";
            model.getUrlRequestResponse(api, undefined, Handler.create(this, function (result: any) {
                if (result.errcode == 0) {
                    this.label_cer_power_flag.text = result.cer;
                    this.label_cer_power_tip.text = "1.头像显示美女标识\n2.每日领" + result.daypoint + "金币(需VIP)\n3.上周排行前20名有大奖";
                    this.label_belle_rank_coin_left.text = result.reward_map;
                    this.label_belle_rank_coin_right.text = result.reward_map2;

                    this.btn_day_gift.visible = true;
                    this.btn_rank_gift.visible = true;

                    if (result.day == 0) {
                        this.btn_day_gift.disabled = true;
                    } else {
                        this.btn_day_gift.disabled = false;
                    }

                    if (result.rank == 0) {
                        this.btn_rank_gift.disabled = true;
                    } else {
                        this.btn_rank_gift.disabled = false;
                    }
                }
            }));
        }

        public getBelleCertification() {

            let api = "belle/certification";
            model.getUrlRequestResponse(api, undefined, Handler.create(this, function (result: any) {
                if (result.errcode == 0) {
                    this.label_cer_times.text = result.tips;
                    this.label_failed_cause.text = result.cause;
                    if (result.imglive != undefined && result.imglive != null && result.imglive != "") {
                        this.image_life.skin = result.imglive;
                    }
                    if (result.imgself != undefined && result.imgself != null && result.imgself != "") {
                        this.image_self.skin = result.imgself;
                    }

                    if (result.status == 2) {
                        this.btn_app_cer_commit.label = "等待审核";
                        this.btn_app_cer_commit.disabled = true;
                        this.removePhotoButtons();
                    } else {
                        this.btn_app_cer_commit.label = "申请认证";
                        this.btn_app_cer_commit.disabled = false;
                        if (this.tabType == 3 && this.cerType == 2) {
                            this.removePhotoButtons();
                            this.addLifeAndSelfPhotoButton();
                        }
                    }
                }
            }));
        }

        private showMyCerficationView() {
            //0--认证特权，1--认证说明，2--申请认证
            this.pannel_cer_tabs.visible = true;
            if (this.cerType == 0) {
                this.label_cer_instruction.visible = false;
                this.pannel_cer_power.visible = true;
                this.pannel_my_app_cer.visible = false;
                this.removePhotoButtons();
            } else if (this.cerType == 1) {
                this.label_cer_instruction.visible = true;
                this.pannel_cer_power.visible = false;
                this.pannel_my_app_cer.visible = false;
                this.removePhotoButtons();
            } else {
                this.label_cer_instruction.visible = false;
                this.pannel_cer_power.visible = false;
                this.pannel_my_app_cer.visible = true;
                this.addLifeAndSelfPhotoButton();
            }
        }

        private onTabSelect(index: number): void {
            //0--最新认证，1--上周排名，2--本周排名，3--我的认证
            switch (index) {
                case 0:  //最新认证
                    this.tabType = 0;
                    this.image_belle_background.skin = "comp/bg_zuixinrenzheng.png";
                    this.latestlist.visible = true;
                    this.weeklist.visible = false;
                    this.label_belle_rank_tip.visible = false;
                    this.label_belle_gift_rank.visible = false;
                    this.pannel_cer_tabs.visible = false;
                    this.label_cer_instruction.visible = false;
                    this.pannel_cer_power.visible = false;
                    this.pannel_my_app_cer.visible = false;
                    this.getBelleRankData();
                    this.removePhotoButtons();
                    break;
                case 1:  //上周排行
                    this.image_belle_background.skin = "comp/bg_meinvpaiming.png";
                    this.tabType = 1;
                    this.latestlist.visible = false;
                    this.weeklist.visible = true;
                    this.label_belle_rank_tip.visible = true;
                    this.label_belle_gift_rank.visible = true;
                    this.label_belle_gift_rank.text = "上周礼物价值";
                    this.pannel_cer_tabs.visible = false;
                    this.label_cer_instruction.visible = false;
                    this.pannel_cer_power.visible = false;
                    this.pannel_my_app_cer.visible = false;
                    this.getBelleRankData();
                    this.removePhotoButtons();
                    break;
                case 2:  //本周排行
                    this.image_belle_background.skin = "comp/bg_meinvpaiming.png";
                    this.tabType = 2;
                    this.latestlist.visible = false;
                    this.weeklist.visible = true;
                    this.label_belle_rank_tip.visible = true;
                    this.label_belle_gift_rank.visible = true;
                    this.label_belle_gift_rank.text = "本周礼物价值";
                    this.pannel_cer_tabs.visible = false;
                    this.label_cer_instruction.visible = false;
                    this.pannel_cer_power.visible = false;
                    this.pannel_my_app_cer.visible = false;
                    this.getBelleRankData();
                    this.removePhotoButtons();
                    break;
                case 3:  //我的认证
                    this.tabType = 3;
                    this.image_belle_background.skin = "comp/bg_woderenzheng.png";
                    this.latestlist.visible = false;
                    this.weeklist.visible = false;
                    this.label_belle_rank_tip.visible = false;
                    this.label_belle_gift_rank.visible = false;
                    this.showMyCerficationView();
                    this.getBelleCertification();
                    this.getBellePrereward();
                    break;
                default:
                    break;

            }

            this.belleTab.selectedIndex = index;

        }

    }
}
