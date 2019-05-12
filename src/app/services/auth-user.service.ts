import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {
  private readonly user: firebase.User;

  constructor(private afAuth: AngularFireAuth) {
    this.user = afAuth.auth.currentUser;
  }

  public isAuthenticated(): boolean {
    return this.user !== null;
  }

  public getUserId() {
    return this.isAuthenticated() ? this.user.uid : null;
  }

  public getUser() {
    return this.user;
  }

  public logout() {
    this.afAuth.auth.signOut();
  }
}
