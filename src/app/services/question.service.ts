import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionServiceService {
  constructor(private _http: HttpClient) {}

  public getQuestionsOfQuiz(qid: any) {
    return this._http.get(`${baseUrl}/questions/quizz-admin/${qid}`);
  }
  public addQuestion(question: any) {
    return this._http.post(`${baseUrl}/questions`, question);
  }
  public deleteQuestion(qid: any) {
    return this._http.delete(`${baseUrl}/questions/${qid}`);
  }

  public getAllowedQuestion(qid: any) {
    return this._http.get(`${baseUrl}/questions/quizz/${qid}`);
  }

  public evalQuiz(question: any) {
    return this._http.post(`${baseUrl}/questions/eval-quiz`, question);
  }
  public generatePdf(id: any): Observable<Blob> {
    return this._http.get(`${baseUrl}/download-pdf/resultPdf/${id}`, {
      responseType: 'blob',
    });
  }

  public saveResult(result: any) {
    return this._http.post(`${baseUrl}/download-pdf/save-result`, result);
  }
}
