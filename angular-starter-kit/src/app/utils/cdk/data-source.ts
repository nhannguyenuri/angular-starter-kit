import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';

export class CdkDataSource<T> extends DataSource<T> {
  data = new BehaviorSubject<T[]>([]);

  connect(): Observable<T[]> {
    return this.data;
  }

  disconnect() {
    this.data.next([]);
    this.data.complete();
  }
}
