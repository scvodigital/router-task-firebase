import * as firebase from 'firebase-admin';
export interface FirebaseAppConfigurations {
    [name: string]: FirebaseAppConfiguration;
}
export interface FirebaseAppConfiguration {
    credential: {
        type: string;
        project_id: string;
        private_key_id: string;
        private_key: string;
        client_email: string;
        client_id: string;
        auth_uri: string;
        token_uri: string;
        auth_provider_x509_cert_url: string;
        client_x509_cert_url: string;
    };
    databaseURL: string;
}
export interface FirebaseApps {
    [name: string]: firebase.app.App;
}
