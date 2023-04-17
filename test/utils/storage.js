Object.defineProperty(global, 'storage', {
    value: {
      set(key, value){
        localStorage.setItem(key, value);
      },
      get : (key) => {
        return localStorage.getItem(key);
      },
      del : (key) => {
        localStorage.removeItem(key); 
      },
      getAll : () => {
        return localStorage.getAll();
      },
    },
    configurable: true,
})
