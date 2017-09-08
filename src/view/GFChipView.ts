module view {
    import Clip = laya.ui.Clip;
    import Sprite = Laya.Image;
    import GFChip = model.GFChip;
    import Point = laya.maths.Point;
    const CHIP_WIDTH = 60;
    /**
     * GFChipView
     */
    export class GFChipView extends Sprite {
        static chipClip: Clip;
        static loadChipClip() {
            if (!GFChipView.chipClip) {
                GFChipView.chipClip = new Clip("comp/bg_chouma.png", 5, 4)
            }
        }
        constructor(public chip?: GFChip) {
            super();
            this.size(CHIP_WIDTH, CHIP_WIDTH);
            this.pivot(CHIP_WIDTH / 2, CHIP_WIDTH / 2);
            GFChipView.loadChipClip();
            if (chip) {
                this.rendChip(chip);
            }
        }
        public get randomDestination(): Point {
            let x = 368 + Math.random() * 400;
            let y = 195 + Math.random() * 250;
            return new Point(x, y);
        }
        public rendChip(chip?: GFChip) {
            if (chip) {
                this.chip = chip;
            }
            if (this.chip) {
                if (this.chip.isBaseChip){
                    this.skin = this.chip.baseChipUrl;
                }else{
                    GFChipView.chipClip.index = this.chip.index;
                    this.graphics.drawTexture(GFChipView.chipClip.bitmap.source, 0, 0, CHIP_WIDTH, CHIP_WIDTH);
                }
            }
        }
    }
}