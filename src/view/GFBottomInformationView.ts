module view {
    import Sprite = Laya.Sprite;
    import Tween = laya.utils.Tween;
    export class GFBottomInformationView extends Sprite {
        private label_left_information: Label;
        private label_right_information: Label;
        private label_left_information2: Label;
        private label_right_information2: Label;
        private white: String;
        private yellow: String;
        private leftXPos;
        private rightXPos;
        private left2XPos;
        private right2XPos;

        constructor(white: String, yellow: String) {
            super();

            this.white = white;
            this.yellow = yellow;
            if (this.white == undefined || this.white == null
                || this.yellow == undefined || this.yellow == null)
                return;
            this.initInformationLabels();
        }

        private initInformationLabels() {
            this.leftXPos = 40;
            GFLog("this.leftXPos = " + this.leftXPos);
            this.label_left_information = new Label();
            this.label_left_information.text = "" + this.white;
            this.label_left_information.fontSize = 26;
            this.label_left_information.color = "#ffffff";
            this.label_left_information.pos(this.leftXPos, 0);
            this.addChild(this.label_left_information);

            this.rightXPos = this.leftXPos + this.label_left_information.text.length * 26 + 40;
            GFLog("this.rightXPos = " + this.rightXPos);
            this.label_right_information = new Label();
            this.label_right_information.text = "" + this.yellow;
            this.label_right_information.fontSize = 26;
            this.label_right_information.color = "#ffcc19";
            this.label_right_information.pos(this.rightXPos, 0);
            this.addChild(this.label_right_information);

            this.left2XPos = this.rightXPos + this.label_right_information.text.length * 26 + this.leftXPos;
            GFLog("this.left2XPos = " + this.left2XPos);
            this.label_left_information2 = new Label();
            this.label_left_information2.text = "" + this.white;
            this.label_left_information2.fontSize = 26;
            this.label_left_information2.color = "#ffffff";
            this.label_left_information2.pos(this.left2XPos, 0);
            this.addChild(this.label_left_information2);

            this.right2XPos = this.left2XPos + this.label_left_information2.text.length * 26 + this.leftXPos + 40;
            GFLog("this.right2XPos = " + this.right2XPos);
            this.label_right_information2 = new Label();
            this.label_right_information2.text = "" + this.yellow;
            this.label_right_information2.fontSize = 26;
            this.label_right_information2.color = "#ffcc19";
            this.label_right_information2.pos(this.right2XPos, 0);
            this.addChild(this.label_right_information2);

            this.scrollStep1();
        }

        private scrollStep1() {
            let timeduration: number = 13000;
            this.label_left_information.x = this.leftXPos;
            this.label_right_information.x = this.rightXPos;
            this.label_left_information2.x = this.left2XPos;
            this.label_right_information2.x = this.right2XPos;
            Tween.to(this.label_left_information, { x: -(this.right2XPos - this.rightXPos) }, timeduration);
            Tween.to(this.label_right_information, { x: -(this.left2XPos - this.rightXPos) }, timeduration);
            Tween.to(this.label_left_information2, { x: this.leftXPos }, timeduration);
            Tween.to(this.label_right_information2, { x: this.rightXPos}, timeduration, null, Handler.create(this, function () {
                this.scrollStep2();
            }));
        }

        private scrollStep2() {
            let timeduration: number = 13000;
            this.label_left_information.x = this.left2XPos;
            this.label_right_information.x = this.right2XPos;
            this.label_left_information2.x = this.leftXPos;
            this.label_right_information2.x = this.rightXPos;

            Tween.to(this.label_left_information2, { x: -(this.right2XPos - this.rightXPos) }, timeduration);
            Tween.to(this.label_right_information2, { x: -(this.left2XPos - this.rightXPos) }, timeduration);
            Tween.to(this.label_left_information, { x: this.leftXPos }, timeduration);
            Tween.to(this.label_right_information, { x: this.rightXPos }, timeduration, null, Handler.create(this, function () {
                this.scrollStep1();
            }));
        }

    }
}