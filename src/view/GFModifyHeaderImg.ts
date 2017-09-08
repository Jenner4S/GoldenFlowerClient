/**
 * 修改头像页
 * @Author: Zhang chaochao
 * @since 2016-09-12 
 */
let number;

module view {

    export class GFModifyHeaderImg extends ui.GFModifyHeaderImgUI {
        constructor() {
            super();

            this.onBtnClick();
            this.getData();
        }

        private onBtnClick(): void {
            this.btn_close.on(laya.events.Event.CLICK, this, this.onBtnClose);
            this.img_head1.on(laya.events.Event.CLICK, this, this.onHeader1Click);
            this.img_head2.on(laya.events.Event.CLICK, this, this.onHeader2Click);
            this.img_head3.on(laya.events.Event.CLICK, this, this.onHeader3Click);
            this.img_head4.on(laya.events.Event.CLICK, this, this.onHeader4Click);
            this.img_head5.on(laya.events.Event.CLICK, this, this.onHeader5Click);
            this.img_head6.on(laya.events.Event.CLICK, this, this.onHeader6Click);
            this.img_head7.on(laya.events.Event.CLICK, this, this.onHeader7Click);
            this.img_head8.on(laya.events.Event.CLICK, this, this.onHeader8Click);
            this.img_head9.on(laya.events.Event.CLICK, this, this.onHeader9Click);
            this.img_head10.on(laya.events.Event.CLICK, this, this.onHeader10Click);

            this.btn_photo.on(laya.events.Event.CLICK, this, this.onBtnPhoto);
        }

        private getData(): void {
            let api = "user/avatar";

            model.getUrlRequestResponse(api, undefined, Handler.create(this, function (result: any) {
                if (result.errcode == "0") {
                    this.urllist = result.list;
                    this.label_tip.text = result.tips;
                    number = result.number;
                    this.img_head1.dataSource = this.urllist[0].imgurl;
                    this.img_head2.dataSource = this.urllist[1].imgurl;
                    this.img_head3.dataSource = this.urllist[2].imgurl;
                    this.img_head4.dataSource = this.urllist[3].imgurl;
                    this.img_head5.dataSource = this.urllist[4].imgurl;
                    this.img_head6.dataSource = this.urllist[5].imgurl;
                    this.img_head7.dataSource = this.urllist[6].imgurl;
                    this.img_head8.dataSource = this.urllist[7].imgurl;
                    this.img_head9.dataSource = this.urllist[8].imgurl;
                    this.img_head10.dataSource = this.urllist[9].imgurl;
                }
            }));
        }

        private onBtnClose(): void {
            this.close();
        }

        private onHeader1Click(): void {
            view.updateImageHead(this.img_head1.dataSource);
            this.close();
        }

        private onHeader2Click(): void {
            view.updateImageHead(this.img_head2.dataSource);
            this.close();
        }

        private onHeader3Click(): void {
            view.updateImageHead(this.img_head3.dataSource);
            this.close();
        }

        private onHeader4Click(): void {
            view.updateImageHead(this.img_head4.dataSource);
            this.close();
        }

        private onHeader5Click(): void {
            view.updateImageHead(this.img_head5.dataSource);
            this.close();
        }

        private onHeader6Click(): void {
            view.updateImageHead(this.img_head6.dataSource);
            this.close();
        }

        private onHeader7Click(): void {
            view.updateImageHead(this.img_head7.dataSource);
            this.close();
        }

        private onHeader8Click(): void {
            view.updateImageHead(this.img_head8.dataSource);
            this.close();
        }

        private onHeader9Click(): void {
            view.updateImageHead(this.img_head9.dataSource);
            this.close();
        }

        private onHeader10Click(): void {
            view.updateImageHead(this.img_head10.dataSource);
            this.close();
        }

        private onBtnPhoto(): void {
            if(number == 0) {
                new GFCenterMsgDialog("更换次数已达上限");
                return ;
            }

            let photoTipsDialog = new GFPhotoTips();
            photoTipsDialog.popup();
            
            this.close();
        }

    }
}