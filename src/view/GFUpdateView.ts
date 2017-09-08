module view{
    export class GFUpdateView extends ui.GFUpdateViewUI {
        constructor(parameters) {
            super();
            if(parameters)
                this.showViewContent(parameters);
           this.btn_confirm.on(laya.events.Event.CLICK, this, this.onConfirmBtnClick);
           this.btn_cancel.on(laya.events.Event.CLICK, this, this.onCancelBtnClick);
            
        }

        private showViewContent(info){
            if(info.tips)
                this.label_title.text = info.tips;
            if(info.content){
                this.label_update_content.text = info.content;
            }

            if(info.positive){
                this.btn_confirm.label = info.positive;
            }

            if(info.negative){
                this.btn_cancel.label = info.negative;
            }

            if(info.isforce == 1){
                //强制升级
                this.btn_cancel.visible = false;
                this.btn_confirm.x = 478;
            }else{
                this.btn_cancel.visible = true;
                this.btn_confirm.x = 378;
            }

        }

        private onConfirmBtnClick() {
            let api = "more/add-icon";
            model.getUrlRequestResponse(api, undefined, Handler.create(this, function (result: any) {

                if (result.errcode == "0") {
                    window.location.href = "com.zjh://app";//android app协议                       
                    window.location.href = result.url;
                    this.removeSelf();
                } else {
                    new GFCenterMsgDialog(result.msg);
                }

            }));
        }

        private onCancelBtnClick(){
            this.removeSelf();
        }

    }
}