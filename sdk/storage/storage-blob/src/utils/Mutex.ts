// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

enum MutexLockStatus {
  LOCKED,
  UNLOCKED,
}

type Callback = (...args: any[]) => any;

/**
 * An async mutex lock.
 */
export class Mutex {
  /**
   * Lock for a specific key. If the lock has been acquired by another customer, then
   * will wait until getting the lock.
   *
   * @param key - lock key
   */
  public static async lock(key: string): Promise<void> {
    return new Promise<void>((resolve) => {
      if (this.keys[key] === undefined || this.keys[key] === MutexLockStatus.UNLOCKED) {
        this.keys[key] = MutexLockStatus.LOCKED;
        resolve();
      } else {
        this.onUnlockEvent(key, () => {
          this.keys[key] = MutexLockStatus.LOCKED;
          resolve();
        });
      }
    });
  }

  /**
   * Unlock a key.
   *
   * @param key -
   */
  public static async unlock(key: string): Promise<void> {
    return new Promise<void>((resolve) => {
      if (this.keys[key] === MutexLockStatus.LOCKED) {
        this.emitUnlockEvent(key);
      }
      delete this.keys[key];
      resolve();
    });
  }

  private static keys: { [key: string]: MutexLockStatus } = {};
  private static listeners: { [key: string]: Callback[] } = {};

  private static onUnlockEvent(key: string, handler: Callback) {
    if (this.listeners[key] === undefined) {
      this.listeners[key] = [handler];
    } else {
      this.listeners[key].push(handler);
    }
  }

  private static emitUnlockEvent(key: string) {
    if (this.listeners[key] !== undefined && this.listeners[key].length > 0) {
      const handler = this.listeners[key].shift();
      setImmediate(() => {
        handler!.call(this);
      });
    }
  }
}
