module view{
    import Sprite = laya.display.Sprite;
    import Image = laya.ui.Image;
    import Button = laya.ui.Button;
    import List = laya.ui.List;
    import Box = laya.ui.Box;
    import Label = laya.ui.Label;
    import Handler = laya.utils.Handler;

    export class GFChooseFriends extends Dialog {
        private bg : Image = new Image();
        private closeBtn : Button = new Button();
        private certain : Button = new Button();
        private list : List = new List();
        constructor(private choosedUrids = [],private disapearHandler : Handler){
            super();
            this.configUI();
            this.requestData(this , function(obj : any) {
                let data = this.filterIscs(obj)
                data = this.filterChoosed(data);
                this.freshList(data)
            });
        }
        private configUI(){     
            this.loadImage('comp/bg_zhezhao.png')
            this.size(1136 , 640);
            this.pos(0 , 0)

            this.addChild(this.bg);
            this.bg.loadImage('comp/bg_guanzhan.png')
            this.bg.size(824 , 598)
            this.bg.centerX = 0;
            this.bg.centerY = 0;

            this.bg.addChild(this.closeBtn);
            this.closeBtn.stateNum = 2;
            this.closeBtn.skin = 'comp/btn_dialog_close.png'
            this.closeBtn.right = 0;
            this.closeBtn.top = 0;
            this.closeBtn.size(73 , 73)
            this.closeBtn.on(laya.events.Event.CLICK , this , this.closeUnsave)

            this.bg.addChild(this.certain)
            this.certain.stateNum = 2;
            this.certain.skin = 'comp/btn_150x58.png'
            this.certain.centerX = 0;
            this.certain.bottom = 30
            this.certain.size(150 , 58)
            this.certain.label = '确定'
            this.certain.labelSize = 24;
            this.certain.labelBold = true
            this.certain.labelAlign = 'center'
            this.certain.labelColors = '#721e01,#721e01,#721e01,#721e01'
            this.certain.labelPadding = '11,10,10,50'
            this.certain.on(laya.events.Event.CLICK , this , this.closeSave)

            this.bg.addChild(this.list)
            this.list.top = 126;
            this.list.bottom = 130
            this.list.left = 54;
            this.list.right = 54;
            // this.list.graphics.drawRect(0 , 0 , this.list.width , this.list.height , "ffffff");
            this.list.repeatX = 2;
            this.list.vScrollBarSkin = undefined;
            this.list.itemRender = Item;
            this.list.renderHandler = new Handler(this , this.updateItem);
            this.list.spaceX = 16
            this.list.spaceY = 20
            this.list.visible = false
            Laya.stage.offAll('friendDetail');
            Laya.stage.offAll('friendChoose');
            Laya.stage.on('friendDetail' , this , function(id : string) {
                let urid = id
                let userDetail = new view.GFUserDetailDialog(urid);
                // this.addChild(userDetail)
                userDetail.popup();
            })
            Laya.stage.on('friendChoose', this, function (id: string) {
                let urid = id
                let obj: Array<any> = this.choosedUrids.filter(function (value: any, index: number, array: any[]) {
                    return value != urid
                }, this.choosedUrids)
                if (obj.length < this.choosedUrids.length) {
                    this.choosedUrids = obj
                } else {
                    this.choosedUrids.push(urid)
                }
            })
        }
        private freshList(data : any) {
            this.list.array = data
            this.list.refresh();
            this.list.visible = true
            GFLog('cell.cout = ' , + data.length)
        }
        private filterChoosed(arr : any) {
            for (var key in arr) {
                if (arr.hasOwnProperty(key)) {
                    var element = arr[key];
                    element.choosed = false
                    this.choosedUrids.filter(function (value: any, index: number, array: any[]) {
                        if(element.user.urid == value) {
                            element.choosed = true
                        }
                        return true
                    }, this.choosedUrids)
                }
            }
            return arr
        }
        private filterIscs(arr : any) {
            let data = []
            for (var key in arr) {
                if (arr.hasOwnProperty(key)) {
                    var element = arr[key];
                    if(element.iscs == '0') {
                        data.push(element)
                    }
                }
            }
            return data
        }
        private updateItem(cell: Item, index: number): void {
            cell.setData(cell.dataSource)
        }
        private requestData(caller : any , func : (obj : any ) => void) {
            let api = 'friend/list'
            let params = {'sub' : 1}
            model.getUrlRequestResponse(api, params, Handler.create(this, function (result: any) {
                GFLog(result);
                if (result.errcode == "0") {
                    func.apply(caller ,[result.user_list])
                }
            }));
        }
        private closeUnsave() {
            this.disappear();
        }
        private closeSave() {
            if(this.disapearHandler) {
                this.disapearHandler.runWith([this.choosedUrids])
            }
            this.disappear();
        }
        public show(){
            // Laya.stage.addChild(this);
            this.popup();
        }
        private disappear() {
            // Laya.stage.removeChild(this);
            this.close();
        }
    }

    class Item extends Box {
        public static WID = 350;
        public static HEI = 140;
        private head : Image = new Image()
        private sex : Image = new Image()
        public detail : Button = new Button()
        public choose : Button = new Button()
        private nickname : Label = new Label()
        private jinbi : Image = new Image()
        private point : Label = new Label()
        private urid : string;
        constructor() {
            super();
            this.configUI();
        }
        private configUI() {
            this.size(Item.WID , Item.HEI)
            this.loadImage('comp/bg_xuanhaoyou.png')

            this.addChild(this.head)
            this.head.size(70 , 70)
            this.head.left = 12
            this.head.top = 35

            this.addChild(this.sex)
            this.sex.size(38 , 38)
            this.sex.top = 36
            this.sex.left = 92

            this.sex.addChild(this.nickname)
            this.nickname.fontSize = 22
            this.nickname.color = "#ffffff"
            this.nickname.centerY = 0
            this.nickname.left = 46
            this.nickname.height = 22;
            this.nickname.width = 90
            this.nickname.overflow = 'hidden'

            this.addChild(this.jinbi)
            this.jinbi.loadImage('comp/youxi_jinbi.png')
            this.jinbi.size(24 ,24)
            this.jinbi.left = 92
            this.jinbi.top = 80

            this.jinbi.addChild(this.point)
            this.point.fontSize = 22
            this.point.color = "#ffcc19"
            this.point.centerY = 0
            this.point.left = 30
            this.point.height = 22;

            this.addChild(this.detail)
            this.detail.skin = 'comp/btn_guanzhan.png'
            this.detail.size(100 , 58)
            this.detail.stateNum = 2;
            this.detail.label = '查看'
            this.detail.labelSize = 20
            this.detail.labelBold = true
            this.detail.labelColors = '#721e01,#721e01,#721e01,#721e01'
            this.detail.top = 16
            this.detail.right = 16
            this.detail.labelPadding = '5,10,10,10'

            this.addChild(this.choose)
            this.choose.skin = 'comp/btn_guanzhan.png'
            this.choose.size(100 , 58)
            this.choose.stateNum = 2;
            this.choose.labelSize = 20
            this.choose.labelBold = true
            this.choose.labelColors = '#721e01,#721e01,#721e01,#721e01'
            this.choose.top = 80
            this.choose.right = 16
            this.choose.labelPadding = '5,10,10,10'
            // this.choose.label = '选中'
            this.detail.on(laya.events.Event.CLICK , this , function() {
                Laya.stage.event('friendDetail' , [this.urid])
            })
            this.choose.on(laya.events.Event.CLICK , this , function() {
                this.dataSource.choosed = !this.dataSource.choosed
                this.freshChoose(this.dataSource)
                Laya.stage.event('friendChoose' , [this.urid])
            })
        }
        public setData(obj : any) {
            if(obj) {
                this.head.loadImage(obj.user.imgurl , 0 , 0 , 70 , 70)
                let sexImg = 'comp/image_' + (obj.user.sex == '1'?'nan':'nv') + '.png'
                this.sex.loadImage(sexImg)
                this.nickname.text = obj.user.name
                this.point.text = obj.user.point 
                this.urid = obj.user.urid
            }
            this.freshChoose(obj)
        }
        public freshChoose(obj : any) {
            if(obj) {
                if(obj.choosed) {
                    this.choose.label = '已选中'
                }else {
                    this.choose.label = '选中'
                }
            }
        }
    } 
}