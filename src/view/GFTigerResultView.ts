module view {
    import Image = Laya.Image;
    import Label = Laya.Label;
    export class GFTigerResultView extends View{
        private bg_image:Image;
        public label:Label;
        public centerLabel:Label;
        public rightLabel:Label;
        constructor(){
            super();
            this.setup();
        }
        private setup(){
            this.bg_image = new Image("comp/bg_jieguotiao.png");
            this.bg_image.size(460, 46);
            this.bg_image.centerX = 0;
            this.bg_image.centerY = 0;
            this.addChild(this.bg_image);

            this.label = new Label();
            this.label.centerY = 0;
            this.label.left = 364-234;
            this.label.height = 26;
            this.label.fontSize = 22
            this.label.bold = true
            this.label.color = model.getColorWithNumber(1);
            this.label.text = ''
            this.bg_image.addChild(this.label)

            this.rightLabel = new Label();
            this.rightLabel.top = 7;
            this.rightLabel.font = "jinbishouru";
            this.rightLabel.fontSize = 26
            this.rightLabel.bold = true
            this.rightLabel.text = '+1500';
            this.bg_image.addChild(this.rightLabel)
        }
        public setData(lefttext:string,righttext:string){
            this.label.text = lefttext;
            this.rightLabel.text = Number(righttext)>0?"+"+righttext:righttext;
            this.rightLabel.left = this.label.left +this.label.width + 16;
        }
    }
}