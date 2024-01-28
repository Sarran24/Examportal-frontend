import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  public user = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    email: '',
    phone: '',
  };

  ngOnInit(): void {}

  formsubmit() {
    console.log(this.user);
    if (this.user.username == '' || this.user.username == null) {
      // alert('user name cant be null');
      // this.snackBar.open("username can't be null", 'ok');
      this.snackBar.open("username can't be null", '', { duration: 3000 });

      return;
    }
    //adduser: userService
    this.userService.addUser(this.user).subscribe({
      next: (data: any) => {
        console.log(data);
        // alert('success');
        // Swal.fire('sucess', 'user is registered', 'success');
        Swal.fire(
          'sucessfully done !!',
          'user is registered with id ' + data.id,
          'success'
        );
      },
      error: (error) => {
        console.log(error);
        // alert('something went wrong');
        this.snackBar.open('somthing went wrong', '', { duration: 3000 });
      },
    });
  }
}
