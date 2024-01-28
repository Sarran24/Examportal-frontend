import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private _http: HttpClient) {}

  public quizzes() {
    return this._http.get(`${baseUrl}/quiz/all`);
  }

  public addQuiz(quiz: any) {
    return this._http.post(`${baseUrl}/quiz`, quiz);
  }

  public deleteQuiz(qid: any) {
    return this._http.delete(`${baseUrl}/quiz/${qid}`);
  }

  public getById(qid: any) {
    return this._http.get(`${baseUrl}/quiz/${qid}`);
  }

  public updateQuiz(quiz: any) {
    return this._http.put(`${baseUrl}/quiz/update`, quiz);
  }

  public getQuizOfCategory(cid: any) {
    return this._http.get(`${baseUrl}/quiz/category/${cid}`);
  }

  public getActiveQuizzes() {
    return this._http.get(`${baseUrl}/quiz/active`);
  }
  public getCategoryAndActiveQuiz(cid: any) {
    return this._http.get(`${baseUrl}/quiz/category/active/${cid}`);
  }
}
