/**
 * 更多 dialog
 * @Author: Zhang chaochao
 * @since 2016-09-12 
 */
module view {
    import help = view.GFHelp;
    export class GFMore extends ui.GFGameMoreViewUI {
        public badgeView : view.UserBadgeView;
        constructor(badgeValue?:string) {
            super();
            this.pos(1134, 424);
            this.btn_kefu.on(laya.events.Event.CLICK, this, this.onBtnKefuClick);
            this.btn_bangzhu.on(laya.events.Event.CLICK, this, this.onBtnBangzhuClick);
            this.btn_shezhi.on(laya.events.Event.CLICK, this, this.onBtnShezhiClick);
            this.btn_gonggao.on(laya.events.Event.CLICK, this, this.onBtnGonggaoClick);
            this.addBadgeView();
            this.badgeView.setBadgeValue(badgeValue)
        }
        private addBadgeView() {
            this.badgeView = new view.UserBadgeView();
            this.badgeView.x = this.btn_kefu.width - 29;
            this.btn_kefu.addChild(this.badgeView);
        }
        //官方客服
        private onBtnKefuClick(): void {

            let dialog = new view.GFFriendListView(true);
            dialog.popup();
            Laya.stage.removeChildByName(GFHomePageView.moreBgNodeName);
           
        }
        //帮助
        private onBtnBangzhuClick(): void {
            let dialog = new help();
            dialog.popup();
             Laya.stage.removeChildByName(GFHomePageView.moreBgNodeName);
          
        }
        //设置
        private onBtnShezhiClick(): void {
            let dialog = new view.GFSetView;
            dialog.popup();
            Laya.stage.removeChildByName(GFHomePageView.moreBgNodeName);
        }
        //公告
        private onBtnGonggaoClick(): void {
            let dialog = new view.GFGameInfoView;
            dialog.popup();
            Laya.stage.removeChildByName(GFHomePageView.moreBgNodeName);
        }

    }
}
