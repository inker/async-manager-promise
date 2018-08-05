import AsyncManager from 'async-manager';
declare class AsyncManagerPromise<OutputType, Id = any> {
    protected manager: AsyncManager<OutputType, Id>;
    getPromise(id: Id): Promise<OutputType>;
    getPromiseWithId(onInit?: (id: string) => void): Promise<OutputType>;
    resolve(id: Id, data: OutputType): void;
    reject(id: Id, err: any): void;
}
export default AsyncManagerPromise;
