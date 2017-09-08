module model {
    export interface GFSerializable<T> {
        deserialize(input:Object):T;
    }
}