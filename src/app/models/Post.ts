import * as firebase from 'firebase';

export interface Post {
  id?: string;
  title: string;
  content: string;
  images: Array<string> | FileList;
  location: firebase.firestore.GeoPoint;
  uid?: string;
}
