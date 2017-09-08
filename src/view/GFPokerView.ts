module view {
    import Clip = laya.ui.Clip;
    import Sprite = laya.display.Sprite;
    import GFPoker = model.GFPoker;
    import GFPokerStatus = model.GFPokerStatus;
    import Texture = laya.resource.Texture;
    import Tween = laya.utils.Tween;
    /**
     * GFPokerView
     */
    export class GFPokerView extends Sprite {
        static pokerClip: Clip;
        static loadPokerClip() {
            if (!GFPokerView.pokerClip) {
                GFPokerView.pokerClip = new Clip("comp/bg_pai_xiao.png", 13, 4);
            }
        }
        constructor(public poker?: GFPoker) {
            super();
            this.width = 50;
            this.height = 65;
            this.scaleX = -1;
            GFPokerView.loadPokerClip();
            if (poker) {
                this.renderPoker(poker);
            }
        }
        public renderPoker(poker?: GFPoker) {
            if (poker) {
                this.poker = poker;
            }
            if (this.poker) {
                switch (this.poker.status) {
                    case GFPokerStatus.HiddenValue:
                    default:
                        this.loadImage("comp/poker_hiddenValue.png", 0, 0, this.width, this.height);
                        break;
                    case GFPokerStatus.Giveup:
                        this.loadImage("comp/poker_giveup.png", 0, 0, this.width, this.height);
                        break;
                    case GFPokerStatus.Loser:
                        this.loadImage("comp/poker_loser.png", 0, 0, this.width, this.height);
                        break;
                    case GFPokerStatus.ShowValue: {
                        GFPokerView.pokerClip.index = this.poker.textureIndex;
                        this.animationToTexture(GFPokerView.pokerClip.bitmap.source);
                    }
                        break;
                }
            }
        }

        private animationToTexture(texture: Texture) {
            Tween.to(this, { scaleX: 1 }, 400);
            Laya.timer.once(200, this.graphics, this.graphics.drawTexture, [texture,0,0,this.width,this.height]);
        }
    }
}