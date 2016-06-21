import { Component, OnInit } from '@angular/core';
import { ExampleService } from '../shared/services/';
import { Example } from '../shared/models/';

@Component({
  selector: 'app-home',
  providers: [ExampleService],
  styleUrls: ['home.component.css' ],
  templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {
  examples: Example[];
  title = 'Home';

  constructor(private exampleService: ExampleService) {}

  ngOnInit() {
    this.examples = [];
    this.exampleService.getExamples()
      .subscribe(examples => this.examples = examples);
  }

}
