import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionServiceService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css'],
})
export class AddQuestionComponent implements OnInit {
  public Editor = ClassicEditor;

  qId = '';
  title = '';
  questions = {
    quesId: '',
    content: '',
    image: '',
    answer: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    quiz: {
      qid: '',
    },
  };

  constructor(
    private _route: ActivatedRoute,
    private _snack: MatSnackBar,
    private _question: QuestionServiceService
  ) {}
  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    console.log(this.qId);
    this.questions.quiz.qid = this.qId;
    this.title = this._route.snapshot.params['title'];
  }

  forSubmit() {
    if (this.questions.content.trim() == '' || this.questions.content == null) {
      this._snack.open('Content required', '', { duration: 3000 });
      return;
    }
    if (this.questions.option1.trim() == '' || this.questions.option1 == null) {
      this._snack.open('option1 required', '', { duration: 3000 });
      return;
    }
    if (this.questions.option2.trim() == '' || this.questions.option2 == null) {
      this._snack.open('option2 required', '', { duration: 3000 });
      return;
    }
    this._question.addQuestion(this.questions).subscribe({
      next: (data: any) => {
        this.resetQuestion();
        Swal.fire('Sucess !!', 'Question is Added', 'success');
      },
      error: (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Question not Added', 'error');
      },
    });
  }

  resetQuestion() {
    this.questions = {
      quesId: '',
      content: '',
      image: '',
      answer: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      quiz: {
        qid: this.qId,
      },
    };
  }
}
