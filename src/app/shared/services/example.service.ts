import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Example } from '../models';

@Injectable()
export class ExampleService {
  private API_PATH: string = 'http://swapi.co/api/films/';

  constructor(private http: Http) {}

  getExamples(): Observable<Example[]> {
    return this.http.get(`${this.API_PATH}`)
      .map((response: Response) => <Example[]>response.json().results);
  }

  getExample(id: number): Observable<Example> {
    return this.http.get(`${this.API_PATH}/${id}`)
      .map((response: Response) => <Example>response.json());
  }
}
