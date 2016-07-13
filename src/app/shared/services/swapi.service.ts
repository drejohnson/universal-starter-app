import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { Swapi } from '../models';

@Injectable()
export class SwapiService {
  private API_PATH: string = 'http://swapi.co/api/films/';

  constructor(private http: Http) {}

  getAll(): Observable<Swapi[]> {
    return this.http.get(`${this.API_PATH}`)
      .map((response: Response) => <Swapi[]>response.json().results);
  }

  getById(id: number): Observable<Swapi[]> {
    return this.http.get(`${this.API_PATH}/${id}`)
      .map((response: Response) => <Swapi[]>response.json());
  }

}
