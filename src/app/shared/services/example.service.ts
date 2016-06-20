import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Example } from '../models';

@Injectable()
export class ExampleService {
  private API_PATH: string = 'https://example-api.com/api';

  constructor(private http: Http) {}

  searchExample(queryTitle: string): Observable<Example[]> {
    return this.http.get(`${this.API_PATH}?q=${queryTitle}`)
      .map(res => res.json().items);
  }

  retrieveExample(Id: string): Observable<Example> {
    return this.http.get(`${this.API_PATH}/${Id}`)
      .map(res => res.json());
  }
}
