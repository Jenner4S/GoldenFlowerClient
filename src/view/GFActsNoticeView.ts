module view{

    import Text = Laya.Text;
    import Event = Laya.Event;

    export class GFActsNoticeView extends ui.GFActsNoticeViewUI{
        private prevY: number = 0;
         constructor(parameters) {
             super();
             this.showContent(parameters);
              this.onBtnClick();
         }

         private onBtnClick(){
              this.btn_confirms.on(laya.events.Event.CLICK, this, this.removeSelf);
         }


         private showContent(content: string){
             this.label_content.text = content;
             this.label_content.overflow = Text.SCROLL;
             this.label_content.on(Event.MOUSE_DOWN, this, this.startScrollText);

         }

         private startScrollText(e: Event): void {

             this.prevY = this.label_content.mouseY;

             Laya.stage.on(Event.MOUSE_MOVE, this, this.scrollText);
             Laya.stage.on(Event.MOUSE_UP, this, this.finishScrollText);
         }

          /* 停止滚动文本 */
         private finishScrollText(e: Event): void {
             Laya.stage.off(Event.MOUSE_MOVE, this, this.scrollText);
             Laya.stage.off(Event.MOUSE_UP, this, this.finishScrollText);
         }

         /* 鼠标滚动文本 */
         private scrollText(e: Event): void {
            
             var nowY: number = this.label_content.mouseY;           
             this.label_content.textField.scrollY += this.prevY - nowY;
             this.prevY = nowY;
         }


    }



}