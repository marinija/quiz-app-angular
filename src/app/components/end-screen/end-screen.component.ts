import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { LocalStorageService } from '@services/local-storage.service';
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
  #localStorage = inject(LocalStorageService);
  score = computed(() => this.#questions.score());
  questions = computed(() => this.#questions.questions());
  answers = computed(() => {
    return this.#questions.questions().map(v => {
      const questionAnswer = this.#questions.correctAnswers().some(x => x.question === v.question)
      return {...v, questionAnswer}
    });
  });

  playAgain() {
    let highScores = null;

    if(this.#localStorage.getItem('highscores')) {
      highScores = JSON.parse(this.#localStorage.getItem('highscores') || '');
    }
    let body = {category: this.questions()[0].category, score: this.score(), level: this.answers()[0].difficulty};
    if (highScores && Array.isArray(highScores)) {
      const index = highScores.findIndex(x => x.category === this.questions()[0].category);
      if (index > -1) {
        if(highScores[index].score < this.score()) {
          highScores[index].score = this.score();
        }
      } else {
        highScores.push(body);
      }
      this.#localStorage.setItem('highscores', JSON.stringify(highScores));
    } else {
      this.#localStorage.setItem('highscores', JSON.stringify([body]));
    }

    this.#questions.questions.set([]);
    this.#questions.state.set({playGame: false, scoreTitle: false, startGame: true});
  }
}
