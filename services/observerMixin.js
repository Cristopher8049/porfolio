export const observerMixin = {
    init() {
        this._observers = new Set();
    },

    subscribe(fn) {
        this._observers.add(fn);
    },

    unsubscribe(fn) {
        this._observers.delete(fn);
    },

    notify() {
        this._observers.forEach(fn => fn());
    }
}