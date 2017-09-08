module model {
    import Socket = laya.net.Socket;
    import Byte = laya.utils.Byte;
	import Dic = laya.utils.Dictionary;
    export class GFSocket {
        private socket : Socket = new Socket();
        // private output : Byte;
        constructor() {

			this.connectUrl();
        }
		public connectUrl(url ?: string) {
			if (!url){
				url = "ws://"+HOST+":8282/";
			}
			// this.socket.close();
			if(this.socket.connected) {
				this.socket.close()
			}
			this.socket.offAll();
			this.socket.connectByUrl(url);
			this.socket.on(laya.events.Event.OPEN , this , this.onSocketOpen);
            this.socket.on(laya.events.Event.CLOSE, this, this.onSocketClose);
			this.socket.on(laya.events.Event.MESSAGE, this, this.onMessageReveived);
			this.socket.on(laya.events.Event.ERROR, this, this.onConnectError);
		}
        private onSocketOpen(): void {
			// GFLog("Connected");
			if (model.UserModel.urid) {
				console.log('conected--------------in');
				let action = {
					"action": 1,
					"urid": model.UserModel.urid
				}
				view.GFHomePageView.socket.sendMsg(JSON.stringify(action));
			}
		}
		public send(content : string) {
			this.socket.send(`{"type" : "say" , "to_client_id" : "all" , "content" : "` + content + `"} `);
			// var message: string = `{"type" : "say" , "to_client_id" : "all" , "content" : "g高if搜i"} `;
			// this.output.writeUTFBytes(message);
			// this.socket.flush();
		}

		public sendMsg(msg : string) {
			if (this.socket.connected) {
                    this.socket.send(msg);
                } else {
					Laya.timer.once(100, this, this.sendMsg, [msg]);
                }
		}

		private onSocketClose(): void {
			GFLog("Socket closed");
			Laya.stage.timer.once( 500 , this , this.connectUrl)
		}

		private onMessageReveived(message: any): void {
			if (typeof message == "string") {
				if (message === "null") {
					return ;
				}
				if (message == "{\"ping\"}"){
                    this.sendMsg("{\"pong\"}");
					return;
                }
				let obj = JSON.parse(message);
				if (obj.action == 1) {//1.好友聊天接收信息
					GFLog("好友聊天接收信息");
					
					Laya.stage.event("user_receive_message",obj.user.urid);
				}else if(obj.action == 3) {//3.支付完成通知
					Laya.stage.event("pay_finish_message");
				}else if(obj.action == 5) {//5.擂台赛列表更新
					Laya.stage.event("refresh_arenalist_message");
				}else if(obj.action == 2) {//用户全服发广播
					GFLog('postMessage ---> ' + message);
					view.GFPostMessageView.currentMsg = obj;
					GFSocket.addMsg(obj.type , obj.user , obj.content);
				}else if(obj.action == 4) { //4.用户金币发生变化
					Laya.stage.event("user_point_changed",obj.point);
				}else if(obj.action == 7) {//全服宣战
					obj.type = 3;
					view.GFPostMessageView.currentMsg = obj;
					GFSocket.addMsg(obj.type , obj.roid , obj.content , obj.user);
				}else if(obj.action == 8) { //8.挑战好友
					Laya.stage.event("receive_arena_challenge",obj);
				}else if(obj.action == 9) { //9.首页好友红点
					Laya.stage.event("refresh_homepage_badge");
				}else if (obj.action == 10) {//10.停服更新
					if (!Laya.stage.getChildByName("updateImg")){
						let updateImg = new laya.ui.Image("comp/update.jpg");
						updateImg.size(Laya.stage.width,Laya.stage.height);
						updateImg.name = "updateImg";
						updateImg.on(laya.events.Event.CLICK, null, null);
						updateImg.zOrder = 100000;
						Laya.stage.addChild(updateImg);
					}
				}else if (obj.action == 11) {//11.停服更新结束
					let update = Laya.stage.getChildByName("updateImg");
					if (update){
						Laya.stage.removeChild(update);
					}
					Laya.Browser.window.location.reload(true);
				}else if(obj.action == 12) {//12.踢人广播
					view.GFPostMessageView.currentMsg = obj;
					GFSocket.addMsg(obj.type , obj.user , obj.content);
				}else if(obj.action == 13) {//13.被人踢出
					Laya.Dialog.closeAll()
					Laya.stage.event("be_kicked_by_other","");
					Laya.stage.event('GFMediaMessageViewClose')
					Laya.stage.event('GFPostMessageInputView')
					Laya.stage.event('GFPostMessageDialog')
					Laya.stage.event('GFAlmsDialogClose')
					view.GFBeKickedView.show(obj.user.name , obj.roid , obj.isArena);
					let gameHome = Laya.stage.getChildByName(view.GFHomePageView.name);
					let oldGameRoom = gameHome.getChildByName("GFGameRoom");
					if (oldGameRoom) {
						(<view.GFGameRoom>oldGameRoom).hardQuitGame();
					}
				}else if(obj.action == 14) {//14.金虎机广播
					view.GFPostMessageView.currentMsg = obj;
					GFSocket.addMsg(obj.type , obj.user , obj.content);
				}
				// else if(obj.action == 6){ //赠币
				// 	GFLog("赠币");
				// 	new view.GFCenterMsgDialog(obj.content);
				// }
			}
			else if (message instanceof ArrayBuffer) {
				GFLog(new Byte(message).readUTFBytes());
			}
		}

		private onConnectError(e: Event): void {
			GFLog("error");
		}

		static addMsg(type : number , obj : any , content : string ,user = undefined) {
			view.messageDialog.arr.reverse();
            view.messageDialog.arr.push(content);
            view.messageDialog.arr.reverse();
			if (type == 3) {
				Laya.stage.event("declareWar" , {type : type , roid : obj , content : content , user : user})
			}else {
				Laya.stage.event("newMessage" , {type : type , user : obj , content : content});
			}
			
		}
    }
}