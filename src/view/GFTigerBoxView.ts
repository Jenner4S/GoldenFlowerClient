module view {
    import Image = laya.ui.Image;
    import Panel = laya.ui.Panel;
    import Clip = laya.ui.Clip;
    import Timer = laya.utils.Timer;
    import Tween = laya.utils.Tween;
    import Handler = laya.utils.Handler;

    export enum GFBoxViewType {
        Tiger = 0,
        Indiana,
    }
    const tigerBases = [{skin : "comp/bg_pai_xiao3.png" , clipX : 13 , clipY : 5 , defaultIndex : 52 , endIndex : 51 , startIndex : 0},
                        {skin : "comp/bg_pai_xiao3.png" , clipX : 13 , clipY : 5 , defaultIndex : 53 , endIndex : 51 , startIndex : 0},
                        {skin : "comp/bg_pai_xiao3.png" , clipX : 13 , clipY : 5 , defaultIndex : 54 , endIndex : 51 , startIndex : 0}]
    export class GFTigerBoxView extends View {
        private leftPoker : GFBoxPokerView
        private centerPoker : GFBoxPokerView 
        private rightPoker : GFBoxPokerView
        private pokerMask : Image = new Image();
        public speeds = [100 , 50 , 70] //最高牌速
        public times = [1000 , 1500 , 2000] //3s减速,times为减速前预期运动时间
        public finish : Handler;
        private counter = 0;
        private boxType : GFBoxViewType
        private bases : Array<GFBoxPokerViewBase>
        constructor() {
            super();
            this.configPoker()
            this.configUI();
            this.setBox(GFBoxViewType.Tiger , tigerBases)
        }
        public setBox(boxType : GFBoxViewType , bases : Array<GFBoxPokerViewBase>) {
            this.boxType = boxType
            this.bases = bases
            this.leftPoker.viewModel.act(PokerViewActionType.Base, [this.bases[0]])
            this.centerPoker.viewModel.act(PokerViewActionType.Base, [this.bases[1]])
            this.rightPoker.viewModel.act(PokerViewActionType.Base, [this.bases[2]])
        }
        private parseResult(obj) {
            if(this.boxType == 0) {
                return [(obj[0].type - 0) * 13 + obj[0].value - 2,(obj[1].type - 0) * 13 + obj[1].value - 2,(obj[2].type - 0) * 13 + obj[2].value - 2]
            }else {
                let result = []
                result.push(obj.result[0].ipid)
                result.push(obj.result[1].ipid)
                result.push(obj.result[2].ipid)
                let list = []
                for (var key in obj.imgobj.product) {
                    if (obj.imgobj.product.hasOwnProperty(key)) {
                        var element = obj.imgobj.product[key];
                        list.push(element.ipid)
                    }
                }
                return [list.indexOf(result[0]) + 1 , list.indexOf(result[1]) + 1 , list.indexOf(result[2]) + 1]
            }
        }
        private configPoker() {
            this.leftPoker = new GFBoxPokerView()
            this.centerPoker = new GFBoxPokerView()
            this.rightPoker = new GFBoxPokerView()
            this.leftPoker.setViewModel(new GFBoxPokerViewModel())
            this.centerPoker.setViewModel(new GFBoxPokerViewModel())
            this.rightPoker.setViewModel(new GFBoxPokerViewModel())
        }
        private randomSpeeds() {
            let arr = [];
            let x = (Math.floor(Math.random()*6) + 5) * 10
            arr.push(x)
            x = (Math.floor(Math.random()*6) + 5) * 10
            arr.push(x)
            x = (Math.floor(Math.random()*6) + 5) * 10
            arr.push(x)
            this.speeds = arr
        }
        private randomTimes() {
            let times = this.times
            let arr = []
            let x = Math.floor(Math.random()*3)
            arr.push(times[x])
            times.splice(x , 1)
            x = Math.floor(Math.random()*2)
            arr.push(times[x])
            times.splice(x , 1)
            arr.push(times[0])
            this.times = arr
        }
        private configUI() {
            this.size(414 , 180)

            this.addChild(this.leftPoker)
            this.addChild(this.centerPoker)
            this.addChild(this.rightPoker)
            this.leftPoker.centerY = 0;
            this.centerPoker.centerY = 0;
            this.rightPoker.centerY = 0;
            this.leftPoker.left = 13
            this.centerPoker.centerX = 0
            this.rightPoker.right = 13

            this.addChild(this.pokerMask)
            this.pokerMask.loadImage('comp/bg_gundongzhou1.png')
            this.pokerMask.size(414 , 180)
            this.pokerMask.pos(0,0)

            let finish = new Handler(this , this.finishCounter)
            this.leftPoker.viewModel.finish = finish
            this.centerPoker.viewModel.finish = finish
            this.rightPoker.viewModel.finish = finish
        }
        private finishCounter() {
            this.counter = (this.counter + 1) % 3
            if(this.counter == 0 && this.finish) {
                this.finish.run()
                stopMedia(VoiceType.TigerScroll)
            }
        }
        public startPlay() {
            playMedia(VoiceType.TigerScroll)
            this.randomSpeeds()
            this.leftPoker.viewModel.setTopSpeed(this.speeds[0])
            this.centerPoker.viewModel.setTopSpeed(this.speeds[1])
            this.rightPoker.viewModel.setTopSpeed(this.speeds[2])
            this.leftPoker.viewModel.act(PokerViewActionType.Start)
            this.centerPoker.viewModel.act(PokerViewActionType.Start)
            this.rightPoker.viewModel.act(PokerViewActionType.Start)
        }
        public setPokers(obj) {
            let result = this.parseResult(obj)
            this.randomTimes()
            this.leftPoker.viewModel.act(PokerViewActionType.Result , [result[0] , this.times[0]])
            this.centerPoker.viewModel.act(PokerViewActionType.Result , [result[1] , this.times[1]])
            this.rightPoker.viewModel.act(PokerViewActionType.Result , [result[2] , this.times[2]])
        }
        public kill() {
            this.leftPoker.kill()
            this.centerPoker.kill()
            this.rightPoker.kill()
            this.removeSelf()
        }
        public resetPokers(obj) {
            let result = this.parseResult(obj)
            this.leftPoker.viewModel.act(PokerViewActionType.Custom , [result[0]])
            this.centerPoker.viewModel.act(PokerViewActionType.Custom , [result[1]])
            this.rightPoker.viewModel.act(PokerViewActionType.Custom , [result[2]])
        }
        public reset() {
            this.leftPoker.viewModel.act(PokerViewActionType.DefaultPokers)
            this.centerPoker.viewModel.act(PokerViewActionType.DefaultPokers)
            this.rightPoker.viewModel.act(PokerViewActionType.DefaultPokers)
        }
    }
    const PokerViewAction = 'PokerViewAction'
    enum PokerViewActionType {
        Base = 0,
        DefaultPokers,
        Start,    
        Result,
        Custom,
    }
    export interface GFBoxPokerViewBase {
        skin : string
        clipX : number
        clipY : number
        defaultIndex : number
        startIndex ?: number
        endIndex ?: number
        topSpeed ?: number
    }
    class GFBoxPokerViewModel extends laya.events.EventDispatcher {
        public timer : Timer = new Timer()
        private base : GFBoxPokerViewBase
        private startTime : number
        private value : number
        private custom : number
        public finish : Handler
        protected setBase(base : GFBoxPokerViewBase) {
            this.base = base
            this.base.startIndex = this.base.startIndex >= 0?this.base.startIndex : 0
            this.base.endIndex = this.base.endIndex >= 0?this.base.endIndex : this.base.clipX * this.base.clipY - 1
            this.base.topSpeed = this.base.topSpeed >= 0?this.base.topSpeed : 100
        }
        public act(act : PokerViewActionType, args : any = undefined) { // base : args-[base]  start : args-undefined result : args-[index , time] custom-[value]
            switch(act) {
                case PokerViewActionType.Base:{
                    this.setBase(args[0])
                }
                break
                case PokerViewActionType.Start:{
                    this.startTime = this.timer.currTimer
                }
                break
                case PokerViewActionType.Custom:{
                    this.custom = args[0]
                }
                break
                case PokerViewActionType.DefaultPokers:{
                    this.timer.clearAll(this)
                }
                break
                case PokerViewActionType.Result:{
                    this.value = args[0]
                    let t = args[1] + this.startTime - this.timer.currTimer
                    if(t > 0) {
                        this.timer.once(t, this, function () {
                            this.startTime = this.timer.currTimer
                            this.event(PokerViewAction, act)
                        })
                    }else {
                        this.startTime = this.timer.currTimer
                        this.event(PokerViewAction , act)
                    }
                }
                return
            }
            this.event(PokerViewAction , act)
        }
        public setTopSpeed(topSpeed) {
            this.base.topSpeed = topSpeed
        }
        public getCustom() {
            return this.custom
        }
        public getBase() {
            return this.base
        }
        public getRandom() {
            let start = this.base.startIndex
            let end = this.base.endIndex
            return Math.floor(Math.random()*(end - start + 1)) + start
        }
        constructor() {
            super()
        }
        public getSpeedUpPixel(obj : any) {
            let t = obj.timer.currTimer - obj.startTime
            t = t / 1000
            return t < 1?(2 - t)*t*obj.base.topSpeed:obj.base.topSpeed
        }
        public getSpeedDownPixel(obj : any) {
            let t = obj.timer.currTimer - obj.startTime + 2000
            t = t / 1000
            return t < 3.8?(1 - 0.25*t)*t*obj.base.topSpeed:0;
            // return 30
        }
        public getValue() {
            return this.value
        }
    }

    class GFBoxPokerView extends Panel {
        private pokerA : Clip = new Clip()
        private pokerB : Clip = new Clip()
        private pokerC : Clip = new Clip()
        private Bottom : number
        private Center : number
        private Top : number
        public viewModel : GFBoxPokerViewModel
        constructor(public width = 128 , public height = 162) {
            super()
            this.configUI()
        }
        public setViewModel(obj : GFBoxPokerViewModel = new GFBoxPokerViewModel()) {
            if(this.viewModel) {
                this.viewModel.offAll(PokerViewAction)
            }
            this.viewModel = obj
            this.viewModel.on(PokerViewAction , this , this.handleAction)
        }
        public kill() {
            this.viewModel.offAll(PokerViewAction)
            this.viewModel.finish = new Handler()
            this.viewModel.timer.clearAll(this.viewModel)
            this.timer.clearAll(this)
        }
        private handleAction(action : PokerViewActionType) {
            switch(action) {
                case PokerViewActionType.Base:{
                    this.setBase()
                }
                break
                case PokerViewActionType.DefaultPokers:{
                    this.defaultValue()
                }
                break
                case PokerViewActionType.Start:{
                    this.start()
                }
                break
                case PokerViewActionType.Result:{
                    this.stopToResult()
                }
                break
                case PokerViewActionType.Custom:{
                    this.resetValue()
                }
                break
            }
        }
        private configUI() {
            // this.size(128 , 162)
            // this.graphics.drawRect(0 , 0 ,128 , 162 , '#ffffff')
            this.Bottom = this.height
            this.Center = 0
            this.Top = -this.height
            this.addChild(this.pokerA)
            this.addChild(this.pokerB)
            this.addChild(this.pokerC)
            this.pokerA.size(this.width , this.height)
            this.pokerB.size(this.width , this.height)
            this.pokerC.size(this.width , this.height)
            this.pokerA.tag = 0;
            this.pokerB.tag = 1;
            this.pokerC.tag = 2;
            this.pokerA.centerX = 0;
            this.pokerB.centerX = 0;
            this.pokerC.centerX = 0;
            this.pokerA.centerY = this.Bottom
            this.pokerB.centerY = this.Center
            this.pokerC.centerY = this.Top
        }
        private defaultValue() {
            this.timer.clearAll(this)
            this.pokerA.index = this.viewModel.getRandom();
            this.pokerB.index = this.viewModel.getBase().defaultIndex
            this.pokerC.index = this.viewModel.getRandom();
            this.pokerA.centerY = this.Bottom
            this.pokerB.centerY = this.Center
            this.pokerC.centerY = this.Top 
        }
        private resetValue() {
            this.timer.clearAll(this)
            this.pokerA.index = this.viewModel.getRandom();
            this.pokerB.index = this.viewModel.getCustom()
            this.pokerC.index = this.viewModel.getRandom();
            this.pokerA.centerY = this.Bottom
            this.pokerB.centerY = this.Center
            this.pokerC.centerY = this.Top 
        }
        private setBase() {
            let base = this.viewModel.getBase()
            this.pokerA.skin = base.skin
            this.pokerA.clipX = base.clipX
            this.pokerA.clipY = base.clipY
            this.pokerB.skin = base.skin
            this.pokerB.clipX = base.clipX
            this.pokerB.clipY = base.clipY
            this.pokerC.skin = base.skin
            this.pokerC.clipX = base.clipX
            this.pokerC.clipY = base.clipY
            this.pokerA.index = this.viewModel.getRandom();
            this.pokerB.index = base.defaultIndex
            this.pokerC.index = this.viewModel.getRandom();
        }
        private move(getPixel:any) {
            let pixel = 0;
            if(getPixel) {
                pixel = getPixel(this.viewModel)
            }
            this.pokerA.centerY = this.pokerA.centerY + pixel;
            this.pokerB.centerY = this.pokerB.centerY + pixel;
            this.pokerC.centerY = this.pokerC.centerY + pixel;

            if(this.pokerA.centerY > this.Bottom) {
                this.pokerA.centerY = this.pokerC.centerY - this.height;
                this.pokerA.index = this.viewModel.getRandom()
            }
            if(this.pokerB.centerY > this.Bottom) {
                this.pokerB.centerY = this.pokerA.centerY - this.height;
                this.pokerB.index = this.viewModel.getRandom()
            }
            if(this.pokerC.centerY > this.Bottom) {
                this.pokerC.centerY = this.pokerB.centerY - this.height;
                this.pokerC.index = this.viewModel.getRandom()
            }
        }
        private start() {
            this.move(undefined)
            this.timer.frameLoop(1 , this , this.move , [this.viewModel.getSpeedUpPixel])
        }
        private stopToResult() {
            this.timer.clearAll(this);
            this.timer.frameLoop(1 , this , this.move , [this.viewModel.getSpeedDownPixel])
            this.timer.once(1800 , this , this.moveToResult);
        }
        private moveToResult() {
            //0.2s
            this.timer.clearAll(this);
            let speed = 0.1 * this.viewModel.getBase().topSpeed
            let poker = this.pokerA.centerY < this.pokerB.centerY ? this.pokerA:this.pokerB
            poker = poker.centerY < this.pokerC.centerY ? poker:this.pokerC
            poker.index = this.viewModel.getValue()
            let time = (-poker.centerY) / speed / 60 * 1000
            let c = poker
            let b , a
            if (poker.tag == 0) {
                b = this.pokerC
                a = this.pokerB
            } else if (poker.tag == 1) {
                b = this.pokerA
                a = this.pokerC
            } else {
                b = this.pokerB
                a = this.pokerA
            }
            this.timer.once(1000 , this , function() {
                if (this.displayedInStage){
                    playMedia(VoiceType.TigerTrue)
                }
            })
            Tween.to(c , {centerY : 0} , 2000 , laya.utils.Ease.strongOut , Handler.create(this , function() {
                if(this.viewModel.finish) {
                    this.viewModel.finish.run();
                }
            }))
            Tween.to(b , {centerY : 162} , 2000 , laya.utils.Ease.strongOut)
            Tween.to(a , {centerY : 162+162} , 2000 , laya.utils.Ease.strongOut)
        }
    }
}