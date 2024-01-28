import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from 'src/app/services/image.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-admin',
  templateUrl: './update-admin.component.html',
  styleUrls: ['./update-admin.component.css'],
})
export class UpdateAdminComponent implements OnInit {
  user1: any;
  user = {
    firstName: '',
    username: '',
    lastName: '',
    email: '',
    phone: '',
    profile: '',
    authorities: '',
    id: '',
    enabled: true,
  };

  file!: any;
  constructor(
    private _userService: UserService,
    private snackBar: MatSnackBar,
    private _route: ActivatedRoute,
    private _loginService: LoginService,
    private _imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.user1 = this._loginService.getUser();
    this.user.username = this._route.snapshot.params['username'];
    console.log(this.user.username);
  }

  formSubmit() {
    this.uploadPhoto(this.file);
    this._userService.updateUser(this.user).subscribe({
      next: (data: any) => {
        console.log(data);
        this.user.authorities = this.user1.authorities;
        this.user.id = this.user1.id;
        this.user.username = this.user1.username;
        this.user.enabled = this.user.enabled;

        localStorage.setItem('user', JSON.stringify(this.user));
        console.log(this.user);

        Swal.fire(
          'sucessfully done !!',
          'user has been updated with id ' + data.id,
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
  onFileSelected(event: any) {
    // console.log(event.target.files[0]);
    this.file = event.target.files[0];
    this.user.profile = this.file.name;
    console.log(this.user.profile);

    console.log(this.file);
  }
  uploadPhoto(file: File) {
    console.log('image start uploading');

    const formData = new FormData();
    formData.append('image', file);

    this._imageService.uploadImage(formData).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
