module model {
    /**
     * GFGroundInfo 场次
     */
    export class GFGroundInfo {
        public grid: string;//场次id，进入游戏时上传
        public imgurl: string; //场次图片
        public name: string; //场名称
        public type; //1-经典场次,2-擂台赛
        public level;//
        public point:number;//进场金币
        public bet:number;// 每局底注
        constructor(parameters) {
            this.grid = parameters.grid;
            this.imgurl = parameters.imgurl;
            this.name = parameters.name;
            this.type = parameters.type;
            this.point = parameters.point;
            this.bet = parameters.bet;
        }
    }
}