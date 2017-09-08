/**
 * 游戏帮助页
 * @Author: Zhang chaochao
 * @since 2016-09-09 
 */
import Label = Laya.Label;
import Color = model.getColorWithNumber;
module view {
    export class GFHelp extends ui.GFGameHelpUI {
        private prevX: number = 0;
        private prevY: number = 0;
        private buttonIndex: number = 0;

        private label11 = new Label();
        private label12 = new Label();
        private label13 = new Label();
        private label14 = new Label();
        private label15 = new Label();
        private label16 = new Label();
        private label17 = new Label();
        private label18 = new Label();

        private label21 = new Label();
        private label22 = new Label();
        private label23 = new Label();

        private label31 = new Label();
        private label32 = new Label();
        private label33 = new Label();
        private label34 = new Label();
        private label35 = new Label();
        private label36 = new Label();
        private label37 = new Label();
        private label38 = new Label();
        private label39 = new Label();
        private label310 = new Label();

        constructor() {
            super();
            this.btn_close.on(laya.events.Event.CLICK, this, this.onBtnClose);
            this.btn_help.on(laya.events.Event.CLICK, this, this.onBtnHelp);
            this.btn_vip.on(laya.events.Event.CLICK, this, this.onBtnVip);
            this.btn_gold.on(laya.events.Event.CLICK, this, this.onBtnGold);
            this.btn_service.on(laya.events.Event.CLICK, this, this.onBtnService);
            this.btn_zhuce.on(laya.events.Event.CLICK, this, this.onBtnZhuce);
            this.btn_yinsi.on(laya.events.Event.CLICK, this, this.onBtnYinsi);
            this.btn_fuwu.on(laya.events.Event.CLICK, this, this.onBtnFuwu);
            this.panel_1.on(laya.events.Event.MOUSE_DOWN, this, this.startScrollText);
            this.panel_2.on(laya.events.Event.MOUSE_DOWN, this, this.startScrollText);
            this.panel_3.on(laya.events.Event.MOUSE_DOWN, this, this.startScrollText);

            this.onBtnHelp();
        }

        private onBtnClose(): void {
            this.close();
        }

        //游戏帮助
        private onBtnHelp(): void {
            this.buttonIndex = 1;
            this.panel_1.visible = true;
            this.panel_2.visible = false;
            this.panel_3.visible = false;
            this.panel_4.visible = false;

            this.btn_help.selected = true;
            this.btn_vip.selected = false;
            this.btn_gold.selected = false;
            this.btn_service.selected = false;

            this.label11.pos(0, 0);
            this.label11.width = 718;
            this.label11.wordWrap = true;
            this.label11.color = Color(2);
            this.label11.fontSize = 30;
            this.label11.text = "游戏规则";

            this.label12.pos(0, 40);
            this.label12.width = 718;
            this.label12.wordWrap = true;
            this.label12.leading = 5;
            this.label12.color = Color(11);
            this.label12.fontSize = 25;
            this.label12.text = "1.游戏人数为2-5人，使用一副扑克牌，去掉大小王，共52张牌\n" +
                "2.游戏开始后，玩家先投入底注，从庄家开始逆时针每人发三张暗牌\n" +
                "3.玩家通过“看牌”或猜测对方拍进行“下注”、“跟注”或者“放弃”";

            this.label13.pos(0, 170);
            this.label13.width = 718;
            this.label13.wordWrap = true;
            this.label13.color = Color(2);
            this.label13.fontSize = 30;
            this.label13.text = "名次解释";

            this.label14.pos(0, 210);
            this.label14.width = 718;
            this.label14.wordWrap = true;
            this.label14.leading = 5;
            this.label14.color = Color(11);
            this.label14.fontSize = 25;
            this.label14.text = "庄家：上一轮赢的玩家是下一轮的庄家，第一句或赢家离开则随机选择庄家，庄家的下家先下注\n" +
                "锅底：所有玩家下注之和\n" +
                "底注：开局后每位玩家投入的初始筹码\n" +
                "封顶：每局可以投注的筹码总和有上限，达到或超过上限系统自动开牌\n" +
                "看牌：查看自己三张牌的花色和点数，看牌后的下注为明注\n" +
                "暗牌：未看过的牌\n" +
                "明牌：已看过的牌\n" +
                "暗注：未看过牌下注\n" +
                "明注：已看过牌下注，投入筹码是暗注的一倍\n" +
                "跟注：投入和上家相同的筹码，自己是暗牌就跟暗注，明牌就跟明注\n" +
                "加注：在上家投入筹码的基础上再增加筹码\n" +
                "比牌：拿自己的牌和其他玩家的牌比大小，付出当前单注两倍的筹码\n" +
                "开牌：当可以下注的玩家只剩两人时，可以选择开牌，付出当前单注两倍的筹码\n" +
                "放弃：放弃当前所有筹码，判输";

            this.label15.pos(0, 800);
            this.label15.width = 718;
            this.label15.wordWrap = true;
            this.label15.color = Color(2);
            this.label15.fontSize = 30;
            this.label15.text = "牌型说明";

            this.label16.pos(0, 840);
            this.label16.width = 718;
            this.label16.wordWrap = true;
            this.label16.leading = 5;
            this.label16.color = Color(11);
            this.label16.fontSize = 25;
            this.label16.text = "豹子：相同的3张牌，AAA最大，222最小\n" +
                "顺金：花色相同且相连的3张牌，AKQ最大，A23最小\n" +
                "金花：花色相同的3张牌，AKJ最大，235最小\n" +
                "顺子：相连的3张牌，AKQ最大，A23最小\n" +
                "对子：相同的2张牌，AAK最大，223最小\n" +
                "散牌：任意不相同的牌";

            this.label17.pos(0, 1040);
            this.label17.width = 718;
            this.label17.wordWrap = true;
            this.label17.color = Color(2);
            this.label17.fontSize = 30;
            this.label17.text = "大小规则";

            this.label18.pos(0, 1080);
            this.label18.width = 718;
            this.label18.wordWrap = true;
            this.label18.leading = 5;
            this.label18.color = Color(11);
            this.label18.fontSize = 25;
            this.label18.text = "豹子>顺金>金花>顺子>对子>散牌\n" +
                "单牌大小比较，A>K>Q>2\n" +
                "对子大小比较，先比对，对同等大再比单牌\n" +
                "比牌或开牌时牌型等大，先开为输";

            this.panel_1.addChild(this.label11);
            this.panel_1.addChild(this.label12);
            this.panel_1.addChild(this.label13);
            this.panel_1.addChild(this.label14);
            this.panel_1.addChild(this.label15);
            this.panel_1.addChild(this.label16);
            this.panel_1.addChild(this.label17);
            this.panel_1.addChild(this.label18);
        }

        //vip介绍
        private onBtnVip(): void {
            this.buttonIndex = 2;
            this.panel_1.visible = false;
            this.panel_2.visible = true;
            this.panel_3.visible = false;
            this.panel_4.visible = false;

            this.btn_help.selected = false;
            this.btn_vip.selected = true;
            this.btn_gold.selected = false;
            this.btn_service.selected = false;

            this.label21.pos(0, 0);
            this.label21.width = 718;
            this.label21.wordWrap = true;
            this.label21.color = Color(2);
            this.label21.fontSize = 30;
            this.label21.text = "VIP特权";

            this.label22.pos(0, 40);
            this.label22.width = 718;
            this.label22.wordWrap = true;
            this.label22.leading = 5;
            this.label22.color = Color(11);
            this.label22.fontSize = 25;
            this.label22.text = "1.头像显示尊贵的VIP等级标识，让您显得与众不同\n" +
                "2.自拍头像不限制上传次数\n" +
                "3.每日登陆奖励加倍，最高达11倍\n" +
                "4.单次充值满50元赠送，最高赠送充值额度的50%，系统累加VIP进度后，再计算赠送比例";

            this.label23.pos(0, 220);
            this.label23.width = 718;
            this.label23.wordWrap = true;
            this.label23.leading = 5;
            this.label23.color = Color(11);
            this.label23.fontSize = 25;
            this.label23.text = "等级      充值赠送        登陆奖励        升级需要\n" +
                "VIP1       10%                 X2倍              10元\n" +
                "VIP2       16%                 X3倍              80元\n" +
                "VIP3       20%                 X4倍              280元\n" +
                "VIP4       26%                 X5倍              680元\n" +
                "VIP5       30%                 X6倍              1380元\n" +
                "VIP6       34%                 X7倍              2280元\n" +
                "VIP7       38%                 X8倍              3580元\n" +
                "VIP8       42%                 X9倍              5880元\n" +
                "VIP9       46%                 X10倍            8880元\n" +
                "VIP10     50%                 X11倍            18880元\n";

            this.panel_2.addChild(this.label21);
            this.panel_2.addChild(this.label22);
            this.panel_2.addChild(this.label23);
        }

        //获得金币
        private onBtnGold(): void {
            this.buttonIndex = 3;
            this.panel_1.visible = false;
            this.panel_2.visible = false;
            this.panel_3.visible = true;
            this.panel_4.visible = false;

            this.btn_help.selected = false;
            this.btn_vip.selected = false;
            this.btn_gold.selected = true;
            this.btn_service.selected = false;

            this.label31.pos(0, 0);
            this.label31.width = 718;;
            this.label31.wordWrap = true;
            this.label31.color = Color(2);
            this.label31.fontSize = 30;
            this.label31.text = "每天登陆游戏";

            this.label32.pos(0, 40);
            this.label32.width = 718;
            this.label32.wordWrap = true;
            this.label32.leading = 5;
            this.label32.color = Color(11);
            this.label32.fontSize = 25;
            this.label32.text = "每天首次登录游戏可获得金币奖励，连续登陆将获得更多金币奖励";

            this.label33.pos(0, 130);
            this.label33.width = 718;
            this.label33.wordWrap = true;
            this.label33.color = Color(2);
            this.label33.fontSize = 30;
            this.label33.text = "在线时长奖励";

            this.label34.pos(0, 170);
            this.label34.width = 718;
            this.label34.wordWrap = true;
            this.label34.leading = 5;
            this.label34.color = Color(11);
            this.label34.fontSize = 25;
            this.label34.text = "进入任何游戏房间，可通过累计在线时长，点击宝箱获得金币奖励";

            this.label35.pos(0, 260);
            this.label35.width = 718;
            this.label35.wordWrap = true;
            this.label35.color = Color(2);
            this.label35.fontSize = 30;
            this.label35.text = "特殊奖励";

            this.label36.pos(0, 300);
            this.label36.width = 718;
            this.label36.wordWrap = true;
            this.label36.leading = 5;
            this.label36.color = Color(11);
            this.label36.fontSize = 25;
            this.label36.text = "玩家在对战过程中出现豹子，获得本局个人单倍底注的5倍金币奖励\n" +
                "玩家在对战过程中出现顺金，获得本局个人单倍底注的3倍金币奖励";

            this.label37.pos(0, 440);
            this.label37.width = 718;
            this.label37.wordWrap = true;
            this.label37.color = Color(2);
            this.label37.fontSize = 30;
            this.label37.text = "救济金";

            this.label38.pos(0, 480);
            this.label38.width = 718;
            this.label38.wordWrap = true;
            this.label38.leading = 5;
            this.label38.color = Color(11);
            this.label38.fontSize = 25;
            this.label38.text = "当您的金币低于10000，系统自动发放10000金币的救济，每天可领取3次";

            this.label39.pos(0, 570);
            this.label39.width = 718;
            this.label39.wordWrap = true;
            this.label39.color = Color(2);
            this.label39.fontSize = 30;
            this.label39.text = "兑换金币";

            this.label310.pos(0, 620);
            this.label310.width = 718;
            this.label310.wordWrap = true;
            this.label310.leading = 5;
            this.label310.color = Color(11);
            this.label310.fontSize = 25;
            this.label310.text = "用钻石兑换金币，钻石由充值获得，1钻石=1元";

            this.panel_3.addChild(this.label31);
            this.panel_3.addChild(this.label32);
            this.panel_3.addChild(this.label33);
            this.panel_3.addChild(this.label34);
            this.panel_3.addChild(this.label35);
            this.panel_3.addChild(this.label36);
            this.panel_3.addChild(this.label37);
            this.panel_3.addChild(this.label38);
            this.panel_3.addChild(this.label39);
            this.panel_3.addChild(this.label310);
        }

        //用户协议
        private onBtnService(): void {
            this.panel_1.visible = false;
            this.panel_2.visible = false;
            this.panel_3.visible = false;
            this.panel_4.visible = true;

            this.btn_help.selected = false;
            this.btn_vip.selected = false;
            this.btn_gold.selected = false;
            this.btn_service.selected = true;
        }

        private openwin(url) {
            var a = document.createElement("a");
            a.setAttribute("href", url);
            a.setAttribute("target", "_blank");
            a.setAttribute("id", "camnpr");
            document.body.appendChild(a);
            a.click();
        }

        private onBtnZhuce(): void {
            let api = "more/register";
            let url: string = model.getUrlWithParams(api, undefined);
            GFLog(url);
            window.location.href = url;
        }

        private onBtnYinsi(): void {
            let api = "more/private";
            let url: string = model.getUrlWithParams(api, undefined);
            GFLog(url);
            window.location.href = url;
        }

        private onBtnFuwu(): void {
            let api = "more/service";
            let url: string = model.getUrlWithParams(api, undefined);
            GFLog(url);
            window.location.href = url;
        }

        /* 开始滚动文本 */
        private startScrollText(e: Event): void {
            if (this.buttonIndex == 1) {
                this.prevX = this.panel_1.mouseX;
                this.prevY = this.panel_1.mouseY;
            } else if (this.buttonIndex == 2) {
                this.prevX = this.panel_2.mouseX;
                this.prevY = this.panel_2.mouseY;
            } else if (this.buttonIndex == 3) {
                this.prevX = this.panel_3.mouseX;
                this.prevY = this.panel_3.mouseY;
            }

            Laya.stage.on(laya.events.Event.MOUSE_MOVE, this, this.scrollText);
            Laya.stage.on(laya.events.Event.MOUSE_UP, this, this.finishScrollText);
        }

        /* 停止滚动文本 */
        private finishScrollText(e: Event): void {
            Laya.stage.off(laya.events.Event.MOUSE_MOVE, this, this.scrollText);
            Laya.stage.off(laya.events.Event.MOUSE_UP, this, this.finishScrollText);
        }

        /* 鼠标滚动文本 */
        private scrollText(e: Event): void {
            var nowY: number = this.panel_1.mouseY;
            GFLog(nowY);
            if (this.buttonIndex == 1) {
                GFLog("label11.y = " + this.label11.y);
                GFLog("this.prevY - nowY " + (this.prevY - nowY));
                if (this.label11.y >= 0 && (this.prevY - nowY) <= 0) //处于顶端，往下滑
                    return;
                else if (this.label11.y <= -818 && (this.prevY - nowY) >= 0) //处于底端，往上滑
                    return;

                this.label11.y -= this.prevY - nowY;
                this.label12.y -= this.prevY - nowY;
                this.label13.y -= this.prevY - nowY;
                this.label14.y -= this.prevY - nowY;
                this.label15.y -= this.prevY - nowY;
                this.label16.y -= this.prevY - nowY;
                this.label17.y -= this.prevY - nowY;
                this.label18.y -= this.prevY - nowY;
            } else if (this.buttonIndex == 2) {
                GFLog("label21.y = " + this.label21.y);
                GFLog("this.prevY - nowY " + (this.prevY - nowY));
                if (this.label21.y >= 0 && (this.prevY - nowY) <= 0) //处于顶端，往下滑
                    return;
                else if (this.label21.y <= -130 && (this.prevY - nowY) >= 0) //处于底端，往上滑
                    return;

                this.label21.y -= this.prevY - nowY;
                this.label22.y -= this.prevY - nowY;
                this.label23.y -= this.prevY - nowY;
            } else if (this.buttonIndex == 3) {
                GFLog("label31.y = " + this.label31.y);
                GFLog("this.prevY - nowY " + (this.prevY - nowY));
                if (this.label31.y >= 0 && (this.prevY - nowY) <= 0) //处于顶端，往下滑
                    return;
                else if (this.label31.y <= -267 && (this.prevY - nowY) >= 0) //处于底端，往上滑
                    return;

                this.label31.y -= this.prevY - nowY;
                this.label32.y -= this.prevY - nowY;
                this.label33.y -= this.prevY - nowY;
                this.label34.y -= this.prevY - nowY;
                this.label35.y -= this.prevY - nowY;
                this.label36.y -= this.prevY - nowY;
                this.label37.y -= this.prevY - nowY;
                this.label38.y -= this.prevY - nowY;
                this.label39.y -= this.prevY - nowY;
                this.label310.y -= this.prevY - nowY;
            }

            this.prevY = nowY;
        }

    }
}