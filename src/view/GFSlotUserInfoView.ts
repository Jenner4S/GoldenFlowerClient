const GFSlotUserChipNumberUpdateEvent = "GFSlotUserChipNumberUpdateEvent";
const GFSlotUserPointUpdateEvent = "GFSlotUserPointUpdateEvent";
module view {
    import GFColorWithNumber = model.getColorWithNumber;
    import GFPlayer = model.GFPlayer;
    /**
     * GFSlotUserInfoView 
     */
    export class GFSlotUserInfoView extends ui.GFSlotUserInfoUI {
        constructor(public player?:GFPlayer) {
            super();
            this.pointLabel.color = GFColorWithNumber(2);
            if (player){
                this.renderPlayer();
            }
            this.avatarImage.on(laya.events.Event.LOADED,this,function (params:any) {
                if (!this.avatarImage.source){
                    this.avatarImage.skin = "comp/image_youxitouxiang.png"
                }
            })
            this.on(GFSlotUserChipNumberUpdateEvent,this.chipLabel, this.chipLabel.changeText);
            this.on(GFSlotUserPointUpdateEvent, this.pointLabel, this.pointLabel.changeText);
        }

        public renderPlayer(player ?:GFPlayer) {
            if (player){
                this.player = player;
            }
            if (this.player) {
                this.nameLabel.changeText(this.player.name);
                this.avatarImage.skin = this.player.imgurl;
                this.pointLabel.changeText(this.player.point);
                this.chipLabel.changeText(this.player.chipnumber);
                if (this.player.vip > 0) {
                    if (this.player.svip == 1 && (this.player.vip < GFPlayerView.vipImageArray.length)) {
                        this.levelImage.skin = GFPlayerView.vipImageArray[this.player.vip];
                    } else {
                        this.levelImage.skin = GFPlayerView.vipImageArray[0];
                    }
                }

            }
        }
    }
}