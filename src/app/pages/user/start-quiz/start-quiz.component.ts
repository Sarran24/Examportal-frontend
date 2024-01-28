import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionServiceService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import axios from 'axios';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css'],
})
export class StartQuizComponent implements OnInit {
  randomLong = () => {
    return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
  };

  resultId = this.randomLong();

  qid: any;
  question: any;
  resultPdf: any;

  username: any;
  result: any = {
    id: this.resultId,
    marksGot: 0,
    correctMarks: 0,
    attempted: 0,
    userid: '',
  };
  isSubmit = false;

  timer = 0;
  constructor(
    private _location: LocationStrategy,
    private _rout: ActivatedRoute,
    private _question: QuestionServiceService,
    private _snack: MatSnackBar
  ) {}
  ngOnInit(): void {
    console.log(this.result);

    this.preventBackButton();
    this.qid = this._rout.snapshot.params['qid'];
    this.username = this._rout.snapshot.params['username'];
    console.log('in the instruction page' + this.username);
    console.log(this.qid);
    this._question.getAllowedQuestion(this.qid).subscribe({
      next: (data) => {
        this.question = data;
        console.log(this.question);
        this.timer = this.question.length * 2 * 60;
        this.startTimer();

        // Assign username to each question object
        for (let i = 0; i < this.question.length; i++) {
          this.question[i].username = this.username;
          console.log('question username is:' + this.question);
        }
      },
      error: (error) => {
        this._snack.open('Error', 'error occurred while loading question', {
          duration: 3000,
        });
      },
    });
  }

  preventBackButton() {
    history.pushState(null, location.href);
    this._location.onPopState(() => {
      history.pushState(null, location.href);
    });
  }
  submitQuiz() {
    Swal.fire({
      title: 'Do you want to sumbit the quiz?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      icon: 'info',
    }).then((e) => {
      if (e.isConfirmed) {
        this.eval();
      }
    });
  }
  startTimer() {
    let t = window.setInterval(() => {
      if (this.timer <= 0) {
        clearInterval(t);
        this.timer = 0; // set timer to 0
        // this.isSubmit = true; // set isSubmit flag to true
        this.eval(); // call eval function to evaluate the quiz
      } else {
        this.timer--;
      }
    }, 1000);
  }

  getFormatedTime() {
    let minutes = Math.floor(this.timer / 60);
    let seconds = this.timer - minutes * 60;
    return `${minutes} min : ${seconds} sec`;
  }

  eval() {
    console.log(this.username);
    // call to server to check questions
    this._question.evalQuiz(this.question).subscribe({
      next: (data: any) => {
        console.log(data);
        this.result.marksGot = Number(parseFloat(data.marksGot).toFixed(2));
        this.result.correctMarks = data.correctMarks;
        this.result.attempted = data.attempted;
        this.result.userid = this.username;
        this.isSubmit = true;
        localStorage.setItem('result', JSON.stringify(this.result));
        console.log(this.result);
        this.saveResult();
      },
      error: (error) => {
        console.log(error);

        this._snack.open('error ', 'somthing went wrong', { duration: 3000 });
      },
    });
    // this.question.forEach((q: any) => {
    //   this.isSubmit = true;
    //   if (q.givenAnswer == q.answer) {
    //     this.correctMarks++;
    //     let SingleMarks = this.question[0].quiz.maxMarks / this.question.length;
    //     this.marksGot += SingleMarks;
    //   }
    //   if (q.givenAnswer.trim() != '') {
    //     this.attempted++;
    //   }
    // });
    // this.question.forEach((q: any) => {
    //   console.log(q.answer);
    // });
    // console.log('correct Answer: ' + this.correctMarks);
    // console.log('MarksGot: ' + this.marksGot);
    // console.log('total attempt: ' + this.attempted);
  }
  saveResult() {
    this._question.saveResult(this.result).subscribe({
      next: (data) => {
        console.log('result has been saved');

        console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  // printPage() {
  //   this._question.generatePdf(this.resultId).subscribe({
  //     next: (data: any) => {
  //       this.resultPdf = data;
  //       console.log('pdf generated sucessfully');
  //       console.log(this.resultPdf);

  //       console.log(this.resultId);
  //     },
  //     error: (error) => {
  //       console.log(error);
  //     },
  //   });
  // }

  // printPage() {
  //   const url = `http://localhost:5051/download-pdf/resultPdf/${this.resultId}`;
  //   axios
  //     .get(url, { responseType: 'blob' })
  //     .then((response: { data: BlobPart }) => {
  //       const file = new Blob([response.data], { type: 'application/pdf' });
  //       const fileURL = URL.createObjectURL(file);
  //       window.open(fileURL);
  //     })
  //     .catch((error: any) => {
  //       console.error(error);
  //     });
  // }

  printPage() {
    this._question.generatePdf(this.resultId).subscribe({
      next: (response: Blob) => {
        const file = new Blob([response], { type: 'application/pdf' });
        const fileName = 'result.pdf';
        saveAs(file, fileName);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
