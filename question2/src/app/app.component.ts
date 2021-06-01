import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, merge, Observable, Subject } from 'rxjs';
import { map, takeUntil, withLatestFrom } from 'rxjs/operators';
import { DataService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private _destroy$ = new Subject()
  private _lookupText$ = new BehaviorSubject('')
  private _caterogies$: Observable<string[]>

  get lookupText$() {
    return this._lookupText$.asObservable()
  }

  get caterogies$() {
    return this._caterogies$;
  }

  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this._caterogies$ = merge(
      this._lookupText$,
      this._dataService.categories$
    ).pipe(
      takeUntil(this._destroy$),
      withLatestFrom(
        this._lookupText$,
        this._dataService.categories$
      ),
      map(([_, lookupText, categories]) => {
        if (lookupText) {
          return categories.filter(category => category?.toLowerCase?.().includes?.(lookupText?.toLowerCase?.()) || false)
        } else {
          return categories;
        }
      })
    )

    this._dataService.getCategories();
  }

  ngOnDestroy() {
    this._destroy$.next()
    this._destroy$.complete()
  }

  onLookupTextChange(lookupText: string) {
    this._lookupText$.next(lookupText);
  }
}
