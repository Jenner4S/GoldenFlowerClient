module view {
    import UIButton = laya.ui.Button;
    import UILabel = laya.ui.Label;
    import UIImage = laya.ui.Image;
    import UIView = laya.ui.View;
    import UIEvent = laya.events.Event;
    import GFColorFacotry = model.getColorWithNumber;
    /**
     * GFArenaHelpDialog
     */
    export class GFArenaHelpDialog extends laya.ui.Dialog {
        constructor() {
            super();
            this.size(this.stage.width,this.stage.height);
            let backGround = new UIView();
            backGround.size(this.width,this.height);
            backGround.on(UIEvent.CLICK, this, this.close);
            this.addChild(backGround);
            let alertBg = new UIImage("comp/bg_wenzitishi.png");
            alertBg.centerX = 0;
            alertBg.centerY = 0;
            this.addChild(alertBg);
            let closeButton = new UIButton("comp/btn_tanchuangchacha.png");
            closeButton.stateNum = 2;
            closeButton.pos(alertBg.x+550, alertBg.y);
            closeButton.on(UIEvent.CLICK, this, this.close);
            let textLabel = new UILabel("擂台赛参战每人底注最低10万\n可多人观战，观战有可能收到小费哦\n擂主可挑战好友，发全服擂台广播");
            textLabel.dataSource = { color: GFColorFacotry(11), fontSize: 30, width: 500, align: Stage.ALIGN_LEFT, overflow: "visible", valign: Stage.ALIGN_MIDDLE, wordWrap: true, centerX: 0, centerY: 0, leading: 10 };
            this.addChild(textLabel);
            this.addChild(closeButton);
        }
    }
}