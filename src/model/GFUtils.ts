module model {
    /**
     * GFUtils
     */
    class GFUtils {
        constructor() {
        }

        public getStrNumber(num: number): String {
            if (num < 10000)
                return "" + num;
            else
                return "" + num / 10000 + "万";
        }
    }

    export function getStrNumber(num: number): String {
        return new GFUtils().getStrNumber(num);
    }
}