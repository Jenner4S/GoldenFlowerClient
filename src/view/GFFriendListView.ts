module view {
    import GFFriendListViewUI = ui.GFFriendListViewUI;
    import GFChatListTableView = view.GFChatListTableView;
    import GFFriendListtableView = view.GFFriendListtableView;
    import GFAddFriendDialogUI = ui.GFAddFriendDialogUI;
    export class GFFriendListView extends GFFriendListViewUI {
        private userList: GFFriendListtableView;
        private chatList: GFChatListTableView;
        private type: number;//1 0 2
        private friendListResponse: any;
        private selectedUser: any;
        private input: Laya.TextInput;
        private badgeView1:view.UserBadgeView;
        private badgeView2:view.UserBadgeView;
        private userActionView:view.GFUserActionView;
        constructor(private isService?:boolean) {
            super();
            this.type = 1;
            this.addUserActionView();
            this.addTableView();
            this.addInput();
            this.addBadgeView();
            this.addAction();
            this.requestData();
            this.getUserBadgeValue();
            if(isService){
                this.input.visible = true;
                this.btn_send.visible = true;
            }else{
                this.btn_send.visible = false;
            }
            Laya.stage.on("user_receive_message",this,function (urid:any) {
                if (this.selectedUser&&this.selectedUser.user&&this.selectedUser.user.urid == Number(urid)) {
                    this.getUserChatMessage();
                }else{
                    this.getUserBadgeValue();
                    this.requestData();
                }
            });
            Laya.stage.on("AddUserFinish",this,function(){
                this.tabClicked(this.type);
            })
        }
        private addUserActionView(){
            this.userActionView = new view.GFUserActionView();
            this.userActionView.pos(235,120);
            this.addChild(this.userActionView);
        }
        private addAction() {
            //好友 陌生人  黑名单
            this.btn_tab1.on(laya.events.Event.CLICK, this, this.friendClicked);
            this.btn_tab2.on(laya.events.Event.CLICK, this, this.strangerClicked);
            this.btn_tab3.on(laya.events.Event.CLICK, this, this.blackListClicked);
            //addFriend clicked
            this.userActionView.addNewFriendHandler = Handler.create(this,this.addNewFriend,undefined,false);
            this.userActionView.lookHandler = Handler.create(this,this.userDetail,undefined,false);
            this.userActionView.clearHandler = Handler.create(this,this.clearMessage,undefined,false);
            this.userActionView.blackHandler = Handler.create(this,this.pullToBlank,undefined,false);
            this.userActionView.deleteHandler = Handler.create(this,this.deleteFriend,undefined,false);
            this.userActionView.givePointHandler = Handler.create(this,this.givePoint,undefined,false);
            this.userActionView.addFriendHandler = Handler.create(this,this.addFriend,undefined,false);
            //other
            this.btn_close.on(laya.events.Event.CLICK, this, function(){
                this.tabClicked(this.type);
                this.close();
            });
            this.btn_send.on(laya.events.Event.CLICK, this, this.sendMessage);
        }
        private addInput(): void {
            this.input = new Laya.TextInput();
            // this.input.bgColor = "#ffffff";
            this.input.pos(this.userActionView.x, this.btn_send.y);
            this.input.size(this.btn_send.x - this.userActionView.x - 10, 60);
            this.input.fontSize = 24;
            this.input.color = "#ffffff";
            this.input.maxChars = 50;
            this.input.visible = false;//default
            this.addChild(this.input);
        }

        private addTableView(): void {
            this.addUserTableView();
            this.addChatTableView();
        }
        private addChatTableView() {
            let list: GFChatListTableView = new GFChatListTableView();
            list.pos(240, 190);
            list.size(565, 286);
            // list.graphics.drawRect(0,0,list.width,list
            // .height,"#ffffff","#ff0000",2);
            this.chatList = list;
            this.chatList.array = [];
            this.addChild(list);
        }
        private addUserTableView() {
            let list: GFFriendListtableView = new GFFriendListtableView();
            list.pos(18, 130);
            list.width = 216;
            list.height = 440;
            this.userList = list;
            this.addChild(list);
            this.userList.refresh();
            if (this.isService) {
                this.service_time_label.visible = true;
            }else{
                this.service_time_label.visible = false;
            }
            
            this.userList.changedSelectedHandler = Handler.create(this, function (index: number) {
                GFLog("selected indedx " + index);
                this.selectedUser = this.friendListResponse.user_list[index];
                this.selectedUser.selected = 1;
                this.getUserChatMessage();
                if (this.selectedUser.iscs == 1) {//客服
                    this.service_time_label.visible = true;
                }else{
                    this.service_time_label.visible = false;
                }
                this.input.visible = true;//can input
                this.btn_send.visible = true;
                //badge
                if (this.type == 1) {
                    this.badgeView1.setReadBadgeValue(this.selectedUser.unread);
                }else if (this.type == 0) {
                    this.badgeView2.setReadBadgeValue(this.selectedUser.unread);
                }
                this.userActionView.show(this.type);
                if (this.selectedUser.iscs == 1) {//客服
                    this.userActionView.friendView.visible = false;
                }
            }, undefined, false);
        }
        private addBadgeView(){
            this.badgeView1 = new view.UserBadgeView();
            this.badgeView1.x = this.btn_tab1.width - 50;
            this.btn_tab1.addChild(this.badgeView1);

            this.badgeView2 = new view.UserBadgeView();
            this.badgeView2.x = this.btn_tab2.width - 50;
            this.btn_tab2.addChild(this.badgeView2);
        }
        private configTable() {
            if (this.isService) {
                this.isService = false;
                if (this.friendListResponse.user_list.length) {
                    this.friendListResponse.user_list.forEach(element => {
                        if(element.iscs == 1){
                            element.selected = true;
                            this.selectedUser = element;
                            return;
                        }
                    });
                    this.getUserChatMessage();
                    this.badgeView1.setReadBadgeValue(this.selectedUser.unread);
                    this.selectedUser.unread = 0;
                }
                this.userList.array = this.friendListResponse.user_list;
                this.userList.selectedIndex[0];
                // this.userList.selectedCell = this.userList.cells[0];
                this.userList.refresh();
            } else {
                this.userList.array = this.friendListResponse.user_list;
                this.userList.refresh();
            }
        }
        private finishLoad(result: any) {
            GFLog('finishLoad');
            this.friendListResponse = result;
            if (this.friendListResponse.errcode == 1) {
                this.userList.visible = false;
                this.hint_message.visible = true;
                this.hint_message.text = result.msg;
            } else {
                this.userList.visible = true;
                this.hint_message.visible = false;
                this.formatterUserSelected();
                this.configTable();
            }
        }

        private formatterUserSelected(){
            for (var index in this.friendListResponse.user_list){
                let userModel = this.friendListResponse.user_list[index];
                if (this.selectedUser) {
                    if (this.selectedUser.user.urid == Number(userModel.user.urid)) {
                        userModel.selected = 1;
                    } else {
                        userModel.selected = 0;
                    }
                }
            }
        }
        private requestData() {
            let api = "friend/list";
            let params = {
                sub: this.type,
                page: 1
            };
            model.getUrlRequestResponse(api, params, Handler.create(this, this.finishLoad));
        }

        private getUserBadgeValue(){
            model.getUrlRequestResponse("badge/index", undefined, Handler.create(this, function (result:any) {
                if (result.errcode == 0) {
                    for (var index in result.list) {
                        let keyValue = result.list[index];
                        let key = keyValue.key;
                        let value = keyValue.value;
                        if (key == "friend") {
                            this.badgeView1.setBadgeValue(value);
                            continue;
                        }
                        if (key == "strange") {
                            this.badgeView2.setBadgeValue(value);
                        }
                    }
                }
            }));
        }
        private getUserChatMessage() {
            let api = "friend/message";
            let params = { furid: this.selectedUser.user.urid};
            model.getUrlRequestResponse(api, params, Handler.create(this, function (result: any) {
                if (result.errcode == 0) {
                    this.chatList.array = result.message_list;
                    this.chatList.scrollTo(result.message_list.length);
                } else if (result.errcode == 1) {
                    this.chatList.array = [];
                }
            }));
        }
        private friendClicked(): void {//好友
            this.tabClicked(1);
        }
        private strangerClicked(): void {//陌生人
           this.tabClicked(0);
        }
        private blackListClicked(): void {//黑名单
            this.tabClicked(2);
        }

        private tabClicked(type: number){
            this.type = type;
            this.requestData();
            this.btn_tab1.selected = false;
            this.btn_tab2.selected = false;
            this.btn_tab3.selected = false;
            this.userActionView.hiddenButton();
            this.userActionView.addNewFriend.visible = false;
            this.service_time_label.visible = false;
            this.selectedUser = undefined;
            this.chatList.array = [];
            this.btn_send.visible = false;
            this.input.visible = false;
            this.input.text = "";
            this.userList.array = [];
            switch (type) {
                case 1:
                    this.btn_tab1.selected = true;
                    this.userActionView.addNewFriend.visible = true;
                    break;
                case 0:
                    this.btn_tab2.selected = true;
                    break;
                case 2:
                    this.btn_tab3.selected = true;
                    break;
            
                default:
                    break;
            }
        }

        private addNewFriend(): void {//新加好友
            let dialog: GFAddFriendDialogUI = new GFAddFriendDialogUI();
            dialog.text_input.maxChars = 10;
            dialog.popup();
            dialog.btn_close.on(laya.events.Event.CLICK, dialog, function () {
                dialog.close();
            });
            dialog.btn_addFriend.on(laya.events.Event.CLICK, this, function () {
                model.getUrlRequestResponse("friend/search", { furid: dialog.text_input.text }, Handler.create(this, function (result: any) {
                    if (result.errcode == 0) {
                        dialog.close();
                        let userDetail = new view.GFUserDetailDialog(result.user.urid, result);
                        userDetail.popup();
                        userDetail.closeHandler = Handler.create(this, function () {
                            this.requestData();
                        });
                    } else {
                        dialog.hint_message.visible = true;
                        dialog.hint_message.text = result.msg;
                    }
                }));
            });
        }

        private addFriend(){//加好友
            let param = {
                gfid: 0,
                furid: this.selectedUser.user.urid
            };
            let api = "friend/add";
            model.getUrlRequestResponse(api, param, Handler.create(this, function (result: any) {
                if (result.errcode == 0) {
                    this.requestData();
                    this.tabClicked(this.type);
                }
            }), true)
        }
        private givePoint() {//赠币
            model.getUrlRequestResponse("friend/pre-givepoint", undefined, Handler.create(this, function (result: any) {
                if (result.errcode == 0) {
                    let dialog = new view.GFGivePointDialog(this.selectedUser.user.urid);
                    dialog.popup();
                    dialog.successHandler = Handler.create(this, function (content:string) {
                        this.joinLocaleMessage(content);
                        this.requestData();
                    })
                }
            }),true)
        }
        private userDetail(): void {//查看
            let userDetail = new view.GFUserDetailDialog(this.selectedUser.user.urid);
            userDetail.popup();
        }
        private clearMessage(): void {//清空消息
            model.getUrlRequestResponse("friend/clear", { furid: this.selectedUser.user.urid }, Handler.create(this, function (result: any) {
                    if (result.errcode == 0) {
                        this.chatList.array = [];
                    }
            }))
        }
        private pullToBlank(): void {//拉黑
            let dialog = new view.GFAlmsDialog("确认拉黑好友\""+this.selectedUser.user.name+"\"？", 1);
            dialog.certain = Handler.create(this, function () {
                model.getUrlRequestResponse("friend/black", { furid: this.selectedUser.user.urid }, Handler.create(this, function (result: any) {
                    if (result.errcode == 0) {
                        this.requestData();
                        this.tabClicked(this.type);
                    }
                }),true)
            })
            dialog.show();
        }
        private deleteFriend(): void {//删除
            if(this.input.focus){
                return;
            }
            let dialog = new view.GFAlmsDialog("确认删除好友\"" + this.selectedUser.user.name + "\"？", 1);
            dialog.certain = Handler.create(this, function () {
                model.getUrlRequestResponse("friend/del", { furid: this.selectedUser.user.urid }, Handler.create(this, function (result: any) {
                    if (result.errcode == 0) {
                        this.requestData();
                        this.tabClicked(this.type);
                    }
                }),true)
            })
            dialog.show();
        }
        private sendMessage(): void {
            let text = this.input.text;
            if (text.length > 0) {
                let params = {
                    furid: this.selectedUser.user.urid,
                    content: text
                };
                model.getUrlRequestResponse("friend/message-commit", params, Handler.create(this, function (result: any) {
                    if (result.errcode == 0) {
                        this.joinLocaleMessage(text);
                    }
                }),true)
                this.input.text = "";
            }
        }

        private joinLocaleMessage(text:any){
            let messageObj: any = { suer: null, ruser: null, content: null, time: null };//= this.friendListResponse.user_list[0];
            messageObj.suser = model.UserModel;
            messageObj.ruser = this.selectedUser.user;
            messageObj.content = text;
            let time = new Date();
            let timeStr = "" + time.getFullYear() + "-" + time.getMonth() + "-" + time.getDay() + " " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
            messageObj.time = timeStr;
            let array = this.chatList.array;
            array.push(messageObj);
            this.chatList.array = array;
            this.chatList.scrollTo(this.chatList.array.length);
        }
    }
    export class GFUserActionView extends ui.GFUserActionViewUI {
        public lookHandler:Handler;
        public deleteHandler:Handler;
        public blackHandler:Handler;
        public clearHandler:Handler;
        public givePointHandler:Handler;
        public addNewFriendHandler:Handler;
        public addFriendHandler:Handler;
        constructor(){
            super();
            this.addAction();
        }
        private addAction(){
            // friendView
            this.addNewFriend.on(laya.events.Event.CLICK, this, function () {
                this.addNewFriendHandler.run();
            });
            let lookArray = [this.look,this.look2,this.look3];
            for (var index in lookArray) {
                lookArray[index].on(laya.events.Event.CLICK, this, function () {
                    this.lookHandler.run();
                });
            }
            let deleteArray = [this.delete,this.delete2,this.delete3];
            for (var index in deleteArray) {
                deleteArray[index].on(laya.events.Event.CLICK, this, function () {
                    this.deleteHandler.run();
                });
            }
            let blackArray = [this.black,this.black2];
            for (var index in blackArray) {
                blackArray[index].on(laya.events.Event.CLICK, this, function () {
                    this.blackHandler.run();
                });
            }
            let clearArray = [this.clear,this.clear2,this.clear3];
            for (var index in clearArray) {
                clearArray[index].on(laya.events.Event.CLICK, this, function () {
                    this.clearHandler.run();
                });
            }

            let giveArray = [this.give,this.give2];
            for (var index in giveArray) {
                giveArray[index].on(laya.events.Event.CLICK, this, function () {
                    this.givePointHandler.run();
                });
            }
            let addFriendArray = [this.addFriend2,this.addFriend3];
            for (var index in addFriendArray) {
                addFriendArray[index].on(laya.events.Event.CLICK, this, function () {
                    this.addFriendHandler.run();
                });
            }

        }
        public hiddenButton(){
            this.friendView.visible = false;
            this.strangeView.visible = false;
            this.blackView.visible = false;
        }
        public show(type:number){
            this.hiddenButton();
            switch (type) {
                case 1:
                    this.friendView.visible = true;
                    this.strangeView.visible = false;
                    this.blackView.visible = false;
                    break;
                case 0:
                    this.friendView.visible = false;
                    this.strangeView.visible = true;
                    this.blackView.visible = false;
                    break;

                case 2:
                    this.friendView.visible = false;
                    this.strangeView.visible = false;
                    this.blackView.visible = true;
                    break;
            
                default:
                    break;
            }
        }
    }

}