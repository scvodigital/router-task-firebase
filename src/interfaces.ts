import * as firebase from 'firebase-admin';

export interface FirebaseAppConfigurations {
  [name: string]: FirebaseAppConfiguration;
}

export interface FirebaseAppConfiguration {
  credential: firebase.ServiceAccount;
  databaseURL: string;
}

export interface FirebaseApps { [name: string]: firebase.app.App; }
