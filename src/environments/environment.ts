// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {

  production: false,

  /**
   * Variable que indica la URL de la API.
   */
  HOST: 'http://18.230.178.121:8081/api',
  REALHOST: 'http://18.230.178.121',
  URLPHOTOS: 'http://18.230.178.121:8081',
  URLPHOTOS2: 'http://18.230.178.121:8081',
  REINTENTOS: 2,

  /**
   * Variable que indica el token.
   */
  TOKEN: 'access_token'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
