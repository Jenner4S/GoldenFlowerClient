module view{
    export class UserBadgeView extends laya.display.Sprite{
        private image :Laya.Image;
        private label :Laya.Label;
        public badgeValue:any;
        constructor(){
            super();
            this.addImage();
            this.addLabel();
        }

        public setBadgeValue(badge: any) {
            if (badge) {
                this.badgeValue = badge;
                this.label.text = badge;
                if (Number(badge) <= 0) {
                    this.visible = false;
                } else {
                    this.visible = true;
                    if (Number(badge) < 10) {
                        this.label.width = 24;
                        this.image.skin = "comp/image_hongdian1.png";
                    } else {
                        this.label.width = 40;
                        this.image.skin = "comp/image_hongdian2.png";
                    }
                    if (Number(badge) > 100) {
                        this.label.text = "99";
                    }
                }
            } else {
                this.badgeValue = 0;
                this.visible = false;
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
            this.label.fontSize = 22;
            this.label.color = "#ffffff";
            this.addChild(this.label);
        }
    }
}