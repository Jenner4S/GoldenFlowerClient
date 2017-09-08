module view {
    const GFBadNetViewClose = "GFBadNetViewClose";
    import Image = laya.ui.Image;
    import Label = laya.ui.Label;
    import Handler = laya.utils.Handler;
    import Button = laya.ui.Button;
    export class GFBadNetView extends View {
        private bg : Image = new Image();
        private title : Image = new Image();
        private quanquan : Image = new Image();
        private quanquan_li : Image = new Image();
        private notice : Label = new Label()
        private btn : Button = new Button()
        static show(msg : string) {
                let badView = new GFBadNetView(msg);
                badView.name = 'GFBadNetView';
                Laya.stage.addChild(badView)
        }
        static close() {
            let bad = Laya.stage.getChildByName('GFBadNetView')
            if(bad) {
                Laya.stage.removeChild(bad)
            }
        }
        constructor(private msg : string) {
            super();
            this.configUI();
        }
        private configUI() {
            // this.timer.once(10000 , this , function() {
            //     if(this.tooLongTime) {
            //         this.tooLongTime.run();
            //     }
            //     this.changeUI();
            // })

            this.size(1136 , 640);
            this.loadImage('comp/bg_zhezhao.png')

            this.addChild(this.bg);
            this.bg.loadImage('comp/bg_gaoshi.png')
            this.bg.centerX = 0;
            this.bg.centerY = -5;
            this.bg.size(720 , 490)

            this.addChild(this.title);
            this.title.loadImage('comp/image_tishi.png')
            this.title.centerX = 0;
            this.title.top = 90;
            this.title.size(64 , 36)

            // this.addChild(this.quanquan_li)
            // this.quanquan_li.loadImage('comp/image_quanquan_li.png')
            // this.quanquan_li.size(90 , 90)
            // this.quanquan_li.top = 236
            // this.quanquan_li.centerX = 0

            // this.quanquan_li.addChild(this.quanquan)
            // this.quanquan.loadImage('comp/image_quanquan.png')
            // this.quanquan.size(90 , 90)
            // this.quanquan.pos(45 , 45)
            // this.quanquan.pivot(45 , 45)

            // this.timer.frameLoop(1 , this , this.animate);

            //add msg
            this.notice.fontSize = 28
            this.notice.color = '#ffffff'
            this.notice.centerX = 0
            this.notice.centerY = 0
            this.notice.wordWrap = true;
            this.notice.valign = 'center';
            this.notice.align = 'center';
            this.notice.leading = 10;
            this.notice.width = 605;
            // this.notice.size(605,230);
            this.notice.text = this.msg;
            this.addChild(this.notice)

            this.addChild(this.btn)
            this.btn.skin = 'comp/btn_gaoshi_queding.png'
            this.btn.stateNum = 2;
            this.btn.size(220 , 80)
            this.btn.centerX = 0;
            this.btn.bottom = 110
            this.btn.on(laya.events.Event.CLICK , this , function() {
                GFBadNetView.close()
            })
        }
        private changeUI() {
            // this.quanquan.visible = false;
            // this.quanquan_li.visible = false;
            // this.notice.top = 280
            // // this.notice.text = thi


        }
        private animate() {
            this.quanquan.rotation += 7;
        }
    }
}