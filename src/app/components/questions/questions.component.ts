import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { QuestionsService } from '@services/questions.service';
import { IQuestions } from 'app/models';
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
export class QuestionsComponent implements OnInit {

  params = input.required<Params>();
  #questions = inject(QuestionsService);
  currentQuestion = 0;
  questions!: Array<IQuestions>;
  protected answerChecked = signal('');
  protected score = signal(0);

  ngOnInit(): void {
      this.#questions.getQuestions(this.params()).subscribe({
        next: questions => this.questions = questions,
        error: err => console.error(err)
      });
  }

  previousQuestion() {
    if (this.currentQuestion !== 0) {
      this.answerChecked.set('');
      this.score.update(v => v -= 1);
      this.currentQuestion--;
    }
  }

  nextQuestion(): void {
    this.correctAnswer();
    this.answerChecked.set('');
    if (this.currentQuestion < this.questions.length - 1) {
      this.currentQuestion++;
    }
  }

  private correctAnswer() {
    if(this.questions[this.currentQuestion].correct_answer === this.answerChecked()) {
      this.score.update(v => v += 1);
    }
  }

  showScore() {
    this.#questions.score.set(this.score());
    this.#questions.endGame.set(true);
  }
}
