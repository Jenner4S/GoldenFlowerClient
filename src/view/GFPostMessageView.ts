module view {
    import Handler = laya.utils.Handler;
    import Tween = laya.utils.Tween;
    import Label = laya.ui.Label;
    import Point = laya.maths.Point;
    import ColorSize = model.getColorWithNumber;
    import Sprite = laya.display.Sprite;
    import Button = laya.ui.Button;
    import Image = laya.ui.Image;
    import List = laya.ui.List;
    import Browser = laya.utils.Browser;
    import Box = laya.ui.Box;
    import TextInput = laya.ui.TextInput;
    import Text = laya.display.Text;

    const BGSKINNAME = ["comp/btn_youxi_zoumadeng.png" , "comp/btn_shouye_zoumadeng.png" , "comp/bg_jinhu_gonggaolan.png"]
    const SEXSKINNAME = ["comp/btn_nan.png" , "comp/btn_nv.png" , "comp/btn_fasonggonggao.png" , "comp/btn_leitaiicon.png"]
    const GONGGAONAME = ["comp/btn_gonggao.png"]
    const LISTBGNAME = ["comp/bg_gonggao_youxi.png" , "comp/bg_gonggao_shouye.png"]
    const TOUMINGNAME = ["comp/bg_touming.png"]

    export enum GFPostMessageViewPosition {
        homepage = 0,
        gameroom,
        tigerbox
    }

    export class GFPostMessageView extends Sprite {
        static showMessage:boolean = true;
        static currentMsg : any;
        static tempMsg : string = "";
        private bgBtn : Button = new Button();
        private gonggao : Button = new Button();
        private label : Label = new Label();
        private sexImg : Button = new Button();
        private msgList : messageDialog;
        private inputing : boolean = false;
        private type : number;
        private user : any;
        private roid : any;
        private content : any
        constructor(private position : GFPostMessageViewPosition) {
            super();
            this.addChild(this.bgBtn);
            this.addChild(this.sexImg);
            this.addChild(this.gonggao);
            this.addChild(this.label);
            Laya.loader.load(BGSKINNAME.concat(LISTBGNAME).concat(TOUMINGNAME), Handler.create(this , this.configUI));
        }
        private configUI() {
            if (this.position == 1) {
                this.bgBtn.skin = BGSKINNAME[0];
                this.pos(Laya.stage.width / 2 , 89);
                this.pivot(298 , 31);
                this.label.fontSize = 19;
            }else if(this.position == 0){
                this.bgBtn.skin = BGSKINNAME[1];
                this.pos(679 , 117);
                this.pivot(339 , 31);
                this.label.fontSize = 20;
            }else if(this.position == 2){
                this.bgBtn.skin = BGSKINNAME[2];
                this.pos(545 , 85);
                this.pivot(339 , 31);
                this.label.fontSize = 19;
            }
            this.gonggao.skin = GONGGAONAME[0];
            
            this.bgBtn.pos(this.pivotX , this.pivotY);
            this.bgBtn.pivot(this.pivotX , this.pivotY);
            this.bgBtn.stateNum = 1;

            this.gonggao.pos(10 , 5);
            this.gonggao.width = 40;
            this.gonggao.height = 40;
            this.gonggao.stateNum = 2;

            this.sexImg.pos(this.pivotX * 2 - 10 - 19 , 25);
            this.sexImg.pivot(19 , 19);
            this.sexImg.stateNum = 2;
            this.sexImg.skin = undefined;

            this.label.color = ColorSize(1);
            this.label.bold = false;
            this.label.align = "left";
            this.label.valign = "middle";
            this.label.pivot(this.pivotX - 60 , 25);
            this.label.pos(this.pivotX, 25);
            this.label.height = 50;
            this.label.width = this.pivotX * 2 - 120;
            this.label.overflow = "hidden";

            this.bgBtn.on(laya.events.Event.CLICK , this , this.showList);
            this.gonggao.on(laya.events.Event.CLICK , this , this.inputMode);
            this.sexImg.on(laya.events.Event.CLICK , this , this.detail);

            Laya.stage.on("newMessage" , this , this.freshLabel);
            Laya.stage.on("declareWar" , this , this.freshLabel);
            if (GFPostMessageView.currentMsg != undefined) {
                this.freshLabel(GFPostMessageView.currentMsg);
            }
        }
        private freshLabel(obj : any) {
            this.label.text = obj.content;
            this.sexImg.visible = true;
            if (obj.type == 3) {
                this.roid = obj.roid;
                this.user = obj.user
                this.content = obj.content
                this.sexImg.skin = SEXSKINNAME[3];
            }else {
                this.user = obj.user;
                if (obj.user) {
                    obj.type = 2;
                    if (this.user.sex == 1) {
                        this.sexImg.skin = SEXSKINNAME[0];
                    } else {
                        this.sexImg.skin = SEXSKINNAME[1];
                    }
                }else {
                    this.sexImg.visible = false;
                }
            }
            this.type = obj.type;
            this.label.pos(this.pivotX, 31);
            this.label.alpha = 0;
            Tween.to(this.label, { y: 25, alpha: 1 }, 500, laya.utils.Ease.linearInOut, undefined, 0, true);
        }
        public inputMode(msg : string = "", roid: string = "") {
            this.gonggao.selected = true;
            this.label.visible = false;
            this.sexImg.visible = false;
            let input : any;

            laya.utils.Browser.window.MtaH5.clickStat('allbroadcast');
            if (msg.length) {
                input = new inputView(new Point(this.x - 28, this.y - 6), this.pivotX * 2 - 160,this.label.fontSize, msg , "全服发消息，每条5千金币");
                input.dismissHandler = new Handler(this, function (input: string) {
                    this.publicMode();
                })
                input.sendHandler = new Handler(this, function () {
                    if (input.input.text.length <= 0) {
                        return;
                    }
                    model.getUrlRequestResponse("broadcast/challenge", { content: input.input.text , "roid":roid }, Handler.create(this, function (result: any) {
                        if (result.errcode == 0) {
                            input.input.text = "";
                            input.dismiss();
                        } else {
                            new GFCenterMsgDialog(result.msg);
                        }
                    }));
                })
            } else {
                input = new inputView(new Point(this.x - 28, this.y - 6), this.pivotX * 2 - 160, this.label.fontSize,GFPostMessageView.tempMsg);
                input.dismissHandler = new Handler(this, function (input: string) {
                    this.publicMode();
                    GFLog(input);
                    GFPostMessageView.tempMsg = input;
                })
                input.sendHandler = new Handler(this, function () {
                    if (input.input.text.length <= 0) {
                        return;
                    }
                    model.getUrlRequestResponse("broadcast/commit", { content: input.input.text }, Handler.create(this, function (result: any) {
                        if (result.errcode == 0) {
                            input.input.text = "";
                            input.dismiss();
                        } else {
                            input.input.text = "";
                            input.dismiss();
                        }
                    }),true);
                })
            }
            Laya.stage.addChild(input);
        }
        public publicMode() {
            this.gonggao.selected = false;
            this.label.visible = true;
            if(this.user) {
                this.sexImg.visible = true;
            } else {
                this.sexImg.visible = false;
                if (this.type == 3) {
                    this.sexImg.visible = true;
                }
            }
        }
        private showList() {
            if (!this.gonggao.selected) {
                this.msgList = new messageDialog(this.x + 20 , this.y - 31 + 50 + 144 , this.pivotX - 26 , this.position);
                Laya.stage.addChild(this.msgList);
            }
        }
        private detail() {
            if (this.type == 2) {
                let userDetail = new view.GFUserDetailDialog(this.user.urid);
                userDetail.popup();
            }else if(this.type == 3) {
                this.getArenaChallengeInfo(this.roid,this.user.urid, this.content);
            }
        }
         private getArenaChallengeInfo(roid:any, curid:any, content:any): void {
            let api = "game/challenge-info";
            let params = { "roid": roid ,"curid":curid,"content":content};            model.getUrlRequestResponse(api, params, Handler.create(this, function (result: any) {
                GFLog(result);
                if (result.errcode == "0") {
                     let dialog = new GFArenaNoticeDialog("");
                     dialog.showContent(result,roid,false);
                     dialog.popup();
                }else if(result.errcode == "203") {
                    let dialog = new GFArenaNoticeDialog("");
                     dialog.showContent(result,roid,false);
                     dialog.popup();
                }else {
                    new GFCenterMsgDialog(result.msg);
                }
            }));
        }
    }
    export class inputView extends Sprite {
        public input : TextInput = new TextInput();
        private sendBtn : Button = new Button();
        private bg : Sprite = new Sprite();
        public dismissHandler : Handler;
        private canDismiss : boolean = true;
        public sendHandler : Handler;
        constructor(private inputPos : Point , private inputWidth : number ,private fontsize : number = 20 , private inputText : string = "" , private placeholder : string = "全服发消息，每条500金币") {
            super();
            this.configUI();
            Laya.stage.offAll('GFPostMessageInputView')
            Laya.stage.on('GFPostMessageInputView' , this , this.dismiss)
        }
        public dismiss() {
            GFLog("dismiss");
            Laya.stage.event("hideXuanzhantishi");
            if (this.dismissHandler) {
                this.dismissHandler.runWith(this.input.text);
            }
            this.removeSelf();
        }
        private configUI() {
            this.pos(Laya.stage.width / 2 , Laya.stage.height / 2);
            this.pivot(Laya.stage.width / 2 , Laya.stage.height / 2);
            this.size(1136, 640);
            this.addChild(this.bg);
            this.bg.pos(Laya.stage.width / 2 , Laya.stage.height / 2);
            this.bg.pivot(Laya.stage.width / 2, Laya.stage.height / 2);
            this.bg.on(laya.events.Event.CLICK , this , this.dismiss);
            this.bg.loadImage("comp/bg_touming.png");
            this.addChild(this.sendBtn);
            this.addChild(this.input);

            this.sendBtn.pivot(44,20);
            this.sendBtn.pos(this.inputPos.x + this.inputWidth / 2 + 10 + 44 , this.inputPos.y);
            this.sendBtn.stateNum = 2;
            this.sendBtn.skin = SEXSKINNAME[2];
            this.sendBtn.on(laya.events.Event.CLICK , this , this.send)

            this.input.pos(this.inputPos.x, this.inputPos.y);
            this.input.pivot(this.inputWidth / 2 , 25);
            this.input.height = 50;
            this.input.width = this.inputWidth;
            this.input.align = "left";
            this.input.valign = "middle";
            this.input.fontSize = this.fontsize;
            this.input.prompt = this.placeholder;
            this.input.color = ColorSize(1);
            this.input.text = this.inputText;
        }
        private send() {
            if(this.sendHandler) {
                this.sendHandler.run();
            }
        }
    }
    export class GFXuanzhantishi extends Image {
        private notice : Label = new Label();
        private iKnow : Button = new Button();
        private price : Label = new Label()
        constructor() {
            super();
            this.configUI();
        }
        private configUI() {
            Laya.stage.on("hideXuanzhantishi" , this , this.removeSelf);
            Laya.stage.addChild(this);
            this.top = 60;
            this.right = 140;
            this.zOrder = 1000;
            // this.pos(Laya.stage.width/2 , Laya.stage.height/2);
            this.size(300 , 200);
            this.loadImage("comp/bg_fasongtishi.png");

            this.addChild(this.notice);
            this.notice.color = ColorSize(11);
            this.notice.fontSize = 24;
            this.notice.text = "点击发送向全服宣战";
            this.notice.align = "center";
            this.notice.valign = "middle";
            this.notice.centerX = 0;
            this.notice.centerY = -50;

            this.addChild(this.price)
            this.price.color = ColorSize(1);
            this.price.fontSize = 22;
            this.price.bold = true
            this.price.text = "每条500金币";
            this.price.align = "center";
            this.price.valign = "middle";
            this.price.centerX = 0;
            this.price.centerY = -17;

            this.addChild(this.iKnow);
            this.iKnow.size(180 , 58);
            this.iKnow.centerX = 0;
            this.iKnow.centerY = 40;
            this.iKnow.label = "我知道了";
            this.iKnow.skin = "comp/btn_xuanzhan.png";
            this.iKnow.stateNum = 2;
            this.iKnow.labelSize = 24;
            this.iKnow.labelColors = "#ffffff,#ffffff,#ffffff,#ffffff";
            this.iKnow.labelPadding = "0 , 0 , 5 , 0";
            this.iKnow.on(laya.events.Event.CLICK , this , this.removeSelf);
        }
    }
    export class messageDialog extends Sprite {
        static arr : Array<string> = new Array();
        private bg : Sprite = new Sprite();
        private list : List = new List();
        constructor(private posX : number = Laya.stage.width / 2 ,private posY : number = Laya.stage.height / 2 ,private pivot_x : number = 444 ,private position : GFPostMessageViewPosition) {
            super();
            this.configUI();
            GFLog(messageDialog.arr);
            Laya.stage.offAll('GFPostMessageDialog')
            Laya.stage.on('GFPostMessageDialog' , this , this.dismiss)
        }
        private configUI() {
            this.pos(Laya.stage.width / 2 , Laya.stage.height / 2);
            this.pivot(Laya.stage.width / 2 , Laya.stage.height / 2);
            this.addChild(this.bg);
            this.bg.pos(Laya.stage.width / 2 , Laya.stage.height / 2);
            this.bg.pivot(Laya.stage.width / 2, Laya.stage.height / 2);
            this.bg.on(laya.events.Event.CLICK , this , this.dismiss);
            this.bg.loadImage(TOUMINGNAME[0]);
            this.addChild(this.list);
            if (this.position == GFPostMessageViewPosition.gameroom) {
                Item.WID = 544;
                this.list.loadImage(LISTBGNAME[0]);
            }else {
                Item.WID = 634; 
                this.list.loadImage(LISTBGNAME[1]);
            }
            this.list.itemRender = Item;
            this.list.repeatX = 1;
            this.list.vScrollBarSkin = undefined;
            this.list.renderHandler = new Handler(this , this.updateItem);    
            this.list.pos(this.posX , this.posY);
            this.list.pivot(this.pivot_x , 144);
            this.freshList();
        }
        private dismiss() {
            this.removeSelf();
        }
        public freshList() {
            this.list.repeatY = messageDialog.arr.length;
            this.list.array = messageDialog.arr;
            this.list.refresh();
        }
        private updateItem(cell: Item, index: number): void {
            cell.label.text = cell.dataSource;
            if(this.position == 1) {
                cell.label.fontSize = 19;
            }else {
                cell.label.fontSize = 20;
            }
        }
    }
    class Item extends Box {
        public static WID = 404;
        public static HEI = 52;
        public label : Label = new Label();
        constructor() {
            super();
            this.addChild(this.label);
            this.label.fontSize = 22;
            this.label.name = "title";
            this.label.size(Item.WID , Item.HEI);
            this.label.overflow = "hidden";
            this.label.padding = "20,20,10,20";
            this.label.color = ColorSize(1);
        }
    }
}