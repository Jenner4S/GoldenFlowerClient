module model {
    export enum GFGameMessageActionType {
        Enter = 1,//进入
        Quit,//退出
        Prepare,//准备
        AddBaseChip,//押注
        Follow,//跟注
        AddChip,//加注
        Look,//看牌
        Compare,//比牌
        Finish,//开牌
        GiveUp,//放弃
        SendVoice,//发送语音
        SendEmoji,//发送表情
        SendGift,//发送礼物
        RoundBegin = 30,//开始发牌
        PokerTurn = 31,//轮到谁出牌
        BankerChange = 32,//庄家切换
        Relieve = 33,//发救济金
        Audience = 50,//观众数目
        ForceQuit = 51,//强制退出
        Challenger = 52,//擂主切换
        TipMsg = 53,//小费消息
        PointChange = 54,//金币变化
        MultiCard = 55,//翻倍卡
    }
    /**
     * GFGameMessage
     */
    export class GFGameMessage implements GFSerializable<GFGameMessage> {
        public timestamp: string;
        public action: GFGameMessageActionType;
        public urid: string;
        public roid: string;
        public toUrid: string;
        public resourceIdx: number;
        public result: boolean;
        public canFollow: boolean;
        public canAdd: boolean;
        public canCompare: boolean;
        public chip: GFChip;
        public gift: GFGift;
        public users: Array<GFPlayer>;
        public totalChip: number;
        public msg: string;
        public isStart: boolean;
        public viewers: number;
        public quitType: number;
        constructor() {
            this.users = new Array<GFPlayer>();
        }
        deserialize(input) {
            this.timestamp = input.timestamp;
            this.action = input.action;
            this.urid = input.urid;
            this.roid = input.roid;
            this.toUrid = input.toUrid;
            this.canFollow = input.canFollow;
            this.canAdd = input.canAdd;
            this.canCompare = input.canCompare;
            this.resourceIdx = input.resourceIdx;
            this.result = input.result;
            this.totalChip = input.totalChip;
            if (input.chip) {
                this.chip = new GFChip().deserialize(input.chip);
            }
            if (input.gift) {
                this.gift = new GFGift().deserialize(input.gift);
            }
            this.msg = input.msg;
            this.isStart = input.isStart;
            this.viewers = input.viewers;
            this.quitType = input.quitType;
            if (input.users) {
                input.users.forEach(jsonUser => {
                    let user = new GFPlayer().deserialize(jsonUser);
                    this.users.push(user);
                });
            }
            return this;
        }
        getMyself() {
            let myself = null;
            this.users.forEach(user => {
                if (user.isMyself) {
                    myself = user;
                    return;
                }
            });
            return myself;
        }
    }
}