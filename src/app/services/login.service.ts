import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public loginStatusSubject = new Subject<boolean>();
  constructor(private http: HttpClient) {}

  //current user which is loggedin

  public getCurrentUser() {
    return this.http.get(`${baseUrl}/current-user`);
  }

  // generate token
  // take jwt tonken as plain text
  generateToken(loginData: any) {
    console.log('hello');
    return this.http.post(`${baseUrl}/authenticate`, loginData);
  }

  // public generateToken(loginData: any) {
  //   return this.http
  //     .post(`${baseUrl}/authenticate`, loginData, { responseType: 'json' })
  //     .pipe(
  //       map((response: any) => {
  //         console.log(response.token);
  //         return response.token; // extract the token from the JSON response
  //       })
  //     );
  // }

  //Login User: set token in local storage
  public loginUser(token: any) {
    localStorage.setItem('token', token);
    return true;
  }

  // // isLogin: User is Loging or not
  public isLogedin() {
    let tokenString = localStorage.getItem('token');
    // if (tokenString == undefined || tokenString == '' || tokenString == null) {
    if (!tokenString?.trim()?.length) {
      //another way to declare the same above condition

      return false;
    } else {
      return true;
    }
  }
  //log out: remove token from local storaege
  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  // //get token
  public getToken() {
    return localStorage.getItem('token');
  }

  //set user details
  public setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }
  public setUpdateUser(user: any) {
    localStorage.setItem('update-user', JSON.stringify(user));
  }
  // //get user
  public getUser() {
    let userStr = localStorage.getItem('user');
    if (userStr == null) {
      this.logout();
      return null;
    } else {
      return JSON.parse(userStr);
    }
  }
  //Get Update user

  public getUpdateUser() {
    let userStr1 = localStorage.getItem('update-user');
    if (userStr1 == null) {
      this.logout();
      return null;
    } else {
      return JSON.parse(userStr1);
    }
  }
  // //GET USER ROLE
  public getUserRole() {
    let user = this.getUser();
    return user.authorities[0].authority;
  }
}
