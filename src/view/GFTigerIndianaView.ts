module view {
    import Image = Laya.Image;
    import Button = Laya.Button;
    import BitmapFont = Laya.BitmapFont;
    import Tween = laya.utils.Tween;
    import Label = laya.ui.Label;
    import Animation = laya.display.Animation;
    // import MovieChip = Laya.MovieClip;
    import TimeLine = laya.utils.TimeLine;
    import GFPlayer = model.GFPlayer;
    import MovieClip = Laya.MovieClip;
    export class GFTigerIndianaView extends view.GFTigerBaseView{
        private winningRecordButton:Button
        private bottomLabel:Label
        private rightListView:view.GFTigerIndianaListView
        private tempPokersResult : any = {};
        private currentIndex : number
        private winClip : MovieClip = new MovieClip();
        private resultImage : Image
        private waitIndianaHallBack = false
        constructor(){
            super()
            // this.setup();
        }
        setup (){
            super.setup();
            this.name = 'GFTigerIndianaViewName'
            this.tigerBg.left = 194
            this.userInfoView.centerY = -30;
            this.gameHallButton.skin = "comp/image_duobaodating.png"

            //add winningRecordButton
            this.winningRecordButton = new Button("comp/btn_zhongjiangjilu.png","");
            this.winningRecordButton.pos(26,425);
            this.winningRecordButton.size(160,58);
            this.winningRecordButton.stateNum = 2;
            this.addChild(this.winningRecordButton);
            this.winningRecordButton.on(laya.events.Event.CLICK,this,this.winningRecord);

            // add bottomLabel
            this.bottomLabel = new Label("当三幅图片相同时，可获得图片中的宝贝（快递费自付）");
            this.bottomLabel.align = 'center'
            this.bottomLabel.fontSize = 22
            this.bottomLabel.bold = true
            this.bottomLabel.color = model.getColorWithNumber(1)
            this.bottomLabel.centerX = 0
            this.bottomLabel.y = this.height - 20 - 25;
            this.addChild(this.bottomLabel)

            this.rightListView = new view.GFTigerIndianaListView();
            this.rightListView.pos(916,144)
            this.rightListView.size(198,306)
            this.addChild(this.rightListView)

            this.configBoxView(0)

            this.mutipleLabel.wordWrap = true
            this.mutipleLabel.fontSize = 26
            this.mutipleLabel.color = '#ffffff'
            this.mutipleLabel.bold = true;
            this.mutipleLabel.top = 26
            this.mutipleLabel.bottom = 32
            this.mutipleLabel.width = 26
            this.mutipleLabel.centerX = 0
            this.mutipleLabel.align = 'center'
            this.mutipleLabel.valign = 'middle'
            this.mutipleLabel.leading = -3

            this.resultImage = new Image("comp/bg_jieguokuang.png")
            this.boxView.addChild(this.resultImage)
            this.resultImage.visible = false
            this.resultImage.size(430 , 200)
            this.resultImage.centerX = 0
            this.resultImage.centerY = 0

            Laya.stage.on('IndianaHallBack' , this , function() {
                if(this.waitIndianaHallBack) {
                    this.waitIndianaHallBack = false
                    this.tigerResultHandlerAnimate()
                }
            })
        }

        private getBasesWithIndex(index) {
            let obj = IndianaBGImage[index]
            let bases = [{skin : obj.imgurl , clipX : obj.product.length + 1 , clipY : 1 , defaultIndex : 0 , endIndex : obj.product.length, startIndex : 1},
                        {skin : obj.imgurl , clipX : obj.product.length + 1 , clipY : 1 , defaultIndex : 0 , endIndex : obj.product.length, startIndex : 1},
                        {skin : obj.imgurl, clipX : obj.product.length + 1 , clipY : 1 , defaultIndex : 0 , endIndex : obj.product.length, startIndex : 1}]
            return bases
        }

        private configBoxView(index) {
            let bases = this.getBasesWithIndex(index)
            this.boxView.setBox(GFBoxViewType.Indiana , bases)
            this.boxView.reset()
        }   

        requestDataWithType(type:number){
            let params:any = { "type": type }; 
            if (type == 2){
                params = { "type": type , "irid": this.response.room.irid};
            }
            model.getUrlRequestResponse("indiana/entry", params, Handler.create(this, function (result: any) {
                if (result.errcode == 0) {
                    let arr = result.chip
                    let chip = []
                    for (var key in arr) {
                        if (arr.hasOwnProperty(key)) {
                            var element = arr[key];
                            chip.push(element.point)
                        }
                    }
                    result.chip = chip
                }
                this.requestDataWithEntryFinish(type, result);
                if (result.errcode == 0) {
                    GFLog(this.chip)
                    // this.slotRuleView.ruleLabel.text = this.response.rulestr;
                    // this.rightListView.setDataArray(result.imglist)
                }
            }), true);
        }
        gameHall(){
            if (Number(model.UserModel.point) >= this.response.chip[0]){
                this.chipView.setSelectedFirstCell();
            }
            let array = this.response.imglist[0].product;
            this.rightListView.setDataArray(array)

            if (this.isContinueBet){
                this.continueBet();
                this.continueButton.disabled = true;
            }
            let aaa = new view.GFIndianaHall()
            this.addChild(aaa);
        }
        private winningRecord(){
            let record = new view.GFIndianRecordView()
            record.name = 'GFIndianRecordView'
            this.addChild(record)
        }

        private showWinningResultDialog(){
            let dialog = new ui.GFWinningTipsDialogUI();
            dialog.tiger_number_label.text = "恭喜您在"+this.tempPokersResult.result.room.irid+"号夺宝机获得 "
            dialog.tiger_value_label.left = dialog.tiger_number_label.x+dialog.tiger_number_label.width + 10;
            dialog.tiger_value_label.text = "价值" + this.tempPokersResult.result.result[0].price + '元'

            dialog.tiger_value_label.font = "jinbishouru";
            dialog.tiger_value_label.fontSize = 28

            dialog.tiger_value_label.y = 123
            dialog.tiger_name_label.text = this.tempPokersResult.result.result[0].name
            dialog.tiger_ID_label.text = "提货码：" + this.tempPokersResult.result.code

            // dialog.popup();
            this.showDialog(dialog)

            dialog.btn_ok.clickHandler = Handler.create(this,function(){ 
                dialog.close()
                Laya.stage.removeChildByName('indianaWinClip')
            })
            dialog.btn_kefu.clickHandler = Handler.create(this,function(){ 
                dialog.close()
                Laya.stage.removeChildByName('indianaWinClip')
                let friendList = new view.GFFriendListView(true);
                friendList.popup();
            })
            let clip = new MovieClip()
            clip.name = 'indianaWinClip'
            clip.load('output/indianaWin.swf?v='+Version)
            Laya.stage.addChild(clip)
            clip.on(laya.events.Event.COMPLETE, this, function () {
                 clip.stop();
            })

        }

        private showDialog(dialog : Dialog) {
            if(Laya.stage.getChildByName('GFLoadingView')) {
                Laya.stage.timer.once(1000 , this , this.showDialog , [dialog])
            }else {
                dialog.popup()
            }
        }

        chipViewSelectedIndex(index:number){
            if (index >= 0) {
                let array = this.response.imglist[index].product;
                this.rightListView.setDataArray(array)
                this.configBoxView(index)
                this.currentIndex = index
                this.mutipleBg.skin = 'comp/image_jiazhimoren.png'
                this.mutipleLabel.visible = false
            }
            this.tigerGuidePlay();
        }

        private tigerResultHandler(result) {
            this.resultImage.visible = true
            this.chipView.isGame = false;
            this.response.room = result.room
            this.response.point = result.user.point
            this.tigerInfoLabel2.text = result.room.total_point + '元宝贝'
            this.tigerResultHandlerAnimate()
            // if(this.getChildByName('GFIndianaHall')) {
            //     this.waitIndianaHallBack = true
            // }else {
            //     this.tigerResultHandlerAnimate()
            // }
        }
        private tigerResultHandlerAnimate() {
            this.timer.once(500 , this , function() {
                this.resultImage.visible = false
                if (this.tempPokersResult.result.win == 1) {
                    this.removeChildByName("GFIndianRecordView");
                    this.showWinningResultDialog()
                    if (this.isContinueBet) {
                        this.continueBet()
                        this.continueButton.disabled = true
                    }
                    this.mutipleBg.skin = 'comp/bg_jiazhi.png'
                    this.mutipleLabel.visible = true
                    this.mutipleLabel.text = this.tempPokersResult.result.result[0].price
                    playMedia(VoiceType.TigerBaozi)
                    this.tigerResultHandlerFinish()
                } else {
                    this.mutipleBg.skin = 'comp/image_jiazhimoren.png'
                    this.mutipleLabel.visible = false
                    this.showFail(this.tempPokersResult.result.tips)
                    Laya.timer.once(1000, this, this.tigerResultHandlerFinish)
                }
            })
        }
        private showFail(tips) {
            let fail = new FailDialog(tips)
            Laya.stage.addChild(fail)
            Laya.timer.once(1000 , this , function(){
                fail.removeSelf()
            })
        }
        private tigerResultHandlerFinish() {
            this.isGoing = false
            this.chipView.refresh();
            if (model.UserModel.point >= this.chipView.selectedCell.dataSource) {
                this.tigerGuidePlay()
            }else {
                this.rightListView.setDataArray(undefined)
            }
            if (this.isContinueBet) {
                this.playTiger();
            }else{
                this.continueButton.disabled = true;
            }
        }

        resetTigerBox() {
            this.rightListView.tips = this.response.tips
            this.isGoing = false
            this.chipView.isGame = false;
            stopMedia(VoiceType.TigerPlay)
            stopMedia(VoiceType.TigerScroll)
            // this.mutipleLabel.text = 'N'
            this.tigerIndexLabel.text = this.response.room.irid + '号夺宝机'
            this.boxView.reset();
            this.tigerInfoLabel2.text = this.response.room.total_point + '元宝贝'
            this.tigerNotice.text = '请下注...'
            this.tigerNoticeL.text = '';
            this.tigerNoticeR.text = '';
            let chip = this.chipView.selectedCell
            if (chip && model.UserModel.point >= this.response.chip[0]) {
                this.tigerGuidePlay();
            }
            this.mutipleBg.skin = 'comp/image_jiazhimoren.png'
            this.mutipleLabel.visible = false
        }
        playTiger() {
            GFLog('-----------------click play----------------')
            if(!this.isGoing) {
                let chip = this.chipView.selectedCell
                if(chip && model.UserModel.point >= this.chipView.selectedCell.dataSource) {
                    playMedia(VoiceType.TigerPlay)
                    this.isGoing = true;
                    this.goToHall = false;
                    this.tigerGuideStop();

                    this.mutipleBg.skin = 'comp/image_jiazhimoren.png'
                    this.mutipleLabel.visible = false
                    this.tigerNotice.text = '下注' + chip.getChipValueWithPoint() + '金币'
                    this.tigerNoticeL.text = ''
                    this.tigerNoticeR.text = ''
                    this.boxView.startPlay()

                    this.chipView.isGame = true;
                    //连续下注
                    this.continueButton.disabled = false;
                    let param = {
                        'irid': this.response.room.irid,
                        'icid': this.response.imglist[this.currentIndex].icid
                    }
                    this.userInfoView.event(GFSlotUserChipNumberUpdateEvent,chip.dataSource);
                    this.userInfoView.event(GFSlotUserPointUpdateEvent, Number(model.UserModel.point)-chip.dataSource);
                    // this.tempPokersResult.isTemp = false
                    // this.tempPokersResult.trid = this.response.room.trid
                    model.getUrlRequestResponse('indiana/play', param , Handler.create(this , function(result) {
                        if(result.errcode == 0) {
                            GFLog(result)
                            // this.tempPokersResult.isTemp = true
                            this.tempPokersResult.result = result
                            // if(this.tempPokersResult.trid != this.response.room.trid) {
                                
                            //     return; 
                            // }
                            if (!this.getChildByName("GFTigerHall")) {
                                this.boxView.setPokers(result)
                                this.boxView.finish = Handler.create(this, this.tigerResultHandler, [result])
                                model.UserModel = result.user;
                            }else {
                                this.boxView.resetPokers(result)
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
                        if (this.response.chip[0] > model.UserModel.point) {
                            new GFCenterMsgDialog('金币不足，请先兑换金币')
                            view.showChargeDialogWithType(1)
                            return
                        }
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
        back (){

            let roomIndianaHall = this.getChildByName("GFIndianaHall");
            if (roomIndianaHall) {
                (<GFIndianaHall>roomIndianaHall).onClickBack()
            }

            this.removeSelf()
            BGM(BGMType.Home)
            model.getUrlRequestResponse("indiana/exit", { "irid": this.response.room.irid }, Handler.create(this, function (result: any) {
                if (result.errcode == 0) {
                   this.hardBack();
                }
            }),true)
        }
        public hardBack(){
            this.isContinueBet = false;
            this.removeSelf();
            BGM(BGMType.Home)
            Laya.stage.offAll(GFJINBICHOUMAEVENT);
            // Laya.stage.offAll("GrabTiger");
        }
    }
    class FailDialog extends View {
        private bg : Image = new Image()
        private notice : Label = new Label()
        constructor(private msg : string ) {
            super()
            this.configUI()
        }
        private configUI() {
            this.size(1136 , 640)
            this.loadImage('comp/bg_zhezhao.png')
            this.on(laya.events.Event.CLICK , this , function(){})

            this.addChild(this.bg)
            this.bg.loadImage('comp/bg_weizhongjiang.png')
            this.bg.size(440 , 380)
            this.bg.centerX = 0
            this.bg.top = 126

            this.addChild(this.notice)
            this.notice.top = 372
            this.notice.centerX = 0
            this.notice.fontSize = 28
            this.notice.color = '#ffffff'
            this.notice.bold = true
            this.notice.valign = 'top'
            this.notice.text = this.msg
            this.notice.width = 240
            this.notice.wordWrap = true
            this.notice.align = 'center'

        }
    }
}