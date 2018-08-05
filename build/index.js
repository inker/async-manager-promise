import AsyncManager from 'async-manager';
class AsyncManagerPromise {
    constructor() {
        this.manager = new AsyncManager();
    }
    getPromise(id) {
        const promise = new Promise(async (resolve, reject) => {
            this.manager.add(id, (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        });
        return promise;
    }
    getPromiseWithId(onInit) {
        const promise = new Promise(async (resolve) => {
            const id = this.manager.addAndGetId(resolve);
            if (onInit) {
                onInit(id);
            }
        });
        return promise;
    }
    resolve(id, data) {
        this.manager.resolve(id, data);
    }
    reject(id, err) {
        this.manager.reject(id, err);
    }
}
export default AsyncManagerPromise;
//# sourceMappingURL=index.js.map