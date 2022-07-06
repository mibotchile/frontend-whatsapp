// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    url_api: "http://localhost:3030/",
    url_websockets: "http://localhost:3003/",

    firebase: {
        apiKey: "AIzaSyDuzZlM_0DdP0DpmrqdQ_OJbywSphVp_Ko",
        authDomain: "valhalla-onbotgo.firebaseapp.com",
        databaseURL: "https://valhalla-onbotgo.firebaseio.com",
        projectId: "valhalla-onbotgo",
        storageBucket: "valhalla-onbotgo.appspot.com",
        messagingSenderId: "842101994443",
        appId: "1:842101994443:web:db05c175c514fec603bc4e",
    },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
