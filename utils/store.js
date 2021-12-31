class MiniStore {
  constructor(store = {}) {
    this.store = store;
  }
  setData(key, value) {
    this.store[key] = value;
  }
  getData(key) {
    return this.store[key];
  }
}

const store = new MiniStore();
export const setData = store.setData.bind(store);

export const getData = store.getData.bind(store);

export default store;
