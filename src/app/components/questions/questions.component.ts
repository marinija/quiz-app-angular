import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { QuestionsService } from '@services/questions.service';
import { QuestionComponent } from './question/question.component';
import { Params } from '@angular/router';

@Component({
  selector: 'questions',
  templateUrl: './questions.component.html',
  standalone: true,
  imports: [
    QuestionComponent
  ],
  styles: [`
    :host {
      width: 100%;
    }
  `]
})
export class QuestionsComponent {

  params = input.required<Params>();
  #questions = inject(QuestionsService);
  currentQuestion = 0;
  questions = computed(() => this.#questions.questions());
  protected answerChecked = signal('');
  protected score = signal(0);

  constructor() {
    effect(() => {
      if(this.params()) {
        this.#questions.getQuestions(this.params()).subscribe();
      }
    })
  }

  nextQuestion(): void {
    this.correctAnswer();
    this.answerChecked.set('');
    if (this.currentQuestion < this.questions().length - 1) {
      this.currentQuestion++;
    }
  }

  private correctAnswer() {
    if(this.questions()[this.currentQuestion].correct_answer === this.answerChecked()) {
      this.score.update(v => v += 1);
    }
  }

  showScore() {
    this.#questions.score.set(this.score());
    this.#questions.state.set({playGame: false, scoreTitle: true, startGame: false});
  }
}
