import { OnDestroy } from '@angular/core';

import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export abstract class Unsubscriber implements OnDestroy {
  protected unsubscribe$: Subject<void> = new Subject<void>();

  wrapToUnsubscribe(observable: Observable<any>): Observable<any> {
    return observable.pipe(takeUntil(this.unsubscribe$));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

export class A extends Unsubscriber {

  b$: Observable<any>;

  constructor() {
    super();

    this.wrapToUnsubscribe(this.b$)
      .subscribe((data: any) => {
        console.log(data);
      });
  }

  ngOnDestroy(): void {
    console.log();

    super.ngOnDestroy();
  }
}
