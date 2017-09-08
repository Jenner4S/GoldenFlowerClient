module view {
    import Button = Laya.Button;
    import List = laya.ui.List
    import Box = laya.ui.Box;
    import Image = laya.ui.Image;
    import Label = laya.ui.Label;
    export class GFIndianRecordView extends View {
        private backButton = new Button()
        private connectButton = new Button()
        private list = new List()
        private emptyLabel = new Label()
        private emptyImage = new Image()
        constructor() {
            super()
            this.configUI()
            this.requestData()
        }
        private configUI() {
            this.size(1136 , 640)
            this.loadImage("comp/bg_zhongjiangjilu.png")

            this.addChild(this.backButton)
            this.backButton.size(160 , 86)
            this.backButton.skin = 'comp/btn_jinhu_fanhui.png'
            this.backButton.top = 56
            this.backButton.left = 26
            this.backButton.stateNum = 2
            this.backButton.on(laya.events.Event.CLICK , this , this.back)

            this.addChild(this.connectButton)
            this.connectButton.size(240 , 86)
            this.connectButton.skin = 'comp/btn_lianxikefu.png'
            this.connectButton.top = 56
            this.connectButton.right = 26
            this.connectButton.stateNum = 2
            this.connectButton.on(laya.events.Event.CLICK , this , this.connect)

            this.addChild(this.list)
            this.list.top = 168
            this.list.bottom = 70
            this.list.left = 50
            this.list.right = 50
            this.list.itemRender = Item;
            this.list.repeatX = 1;
            this.list.vScrollBarSkin = undefined;
            this.list.renderHandler = new Handler(this , this.updateItem); 

            this.addChild(this.emptyLabel)
            this.emptyLabel.fontSize = 26
            this.emptyLabel.color = '#baa7f1'
            this.emptyLabel.text = '再努力一点点，就能成功夺宝啦！'
            this.emptyLabel.size(400 , 26)
            this.emptyLabel.align = 'center'
            this.emptyLabel.centerX = 0
            this.emptyLabel.top = 220
            this.emptyLabel.visible = false

            this.addChild(this.emptyImage)
            this.emptyImage.size(270 , 256)
            this.emptyImage.centerX = 0
            this.emptyImage.top = 282
            this.emptyImage.loadImage('comp/image_kongjilu.png')
            this.emptyImage.visible = false   
        }
        private requestData() {
            model.getUrlRequestResponse("indiana/winlist", undefined, Handler.create(this, function (result: any) {
                if (result.errcode == 0) {
                    if(result.list && result.list.length) {
                        this.list.visible = true
                        this.emptyLabel.visible = false
                        this.emptyImage.visible = false
                        this.freshList(result);
                    }else {
                        this.list.visible = false
                        this.emptyLabel.visible = true
                        this.emptyImage.visible = true
                    }
                }
            }), true);
        }
        private back() {
            this.removeSelf()
        }
        private connect() {
            let friendList = new view.GFFriendListView(true);
            friendList.popup();
        }
        public freshList(result) {
            this.list.repeatY = result.list.length;
            this.list.array = result.list;
            this.list.refresh();
        }
        private updateItem(cell: Item, index: number): void {
            cell.setData(cell.dataSource)
        }
    }
    class Item extends Box {
        public static WID = 1036;
        public static HEI = 142;
        private headImage = new Image()
        private title = new Label()
        private dateLabel = new Label()
        private priceLabel = new Label()
        private box = new Label()
        private codeLabel = new Label()
        private state = new Label()
        constructor() {
            super();
            this.width = Item.WID
            this.height = Item.HEI
            this.loadImage('comp/bg_zhongjiang_tiao.png')
            this.addChild(this.headImage)
            this.headImage.size(100 , 100)
            this.headImage.top = 16
            this.headImage.left = 34

            this.addChild(this.title)
            this.title.fontSize = 26
            this.title.overflow = 'hidden'
            this.title.color = '#221443'
            this.title.bold = true
            this.title.left = 164
            this.title.top = 26
            this.title.right = 220
            this.title.height = 26

            this.addChild(this.dateLabel)
            this.dateLabel.fontSize = 25
            this.dateLabel.color = '#32215a'
            this.dateLabel.bold = true
            this.dateLabel.top = 28
            this.dateLabel.right = 30
            this.dateLabel.height = 26
            this.dateLabel.align = 'right'
            this.dateLabel.width = 300

            this.addChild(this.priceLabel)
            this.priceLabel.fontSize = 26
            this.priceLabel.left = 198
            this.priceLabel.top = 70
            this.priceLabel.align = 'left'
            this.priceLabel.height = 26
            this.priceLabel.font = "jinbishouru"
            this.priceLabel.width = 400

            this.addChild(this.box)
            this.box.fontSize = 24
            this.box.top = 80
            this.box.color = '#dfedff'
            this.box.align = 'right'
            this.box.bold = true
            this.box.height = 24
            this.box.right = 550
            this.box.width = 400

            this.addChild(this.codeLabel)
            this.codeLabel.fontSize = 24
            this.codeLabel.color = '#ffffff'
            this.codeLabel.align = 'right'
            this.codeLabel.height = 24
            this.codeLabel.top = 80
            this.codeLabel.bold = true
            this.codeLabel.right = 270
            this.codeLabel.width = 300
            // this.codeLabel.graphics.drawRect(0,0,this.codeLabel.width,this.codeLabel.height,'#ffffff')

            this.addChild(this.state)
            this.state.fontSize = 28
            this.state.color = '#ffffff'
            this.state.bold = true
            this.state.top = 80
            this.state.right = 54
            this.state.align = 'right'
            this.state.height = 28
            this.state.width = 200
        }
        public setData(obj) {
            if(obj) {
                this.headImage.skin = obj.image
                this.dateLabel.text = obj.date
                this.title.text = obj.name
                this.priceLabel.text = obj.price + '元'
                this.box.text = obj.irid + '号夺宝机'
                this.codeLabel.text = '提货码:' + obj.code
                this.state.text = obj.status == 1 ? '未提货' : '已提货'
            }
        }
    }
}