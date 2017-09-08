module model {
    class GFColor {
        private static colorArray:Array<string> = [
            "#fff193",//1号色
            "#ffcc19",
            "#65e3b1",
            "#5dcd31",
            "#93b9ff",
            "#721e01",
            "#ffffff",
            "#ffffff",
            "#ffffff",
            "#ffffff",
            "#ffffff",
            "#000000"
        ];
        constructor() {

        }
        public getColorWithNumber(colorNumber: number): string {
            return GFColor.colorArray[colorNumber];
        }
    }
    export function getColorWithNumber(colorNumber:number):string {
        let colorFactory = new GFColor();
        return colorFactory.getColorWithNumber(colorNumber-1);
    }
}