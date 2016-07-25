import {
  Component,
  OnInit,
  Inject
} from '@angular/core';

import {
  Apollo
} from 'angular2-apollo';

import gql from 'graphql-tag';

import { client } from '../app.client.ts';

import { SwapiService } from '../shared';
import { Swapi } from '../shared/models/';

const query = gql`
  query getString {
    testString
  }
`;

@Component({
  selector: 'app-home',
  providers: [ SwapiService ],
  styleUrls: ['home.component.css' ],
  templateUrl: 'home.component.html'
})
@Apollo({
  client,
  queries() {
    return {
      data: { query },
    };
  }
})
export class HomeComponent implements OnInit {
  swapi: Swapi[];
  data: any;
  title = 'Home';

  constructor(
    private swapiService: SwapiService) {}

  ngOnInit() {
    this.swapi = [];
    this.swapiService.getAll()
      .subscribe(swapi => this.swapi = swapi);

    setTimeout(() => {
      console.log('string:', this.data);
    }, 250);
  }

}
