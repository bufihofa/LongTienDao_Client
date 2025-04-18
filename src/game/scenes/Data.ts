//tạo singleton Data
export default class Data {
    private static instance: Data;

    db: IDBDatabase | null;
    dbName: string;
    dbVersion: number;
    currentMap: number;
    
    private constructor() {}
    public static getInstance(): Data {
        if (!Data.instance) {
            Data.instance = new Data();
        }
        return Data.instance;
    }



    public count: number = 0;

}