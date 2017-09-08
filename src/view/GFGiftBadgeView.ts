module view{
    /**
     * name
     */
    export class GiftBadgeView extends laya.display.Sprite{
        private image :Laya.Image;
        private label :Laya.Label;
        private badgeValue:any;
        constructor(){
            super();
            this.addImage();
            this.addLabel();
        }
        public setBadgeValue(badge:any){
            this.badgeValue = badge;
            this.label.text = badge;
            if (Number(badge) <= 0) {
                this.visible = false;
            } else {
                this.visible = true;
                
                let skin:string;
                let length = String(badge).length;
                
                skin = "comp/image_liwudian"+length+".png";
                this.image.skin = skin;
                this.label.width = this.width;
            }
        }
        public setReadBadgeValue(badge:any){ 
            this.setBadgeValue(Number(this.badgeValue) - Number(badge));
        }
        private addImage(){
            this.image = new Laya.Image();
            this.addChild(this.image);
        }

        private addLabel(){
            this.label = new Laya.Label();
            this.label.align = "center";
            this.label.fontSize = 20;
            this.label.color = model.getColorWithNumber(6);
            this.addChild(this.label);
        }
    }
}