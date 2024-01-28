import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginData = {
    username: '',
    password: '',
  };

  passwordField: string = 'password';

  constructor(
    private snack: MatSnackBar,
    private login: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.login.isLogedin()) {
      if (this.login.getUserRole() == 'ADMIN') {
        this.router.navigate(['/admin']);
      } else if (this.login.getUserRole() == 'NORMAL') {
        this.router.navigate(['/user']);
      }
    }
  }

  formSubmit() {
    console.log('login btn clicked');

    if (
      this.loginData.username.trim() == '' ||
      this.loginData.username == null
    ) {
      this.snack.open('Username is required', '', {
        duration: 3000,
      });
      return;
    }

    if (
      this.loginData.password.trim() == '' ||
      this.loginData.password == null
    ) {
      this.snack.open('Password is required', '', {
        duration: 3000,
      });
      return;
    }

    //request to server to generate token

    this.login.generateToken(this.loginData).subscribe({
      next: (data: any) => {
        console.log('sucess');
        console.log(data);
        //login store token in local storage and user details too.

        this.login.loginUser(data.token);
        this.login.getCurrentUser().subscribe((user: any) => {
          this.login.setUser(user);
          console.log(user);
          //redirect ...ADMIN:admin-dashboard
          //redirect ...NORMAL: normal-dashboard
          if (this.login.getUserRole() == 'ADMIN') {
            //admin dashboard
            // window.location.href = '/admin';
            this.router.navigate(['/admin']);
            this.login.loginStatusSubject.next(true);
          } else if (this.login.getUserRole() == 'NORMAL') {
            //normal user dashboard
            // window.location.href = '/user';
            this.router.navigate(['/user/0' + '/' + this.loginData.username]);
            this.login.loginStatusSubject.next(true);
          } else {
            this.login.logout();
          }
        });
      },
      error: (error) => {
        console.log(error);
        console.log('Error');
        this.snack.open('Invalid Details !! Try Again', '', {
          duration: 3000,
        });
      },
    });
  }

  togglePasswordVisibility() {
    if (this.passwordField === 'password') {
      this.passwordField = 'text';
    } else {
      this.passwordField = 'password';
    }
  }
}
