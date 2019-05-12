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

  logout() {
    this.afAuth.auth.signOut();
  }
}
