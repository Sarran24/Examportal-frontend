import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css'],
})
export class UpdateQuizComponent implements OnInit {
  qId = null;
  quiz = {
    title: '',
    description: '',
    maxMarks: '',
    noOfQuestion: '',
    active: true,
    category: {
      cid: '',
    },
  };
  categories = [
    {
      cid: null,
      title: '',
    },
  ];
  constructor(
    private _route: ActivatedRoute,
    private _quizService: QuizService,
    private categoryService: CategoryService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    // alert(this.qId);

    this.categoryService.categories().subscribe({
      next: (data: any) => {
        console.log(data);
        this.categories = data;
      },
      error: (error) => {
        Swal.fire('Error !!', 'Error in loading data', 'error');
      },
    });

    this._quizService.getById(this.qId).subscribe({
      next: (data: any) => {
        this.quiz = data;
        console.log(this.quiz);
      },
      error: (error) => {
        console.log(error);
        Swal.fire('Error', 'Somthing went wrong', 'error');
      },
    });
  }

  public updateQuiz() {
    this._quizService.updateQuiz(this.quiz).subscribe({
      next: (data: any) => {
        Swal.fire('Updated', 'Quiz has been updated', 'success').then((e) => {
          this._router.navigate(['/admin/quizzes']);
        });
      },
      error: (error) => {
        console.log(error);
        Swal.fire('Error', 'Somthing went wrong', 'error');
      },
    });
  }
}
