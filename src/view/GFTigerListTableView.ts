module view {

    import List = Laya.List;
    import Handler = laya.utils.Handler;
    import MovieChip = Laya.MovieClip;
    import Image = Laya.Image;
    export class GFTigerListTableView extends List {
        public selectedCell: GFTigerListtableViewCell;
        constructor() {
            super();
        }
        public setup(data: any): void {
            this.itemRender = GFTigerListtableViewCell;
            this.repeatX = 3;
            this.repeatY = 3;
            this.selectEnable = false;
            this.vScrollBarSkin = "";
            this.renderHandler = new Handler(this, this.updateItem);
            this.array = data;
        }

        private updateItem(cell: GFTigerListtableViewCell, index: number): void {
            if (index < this.array.length) {
                cell.setData();
            }
        }

    }

    import Box = laya.ui.Box;
    import GFTigerItemViewUI = ui.GFTigerItemViewUI;
    export class GFTigerListtableViewCell extends Box {
        public TigerItemView: GFTigerItemViewUI;
        public boxView: GFTigerBoxView;
        private win_point_MovieChip;
        private result_MovieChip;
        private image_card_tips;
        private label_card_tips;

        constructor(parameters) {
            super();
            this.TigerItemView = new GFTigerItemViewUI();
            this.TigerItemView.pos(0, 0);
            this.addChild(this.TigerItemView);

            this.boxView = new GFTigerBoxView();
            this.addChild(this.boxView)
            this.boxView.left = 13;
            this.boxView.top = 75;
            this.boxView.scale(0.38, 0.38);



            this.TigerItemView.btn_grab.on(laya.events.Event.CLICK, this, function () {
                if (this.dataSource.room == undefined) {
                    return;
                }
                Laya.stage.event("ClickTigerListGrabButton", this.dataSource.room.trid);
            });

            this.TigerItemView.image_head.on(laya.events.Event.CLICK, this, function () {
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

        public setData() {
            let data: any = this.dataSource;
            if (data.room == undefined) {
                return;
            }
            this.TigerItemView.label_index.text = data.room.trid + "号";

            if (this.image_card_tips) {
                this.removeChild(this.image_card_tips);
            }
            if (this.label_card_tips) {
                this.removeChild(this.label_card_tips);
            }


            if (data.user == undefined) {//空
                this.TigerItemView.label_tip.color = "#d2b7f8";
                this.TigerItemView.label_tip.text = "本机已爆出" + data.room.total_point + "金币";
                this.TigerItemView.label_other_point.visible = false;
                this.TigerItemView.label_me_point.visible = false;
                this.TigerItemView.btn_grab.visible = true;
                this.TigerItemView.image_me.visible = false;
                this.TigerItemView.image_stroke.visible = false;
                this.TigerItemView.image_head.visible = false;
                this.boxView.visible = false;
                data.play = false;

                this.boxView.reset();
                if (this.win_point_MovieChip != undefined) {
                    this.removeChild(this.win_point_MovieChip);
                }
                if (this.result_MovieChip != undefined) {
                    this.removeChild(this.result_MovieChip);
                }
                this.boxView.finish = undefined;

            } else if (data.user.urid == model.UserModel.urid) {//我
                this.TigerItemView.label_tip.color = "#ffffff";
                this.TigerItemView.label_other_point.visible = false;
                this.TigerItemView.label_me_point.visible = true;
                this.TigerItemView.image_me.visible = true;
                this.TigerItemView.btn_grab.visible = false;
                this.TigerItemView.image_stroke.visible = true;
                this.TigerItemView.image_head.visible = true;
                this.TigerItemView.image_head.skin = data.user.imgurl;
                this.boxView.visible = true;

                if (data.pokers != undefined && data.pokers != null) {
                    if (data.play != undefined && data.play == true) {
                        this.TigerItemView.label_other_point.text = "";
                        this.boxView.startPlay();
                        this.boxView.setPokers(data.pokers);
                        this.boxView.finish = Handler.create(this, this.tigerResultHandler, [data]);
                    } else {
                        this.setWinText(data);
                        this.TigerItemView.label_tip.text = "本机已爆出" + data.room.total_point + "金币";
                        this.boxView.resetPokers(data.pokers);
                    }
                } else {
                    this.setWinText(data);
                    this.TigerItemView.label_tip.text = "本机已爆出" + data.room.total_point + "金币";
                }
                data.play = false;

            } else { //其他人
                this.TigerItemView.label_tip.color = "#d2b7f8";
                this.TigerItemView.label_other_point.visible = true;
                this.TigerItemView.label_me_point.visible = false;

                this.TigerItemView.btn_grab.visible = false;
                this.TigerItemView.image_me.visible = false;
                this.TigerItemView.image_stroke.visible = true;
                this.TigerItemView.image_head.visible = true;
                this.TigerItemView.image_head.skin = data.user.imgurl;
                this.boxView.visible = true;

                if (data.pokers != undefined && data.pokers != null) {
                    if (data.play != undefined && data.play == true) {
                        this.TigerItemView.label_other_point.text = "";
                        this.boxView.startPlay();
                        this.boxView.setPokers(data.pokers);
                        this.boxView.finish = Handler.create(this, this.tigerResultHandler, [data]);
                    } else {
                        this.setWinText(data);
                        this.TigerItemView.label_tip.text = "本机已爆出" + data.room.total_point + "金币";
                        this.boxView.resetPokers(data.pokers);
                    }
                } else {

                    this.setWinText(data);
                    this.TigerItemView.label_tip.text = "本机已爆出" + data.room.total_point + "金币";
                }
                data.play = false;
            }

        }

        private setWinText(data: any) {
            this.TigerItemView.label_me_point.font = "jinbishouru";
            this.TigerItemView.label_other_point.font = "jinbishouru";
            if (data.win == undefined) {
                if (data.user.urid == model.UserModel.urid) {
                    this.TigerItemView.label_me_point.text = "";
                } else {
                    this.TigerItemView.label_other_point.text = "";
                }
            } else {
                if (data.user.urid == model.UserModel.urid) {
                    this.TigerItemView.label_me_point.text = "+"+data.win;
                } else {
                    this.TigerItemView.label_other_point.text = "+"+data.win;
                }
            }
        }
        private tigerResultHandler(data) {

            if (this.dataSource.user == undefined) {
                return;
            }

            this.setWinText(data);
            this.TigerItemView.label_tip.text = "本机已爆出" + data.room.total_point + "金币";
            this.creatWinMovieChip(data);
            this.creatPlayResultAnimation(data.handkind);
        }

        private creatWinMovieChip(data) {
            let win_point_path = "output/tigerHallWinPoint.swf";
            this.win_point_MovieChip = new MovieChip();
            this.win_point_MovieChip.load(win_point_path);
            this.win_point_MovieChip.pos(100, 0);
            this.addChild(this.win_point_MovieChip);
            this.win_point_MovieChip.loop = false;

            this.label_card_tips = new Label();
            this.label_card_tips.fontSize = 22;
            this.label_card_tips.text = data.tips;
            this.label_card_tips.bold = true;
            this.label_card_tips.color = model.getColorWithNumber(11);


            this.win_point_MovieChip.on(laya.events.Event.COMPLETE, this, function () {
                this.removeChild(this.win_point_MovieChip);
            });

        }

        private creatPlayResultAnimation(type: number) {
            let win_point_path = "output/tiger_" + type + ".swf";
            this.result_MovieChip = new MovieChip();
            this.result_MovieChip.load(win_point_path);
            let y: number = 30;

            this.image_card_tips = new Image("comp/image_tishibeishu1.png");


            switch (type) {
                case 0:
                    this.result_MovieChip.pos(10, y - 4);
                    this.result_MovieChip.scale(0.65, 0.65);
                    this.image_card_tips.pos(5, 136);
                    this.label_card_tips.pos(85, 146);
                    playMedia(VoiceType.TigerBaozi);
                    break;
                case 1:
                    this.result_MovieChip.pos(-22, y - 13);
                    this.result_MovieChip.scale(0.59, 0.59);
                    this.image_card_tips.pos(5, 136);
                    this.label_card_tips.pos(85, 146);
                    playMedia(VoiceType.TigerShunjin);
                    break;
                case 2:
                    this.result_MovieChip.pos(10, y);
                    this.result_MovieChip.scale(0.67, 0.67);
                    this.image_card_tips.pos(5, 136);
                    this.label_card_tips.pos(85, 146);
                    playMedia(VoiceType.TigerTonghua);
                    break;
                case 3:
                    this.result_MovieChip.pos(10, y);
                    this.result_MovieChip.scale(0.61, 0.61);
                    this.image_card_tips.pos(5, 136);
                    this.label_card_tips.pos(85, 146);
                    playMedia(VoiceType.TigerShunzi);
                    break;
                case 4:
                    this.result_MovieChip.pos(10, y - 3);
                    this.result_MovieChip.scale(0.63, 0.63);
                    this.image_card_tips.pos(5, 136);
                    this.label_card_tips.pos(85, 146);
                    playMedia(VoiceType.TigerDuizi);
                    break;
                case 5:
                    this.image_card_tips.pos(5, 86);
                    this.label_card_tips.pos(85, 96);
                    playMedia(VoiceType.TigerSanpai);
                    break;
                default:
                    break;
            }

            this.addChild(this.result_MovieChip);
            this.addChild(this.image_card_tips);
            this.addChild(this.label_card_tips);

            Laya.timer.once(2000, this, function () {
                this.removeChild(this.result_MovieChip);
                this.removeChild(this.image_card_tips);
                this.removeChild(this.label_card_tips);
            })

        }

    }

}