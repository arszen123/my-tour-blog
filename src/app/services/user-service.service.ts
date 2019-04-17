import {Injectable} from '@angular/core';
import {User} from '../models/User';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private user: firebase.User;

  constructor(
    private auth: AngularFireAuth,
    private store: AngularFirestore,
    private storage: AngularFireStorage
  ) {
    this.user = auth.auth.currentUser;
  }

  public async getUser(uid: string): Promise<User | null> {
    const data = await this.getUserData(uid);
    let photoURL = data.photoURL;
    if (photoURL === null || photoURL.search(/(http(s|):|www\.)\/\//) === -1) {
      await (this.storage.ref(`/users/${uid}/avatar`).getDownloadURL().toPromise().then(k => photoURL = k).catch(() => photoURL = null));
    }
    return {
      uid,
      displayName: data.displayName,
      info: data.info,
      photoURL,
      email: data.email
    };
  }

  public getUserData(uid): any {
    return new Promise((resolve) => {
      this.store.doc(`/users/${uid}`).ref.get().then(value => {
        return resolve(value.data());
      });
    });
  }
}
