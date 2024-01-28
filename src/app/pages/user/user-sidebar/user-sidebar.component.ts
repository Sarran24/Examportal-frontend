import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css'],
})
export class UserSidebarComponent implements OnInit {
  categories: any;
  user: any;
  constructor(
    private login: LoginService,
    private _category: CategoryService,
    private _snack: MatSnackBar,
    private _rout: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.user = this.login.getUser();
    this._category.categories().subscribe({
      next: (data: any) => {
        this.categories = data;
      },
      error: (error) => {
        this._snack.open('Error is loding categories', '', { duration: 3000 });
      },
    });
  }
}
