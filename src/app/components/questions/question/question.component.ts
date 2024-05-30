import { CommonModule, NgIf } from '@angular/common';
import { Component, input, model, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IQuestions } from 'app/models';

@Component({
  selector: 'question',
  templateUrl: './question.component.html',
  standalone: true,
  imports: [
    NgIf,
    CommonModule,
    FormsModule
  ]
})
export class QuestionComponent {

  checked = model<string>('');
  question = input.required<IQuestions>();
  possibleAnswers = computed(() => {
    const question = this.question();
    let answers: string[] = [];
    if (question) {
      answers = question.incorrect_answers.concat(question.correct_answer) ?? [];
      answers = this.shuffleArray(answers);
    }
    return answers;
  });

  shuffleArray(array: string[]) {
    return array.map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
  }
}
