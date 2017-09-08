module view {
    import Image = Laya.Image
    import List = Laya.List
    export class GFTigerIndianaListView extends View{
        private bg_image : Image
        private panelList : Laya.Panel
        private emptyImage : Image = new Image('comp/image_liebiaokong.png')
        private emptyLabel : Label = new Label()
        public tips : string
        constructor(){
            super()
            this.size(198,306)
            this.addSubView();
        }

        private addSubView(){
            this.bg_image = new Image("comp/bg_duobaojiangpin.png")
            this.bg_image.size(this.width,this.height)
            this.bg_image.pos(0,0)

            this.addChild(this.bg_image)


            this.panelList = new Laya.Panel();
            this.panelList.pos(10,28)
            this.panelList.size(this.width - 15,this.height - 50)
            this.panelList.vScrollBarSkin = "";
            this.addChild(this.panelList)

            
            this.addChild(this.emptyImage)
            this.emptyImage.size(160, 146)
            this.emptyImage.centerX = 0
            this.emptyImage.top = 44

            this.addChild(this.emptyLabel)
            this.emptyLabel.width = 160
            this.emptyLabel.centerX = 0
            this.emptyLabel.wordWrap = true
            this.emptyLabel.top = 200
            this.emptyLabel.bottom = 0
            this.emptyLabel.fontSize = 24
            this.emptyLabel.bold = true
            this.emptyLabel.color = '#dac3ff'
        }

        public setDataArray(array:any){
            this.panelList.removeChildren(0)
            if (array && array.length) {
                this.panelList.visible = true
                this.emptyImage.visible = false
                this.emptyLabel.visible = false
                let orignY = 0
                for (var i: number = 0; i < array.length; i++) {
                    let product: any = array[i];
                    product.index = i + 1;

                    let productView = new GFTigerIndianaProductView(product);
                    productView.pos(0, orignY);
                    orignY += productView.height;

                    this.panelList.addChild(productView);
                }
            }else {
                this.panelList.visible = false
                this.emptyImage.visible = true
                this.emptyLabel.visible = true
                this.emptyLabel.text = this.tips
            }
            this.panelList.scrollTo(0,0);
             this.panelList.refresh();
            
        }

    }

    export class GFTigerIndianaProductView extends View{
        public label1:Label 
        public label2:Label
        public label3:Label
        constructor (product:any){
            super()
            this.addSubViewWithIndex(product)
        }

        private addSubViewWithIndex(product:any){
            let label1 = new Label(product.index+".");
            label1.color = "#dac3ff"
            label1.bold = true
            label1.fontSize = 24;
            label1.pos(0,0)
            label1.name = "label1"
            this.label1 = label1;
            this.addChild(this.label1);

            let label2 = new Label(product.name);
            label2.color = "#dac3ff"
            label2.fontSize = 24;
            label2.bold = true
            label2.pos(label1.width,0)
            label2.width = 156
            label2.wordWrap = true
            label2.name = "label2"
            this.label2 = label2;
            this.addChild(this.label2);

            let label3 = new Label(product.price+"元");
            label3.color = "#ffffff"
            label3.fontSize = 26;
            label3.bold = true
            label3.pos(label1.width,label2.height+2)

            label3.name = "label3"
            this.label3 = label3;
            this.addChild(this.label3);
            this.height = label3.height + label3.y;
        }
    }
}