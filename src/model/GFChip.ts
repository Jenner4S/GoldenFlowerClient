module model {
    /**
     * GFChip
     */
    export class GFChip implements GFSerializable<GFChip> {
        static valueArray = [
            [
                10, 30, 50, 80, 100
            ], [
                100, 300, 500, 800, 1000
            ], [
                1000, 3000, 5000, 8000, 10000
            ], [
                10000, 30000, 50000, 80000, 100000
            ]
        ];

        static getMinChipOfLevel(level:number){
            let value = GFChip.valueArray[level][0];
            return new GFChip(value,level);
        }

        public isBaseChip;
        public baseChipUrl;
        public get index(): number {
            let values = GFChip.valueArray[this.level];
            let index = values.indexOf(this.value);
            return values.length * this.level + index;
        }

        constructor(public value: number = 10, public level: number = 0, public multiply: number = 1) {
            this.isBaseChip = false;
        }

        deserialize(input) {
            if (input) {
                this.value = input.value;
                this.level = input.level;
                this.multiply = input.multiply;
            }
            return this;
        }
    }
}