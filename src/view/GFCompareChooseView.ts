module view {
    import Dialog = laya.ui.Dialog;
    import Image = laya.ui.Image;
    import Event = laya.events.Event;
    import GFSignal = model.GFSignal;
    import GFPlayerPosition = model.GFPlayerPosition;

    export interface GFCompareChooseItem {
        position: GFPlayerPosition;
        urid: string;
    }
    /**
     * GFCompareChooseView
     */
    export class GFCompareChooseView extends Dialog {
        private chooseItems: Array<GFCompareChooseItem>;
        public chooseSignal: GFSignal<string>;
        constructor(items?: Array<GFCompareChooseItem>) {
            super();
            this.chooseSignal = new GFSignal();
            let background = new Image("comp/bg_zhezhao.png");
            background.on(Event.CLICK, this, this.close);
            this.addChild(background);
            if (items) {
                this.renderChooseItem(items);
            }
            Laya.stage.on(GFRemovePlayerEvent,this,this.removeItemWithUrid);
        }

        private chooseUser(urid: string) {
            this.chooseSignal.dispatch(urid);
            this.close();
        }

        private removeItemWithUrid(urid: string) {
            if (urid) {
                this.removeChildByName(urid + '_1');
                this.removeChildByName(urid + '_2');
            }
            if (this.numChildren == 1) {
                this.close();
            }
        }

        public renderChooseItem(items?: Array<GFCompareChooseItem>) {
            if (items.length) {
                this.chooseItems = items;
            }
            if (this.chooseItems.length) {
                this.chooseItems.forEach(item => {
                    let chooseArea: Image = new Image("comp/image_bipaikuang.png");
                    chooseArea.on(Event.CLICK, this, this.chooseUser, [item.urid]);
                    let arrow:Image = new Image();
                    chooseArea.name = item.urid+'_1';
                    arrow.name = item.urid+'_2';
                    switch (item.position) {
                        case GFPlayerPosition.LeftTop:
                            arrow.skin = "comp/image_shouzhi_zuo.png";
                            chooseArea.pos(30, 76);
                            arrow.pos(320,198);
                            break;
                        case GFPlayerPosition.LeftBottom:
                            arrow.skin = "comp/image_shouzhi_zuo.png";
                            chooseArea.pos(30, 296);
                            arrow.pos(320,418);
                            break;
                        case GFPlayerPosition.RightTop:
                            arrow.skin = "comp/image_shouzhi_you.png";
                            chooseArea.pos(816, 76);
                            arrow.pos(738,198);
                            break;
                        case GFPlayerPosition.RightBottom:
                            arrow.skin = "comp/image_shouzhi_you.png";
                            chooseArea.pos(816, 296);
                            arrow.pos(738,418);
                            break;
                        default:
                            chooseArea = null;
                            arrow = null;
                            break;
                    }
                    if (chooseArea) {
                        this.addChild(chooseArea);
                        this.addChild(arrow);
                    }
                });
            }
        }

    }
}