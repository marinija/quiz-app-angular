import { Component, computed, inject } from '@angular/core';
import { QuestionsService } from '@services/questions.service';

@Component({
  selector: 'end-screen',
  templateUrl: './end-screen.component.html',
  standalone: true
})
export class EndScreenComponent {

  #questions = inject(QuestionsService);
  score = computed(() => this.#questions.score());
  questions = computed(() => this.#questions.questions());

  playAgain() {
    this.#questions.questions.set([]);
    this.#questions.state.set({playGame: false, scoreTitle: false, startGame: true});
  }
}
