import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NormalGuard implements CanActivate {
  constructor(
    private login: LoginService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.login.isLogedin() && this.login.getUserRole() == 'NORMAL') {
      return true;
    } else if (this.login.isLogedin() && this.login.getUserRole() == 'ADMIN') {
      this.router.navigate(['admin']);
      return false;
    } else {
      this.login.logout();
      this.snackBar.open('Session expired, please login again', 'Close');
      this.router.navigate(['login']);
      return false;
    }
  }
}
