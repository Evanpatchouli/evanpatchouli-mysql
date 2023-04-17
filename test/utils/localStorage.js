Object.defineProperty(global, 'localStorage', {
    value: {
      store: {},
      setItem(key, value) {
        this.store[key] = value;
      },
      getItem(key) {
        return this.store[key];
      },
      removeItem(key) {
        delete this.store[key];
      },
      getAll(){
        return this.store;
      },
      clear() {
        this.store = {}
      }
    },
    configurable: true,
})
