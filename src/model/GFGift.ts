module model {
    /**
     * GFGift
     */
    export class GFGift implements GFSerializable<GFGift> {
        constructor(public gfid?: string, public name?: string, public imgurl?: string, public point?: number) {

        }
        deserialize(input) {
            if (input) {
                this.gfid = input.gfid;
                this.name = input.name;
                this.imgurl = input.imgurl;
                this.point = input.point;
            }
            return this;
        }
    }
}