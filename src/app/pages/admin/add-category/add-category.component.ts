import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnInit {
  category = {
    title: '',
    description: '',
  };

  constructor(
    private _category: CategoryService,
    private _snack: MatSnackBar
  ) {}
  ngOnInit(): void {}

  formSubmit() {
    if (
      this.category.title.trim() == '' ||
      this.category.title.trim() == null
    ) {
      this._snack.open('Title required', '', { duration: 3000 });
      return;
    }
    this._category.addCategory(this.category).subscribe({
      next: (data: any) => {
        this.category.title = '';
        this.category.description = '';
        Swal.fire('Sucess !!', 'Category is Added', 'success');
      },
      error: (error) => {
        Swal.fire('Error !!', 'Category not Added', 'error');
      },
    });
  }
}
