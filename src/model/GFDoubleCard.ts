module model {
    export class GFDoubleCard implements GFSerializable<GFDoubleCard> {

        constructor(public dcid?:string,public multiple?:number, public point?:string){

        }

        deserialize(input){
            if (input){
                this.dcid = input.dcid;
                this.multiple = input.multiple;
                this.point = input.point;
            }
            return this;
        }
        
    }
}