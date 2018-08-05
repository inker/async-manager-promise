import AsyncManager from 'async-manager';
const errCbToPromiseExecutor = (resolve, reject) => (err, data) => {
    if (err) {
        reject(err);
    }
    else {
        resolve(data);
    }
};
class AsyncManagerPromise {
    constructor() {
        this.manager = new AsyncManager();
    }
    getPromise(id) {
        const promise = new Promise(async (resolve, reject) => {
            const cb = errCbToPromiseExecutor(resolve, reject);
            this.manager.add(id, cb);
        });
        return promise;
    }
    getPromiseWithId(onInit) {
        const promise = new Promise(async (resolve, reject) => {
            const cb = errCbToPromiseExecutor(resolve, reject);
            const id = this.manager.addAndGetId(cb);
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