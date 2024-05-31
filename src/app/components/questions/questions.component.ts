import { Component, computed, effect, inject, input, OnInit, signal } from '@angular/core';
import { QuestionsService } from '@services/questions.service';
import { QuestionComponent } from './question/question.component';
import { Params } from '@angular/router';
import { LoadingBarComponent } from '@components/loading-bar/loading-bar.component';
import { finalize, interval, map, Subscription, takeWhile } from 'rxjs';

@Component({
  selector: 'questions',
  templateUrl: './questions.component.html',
  standalone: true,
  imports: [
    QuestionComponent,
    LoadingBarComponent
  ],
  styles: [`
    :host {
      width: 100%;
    }
  `]
})
export class QuestionsComponent implements OnInit {

  params = input.required<Params>();
  #questions = inject(QuestionsService);
  currentQuestion = 0;
  questions = computed(() => this.#questions.questions());
  protected answerChecked = signal('');
  protected score = signal(0);
  countdown = signal(30);
  private timer$ = new Subscription();

  constructor() {
    effect(() => {
      if(this.params()) {
        this.#questions.getQuestions(this.params()).subscribe();
      }
    })
  }

  ngOnInit(): void {
     this.startCountdown();
  }

  startCountdown() {
    this.timer$ = interval(1000).pipe(
      map(() => {
        this.countdown.update(v => v-=1);
        return this.countdown()
        }
      ),
      takeWhile(count => count >= 0),
      finalize(() => {
        if(this.currentQuestion === this.questions().length - 1) {
          this.showScore();
        } else {
          this.nextQuestion();
          this.startCountdown();
        }
      })
    ).subscribe();
  }

  nextQuestion(): void {
    this.countdown.set(30);
    this.correctAnswer();
    this.answerChecked.set('');
    if (this.currentQuestion < this.questions().length - 1) {
      this.currentQuestion++;
    }
  }

  stopCountdown() {
    if (this.timer$) {
      this.timer$.unsubscribe();
    }
  }

  private correctAnswer() {
    if(this.questions()[this.currentQuestion].correct_answer === this.answerChecked()) {
      this.#questions.correctAnswers.update(v => v = [...v, this.questions()[this.currentQuestion]]);
      this.score.update(v => v += 1);
    }
  }

  showScore() {
    this.stopCountdown();
    this.#questions.score.set(this.score());
    this.#questions.state.set({playGame: false, scoreTitle: true, startGame: false});
  }
}
