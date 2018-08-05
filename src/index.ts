import AsyncManager from 'async-manager'

class AsyncManagerPromise<OutputType, Id = any> {
  protected manager = new AsyncManager<OutputType, Id>()

  getPromise(id: Id) {
    const promise = new Promise<OutputType>(async (resolve) => {
      this.manager.add(id, resolve)
    })

    return promise
  }

  getPromiseWithId(onInit?: (id: string) => void) {
    const promise = new Promise<OutputType>(async (resolve) => {
      const id = this.manager.addAndGetId(resolve)
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
