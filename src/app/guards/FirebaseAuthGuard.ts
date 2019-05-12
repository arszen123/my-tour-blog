import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthUserService} from '@app-root/services/auth-user.service';

@Injectable({providedIn: 'root'})
export class FirebaseAuthGuard implements CanActivate {
  constructor(private auth: AuthUserService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.isAuthenticated()) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }

}
