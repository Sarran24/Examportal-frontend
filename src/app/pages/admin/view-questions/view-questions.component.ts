import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionServiceService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css'],
})
export class ViewQuestionsComponent implements OnInit {
  qid = null;
  qTitle = null;
  questions = [
    {
      quesId: null,
      content: null,
      image: null,
      answer: null,
      option1: null,
      option2: null,
      option3: null,
      option4: null,
      quiz: null,
    },
  ];
  constructor(
    private _route: ActivatedRoute,
    private _question: QuestionServiceService
  ) {}

  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];
    // alert(this.qTitle);
    this._question.getQuestionsOfQuiz(this.qid).subscribe({
      next: (data: any) => {
        this.questions = data;
        console.log(data);
      },
      error: (error) => {
        console.log(error);
        Swal.fire('Error', 'Somthing went wrong', 'error');
      },
    });
  }
  deletequestion(qid: any) {
    Swal.fire({
      icon: 'info',
      title: 'Are you sure ?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this._question.deleteQuestion(qid).subscribe({
          next: (data: any) => {
            this.questions = this.questions.filter(
              (questions) => questions.quesId != qid
            );
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
