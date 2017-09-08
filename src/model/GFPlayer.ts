module model {
    export enum GFPlayerPosition {
        Center = 0,
        RightBottom,
        RightTop,
        LeftTop,
        LeftBottom

    }
    export enum GFPlayerSex {
        Women = 2,
        Man = 1
    }

    export enum GFPlayerStatus {
        Tourist = 0,
        Prepare,
        HidePoker,
        LookPoker,
        Loser,
        GiveUp,
        ShowPoker,
        Quit
    }
    /**
     * GFPlayer
     */
    export class GFPlayer implements GFSerializable<GFPlayer> {
        static myUrid: string = "1";
        public chipnumber: string;
        public vip: number;//vip等级
        public svip: number;//1显示，2隐藏
        public pokers: Array<GFPoker>;
        public referPosition: GFPlayerPosition;
        public doublecard: GFDoubleCard;
        constructor(public urid: string = null, public name: string = null, public imgurl: string = null, public point: string = null, public position: GFPlayerPosition = GFPlayerPosition.LeftBottom, public sex: GFPlayerSex = GFPlayerSex.Women, public status: GFPlayerStatus = GFPlayerStatus.Tourist) {
            this.pokers = new Array<GFPoker>();
            this.addPoker(new GFPoker(), new GFPoker(), new GFPoker());
            this.referPosition = GFPlayerPosition.Center;
        }
        deserialize(input) {
            if (input) {
                this.urid = input.urid;
                this.name = input.name;
                this.imgurl = input.imgurl;
                this.point = input.point;
                this.position = input.position;
                this.sex = input.sex;
                this.status = input.status;
                this.chipnumber = input.chipnumber;
                this.vip = input.vip;
                this.svip = input.svip;
                if (input.pokers) {
                    this.pokers = [];//empty pokers
                    input.pokers.forEach(jsonPoker => {
                        let poker = new GFPoker().deserialize(jsonPoker);
                        this.pokers.push(poker);
                    });
                }
                if (input.doublecard){
                    this.doublecard = new GFDoubleCard().deserialize(input.doublecard);
                }
            }
            return this;
        }


        public get isActive(): boolean {
            return (this.status == GFPlayerStatus.Prepare) || (this.status == GFPlayerStatus.HidePoker) || (this.status == GFPlayerStatus.LookPoker)
        }


        public get isMyself(): boolean {
            return this.urid == GFPlayer.myUrid ? true : false;
        }

        public get hasPoker(): boolean {
            if (this.status > GFPlayerStatus.Prepare && this.status < GFPlayerStatus.Quit) {
                return true;
            } else {
                return false;
            }
        }

        public get isInitialPokers(): boolean {
            let resultCount = 0;
            this.pokers.forEach(poker => {
                if (poker.type == 0 && poker.value == 2) {
                    resultCount++;
                }
            });
            return resultCount == this.pokers.length;
        }

        public addPoker(...pokers: GFPoker[]) {
            pokers.forEach(poker => {
                this.pokers.push(poker);
            });
        }

        public changePokersStatus(status: GFPokerStatus) {
            this.pokers.forEach(poker => {
                poker.status = status;
            });
        }
    }
}

