module model {
    /**
     * GFConduitResourceManager
     */
    export class GFConduitResourceManager {
        static specailTitleDist = [-1, 1, 5];
        static specailLoginBackImageDist = [-1, 1, 5, 9];
        static specailLoadingIconImageDist = [-1, 1, 5, 9];
        static specailLoginByPhoneImageDist = [-1, 20];
        static specailLoginByQQImageDist = [-1,20];
        static specailLoginTempImageDist = [-1, 20];
        static specailQuickStartIconImageDist = [-1, 20];
        constructor() {
        }
        static showLogin(dist : number) : boolean {
            return dist>=30 && dist<=150;
        }
        static getTitle(dist: number): string {
            if (GFConduitResourceManager.specailTitleDist.indexOf(dist) > 0) {
                switch (dist) {
                    case 1:
                        return "电玩游戏厅";
                    case 5:
                        return "三张大师";
                }
            }
            return "耍三张";
        }

        static getLoginBackImage(dist: number): string {
            if (GFConduitResourceManager.specailLoginBackImageDist.indexOf(dist) > 0) {
                return "comp/bg_denglu" + dist + ".jpg"
            } else {
                return "comp/bg_denglu0.jpg";
            }
        }

        static getLoadingIconImage(dist: number): string {
            if (GFConduitResourceManager.specailLoadingIconImageDist.indexOf(dist) > 0) {
                return "comp/bg_dengdaitubiao" + dist + ".png";
            } else {
                return "comp/bg_dengdaitubiao0.png";
            }
        }

        static getLoginByPhoneImage(dist: number): string {
            // if (GFConduitResourceManager.specailLoginByPhoneImageDist.indexOf(dist) > 0) {
            //     return "comp/btn_shoujidenglu" + dist + ".png"
            // } else {
                return "comp/btn_shoujidenglu1.png";
            // }
        }

        static getLoginTempImage(dist: number): string {
            // if (GFConduitResourceManager.specailLoginTempImageDist.indexOf(dist) > 0) {
            //     return "comp/btn_youkedenglu" + dist + ".png"
            // } else {
                return "comp/btn_youkedenglu1.png";
            // }
        }

        static getLoginByQQImage(dist: number): string {
            // if (GFConduitResourceManager.specailLoginByQQImageDist.indexOf(dist) > 0) {
            //     return "comp/btn_qqdenglu" + dist + ".png"
            // } else {
                return "comp/btn_qqdenglu1.png";
            // }
        }

        static getQuickStartIconImage(dist: number): string {
            if (GFConduitResourceManager.specailQuickStartIconImageDist.indexOf(dist) > 0) {
                return "comp/btn_kaishi" + dist + ".png"
            } else {
                return "comp/btn_kaishi.png";
            }
        }

        static shouldHideAddGroupInfo() :boolean {
            return NetWorking.distNumber==5;
        }
    }
}