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
    export class GFTigerHome extends view.GFTigerBaseView{
        private slotRuleView : GFSlotRuleView;
        private tempPokersResult : any = {};
        private result_image:Image;
        private win_point_MovieChip:MovieChip;
        private resultView:view.GFTigerResultView;
        private result_MovieChip:MovieChip;
        private animation_bg:View;
        constructor (){
            super();
        }

        setup(){
            super.setup();
            this.name = 'GFTigerHomeName'
            // this.bg_image.on(laya.events.Event.CLICK,this,function(){});

            this.tigerBg.left = 204
            this.mutipleBg.loadImage('comp/bg_beishu.png')
            this.userInfoView.centerY = -20;

            this.slotRuleView = new GFSlotRuleView();
            this.slotRuleView.centerY = -20;
            this.slotRuleView.right = 30;
            this.addChild(this.slotRuleView);

        }

        private addTigerResultSubViews(type:number){
            //add  comp/bg_jieguokuang.png
            let image = new Image();
            image.skin = "comp/bg_jieguokuang.png";
            image.size(430,200);
            image.pos(268,this.height-200 -192);
            this.result_image = image;
            this.animation_bg.addChild(this.result_image);
            if (type < 5) {//animation movieChip
                let win_point_path = "output/tiger_" + type + ".swf";
                let movieChip = new MovieChip();
                movieChip.load(win_point_path);
                this.result_MovieChip = movieChip;

                switch (type) {
                    case 0:
                        movieChip.pos(294, 190);
                        break;
                    case 1:
                        movieChip.pos(234, 180);
                        break;
                    case 2:
                        movieChip.pos(318, 202);
                        break;
                    case 3:
                        movieChip.pos(275, 198);
                        break;
                    case 4:
                        movieChip.pos(310, 190);
                        break;
                    case 5:
                        break;
                    default:
                        break;
                }
                this.animation_bg.addChild(this.result_MovieChip);
            }
            let resultView= new  view.GFTigerResultView();
            resultView.left = 268-15
            resultView.bottom = 232
            resultView.size(460,46);
            resultView.label.text = this.tempPokersResult.result.tips;
            resultView.rightLabel.text = this.tempPokersResult.result.win;
            resultView.setData(this.tempPokersResult.result.tips,this.tempPokersResult.result.win);
            this.resultView = resultView;
            this.animation_bg.addChild(this.resultView);
        }
    
         resetTigerBox() {
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
        //下注
        playTiger() {
            GFLog('-----------------click play----------------')
            if(!this.isGoing) {
                let chip = this.chipView.selectedCell
                if(chip && model.UserModel.point >= this.chipView.selectedCell.dataSource) {
                    playMedia(VoiceType.TigerPlay)
                    this.isGoing = true;
                    this.goToHall = false;
                    this.tigerGuideStop();
                    // this.tigerNotice.visible = false;
                    this.tigerNotice.text = '下注' + chip.getChipValueWithPoint() + '金币'
                    this.tigerNoticeL.text = ''
                    this.tigerNoticeR.text = ''
                    this.mutipleLabel.text = 'N'
                    this.boxView.startPlay()

                    this.chipView.isGame = true;
                    //连续下注
                    this.continueButton.disabled = false;
                    let param = {
                        'trid': this.response.room.trid,
                        'chip': chip.dataSource
                    }
                    this.userInfoView.event(GFSlotUserChipNumberUpdateEvent,chip.dataSource);
                    this.userInfoView.event(GFSlotUserPointUpdateEvent, Number(model.UserModel.point)-chip.dataSource);
                    this.tempPokersResult.isTemp = false
                    // this.tempPokersResult.trid = this.response.room.trid
                    model.getUrlRequestResponse('tiger/play', param , Handler.create(this , function(result) {
                        if(result.errcode == 0) {
                            GFLog(result)
                            this.tempPokersResult.isTemp = true
                            this.tempPokersResult.result = result
                            // if(this.tempPokersResult.trid != this.response.room.trid) {
                                
                            //     return; 
                            // }
                            if (!this.getChildByName("GFTigerHall")) {
                                this.boxView.setPokers(result.pokers)
                                this.boxView.finish = Handler.create(this, this.tigerResultHandler, [result])
                                model.UserModel = result.user;
                            }else {
                                this.boxView.resetPokers(result.pokers)
                                this.tigerResultHandler(result)
                                model.UserModel = result.user;
                            }
                            
                        }else if(result.errcode == 202) {
                            this.boxView.reset()
                        }else if(result.errcode == 211 || result.errcode == 212) {
                            this.hardBack();
                        }
                    }) , true , true)
                    Tween.to(this.playButton, { y: this.playButton.y + 80 }, 500, laya.utils.Ease.sineOut, Handler.create(this, function () {
                        Tween.to(this.playButton, { y: this.playButton.y - 80 }, 500, laya.utils.Ease.sineIn, undefined, 0, true)
                    }), 0, true)
                }else {
                    if(this.isContinueBet) {
                        this.continueBet()
                        this.continueButton.disabled = true
                        this.chipView.showAnimation();
                        view.GFBadNetView.show('余额不足，\n请重新选择筹码或充值')
                        return 
                    }
                    if(this.response.chip[0] > model.UserModel.point) { 
                        new GFCenterMsgDialog('金币不足，请先兑换金币')
                        view.showChargeDialogWithType(1)
                    }else{
                        new GFCenterMsgDialog('请选择筹码')
                        this.chipView.showAnimation();
                    }
                }
            }
        }
        private tigerResultHandler(result) {
            this.chipView.isGame = false;
            this.response.room = result.room
            this.response.point = result.user.point
            this.tigerInfoLabel2.text = this.response.room.total_point + '金币'
            this.mutipleLabel.text = result.ratio
            this.tigerNoticeL.text = this.tigerNotice.text
            this.tigerNotice.text = ''
            this.tigerNoticeR.text = '中' + result.win + '金币'
            if (!this.goToHall) {//不在大厅
                GFLog("creatPlayResultAnimation  ");
                this.creatPlayResultAnimation(result.handkind);
            }
            if (this.displayedInStage){
                switch(result.handkind) {
                case 0:{
                    playMedia(VoiceType.TigerBaozi)
                }
                break;
                case 1:{
                    playMedia(VoiceType.TigerShunjin)
                }
                break;
                case 2:{
                    playMedia(VoiceType.TigerTonghua)
                }
                break;
                case 3:{
                    playMedia(VoiceType.TigerShunzi)
                }
                break;
                case 4:{
                    playMedia(VoiceType.TigerDuizi)
                }
                break;
                case 5:{
                    playMedia(VoiceType.TigerSanpai)
                }
                break;
            }
            }
            // GFLog(result)
        }

        //返回
        public back(){

            let roomGFTigerHall = this.getChildByName("GFTigerHall");
            if (roomGFTigerHall) {
                (<GFTigerHall>roomGFTigerHall).onClickBack()
            }

            model.getUrlRequestResponse("tiger/exit", { "trid": this.response.room.trid }, Handler.create(this, function (result: any) {
                if (result.errcode == 0) {
                   this.hardBack();
                }
            }),true)
        }

        public hardBack(){
            this.isContinueBet = false;
            this.removeSelf();
            stopBgm()
            playBgm()
            Laya.stage.offAll(GFJINBICHOUMAEVENT);
            Laya.stage.offAll("GrabTiger");
        }


        requestDataWithType(type: number) {
            let params:any = { "type": type }; 
            if (type == 1){
                params = { "type": type , "trid": this.response.room.trid};
            }
            model.getUrlRequestResponse("tiger/entry", params, Handler.create(this, function (result: any) {
                this.requestDataWithEntryFinish(type, result);
                if (result.errcode == 0) {
                    this.slotRuleView.ruleLabel.text = this.response.rulestr;
                }
            }), true);
        }
        
        //大厅
         gameHall(){
            if(this.tempPokersResult.isTemp) {
                this.boxView.resetPokers(this.tempPokersResult.result.pokers)
                this.tigerResultHandler(this.tempPokersResult.result)
                model.UserModel = this.tempPokersResult.result.user;
            }
            stopMedia(VoiceType.TigerPlay)
            stopMedia(VoiceType.TigerScroll)
            if (Number(model.UserModel.point) >= this.response.chip[0]){
                this.chipView.setSelectedFirstCell();
            }
            if (this.isContinueBet){
                this.continueBet();
                this.continueButton.disabled = true;
            }
            let room = new GFTigerHall("");
            this.addChild(room);

            this.goToHall = true;
            if (this.isGoing) {
                this.isGoing = false;
                this.userInfoView.event(GFSlotUserPointUpdateEvent, model.UserModel.point);
                if (this.animation_bg) {
                    this.animation_bg.visible = false;
                    this.animationComplete();
                }
            }

        }

        private refreshUserInfoView() {
            this.userInfoView.event(GFSlotUserPointUpdateEvent, model.UserModel.point);
            this.userInfoView.event(GFSlotUserChipNumberUpdateEvent, this.tempPokersResult.result.win);
        }

        private creatWinCoinMovieChip(type:number){
            let win_point_path = "output/tiger_q"+type+".swf?v="+Version;
            this.win_point_MovieChip = new MovieChip();
            this.win_point_MovieChip.load(win_point_path);
            this.win_point_MovieChip.pos(14,290);
            this.win_point_MovieChip.loop = false;  
            this.animation_bg.addChild(this.win_point_MovieChip);
            this.win_point_MovieChip.play();
            this.win_point_MovieChip.on(laya.events.Event.COMPLETE, this, function () {
                this.win_point_MovieChip.stop();
                this.chipView.refresh();
                this.refreshUserInfoView();
                if(model.UserModel.point >= this.chipView.selectedCell.dataSource) {
                    this.tigerGuidePlay()
                }  
            })

            
        }

        private creatPlayResultAnimation(type:number){
            this.animation_bg = new View();
            this.animation_bg.pos(0,0);
            this.animation_bg.size(this.width,this.height);
            this.animation_bg.name = "animation_bg"
            this.addChild(this.animation_bg)
            this.creatWinCoinMovieChip(type);
            this.addTigerResultSubViews(type);
            Laya.timer.once(2000, this, function () {
                this.animationComplete();
                
            })
        }

        private animationComplete() {
            this.isGoing = false

            this.removeChildByName("animation_bg");
            if (this.isContinueBet) {
                this.playTiger();
            }else{
                this.continueButton.disabled = true;
            }
        }
        
    } 
}