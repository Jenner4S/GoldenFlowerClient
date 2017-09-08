import SoundManager = laya.media.SoundManager;
enum VoiceType {
    Look = 0,//看牌
    AddChip,//加注
    Follow,//跟注
    Compare,//比牌
    Finish,//开牌
    GiveUp,//放弃
    Zhunbei,//准备
    Voice1,
    Voice2,
    Voice3,
    Voice4,
    Voice5,
    Voice6,
    Voice7,

    Card = 100,//牌声
    Coin,//金币
    CountDown,//
    VS,//比牌声
    LoseAfterVS,//比输了
    WinAfterVS,//比赢了
    Win,//赢

    TigerPlay = 200, //老虎机背景
    TigerScroll,
    TigerTrue,
    TigerBaozi,
    TigerDuizi,
    TigerSanpai,
    TigerShunjin,
    TigerShunzi,
    TigerTonghua,
    TigerChange
}
enum BGMType {
    Home = 0,
    Game,
    Tiger,
    Indiana
}
const VoiceHeader = ["comp/sounds_common/", "comp/sounds_man/", "comp/sounds_women/"];
const VoiceName = ["kanpai", "jiazhu", "genzhu", "bipai", "kaipai", "fangqi", "fapai", "g_chat_1", "g_chat_2", "g_chat_3", "g_chat_4", "g_chat_5", "g_chat_6", "g_chat_7"];
const VoiceNameCommon = ["card", "coin", "count down", "vs", "lose after vs ", "win after vs", "win", "bmg"];
const VoiceTiger = ['tigerPlay','tigerScroll','tigerTrue','tigerBaozi','tigerDuizi','tigerSanpai','tigerShunjin','tigerShunzi','tigerTonghua','tigerChange']
const VoiceBgm = ['bgm','gameBGM','tigerBGM','indianaBGM']
function playMedia(index: VoiceType = 0, sex: model.GFPlayerSex = model.GFPlayerSex.Women) {
    let res: string;
    if (index >= 100 && index < 200) {
        index = index - 100;
        sex = 0;
        res = VoiceHeader[sex] + VoiceNameCommon[index] + '.mp3'
    } else if (index < 100) {
        res = VoiceHeader[sex] + VoiceName[index] + '.mp3';
    } else if (index >= 200) {
        index = index - 200;
        sex = 0;
        res = VoiceHeader[sex] + VoiceTiger[index] + '.mp3'
    }
    SoundManager.playSound(res, 1, Handler.create(this, function () {
        GFLog("sound finish");
    }))
}

function BGM(index : BGMType) {
    let res = "comp/sounds_common/" + VoiceBgm[index] + '.mp3'
    SoundManager.stopAll();
    SoundManager.playMusic(res, 0, Handler.create(this, function () {
        GFLog('bgm finish')
    }))
}

function tigerBgm() {
    SoundManager.playMusic("comp/sounds_common/tigerBGM.mp3", 0, Handler.create(this, function () {
        GFLog("finish");
    }))
}

function playBgm() {
    SoundManager.playMusic("comp/sounds_common/bgm.mp3", 0, Handler.create(this, function () {
        GFLog("finish");
    }))
}

function stopBgm() {
    SoundManager.stopAll();
    // SoundManager.stopMusic();
}

function stopMedia(index: VoiceType = 0, sex: model.GFPlayerSex = model.GFPlayerSex.Women) {
    let res: string;
    if (index >= 100 && index < 200) {
        index = index - 100;
        sex = 0;
        res = VoiceHeader[sex] + VoiceNameCommon[index] + '.mp3'
    } else if (index < 100) {
        res = VoiceHeader[sex] + VoiceName[index] + '.mp3';
    } else if (index >= 200) {
        index = index - 200;
        sex = 0;
        res = VoiceHeader[sex] + VoiceTiger[index] + '.mp3'
    }
    GFLog(res);
    SoundManager.stopSound(res);
}