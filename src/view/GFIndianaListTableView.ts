module view {

    import List = Laya.List;
    import Handler = laya.utils.Handler;
    import MovieChip = Laya.MovieClip;
    import Image = Laya.Image;
    export class GFIndianaListTableView extends List {
        public selectedCell: GFIndianaListtableViewCell;
        constructor() {
            super();
        }
        public setup(data: any): void {
            this.itemRender = GFIndianaListtableViewCell;
            this.repeatX = 3;
            this.repeatY = 3;
            this.selectEnable = false;
            this.vScrollBarSkin = "";
            this.renderHandler = new Handler(this, this.updateItem);
            this.array = data;
        }

        private updateItem(cell: GFIndianaListtableViewCell, index: number): void {
            if (index < this.array.length) {
                cell.setData();
            }
        }

    }

    import Box = laya.ui.Box;
    import Button = laya.ui.Button;
    import GFIndianaItemViewUI = ui.GFIndianaItemViewUI;
    export class GFIndianaListtableViewCell extends Box {
        public IndianaItemView: GFIndianaItemViewUI;
        public boxView: GFTigerBoxView;
        public btn_grab: Button;
        private result_MovieChip;
        private image_product: Image;
        private image_card_tips;
        private label_card_tips;

        constructor(parameters) {
            super();
            this.IndianaItemView = new GFIndianaItemViewUI();
            this.IndianaItemView.pos(0, 0);
            this.addChild(this.IndianaItemView);

            this.btn_grab = new Button("comp/btn_qiangzhan.png", "");
            this.btn_grab.visible = false;
            this.btn_grab.left = 83;
            this.btn_grab.top = 80;
            this.btn_grab.stateNum = 2;
            this.addChild(this.btn_grab);


            this.btn_grab.on(laya.events.Event.CLICK, this, function () {
                if (this.dataSource.room == undefined) {
                    return;
                }
                Laya.stage.event("ClickIndianaListGrabButton", this.dataSource.room.irid);
            });

            this.IndianaItemView.image_head.on(laya.events.Event.CLICK, this, function () {
                if (this.dataSource.user == undefined) {
                    return;
                }
                if (this.dataSource.user.urid == model.UserModel.urid) {
                    return;
                }
                let userDetail = new view.GFUserDetailDialog(this.dataSource.user.urid);
                userDetail.popup();
            });
        }

        private getBasesWithIndex(index) {
            let obj = IndianaBGImage[index]
            let bases = [{ skin: obj.imgurl, clipX: obj.product.length + 1, clipY: 1, defaultIndex: 0, endIndex: obj.product.length, startIndex: 1 },
                { skin: obj.imgurl, clipX: obj.product.length + 1, clipY: 1, defaultIndex: 0, endIndex: obj.product.length, startIndex: 1 },
                { skin: obj.imgurl, clipX: obj.product.length + 1, clipY: 1, defaultIndex: 0, endIndex: obj.product.length, startIndex: 1 }]
            return bases
        }

        private getBasesWithObj(obj) {
            // let obj = IndianaBGImage[index]
            let bases = [{ skin: obj.imgurl, clipX: obj.product.length + 1, clipY: 1, defaultIndex: 0, endIndex: obj.product.length, startIndex: 1 },
                { skin: obj.imgurl, clipX: obj.product.length + 1, clipY: 1, defaultIndex: 0, endIndex: obj.product.length, startIndex: 1 },
                { skin: obj.imgurl, clipX: obj.product.length + 1, clipY: 1, defaultIndex: 0, endIndex: obj.product.length, startIndex: 1 }]
            return bases
        }

        public setData() {
            let data: any = this.dataSource;
            if (data.room == undefined) {
                return;
            }

            this.IndianaItemView.label_index.text = data.room.irid + "号";
            this.IndianaItemView.image_shadow.visible = false;
            if (this.image_card_tips) {
                this.removeChild(this.image_card_tips);
            }
            if (this.label_card_tips) {
                this.removeChild(this.label_card_tips);
            }

            if (this.boxView != null) {
                this.boxView.visible = false;
                this.boxView.kill();
            }

            this.boxView = new GFTigerBoxView();
            this.addChild(this.boxView)
            this.boxView.left = 13;
            this.boxView.top = 75;
            this.boxView.scale(0.38, 0.38);
            this.boxView.setBox(GFBoxViewType.Indiana, this.getBasesWithIndex(0));

            this.removeChild(this.btn_grab);
            this.addChild(this.btn_grab);

            if (data.user == undefined) {//空
                this.IndianaItemView.label_tip.color = "#d2b7f8";
                this.IndianaItemView.label_tip.text = "今爆出价值" + data.room.total_point + "元宝贝";
                this.IndianaItemView.label_other_point.visible = false;
                this.IndianaItemView.label_me_point.visible = false;
                this.btn_grab.visible = true;
                this.IndianaItemView.image_me.visible = false;
                this.IndianaItemView.image_stroke.visible = false;
                this.IndianaItemView.image_head.visible = false;
                data.play = false;

                this.boxView.setBox(GFBoxViewType.Indiana, this.getBasesWithIndex(0));
                this.boxView.reset();
                if (this.result_MovieChip != undefined) {
                    this.removeChild(this.result_MovieChip);
                }
                this.boxView.finish = undefined;

            } else if (data.user.urid == model.UserModel.urid) {//我
                this.IndianaItemView.label_tip.color = "#ffffff";
                this.IndianaItemView.label_other_point.visible = false;
                this.IndianaItemView.label_me_point.visible = true;
                this.IndianaItemView.image_me.visible = true;
                this.btn_grab.visible = false;
                this.IndianaItemView.image_stroke.visible = true;
                this.IndianaItemView.image_head.visible = true;
                this.IndianaItemView.image_head.skin = data.user.imgurl;

                if (data.result != undefined && data.result != null) {
                    if (data.play != undefined && data.play == true) {
                        this.boxView.setBox(GFBoxViewType.Indiana, this.getBasesWithObj(data.imgobj))
                        this.IndianaItemView.label_other_point.text = "";
                        this.boxView.startPlay();
                        this.boxView.setPokers(data);
                        this.boxView.finish = Handler.create(this, this.indianaResultHandler, [data]);
                    } else {
                        this.boxView.setBox(GFBoxViewType.Indiana, this.getBasesWithObj(data.imgobj))
                        this.setWinText(data);
                        this.IndianaItemView.label_tip.text = "今爆出价值" + data.room.total_point + "元宝贝";
                        this.boxView.resetPokers(data);
                    }
                } else {
                    this.boxView.setBox(GFBoxViewType.Indiana, this.getBasesWithIndex(0));
                    this.setWinText(data);
                    this.IndianaItemView.label_tip.text = "今爆出价值" + data.room.total_point + "元宝贝";
                }
                data.play = false;

            } else { //其他人
                this.IndianaItemView.label_tip.color = "#d2b7f8";
                this.IndianaItemView.label_other_point.visible = true;
                this.IndianaItemView.label_me_point.visible = false;

                this.btn_grab.visible = false;
                this.IndianaItemView.image_me.visible = false;
                this.IndianaItemView.image_stroke.visible = true;
                this.IndianaItemView.image_head.visible = true;
                this.IndianaItemView.image_head.skin = data.user.imgurl;

                if (data.result != undefined && data.result != null) {
                    if (data.play != undefined && data.play == true) {
                        this.IndianaItemView.label_other_point.text = "";
                        this.boxView.setBox(GFBoxViewType.Indiana, this.getBasesWithObj(data.imgobj))
                        this.boxView.startPlay();
                        this.boxView.setPokers(data);
                        this.boxView.finish = Handler.create(this, this.indianaResultHandler, [data]);
                    } else {
                        this.boxView.setBox(GFBoxViewType.Indiana, this.getBasesWithObj(data.imgobj))
                        this.setWinText(data);
                        this.IndianaItemView.label_tip.text = "今爆出价值" + data.room.total_point + "元宝贝";
                        this.boxView.resetPokers(data);
                    }
                } else {
                    this.boxView.setBox(GFBoxViewType.Indiana, this.getBasesWithIndex(0));
                    this.setWinText(data);
                    this.IndianaItemView.label_tip.text = "今爆出价值" + data.room.total_point + "元宝贝";
                }
                data.play = false;
            }

        }

        private setWinText(data: any) {
            this.IndianaItemView.label_me_point.font = "jinbishouru";
            this.IndianaItemView.label_other_point.font = "jinbishouru";
            if (data.win == 1) {
                if (data.user.urid == model.UserModel.urid) {
                    this.IndianaItemView.label_me_point.text = "价值" + data.result[0].price + "元";
                } else {
                    this.IndianaItemView.label_other_point.text = "价值" + data.result[0].price + "元";
                }
            } else {
                if (data.user.urid == model.UserModel.urid) {
                    this.IndianaItemView.label_me_point.text = "";
                } else {
                    this.IndianaItemView.label_other_point.text = "";
                }
            }
        }
        private indianaResultHandler(data) {

            if (this.dataSource.user == undefined) {
                return;
            }

            this.setWinText(data);
            this.IndianaItemView.label_tip.text = "今爆出价值" + data.room.total_point + "元宝贝";
            this.creatPlayResultAnimation(data);
        }


        private creatPlayResultAnimation(data: any) {
            this.result_MovieChip = new MovieChip();
            this.result_MovieChip.load("output/indianahallwin.swf");

            this.image_product = new Image();
            this.image_product.size(68, 68);
            this.image_product.rotation = -15;
            this.image_product.left = 97;
            this.image_product.top = 81;
            this.image_product.skin = data.result[0].imgurl;

            this.label_card_tips = new Label();
            this.label_card_tips.fontSize = 22;
            this.label_card_tips.text = data.tips;
            this.label_card_tips.bold = true;
            this.label_card_tips.color = model.getColorWithNumber(11);


            if (data.win == 1) {
                this.IndianaItemView.image_shadow.visible = true;
                this.image_card_tips = new Image("comp/image_tishibeishu1.png");
                this.label_card_tips.text = "夺宝成功";
                this.addChild(this.result_MovieChip);
                this.addChild(this.image_product);
                playMedia(VoiceType.TigerBaozi);
            } else {
                this.IndianaItemView.image_shadow.visible = false;
                this.image_card_tips = new Image("comp/image_tishishibai.png");
                this.label_card_tips.text = "再接再厉";
            }

            this.result_MovieChip.pos(0, 13);
            this.image_card_tips.pos(5, 136);
            this.label_card_tips.pos(85, 146);


            this.addChild(this.image_card_tips);
            this.addChild(this.label_card_tips);

            Laya.timer.once(2000, this, function () {
                this.removeChild(this.result_MovieChip);
                this.removeChild(this.image_product);
                this.removeChild(this.image_card_tips);
                this.removeChild(this.label_card_tips);
                this.IndianaItemView.image_shadow.visible = false;
            })

        }

    }

}