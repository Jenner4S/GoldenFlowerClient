module view {
    import Image = laya.ui.Image;
    import Button = laya.ui.Button;
    import Handler = laya.utils.Handler;
    import Label = laya.ui.Label;
    export const GFDoubleCardViewClose = "GFDoubleCardViewClose";
    export class GFDoubleCardView extends View {
        private bg : Image = new Image();
        private title : Image = new Image();
        private closeBtn : Button = new Button();
        public choose : Handler;
        private leftCard : ChooseDoubleCard = new ChooseDoubleCard(GFDoubleCardPositon.Left);
        private rightCard : ChooseDoubleCard = new ChooseDoubleCard(GFDoubleCardPositon.Right);
        private notice : Label = new Label()
        constructor(private roid) {
            super();
            this.configUI();
            this.requestCardInfo();
        }
        private buyCardWithDcid(dcid , position) {
            this.configPositon(position)
            var api = "game/buy-doublecard";
            model.getUrlRequestResponse(api, {'roid' : this.roid , "dcid" : dcid }, Handler.create(this, this.close) , true , true);
            this.leftCard.offClick();
            this.rightCard.offClick();
        }
        private configPositon(position) {
            if(position == 2) {
                this.rightCard.tempUIStatus()
            }else {
                this.leftCard.tempUIStatus()
            }
        }
        private requestCardInfo() {
            var api = "game/doublecard";
            model.getUrlRequestResponse(api, {'roid' : this.roid}, Handler.create(this, this.configCardStatu));
        }
        private configCardStatu(result) {
            GFLog(result);
            let left = result.list[0]
            let right = result.list[1]
            this.leftCard.setData(left)
            this.rightCard.setData(right)
            this.leftCard.chooseCard = Handler.create(this , this.buyCardWithDcid , [left.dcid , GFDoubleCardPositon.Left])
            this.rightCard.chooseCard = Handler.create(this , this.buyCardWithDcid , [right.dcid , GFDoubleCardPositon.Right])
            if (left.get) {
                this.leftCard.setType(GFDoubleCardStatus.choosed)
                this.rightCard.setType(GFDoubleCardStatus.disChoosed)
            }else if (right.get) {
                this.leftCard.setType(GFDoubleCardStatus.disChoosed)
                this.rightCard.setType(GFDoubleCardStatus.choosed)
            }else {
                this.leftCard.setType(GFDoubleCardStatus.noChoose)
                this.rightCard.setType(GFDoubleCardStatus.noChoose)
            }
        }
        private configUI() {
            this.size(1136 , 640);
            this.loadImage('comp/bg_zhezhao.png')

            this.addChild(this.bg);
            this.bg.loadImage('comp/bg_gaoshi.png')
            this.bg.centerX = 0;
            this.bg.centerY = -5;
            this.bg.size(720 , 490)

            this.addChild(this.title);
            this.title.loadImage('comp/image_fanbei.png')
            this.title.centerX = 0;
            this.title.top = 90;
            this.title.size(100 , 36)

            this.bg.addChild(this.closeBtn);
            this.closeBtn.size(73 , 73)
            this.closeBtn.skin = 'comp/btn_dialog_close.png'
            this.closeBtn.stateNum = 2
            this.closeBtn.top = 36;
            this.closeBtn.right = 40;
            this.closeBtn.on(laya.events.Event.CLICK , this , this.close)

            this.bg.addChild(this.leftCard)
            this.leftCard.bottom = 150
            this.leftCard.left = 145

            this.bg.addChild(this.rightCard)
            this.rightCard.bottom = 150
            this.rightCard.right = 145

            this.bg.addChild(this.notice)
            this.notice.fontSize = 22
            this.notice.color = '#e5dfff'
            this.notice.centerX = 0
            this.notice.bottom = 50
            this.notice.text = '      使用翻倍卡后，其他人跟您比牌或开牌、\n您跟其他人比牌或开牌，比牌或开牌金额翻倍。'

            Laya.stage.offAll(GFDoubleCardViewClose);
            Laya.stage.on(GFDoubleCardViewClose , this , this.close);
        }
        private close() {
            this.removeSelf();
        }
    }
    enum GFDoubleCardPositon {
        Left = 1,
        Right
    }
    enum GFDoubleCardStatus {
        noChoose = 0,
        choosed,
        disChoosed,
        temp
    }
    class ChooseDoubleCard extends Button {
        private choosedImage : Image = new Image()
        private borderImage : Image = new Image()
        private flagImage : Image = new Image()
        public chooseCard : Handler;
        private mutipleLabel : Label = new Label()
        private pointLabel : Label = new Label()
        constructor(private position:GFDoubleCardPositon) {
            super();
            this.configUI();
        }
        public setData(data) {
            let multiple = '翻倍卡x' + data.multiple + '倍';
            let point = '' + data.point + '金币';
            this.mutipleLabel.text = multiple;
            this.pointLabel.text = point;
        }
        public setType(type : GFDoubleCardStatus) {
            this.UIStatus(type)
            if(type) {
                this.offAll(laya.events.Event.CLICK)
            }else {
                this.on(laya.events.Event.CLICK , this , this.clickDouble)
            }
        }
        private UIStatus(type : number) {
            this.choosedImage.visible = type == 1?true:false;
            let borderImageName = type == 1?'comp/bg_fanbei_sel.png':'comp/bg_fanbei.png'
            this.borderImage.loadImage(borderImageName)
            let flagImageName = type < 2?'comp/image_fanbei' + this.position + '.png':'comp/image_fanbei' + this.position + '_dis.png'
            this.flagImage.loadImage(flagImageName)
            if(type == 2) {
                this.mutipleLabel.alpha = 0.4
                this.pointLabel.alpha = 0.4
            }
        }
        public tempUIStatus() {
            this.choosedImage.visible = false
            this.borderImage.loadImage('comp/bg_fanbei_sel.png')
        }
        public offClick() {
            this.offAll(laya.events.Event.CLICK)
        }
        private clickDouble() {
            if(this.chooseCard) {
                this.chooseCard.run();
            }
        }
        private configUI() {
            this.size(170 , 200)

            this.addChild(this.borderImage)
            this.borderImage.size(170 , 200)
            
            this.addChild(this.flagImage)
            this.flagImage.size(88 , 118)
            this.flagImage.centerX = 0;
            this.flagImage.top = 14;

            this.addChild(this.choosedImage)
            this.choosedImage.size(40 ,100)
            this.choosedImage.loadImage('comp/image_yixuan.png')
            this.choosedImage.centerY = 0;
            this.choosedImage.centerX = this.position == 2?84:-84;
            this.choosedImage.visible = false

            this.addChild(this.mutipleLabel)
            this.mutipleLabel.fontSize = 22
            this.mutipleLabel.color = '#ffffff'
            this.mutipleLabel.align = 'center'
            this.mutipleLabel.centerX = 0
            this.mutipleLabel.bottom = 52
            this.mutipleLabel.width = 170
            this.mutipleLabel.height = 22

            this.addChild(this.pointLabel)
            this.pointLabel.fontSize = 22
            this.pointLabel.color = '#ffcc19'
            this.pointLabel.align = 'center'
            this.pointLabel.centerX = 0
            this.pointLabel.bottom = 20
            this.pointLabel.width = 170
            this.pointLabel.height = 22
        }
    }
}