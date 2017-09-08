module view {

    import List = Laya.List;
    import Handler = laya.utils.Handler;
    export class GFFriendListtableView extends List {
        public changedSelectedHandler:Handler;
        constructor() {
            // GFLog("GFFriendListtableView=====");

            super();
            this.setup();
        }
        private setup() {
            this.itemRender = GFFriendListtableViewCell;
            this.repeatX = 1;

            this.selectEnable = true;
            this.selectHandler = new Handler(this, this.onSelect);
            this.vScrollBarSkin = "";
            this.renderHandler = new Handler(this, this.updateItem);
        }

        private updateItem(cell: GFFriendListtableViewCell, index: number): void {
            if (index < this.array.length) {
                cell.setData();
            }
        }

        private onSelect(index: number): void {
            if (index < this.array.length) {
                this.array.forEach(dataSource => {
                    dataSource.selected = 0;
                });
                let cell: GFFriendListtableViewCell = <GFFriendListtableViewCell>this.selection;
                cell.friendView.btn.selected = true;
                this.changedSelectedHandler.runWith(index);
                cell.dataSource.unread = "0";
                cell.badgeView.setBadgeValue(0);
                this.refresh();
            }
        }
    }
    /**
     * name
     */
    import Box = laya.ui.Box;
    import GFFriendViewUI = ui.GFFriendViewUI;
    class GFFriendListtableViewCell extends Box {
        public static width: number = 218;
        public static height: number = 460;
        public friendView: GFFriendViewUI;
        public badgeView:view.UserBadgeView;
        constructor(parameters) {
            super();
            this.setup();
        }

        private setup() {
            this.friendView = new GFFriendViewUI();
            this.friendView.width = 218;
            this.friendView.pos(0, 0);
            this.friendView.height = 88;
            this.addChild(this.friendView);
            this.addBadgeView();
        }

        private addBadgeView(){
            this.badgeView = new view.UserBadgeView();
            this.badgeView.y = 5;
            this.addChild(this.badgeView);
        }

        public setData() {
            // GFLog(this.dataSource);
            this.friendView.userName.text = this.dataSource.user.name.length>5?this.dataSource.user.name.substring(0,5):this.dataSource.user.name;
            this.friendView.userImage.skin = this.dataSource.user.imgurl;
            this.friendView.userPoint.text = this.dataSource.user.point;
            GFLog(this.dataSource);
            if (this.dataSource.user.svip == 1 && this.dataSource.user.vip > 0) {//显示 vip
                this.friendView.image_vip.visible = true;
                this.friendView.image_vip.skin = "comp/image_vip" + this.dataSource.user.vip + ".png";
            }else if (this.dataSource.user.vip > 0){
                this.friendView.image_vip.visible = true;
                this.friendView.image_vip.skin = "comp/image_vip_wu.png";
            }else{
                this.friendView.image_vip.visible = false;
            }

            //badge 
            if (this.dataSource.unread.length==1) {
                this.badgeView.x = this.friendView.width - 24 - 5;
            }else{
                this.badgeView.x = this.friendView.width - 40 - 5;
            }
            this.badgeView.setBadgeValue(this.dataSource.unread);

            //selected
            if (this.dataSource.selected == 1) {
                this.friendView.btn.selected = true;
            }else{
                this.friendView.btn.selected = false;
            }

            if (this.dataSource.iscs == 1) {//客服
                this.friendView.label_service.visible = true;
                this.friendView.user_panel.visible = false;
            }else{
                this.friendView.label_service.visible = false;
                this.friendView.user_panel.visible = true;
            }
        }
    }

    /**
     * name
     */

}