import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
  }

  store(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  private get<T>(key: string, transformer: (value: string) => T): T {
    let value: string = localStorage.getItem(key);
    return value == null ? null : transformer(value);
  }

  getString(key: string): string {
    return this.get(key, s => s.toString());
  }

  getObject<T>(key: string): T {
    return this.get(key, JSON.parse)
  }

  getInt(key: string): number {
    return this.get(key, parseInt)
  }

  getBoolean(key: string): boolean {
    return this.get(key, s => s == 'true' ? true : false)
  }
}
