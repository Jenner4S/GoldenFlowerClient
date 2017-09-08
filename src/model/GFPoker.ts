module model {
    export enum GFPokerStatus {
        HiddenValue = 0,
        Giveup,
        Loser,
        ShowValue,
    }
    /**
     * GFPoker
     */
    export class GFPoker implements GFSerializable<GFPoker> {
        public get textureIndex(): number {
            return this.type * 13 + this.value - 2;
        }
        constructor(public value: number = 2, public type: number = 0, public status: number = GFPokerStatus.HiddenValue) {

        }
        deserialize(input) {
            if (input) {
                this.value = input.value;
                this.type = input.type;
                this.status = input.status;
            }
            return this;
        }
    }
}