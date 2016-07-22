import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { graphql } from 'graphql';
import { AuthService } from '../shared';

@Component({
  moduleId: __filename,
  selector: 'app-login',
  providers: [ AuthService ],
  directives: [ ROUTER_DIRECTIVES ],
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit() {
    console.log(this.auth);
  }

}
