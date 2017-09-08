module view {
    export class GFGivePointDialog extends ui.GFGivePointDialogUI {
        private numberButtonArray;
        public successHandler:Handler;
        constructor(private furid:string){
            super();
            this.btn_key_0.gray = true;
            Laya.loader.load(["comp/bg_zengjinbi.png"], Handler.create(this, function finish() {
                this.addAction();

            }));
        }
        private addAction() {
            this.btn_close.on(laya.events.Event.CLICK, this, this.close);
            this.btn_ok.on(laya.events.Event.CLICK, this, this.givePoint);
            this.numberButtonArray = new Array();
             this.numberButtonArray.push(this.btn_key_0, this.btn_key_1, this.btn_key_2, this.btn_key_3, this.btn_key_4, this.btn_key_5, this.btn_key_6, this.btn_key_7, this.btn_key_8 ,this.btn_key_9)
            this.numberButtonArray.forEach((button,index) => {
                button.on(laya.events.Event.CLICK, this, this.onKeyBtnClick,[index]);
            });
            this.btn_delete_code.on(laya.events.Event.CLICK, this, this.onDeleteBtnClick);
            //请点击下方数字
            this.label_input.on(laya.events.Event.CLICK, this, function () {
                new view.GFCenterMsgDialog("请点击下方数字");
            });
        }
        private onKeyBtnClick(index:number): void {
            // if (this.label_input.text.length == 0 && index == 0) {//第一个输入为0
            //     return;
            // }
            this.btn_key_0.gray = false;
            this.label_input.text += index;
        }
        private onDeleteBtnClick(): void {
            let length: number = this.label_input.text.length;
            if (length>1) {
                this.label_input.text = this.label_input.text.substring(0,length-1);
            }else if (length==1) {
                this.label_input.text = "";
                this.btn_key_0.gray = true;
            }
        }
        private givePoint(){
            if (this.label_input.text.length>0) {
                model.getUrlRequestResponse("friend/givepoint",{furid:this.furid,point:this.label_input.text},Handler.create(this,function(result:any){
                    new view.GFCenterMsgDialog(result.msg);
                    if (result.errcode == 0) {
                        this.close();
                        this.successHandler.runWith(result.content);
                    }
                }),true)
            }
        }
    }
}