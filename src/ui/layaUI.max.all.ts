
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class ChargeDiamondDialogUI extends Dialog {
		public btn_charge_close:Laya.Button;
		public btn_charge_diamond:Laya.Button;
		public btn_change_coin:Laya.Button;
		public label_charge_level:Laya.Label;
		public label_charge_message:Laya.Label;
		public pannel_diamond_1:Laya.Panel;
		public label_diamond_b1:Laya.Label;
		public label_diamond_t1:Laya.Label;
		public image_diamond_gif_1:Laya.Image;
		public label_diamond_gif_1:Laya.Label;
		public pannel_diamond_3:Laya.Panel;
		public label_diamond_t3:Laya.Label;
		public label_diamond_b3:Laya.Label;
		public image_diamond_gif_3:Laya.Image;
		public label_diamond_gif_3:Laya.Label;
		public pannel_diamond_4:Laya.Panel;
		public label_diamond_b4:Laya.Label;
		public label_diamond_t4:Laya.Label;
		public image_diamond_gif_4:Laya.Image;
		public label_diamond_gif_4:Laya.Label;
		public pannel_diamond_6:Laya.Panel;
		public label_diamond_b6:Laya.Label;
		public label_diamond_t6:Laya.Label;
		public image_diamond_gif_6:Laya.Image;
		public label_diamond_gif_6:Laya.Label;
		public pannel_diamond_5:Laya.Panel;
		public label_diamond_b5:Laya.Label;
		public label_diamond_t5:Laya.Label;
		public image_diamond_gif_5:Laya.Image;
		public label_diamond_gif_5:Laya.Label;
		public pannel_diamond_2:Laya.Panel;
		public label_diamond_t2:Laya.Label;
		public label_diamond_b2:Laya.Label;
		public image_diamond_gif_2:Laya.Image;
		public label_diamond_gif_2:Laya.Label;
		public pannel_coin_1:Laya.Panel;
		public label_coin_t1:Laya.Label;
		public label_coin_b1:Laya.Label;
		public image_coin_gif_1:Laya.Image;
		public label_coin_gif_1:Laya.Label;
		public pannel_coin_2:Laya.Panel;
		public label_coin_t2:Laya.Label;
		public label_coin_b2:Laya.Label;
		public image_coin_gif_2:Laya.Image;
		public label_coin_gif_2:Laya.Label;
		public pannel_coin_3:Laya.Panel;
		public label_coin_t3:Laya.Label;
		public label_coin_b3:Laya.Label;
		public image_coin_gif_3:Laya.Image;
		public label_coin_gif_3:Laya.Label;
		public pannel_coin_4:Laya.Panel;
		public label_coin_t4:Laya.Label;
		public label_coin_b4:Laya.Label;
		public image_coin_gif_4:Laya.Image;
		public label_coin_gif_4:Laya.Label;
		public pannel_coin_5:Laya.Panel;
		public label_coin_t5:Laya.Label;
		public label_coin_b5:Laya.Label;
		public image_coin_gif_5:Laya.Image;
		public label_coin_gif_5:Laya.Label;
		public pannel_coin_6:Laya.Panel;
		public label_coin_t6:Laya.Label;
		public label_coin_b6:Laya.Label;
		public image_coin_gif_6:Laya.Image;
		public label_coin_gif_6:Laya.Label;

        public static  uiView:any ={"type":"Dialog","props":{"popupCenter":true},"child":[{"type":"Image","props":{"y":0,"x":0,"width":824,"visible":true,"skin":"comp/bg_chongzhitanchuang.png","height":598}},{"type":"Button","props":{"y":38,"x":719,"var":"btn_charge_close","stateNum":2,"skin":"comp/btn_dialog_close.png"}},{"type":"Button","props":{"y":47,"x":239,"var":"btn_charge_diamond","stateNum":2,"skin":"comp/btn_xiaoxitanchuang.png","selected":true,"labelSize":22,"labelPadding":"-2","labelColors":"#ffffff,#721e01,#721e01","labelBold":true,"label":"充值钻石"}},{"type":"Button","props":{"y":46,"x":433,"var":"btn_change_coin","stateNum":2,"skin":"comp/btn_xiaoxitanchuang.png","selected":false,"labelSize":22,"labelPadding":"-2","labelColors":"#ffffff,#721e01,#721e01","labelBold":true,"label":"兑换金币"}},{"type":"Label","props":{"y":518,"x":103,"var":"label_charge_level","fontSize":32,"color":"#ffffff"}},{"type":"Label","props":{"y":523,"x":156,"width":637,"var":"label_charge_message","height":33,"fontSize":20,"color":"#ffffff","align":"right"}},{"type":"Image","props":{"y":517,"x":34,"skin":"comp/image_yiyouzuanshi.png"}},{"type":"Panel","props":{"y":162,"x":68,"width":211,"var":"pannel_diamond_1","height":141},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"comp/bg_zuanshi_1.png"}},{"type":"Label","props":{"y":103,"x":0,"width":209,"visible":true,"var":"label_diamond_b1","height":35,"fontSize":26,"color":"#fff193","align":"center"}},{"type":"Label","props":{"y":5,"x":0,"width":209,"var":"label_diamond_t1","height":28,"fontSize":22,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":65,"x":90,"visible":false,"var":"image_diamond_gif_1","skin":"comp/image_zengsong.png"}},{"type":"Label","props":{"y":70,"x":99,"width":105,"var":"label_diamond_gif_1","height":24,"fontSize":20,"color":"#ffffff","align":"right"}}]},{"type":"Panel","props":{"y":162,"x":548,"width":211,"var":"pannel_diamond_3","height":140},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"comp/bg_zuanshi_3.png"}},{"type":"Label","props":{"y":3,"x":2,"width":209,"var":"label_diamond_t3","height":28,"fontSize":22,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":103,"x":0,"width":209,"visible":true,"var":"label_diamond_b3","height":35,"fontSize":26,"color":"#fff193","align":"center"}},{"type":"Image","props":{"y":66,"x":90,"visible":false,"var":"image_diamond_gif_3","skin":"comp/image_zengsong.png"}},{"type":"Label","props":{"y":71,"x":102,"width":101,"var":"label_diamond_gif_3","height":24,"fontSize":20,"color":"#ffffff","align":"right"}}]},{"type":"Panel","props":{"y":330,"x":68,"width":211,"var":"pannel_diamond_4","height":140},"child":[{"type":"Image","props":{"skin":"comp/bg_zuanshi_4.png"}},{"type":"Label","props":{"y":103,"width":209,"visible":true,"var":"label_diamond_b4","height":35,"fontSize":26,"color":"#fff193","align":"center"}},{"type":"Label","props":{"y":5,"width":209,"var":"label_diamond_t4","height":28,"fontSize":22,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":66,"x":89,"visible":false,"var":"image_diamond_gif_4","skin":"comp/image_zengsong.png"}},{"type":"Label","props":{"y":71,"x":98,"width":105,"var":"label_diamond_gif_4","height":24,"fontSize":20,"color":"#ffffff","align":"right"}}]},{"type":"Panel","props":{"y":330,"x":548,"width":211,"var":"pannel_diamond_6","height":140},"child":[{"type":"Image","props":{"skin":"comp/bg_zuanshi_6.png"}},{"type":"Label","props":{"y":103,"x":1,"width":209,"visible":true,"var":"label_diamond_b6","height":35,"fontSize":26,"color":"#fff193","align":"center"}},{"type":"Label","props":{"y":5,"width":209,"var":"label_diamond_t6","height":28,"fontSize":22,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":67,"x":90,"visible":false,"var":"image_diamond_gif_6","skin":"comp/image_zengsong.png"}},{"type":"Label","props":{"y":71,"x":99,"width":105,"var":"label_diamond_gif_6","height":24,"fontSize":20,"color":"#ffffff","align":"right"}}]},{"type":"Panel","props":{"y":330,"x":308,"width":211,"var":"pannel_diamond_5","height":143},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"comp/bg_zuanshi_5.png"}},{"type":"Label","props":{"y":103,"x":2,"width":209,"visible":true,"var":"label_diamond_b5","height":35,"fontSize":26,"color":"#fff193","align":"center"}},{"type":"Label","props":{"y":5,"x":0,"width":209,"var":"label_diamond_t5","height":28,"fontSize":22,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":66,"x":89,"visible":false,"var":"image_diamond_gif_5","skin":"comp/image_zengsong.png"}},{"type":"Label","props":{"y":71,"x":98,"width":105,"var":"label_diamond_gif_5","height":24,"fontSize":20,"color":"#ffffff","align":"right"}}]},{"type":"Panel","props":{"y":162,"x":309,"width":211,"var":"pannel_diamond_2","height":141},"child":[{"type":"Image","props":{"skin":"comp/bg_zuanshi_2.png"}},{"type":"Label","props":{"y":4,"width":209,"var":"label_diamond_t2","height":30,"fontSize":22,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":103,"width":209,"var":"label_diamond_b2","height":30,"fontSize":26,"color":"#fff193","align":"center"}},{"type":"Image","props":{"y":67,"x":89,"visible":false,"var":"image_diamond_gif_2","skin":"comp/image_zengsong.png"}},{"type":"Label","props":{"y":70,"x":98,"width":105,"var":"label_diamond_gif_2","height":24,"fontSize":20,"color":"#ffffff","align":"right"}}]},{"type":"Panel","props":{"y":162,"x":68,"width":212,"var":"pannel_coin_1","height":140},"child":[{"type":"Image","props":{"skin":"comp/bg_jinbi_1.png"}},{"type":"Label","props":{"y":6,"x":2,"width":207,"var":"label_coin_t1","height":21,"fontSize":22,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":100,"x":62,"skin":"comp/image_xuzuanshi.png"}},{"type":"Label","props":{"y":102,"x":113,"width":92,"var":"label_coin_b1","height":28,"fontSize":26,"color":"#fff193"}},{"type":"Image","props":{"y":65,"x":89,"width":120,"visible":false,"var":"image_coin_gif_1","skin":"comp/image_zengsong.png","height":30}},{"type":"Label","props":{"y":70,"x":98,"width":105,"var":"label_coin_gif_1","height":24,"fontSize":20,"color":"#ffffff","align":"right"}}]},{"type":"Panel","props":{"y":162,"x":309,"width":213,"var":"pannel_coin_2","height":140},"child":[{"type":"Image","props":{"skin":"comp/bg_jinbi_2.png"}},{"type":"Label","props":{"y":6,"x":2,"width":207,"var":"label_coin_t2","height":21,"fontSize":22,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":100,"x":59,"skin":"comp/image_xuzuanshi.png"}},{"type":"Label","props":{"y":102,"x":111,"width":92,"var":"label_coin_b2","height":28,"fontSize":26,"color":"#fff193"}},{"type":"Image","props":{"y":66,"x":89,"visible":false,"var":"image_coin_gif_2","skin":"comp/image_zengsong.png"}},{"type":"Label","props":{"y":71,"x":98,"width":105,"var":"label_coin_gif_2","height":24,"fontSize":20,"color":"#ffffff","align":"right"}}]},{"type":"Panel","props":{"y":162,"x":548,"width":210,"var":"pannel_coin_3","height":140},"child":[{"type":"Image","props":{"skin":"comp/bg_jinbi_3.png"}},{"type":"Label","props":{"y":5,"x":2,"width":207,"var":"label_coin_t3","height":21,"fontSize":22,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":100,"x":60,"skin":"comp/image_xuzuanshi.png"}},{"type":"Label","props":{"y":102,"x":111,"width":92,"var":"label_coin_b3","height":28,"fontSize":26,"color":"#fff193"}},{"type":"Image","props":{"y":66,"x":90,"visible":false,"var":"image_coin_gif_3","skin":"comp/image_zengsong.png"}},{"type":"Label","props":{"y":71,"x":99,"width":105,"var":"label_coin_gif_3","height":24,"fontSize":20,"color":"#ffffff","align":"right"}}]},{"type":"Panel","props":{"y":330,"x":68,"width":211,"var":"pannel_coin_4","height":142},"child":[{"type":"Image","props":{"skin":"comp/bg_jinbi_4.png"}},{"type":"Label","props":{"y":6,"x":2,"width":207,"var":"label_coin_t4","height":21,"fontSize":22,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":100,"x":55,"skin":"comp/image_xuzuanshi.png"}},{"type":"Label","props":{"y":102,"x":107,"width":92,"var":"label_coin_b4","height":28,"fontSize":26,"color":"#fff193"}},{"type":"Image","props":{"y":66,"x":89,"visible":false,"var":"image_coin_gif_4","skin":"comp/image_zengsong.png"}},{"type":"Label","props":{"y":71,"x":98,"width":105,"var":"label_coin_gif_4","height":24,"fontSize":20,"color":"#ffffff","align":"right"}}]},{"type":"Panel","props":{"y":330,"x":308,"width":211,"var":"pannel_coin_5","height":141},"child":[{"type":"Image","props":{"skin":"comp/bg_jinbi_5.png"}},{"type":"Label","props":{"y":6,"x":2,"width":207,"var":"label_coin_t5","height":21,"fontSize":22,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":100,"x":55,"skin":"comp/image_xuzuanshi.png"}},{"type":"Label","props":{"y":102,"x":107,"width":92,"var":"label_coin_b5","height":28,"fontSize":26,"color":"#fff193"}},{"type":"Image","props":{"y":66,"x":89,"visible":false,"var":"image_coin_gif_5","skin":"comp/image_zengsong.png"}},{"type":"Label","props":{"y":71,"x":98,"width":105,"var":"label_coin_gif_5","height":24,"fontSize":20,"color":"#ffffff","align":"right"}}]},{"type":"Panel","props":{"y":330,"x":548,"width":212,"var":"pannel_coin_6","height":141},"child":[{"type":"Image","props":{"skin":"comp/bg_jinbi_6.png"}},{"type":"Label","props":{"y":6,"x":2,"width":207,"var":"label_coin_t6","height":21,"fontSize":22,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":100,"x":55,"skin":"comp/image_xuzuanshi.png"}},{"type":"Label","props":{"y":102,"x":108,"width":92,"var":"label_coin_b6","height":28,"fontSize":26,"color":"#fff193"}},{"type":"Image","props":{"y":67,"x":89,"visible":false,"var":"image_coin_gif_6","skin":"comp/image_zengsong.png"}},{"type":"Label","props":{"y":72,"x":98,"width":105,"var":"label_coin_gif_6","height":24,"fontSize":20,"color":"#ffffff","align":"right"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.ChargeDiamondDialogUI.uiView);
        }
    }
}

module ui {
    export class GFAccountLoginUI extends View {
		public input_phone_number:Laya.TextInput;
		public input_passward:Laya.TextInput;
		public btn_reget_password:Laya.Button;
		public btn_close:Laya.Button;
		public btn_register_login:Laya.Button;
		public btn_qq_login:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":1136,"height":640},"child":[{"type":"Image","props":{"y":70,"x":200,"skin":"comp/bg_zhanghaodenglu.png"}},{"type":"TextInput","props":{"y":220,"x":338,"width":460,"var":"input_phone_number","skin":"comp/textinput.png","height":62,"bgColor":"#00102f"}},{"type":"TextInput","props":{"y":312,"x":338,"width":260,"var":"input_passward","skin":"comp/textinput.png","height":62,"bgColor":"#00102f"}},{"type":"Button","props":{"y":314,"x":618,"var":"btn_reget_password","skin":"comp/btn_yanzhengma.png","labelSize":24,"labelPadding":"-1","labelColors":"#ffffff,#ffffff,#ffffff,#ffffff","labelBold":true,"label":"找回密码"}},{"type":"Button","props":{"y":69,"x":860,"var":"btn_close","stateNum":2,"skin":"comp/btn_dialog_close.png"}},{"type":"Button","props":{"y":448,"x":333,"var":"btn_register_login","stateNum":2,"skin":"comp/btn_dengluzhuce.png"}},{"type":"Button","props":{"y":448,"x":593,"var":"btn_qq_login","stateNum":2,"skin":"comp/btn_zhanghao_qq.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GFAccountLoginUI.uiView);
        }
    }
}

module ui {
    export class GFActiviteAccountUI extends View {
		public label_information:Laya.Label;
		public input_indentify_code:Laya.TextInput;
		public input_password:Laya.TextInput;
		public btn_get_code:Laya.Button;
		public btn_activite:Laya.Button;
		public btn_cancel:Laya.Button;
		public btn_close:Laya.Button;

        public static  uiView:any ={"type":"View","props":{},"child":[{"type":"Image","props":{"y":70,"x":200,"skin":"comp/bg_zhanghaodenglu.png"}},{"type":"Label","props":{"y":218,"x":302,"width":500,"var":"label_information","text":"验证码","fontSize":26,"color":"#ffffff"}},{"type":"TextInput","props":{"y":260,"x":302,"width":340,"var":"input_indentify_code","skin":"comp/textinput.png","height":62,"fontSize":28,"bgColor":"#00102f"}},{"type":"TextInput","props":{"y":352,"x":302,"width":340,"var":"input_password","skin":"comp/textinput.png","height":62,"fontSize":28,"bgColor":"#00102f"}},{"type":"Button","props":{"y":266,"x":654,"var":"btn_get_code","skin":"comp/btn_yanzhengma.png","labelSize":24,"labelPadding":"-1","labelColors":"#ffffff,#ffffff,#ffffff,#ffffff","labelBold":true,"label":"获取验证码"}},{"type":"Button","props":{"y":458,"x":408,"var":"btn_activite","stateNum":2,"skin":"comp/btn_150x58.png","labelSize":26,"labelPadding":"-1","labelColors":"#721e01,#721e01,#721e01,#721e01","labelBold":true,"label":"激活"}},{"type":"Button","props":{"y":458,"x":578,"var":"btn_cancel","stateNum":2,"skin":"comp/btn_150x58.png","labelSize":26,"labelPadding":"-1","labelColors":"#721e01,#721e01,#721e01,#721e01","labelBold":true,"label":"取消"}},{"type":"Button","props":{"y":69,"x":864,"var":"btn_close","stateNum":2,"skin":"comp/btn_dialog_close.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GFActiviteAccountUI.uiView);
        }
    }
}

module ui {
    export class GFActsDialogUI extends Dialog {
		public btn_acts_dialog_close:Laya.Button;
		public btn_acts_get_reward:Laya.Button;
		public label_acts_title:Laya.Label;
		public label_acts_message:Laya.Label;
		public label_acts_tip:Laya.Label;
		public textinput_acts:Laya.TextInput;
		public label_no_act:Laya.Label;

        public static  uiView:any ={"type":"Dialog","props":{},"child":[{"type":"Image","props":{"y":5,"x":-4,"skin":"comp/bg_huodongtanchuang.png"}},{"type":"Button","props":{"y":38,"x":719,"var":"btn_acts_dialog_close","stateNum":2,"skin":"comp/btn_dialog_close.png"}},{"type":"Button","props":{"y":525,"x":638,"visible":false,"var":"btn_acts_get_reward","skin":"comp/btn_huodong_lingjiang.png"}},{"type":"Label","props":{"y":154,"x":231,"wordWrap":true,"width":570,"var":"label_acts_title","height":29,"fontSize":28,"color":"#ffcc19","bold":true,"align":"center"}},{"type":"Label","props":{"y":199,"x":254,"wordWrap":true,"width":526,"var":"label_acts_message","overflow":"scroll","leading":10,"height":305,"fontSize":24,"color":"#ffffff"}},{"type":"Label","props":{"y":533,"x":256,"width":369,"visible":false,"var":"label_acts_tip","height":33,"fontSize":24,"color":"#ffffff"}},{"type":"TextInput","props":{"y":529,"x":255,"width":366,"visible":false,"var":"textinput_acts","skin":"comp/textinput.png","height":42,"fontSize":24}},{"type":"Label","props":{"y":303,"x":245,"width":541,"visible":false,"var":"label_no_act","text":"暂无活动","height":58,"fontSize":24,"color":"#ffffff","align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GFActsDialogUI.uiView);
        }
    }
}

module ui {
    export class GFActsItemViewUI extends View {
		public btn_acts_item:Laya.Button;
		public label_acts_item_name:Laya.Label;
		public image_acts_item:Laya.Image;
		public label_acts_item_mark:Laya.Label;

        public static  uiView:any ={"type":"View","props":{},"child":[{"type":"Button","props":{"y":1,"x":0,"width":218,"var":"btn_acts_item","stateNum":2,"skin":"comp/btn_huodongxiang.png","height":84}},{"type":"Label","props":{"y":30,"x":3,"width":217,"var":"label_acts_item_name","height":34,"fontSize":24,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":1,"x":146,"visible":false,"var":"image_acts_item","skin":"comp/image_huodongbiaoqian.png"}},{"type":"Label","props":{"y":5,"x":151,"width":64,"var":"label_acts_item_mark","height":21,"fontSize":20,"color":"#ffffff","align":"right"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GFActsItemViewUI.uiView);
        }
    }
}

module ui {
    export class GFActsNoticeViewUI extends View {
		public btn_confirms:Laya.Button;
		public label_content:Laya.Label;

        public static  uiView:any ={"type":"View","props":{},"child":[{"type":"Image","props":{"y":70,"x":208,"skin":"comp/bg_gaoshi.png"}},{"type":"Button","props":{"y":450,"x":458,"var":"btn_confirms","stateNum":2,"skin":"comp/btn_gaoshi_queding.png"}},{"type":"Label","props":{"y":204,"x":290,"wordWrap":true,"width":556,"var":"label_content","height":216,"fontSize":24,"color":"#ffffff"}},{"type":"Image","props":{"y":90,"x":536,"skin":"comp/image_tishi.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GFActsNoticeViewUI.uiView);
        }
    }
}

module ui {
    export class GFAddFriendDialogUI extends Dialog {
		public btn_close:Laya.Button;
		public btn_addFriend:Laya.Button;
		public text_input:Laya.TextInput;
		public hint_message:Laya.Label;

        public static  uiView:any ={"type":"Dialog","props":{"width":600,"visible":true,"height":400},"child":[{"type":"Panel","props":{"y":-17,"x":-5.5,"width":631,"visible":true,"height":426},"child":[{"type":"Image","props":{"y":10,"width":610,"skin":"comp/bg_jiahaoyou.png","height":412}},{"type":"Button","props":{"x":550,"var":"btn_close","stateNum":2,"skin":"comp/btn_dialog_close.png"}},{"type":"Button","props":{"y":295,"x":240.5,"width":150,"var":"btn_addFriend","stateNum":2,"skin":"comp/btn_xiaoxitanchuang.png","selected":true,"labelSize":24,"labelPadding":0,"labelColors":",#721e01","labelBold":true,"label":"查找","height":58}},{"type":"TextInput","props":{"y":189,"x":113,"width":377,"var":"text_input","skin":"comp/textinput.png","height":43,"fontSize":24,"color":"#ffffff","bold":true,"bgColor":"#01112e"}},{"type":"Label","props":{"y":258,"x":227,"width":177,"visible":false,"var":"hint_message","text":"玩家ID不存在","height":25,"fontSize":20,"color":"#e10000","align":"center"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GFAddFriendDialogUI.uiView);
        }
    }
}

module ui {
    export class GFAlmsDialogUI extends Dialog {

        public static  uiView:any ={"type":"Dialog","props":{},"child":[{"type":"Image","props":{"y":0,"x":0,"width":1136,"skin":"comp/bg_zhezhao.png","height":640}},{"type":"Image","props":{"width":610,"skin":"comp/bg_wenzitishi.png","height":412,"centerX":0,"bottom":116}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GFAlmsDialogUI.uiView);
        }
    }
}

module ui {
    export class GFArenaItemViewUI extends View {
		public label_arena_master:Laya.Label;
		public label_base_chip:Laya.Label;
		public label_person_num:Laya.Label;
		public label_watcher_num:Laya.Label;
		public btn_watch:Laya.Button;
		public btn_join:Laya.Button;
		public image_only_friend:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"y":20,"width":356,"height":170},"child":[{"type":"Image","props":{"y":0,"x":8,"skin":"comp/bg_guanzhanju.png"}},{"type":"Label","props":{"y":19,"x":24,"var":"label_arena_master","text":"擂主","fontSize":22,"color":"#ffffff"}},{"type":"Label","props":{"y":47,"x":24,"var":"label_base_chip","text":"底注","fontSize":22,"color":"#ffffff"}},{"type":"Label","props":{"y":75,"x":24,"var":"label_person_num","text":"人数","fontSize":22,"color":"#ffffff"}},{"type":"Label","props":{"y":102,"x":24,"var":"label_watcher_num","text":"观战","fontSize":22,"color":"#ffffff"}},{"type":"Button","props":{"y":18,"x":235,"var":"btn_watch","stateNum":2,"skin":"comp/btn_guanzhan.png","labelSize":24,"labelPadding":"-2","labelColors":"#721e01,#721e01","labelBold":true,"label":"观战"}},{"type":"Button","props":{"y":83,"x":235,"var":"btn_join","stateNum":2,"skin":"comp/btn_guanzhan.png","labelSize":24,"labelPadding":"-5","labelColors":"#721e01,#721e01","labelBold":true,"label":"应战"}},{"type":"Image","props":{"y":125,"x":7,"visible":false,"var":"image_only_friend","skin":"comp/image_jinxianhaoyou.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GFArenaItemViewUI.uiView);
        }
    }
}

module ui {
    export class GFArenaListViewUI extends View {
		public btn_close:Laya.Button;
		public btn_open_arena:Laya.Button;
		public label_information:Laya.Label;

        public static  uiView:any ={"type":"View","props":{},"child":[{"type":"Image","props":{"y":21,"x":156,"skin":"comp/bg_guanzhan.png"}},{"type":"Button","props":{"y":43,"x":875,"var":"btn_close","stateNum":2,"skin":"comp/btn_dialog_close.png"}},{"type":"Button","props":{"y":535,"x":802,"var":"btn_open_arena","stateNum":2,"skin":"comp/btn_150x58.png","labelSize":24,"labelPadding":"-1","labelColors":"#721e01,#721e01","labelBold":true,"label":"摆擂台"}},{"type":"Label","props":{"y":554,"x":188,"var":"label_information","fontSize":24,"color":"#ffffff"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GFArenaListViewUI.uiView);
        }
    }
}

module ui {
    export class GFArenaLookingItemUI extends View {
		public img_head:Laya.Image;
		public img_sex:Laya.Image;
		public label_coins:Laya.Label;
		public btn_go:Laya.Button;
		public label_name:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":350,"height":100},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"comp/bg_guanzhanren.png"}},{"type":"Image","props":{"y":15,"x":10,"width":70,"var":"img_head","skin":"comp/image_youxitouxiang.png","height":70}},{"type":"Image","props":{"y":14,"x":96,"width":38,"var":"img_sex","skin":"comp/image_nan.png","height":38}},{"type":"Image","props":{"y":62,"x":98,"skin":"comp/youxi_jinbi.png"}},{"type":"Label","props":{"y":61,"x":130,"width":105,"var":"label_coins","text":"1234567","height":26,"fontSize":22,"color":"#ffcc19"}},{"type":"Button","props":{"y":27,"x":242,"width":100,"var":"btn_go","stateNum":2,"skin":"comp/btn_guanzhan.png","labelSize":22,"labelPadding":"-5,0,0,0","labelColors":"#721e01,#721e01","labelBold":true,"label":"查看","height":55}},{"type":"Label","props":{"y":13,"x":142,"width":96,"var":"label_name","valign":"middle","text":"name","height":38,"fontSize":22,"color":"#ffffff","align":"left"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GFArenaLookingItemUI.uiView);
        }
    }
}

module ui {
    export class GFArenaNoticeDialogUI extends Dialog {
		public btn_arena_notice_close:Laya.Button;
		public htmltext_title:laya.html.dom.HTMLDivElement;
		public label_arena_master:Laya.Label;
		public label_arena_point:Laya.Label;
		public label_arena_participant:Laya.Label;
		public label_arena_viewer:Laya.Label;
		public btn_arena_accept:Laya.Button;
		public btn_arena_view:Laya.Button;
		public image_type:Laya.Image;
		public label_tip:Laya.Label;

        public static  uiView:any ={"type":"Dialog","props":{"width":650,"popupCenter":true,"height":452},"child":[{"type":"Image","props":{"y":3,"x":0,"skin":"comp/bg_tiaozhantanchuang.png"}},{"type":"Button","props":{"y":0,"x":576,"var":"btn_arena_notice_close","stateNum":2,"skin":"comp/btn_dialog_close.png"}},{"type":"HTMLDivElement","props":{"y":138,"x":73,"width":567,"var":"htmltext_title","height":32}},{"type":"Label","props":{"y":215,"x":73,"width":482,"var":"label_arena_master","height":28,"fontSize":24,"color":"#ffffff"}},{"type":"Label","props":{"y":243,"x":73,"width":482,"var":"label_arena_point","height":30,"fontSize":24,"color":"#ffffff"}},{"type":"Label","props":{"y":273,"x":73,"width":482,"var":"label_arena_participant","height":28,"fontSize":24,"color":"#ffffff"}},{"type":"Label","props":{"y":301,"x":73,"width":482,"var":"label_arena_viewer","height":28,"fontSize":24,"color":"#ffffff"}},{"type":"Button","props":{"y":347,"x":165,"width":158,"var":"btn_arena_accept","stateNum":2,"skin":"comp/btn_150x58.png","labelStroke":0,"labelSize":24,"labelPadding":"-2","labelColors":"#721e01,#721e01,#721e01","labelBold":true,"label":"应战","height":58}},{"type":"Button","props":{"y":347,"x":349,"var":"btn_arena_view","stateNum":2,"skin":"comp/btn_fanhui_quxiao.png","labelStroke":0,"labelSize":24,"labelPadding":"-2","labelColors":"#ffffff,#ffffff,#ffffff","labelBold":true,"label":"观战"}},{"type":"Image","props":{"y":60,"x":223,"var":"image_type","skin":"comp/image_zhongji_xuan.png"}},{"type":"Label","props":{"y":173,"x":73,"width":563,"var":"label_tip","height":28,"fontSize":24,"color":"#ffffff"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.createView(ui.GFArenaNoticeDialogUI.uiView);
        }
    }
}

module ui {
    export class GFBelleDialogUI extends Dialog {
		public image_belle_background:Laya.Image;
		public btn_belle_close:Laya.Button;
		public belleTab:Laya.Tab;
		public label_belle_gift_rank:Laya.Label;
		public label_belle_rank_tip:Laya.Label;
		public label_cer_instruction:Laya.Label;
		public pannel_cer_power:Laya.Panel;
		public label_cer_power_tip:Laya.Label;
		public label_cer_power_flag:Laya.Label;
		public btn_day_gift:Laya.Button;
		public btn_rank_gift:Laya.Button;
		public label_belle_rank_coin_left:Laya.Label;
		public label_belle_rank_coin_right:Laya.Label;
		public pannel_my_app_cer:Laya.Panel;
		public label_cer_times:Laya.Label;
		public image_life:Laya.Image;
		public image_self:Laya.Image;
		public label_life_shadow:Laya.Label;
		public label_self_shadow:Laya.Label;
		public label_failed_cause:Laya.Label;
		public btn_app_cer_commit:Laya.Button;
		public pannel_cer_tabs:Laya.Panel;
		public btn_cer_power:Laya.Button;
		public btn_cer_instruction:Laya.Button;
		public btn_cer_application:Laya.Button;
		public pannel_belle_center_wait:Laya.Panel;

        public static  uiView:any ={"type":"Dialog","props":{"visible":true},"child":[{"type":"Image","props":{"y":0,"x":0,"visible":true,"var":"image_belle_background","skin":"comp/bg_woderenzheng.png"}},{"type":"Button","props":{"y":36,"x":842,"var":"btn_belle_close","stateNum":2,"skin":"comp/btn_dialog_close.png"}},{"type":"Tab","props":{"y":46,"x":133,"width":520,"var":"belleTab","stateNum":2,"skin":"comp/tab_paihang.png","selectedIndex":0,"labels":"最新认证,上周排名,本周排名,我的认证","labelSize":22,"labelPadding":"0,0,3,0","labelColors":"#ffffff,#721e01","labelBold":true,"height":52}},{"type":"Label","props":{"y":123,"x":610,"width":151,"visible":false,"var":"label_belle_gift_rank","text":"上周礼物价值","height":29,"fontSize":22,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":123,"x":165,"width":452,"visible":false,"var":"label_belle_rank_tip","height":29,"fontSize":22,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":152,"x":262,"width":486,"visible":false,"var":"label_cer_instruction","text":"1.年满18周岁女性\\n2.照片中五官清晰可见\\n3.审核通过后将替换个人中心头像","leading":10,"height":104,"fontSize":24,"color":"#ffffff","align":"left"}},{"type":"Panel","props":{"y":139,"x":262,"width":543,"visible":false,"var":"pannel_cer_power","height":441},"child":[{"type":"Label","props":{"y":46,"x":0,"width":476,"visible":true,"var":"label_cer_power_tip","leading":10,"height":103,"fontSize":24,"color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":-1,"x":-1,"width":171,"visible":true,"text":"美女认证特权","height":28,"fontSize":28,"color":"#ffcc19","align":"left"}},{"type":"Label","props":{"y":1,"x":171,"width":162,"visible":true,"var":"label_cer_power_flag","height":29,"fontSize":22,"color":"#ffffff","align":"left"}},{"type":"Button","props":{"y":380,"x":214,"visible":false,"var":"btn_day_gift","stateNum":2,"skin":"comp/btn_150x58.png","labelSize":24,"labelPadding":"0,0,3,0","labelColors":"#721e01,#721e01","labelBold":true,"label":"领日奖励","disabled":false}},{"type":"Button","props":{"y":380,"x":370,"visible":false,"var":"btn_rank_gift","stateNum":2,"skin":"comp/btn_150x58.png","labelSize":24,"labelPadding":"0,0,3,0","labelColors":"#721e01,#721e01","labelBold":true,"label":"领排名奖","disabled":false}},{"type":"Label","props":{"y":161,"x":0,"width":274,"visible":true,"var":"label_belle_rank_coin_left","leading":8,"height":209,"fontSize":22,"color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":161,"x":280,"width":274,"visible":true,"var":"label_belle_rank_coin_right","leading":8,"height":209,"fontSize":22,"color":"#ffffff","align":"left"}}]},{"type":"Panel","props":{"y":155,"x":238,"width":569,"visible":false,"var":"pannel_my_app_cer","height":428},"child":[{"type":"Label","props":{"y":0,"x":34,"width":231,"visible":true,"text":"生活照","height":30,"fontSize":22,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":0,"x":301,"width":229,"visible":true,"text":"自拍照，仅客服可见","height":31,"fontSize":22,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":46,"x":35,"skin":"comp/image_touxiangbeijing.png"}},{"type":"Image","props":{"y":46,"x":301,"skin":"comp/image_touxiangbeijing.png"}},{"type":"Label","props":{"y":297,"x":0,"width":568,"visible":true,"var":"label_cer_times","height":53,"fontSize":22,"color":"#ffcc19","align":"center"}},{"type":"Image","props":{"y":56,"x":45,"width":210,"var":"image_life","skin":"comp/image_meinvmoren.png","height":210}},{"type":"Image","props":{"y":56,"x":311,"width":210,"var":"image_self","skin":"comp/image_meinvmoren.png","height":210}},{"type":"Label","props":{"y":227,"x":45,"width":210,"visible":true,"var":"label_life_shadow","height":39,"fontSize":22,"color":"#ffffff","bgColor":"#000001","alpha":0.3,"align":"center"}},{"type":"Label","props":{"y":227,"x":311,"width":210,"visible":true,"var":"label_self_shadow","height":39,"fontSize":22,"color":"#ffffff","bgColor":"#000001","alpha":0.3,"align":"center"}},{"type":"Label","props":{"y":376,"x":14,"wordWrap":true,"width":378,"visible":true,"var":"label_failed_cause","height":51,"fontSize":22,"color":"#93b9ff","align":"left"}},{"type":"Button","props":{"y":364,"x":394,"var":"btn_app_cer_commit","stateNum":2,"skin":"comp/btn_150x58.png","labelSize":24,"labelPadding":"0,0,3,0","labelColors":"#721e01,#721e01","labelBold":true,"label":"申请认证"}}]},{"type":"Panel","props":{"y":124,"x":16,"width":222,"var":"pannel_cer_tabs","height":257},"child":[{"type":"Button","props":{"x":2,"width":218,"var":"btn_cer_power","stateNum":2,"skin":"comp/btn_huodongxiang.png","height":84}},{"type":"Button","props":{"y":85,"x":2,"width":218,"var":"btn_cer_instruction","stateNum":2,"skin":"comp/btn_huodongxiang.png","height":84}},{"type":"Button","props":{"y":170,"x":2,"width":218,"var":"btn_cer_application","stateNum":2,"skin":"comp/btn_huodongxiang.png","height":84}},{"type":"Label","props":{"y":28,"x":1,"width":217,"visible":true,"text":"认证特权","height":28,"fontSize":24,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":113,"width":219,"visible":true,"text":"认证说明","height":29,"fontSize":24,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":197,"x":1,"width":219,"visible":true,"text":"申请认证","height":29,"fontSize":24,"color":"#ffffff","align":"center"}}]},{"type":"Panel","props":{"y":5,"x":2,"width":825,"visible":false,"var":"pannel_belle_center_wait","height":597},"child":[{"type":"Label","props":{"y":3,"x":7,"width":805,"visible":false,"height":576,"fontSize":22,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":256,"x":0,"width":818,"skin":"comp/bg_qipao.png","height":112}},{"type":"Label","props":{"y":294,"x":13,"width":789,"visible":true,"text":"正在上传照片...","height":43,"fontSize":34,"color":"#ffffff","align":"center"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GFBelleDialogUI.uiView);
        }
    }
}

module ui {
    export class GFBelleLatestCellViewUI extends View {
		public label_belle_name:Laya.Label;
		public image_belle:Laya.Image;

        public static  uiView:any ={"type":"View","props":{},"child":[{"type":"Label","props":{"y":138,"x":0,"width":140,"visible":true,"var":"label_belle_name","height":24,"fontSize":18,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":10,"x":10,"width":120,"var":"image_belle","height":120}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GFBelleLatestCellViewUI.uiView);
        }
    }
}

module ui {
    export class GFBlackActionViewUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":570,"height":66}};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GFBlackActionViewUI.uiView);
        }
    }
}

module ui {
    export class GFContinuousLoginUI extends Dialog {
		public btn_close:Laya.Button;
		public btn_get:Laya.Button;
		public label_vip_award:Laya.Label;
		public panel_day1:Laya.Panel;
		public img_1day:Laya.Image;
		public label_coins_1day:Laya.Label;
		public panel_day2:Laya.Panel;
		public img_2day:Laya.Image;
		public label_coins_2day:Laya.Label;
		public panel_day3:Laya.Panel;
		public img_3day:Laya.Image;
		public label_coins_3day:Laya.Label;
		public panel_day4:Laya.Panel;
		public img_4day:Laya.Image;
		public label_coins_4day:Laya.Label;
		public panel_day5:Laya.Panel;
		public img_5day:Laya.Image;
		public label_coins_5day:Laya.Label;

        public static  uiView:any ={"type":"Dialog","props":{"y":2,"x":156,"align":"center"},"child":[{"type":"Panel","props":{"y":14,"x":9,"width":806,"height":584},"child":[{"type":"Image","props":{"skin":"comp/bg_lianxudenglu.png"}},{"type":"Button","props":{"y":45,"x":705,"var":"btn_close","stateNum":2,"skin":"comp/btn_dialog_close.png"}},{"type":"Button","props":{"y":503,"x":338,"var":"btn_get","stateNum":2,"skin":"comp/btn_liandeng_lingqu.png"}},{"type":"Label","props":{"y":417,"x":281,"var":"label_vip_award","fontSize":24,"color":"#93b9ff","align":"center"}},{"type":"Panel","props":{"y":159,"x":23,"width":147,"var":"panel_day1","height":219},"child":[{"type":"Image","props":{"var":"img_1day","skin":"comp/image_liangdeng1.png"}},{"type":"Label","props":{"x":30,"var":"label_coins_1day","top":172,"text":"1000×1","fontSize":26,"color":"#ffcc19"}}]},{"type":"Panel","props":{"y":159,"x":180,"width":148,"var":"panel_day2","height":218},"child":[{"type":"Image","props":{"var":"img_2day","skin":"comp/image_liangdeng2.png"}},{"type":"Label","props":{"x":29,"var":"label_coins_2day","top":172,"text":"1000×2","fontSize":26,"color":"#ffcc19"}}]},{"type":"Panel","props":{"y":159,"x":333,"width":149,"var":"panel_day3","height":221},"child":[{"type":"Image","props":{"var":"img_3day","skin":"comp/image_liangdeng3.png"}},{"type":"Label","props":{"x":30,"var":"label_coins_3day","top":172,"text":"1000×3","fontSize":26,"color":"#ffcc19"}}]},{"type":"Panel","props":{"y":159,"x":488,"width":149,"var":"panel_day4","height":220},"child":[{"type":"Image","props":{"var":"img_4day","skin":"comp/image_liangdeng4.png"}},{"type":"Label","props":{"x":29,"var":"label_coins_4day","top":172,"text":"1000×4","fontSize":26,"color":"#ffcc19"}}]},{"type":"Panel","props":{"y":159,"x":643,"width":147,"var":"panel_day5","height":218},"child":[{"type":"Image","props":{"var":"img_5day","skin":"comp/image_liangdeng5.png"}},{"type":"Label","props":{"x":28,"var":"label_coins_5day","top":172,"text":"1000×5","fontSize":26,"color":"#ffcc19"}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GFContinuousLoginUI.uiView);
        }
    }
}

module ui {
    export class GFDisclaimerDialogUI extends Dialog {
		public btn_confirm:Laya.Button;

        public static  uiView:any ={"type":"Dialog","props":{},"child":[{"type":"Image","props":{"y":0,"x":3,"skin":"comp/bg_wenzitishi.png"}},{"type":"Label","props":{"y":78,"x":63,"text":"尊敬的玩家：","fontSize":30,"color":"#ffffff"}},{"type":"Label","props":{"y":124,"x":63,"wordWrap":true,"width":503,"text":"本产品为休闲娱乐游戏，禁止一切违法的游戏行为（利用本产品进行赌博，金币交易等），一经发现立即进行账号封停处理，永不解封。","height":119,"fontSize":24,"color":"#ffffff"}},{"type":"Button","props":{"y":267,"x":230,"width":150,"var":"btn_confirm","stateNum":2,"skin":"comp/btn_150x58.png","labelSize":24,"labelPadding":"-2","labelColors":"#721e01,#721e01","labelBold":true,"label":"确定","height":58}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GFDisclaimerDialogUI.uiView);
        }
    }
}

module ui {
    export class GFFriendListViewUI extends Dialog {
		public btn_send:Laya.Button;
		public btn_tab1:Laya.Button;
		public btn_tab2:Laya.Button;
		public btn_tab3:Laya.Button;
		public hint_message:Laya.Label;
		public service_time_label:Laya.Label;
		public btn_close:Laya.Button;

        public static  uiView:any ={"type":"Dialog","props":{"y":0,"x":0,"width":824,"labelSize":22,"labelPadding":"-3,0,0,0","labelBold":true,"height":598},"child":[{"type":"Panel","props":{"y":0,"x":0,"width":829,"height":609},"child":[{"type":"Panel","props":{"y":0,"x":0,"width":829,"height":595},"child":[{"type":"Image","props":{"width":824,"skin":"comp/bg_haoyoutanchuang.png","height":592}}]},{"type":"Button","props":{"y":500,"x":616,"var":"btn_send","stateNum":3,"skin":"comp/btn_faxiaoxi.png"}},{"type":"Panel","props":{"y":46,"x":191,"width":454,"height":52},"child":[{"type":"Button","props":{"width":150,"var":"btn_tab1","toggle":true,"stateNum":2,"skin":"comp/btn_xiaoxitanchuang.png","selected":true,"mouseThrough":false,"labelSize":"22","labelPadding":"-3,0,0,0","labelColors":"#ffffff,#721e01,#721e01","labelBold":"true","label":"好友","height":58}},{"type":"Button","props":{"x":146,"width":150,"var":"btn_tab2","stateNum":2,"skin":"comp/btn_xiaoxitanchuang.png","mouseThrough":false,"labelSize":22,"labelPadding":"-3,0,0,0","labelColors":"#ffffff,#721e01,#721e01","labelBold":true,"label":"陌生人","height":58}},{"type":"Button","props":{"x":291,"width":150,"var":"btn_tab3","stateNum":2,"skin":"comp/btn_xiaoxitanchuang.png","mouseThrough":false,"labelSize":"22","labelPadding":"-3,0,0,0","labelColors":"#ffffff,#721e01,#721e01","labelBold":true,"label":"黑名单","height":58}}]},{"type":"Label","props":{"y":308,"x":238,"width":569,"visible":false,"var":"hint_message","text":"暂无好友","height":35,"fontSize":28,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":139,"x":451,"width":348,"visible":false,"var":"service_time_label","text":"客服时间：工作日9:00-18:00","height":31,"fontSize":26,"color":"#ffffff","align":"right"}}]},{"type":"Button","props":{"y":26,"x":730,"var":"btn_close","stateNum":2,"skin":"comp/btn_dialog_close.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GFFriendListViewUI.uiView);
        }
    }
}

module ui {
    export class GFFriendViewUI extends View {
		public btn:Laya.Button;
		public userImage:Laya.Image;
		public image_vip:Laya.Image;
		public label_service:Laya.Label;
		public user_panel:Laya.Panel;
		public userName:Laya.Label;
		public userPoint:Laya.Label;
		public image_sex:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":218,"height":88},"child":[{"type":"Button","props":{"y":2,"x":0,"width":218,"var":"btn","stateNum":2,"skin":"comp/btn_huodongxiang.png","height":86}},{"type":"Image","props":{"y":14,"x":20,"width":60,"var":"userImage","skin":"comp/image_youxitouxiang.png","height":60}},{"type":"Image","props":{"y":10,"x":19,"width":60,"var":"image_vip","skin":"comp/image_vip1.png","height":22}},{"type":"Label","props":{"y":32,"x":88,"width":125,"visible":false,"var":"label_service","text":"官方客服","height":26,"fontSize":22,"color":"#ffffff"}},{"type":"Panel","props":{"y":16,"x":89,"width":135,"var":"user_panel","height":72},"child":[{"type":"Label","props":{"y":3,"x":26,"width":107,"var":"userName","text":"且听风雨","skin":"template/文本框/label.png","height":24,"fontSize":18,"color":"#ffffff","bold":false}},{"type":"Image","props":{"y":37,"x":2,"width":20,"skin":"comp/youxi_jinbi.png","height":20}},{"type":"Label","props":{"y":37,"x":27,"width":107,"var":"userPoint","text":"189898","skin":"template/文本框/label.png","height":20,"fontSize":20,"color":"#d9ca21","bold":true}},{"type":"Image","props":{"width":24,"var":"image_sex","skin":"comp/image_nan.png","height":24}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GFFriendViewUI.uiView);
        }
    }
}

module ui {
    export class GFGameArenaSetViewUI extends Dialog {
		public btn_close:Laya.Button;
		public slider:Laya.HSlider;
		public btn_select:Laya.Button;
		public label_money:Laya.Label;
		public btn_sure:Laya.Button;
		public btn_friend:Laya.Button;

        public static  uiView:any ={"type":"Dialog","props":{},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"comp/bg_leitaitanchuan.png"}},{"type":"Button","props":{"y":-9,"x":546,"var":"btn_close","stateNum":2,"skin":"comp/btn_dialog_close.png"}},{"type":"HSlider","props":{"y":129,"x":74,"width":470,"var":"slider","skin":"comp/bg_shezhitiao.png","height":14}},{"type":"Button","props":{"y":189,"x":70,"var":"btn_select","stateNum":2,"skin":"comp/btn_xuanxingbie.png"}},{"type":"Label","props":{"y":194,"x":300,"text":"每人底注：","fontSize":24,"color":"#ffffff"}},{"type":"Label","props":{"y":193,"x":110,"text":"允许观战","fontSize":24,"color":"#ffffff"}},{"type":"Label","props":{"y":194,"var":"label_money","text":"100000","right":70,"fontSize":24,"color":"#ffffff"}},{"type":"Button","props":{"x":230,"var":"btn_sure","stateNum":2,"skin":"comp/btn_150x58.png","labelSize":24,"labelPadding":"0,0,5,0","labelColors":"#721e01,#721e01,#721e01,#721e01,","labelBold":true,"label":"确定","bottom":46}},{"type":"Button","props":{"y":241,"x":70,"var":"btn_friend","stateNum":2,"skin":"comp/btn_xuanxingbie.png"}},{"type":"Label","props":{"y":245,"x":110,"text":"仅选中好友可以加入","fontSize":24,"color":"#ffffff"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GFGameArenaSetViewUI.uiView);
        }
    }
}

module ui {
    export class GFGameHelpUI extends Dialog {
		public btn_close:Laya.Button;
		public btn_help:Laya.Button;
		public btn_vip:Laya.Button;
		public btn_gold:Laya.Button;
		public btn_service:Laya.Button;
		public panel_1:Laya.Panel;
		public panel_2:Laya.Panel;
		public panel_3:Laya.Panel;
		public panel_4:Laya.Panel;
		public btn_fuwu:Laya.Button;
		public btn_yinsi:Laya.Button;
		public btn_zhuce:Laya.Button;

        public static  uiView:any ={"type":"Dialog","props":{"width":824,"overflow":"scroll","height":598,"fontSize":22},"child":[{"type":"Image","props":{"y":-2,"x":1,"skin":"comp/bg_bangzhutanchuang.png"}},{"type":"Button","props":{"y":33,"x":728,"var":"btn_close","stateNum":2,"skin":"comp/btn_dialog_close.png"}},{"type":"Button","props":{"y":46,"x":142,"width":145,"var":"btn_help","stateNum":2,"skin":"comp/btn_xiaoxitanchuang.png","selected":true,"labelSize":22,"labelColors":"#ffffff,#721e01","labelBold":true,"label":"游戏帮助","height":58}},{"type":"Button","props":{"y":46,"x":283,"width":139,"var":"btn_vip","stateNum":2,"skin":"comp/btn_xiaoxitanchuang.png","labelSize":22,"labelColors":"#ffffff,#721e01","labelBold":true,"label":"VIP介绍","height":58}},{"type":"Button","props":{"y":45,"x":424,"width":128,"var":"btn_gold","stateNum":2,"skin":"comp/btn_xiaoxitanchuang.png","labelSize":22,"labelColors":"#ffffff,#721e01","labelBold":true,"label":"获得金币","height":58}},{"type":"Button","props":{"y":45,"x":552,"width":128,"var":"btn_service","stateNum":2,"skin":"comp/btn_xiaoxitanchuang.png","labelSize":22,"labelColors":"#ffffff,#721e01","labelBold":true,"label":"用户协议","height":58}},{"type":"Panel","props":{"y":135,"x":34,"width":752,"var":"panel_1","mouseEnabled":true,"height":382}},{"type":"Panel","props":{"y":135,"x":34,"width":752,"var":"panel_2","mouseEnabled":true,"height":382}},{"type":"Panel","props":{"y":135,"x":34,"width":752,"var":"panel_3","mouseEnabled":true,"height":382}},{"type":"Panel","props":{"y":135,"x":34,"width":752,"var":"panel_4","mouseEnabled":true,"height":382},"child":[{"type":"Button","props":{"y":87,"x":503,"var":"btn_fuwu","stateNum":1,"skin":"comp/btn_fuwuxieyi.png"}},{"type":"Button","props":{"y":87,"x":260,"var":"btn_yinsi","stateNum":1,"skin":"comp/btn_yinsizhengce.png"}},{"type":"Button","props":{"y":87,"x":16,"var":"btn_zhuce","stateNum":1,"skin":"comp/btn_zhucexieyi.png"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GFGameHelpUI.uiView);
        }
    }
}

module ui {
    export class GFGameHomeUI extends View {
		public backImage:Laya.Image;
		public btn_quick_start:Laya.Button;
		public btn_gold_coin:Laya.Button;
		public btn_acts:Laya.Button;
		public btn_friends:Laya.Button;
		public btn_rank:Laya.Button;
		public btn_more:Laya.Button;
		public btn_recharge:Laya.Button;
		public img_head:Laya.Image;
		public label_name:Laya.Label;
		public label_coins:Laya.Label;
		public img_senior_room:Laya.Image;
		public img_super_room:Laya.Image;
		public img_superme_room:Laya.Image;
		public img_arena_room:Laya.Image;
		public img_vip:Laya.Image;
		public image_present_information:Laya.Image;
		public image_add_to_screen:Laya.Image;
		public btn_add_group:Laya.Button;
		public btn_login:Laya.Button;
		public btn_belle:Laya.Button;

        public static  uiView:any ={"type":"View","props":{},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"backImage","skin":"comp/bg_shouye.jpg"}},{"type":"Button","props":{"y":415,"x":455,"var":"btn_quick_start","stateNum":1,"skin":"comp/btn_kaishi.png"}},{"type":"Button","props":{"y":465,"x":203,"var":"btn_gold_coin","stateNum":1,"skin":"comp/btn_jinbi.png"}},{"type":"Button","props":{"y":508,"x":374,"var":"btn_acts","stateNum":1,"skin":"comp/btn_huodong.png","pivotY":43,"pivotX":29}},{"type":"Button","props":{"y":469,"x":732,"var":"btn_friends","stateNum":1,"skin":"comp/btn_haoyou.png"}},{"type":"Button","props":{"y":469,"x":932,"var":"btn_rank","stateNum":1,"skin":"comp/btn_paiming.png"}},{"type":"Button","props":{"y":469,"x":1032,"var":"btn_more","stateNum":1,"skin":"comp/btn_gengduo.png"}},{"type":"Button","props":{"y":465,"x":39,"var":"btn_recharge","stateNum":1,"skin":"comp/btn_chongzhi.png"}},{"type":"Image","props":{"y":65,"x":67,"width":60,"var":"img_head","skin":"comp/image_youxitouxiang.png","height":60}},{"type":"Label","props":{"y":66,"x":184,"var":"label_name","fontSize":22,"color":"#ffffff","bold":true}},{"type":"Image","props":{"y":98,"x":148,"skin":"comp/youxi_jinbi.png"}},{"type":"Label","props":{"y":100,"x":184,"var":"label_coins","text":"1","fontSize":22,"color":"#ffcc19","bold":true}},{"type":"Image","props":{"y":166,"x":109,"width":186,"var":"img_senior_room","height":246}},{"type":"Image","props":{"y":166,"x":353,"width":186,"var":"img_super_room","height":246}},{"type":"Image","props":{"y":166,"x":597,"width":186,"var":"img_superme_room","height":246}},{"type":"Image","props":{"y":166,"x":841,"width":186,"var":"img_arena_room","height":246}},{"type":"Image","props":{"y":54,"x":140,"width":38,"var":"img_vip","skin":"comp/image_vip_zhihui.png","height":38}},{"type":"Image","props":{"y":20,"x":970,"var":"image_present_information","skin":"comp/image_zengjinbi.png"}},{"type":"Image","props":{"y":54,"x":1036,"var":"image_add_to_screen","skin":"comp/image_jiadaopinmu.png"}},{"type":"Button","props":{"y":190,"x":3,"var":"btn_add_group","stateNum":2,"skin":"comp/btn_jiaqun.png"}},{"type":"Button","props":{"y":233,"x":1067,"var":"btn_login","stateNum":2,"skin":"comp/btn_denglu.png"}},{"type":"Button","props":{"y":469,"x":832,"var":"btn_belle","stateNum":1,"skin":"comp/btn_meinv.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GFGameHomeUI.uiView);
        }
    }
}

module ui {
    export class GFGameHomeItemUI extends View {
		public image_bg:Laya.Image;
		public label_point:Laya.Label;
		public label_bet:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"width":306,"height":136},"child":[{"type":"Image","props":{"y":0,"x":0,"width":306,"var":"image_bg","height":136,"alpha":1}},{"type":"Label","props":{"y":85,"x":6,"width":151,"var":"label_point","height":29,"fontSize":14,"color":"#fff193","bold":true,"align":"center"}},{"type":"Label","props":{"y":85,"x":135,"width":160,"var":"label_bet","height":28,"fontSize":15,"color":"#ffffff","bold":true,"align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GFGameHomeItemUI.uiView);
        }
    }
}

module ui {
    export class GFGameIndexUI extends View {
		public backImage:Laya.Image;
		public YKLogin:Laya.Button;
		public MobileLogin:Laya.Button;
		public QQLogin:Laya.Button;

        public static  uiView:any ={"type":"View","props":{},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"backImage"}},{"type":"Button","props":{"y":459,"x":628,"var":"YKLogin","stateNum":2,"skin":"comp/btn_youkedenglu1.png"}},{"type":"Button","props":{"y":269,"x":628,"var":"MobileLogin","stateNum":2,"skin":"comp/btn_shoujidenglu1.png"}},{"type":"Button","props":{"y":364,"x":628,"var":"QQLogin","stateNum":2,"skin":"comp/btn_qqdenglu1.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GFGameIndexUI.uiView);
        }
    }
}

module ui {
    export class GFGameInfoTitleCellUI extends View {
		public btn_title:Laya.Button;
		public InfoTitle:Laya.Label;

        public static  uiView:any ={"type":"View","props":{},"child":[{"type":"Button","props":{"y":0,"x":0,"var":"btn_title","stateNum":2,"skin":"comp/btn_huodongxiang.png"}},{"type":"Label","props":{"y":31,"x":0,"width":218,"var":"InfoTitle","overflow":"hidden","fontSize":24,"color":"#ffffff","align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GFGameInfoTitleCellUI.uiView);
        }
    }
}

module ui {
    export class GFGameInfoViewUI extends Dialog {
		public closeRankBtn:Laya.Button;
		public titleInfo:Laya.Label;
		public detailInfo:Laya.Label;
		public noInfo:Laya.Label;

        public static  uiView:any ={"type":"Dialog","props":{},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"comp/bg_gonggao.png"}},{"type":"Button","props":{"y":35,"x":716,"var":"closeRankBtn","stateNum":2,"skin":"comp/btn_dialog_close.png"}},{"type":"Label","props":{"y":143,"x":281,"width":483,"var":"titleInfo","overflow":"hidden","height":28,"fontSize":28,"color":"#ffcc19","bold":true,"align":"center"}},{"type":"Label","props":{"y":200,"x":280,"wordWrap":true,"width":480,"var":"detailInfo","height":350,"fontSize":24,"color":"#ffffff"}},{"type":"Label","props":{"y":309,"x":439,"var":"noInfo","text":"暂无公告","fontSize":36,"color":"#ffffff"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GFGameInfoViewUI.uiView);
        }
    }
}

module ui {
    export class GFGameMobileLoginViewUI extends Dialog {
		public bgView:Laya.Image;
		public btn_close:Laya.Button;
		public btn_yanzheng:Laya.Button;
		public btn_sureLogin:Laya.Button;
		public text_mobile:Laya.TextInput;
		public text_yanzheng:Laya.TextInput;

        public static  uiView:any ={"type":"Dialog","props":{},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"bgView","skin":"comp/bg_zhezhao.png"}},{"type":"Panel","props":{"y":66,"x":204.5,"width":727,"height":508},"child":[{"type":"Image","props":{"y":-0.1484375,"x":-0.8671875,"skin":"comp/bg_shoujidneglu.png"}},{"type":"Button","props":{"y":50.8515625,"x":605.1328125,"var":"btn_close","stateNum":2,"skin":"comp/btn_dialog_close.png"}},{"type":"Label","props":{"y":183.8515625,"x":54.1328125,"text":"请输入手机号","fontSize":26,"color":"#ffffff"}},{"type":"Label","props":{"y":275.8515625,"x":54.1328125,"text":"请输入验证码","fontSize":26,"color":"#ffffff"}},{"type":"Button","props":{"y":166.8515625,"x":499.1328125,"var":"btn_yanzheng","stateNum":3,"skin":"comp/btn_yanzhengma.png","labelSize":22,"labelPadding":"0,0,5,0","labelColors":"#ffffff,#ffffff,#ffffff","labelBold":true}},{"type":"Button","props":{"y":381.8515625,"x":296.1328125,"var":"btn_sureLogin","stateNum":2,"skin":"comp/btn_150x58.png","labelSize":26,"labelPadding":"0,0,4,0","labelColors":"#721e01","label":"登录"}},{"type":"TextInput","props":{"y":167.8515625,"x":232.1328125,"width":250,"var":"text_mobile","skin":"comp/textinput.png","height":60,"fontSize":32,"color":"#ffffff","bgColor":"#000000"}},{"type":"TextInput","props":{"y":255.8515625,"x":232.1328125,"width":250,"var":"text_yanzheng","skin":"comp/textinput.png","height":60,"fontSize":32,"color":"#ffffff","bgColor":"#000000"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GFGameMobileLoginViewUI.uiView);
        }
    }
}

module ui {
    export class GFGameMoreViewUI extends View {
		public btn_kefu:Laya.Button;
		public btn_bangzhu:Laya.Button;
		public btn_shezhi:Laya.Button;
		public btn_gonggao:Laya.Button;

        public static  uiView:any ={"type":"View","props":{},"child":[{"type":"Image","props":{"y":3,"x":0,"skin":"comp/bg_gengduozhankai.png"}},{"type":"Button","props":{"y":33,"x":45,"var":"btn_kefu","stateNum":2,"skin":"comp/btn_kefu.png"}},{"type":"Button","props":{"y":33,"x":147,"var":"btn_bangzhu","stateNum":2,"skin":"comp/btn_bangzhu.png"}},{"type":"Button","props":{"y":33,"x":219,"var":"btn_shezhi","stateNum":2,"skin":"comp/btn_shezhi.png"}},{"type":"Button","props":{"y":33,"x":289,"var":"btn_gonggao","stateNum":2,"skin":"comp/btn_gonggao1.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GFGameMoreViewUI.uiView);
        }
    }
}

module ui {
    export class GFGameRankViewUI extends Dialog {
		public closeRankBtn:Laya.Button;
		public myRank:Laya.Label;
		public rankInfo:Laya.Label;
		public rankTab:Laya.Tab;

        public static  uiView:any ={"type":"Dialog","props":{},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"comp/bg_paihangtanchuang.png"}},{"type":"Button","props":{"y":49,"x":844,"var":"closeRankBtn","stateNum":2,"skin":"comp/btn_dialog_close.png"}},{"type":"Label","props":{"y":120,"x":292,"width":183,"var":"myRank","text":"暂未进入排行榜","height":29,"fontSize":26,"color":"#ffffff"}},{"type":"Label","props":{"y":123,"x":565,"var":"rankInfo","text":"单局赢得","fontSize":26,"color":"#ffffff"}},{"type":"Tab","props":{"y":47,"x":58,"width":707,"var":"rankTab","stateNum":2,"skin":"comp/tab_paihang.png","selectedIndex":0,"labels":"金币排行,昨日收入排行,单局排行,胜利排行,礼物排行","labelSize":20,"labelPadding":"0,0,4,0","labelColors":"#ffffff,#721e01","labelBold":true,"height":50}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GFGameRankViewUI.uiView);
        }
    }
}

module ui {
    export class GFGameRoomUI extends View {
		public BGImage:Laya.Image;
		public btnGiveUp:Laya.Button;
		public btnCompare:Laya.Button;
		public btnShow:Laya.Button;
		public btnAddChip:Laya.Button;
		public btnFollow:Laya.Button;
		public btnHelp:Laya.Button;
		public btnCoin:Laya.Button;
		public labelChips:Laya.Button;
		public btnEmoj:Laya.Button;
		public btnPrepare:Laya.Button;
		public btnBack:Laya.Button;
		public btnChange:Laya.Button;
		public btnAudienceNumber:Laya.Button;
		public btnChallengeAll:Laya.Button;
		public btnChallengeFriend:Laya.Button;
		public labelMessage:Laya.Label;
		public btnAutoFollow:Laya.Button;
		public btnMultiCard:Laya.Button;

        public static  uiView:any ={"type":"View","props":{},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"BGImage"}},{"type":"Button","props":{"y":503,"x":975,"width":134,"var":"btnGiveUp","stateNum":3,"skin":"comp/btn_youxi.png","labelSize":30,"labelPadding":"0,0,3,0","labelColors":"#FFFFFF,#FFFFFF,#FFFFFF","label":"放弃","height":66}},{"type":"Button","props":{"y":503,"x":827,"width":134,"var":"btnCompare","stateNum":3,"skin":"comp/btn_youxi.png","labelSize":30,"labelPadding":"0,0,3,0","labelColors":"#FFFFFF,#FFFFFF,#FFFFFF","label":"比牌","height":66}},{"type":"Button","props":{"y":503,"x":319,"width":134,"var":"btnShow","stateNum":3,"skin":"comp/btn_youxi.png","labelSize":30,"labelPadding":"0,0,3,0","labelColors":"#FFFFFF,#FFFFFF,#FFFFFF","label":"看牌","height":66}},{"type":"Button","props":{"y":503,"x":172,"width":134,"var":"btnAddChip","stateNum":3,"skin":"comp/btn_youxi.png","labelSize":30,"labelPadding":"0,0,3,0","labelColors":"#FFFFFF,#FFFFFF,#FFFFFF","label":"加注","height":66}},{"type":"Button","props":{"y":503,"x":27,"width":134,"var":"btnFollow","stateNum":3,"skin":"comp/btn_youxi.png","labelSize":30,"labelPadding":"0,0,3,0","labelColors":"#FFFFFF,#FFFFFF,#FFFFFF","label":"跟注","height":66}},{"type":"Button","props":{"y":31,"x":177,"width":74,"var":"btnHelp","top":31,"stateNum":2,"skin":"comp/btn_youxi_bangzhu.png","left":177,"height":74}},{"type":"Button","props":{"y":34,"x":954,"width":164,"var":"btnCoin","top":34,"stateNum":2,"skin":"comp/btn_youxi_jinbi.png","height":74}},{"type":"Button","props":{"y":14,"x":493,"width":150,"var":"labelChips","stateNum":1,"skin":"comp/bg_zongzhu.png","labelSize":22,"labelColors":"#FFFFFF","label":"总注:0","height":30}},{"type":"Button","props":{"y":34,"x":866,"width":74,"var":"btnEmoj","top":34,"stateNum":2,"skin":"comp/btn_youxi_xiaoxi.png","height":74}},{"type":"Button","props":{"y":219,"x":446,"var":"btnPrepare","stateNum":2,"skin":"comp/btn_zhunbeikaishi.png"}},{"type":"Button","props":{"y":34,"x":27,"width":144,"var":"btnBack","top":34,"stateNum":3,"skin":"comp/btn_youxi.png","left":27,"labelSize":30,"labelPadding":"0,0,4,0","labelColors":"#ffffff,#ffffff,#ffffff,#ffffff","labelBold":true,"label":"返回","height":66}},{"type":"Button","props":{"width":68,"var":"btnChange","stateNum":1,"skin":"comp/btn_huanzhuo.png","left":0,"labelSize":30,"labelPadding":"0,0,4,0","labelColors":"#721e01,#721e01,#721e01,#721e01","labelBold":true,"height":178,"centerY":0}},{"type":"Button","props":{"y":111,"x":494,"visible":false,"var":"btnAudienceNumber","stateNum":2,"skin":"comp/btn_guanzhanshu.png","labelStrokeColor":"#f8f0ef","labelSize":24,"labelPadding":"0,0,5,0","labelColors":"#FFFFFF,#FFFFFF,#FFFFFF","label":"观众:0"}},{"type":"Button","props":{"y":301,"x":375,"visible":false,"var":"btnChallengeAll","stateNum":2,"skin":"comp/btn_xuanzhan.png","labelSize":24,"labelPadding":"0,0,5,0","labelColors":"#FFFFFF,#FFFFFF,#FFFFFF","label":"全服宣战"}},{"type":"Button","props":{"y":302,"x":577,"visible":false,"var":"btnChallengeFriend","stateNum":2,"skin":"comp/btn_xuanzhan.png","labelSize":24,"labelPadding":"0,0,5,0","labelColors":"#FFFFFF,#FFFFFF,#FFFFFF","label":"挑战好友"}},{"type":"Label","props":{"y":185,"x":281,"width":574,"visible":false,"var":"labelMessage","text":"每人底注: 0","pivotY":1.6666666666666643,"pivotX":-1.4210854715202004e-14,"height":35,"fontSize":24,"color":"#ffffff","bold":false,"align":"center"}},{"type":"Button","props":{"y":114,"x":1068,"width":68,"var":"btnAutoFollow","stateNum":1,"skin":"comp/btn_zidonggenzhu.png","right":0,"label":"   ","height":198}},{"type":"Button","props":{"y":332,"x":1068,"var":"btnMultiCard","stateNum":1,"skin":"comp/btn_fanbeika.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GFGameRoomUI.uiView);
        }
    }
}

module ui {
    export class GFGameSetCancelAccountViewUI extends Dialog {
		public btn_close:Laya.Button;
		public btn_cancel:Laya.Button;
		public btn_seleteRemind:Laya.Button;
		public btn_addScreen:Laya.Button;
		public label_addScreen:Laya.Label;

        public static  uiView:any ={"type":"Dialog","props":{},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"comp/bg_wenzitishi.png"}},{"type":"Button","props":{"y":-9,"x":546,"var":"btn_close","stateNum":2,"skin":"comp/btn_dialog_close.png"}},{"type":"Button","props":{"y":276,"x":356,"width":150,"var":"btn_cancel","stateNum":2,"skin":"comp/btn_fanhui_quxiao.png","labelSize":24,"labelPadding":"0,0,5,0","labelColors":"#ffffff","label":"确定","height":58}},{"type":"Button","props":{"y":202,"x":100,"var":"btn_seleteRemind","stateNum":2,"skin":"comp/btn_xuanxingbie.png"}},{"type":"Button","props":{"y":276,"x":104,"var":"btn_addScreen","stateNum":2,"skin":"comp/btn_tianjia.png","labelSize":24,"labelPadding":"0,0,5,0","labelColors":"#721e01","labelBold":true,"label":"添加到主屏幕"}},{"type":"Label","props":{"y":203,"x":149,"text":"以后不再提醒","fontSize":24,"color":"#ffffff"}},{"type":"Label","props":{"y":92,"x":99,"width":414,"var":"label_addScreen","height":87,"fontSize":24,"color":"#ffffff"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GFGameSetCancelAccountViewUI.uiView);
        }
    }
}

module ui {
    export class GFGameSetViewUI extends Dialog {
		public exitBtn:Laya.Button;
		public hSlider1:Laya.HSlider;
		public hSlider2:Laya.HSlider;
		public setCloseBtn:Laya.Button;

        public static  uiView:any ={"type":"Dialog","props":{"skin":"comp/bg_shezhitiao.png","labelSize":24},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"comp/bg_shezhi.png"}},{"type":"Label","props":{"y":202,"x":93,"text":"游戏音效","fontSize":30,"color":"#ffffff"}},{"type":"Label","props":{"y":272,"x":93,"text":"背景音乐","fontSize":30,"color":"#ffffff"}},{"type":"Button","props":{"y":441,"x":455,"var":"exitBtn","stateNum":1,"skin":"comp/btn_zhuxiao.png","labelSize":"24","labelPadding":"0,0,5,0","labelColors":"#721e01","labelBold":true,"label":"注销登录"}},{"type":"HSlider","props":{"y":212,"x":263,"width":350,"var":"hSlider1","skin":"comp/bg_shezhitiao.png","height":14}},{"type":"HSlider","props":{"y":284,"x":263,"width":350,"var":"hSlider2","skin":"comp/bg_shezhitiao.png","height":14}},{"type":"Button","props":{"y":-4,"x":669,"var":"setCloseBtn","stateNum":2,"skin":"comp/btn_dialog_close.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GFGameSetViewUI.uiView);
        }
    }
}

module ui {
    export class GFGameTipUI extends Dialog {
		public btn_close:Laya.Button;
		public btn_tip1:Laya.Button;
		public btn_tip2:Laya.Button;
		public btn_tip3:Laya.Button;
		public btn_tip4:Laya.Button;
		public label_tip:Laya.Label;
		public label_1:Laya.Label;
		public label_2:Laya.Label;
		public label_3:Laya.Label;
		public label_4:Laya.Label;

        public static  uiView:any ={"type":"Dialog","props":{"width":824,"height":598},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"comp/bg_guanzhan.png"}},{"type":"Button","props":{"y":26,"x":722,"var":"btn_close","stateNum":2,"skin":"comp/btn_dialog_close.png"}},{"type":"Button","props":{"y":150,"x":84,"var":"btn_tip1","stateNum":2,"skin":"comp/btn_xiaofei1.png"}},{"type":"Button","props":{"y":150,"x":255,"var":"btn_tip2","stateNum":2,"skin":"comp/btn_xiaofei2.png"}},{"type":"Button","props":{"y":150,"x":427,"var":"btn_tip3","stateNum":2,"skin":"comp/btn_xiaofei3.png"}},{"type":"Button","props":{"y":150,"x":598,"var":"btn_tip4","stateNum":2,"skin":"comp/btn_xiaofei4.png"}},{"type":"Label","props":{"y":404,"x":156,"width":512,"var":"label_tip","height":52,"fontSize":26,"color":"#93b9ff","bold":true,"align":"center"}},{"type":"Label","props":{"y":326,"x":114,"width":91,"var":"label_1","height":30,"fontSize":24,"color":"#ffcc19","align":"center"}},{"type":"Label","props":{"y":326,"x":285,"width":91,"var":"label_2","height":30,"fontSize":24,"color":"#ffcc19","align":"center"}},{"type":"Label","props":{"y":326,"x":455,"width":91,"var":"label_3","height":30,"fontSize":24,"color":"#ffcc19","align":"center"}},{"type":"Label","props":{"y":326,"x":626,"width":91,"var":"label_4","height":30,"fontSize":24,"color":"#ffcc19","align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GFGameTipUI.uiView);
        }
    }
}

module ui {
    export class GFGameUserInformationUI extends Dialog {
		public img_head:Laya.Image;
		public btn_close:Laya.Button;
		public img_sex:Laya.Image;
		public label_ID:Laya.Label;
		public label_diamonds:Laya.Label;
		public label_coins:Laya.Label;
		public label_win_lose:Laya.Label;
		public input_name:Laya.TextInput;
		public input_sign:Laya.TextInput;
		public img_level:Laya.Image;
		public label_progress:Laya.Label;
		public btn_vip:Laya.Button;
		public label_vip:Laya.Label;
		public btn_nan:Laya.Button;
		public btn_nv:Laya.Button;
		public img_gift1:Laya.Image;
		public img_gift2:Laya.Image;
		public img_gift3:Laya.Image;
		public img_gift4:Laya.Image;
		public img_gift5:Laya.Image;
		public labl_name_tip:Laya.Label;
		public label_IP:Laya.Label;
		public img_meinv:Laya.Image;

        public static  uiView:any ={"type":"Dialog","props":{"width":884,"popupCenter":true,"height":598,"color":"#ffffff"},"child":[{"type":"Image","props":{"y":0,"x":0,"width":824,"skin":"comp/bg_yonghu.png","height":598}},{"type":"Image","props":{"y":55,"x":63,"width":220,"var":"img_head","skin":"comp/image_youxitouxiang.png","height":220}},{"type":"Button","props":{"y":34,"x":819,"width":66,"var":"btn_close","stateNum":2,"skin":"comp/btn_dialog_close.png","height":66}},{"type":"Label","props":{"y":112,"x":355,"width":38,"text":"ID：","height":25,"fontSize":20,"color":"#ffffff"}},{"type":"Label","props":{"y":195,"x":354,"text":"性别：","fontSize":20,"color":"#ffffff"}},{"type":"Label","props":{"y":232,"x":354,"text":"钻石：","fontSize":20,"color":"#ffffff"}},{"type":"Label","props":{"y":271,"x":354,"text":"战绩：","fontSize":20,"color":"#ffffff"}},{"type":"Image","props":{"y":56,"x":366,"var":"img_sex","skin":"comp/image_nan.png"}},{"type":"Label","props":{"y":112,"x":402,"width":0,"var":"label_ID","height":0,"fontSize":20,"color":"#ffffff"}},{"type":"Label","props":{"y":195,"x":414,"text":"男","fontSize":20,"color":"#ffffff"}},{"type":"Label","props":{"y":195,"x":499,"text":"女","fontSize":20,"color":"#ffffff"}},{"type":"Label","props":{"y":232,"x":410,"width":35,"var":"label_diamonds","text":"0","height":20,"fontSize":20,"color":"#ffffff"}},{"type":"Label","props":{"y":232,"x":497,"width":50,"text":"金币：","height":20,"fontSize":20,"color":"#ffffff"}},{"type":"Label","props":{"y":232,"x":554,"width":175,"var":"label_coins","text":"0","height":26,"fontSize":20,"color":"#ffffff"}},{"type":"Label","props":{"y":272,"x":411,"width":202,"var":"label_win_lose","text":"0","height":20,"fontSize":20,"color":"#ffffff"}},{"type":"Label","props":{"y":470,"x":71,"text":"收到的礼物：","fontSize":22,"color":"#ffffff"}},{"type":"Image","props":{"y":235,"x":62,"width":222,"skin":"comp/image_gaitouxiang.png","height":40}},{"type":"TextInput","props":{"y":58,"x":414,"width":301,"var":"input_name","maxChars":10,"height":32,"fontSize":18,"color":"#ffffff"}},{"type":"TextInput","props":{"y":309,"x":353,"wordWrap":true,"width":385,"var":"input_sign","multiline":true,"maxChars":60,"leading":5,"height":106,"fontSize":20,"color":"#ffffff"}},{"type":"Image","props":{"y":298,"x":53,"var":"img_level","skin":"comp/image_vip1.png"}},{"type":"Label","props":{"y":308,"x":184,"width":92,"var":"label_progress","text":"0/10","height":26,"fontSize":20,"color":"#ffffff","align":"center"}},{"type":"Button","props":{"y":351,"x":63,"var":"btn_vip","stateNum":2,"skin":"comp/btn_xuanxingbie.png"}},{"type":"Label","props":{"y":356,"x":115,"width":169,"var":"label_vip","text":"隐藏vip等级","height":26,"fontSize":20,"color":"#ffffff"}},{"type":"Button","props":{"y":194,"x":443,"width":32,"var":"btn_nan","stateNum":2,"skin":"comp/btn_xuanxingbie.png","height":27}},{"type":"Button","props":{"y":195,"x":528,"width":34,"var":"btn_nv","stateNum":2,"skin":"comp/btn_xuanxingbie.png","height":27}},{"type":"Image","props":{"y":456,"x":240,"width":90,"var":"img_gift1","height":90}},{"type":"Image","props":{"y":456,"x":347,"width":90,"var":"img_gift2","height":90}},{"type":"Image","props":{"y":456,"x":455,"width":90,"var":"img_gift3","height":90}},{"type":"Image","props":{"y":456,"x":562,"width":90,"var":"img_gift4","height":90}},{"type":"Image","props":{"y":456,"x":669,"width":90,"var":"img_gift5","height":90}},{"type":"Label","props":{"y":25,"x":353,"width":384,"var":"labl_name_tip","height":25,"fontSize":17,"color":"#ffcc19","align":"left"}},{"type":"Label","props":{"y":150,"x":356,"width":70,"text":"IP地址：","height":25,"fontSize":20,"color":"#ffffff"}},{"type":"Label","props":{"y":150,"x":440,"width":0,"var":"label_IP","height":0,"fontSize":20,"color":"#ffffff"}},{"type":"Image","props":{"y":52,"x":220,"visible":false,"var":"img_meinv","skin":"comp/image_meinv.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GFGameUserInformationUI.uiView);
        }
    }
}

module ui {
    export class GFGiftViewDialogUI extends Dialog {
		public btn1:Laya.Button;
		public btn2:Laya.Button;
		public btn3:Laya.Button;
		public btn4:Laya.Button;
		public btn5:Laya.Button;
		public image_point:Laya.Image;
		public image_gift:Laya.Image;
		public label1:Laya.Label;
		public label2:Laya.Label;
		public label3:Laya.Label;
		public label4:Laya.Label;
		public label5:Laya.Label;
		public btn_close:Laya.Button;

        public static  uiView:any ={"type":"Dialog","props":{"width":824,"visible":true,"height":598},"child":[{"type":"Panel","props":{"y":0,"x":0,"width":840,"height":621},"child":[{"type":"Panel","props":{"y":0,"x":0,"width":839,"visible":true,"height":612},"child":[{"type":"Image","props":{"y":99,"x":4,"width":824,"skin":"comp/bg_liwu.png","pivotY":99,"pivotX":4,"height":598}},{"type":"Button","props":{"y":158,"x":36,"width":140,"var":"btn1","stateNum":2,"skin":"comp/btn_liwu1.png","height":210}},{"type":"Button","props":{"y":158,"x":190,"width":140,"var":"btn2","stateNum":2,"skin":"comp/btn_liwu2.png","height":210}},{"type":"Button","props":{"y":158,"x":345,"width":140,"var":"btn3","stateNum":2,"skin":"comp/btn_liwu3.png","height":210}},{"type":"Button","props":{"y":158,"x":499,"width":140,"var":"btn4","stateNum":2,"skin":"comp/btn_liwu4.png","height":210}},{"type":"Button","props":{"y":158,"x":653,"width":140,"var":"btn5","stateNum":2,"skin":"comp/btn_liwu5.png","height":210}},{"type":"Image","props":{"y":409,"x":134.5,"var":"image_point","skin":"comp/image_liwu_chang.png"}},{"type":"Image","props":{"y":409,"x":324.5,"visible":false,"var":"image_gift","skin":"comp/image_liwu_duan.png"}}]},{"type":"Panel","props":{"y":332,"x":95,"width":707,"height":40},"child":[{"type":"Label","props":{"y":0,"x":0,"width":79,"var":"label1","text":"123","height":30,"fontSize":26,"color":"#fff193"}},{"type":"Label","props":{"y":0,"x":154,"width":82,"var":"label2","text":"123","height":30,"fontSize":26,"color":"#fff193"}},{"type":"Label","props":{"y":0,"x":303,"width":82,"var":"label3","text":"123","height":30,"fontSize":26,"color":"#fff193"}},{"type":"Label","props":{"y":0,"x":457,"width":79,"var":"label4","text":"123","height":30,"fontSize":26,"color":"#fff193"}},{"type":"Label","props":{"y":0,"x":611,"width":83,"var":"label5","text":"123","height":30,"fontSize":26,"color":"#fff193"}}]}]},{"type":"Button","props":{"y":37,"x":703,"var":"btn_close","stateNum":2,"skin":"comp/btn_dialog_close.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GFGiftViewDialogUI.uiView);
        }
    }
}

module ui {
    export class GFGivePointDialogUI extends Dialog {
		public btn_key_0:Laya.Button;
		public btn_key_1:Laya.Button;
		public btn_key_2:Laya.Button;
		public btn_key_3:Laya.Button;
		public btn_key_4:Laya.Button;
		public btn_key_5:Laya.Button;
		public btn_key_6:Laya.Button;
		public btn_key_7:Laya.Button;
		public btn_key_8:Laya.Button;
		public btn_key_9:Laya.Button;
		public btn_delete_code:Laya.Button;
		public label_input:Laya.Label;
		public btn_ok:Laya.Button;
		public btn_close:Laya.Button;

        public static  uiView:any ={"type":"Dialog","props":{"width":760,"height":598},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"comp/bg_zengjinbi.png"}},{"type":"Panel","props":{"y":318,"x":169,"width":392,"height":137},"child":[{"type":"Button","props":{"width":68,"var":"btn_key_0","stateNum":2,"skin":"comp/btn_anjian_0.png","height":68}},{"type":"Button","props":{"x":82,"width":68,"var":"btn_key_1","stateNum":2,"skin":"comp/btn_anjian_1.png","height":68}},{"type":"Button","props":{"x":164,"width":68,"var":"btn_key_2","stateNum":2,"skin":"comp/btn_anjian_2.png","height":68}},{"type":"Button","props":{"x":246,"width":68,"var":"btn_key_3","stateNum":2,"skin":"comp/btn_anjian_3.png","height":68}},{"type":"Button","props":{"x":328,"width":68,"var":"btn_key_4","stateNum":2,"skin":"comp/btn_anjian_4.png","height":68}},{"type":"Button","props":{"y":72,"width":68,"var":"btn_key_5","stateNum":2,"skin":"comp/btn_anjian_5.png","height":68}},{"type":"Button","props":{"y":72,"x":82,"width":68,"var":"btn_key_6","stateNum":2,"skin":"comp/btn_anjian_6.png","height":68}},{"type":"Button","props":{"y":72,"x":164,"width":68,"var":"btn_key_7","stateNum":2,"skin":"comp/btn_anjian_7.png","height":68}},{"type":"Button","props":{"y":72,"x":246,"width":68,"var":"btn_key_8","stateNum":2,"skin":"comp/btn_anjian_8.png","height":68}},{"type":"Button","props":{"y":72,"x":328,"width":68,"var":"btn_key_9","stateNum":2,"skin":"comp/btn_anjian_9.png","height":68}}]},{"type":"Button","props":{"y":170,"x":404,"var":"btn_delete_code","stateNum":2,"skin":"comp/btn_shanchu.png","height":54}},{"type":"Label","props":{"y":170,"x":255,"width":152,"var":"label_input","valign":"middle","overflow":"hidden","height":53,"fontSize":30,"borderColor":"#ffffff","bgColor":"#ffffff"}},{"type":"Label","props":{"y":181,"x":181,"width":54,"text":"赠送","height":37,"fontSize":28,"color":"#ffcc19"}},{"type":"Label","props":{"y":181,"x":483,"width":96,"text":"万金币","height":37,"fontSize":28,"color":"#ffcc19"}},{"type":"Label","props":{"y":236,"x":253,"width":218,"text":"(至少赠送200万金币)","height":32,"fontSize":22,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":277,"x":173,"width":384,"text":"请使用下方数字键盘填写赠送金币数","height":32,"fontSize":22,"color":"#93b9ff","align":"left"}},{"type":"Button","props":{"y":509,"x":307,"width":150,"var":"btn_ok","skin":"comp/btn_youxi_huanzhuo.png","labelSize":24,"labelPadding":"0","labelColors":"#721e01,#721e01,#721e01","label":"确定","height":58}},{"type":"Button","props":{"y":-19,"x":701,"var":"btn_close","stateNum":2,"skin":"comp/btn_dialog_close.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GFGivePointDialogUI.uiView);
        }
    }
}

module ui {
    export class GFIndentifyAwardUI extends Dialog {
		public img_indentify_code:Laya.Image;
		public btn_delete_code:Laya.Button;
		public btn_key_0:Laya.Button;
		public btn_key_1:Laya.Button;
		public btn_key_2:Laya.Button;
		public btn_key_3:Laya.Button;
		public btn_key_4:Laya.Button;
		public btn_key_5:Laya.Button;
		public btn_key_6:Laya.Button;
		public btn_key_7:Laya.Button;
		public btn_key_8:Laya.Button;
		public btn_key_9:Laya.Button;
		public label_input_num:Laya.Label;
		public btn_submit:Laya.Button;
		public label_input:Laya.Label;
		public label_coin_num:Laya.Label;
		public label_coin_end:Laya.Label;

        public static  uiView:any ={"type":"Dialog","props":{},"child":[{"type":"Image","props":{"y":4,"x":12,"width":714,"skin":"comp/bg_kantuyoujiang.png","name":"img_identify_code","height":616}},{"type":"Image","props":{"y":216,"x":161,"width":160,"var":"img_indentify_code","skin":"comp/blank.png","height":70}},{"type":"Button","props":{"y":231,"x":480,"var":"btn_delete_code","stateNum":2,"skin":"comp/btn_shanchu.png","height":54}},{"type":"Panel","props":{"y":308,"x":159,"width":392,"height":137},"child":[{"type":"Button","props":{"width":68,"var":"btn_key_0","stateNum":2,"skin":"comp/btn_anjian_0.png","height":68}},{"type":"Button","props":{"x":82,"width":68,"var":"btn_key_1","stateNum":2,"skin":"comp/btn_anjian_1.png","height":68}},{"type":"Button","props":{"x":164,"width":68,"var":"btn_key_2","stateNum":2,"skin":"comp/btn_anjian_2.png","height":68}},{"type":"Button","props":{"x":246,"width":68,"var":"btn_key_3","stateNum":2,"skin":"comp/btn_anjian_3.png","height":68}},{"type":"Button","props":{"x":328,"width":68,"var":"btn_key_4","stateNum":2,"skin":"comp/btn_anjian_4.png","height":68}},{"type":"Button","props":{"y":72,"width":68,"var":"btn_key_5","stateNum":2,"skin":"comp/btn_anjian_5.png","height":68}},{"type":"Button","props":{"y":72,"x":82,"width":68,"var":"btn_key_6","stateNum":2,"skin":"comp/btn_anjian_6.png","height":68}},{"type":"Button","props":{"y":72,"x":164,"width":68,"var":"btn_key_7","stateNum":2,"skin":"comp/btn_anjian_7.png","height":68}},{"type":"Button","props":{"y":72,"x":246,"width":68,"var":"btn_key_8","stateNum":2,"skin":"comp/btn_anjian_8.png","height":68}},{"type":"Button","props":{"y":72,"x":328,"width":68,"var":"btn_key_9","stateNum":2,"skin":"comp/btn_anjian_9.png","height":68}}]},{"type":"Label","props":{"y":451,"x":165.77001953125,"var":"label_input_num","fontSize":26,"color":"#93b9ff","align":"center"}},{"type":"Button","props":{"y":507,"x":277,"var":"btn_submit","stateNum":2,"skin":"comp/btn_tijiao.png"}},{"type":"Label","props":{"y":231.5,"x":331,"width":152,"var":"label_input","valign":"middle","height":53,"fontSize":30,"borderColor":"#ffffff","bgColor":"#ffffff"}},{"type":"Label","props":{"y":148,"x":176.5,"width":232,"text":"选对图中数字将奖励","height":26,"fontSize":26,"color":"#ffffff"}},{"type":"Label","props":{"y":148,"x":416.5,"var":"label_coin_num","text":"1000","fontSize":26,"color":"#fff193"}},{"type":"Label","props":{"y":148,"x":484,"var":"label_coin_end","text":"金币","fontSize":26,"color":"#ffffff"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GFIndentifyAwardUI.uiView);
        }
    }
}

module ui {
    export class GFIndianaHallViewUI extends View {
		public btn_back:Laya.Button;
		public btn_change:Laya.Button;
		public label_myrank:Laya.Label;

        public static  uiView:any ={"type":"View","props":{},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"comp/bg_duobaodating.png"}},{"type":"Button","props":{"y":66,"x":22,"var":"btn_back","stateNum":2,"skin":"comp/btn_jinhu_fanhui.png"}},{"type":"Button","props":{"y":66,"x":644,"var":"btn_change","stateNum":2,"skin":"comp/btn_huanduobaoji.png"}},{"type":"Image","props":{"y":70,"x":889,"skin":"comp/bg_duobaopaihang.png"}},{"type":"Label","props":{"y":113,"x":898,"width":205,"var":"label_myrank","height":24,"fontSize":22,"color":"#93b9ff","bold":true,"align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GFIndianaHallViewUI.uiView);
        }
    }
}

module ui {
    export class GFIndianaItemViewUI extends View {
		public label_index:Laya.Label;
		public label_other_point:Laya.Label;
		public label_tip:Laya.Label;
		public label_me_point:Laya.Label;
		public image_me:Laya.Image;
		public image_head:Laya.Image;
		public image_stroke:Laya.Image;
		public image_shadow:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":275,"height":200},"child":[{"type":"Image","props":{"y":30,"x":0,"skin":"comp/bg_jinhujichang.png"}},{"type":"Label","props":{"y":35,"x":7,"width":78,"var":"label_index","height":24,"fontSize":22,"color":"#ffffff","bold":true,"align":"center"}},{"type":"Label","props":{"y":46,"x":90,"width":156,"visible":false,"var":"label_other_point","height":22,"fontSize":20,"color":"#fff193","bold":true,"align":"right"}},{"type":"Label","props":{"y":160,"x":0,"width":264,"var":"label_tip","height":31,"fontSize":20,"color":"#d2b7f8","bold":true,"align":"center"}},{"type":"Label","props":{"y":46,"x":101,"width":111,"visible":false,"var":"label_me_point","height":22,"fontSize":20,"color":"#fff193","bold":true,"align":"right"}},{"type":"Image","props":{"y":35,"x":220,"visible":false,"var":"image_me","skin":"comp/image_jinhu_wo.png"}},{"type":"Image","props":{"y":73,"x":7,"width":250,"skin":"comp/bg_gundong.png","height":70}},{"type":"Image","props":{"y":73,"x":176,"width":72,"visible":false,"var":"image_head","height":72}},{"type":"Image","props":{"y":73,"x":176,"width":72,"visible":false,"var":"image_stroke","skin":"comp/image_jinhu_touxiangbian.png","height":72}},{"type":"Image","props":{"y":30,"x":0,"visible":false,"var":"image_shadow","skin":"comp/bg_duobaozhongjiang.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GFIndianaItemViewUI.uiView);
        }
    }
}

module ui {
    export class GFMediaMsgViewUI extends Dialog {
		public bgBlur:Laya.Image;
		public bgImage:Laya.Image;
		public dismissBtn:Laya.Button;
		public faceBtn:Laya.Button;
		public voiceBtn:Laya.Button;

        public static  uiView:any ={"type":"Dialog","props":{},"child":[{"type":"Image","props":{"y":0,"x":0,"width":1136,"var":"bgBlur","skin":"comp/bg_zhezhao.png","height":640}},{"type":"Panel","props":{"y":47,"x":200,"width":736,"height":550,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"width":736,"var":"bgImage","skin":"comp/bg_xiaoxitanchuang.png","height":550,"centerY":0,"centerX":0}},{"type":"Button","props":{"width":73,"var":"dismissBtn","top":50,"stateNum":2,"skin":"comp/btn_dialog_close.png","right":50,"height":73}},{"type":"Button","props":{"y":57,"x":210,"width":150,"var":"faceBtn","stateNum":2,"skin":"comp/btn_xiaoxitanchuang.png","selected":true,"labelSize":21,"labelPadding":"16,50,20,50","labelColors":"#ffffff,#721e01,#721e01","labelBold":true,"label":"表情","height":58}},{"type":"Button","props":{"y":57,"x":374,"width":150,"var":"voiceBtn","stateNum":2,"skin":"comp/btn_xiaoxitanchuang.png","labelSize":21,"labelPadding":"16,50,20,50","labelColors":"#ffffff,#721e01,#721e01","labelBold":true,"label":"语音","height":58}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GFMediaMsgViewUI.uiView);
        }
    }
}

module ui {
    export class GFModifyHeaderImgUI extends Dialog {
		public btn_close:Laya.Button;
		public img_head1:Laya.Image;
		public img_head2:Laya.Image;
		public img_head3:Laya.Image;
		public img_head4:Laya.Image;
		public img_head5:Laya.Image;
		public img_head6:Laya.Image;
		public img_head7:Laya.Image;
		public img_head8:Laya.Image;
		public img_head9:Laya.Image;
		public img_head10:Laya.Image;
		public label_tip:Laya.Label;
		public btn_photo:Laya.Button;

        public static  uiView:any ={"type":"Dialog","props":{"width":824,"height":598},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"comp/bg_xiugaitouxiang.png"}},{"type":"Button","props":{"y":31,"x":734,"width":66,"var":"btn_close","stateNum":2,"skin":"comp/btn_dialog_close.png","height":66}},{"type":"Image","props":{"y":151,"x":52,"width":120,"var":"img_head1","height":120}},{"type":"Image","props":{"y":151,"x":202,"width":120,"var":"img_head2","height":120}},{"type":"Image","props":{"y":151,"x":353,"width":120,"var":"img_head3","height":120}},{"type":"Image","props":{"y":151,"x":503,"width":120,"var":"img_head4","height":120}},{"type":"Image","props":{"y":151,"x":653,"width":120,"var":"img_head5","height":120}},{"type":"Image","props":{"y":299,"x":54,"width":120,"var":"img_head6","height":120}},{"type":"Image","props":{"y":299,"x":204,"width":120,"var":"img_head7","height":120}},{"type":"Image","props":{"y":299,"x":354,"width":120,"var":"img_head8","height":120}},{"type":"Image","props":{"y":299,"x":503,"width":120,"var":"img_head9","height":120}},{"type":"Image","props":{"y":299,"x":653,"width":120,"var":"img_head10","height":120}},{"type":"Label","props":{"y":446,"x":37,"width":749,"var":"label_tip","height":24,"fontSize":20,"color":"#ffcc19","bold":false,"align":"center"}},{"type":"Button","props":{"y":507,"x":337,"visible":true,"var":"btn_photo","stateNum":2,"skin":"comp/btn_150x58.png","labelSize":22,"labelPadding":"-2,0,0,0","labelColors":"#721e01,#721e01","labelBold":true,"label":"自拍头像"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GFModifyHeaderImgUI.uiView);
        }
    }
}

module ui {
    export class GFPhotoTipsUI extends Dialog {
		public btn_ok:Laya.Button;
		public btn_close:Laya.Button;
		public pannel_photo_wait:Laya.Panel;

        public static  uiView:any ={"type":"Dialog","props":{"width":610,"height":412},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"comp/bg_wenzitishi.png"}},{"type":"Label","props":{"y":59,"x":55,"width":490,"text":"尊敬的玩家：","height":35,"fontSize":25,"color":"#ffffff"}},{"type":"Label","props":{"y":114,"x":55,"wordWrap":true,"width":490,"text":"请确认您所上传的头像符合国家网络安全相关规定，如果涉黄或违反相关规定，责任将由个人承担，官方有权进行封号处理。","leading":5,"height":87,"fontSize":21,"color":"#ffffff"}},{"type":"Label","props":{"y":212,"x":55,"width":491,"text":"选择头像后，请耐心等待“上传成功”提示！","height":31,"fontSize":21,"color":"#fff193"}},{"type":"Button","props":{"y":296,"x":218,"var":"btn_ok","stateNum":2,"skin":"comp/btn_150x58.png","labelSize":22,"labelPadding":"-5,0,0,0","labelColors":"#721e01,#721e01","labelBold":true}},{"type":"Button","props":{"y":34,"x":508,"var":"btn_close","stateNum":2,"skin":"comp/btn_dialog_close.png"}},{"type":"Panel","props":{"y":0,"x":0,"width":610,"visible":false,"var":"pannel_photo_wait","height":412},"child":[{"type":"Label","props":{"y":0,"x":0,"width":610,"height":412,"color":"#ffffff"}},{"type":"Image","props":{"y":161.5,"x":0,"width":610,"skin":"comp/bg_qipao.png","height":89}},{"type":"Label","props":{"y":185.5,"x":167,"width":276,"text":"正在上传头像...","height":41,"fontSize":34,"color":"#ffffff"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GFPhotoTipsUI.uiView);
        }
    }
}

module ui {
    export class GFPlayerViewUI extends View {
		public playerName:Laya.Label;
		public playerImage:Laya.Image;
		public lotteryBack:Laya.Image;
		public lottery:Laya.Label;
		public money:Laya.Label;
		public victor_kuang:Laya.Image;
		public victor_rasor:Laya.Image;
		public victor_text:Laya.Image;

        public static  uiView:any ={"type":"View","props":{},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"comp/bg_youxi_touxiang.png"}},{"type":"Label","props":{"var":"playerName","valign":"middle","top":2,"text":"麦兜","right":3,"overflow":"hidden","left":3,"height":26,"fontSize":20,"color":"#fffdfd","bold":false,"align":"center"}},{"type":"Image","props":{"y":35,"x":5,"width":110,"var":"playerImage","skin":"comp/image_youxitouxiang.png","height":110}},{"type":"Image","props":{"y":115,"x":1,"var":"lotteryBack","skin":"comp/bg_dizhu.png"}},{"type":"Label","props":{"y":119,"x":35,"width":80,"var":"lottery","valign":"middle","text":"5555","overflow":"visible","height":26,"fontSize":18,"color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":147,"x":34,"width":81,"var":"money","valign":"middle","text":"1234567","overflow":"visible","height":30,"fontSize":18,"color":"#ffffff","align":"left"}},{"type":"Image","props":{"y":150,"x":7,"width":24,"skin":"comp/youxi_jinbi.png","height":24}},{"type":"Image","props":{"y":-5.0234375,"x":-2.001953125,"visible":false,"var":"victor_kuang","skin":"comp/bg_sheng_biankuang.png"}},{"type":"Image","props":{"y":88.98828125,"x":59.998046875,"visible":false,"var":"victor_rasor","skin":"comp/image_sheng_beijing.png","pivotY":54,"pivotX":54}},{"type":"Image","props":{"y":68,"x":39,"visible":false,"var":"victor_text","skin":"comp/image_sheng.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GFPlayerViewUI.uiView);
        }
    }
}

module ui {
    export class GFRankCellUI extends View {
		public rankName:Laya.Label;
		public money_image:Laya.Image;
		public rankMoney:Laya.Label;
		public rankNum:Laya.Label;
		public imageNum:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"text":"1","color":"#ffffff"},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"comp/bg_paihangtiao.png"}},{"type":"Label","props":{"y":24,"x":170,"var":"rankName","fontSize":26,"color":"#ffffff"}},{"type":"Image","props":{"y":18,"x":501,"var":"money_image","skin":"comp/image_paihang_jinbi.png"}},{"type":"Label","props":{"y":22,"x":553,"var":"rankMoney","fontSize":26,"color":"#fff193"}},{"type":"Label","props":{"y":24,"x":74,"var":"rankNum","fontSize":26,"color":"#ffffff"}},{"type":"Image","props":{"y":6,"x":38,"var":"imageNum"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GFRankCellUI.uiView);
        }
    }
}

module ui {
    export class GFSelectPaymentDialogUI extends Dialog {
		public btn_pay_dialog_close:Laya.Button;
		public image_pay_weixin:Laya.Image;
		public image_pay_yinlian:Laya.Image;
		public image_pay_zhifubao:Laya.Image;

        public static  uiView:any ={"type":"Dialog","props":{"width":824,"height":598},"child":[{"type":"Image","props":{"y":1,"x":-4,"skin":"comp/bg_zhifufangshi.png"}},{"type":"Button","props":{"y":37,"x":719,"var":"btn_pay_dialog_close","stateNum":2,"skin":"comp/btn_dialog_close.png"}},{"type":"Image","props":{"y":404,"x":132,"visible":false,"var":"image_pay_weixin","skin":"comp/image_weixin.png"}},{"type":"Image","props":{"y":277,"x":132,"visible":true,"var":"image_pay_yinlian","skin":"comp/image_yinlian.png"}},{"type":"Image","props":{"y":150,"x":132,"var":"image_pay_zhifubao","skin":"comp/image_zhifubao.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GFSelectPaymentDialogUI.uiView);
        }
    }
}

module ui {
    export class GFSlotRuleUI extends View {
		public ruleLabel:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":178,"leading":16,"height":296},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"comp/bg_paidefen.png"}},{"type":"Label","props":{"y":37,"x":9,"wordWrap":true,"width":160,"var":"ruleLabel","valign":"middle","padding":"0,0,0,20","leading":"16","height":242,"fontSize":24,"color":"#f1e8ff","bold":false,"align":"left"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GFSlotRuleUI.uiView);
        }
    }
}

module ui {
    export class GFSlotUserInfoUI extends View {
		public avatarImage:Laya.Image;
		public levelImage:Laya.Image;
		public nameLabel:Laya.Label;
		public pointLabel:Laya.Label;
		public chipLabel:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":170,"height":300},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"comp/bg_yonghu2.png"}},{"type":"Image","props":{"y":29,"x":35,"width":100,"var":"avatarImage","skin":"comp/image_youxitouxiang.png","height":100}},{"type":"Image","props":{"y":18,"x":24,"var":"levelImage"}},{"type":"Label","props":{"y":139,"x":10,"var":"nameLabel","valign":"middle","right":10,"overflow":"hidden","left":10,"height":30,"fontSize":22,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":233,"x":25,"skin":"comp/youxi_jinbi.png"}},{"type":"Label","props":{"y":234,"x":52,"width":93,"var":"pointLabel","overflow":"visible","height":22,"fontSize":20,"color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":199,"x":56,"width":93,"var":"chipLabel","overflow":"visible","height":22,"fontSize":20,"color":"#ffffff","align":"left"}},{"type":"Image","props":{"y":195,"x":22,"skin":"comp/image_xiazhu.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GFSlotUserInfoUI.uiView);
        }
    }
}

module ui {
    export class GFStandLookingUI extends Dialog {
		public btn_close:Laya.Button;
		public btn_tip:Laya.Button;

        public static  uiView:any ={"type":"Dialog","props":{"width":824,"height":598},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"comp/bg_guanzhan.png"}},{"type":"Button","props":{"y":26,"x":722,"var":"btn_close","stateNum":2,"skin":"comp/btn_dialog_close.png"}},{"type":"Button","props":{"y":511,"x":337,"var":"btn_tip","stateNum":2,"skin":"comp/btn_150x58.png","labelSize":22,"labelPadding":"-5,0,0,0","labelColors":"#721e01,#721e01","labelBold":true,"label":"给小费"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GFStandLookingUI.uiView);
        }
    }
}

module ui {
    export class GFTigerHallViewUI extends View {
		public btn_back:Laya.Button;
		public btn_change:Laya.Button;
		public label_myrank:Laya.Label;

        public static  uiView:any ={"type":"View","props":{},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"comp/bg_jinhudating.png"}},{"type":"Button","props":{"y":66,"x":22,"var":"btn_back","stateNum":2,"skin":"comp/btn_jinhu_fanhui.png"}},{"type":"Button","props":{"y":66,"x":644,"var":"btn_change","stateNum":2,"skin":"comp/btn_huanjinhuji.png"}},{"type":"Image","props":{"y":70,"x":889,"skin":"comp/bg_dejiangpaihang.png"}},{"type":"Label","props":{"y":113,"x":898,"width":205,"var":"label_myrank","height":24,"fontSize":22,"color":"#fff193","bold":true,"align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GFTigerHallViewUI.uiView);
        }
    }
}

module ui {
    export class GFTigerItemViewUI extends View {
		public label_index:Laya.Label;
		public label_other_point:Laya.Label;
		public label_tip:Laya.Label;
		public label_me_point:Laya.Label;
		public image_me:Laya.Image;
		public image_head:Laya.Image;
		public image_stroke:Laya.Image;
		public btn_grab:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":275,"visible":true,"height":200},"child":[{"type":"Image","props":{"y":30,"x":0,"skin":"comp/bg_jinhujichang.png"}},{"type":"Label","props":{"y":35,"x":7,"width":78,"var":"label_index","height":24,"fontSize":22,"color":"#ffffff","bold":true,"align":"center"}},{"type":"Label","props":{"y":46,"x":90,"width":156,"visible":false,"var":"label_other_point","height":22,"fontSize":20,"color":"#fff193","bold":true,"align":"right"}},{"type":"Label","props":{"y":160,"x":0,"width":264,"var":"label_tip","height":31,"fontSize":20,"color":"#d2b7f8","bold":true,"align":"center"}},{"type":"Label","props":{"y":46,"x":101,"width":111,"visible":false,"var":"label_me_point","height":22,"fontSize":20,"color":"#fff193","bold":true,"align":"right"}},{"type":"Image","props":{"y":35,"x":220,"visible":false,"var":"image_me","skin":"comp/image_jinhu_wo.png"}},{"type":"Image","props":{"y":79,"x":17,"width":45,"skin":"comp/image_paimoren1.png","height":58}},{"type":"Image","props":{"y":79,"x":65,"width":45,"skin":"comp/image_paimoren2.png","height":58}},{"type":"Image","props":{"y":79,"x":113,"width":45,"skin":"comp/image_paimoren3.png","height":58}},{"type":"Image","props":{"y":73,"x":7,"width":250,"skin":"comp/bg_gundong.png","height":70}},{"type":"Image","props":{"y":73,"x":176,"width":72,"visible":false,"var":"image_head","height":72}},{"type":"Image","props":{"y":73,"x":176,"width":72,"visible":false,"var":"image_stroke","skin":"comp/image_jinhu_touxiangbian.png","height":72}},{"type":"Button","props":{"y":80,"x":83,"visible":false,"var":"btn_grab","stateNum":2,"skin":"comp/btn_qiangzhan.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GFTigerItemViewUI.uiView);
        }
    }
}

module ui {
    export class GFUpdateViewUI extends View {
		public label_title:Laya.Label;
		public label_update_content:Laya.Label;
		public btn_confirm:Laya.Button;
		public btn_cancel:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":1136,"height":640},"child":[{"type":"Image","props":{"y":112,"x":263,"skin":"comp/bg_wenzitishi.png"}},{"type":"Label","props":{"y":180,"x":286,"width":562,"var":"label_title","height":30,"fontSize":30,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":258,"x":326,"wordWrap":true,"width":485,"var":"label_update_content","leading":8,"height":96,"fontSize":24,"color":"#ffffff"}},{"type":"Button","props":{"y":400,"x":373,"var":"btn_confirm","stateNum":1,"skin":"comp/btn_zhuxiao.png","labelSize":24,"labelPadding":"-1","labelColors":"#721e01","labelBold":true}},{"type":"Button","props":{"y":400,"x":578,"var":"btn_cancel","stateNum":2,"skin":"comp/btn_xuanzhan.png","labelSize":24,"labelPadding":"-1","labelColors":"#ffffff,#ffffff","labelBold":true}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GFUpdateViewUI.uiView);
        }
    }
}

module ui {
    export class GFUserActionViewUI extends View {
		public blackView:Laya.Panel;
		public look3:Laya.Button;
		public clear3:Laya.Button;
		public addFriend3:Laya.Button;
		public delete3:Laya.Button;
		public strangeView:Laya.Panel;
		public look2:Laya.Button;
		public clear2:Laya.Button;
		public addFriend2:Laya.Button;
		public black2:Laya.Button;
		public delete2:Laya.Button;
		public give2:Laya.Button;
		public friendView:Laya.Panel;
		public look:Laya.Button;
		public clear:Laya.Button;
		public black:Laya.Button;
		public delete:Laya.Button;
		public give:Laya.Button;
		public addNewFriend:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":570,"height":70},"child":[{"type":"Panel","props":{"y":12,"x":191,"width":377,"visible":false,"var":"blackView","height":53},"child":[{"type":"Button","props":{"x":30,"width":70,"var":"look3","skin":"comp/btn_jiahaoyou1.png","labelSize":24,"labelPadding":"0","labelColors":"#ffffff,#ffffff,#ffffff","label":"查看","height":50}},{"type":"Button","props":{"x":106,"width":70,"var":"clear3","skin":"comp/btn_jiahaoyou1.png","labelSize":24,"labelPadding":"0","labelColors":"#ffffff,#ffffff,#ffffff","label":"清空","height":50}},{"type":"Button","props":{"x":182,"width":100,"var":"addFriend3","skin":"comp/btn_jiahaoyou1.png","labelSize":24,"labelPadding":"0","labelColors":"#ffffff,#ffffff,#ffffff","label":"加好友","height":50}},{"type":"Button","props":{"x":288,"width":70,"var":"delete3","skin":"comp/btn_jiahaoyou1.png","labelSize":24,"labelPadding":"0","labelColors":"#ffffff,#ffffff,#ffffff","label":"删除","height":50}}]},{"type":"Panel","props":{"y":13,"x":16,"width":552,"visible":false,"var":"strangeView","height":100},"child":[{"type":"Button","props":{"y":0,"x":50,"width":70,"var":"look2","skin":"comp/btn_jiahaoyou1.png","labelSize":24,"labelPadding":"0","labelColors":"#ffffff,#ffffff,#ffffff","label":"查看","height":50}},{"type":"Button","props":{"x":127,"width":70,"var":"clear2","skin":"comp/btn_jiahaoyou1.png","labelSize":24,"labelPadding":"0","labelColors":"#ffffff,#ffffff,#ffffff","label":"清空","height":50}},{"type":"Button","props":{"x":204,"width":100,"var":"addFriend2","skin":"comp/btn_jiahaoyou1.png","labelSize":24,"labelPadding":"0","labelColors":"#ffffff,#ffffff,#ffffff","label":"加好友","height":50}},{"type":"Button","props":{"x":311,"width":70,"var":"black2","skin":"comp/btn_jiahaoyou1.png","labelSize":24,"labelPadding":"0","labelColors":"#ffffff,#ffffff,#ffffff","label":"拉黑","height":50}},{"type":"Button","props":{"x":388,"width":70,"var":"delete2","skin":"comp/btn_jiahaoyou1.png","labelSize":24,"labelPadding":"0","labelColors":"#ffffff,#ffffff,#ffffff","label":"删除","height":50}},{"type":"Button","props":{"x":465,"width":70,"var":"give2","skin":"comp/btn_jiahaoyou1.png","labelSize":24,"labelPadding":"0","labelColors":"#ffffff,#ffffff,#ffffff","label":"赠币","height":50}}]},{"type":"Panel","props":{"y":11,"x":1,"width":568,"visible":false,"var":"friendView","height":100},"child":[{"type":"Button","props":{"y":0,"x":186,"width":70,"var":"look","skin":"comp/btn_jiahaoyou1.png","labelSize":24,"labelPadding":"0","labelColors":"#ffffff,#ffffff,#ffffff","label":"查看","height":50}},{"type":"Button","props":{"y":0,"x":262,"width":70,"var":"clear","skin":"comp/btn_jiahaoyou1.png","labelSize":24,"labelPadding":"0","labelColors":"#ffffff,#ffffff,#ffffff","label":"清空","height":50}},{"type":"Button","props":{"y":0,"x":338,"width":70,"var":"black","skin":"comp/btn_jiahaoyou1.png","labelSize":24,"labelPadding":"0","labelColors":"#ffffff,#ffffff,#ffffff","label":"拉黑","height":50}},{"type":"Button","props":{"y":0,"x":414,"width":70,"var":"delete","skin":"comp/btn_jiahaoyou1.png","labelSize":24,"labelPadding":"0","labelColors":"#ffffff,#ffffff,#ffffff","label":"删除","height":50}},{"type":"Button","props":{"y":0,"x":490,"width":70,"var":"give","skin":"comp/btn_jiahaoyou1.png","labelSize":24,"labelPadding":"0","labelColors":"#ffffff,#ffffff,#ffffff","label":"赠币","height":50}}]},{"type":"Button","props":{"y":11,"x":10,"width":120,"var":"addNewFriend","skin":"comp/btn_jiahaoyou1.png","labelSize":24,"labelPadding":"0","labelColors":"#ffffff,#ffffff,#ffffff","label":"新加好友","height":50}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GFUserActionViewUI.uiView);
        }
    }
}

module ui {
    export class GFUserDetailDialogUI extends Dialog {
		public bg:Laya.Image;
		public user_image:Laya.Image;
		public user_sex:Laya.Image;
		public user_belle:Laya.Image;
		public user_name:Laya.Label;
		public user_ID:Laya.Label;
		public user_IP:Laya.Label;
		public user_point:Laya.Label;
		public user_record:Laya.Label;
		public user_sign:Laya.Label;
		public image1:Laya.Image;
		public image2:Laya.Image;
		public image3:Laya.Image;
		public image4:Laya.Image;
		public image5:Laya.Image;
		public btn_gift:Laya.Button;
		public btn_addFriend:Laya.Button;
		public btn_leave:Laya.Button;
		public btn_close:Laya.Button;
		public image_vip:Laya.Image;

        public static  uiView:any ={"type":"Dialog","props":{"width":1136,"leading":6,"height":640},"child":[{"type":"Image","props":{"var":"bg","skin":"comp/bg_touming.png","centerY":0,"centerX":0}},{"type":"Panel","props":{"width":824,"height":598,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"y":2,"x":-1,"skin":"comp/bg_yonghuzhanshi.png"}},{"type":"Image","props":{"y":63,"x":66,"width":210,"var":"user_image","height":210}},{"type":"Image","props":{"y":58,"x":349,"width":38,"var":"user_sex","height":38}},{"type":"Image","props":{"y":53,"x":219,"var":"user_belle"}},{"type":"Label","props":{"y":62,"x":408,"width":325,"var":"user_name","underlineColor":"#efe3e2","underline":false,"skin":"template/文本框/label.png","height":32,"fontSize":26,"color":"#ffffff"}},{"type":"Label","props":{"y":108,"x":349,"width":325,"var":"user_ID","skin":"template/文本框/label.png","height":24,"fontSize":26,"color":"#ffffff"}},{"type":"Label","props":{"y":142,"x":349,"width":325,"var":"user_IP","skin":"template/文本框/label.png","height":24,"fontSize":26,"color":"#ffffff"}},{"type":"Label","props":{"y":177,"x":349,"width":325,"var":"user_point","skin":"template/文本框/label.png","height":24,"fontSize":26,"color":"#ffffff"}},{"type":"Label","props":{"y":211,"x":349,"width":325,"visible":true,"var":"user_record","skin":"template/文本框/label.png","height":24,"fontSize":26,"color":"#ffffff"}},{"type":"Label","props":{"y":245,"x":349,"width":75,"text":"签名：","skin":"template/文本框/label.png","height":32,"fontSize":22,"color":"#ffffff"}},{"type":"Label","props":{"y":245,"x":427,"width":346,"var":"user_sign","skin":"template/文本框/label.png","leading":"6","height":32,"fontSize":22,"color":"#ffffff"}},{"type":"Label","props":{"y":408,"x":64,"width":164,"text":"收到的礼物：","skin":"template/文本框/label.png","height":32,"fontSize":28,"color":"#ffffff"}},{"type":"Image","props":{"y":383,"x":234,"width":90,"var":"image1","height":90}},{"type":"Image","props":{"y":383,"x":340,"width":90,"var":"image2","height":90}},{"type":"Image","props":{"y":383,"x":446,"width":90,"var":"image3","height":90}},{"type":"Image","props":{"y":383,"x":551,"width":90,"var":"image4","height":90}},{"type":"Image","props":{"y":383,"x":657,"width":90,"var":"image5","height":90}},{"type":"Panel","props":{"y":509,"x":115,"width":562,"height":58},"child":[{"type":"Button","props":{"x":192,"width":180,"visible":false,"var":"btn_gift","stateNum":2,"skin":"comp/btn_xiaoxitanchuang.png","selected":true,"labelSize":24,"labelPadding":"0","labelColors":"#ffffff,#721e01,#721e01","label":"赠送礼物"}},{"type":"Button","props":{"x":382,"width":180,"visible":false,"var":"btn_addFriend","stateNum":2,"skin":"comp/btn_xiaoxitanchuang.png","selected":true,"labelStrokeColor":"#ca1c19","labelSize":24,"labelPadding":"0","labelColors":"#ffffff,#721e01,#721e01","label":"加为好友","height":58}},{"type":"Button","props":{"width":180,"visible":false,"var":"btn_leave","stateNum":2,"skin":"comp/btn_xiaoxitanchuang.png","selected":true,"labelSize":24,"labelPadding":"0","labelColors":"#ffffff,#721e01,#721e01","label":"请他离开","height":58}}]}]},{"type":"Button","props":{"y":57,"x":986,"var":"btn_close","stateNum":2,"skin":"comp/btn_dialog_close.png"}},{"type":"Image","props":{"y":74,"x":212,"var":"image_vip"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GFUserDetailDialogUI.uiView);
        }
    }
}

module ui {
    export class GFWinningTipsDialogUI extends Dialog {
		public btn_kefu:Laya.Button;
		public btn_ok:Laya.Button;
		public tiger_ID_label:Laya.Label;
		public tiger_number_label:Laya.Label;
		public tiger_name_label:Laya.Label;
		public tiger_value_label:Laya.Label;

        public static  uiView:any ={"type":"Dialog","props":{"width":720,"height":490},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"comp/bg_gaoshi.png"}},{"type":"Image","props":{"y":20,"skin":"comp/image_zhongjiang.png","centerX":0}},{"type":"Button","props":{"y":375,"x":378,"var":"btn_kefu","stateNum":2,"skin":"comp/btn_lianxikefu.png"}},{"type":"Button","props":{"y":375,"x":125,"var":"btn_ok","stateNum":2,"skin":"comp/btn_wozhidao.png"}},{"type":"Label","props":{"y":322,"x":190.5,"width":339,"text":"请联系客服兑换宝贝","height":36,"fontSize":22,"color":"#b1d0ff","bold":true,"align":"center"}},{"type":"Image","props":{"y":251,"x":179,"width":360,"skin":"comp/image_tihuo.png","height":64,"centerX":0}},{"type":"Label","props":{"y":264,"x":190.5,"width":339,"var":"tiger_ID_label","height":36,"fontSize":28,"color":"#ff2841","bold":true,"align":"center"}},{"type":"Label","props":{"y":129,"x":142,"width":272,"var":"tiger_number_label","height":36,"fontSize":24,"color":"#ffcc19","bold":false,"align":"left"}},{"type":"Label","props":{"y":174,"x":53,"wordWrap":true,"width":612,"var":"tiger_name_label","overflow":"visible","leading":5,"height":56,"fontSize":22,"color":"#ffffff","bold":true,"align":"center"}},{"type":"Label","props":{"y":140,"x":418,"width":246,"var":"tiger_value_label","height":30,"font":"jinbishouru","color":"#ffcc19","bold":true,"align":"left"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GFWinningTipsDialogUI.uiView);
        }
    }
}
