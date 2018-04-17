import * as firebase from 'firebase-admin';

export interface FirebaseAppConfigurations {
  [name: string]: FirebaseAppConfiguration;
}

export interface FirebaseAppConfiguration {
  projectId: string;
  clientEmail: string;
  privateKey: string;
  databaseURL: string;
}

export interface FirebaseApps { [name: string]: firebase.app.App; }
