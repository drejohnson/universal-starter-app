import { Injectable } from '@angular/core';
import { AUTH_PROVIDERS, tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';

// Avoid name not found warnings
declare const Auth0Lock: any;

@Injectable()
export class AuthService {
  cid = 'j3pmDdwu0lm0llytEVxiX0pCiwQpNTzu';
  domain = 'phreshr.auth0.com';
  options = {
    theme: {
      logo: 'http://googledrive.com/host/0BxUhGtdGCEnJTFYydXczdm9qM2s',
      primaryColor: '#1c1c1c'
    },
    connections: ['facebook', 'google-oauth2'],
    socialBigButtons: true,
    primaryColor: '#1c1c1c',
    languageDictionary: {
      title: 'Log In'
    }
  };
  // Configure Auth0
  lock = new Auth0Lock(this.cid, this.domain, this.options);
  // Store profile object in auth class
  userProfile: any;
  constructor(private router: Router) {
    // Set userProfile attribute if already saved profile
    this.userProfile = JSON.parse(localStorage.getItem('profile'));
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', (authResult) => {
      localStorage.setItem('id_token', authResult.idToken);

      // Fetch profile information
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          // Handle error
          alert(error);
          return;
        }

        localStorage.setItem('profile', JSON.stringify(profile));
        this.userProfile = profile;

        // Redirect if there is a saved url to do so.
        const redirectUrl: string = localStorage.getItem('redirect_url');
        if (redirectUrl !== undefined) {
          this.router.navigate([redirectUrl]);
          localStorage.removeItem('redirect_url');
        }
      });
    });
  }

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  };

  public authenticated() {
    // Check if there's an unexpired JWT
    // It searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  };

  public isAdmin() {
    return this.userProfile && this.userProfile.app_metadata
      && this.userProfile.app_metadata.roles
      && this.userProfile.app_metadata.roles.indexOf('admin') > -1;
  }

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    this.userProfile = undefined;
    this.router.navigate(['']);
  };
}

export const APP_AUTH_PROVIDERS = [
  AUTH_PROVIDERS,
  AuthService
];
