import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { QuestionsService } from '@services/questions.service';

@Component({
  selector: 'end-screen',
  templateUrl: './end-screen.component.html',
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class EndScreenComponent {

  #questions = inject(QuestionsService);
  score = computed(() => this.#questions.score());
  questions = computed(() => this.#questions.questions());
  answers = computed(() => {
    return this.#questions.questions().map(v => {
      const questionAnswer = this.#questions.correctAnswers().some(x => x.question === v.question)
      return {...v, questionAnswer}
    });
  });

  playAgain() {
    this.#questions.questions.set([]);
    this.#questions.state.set({playGame: false, scoreTitle: false, startGame: true});
  }
}
