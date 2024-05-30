import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Params } from '@angular/router';
import { IQuestions, IQuestionsResponse, State } from 'app/models';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  private readonly url = 'https://opentdb.com/api.php?type=multiple';
  questions = signal<IQuestions[]>([]);
  score = signal<number>(0);
  state = signal<State>({
    startGame: true,
    playGame: false,
    scoreTitle: false
  });
  endGame = signal<boolean>(false);

  constructor(private http: HttpClient) { }

  getQuestions(params?: Params): Observable<Array<IQuestions>> {
    return this.http.get<IQuestionsResponse>(this.url, {params}).pipe(
      map(x => x.results),
    tap(questions => this.questions.set(questions)));
  }

}
