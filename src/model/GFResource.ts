import Loader = laya.net.Loader;

let LogInRes = ["comp/btn_yanzhengma.png","comp/btn_150x58.png","comp/btn_dialog_close.png","comp/bg_zhanghaodenglu.png","comp/btn_zhuxiao.png","comp/btn_xuanzhan.png","comp/bg_wenzitishi.png"];

let HomePageRes = ['comp/btn_zhanghao_qq.png',"comp/btn_yanzhengma.png","comp/bg_zhanghaodenglu.png",'comp/btn_dengluzhuce.png' , "comp/bg_xuanhaoyou.png" , "comp/bg_qipao.png", "comp/btn_shouye_zoumadeng.png", "comp/btn_nan.png",{url : "res/atlas/output/givingPoint/image.json" , type : Loader.ATLAS},
    "comp/btn_nv.png", "comp/btn_fasonggonggao.png", "comp/btn_leitaiicon.png", "comp/btn_gonggao.png", "comp/bg_gonggao_shouye.png", "comp/bg_touming.png","comp/btn_xuanzhan.png",
    "comp/image_paihang_jinbi.png", "comp/bg_leitaitanchuan.png", "comp/btn_dialog_close.png", "comp/btn_150x58.png", "comp/btn_xuanxingbie.png", "comp/btn_huodongxiang.png",
    "comp/bg_gonggao.png", "comp/bg_paihangtanchuang.png", "comp/tab_paihang.png", "comp/bg_wenzitishi.png", "comp/btn_tianjia.png", "comp/btn_fanhui_quxiao.png", "comp/btn_shourupaihang.png",
    "comp/bg_paihangtiao.png", "comp/image_paihang_jinbi.png", "comp/bg_shouye.jpg", "comp/image_youxitouxiang.png",
    "comp/youxi_jinbi.png", "comp/image_vip_zhihui.png", "comp/image_jiadaopinmu.png",
    "comp/image_zengjinbi.png", "comp/btn_jinbi.png", "comp/btn_huodong.png", "comp/btn_haoyou.png", "comp/btn_paiming.png",
    "comp/btn_gengduo.png", "comp/btn_chongzhi.png", "comp/blank.png","comp/bg_gaoshi.png", "comp/btn_gaoshi_queding.png","comp/image_tishi.png",
    "comp/btn_shanchu.png", "comp/btn_anjian_0.png", "comp/btn_anjian_1.png", "comp/btn_anjian_2.png", "comp/btn_anjian_3.png", "comp/btn_anjian_4.png",
    "comp/btn_anjian_5.png", "comp/btn_anjian_6.png", "comp/btn_anjian_7.png", "comp/btn_anjian_8.png", "comp/btn_anjian_9.png", "comp/btn_tijiao.png",
    "comp/bg_lianxudenglu.png", "comp/image_liangdeng1.png", "comp/image_liangdeng2.png","comp/btn_jiaqun.png",
    "comp/image_liangdeng3.png", "comp/image_liangdeng4.png", "comp/image_liangdeng5.png",
    "comp/bg_tiaozhantanchuang.png","comp/image_chuji_tiao.png","comp/image_chuji_xuan.png","comp/image_leitai_tiao.png",
    "comp/image_leitai_xuan.png","comp/image_zhizun_tiao.png","comp/image_zhizun_xuan.png","comp/image_zhongji_tiao.png","comp/image_zhongji_xuan.png",
    "comp/bg_duobaodating.png","comp/btn_jinhu_fanhui.png","comp/btn_huanduobaoji.png","comp/bg_duobaopaihang.png",
    "comp/btn_dialog_close.png", "comp/btn_liandeng_lingqu.png", "comp/bg_guanzhan.png", "comp/bg_guanzhanju.png",
    "comp/btn_150x58.png", "comp/btn_liandeng_lingqu.png", "comp/btn_guanzhan.png", "comp/bg_gengduozhankai.png", "comp/btn_kefu.png", "comp/btn_bangzhu.png",
    "comp/btn_shezhi.png", "comp/btn_gonggao1.png", "comp/bg_bangzhutanchuang.png", "comp/btn_dialog_close.png", "comp/btn_xiaoxitanchuang.png",
    "comp/btn_zhucexieyi.png", "comp/btn_yinsizhengce.png", "comp/btn_fuwuxieyi.png", "comp/bg_yonghu.png", "comp/image_youxitouxiang.png", "comp/image_gaitouxiang.png",
    "comp/image_vip1.png", "comp/btn_xuanxingbie.png", "comp/bg_xiugaitouxiang.png", "comp/bg_haoyoutanchuang.png", "comp/btn_faxiaoxi.png", "comp/btn_xiaoxitanchuang.png",
    "comp/bg_yonghuzhanshi.png", "comp/image_yonghuliwu1.png", "comp/image_yonghuliwu2.png", "comp/image_yonghuliwu3.png", "comp/image_yonghuliwu4.png", "comp/image_yonghuliwu5.png",
    "comp/image_vip1.png", "comp/image_vip2.png", "comp/image_vip3.png", "comp/image_vip4.png", "comp/image_vip5.png", "comp/image_vip6.png", "comp/image_vip7.png",
    "comp/image_vip8.png", "comp/image_vip9.png", "comp/image_vip10.png", "comp/bg_liwu.png", "comp/btn_liwu1.png", "comp/btn_liwu2.png", "comp/btn_liwu3.png", "comp/btn_liwu4.png",
    "comp/btn_liwu5.png", "comp/image_liwu_chang.png", "comp/image_liwu_duan.png", "comp/bg_chongzhitanchuang.png", "comp/btn_dialog_close.png", "comp/btn_xiaoxitanchuang.png",
    "comp/image_yiyouzuanshi.png", "comp/image_zengsong.png", "comp/bg_zuanshi_1.png", "comp/bg_zuanshi_2.png", "comp/bg_zuanshi_3.png", "comp/bg_zuanshi_4.png",
    "comp/bg_zuanshi_5.png", "comp/bg_zuanshi_6.png", "comp/image_xuzuanshi.png", "comp/bg_jinbi_1.png", "comp/bg_jinbi_2.png", "comp/bg_jinbi_3.png", "comp/bg_jinbi_4.png",
    "comp/bg_jinbi_5.png", "comp/bg_jinbi_6.png", "comp/bg_wenzitishi.png", "comp/btn_dialog_close.png", "comp/checkbox.png", "comp/btn_150x58.png", "comp/bg_huodongtanchuang.png",
    "comp/btn_huodong_lingjiang.png", "comp/textinput.png", "comp/bg_leitaitanchuan.png", "comp/btn_150x58.png", "comp/btn_fanhui_quxiao.png", "comp/bg_zhifufangshi.png", "comp/image_weixin.png",
    "comp/image_yinlian.png", "comp/image_zhifubao.png", "comp/btn_youxi_jinbi.png", "comp/image_liangdeng1_ing.png", "comp/image_liangdeng1_ok.png", "comp/image_liangdeng2_ing.png",
    "comp/image_liangdeng2_ok.png", "comp/image_liangdeng3_ing.png", "comp/image_liangdeng3_ok.png", "comp/image_liangdeng4_ing.png", "comp/image_liangdeng4_ok.png", "comp/image_liangdeng5_ing.png",
    "comp/image_liangdeng5_ok.png", "comp/image_zengjinbi.png", "comp/bg_anzhuoyindao.png", "comp/btn_wozhidaole.png", "comp/image_nan.png", "comp/image_nv.png",
    "comp/btn_150x58.png", "comp/bg_guanzhan.png", "comp/bg_guanzhanren.png", "comp/youxi_jinbi.png", "comp/btn_guanzhan.png", "comp/btn_xiaofei1.png", "comp/btn_xiaofei2.png", "comp/btn_xiaofei3.png",
    "comp/btn_xiaofei4.png", "comp/image_huodongbiaoqian.png", "comp/image_vip.png", "comp/bg_shezhitiao.png", "comp/btn_jiahaoyou1.png", "comp/bg_shezhitiao$bar.png", "comp/btn_tanchuangchacha.png",
    "comp/image_hongdian1.png", "comp/image_hongdian2.png", "comp/image_liwudian1.png", "comp/image_liwudian2.png", "comp/image_liwudian3.png", "comp/image_liwudian4.png", "comp/image_liwudian5.png",
    "comp/image_liwudian6.png", "comp/image_liwudian7.png", "comp/image_vip_dis.png", "comp/image_yonghuliwu1_dis.png", "comp/image_yonghuliwu2_dis.png", "comp/image_yonghuliwu3_dis.png",
    "comp/image_yonghuliwu4_dis.png", "comp/image_yonghuliwu5_dis.png", "comp/tab_bangzhu.png", "comp/hscroll.png", "comp/hslider.png", "comp/hslider$bar.png", "comp/hscroll$bar.png", "comp/hscroll$down.png","comp/image_touxiangbeijing.png","comp/image_meinvmoren.png",
    "comp/hscroll$up.png", "comp/btn_zhuxiao.png", "comp/bg_fasongtishi.png", "comp/bg_gonggao_youxi.png", "comp/btn_youxi_zoumadeng.png" , "comp/btn_meinv.png","comp/image_vip_wu.png", "comp/btn_youxi_huanzhuo.png","comp/image_meinv.png","comp/bg_meinvpaiming.png",
    "comp/bg_woderenzheng.png","comp/bg_zuixinrenzheng.png","comp/image_jinxianhaoyou.png","comp/btn_denglu.png",'comp/image_quanquan_li.png','comp/image_quanquan.png','comp/btn_bujinru.png','comp/btn_qianwang.png']; 


const GameRoomRes = ["comp/bg_pai_xiao.png", "comp/bg_chouma.png", "comp/bg_youxi.png",'comp/bg_youxi_leitai.png','comp/image_chuji_icon.png','comp/image_zhizun_icon.png','comp/image_zhongji_icon.png',
    "comp/bg_gonggao_youxi.png", "comp/btn_liwu.png", "comp/btn_xuanyuyin.png", "comp/image_biaoqing1.png", "comp/image_biaoqing2.png", "comp/image_biaoqing3.png",
    "comp/image_biaoqing4.png", "comp/image_biaoqing5.png", "comp/image_biaoqing6.png", "comp/image_biaoqing7.png", "comp/image_biaoqing8.png", "comp/image_biaoqing9.png", "comp/image_biaoqing10.png",
    "comp/image_biaoqing11.png", "comp/image_biaoqing12.png", "comp/bg_yuyinqipao_zuo1.png", "comp/bg_yuyinqipao_you1.png", "comp/bg_yuyinqipao_zuo.png", "comp/bg_yuyinqipao_you.png",
    "comp/bg_yuyinqipao_zuo.png", "comp/bg_zhezhao.png", "comp/bg_xiaoxitanchuang.png", "comp/btn_dialog_close.png", "comp/btn_xiaoxitanchuang.png", "comp/bg_youxi.jpg", "comp/btn_youxi.png",
    "comp/btn_youxi.png", "comp/btn_youxi.png", "comp/btn_youxi.png", "comp/btn_youxi.png", "comp/btn_youxi_bangzhu.png", "comp/btn_youxi_jinbi.png", "comp/btn_youxi_xiaoxi.png", "comp/btn_youxi_zongji.png",
    "comp/btn_zhunbeikaishi.png", "comp/btn_youxi.png", "comp/btn_guanzhanshu.png", "comp/btn_xuanzhan.png", "comp/btn_xuanzhan.png", "comp/image_kanpai_zuo.png",
    "comp/image_kanpai_you.png", "comp/image_jiazhu_zuo.png", "comp/image_jiazhu_you.png", "comp/image_genzhu_zuo.png", "comp/image_genzhu_you.png", "comp/image_bipai_zuo.png", "comp/image_bipai_you.png",
    "comp/image_kaipai_zuo.png", "comp/image_kaipai_you.png", "comp/image_fangqi_zuo.png", "comp/image_fangqi_you.png", "comp/progress_timer.png", "comp/image_zhuangjia.png", "comp/image_zhunbei.png",
    "comp/bg_pai_xiao.png", "comp/poker_hiddenValue.png", "comp/poker_giveup.png", "comp/poker_loser.png", "comp/bg_youxibangzhu.png", "comp/bg_youxi_touxiang.png", "comp/image_youxitouxiang.png",
    "comp/bg_dizhu.png", "comp/youxi_jinbi.png", "comp/image_bipaikuang.png", "comp/image_shouzhi_you.png", "comp/image_shouzhi_zuo.png", "comp/progress_timer$bar.png", "comp/progress_game.png",
    "comp/progress_game$bar.png", "comp/bg_sheng_biankuang.png", "comp/image_sheng_beijing.png", "comp/image_sheng.png", "comp/btn_huanzhuo.png","comp/bg_zongzhu.png","comp/btn_zidonggenzhu.png","comp/btn_quxiaogen.png",
    "comp/bg_fanbei_sel.png","comp/bg_fanbei.png","comp/image_fanbei.png","comp/image_fanbei1_dis.png","comp/image_fanbei1.png","comp/image_fanbei2_dis.png","comp/image_fanbei2.png","comp/image_yixuan.png","comp/btn_fanbeika.png",
    "comp/image_fanbeikatishi.png"];

let LoadingRes = ["comp/bg_dengdaitiao.png","comp/bg_dengdaitubiao0.png", "comp/bg_dengdaitiao_sel1.png", "comp/bg_dengdaitiao_sel2.png", "comp/bg_dengdaitiao_sel3.png",
'comp/bg_loading.jpg','comp/btn_jinhu_lianxu1.png','comp/btn_jinhuchouma_sel.png','comp/btn_jinhuchouma.png'];

const TigerHome = ["comp/btn_jinhu_jinbi1.png","comp/btn_jinhu_fanhui.png",'comp/bg_jinhuji1.png','comp/bg_jinhudeng1.png','comp/bg_jinhudeng2.png',"comp/btn_jinhu_huanji.png",'comp/image_jinrudating.png',"comp/bg_gundong.png","comp/bg_jinhudating.png","comp/bg_jinhujichang.png","comp/btn_huanjinhuji.png","comp/btn_jinhu_fanhui.png","comp/btn_jinhu_kong.png","comp/image_jinhu_touxiangbian.png","comp/image_jinhu_wo.png","comp/btn_qiangzhan.png","comp/image_paimoren1.png","comp/image_paimoren2.png","comp/image_paimoren3.png","comp/btn_jinhu_quxiaolianxu.png","comp/btn_xiazhu.png","comp/btn_jinhuchouma.png","comp/bg_yonghu2.png","comp/bg_paidefen.png","comp/bg_dejiangpaihang.png","comp/bg_pai_xiao3.png","comp/bg_gundongzhou1.png","comp/bg_beishu.png",{url : "res/atlas/output/tiger_0/image.json" , type : Loader.ATLAS},{url : "res/atlas/output/tiger_1/image.json" , type : Loader.ATLAS},{url : "res/atlas/output/tiger_2/image.json" , type : Loader.ATLAS},{url : "res/atlas/output/tiger_3/image.json" , type : Loader.ATLAS},{url : "res/atlas/output/tiger_4/image.json" , type : Loader.ATLAS},"comp/bg_jinhu_gonggaolan.png","comp/image_jinhu_jiantou1.png",'comp/bg_zhongjiangjilu.png','comp/image_tishishibai.png',
{url : "comp/sounds_common/tigerBGM.mp3" , type : Loader.SOUND},{url : "comp/sounds_common/tigerPlay.mp3" , type : Loader.SOUND},{url : "comp/sounds_common/tigerScroll.mp3" , type : Loader.SOUND},
{url : "comp/sounds_common/tigerTrue.mp3" , type : Loader.SOUND},{url : "comp/sounds_common/tigerBaozi.mp3" , type : Loader.SOUND},{url : "comp/sounds_common/tigerDuizi.mp3" , type : Loader.SOUND},
{url : "comp/sounds_common/tigerSanpai.mp3" , type : Loader.SOUND},{url : "comp/sounds_common/tigerShunjin.mp3" , type : Loader.SOUND},{url : "comp/sounds_common/tigerShunzi.mp3" , type : Loader.SOUND},
{url : "res/atlas/output/tigerHallWinPoint/image.json" , type : Loader.ATLAS},{url : "res/atlas/output/indianahallwin/image.json" , type : Loader.ATLAS},{url : "comp/sounds_common/tigerTonghua.mp3" , type : Loader.SOUND},"comp/bg_jieguokuang.png","comp/bg_buttonkuang.png","comp/bg_jieguotiao.png","comp/jinbishouru1.png","comp/jinbichouma.fnt","comp/jinbichouma.png","comp/image_dajinhuji.png",{url : "comp/sounds_common/tigerChange.mp3" , type : Loader.SOUND},{url : "res/atlas/output/indianaWin/image.json" , type : Loader.ATLAS},
{url : "res/atlas/output/tiger_q0/image.json" , type : Loader.ATLAS},{url : "res/atlas/output/tiger_q1/image.json" , type : Loader.ATLAS},{url : "res/atlas/output/tiger_q2/image.json" , type : Loader.ATLAS},{url : "res/atlas/output/tiger_q3/image.json" , type : Loader.ATLAS},{url : "res/atlas/output/tiger_q4/image.json" , type : Loader.ATLAS},{url : "res/atlas/output/tiger_q5/image.json" , type : Loader.ATLAS},"comp/image_duobaodating.png","comp/btn_zhongjiangjilu.png","comp/image_zhongjiang.png","comp/image_tihuo.png","comp/btn_lianxikefu.png",
"comp/btn_wozhidao.png",'comp/bg_zhongjiang_tiao.png','comp/bg_jiazhi.png','comp/image_jiazhimoren.png','comp/image_kongjilu.png','comp/bg_duobaojiangpin.png', 'comp/image_liebiaokong.png','comp/bg_weizhongjiang.png'];

const IndianaBGImage = []

function freshArr(res: any) {
    let result: Array<any> = new Array();
    for (let index = 0; index < res.length; index++) {
        // result.push(res[index] + '?v=' + Version);
        let temp = res[index];
        let obj = {url : undefined , type : undefined};
        if(temp.type) {
            obj.url = temp.url + '?v=' + Version;
            obj.type = temp.type; 
        }else {
            obj.url = temp + '?v=' + Version;
            obj.type = Loader.IMAGE;
        }
        result.push(obj);
    }
    return result;
}

function cacheObj(obj:any) {
    let cacheUrl;
    if(obj.url) {
        cacheUrl = obj.url;
    }else {
        cacheUrl = obj;
    }
    let originUrl = cacheUrl + '?v=' + Version;
    Loader.cacheRes(cacheUrl, Loader.getRes(originUrl));
    // GFLog("'>>>>>>>>>>>>>  cache  '" + originUrl + ' as ' + cacheUrl);
}

function prepareSource(complete: Handler = undefined) {
    let temp = freshArr(LoadingRes);
    Laya.loader.load(temp, Handler.create(this, function () {
        for (let index = 0; index < temp.length; index++) {
            // let originUrl = temp[index].url;
            // let cacheUrl = LoadingRes[index];
            // let cacheObj = LoadingRes[index];
            // Loader.cacheRes(cacheUrl, Loader.getRes(originUrl));
            // GFLog("'>>>>>>>>>>>>>  cache  '" + originUrl + ' as ' + cacheUrl);
            cacheObj(LoadingRes[index]);
            if (complete != undefined) {
                complete.run();
            }
        }
    }));
}

function enterPage(pageNum : number) {
    //0-login, 1-homepage ,2-room 3-jinhuji
    if(pageNum == 0){
        laya.utils.Browser.window.MtaH5.clickStat('loadingonlogin');
        loginLoadingFunnelModelstat();
    }else if(pageNum == 1){
        laya.utils.Browser.window.MtaH5.clickStat('loadingonhomepage');
        homepageLoadingFunnelModelstat();
    }else if(pageNum == 2){
        laya.utils.Browser.window.MtaH5.clickStat('loadingonroom');
        roomLoadingFunnelModelstat();

    }else if(pageNum == 3){

    }
    
}

function loginLoadingFunnelModelstat() {
    laya.utils.Browser.window.MtaH5.clickStat('quanxitongliuch', { 'loadingonlogin': 'true' });
    if (Browser.onIOS) {
        laya.utils.Browser.window.MtaH5.clickStat('ioszhuizong', { 'loadingonlogin': 'true' });
    } else if (Browser.onAndriod) {
        laya.utils.Browser.window.MtaH5.clickStat('anzhuoliuchengz', { 'loadingonlogin': 'true' });
    }
}

function homepageLoadingFunnelModelstat() {
    laya.utils.Browser.window.MtaH5.clickStat('quanxitongliuch', { 'loadingonhomepage': 'true' });
    if (Browser.onIOS) {
        laya.utils.Browser.window.MtaH5.clickStat('ioszhuizong', { 'loadingonhomepage': 'true' });
    } else if (Browser.onAndriod) {
        laya.utils.Browser.window.MtaH5.clickStat('anzhuoliuchengz', { 'loadingonhomepage': 'true' });
    }
}

function roomLoadingFunnelModelstat() {
    laya.utils.Browser.window.MtaH5.clickStat('quanxitongliuch', { 'loadingonroom': 'true' });
    if (Browser.onIOS) {
        laya.utils.Browser.window.MtaH5.clickStat('ioszhuizong', { 'loadingonroom': 'true' });
    } else if (Browser.onAndriod) {
        laya.utils.Browser.window.MtaH5.clickStat('anzhuoliuchengz', { 'loadingonroom': 'true' });
    }
}


function loadRes(res: any, complete: Handler = undefined) {
    let type: number;
    if (res == LogInRes) {
        type = 0;
    } else if (res == HomePageRes) {
        type = 1;
    } else if (res == GameRoomRes) {
        type = 2;
    } else if (res == TigerHome) {
        type = 2;
    }
    enterPage(type);
    let temp = freshArr(res);
    prepareSource(Handler.create(this, function () {
        let loadView = new view.GFLoadingView(type);
        loadView.name = 'GFLoadingView'
        Laya.stage.addChild(loadView);
        let func: () => void = function () {
            for (let index = 0; index < temp.length; index++) {
                cacheObj(res[index]);
                // let originUrl = temp[index];
                // let cacheUrl = res[index];
                // Loader.cacheRes(cacheUrl, Loader.getRes(originUrl));
                // GFLog("             cache  '" + originUrl + "' >>>>>>>>>>>>> '" + cacheUrl + "'");
            }
            if (complete != undefined) {
                loadView.removeSelf();
                complete.run();
            }
        };
        if (res.length == 0) {
            func();
            return;
        }
        let progress: (pro: number) => void = function (pro: number) {
            // GFLog('loadingRes ---------------->' + pro);
            loadView.setProgress(pro);
        }
        Laya.loader.retryNum = 2;
        Laya.loader.load(temp, Handler.create(this, func), Handler.create(this, progress, null, false));
    }));
}