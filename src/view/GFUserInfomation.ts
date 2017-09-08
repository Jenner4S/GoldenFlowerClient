/**
 * 用户信息页
 * @Author: Zhang chaochao
 * @since 2016-09-09 
 */
const GFPhotoTipsClose = "GFPhotoTipsClose";

module view {
    let sex: number;
    let svip: number;
    let name: string;
    let sign: string;
    let bChanged: boolean;
    let user: any;
    let yPos;

    export class GFUserInfomation extends ui.GFGameUserInformationUI {
        private badgeView1 = new view.GiftBadgeView();
        private badgeView2 = new view.GiftBadgeView();
        private badgeView3 = new view.GiftBadgeView();
        private badgeView4 = new view.GiftBadgeView();
        private badgeView5 = new view.GiftBadgeView();
        private badgeArray = [this.badgeView1, this.badgeView2, this.badgeView3, this.badgeView4, this.badgeView5];

        constructor() {
            super();
            user = null;

            Laya.stage.on(GFPhotoTipsClose, this, this.photoUpload);

            this.setClick();
            this.getUserInfo();
        }

        private setClick(): void {
            this.img_head.on(laya.events.Event.CLICK, this, this.onBtnModifyHeadImg);
            this.btn_close.on(laya.events.Event.CLICK, this, this.onBtnClose);
            this.btn_nan.on(laya.events.Event.CLICK, this, this.onNanBtn);
            this.btn_nv.on(laya.events.Event.CLICK, this, this.onNvBtn);
            this.btn_vip.on(laya.events.Event.CLICK, this, this.onVipBtn);
        }

        public getUserInfo(): void {
            let api = "user/info";
            model.getUrlRequestResponse(api, undefined, Handler.create(this, function (result: any) {
                if (result.errcode == "0") {
                    user = result.user;
                    model.UserModel = result.user;
                    let action = {
                        "action": 1,
                        "urid": model.UserModel.urid
                    }
                    view.GFHomePageView.socket.sendMsg(JSON.stringify(action));
                    Laya.stage.event(GFOnlyRefreshUserInfo, model.UserModel);

                    this.img_head.dataSource = result.user.imgurl;
                    sex = result.user.sex;
                    if (1 == result.user.sex)
                        this.img_sex.skin = "comp/image_nan.png";
                    else if (2 == result.user.sex)
                        this.img_sex.skin = "comp/image_nv.png";

                    if (0 == result.user.vip)
                        this.img_level.skin = "comp/image_vip_dis.png";
                    else
                        this.img_level.skin = "comp/image_vip" + result.user.vip + ".png";

                    if (1 == result.user.belle)
                        this.img_meinv.visible = true;
                    else
                        this.img_meinv.visible = false;

                    if (result.vip_tips == "" || result.vip_tips == null)
                        this.label_progress.text = "0/10";
                    else
                        this.label_progress.text = result.vip_tips;

                    this.input_name.text = result.user.name;
                    this.label_ID.text = result.user.id;
                    this.label_IP.text = result.user.ipaddr;
                    this.label_diamonds.text = result.user.diamond;
                    this.label_coins.text = result.user.point;
                    this.label_win_lose.text = result.user.win + "胜   " + result.user.lose + "负";
                    if (result.user.sign == "")
                        this.input_sign.text = "签名：这家伙很懒，什么都没有留下";
                    else
                        this.input_sign.text = "签名：" + result.user.sign;
                    if (1 == result.user.sex) {
                        this.btn_nan.selected = true;
                        this.btn_nv.selected = false;
                    } else if (2 == result.user.sex) {
                        this.btn_nan.selected = false;
                        this.btn_nv.selected = true;
                    }

                    svip = result.user.svip;
                    if (1 == result.user.svip) {
                        this.btn_vip.selected = false;
                    } else if (2 == result.user.svip) {
                        this.btn_vip.selected = true;
                    }

                    if (result.user.vip > 0) {
                        this.btn_vip.visible = true;
                        this.label_vip.visible = true;
                    } else {
                        this.btn_vip.visible = false;
                        this.label_vip.visible = false;
                    }

                    let imgArray: Array<Laya.Image> = [this.img_gift1, this.img_gift2, this.img_gift3, this.img_gift4, this.img_gift5];
                    let imgurls = [result.gift_list[0].imgurl,
                        result.gift_list[1].imgurl,
                        result.gift_list[2].imgurl,
                        result.gift_list[3].imgurl,
                        result.gift_list[4].imgurl];
                    let counts = [result.gift_list[0].count,
                        result.gift_list[1].count,
                        result.gift_list[2].count,
                        result.gift_list[3].count,
                        result.gift_list[4].count];
                    for (let i = 0; i < imgArray.length; i++) {
                        imgArray[i].dataSource = imgurls[i];

                        let length = String(counts[i]).length;
                        let labelWidth = 24;
                        if (length > 1) {
                            labelWidth = (length - 1) * 10 + 30;
                        }

                        let badge = this.badgeArray[i];
                        badge.width = labelWidth;
                        badge.x = this.img_gift1.width - labelWidth + 5;

                        if (yPos == null) {
                            yPos = badge.y;
                        }
                        badge.y = yPos - 10;
                        badge.setBadgeValue(counts[i]);

                        if (counts[i] > 0)
                            imgArray[i].addChild(badge);
                    }
                }
            }));
        }

        //修改头像
        private onBtnModifyHeadImg(): void {
            let dialog = new GFModifyHeaderImg();
            dialog.popup();
        }

        public refreshHeadImage(url: string): void {
            this.img_head.dataSource = url;
        }

        private onNanBtn(): void {
            this.btn_nan.selected = true;
            this.btn_nv.selected = false;
            this.img_sex.skin = "comp/image_nan.png";
            sex = 1;
        }

        private onNvBtn(): void {
            this.btn_nan.selected = false;
            this.btn_nv.selected = true;
            this.img_sex.skin = "comp/image_nv.png";
            sex = 2;
        }

        private onVipBtn(): void {
            if (1 == svip) {
                svip = 2;
                this.btn_vip.selected = true;
            } else if (2 == svip) {
                svip = 1;
                this.btn_vip.selected = false;
            }
        }

        private onBtnClose(): void {
            if (user == null) {
                this.close();
                return;
            }

            if (user.imgurl == this.img_head.dataSource &&
                user.svip == svip &&
                user.name == this.input_name.text &&
                user.sex == sex &&
                user.sign == this.input_sign.text.replace("签名：", ""))
                bChanged = false;
            else
                bChanged = true;

            let inputSign = this.input_sign.text.replace("签名：", "");
            let name = this.input_name.text;

            if (inputSign == null || inputSign == "")
                inputSign = "这家伙很懒，什么都没有留下";
            if (name == null || name.trim() == "")
                this.input_name.text = user.name;

            if (user.imgurl != this.img_head.dataSource)
                view.updateHomepageUserImgUrl(this.img_head.dataSource);
            // if (user.name != this.input_name.text)
            view.updateHomepageUserName(this.input_name.text);
            if (bChanged) {
                let api = "user/edit";
                let params;
                params = {
                    name: this.input_name.text,
                    imgurl: this.img_head.dataSource,
                    sex: sex,
                    sign: inputSign,
                    svip: svip
                };

                model.getUrlRequestResponse(api, params, Handler.create(this, function (result: any) {
                    if (result.errcode == "0") {
                        this.close();
                    } else if (result.errcode == "206") {
                        this.labl_name_tip.text = result.name_repeat;
                    } else {
                        // 提交失败
                        new GFCenterMsgDialog(result.msg);
                    }
                }));
            } else {
                this.close();
            }
        }

        private photoUpload(): void {
            view.updatePhotoImageHead();
        }

    }

    export function updateImageHead(url: string) {
        GFHomePageView.informationDialog.refreshHeadImage(url);
    }

    export function updatePhotoImageHead() {
        GFHomePageView.informationDialog.getUserInfo();
    }
}
