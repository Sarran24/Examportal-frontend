import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { LoginService } from 'src/app/services/login.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user = {
    firstName: '',
    username: '',
    lastName: '',
    email: '',
    phone: '',
    profile: '',
    authorities: [0] as any[''], // set authorities to an empty array of any type
    id: '',
    enabled: true,
  };

  updateUser: any = null;
  profileImage: any;
  constructor(
    private login: LoginService,
    private _imageService: ImageService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.login.getCurrentUser().subscribe({
      next: (user: any) => {
        this.user = user;
        console.log(user);
        this.showProfileImage();
      },
      error: (err: any) => {
        alert('Error fetching user data.');
      },
    });
  }

  // ngOnInit(): void {
  //   // this.user = this.login.getUser();
  //   // console.log(this.user);
  //   this.login.getCurrentUser().subscribe(
  //     (user:any)=>{                              in this subscribe is depricated
  //     this.user =user
  //     },(error)=>{
  //       alert('error')
  //     }
  //   )
  // }

  // ngOnInit(): void {
  //   this.user = this.login.getUser();
  //   console.log(this.user);
  //   // this.updateUser = localStorage.getItem('update-user');
  //   // console.log(this.updateUser);
  //   // this.updateUser = this.login.getUpdateUser();
  //   // console.log(this.updateUser);
  //   this.showProfileImage();

  //   // this.login.getCurrentUser().subscribe({
  //   //   next: (user: any) => {
  //   //     this.user = user;
  //   //   },
  //   //   error: (err: any) => {
  //   //     alert('error');
  //   //   },
  //   // });
  // }

  showProfileImage() {
    this._imageService
      .downloadImage(this.user.profile)
      .subscribe((imageData: ArrayBuffer) => {
        const urlCreator = window.URL || window.webkitURL;
        const imageUrl = urlCreator.createObjectURL(new Blob([imageData]));
        this.profileImage = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
        console.log('Image loaded successfully');
      });
  }
}
