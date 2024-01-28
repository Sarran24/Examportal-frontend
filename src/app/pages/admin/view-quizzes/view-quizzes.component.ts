import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css'],
})
export class ViewQuizzesComponent implements OnInit {
  quizzes = [
    {
      qid: '',
      title: '',
      description: '',
      maxMarks: '',
      noOfQuestion: '',
      active: '',
      category: {
        title: '',
      },
    },
  ];

  constructor(private _quiz: QuizService) {}

  ngOnInit(): void {
    this._quiz.quizzes().subscribe({
      next: (data: any) => {
        this.quizzes = data;
        console.log(data);
      },
      error: (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Error in loading data', 'error');
      },
    });
  }

  deletequiz(qid: any) {
    Swal.fire({
      icon: 'info',
      title: 'Are you sure ?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this._quiz.deleteQuiz(qid).subscribe({
          next: (data: any) => {
            this.quizzes = this.quizzes.filter((quiz) => quiz.qid != qid);
            Swal.fire('Sucess', 'Quiz deleted sucessfully', 'success');
          },
          error: (error) => {
            Swal.fire('Error !!', 'Somthing went wrong', 'error');
          },
        });
      }
    });
  }
}
