// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  config: {
    firebase: {
      apiKey: 'AIzaSyCdwUX7tV_JpTk-CkKexggQjI5alDX3nPI',
      authDomain: 'my-tour-blog.firebaseapp.com',
      databaseURL: 'https://my-tour-blog.firebaseio.com',
      projectId: 'my-tour-blog',
      storageBucket: 'my-tour-blog.appspot.com',
      messagingSenderId: '396189472657'
    },
    google_maps_api_key: 'AIzaSyBiLO-4gqH4IFqVhTEK9nyB5e683joDi3g'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
