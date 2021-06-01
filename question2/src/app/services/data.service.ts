import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _categories$ = new BehaviorSubject<string[]>([])

  get categories$() {
    return this._categories$.asObservable();
  }

  constructor(private http: HttpClient) { }

  getCategories(): void {
    this.http.get<string[]>('https://api.publicapis.org/categories')
      .subscribe(
        res => {
          this._categories$.next(res)
        },
        err => {
          this._categories$.next(err)
        }
      )
  }
}
