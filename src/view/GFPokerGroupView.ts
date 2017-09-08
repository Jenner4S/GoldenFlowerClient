module view {
    import Event = laya.events.Event;
    import GFPoker = model.GFPoker;
    import GFPokerStatus = model.GFPokerStatus;
    import Tween = laya.utils.Tween;
    import Ease = laya.utils.Ease;
    import GFPlayerStatus = model.GFPlayerStatus;
    import Point = laya.maths.Point;
    export enum GFPokerGroupStatus {
        HiddenValue = 0,
        AlreadyLook,
        GiveUp,
        Loser,
        ShowValue
    }
    export enum GFPokerGroupDirection {
        FromLeftToRight,
        FromRightToLeft
    }
    /**
     * GFPokerGroupView
     */
    export class GFPokerGroupView extends View {
        private pokerViewArray: Array<GFPokerView>;
        private pokerGap: number;
        public maxPokerNumber:number = 3;
        public pokerDirection: GFPokerGroupDirection;
        constructor() {
            super();
            this.size(100, 65);
            this.pokerViewArray = new Array<GFPokerView>();
            GFLog(this.width + "," + this.height);
            // this.on(Event.CLICK, this, this.animationWithState);
            this.pokerGap = 0;
            this.pokerDirection = GFPokerGroupDirection.FromLeftToRight;
        }
        public addPokerView(pokerViews: GFPokerView[]) {
            if (this.pokerViewArray.length >= this.maxPokerNumber){
                return;
            }
            pokerViews.forEach(element => {
                if (this.pokerDirection == GFPokerGroupDirection.FromLeftToRight) {
                    element.x += this.pokerGap;
                } else {
                    element.x -= this.pokerGap;
                }
                this.pokerGap += 25;
                element.pivot(element.width / 2, element.height / 2);
                this.addChild(element);
                this.pokerViewArray.push(element);

            });
            // this.graphics.drawRect(0, 0, this.width, this.height, undefined, "#FF0000", 3);
            // GFLog(this.width+","+this.height);
        }

        public getPokerViewPosition(index:number):laya.maths.Point{
            let positionX = 0;
            if (this.pokerDirection == GFPokerGroupDirection.FromLeftToRight) {
                    positionX = index*25;
                } else {
                    positionX = -index*25;
                }
            let point = new Point(positionX,0);
            return this.toParentPoint(point);
        }

        public renderPlayerPokers(pokers: GFPoker[], status: GFPokerGroupStatus) {
            if (this.pokerViewArray.length < pokers.length) {
                let count = pokers.length - this.pokerViewArray.length;
                for (var index = 0; index < count; index++) {
                    this.addPokerView([new GFPokerView()]);
                }
            }
            switch (status) {
                case GFPokerGroupStatus.HiddenValue:
                default: {
                    this.pokerViewArray.forEach((element, index) => {
                        Tween.to(element, { rotation: 0 }, 400);
                        element.renderPoker(pokers[index]);
                    });
                }
                    break;
                case GFPokerGroupStatus.AlreadyLook: {
                    let gap = 0;
                    this.pokerViewArray.forEach((element, index) => {
                        Tween.to(element, { rotation: gap }, 400);
                        if (this.pokerDirection == GFPokerGroupDirection.FromLeftToRight) {
                            gap += 10;
                        } else {
                            gap -= 10;
                        }
                        element.renderPoker(pokers[index]);
                    });
                }
                    break;
                case GFPokerGroupStatus.GiveUp:{
                    this.pokerViewArray.forEach((element,index) => {
                        Tween.to(element, { rotation: 0 }, 400);
                        element.renderPoker(pokers[index]);
                    });
                }
                    break;
                case GFPokerGroupStatus.Loser:{
                    this.pokerViewArray.forEach((element,index) => {
                        element.renderPoker(pokers[index]);
                    });
                }
                    break;
                case GFPokerGroupStatus.ShowValue: {
                    let gap = 0;
                    this.pokerViewArray.forEach((element,index) => {
                        Tween.to(element, { x: gap, rotation: 0 }, 400, Ease.linearInOut, Handler.create(element, element.renderPoker, [pokers[index]]));
                        if (this.pokerDirection == GFPokerGroupDirection.FromLeftToRight) {
                            gap += element.width + 10;
                        } else {
                            gap -= element.width + 10;
                        }
                    });
                }
                    break;
            }
        }
    }
}