import AsyncManager from 'async-manager'

const errCbToPromiseExecutor = (resolve, reject) =>
  (err, data) => {
    if (err) {
      reject(err)
    } else {
      resolve(data)
    }
  }

class AsyncManagerPromise<OutputType, Id = any> {
  protected manager = new AsyncManager<OutputType, Id>()

  getPromise(id: Id) {
    const promise = new Promise<OutputType>(async (resolve, reject) => {
      const cb = errCbToPromiseExecutor(resolve, reject)
      this.manager.add(id, cb)
    })

    return promise
  }

  getPromiseWithId(onInit?: (id: string) => void) {
    const promise = new Promise<OutputType>(async (resolve, reject) => {
      const cb = errCbToPromiseExecutor(resolve, reject)
      const id = this.manager.addAndGetId(cb)

      if (onInit) {
        onInit(id)
      }
    })

    return promise
  }

  resolve(id: Id, data: OutputType) {
    this.manager.resolve(id, data)
  }

  reject(id: Id, err: any) {
    this.manager.reject(id, err)
  }
}

export default AsyncManagerPromise
