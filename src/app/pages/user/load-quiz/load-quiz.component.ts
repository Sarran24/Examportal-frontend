import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css'],
})
export class LoadQuizComponent implements OnInit {
  cid: any;
  quiz: any;
  username: any;
  constructor(
    private _route: ActivatedRoute,
    private _quiz: QuizService,
    private _snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    // this.cid = this._route.snapshot.params['catId'];
    this._route.params.subscribe({
      next: (params) => {
        this.cid = params['catId'];
        console.log('this cid is:' + this.cid);
        this.username = params['username'];
        console.log('usename name is:' + this.username);

        if (this.cid == 0 && this.username != null) {
          console.log('load all the quizzes');
          this._quiz.getActiveQuizzes().subscribe({
            next: (data: any) => {
              this.quiz = data;
              console.log(this.quiz);
            },
            error: (data) => {
              this._snack.open('Error', 'Somthing went wrong', {
                duration: 3000,
              });
            },
          });
        } else {
          console.log('load specific quizz');
          this._quiz.getCategoryAndActiveQuiz(this.cid).subscribe({
            next: (data) => {
              this.quiz = data;
            },
            error: (error) => {
              console.log(error);
              Swal.fire('Error', 'Somthing went wrong', 'error');
            },
          });
        }
      },
    });
  }
}
