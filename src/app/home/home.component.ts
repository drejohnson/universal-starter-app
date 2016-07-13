import { Component, OnInit } from '@angular/core';
import { SwapiService } from '../shared';
import { Swapi } from '../shared/models/';

@Component({
  selector: 'app-home',
  providers: [SwapiService],
  styleUrls: ['home.component.css' ],
  templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {
  swapi: Swapi[];
  title = 'Home';

  constructor(private swapiService: SwapiService) {}

  ngOnInit() {
    this.swapi = [];
    this.swapiService.getAll()
      .subscribe(swapi => this.swapi = swapi);
  }

}
