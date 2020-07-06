const DB_NAME = 'stringdb'
const STORAGE_NAME = 'strings'
const DB_VERSION = 1
let DB

export default {
  async getObjectStoreCount() {
    const objectStore = await this.getObjectStore()

    return new Promise((resolve, reject) => {
      const countRequest = objectStore.count()

      countRequest.onsuccess = e => {
        resolve(e.target.result)
      }
      countRequest.onerror = e => reject(e)
    })
  },
  async getObjectStore() {
    const db = await this.getDb(),
      tx = db.transaction([STORAGE_NAME], 'readwrite'),
      objectStore = tx.objectStore(STORAGE_NAME)

    return objectStore
  },
  async clearDB() {
    const objectStore = await this.getObjectStore()

    return new Promise((resolve, reject) => {
      const req = objectStore.clear()

      req.onsuccess = function (e) {
        resolve(e)
        console.log("Object store cleared successfuly");
      }
      req.onerror = function (e) {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject(e)
        console.log("Object store couldn't be cleared");
      }
      req.onblocked = function (e) {
        reject(e)
        console.log("Couldn't clear object store due to the operation being blocked");
      }
    })
  },
  async getDb () {
    return new Promise((resolve, reject) => {
      if (DB) {
        return resolve(DB)
      }
      const request = window.indexedDB.open(DB_NAME, DB_VERSION)
      request.onerror = e => {
        console.log('Error opening db', e)
        // eslint-disable-next-line prefer-promise-reject-errors
        reject('Error')
      }
      request.onsuccess = e => {
        DB = e.target.result
        resolve(DB)
      }
      request.onupgradeneeded = e => {
        let db = e.target.result
        db.createObjectStore(STORAGE_NAME, { autoIncrement: true, keyPath: 'id' })
      }
    })
  },
  async getStrings (text) {
    let db = await this.getDb()
    return new Promise(resolve => {
      let trans = db.transaction([STORAGE_NAME], 'readonly')
      trans.oncomplete = () => {
        resolve(numberOfStrings)
      }
      const store = trans.objectStore(STORAGE_NAME)
      let numberOfStrings = 0
      store.openCursor().onsuccess = e => {
        const cursor = e.target.result
        if (cursor) {
          cursor.value.forEach(value => {
            if (value.startsWith(text)) numberOfStrings++;
          })
          cursor.continue()
        }
      }
    })
  },
  async saveString (string) {
    let db = await this.getDb()
    return new Promise(resolve => {
      let trans = db.transaction([STORAGE_NAME], 'readwrite')
      trans.oncomplete = () => {
        resolve()
      }
      let store = trans.objectStore(STORAGE_NAME)
      store.put(string)
    })
  }
}
