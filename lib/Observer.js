export class Observer {
    constructor (handlers) {
      const callbacks = []
      const data = {
        add_callback: function add_callback (fn) {
          callbacks.push(fn)
        }
      }
  
      const proxy = new Proxy(data, {
        set: function (target, property, value) {
          target[property] = value
          callbacks.forEach((callback) => callback())
          return true
        }
      })
      
      return proxy 
    }
  }