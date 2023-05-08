// // Import the functions you need from the SDKs you need
// import { initializeApp, getApps, FirebaseApp } from "firebase/app";
// import { getAnalytics, isSupported } from "firebase/analytics";

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//   measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
// };

// console.log(firebaseConfig)

// let firebaseApp = FirebaseApp;

// // Initialize Firebase
// // const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
// // const analyticsMock = {
// //     logEvent: () => {},
// //     setCurrentScreen: () => {},
// //     setUserId: () => {},
// // }
// //const analytics = isSupported() ? getAnalytics(app) : analyticsMock;
// //const analytics = isSupported().then(yes => yes ? getAnalytics(app) : analyticsMock);

// // サーバーサイドでレンダリングするときにエラーが起きないようにするための記述
// if (typeof window !== "undefined" && !getApps().length) {
//     firebaseApp = initializeApp(firebaseConfig);
// }
// export { firebaseApp };