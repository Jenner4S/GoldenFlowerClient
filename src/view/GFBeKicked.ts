module view {
    import Image = laya.ui.Image;
    import HTMLDivElement = Laya.HTMLDivElement;
    import Button = laya.ui.Button;
    export class GFBeKickedView extends View {
        private bg : Image = new Image();
        private htmlLabel : HTMLDivElement = new HTMLDivElement();
        private trueBtn : Button = new Button();
        private backBtn : Button = new Button();
        static show(name : string , roid : string , isArena : boolean) {
            Laya.stage.addChild(new GFBeKickedView(name , roid , isArena));
        }
        constructor(private userName : string , private roid : string , private isArena : boolean) {
            super();
            this.configUI();
        }
        private clickTrue() {
            this.removeSelf();
        }
        private clickBack() {
            Laya.stage.event('BeKickedBack' , [this.roid , this.isArena])
            this.removeSelf();
        }
        private configUI() {
            this.size(1136 , 640);
            this.loadImage('comp/bg_zhezhao.png')

            this.addChild(this.bg);
            this.bg.loadImage('comp/bg_wenzitishi.png')
            this.bg.centerX = 0;
            this.bg.centerY = -2;
            this.bg.size(610 , 412)

            this.bg.addChild(this.htmlLabel)
            this.htmlLabel.style.fontSize = 30
            let html : string = "<span color='#ffffff'>被玩家&nbsp;</span>";
            html += "<span color='#ffcc19'>" + this.userName + "</span>";
			html += "<span color='#ffffff'>&nbsp;踢出房间。</span>";
            this.htmlLabel.innerHTML = html
            this.htmlLabel.x = 305
            this.htmlLabel.width = 484
            this.htmlLabel.y = 134
            this.htmlLabel.layout()
            let width = this.htmlLabel.contextWidth
            let height = this.htmlLabel.contextHeight
            this.htmlLabel.width = width
            this.htmlLabel.height = height
            this.htmlLabel.pivot(width / 2, 0)
            this.htmlLabel.layout()
            
            this.bg.addChild(this.trueBtn)
            this.trueBtn.skin = 'comp/btn_150x58.png'
            this.trueBtn.stateNum = 2
            this.trueBtn.size(150 , 58)
            this.trueBtn.label = '确定'
            this.trueBtn.bottom = 66
            this.trueBtn.left = 125
            this.trueBtn.labelBold = true
            this.trueBtn.labelSize = 24
            this.trueBtn.labelColors = '#721e01,#721e01,#721e01,#721e01'
            this.trueBtn.labelPadding = '0 , 0 , 5 , 0'
            this.trueBtn.on(laya.events.Event.CLICK , this , this.clickTrue)

            this.bg.addChild(this.backBtn)
            this.backBtn.skin = 'comp/btn_yanzhengma.png'
            this.backBtn.stateNum = 3
            this.backBtn.size(180 , 58)
            this.backBtn.label = '返回房间'
            this.backBtn.bottom = 66
            this.backBtn.right = 125
            this.backBtn.labelBold = true
            this.backBtn.labelSize = 24
            this.backBtn.labelColors = '#ffffff,#ffffff,#ffffff,#ffffff'
            this.backBtn.labelPadding = '0 , 0 , 5 , 0'
            this.backBtn.on(laya.events.Event.CLICK , this , this.clickBack)
        }
    }
}