import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isloggedIn = false;
  user: any = null;

  constructor(public login: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.isloggedIn = this.login.isLogedin();
    this.user = this.login.getUser();
    this.login.loginStatusSubject.asObservable().subscribe((data) => {
      this.isloggedIn = this.login.isLogedin();
      this.user = this.login.getUser();
      console.log('role is:' + this.user.authorities[0].authority);
    });
  }

  public logout() {
    this.login.logout();

    // window.location.reload();

    this.login.loginStatusSubject.next(false);
    this.router.navigate(['/login']);
  }
}
