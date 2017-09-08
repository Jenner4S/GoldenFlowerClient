/**
 * GFActsDialog 
 */

module view {
    import Text = laya.display.Text;
    import Event = laya.events.Event;
    let list: view.GFActsListTableView;
    export class GFActsDialog extends ui.GFActsDialogUI {
        private actsList: any;
        private currentindex: any;
        //       private prevX: number = 0;
        private prevY: number = 0;
        constructor(parameters) {
            super();

            this.btn_acts_dialog_close.on(laya.events.Event.CLICK, this, this.onDialogClose);
            this.btn_acts_get_reward.on(laya.events.Event.CLICK, this, this.onGetReward);
            this.label_acts_message.on(Event.MOUSE_DOWN, this, this.startScrollText);
        }



        /* 开始滚动文本 */
        private startScrollText(e: Event): void {
            //         this.prevX = this.label_acts_message.mouseX;
            this.prevY = this.label_acts_message.mouseY;

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
            var nowX: number = this.label_acts_message.mouseX;
            var nowY: number = this.label_acts_message.mouseY;

            //         this.label_acts_message.textField.scrollX += this.prevX - nowX;
            this.label_acts_message.textField.scrollY += this.prevY - nowY;

            //        this.prevX = nowX;
            this.prevY = nowY;
        }

        public showNoDataContent(noactmsg: any): void {
            this.label_no_act.text = noactmsg;
            this.label_no_act.visible = true;
            this.label_acts_message.visible = false;
        }

        public showContent(actdata: any): void {

            this.actsList = actdata;

            list = new view.GFActsListTableView();
            list.pos(14, 130);
            list.width = 220;
            list.height = 450;
            this.addChild(list);
            list.selectHandler = new Handler(this, this.onSelect);
            list.setup(this.actsList);
           this.onSelect(0);
        }

        public updateList(actdata: any): void {
            this.actsList = actdata;
            list.array = this.actsList;
            this.onSelect(this.currentindex);
        }


        private onSelect(index: number): void {

            if (index >= this.actsList.length) {
                return;
            }
            let cell: view.GFActsListtableViewCell = <view.GFActsListtableViewCell>list.selection;


            if (cell) {
            list.array.forEach(dataSource => {
                dataSource.selected = 0;
            });
                cell.ActsItemView.btn_acts_item.selected = true;
                if (cell.dataSource) {
                    cell.dataSource.selected = 1;
                }
                list.array[index].selected = 1;
            }


            let displaydata = list.array[index];

            //type: 活动类型，1-纯文本，2-可领取奖励，3-可兑换奖励 
            if (displaydata.type == 3) {
                this.btn_acts_get_reward.visible = true;
                this.textinput_acts.visible = true;
            } else if (displaydata.type == 2) {
                this.btn_acts_get_reward.visible = true;
                this.textinput_acts.visible = false;
            } else {
                this.btn_acts_get_reward.visible = false;
                this.textinput_acts.visible = false;
            }

            if (displaydata.received == 0) {
                this.btn_acts_get_reward.disabled = true;
            } else {
                this.btn_acts_get_reward.disabled = false;
            }

            this.label_acts_title.text = displaydata.title;
            this.label_acts_message.text = displaydata.content;

            if (displaydata.tips != undefined && displaydata.tips != "") {
                this.label_acts_tip.text = displaydata.tips;
                this.label_acts_tip.visible = true;
            } else {
                this.label_acts_tip.visible = false;
            }

            this.currentindex = index;

            GFLog("onSelect(index: number)=" + index);

            list.refresh();

        }

        private onDialogClose(): void {
            if (this.actsList) {
                list.clearSelected();
            }
            this.close();
        }

        private onGetReward(): void {
            GFLog("onGetReward  text=" + this.textinput_acts.text);

            let currentitem = list.array[this.currentindex];
            let acid = currentitem.acid;
            //type: 活动类型，1-纯文本，2-可领取奖励，3-可兑换奖励 
            if (currentitem.type == 3) {
                if (!this.textinput_acts.text) {
                    new GFCenterMsgDialog("礼包码错误！");
                    return;
                }
                let api = "activity/fetch";
                let params = { acid: acid, code: this.textinput_acts.text };
                model.getUrlRequestResponse(api, params, Handler.create(this, function (result: any) {
                    GFLog(result);
                    new GFCenterMsgDialog(result.msg);
                    if (result.errcode == 0) {

                    }
                }));
            } else {
                let api = "activity/fetch";
                let params = { acid: acid };
                model.getUrlRequestResponse(api, params, Handler.create(this, function (result: any) {
           
                    GFLog(result);
                    new GFCenterMsgDialog(result.msg);
                    if (result.errcode == 0) {
                        currentitem.received = 0;
                        this.btn_acts_get_reward.disabled = true;
                        Laya.stage.event(GFRefreshActsdList);
                    }
                }));
            }


        }

    }
}