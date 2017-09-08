module view {
    import GFMediaMessageView = ui.GFMediaMsgViewUI;
    import Sprite = laya.display.Sprite;
    import List = laya.ui.List;
    import Box = laya.ui.Box;
    import Button = laya.ui.Button;
    import Label = laya.ui.Label;
    import Handler = laya.utils.Handler;
    import Image = laya.ui.Image;
    import ColorSize = model.getColorWithNumber;
    import Animation = laya.display.Animation;
    import Graphics = laya.display.Graphics;
    import TimeLine = laya.utils.TimeLine;

    const BUTTONSKIN = "comp/btn_xuanyuyin.png";
    export class GFMediaMsgDialog extends GFMediaMessageView {
        static faceArr : Array<string> = new Array();
        static voiceArr : Array<string> = ["快点吧，我等到花儿都谢了！" , "一手好牌，天助我也！" , "嘿嘿，这把蒙到底，拼人品了！" , "还有谁，敢和我一跟到底" , "跟你到底，还怕你不成" , "天哪，这牌也太烂了吧" , "不要走，决战到天亮"];
        private faceView : List = new List();
        private voiceView : List = new List();
        public selectFace : Handler;
        public selectVoice : Handler;
        constructor() {
            super();
            // this.hitTestPrior = true;
            this.addHandler();
            if (!GFMediaMsgDialog.faceArr.length) {
               for (var index = 1; index < 13; index++) {
                let prifix = "comp/image_biaoqing";
                GFMediaMsgDialog.faceArr.push(prifix + index + ".png");
                } 
            }
            this.configUI();
            Laya.loader.load(BUTTONSKIN , Handler.create(this , this.configUI));
        }
        private configUI() {
            this.addHandler();
            this.addChild(this.faceView);
            this.faceView.visible = true;
            this.faceView.centerX = 0;
            this.faceView.width = 556;
            this.faceView.height = 360;
            this.faceView.bottom = 70;
            this.faceView.repeatX = 4;
            this.faceView.repeatY = 3;
            this.faceView.itemRender = FaceItem;
            this.faceView.spaceX = 52;
            this.faceView.spaceY = 22;
            // this.faceView.vScrollBarSkin = undefined;
            this.faceView.selectEnable = true;
            this.faceView.selectHandler = new Handler(this , this.chooseFace);
            this.faceView.renderHandler = new Handler(this , this.updateFaceItem); 
            this.faceView.refresh();
            this.faceView.array = GFMediaMsgDialog.faceArr;

            this.addChild(this.voiceView);
            this.voiceView.visible = false;
            this.voiceView.centerX = 0;
            this.voiceView.width = 620;
            this.voiceView.height = 360;
            this.voiceView.bottom = 80;
            this.voiceView.repeatX = 1;
            this.voiceView.repeatY = GFMediaMsgDialog.voiceArr.length;
            this.voiceView.spaceY = 6;
            this.voiceView.spaceX = 0;
            this.voiceView.itemRender = VoiceItem;
            this.voiceView.selectEnable = true;
            this.voiceView.vScrollBarSkin = undefined;
            this.voiceView.selectHandler = new Handler(this , this.chooseVoice);
            this.voiceView.renderHandler = new Handler(this , this.updateVoiceItem); 
            this.voiceView.refresh();
            this.voiceView.array = GFMediaMsgDialog.voiceArr;
            this.voiceView.graphics = new laya.display.Graphics();

        }
        private addHandler() {
            Laya.stage.offAll('GFMediaMessageViewClose')
            Laya.stage.on('GFMediaMessageViewClose' , this , this.close)
            this.dismissBtn.on(laya.events.Event.CLICK , this , this.destroy);
            this.bgBlur.on(laya.events.Event.CLICK , this , this.destroy);
            this.faceBtn.on(laya.events.Event.CLICK , this , this.showFace);
            this.voiceBtn.on(laya.events.Event.CLICK , this , this.showVoice);
            // laya.events.Event.
        }
        private updateFaceItem(cell: FaceItem, index: number): void {
            GFLog("updateFaceItem");
            cell.setSkin(cell.dataSource);
        }
        private updateVoiceItem(cell: VoiceItem, index: number): void {
            GFLog("updateVoiceItem");
            cell.setTitle(cell.dataSource);
        }
        private chooseFace(index : number) {
            this.selectFace.runWith(index);
            this.destroy();
        }
        private chooseVoice(index : number) {
            this.selectVoice.runWith(index);
            this.destroy();
        }
        private showVoice() {
            this.faceView.visible = false;
            this.voiceView.visible = true;
            this.faceBtn.selected = false;
            this.voiceBtn.selected = true;
        }
        private showFace() {
            this.faceView.visible = true;
            this.voiceView.visible = false;
            this.faceBtn.selected = true;
            this.voiceBtn.selected = false;

        }
    }
    class FaceItem extends Box {
        public image : Image = new Image();
        constructor() {
            super();
            this.addChild(this.image);
            this.size(100, 100);
            this.image.size(100 , 100);
        }
        setSkin(skin : string = undefined) {
            this.image.skin = skin;
        }
    }
    class VoiceItem extends Box {
        public button : Button = new Button();
        constructor() {
            super();
            this.addChild(this.button);
            // this.size(620 , 64);
            this.button.size(620 , 64);
            this.button.skin = BUTTONSKIN;
            this.button.stateNum = 2;
            this.button.labelSize = 24;
            this.button.labelColors = "#ffffff,#ffcc19,#ffcc19,#ffcc19";
            this.button.labelAlign = "left";
            this.button.labelPadding = "0 , 0 , 0 , 25";
        }
        setTitle(title : string = undefined) {
            this.button.label = title;
        }
    }
    export class FaceMediaAnimation extends Sprite {
        private timeLine : TimeLine = new TimeLine();
        constructor(private res : string = undefined) {
            super();
            this.size(100 , 100);
            this.pivot(50 , 50);
            this.loadImage(this.res);
            this.scale(0.5 , 0.5);
        }
        private complete() {
            this.removeSelf();
        }
        public show() {
            this.timeLine.to(this , { y : this.y - 30 } , 500).to(this , {y : this.y} , 500).to(this , {} , 500);
            this.timeLine.play();
            this.timeLine.on(laya.events.Event.COMPLETE , this , this.complete);
        }
    }
    export class VoiceMediaAnimation extends Sprite {
        private timeLine : TimeLine = new TimeLine();
        private label : Label = new Label();
        constructor(pos : number = 0 , title : string = '') {
            super();
            this.size(190 , 90);
            this.pivot(95 , 45);
            this.addChild(this.label);
            this.label.fontSize = 22;
            this.label.color = "#ffffff";
            this.label.text = title;
            this.label.size(190 , 90);
            this.label.pos(0 , 0);
            this.label.wordWrap = true;
            let res : string;
            switch (pos) {
                case model.GFPlayerPosition.LeftTop:
                    res = "comp/bg_yuyinqipao_zuo1.png";
                    this.label.padding = "20 , 16 , 12 , 16";
                    this.pos(235 , 135);
                    break;
                case model.GFPlayerPosition.RightTop:
                    res = "comp/bg_yuyinqipao_you1.png";
                    this.label.padding = "20 , 16 , 12 , 16";
                    this.pos(-115 , 135);
                    break;
                case model.GFPlayerPosition.LeftBottom:
                    res = "comp/bg_yuyinqipao_zuo.png";
                    this.label.padding = "12 , 16 , 20 , 16";
                    this.pos(235 , 45);
                    break;
                case model.GFPlayerPosition.RightBottom:
                    res = "comp/bg_yuyinqipao_you.png";
                    this.label.padding = "12 , 16 , 20 , 16";
                    this.pos(-115 , 45);
                    break;
                case model.GFPlayerPosition.Center:
                    res = "comp/bg_yuyinqipao_zuo.png";
                    this.label.padding = "12 , 16 , 20 , 16";
                    this.pos(235 , 35);
                    break;
            }
            this.loadImage(res);
        }
        private complete() {
            this.removeSelf();
        }
        public show() {
            this.timeLine.to(this , {} , 3000);
            this.timeLine.play();
            this.timeLine.on(laya.events.Event.COMPLETE , this , this.complete);
        }
    }
}