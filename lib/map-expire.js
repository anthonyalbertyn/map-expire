'use strict';

class MapExpire extends Map {
    constructor(expireMs, expiredItemsCallback) {
      super();
      this.timeouts = {};
      this.expireMs = expireMs;
      this.expiredItemsCallback = expiredItemsCallback;
    }
    set(k, v) {
      if(!k || !v) {
          throw new Error("Lock.set() requires two arguments: k, v");
      }
      if(this.has(k)) {
          this.delete(k);
      }
      super.set(k, v);
      const lock = this;
      this.timeouts[k] = setTimeout(() => {
        lock.removeExpired(k);
      }, this.expireMs);
    }
    get(k){
        if(!k) {
            throw new Error("Lock.get() requires one argument: k");
        }
        this.removeTimeout(k);
        return super.get(k);
    }
    delete(k){
      if(!k) {
        throw new Error("Lock.delete() requires one argument: k");
      }
      this.removeTimeout(k);
      super.delete(k);
    }
    contains(k) {
        if(!k) {
            throw new Error("Lock.contains() requires one argument: k");
        }
        return super.has(k);
    }
    push(k, v) {
        if(k && v) {
            this.set(k, v);
        } else if(k) {
            this.set(k, k);
        } else {
            throw new Error("Lock.push() requires at least one argument");
        }
    }
    remove(k) {
        if(!k) {
            throw new Error("Lock.remove() requires one argument: k");
        }
        this.delete(k);
    }
    removeTimeout(k) {
        if(this.timeouts[k]) {
            clearTimeout(this.timeouts[k]);
        }
    }
    removeExpired(k) {
        if(this.expiredItemsCallback && typeof this.expiredItemsCallback === "function") {
            const v = super.get(k);
            this.expiredItemsCallback(k, v);
        }
        super.delete(k);
    }
}

module.exports = MapExpire;

// For TypeScript
module.exports.default = MapExpire;
