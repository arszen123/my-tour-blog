import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
admin.initializeApp();
export const saveUserData = functions.auth.user().onCreate((user) => {
  admin.firestore().doc(`/users/${user.uid}`).set({
    displayName: user.displayName,
    info: '',
    photoURL: user.photoURL,
    email: user.email,
    phoneNumber: user.phoneNumber,
    uid: user.uid
  });
  return user;
});
