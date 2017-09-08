module view {
    import Image = Laya.Image;
    import Button = Laya.Button;
    import BitmapFont = Laya.BitmapFont;
    import Tween = laya.utils.Tween;
    import Label = laya.ui.Label;
    import Animation = laya.display.Animation;
    import MovieChip = Laya.MovieClip;
    import TimeLine = laya.utils.TimeLine;
    import GFPlayer = model.GFPlayer;
    export class GFTigerBaseView extends Laya.Sprite {
        response : any;
        backButton: Button;
        goldButton: Button;
        bg_image: Image;
        continueButton: Button;
        isContinueBet: boolean;//连续下注
        changedButton: Button;
        chipView: GFTigerChipView;
        gameHallButton: Button;
        isGoing : boolean = false;
        goToHall : boolean = false;

        userInfoView : GFSlotUserInfoView;
        // tiger
        tigerBg: Image = new Image();
        playButton : Button = new Button();
        boxView : GFTigerBoxView 
        mutipleBg : Image = new Image()
        mutipleLabel : Label = new Label();
        bgLight : Animation = new Animation();
        tigerIndexLabel : Label = new Label()
        tigerInfoLabel1 : Label = new Label()
        tigerInfoLabel2 : Label = new Label()
        tigerNotice : Label = new Label()
        tigerNoticeL : Label = new Label()
        tigerNoticeR : Label = new Label()
        playGuide : Image = new Image()
        timeLine : TimeLine = new TimeLine();
        mBitmapFont:Laya.BitmapFont = new Laya.BitmapFont();

        constructor() {
            super();
            this.mBitmapFont.loadFont("comp/jinbishouru1.fnt", new Handler(this, function () {
                this.setup()
                this.requestDataWithType(0);
                Laya.stage.on("GrabTiger", this, function (result: any) {
                    this.complete(result);
                    this.continueButton.skin = "comp/btn_jinhu_lianxu1.png";
                    this.boxView.reset()
                    this.tigerNoticeR.text = ''
                })
                Laya.stage.on("GrabIndiana", this, function (result: any) {
                    this.complete(result);
                    this.continueButton.skin = "comp/btn_jinhu_lianxu1.png";
                    this.boxView.reset()
                    this.tigerNoticeR.text = ''
                })
                Laya.stage.on("user_point_changed", this, function (points: any) {
                    if (!this.isGoing) {
                        this.chipView.refresh();
                        this.userInfoView.event(GFSlotUserPointUpdateEvent, points);
                    }
                });

                Laya.Text.registerBitmapFont("jinbishouru", this.mBitmapFont);
                this.mBitmapFont.autoScaleSize = true;
            }));
        }

        public setup() {
            this.boxView = new GFTigerBoxView()

            //add bg_image
            this.size(1136, 640);
            this.bg_image = new Image("comp/bg_jinhuji1.png");
            this.bg_image.size(1136, 640);
            this.bg_image.mouseThrough = false;
            this.addChild(this.bg_image);
            this.addChild(this.tigerBg)
            this.tigerBg.size(696 , 404)
            this.tigerBg.bottom = 106
            this.tigerBg.loadImage('comp/image_dajinhuji.png')
           

            //add back Button
            this.backButton = new Button("comp/btn_jinhu_fanhui.png","");
            this.backButton.pos(14,46);
            this.backButton.size(160,86);
            this.backButton.stateNum = 2;
            this.addChild(this.backButton);
            this.backButton.on(laya.events.Event.CLICK,this,this.back);

            // add goldButton
            this.goldButton = new Button("comp/btn_jinhu_jinbi1.png","");
            this.goldButton.pos(this.width - 200 - 14,46);
            this.goldButton.size(200,86);
            this.goldButton.stateNum = 2;
            this.addChild(this.goldButton);
            this.goldButton.on(laya.events.Event.CLICK,this,function(){
                view.showChargeDialogWithType(1);
            });
            //add continue Button
            this.continueButton = new Button("comp/btn_jinhu_lianxu1.png","");
            this.continueButton.pos(14,this.height-50-86);
            this.continueButton.size(200,86);
            this.continueButton.stateNum = 2;
            this.continueButton.disabled = true;
            this.addChild(this.continueButton);
            this.continueButton.on(laya.events.Event.CLICK,this,this.continueBet);

            //add chip List
            this.chipView = new view.GFTigerChipView();
            this.chipView.pos(this.continueButton.x+ this.continueButton.width +4,this.continueButton.y);
            this.chipView.size(120*5+16,86);
            this.chipView.selectedHandler = Handler.create(this,this.chipViewSelectedIndex,undefined,false);
            this.addChild(this.chipView);

            //add changedButton 
            this.changedButton = new Button("comp/btn_jinhu_huanji.png","");
            this.changedButton.pos(this.chipView.x+ this.chipView.width +4,this.continueButton.y);
            this.changedButton.size(140,86);
            this.changedButton.stateNum = 2;
            this.addChild(this.changedButton);
            this.changedButton.on(laya.events.Event.CLICK,this,this.changedGame);

            //add gameHallButton 
            this.gameHallButton = new Button("comp/image_jinrudating.png","");
            this.gameHallButton.pos(this.width - 6 - 142,this.height - 28 - 152);
            this.gameHallButton.size(142,152);
            this.gameHallButton.stateNum = 1;
            this.addChild(this.gameHallButton);
            this.gameHallButton.on(laya.events.Event.CLICK,this,this.gameHall);

            //add user info view
            this.userInfoView = new GFSlotUserInfoView();
            this.userInfoView.left = 20;
            this.userInfoView.size(170,300);
            this.addChild(this.userInfoView);

            this.tigerBg.addChild(this.boxView)
            this.boxView.top = 124
            this.boxView.left = 70;

            this.tigerBg.addChild(this.playButton);
            this.playButton.skin = 'comp/btn_xiazhu.png';
            this.playButton.on(laya.events.Event.CLICK , this , this.playTiger)
            this.playButton.size(80 , 130)
            this.playButton.top = 36;
            this.playButton.right = -4;
            this.playButton.stateNum = 1;

            this.tigerBg.addChild(this.mutipleBg)
            this.mutipleBg.size(76 , 180)
            this.mutipleBg.bottom = 96
            this.mutipleBg.left = 497

            this.mutipleBg.addChild(this.mutipleLabel)
            this.mutipleLabel.fontSize = 46
            this.mutipleLabel.color = '#ffffff'
            this.mutipleLabel.bold = true;
            this.mutipleLabel.top = 60
            this.mutipleLabel.width = 76
            this.mutipleLabel.align = 'center'

            this.tigerBg.addChild(this.bgLight);
            this.bgLight.size(592 , 356)
            this.bgLight.pos(20 , -4)
            this.bgLight.loadImages(['comp/bg_jinhudeng1.png','comp/bg_jinhudeng2.png'])
            this.bgLight.interval = 300
            this.bgLight.index = 1;

            this.tigerBg.addChild(this.tigerIndexLabel)
            this.tigerIndexLabel.fontSize = 20
            this.tigerIndexLabel.color = '#ffffff'
            this.tigerIndexLabel.bold = true
            this.tigerIndexLabel.top = 30
            this.tigerIndexLabel.right = 123
            this.tigerIndexLabel.align = 'right'
            this.tigerIndexLabel.width = 300

            this.tigerBg.addChild(this.tigerInfoLabel1)
            this.tigerBg.addChild(this.tigerInfoLabel2)
            this.tigerInfoLabel1.top = 36
            this.tigerInfoLabel1.left = 71
            this.tigerInfoLabel1.text = '本机今日已爆出价值'
            this.tigerInfoLabel1.fontSize = 22
            this.tigerInfoLabel1.color = '#ffffff'
            this.tigerInfoLabel1.width = 160
            this.tigerInfoLabel2.top = 36
            this.tigerInfoLabel2.left = 270
            this.tigerInfoLabel2.fontSize = 22
            this.tigerInfoLabel2.color = '#fff193'
            this.tigerInfoLabel2.bold = true
            this.tigerInfoLabel2.width = 300

            this.tigerBg.addChild(this.tigerNotice)
            this.tigerNotice.text = '请下注...'
            this.tigerNotice.width = 300
            this.tigerNotice.top = 80
            this.tigerNotice.align = 'center'
            this.tigerNotice.fontSize = 24
            this.tigerNotice.bold = true
            this.tigerNotice.color = '#a0c4ff'
            this.tigerNotice.centerX = -33

            this.tigerBg.addChild(this.tigerNoticeL)
            this.tigerNoticeL.width = 300
            this.tigerNoticeL.top = 80
            this.tigerNoticeL.align = 'right'
            this.tigerNoticeL.fontSize = 24
            this.tigerNoticeL.bold = true
            this.tigerNoticeL.color = '#a0c4ff'
            this.tigerNoticeL.right = 381
            this.tigerNoticeL.text = ''

            this.tigerBg.addChild(this.tigerNoticeR)
            this.tigerNoticeR.width = 300
            this.tigerNoticeR.top = 80
            this.tigerNoticeR.align = 'left'
            this.tigerNoticeR.fontSize = 24
            this.tigerNoticeR.bold = true
            this.tigerNoticeR.color = '#ffcc19'
            this.tigerNoticeR.left = 320
            this.tigerNoticeR.text = ''

            let messageView = new view.GFPostMessageView(GFPostMessageViewPosition.tigerbox);
            this.addChild(messageView);

            this.tigerBg.addChild(this.playGuide)
            this.playGuide.size(116 , 58)
            this.playGuide.loadImage('comp/image_jinhu_jiantou1.png')
            this.playGuide.top = 42
            this.playGuide.right = 90

            this.timeLine.addLabel('left',0).to(this.playGuide , { right : 120 } , 500).addLabel('right',0).to( this.playGuide , {right : 90} , 500);

            this.bgLight.play();

            this.tigerGuideStop()

            this.tigerDrop();
            Laya.stage.offAll('GFTigerBoxChange')
            Laya.stage.on('GFTigerBoxChange' , this , this.changeTigerBox);
            Laya.stage.on('GFIndianaBoxChange' , this , this.changeTigerBox);

        }
        public back (){

        }

         //连续下注 btn_jinhu_quxiaolianxu.png
        public continueBet(){
            this.isContinueBet = !this.isContinueBet;
            this.continueButton.selected = !this.continueButton.selected;
            this.playButton.offAll(laya.events.Event.CLICK)
            if (this.continueButton.selected){
                this.playButton.on(laya.events.Event.CLICK , this , function() {})
                this.continueButton.skin = "comp/btn_jinhu_quxiaolianxu.png";
            }else{
                this.playButton.on(laya.events.Event.CLICK , this , this.playTiger)
                this.continueButton.skin = "comp/btn_jinhu_lianxu1.png";
            }
        }
        public chipViewSelectedIndex(index:number){
            this.tigerGuidePlay();
        }
        public tigerGuidePlay() {
            this.playGuide.visible = true;
            this.playGuide.right = 90
            this.timeLine.gotoLabel('left')
            this.timeLine.play(0 , true);
        }
        public resetTigerBox() {
            this.isGoing = false
            this.chipView.isGame = false;
            stopMedia(VoiceType.TigerPlay)
            stopMedia(VoiceType.TigerScroll)
            this.mutipleLabel.text = 'N'
            this.tigerIndexLabel.text = this.response.room.trid + '号金虎机'
            this.boxView.reset();
            this.tigerInfoLabel2.text = this.response.room.total_point + '金币'
            // this.tigerNotice.visible = true;
            this.tigerNotice.text = '请下注...'
            this.tigerNoticeL.text = '';
            this.tigerNoticeR.text = '';
            let chip = this.chipView.selectedCell
            if (chip && model.UserModel.point >= this.response.chip[0]) {
                this.tigerGuidePlay();
            }
            // this.changedButton.disabled = true;
            // this.timer.once(1000, this, function () {
            //     this.changedButton.disabled = false;
            // });
        }
         public changedGame() {
             if (this.isContinueBet) {
                 new GFCenterMsgDialog('先取消连续下注，回合结束了才能换机噢')
             } else {
                 if (!this.isGoing) {
                     this.changeTigerBox();
                     this.chipView.setSelectedFirstCell();
                     this.requestDataWithType(1);
                 } else {
                     new GFCenterMsgDialog('回合结束了才能换机噢')
                 }
             }
        }
        public requestDataWithType(type: number) {
        }

        public requestDataWithEntryFinish(type: number, result: any) {
            this.complete(result);
            if (type == 0) {
                if (model.UserModel.point >= this.response.chip[0]) {
                    this.tigerGuidePlay();
                }
            }
        }
        private complete(result: any) {
            if (result.errcode == 0) {
                this.response = result;
                model.UserModel = result.user;
                // set chipView
                if (this.response.chip.length && this.response.chip[0] > Number(model.UserModel.point)) {
                    view.showChargeDialogWithType(1);
                    new view.GFCenterMsgDialog("金币不足，请先兑换金币");
                }
                let player: GFPlayer = new GFPlayer().deserialize(result.user);
                player.chipnumber = "0";
                this.userInfoView.renderPlayer(player);
                if (this.chipView.selectedCell) {
                    this.chipView.refresh();
                } else {
                    this.chipView.setData(this.response.chip);
                }
                this.resetTigerBox()
            }
        }
        public playTiger(){
            
        }
        public gameHall(){
            
        }
        public tigerGuideStop() {
            this.playGuide.visible = false;
            this.timeLine.pause()
        }

        public tigerDrop() {
            this.tigerBg.bottom = 640
            playMedia(VoiceType.TigerChange)
            Tween.to(this.tigerBg, { bottom: 106 }, 1000, laya.utils.Ease.bounceOut)
        }
        public changeTigerBox() {
            Tween.to(this.tigerBg, { bottom: -440 }, 300, laya.utils.Ease.sineIn, Handler.create(this, function () {
                this.tigerDrop();
            }))
        }
        
    }
}