import {Injectable} from '@angular/core';
import {User} from '@app-root/models/User';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(
    private store: AngularFirestore,
    private storage: AngularFireStorage
  ) {
  }

  /**
   * Get user by uid
   */
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

  /**
   * Get user data
   */
  private getUserData(uid): any {
    return new Promise((resolve) => {
      this.store.doc(`/users/${uid}`).ref.get().then(value => {
        return resolve(value.data());
      });
    });
  }

  /**
   * Save user data
   */
  public async save({
                      photoURL,
                      file,
                      isFileChanged,
                      user
                    }) {
    if (file !== null && isFileChanged) {
      photoURL = `/users/${user.uid}/avatar`;
      await this.storage.upload(photoURL, file);
    }
    if (file === null && isFileChanged) {
      photoURL = null;
      await this.storage.ref(`/users/${user.uid}/avatar`).delete();
    }
    return await this.store.doc(`/users/${user.uid}`).update({
      displayName: user.displayName,
      info: user.info,
      photoURL,
    });
  }
}
