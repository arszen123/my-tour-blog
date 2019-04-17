import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {
  private user: firebase.User;

  constructor(private afAuth: AngularFireAuth) {
    this.user = afAuth.auth.currentUser;
  }

  public isAuthenticated(): boolean {
    return this.user !== null;
  }

  public update(user: User) {
    // this.user.
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
