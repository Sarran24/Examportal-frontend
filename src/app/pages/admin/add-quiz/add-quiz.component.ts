import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css'],
})
export class AddQuizComponent implements OnInit {
  constructor(
    private categoryService: CategoryService,
    private _snack: MatSnackBar,
    private quizService: QuizService
  ) {}
  categories = [
    {
      cid: null,
      title: '',
    },
  ];
  quizData = {
    title: '',
    description: '',
    maxMarks: '',
    noOfQuestion: '',
    active: true,
    category: {
      cid: '',
    },
  };

  ngOnInit(): void {
    this.categoryService.categories().subscribe({
      next: (data: any) => {
        console.log(data);
        this.categories = data;
      },
      error: (error) => {
        Swal.fire('Error !!', 'Error in loading data', 'error');
      },
    });
  }
  addQuiz() {
    if (this.quizData.title.trim() == '' || this.quizData.title == null)
      this._snack.open('Title Required', '', { duration: 3000 });
    if (this.quizData.maxMarks.trim() == '' || this.quizData.maxMarks == null)
      this._snack.open('Marks Required', '', { duration: 3000 });
    if (
      this.quizData.noOfQuestion.trim() == '' ||
      this.quizData.noOfQuestion == null
    )
      this._snack.open('Number of Question Required', '', { duration: 3000 });
    if (this.quizData.category == null)
      this._snack.open('Category Required', '', { duration: 3000 });
    this.quizService.addQuiz(this.quizData).subscribe({
      next: (data: any) => {
        console.log(data);
        Swal.fire(
          'sucessfully done !!',
          'Quiz added sucessfully ' + data.id,
          'success'
        );
        this.quizData = {
          title: '',
          description: '',
          maxMarks: '',
          noOfQuestion: '',
          active: true,
          category: {
            cid: '',
          },
        };
      },
      error: (error) => {
        Swal.fire('Error!!', 'Error while adding quiz', 'error');
        console.log(error);
      },
    });
  }
}
