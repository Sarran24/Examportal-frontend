import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instruction',
  templateUrl: './instruction.component.html',
  styleUrls: ['./instruction.component.css'],
})
export class InstructionComponent implements OnInit {
  qid: any;
  quiz: any;
  username: any;

  constructor(
    private _route: ActivatedRoute,
    private _quizService: QuizService,
    private _snack: MatSnackBar,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qid'];
    this.username = this._route.snapshot.params['username'];
    console.log(this.qid);
    this._quizService.getById(this.qid).subscribe({
      next: (data) => {
        this.quiz = data;
        console.log(data);
      },
      error: (error) => {
        console.log(error);
        this._snack.open('error in loading data', '', { duration: 3000 });
      },
    });
  }
  public startquiz() {
    Swal.fire({
      title: 'Do you want to start the quiz?',
      showCancelButton: true,
      confirmButtonText: 'Start',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this._router.navigate([
          '/start-quiz/' + this.quiz.qid + '/' + this.username,
        ]);
      } else if (result.isDenied) {
        Swal.fire('Quiz will not start', '', 'error');
      }
    });
  }
}
