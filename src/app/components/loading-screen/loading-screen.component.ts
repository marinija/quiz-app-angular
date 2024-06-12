import { KeyValue } from '@angular/common';
import { Component, inject, output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LocalStorageService } from '@services/local-storage.service';
import { QuestionsService } from '@services/questions.service';
import { Categories, Difficulty } from 'app/models';

type FormValues = {
  amount: number;
  category: string;
  difficulty: string;
}

@Component({
  selector: 'loading-screen',
  templateUrl: './loading-screen.component.html',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  styles: [`
    :host {
      width: 100%;
    }
  `]
})
export class LoadingScreenComponent {
  fb = inject(NonNullableFormBuilder);
  #questions = inject(QuestionsService);

  hasHighscore = inject(LocalStorageService).getItem('highscores');

  categories: Array<KeyValue<string, string>> = Object.entries(Categories).filter(([_, v]) => typeof v === 'string').map(([key, value]) => ({key, value: String(value)}))
  difficulty: Array<KeyValue<string, string>> = Object.entries(Difficulty).map(([key, value]) => ({key: String(key).toLowerCase(), value: String(value)}));

  form = this.fb.group({
    amount: this.fb.control(10, {validators: [Validators.min(10), Validators.max(50), Validators.required]}),
    category: this.fb.control('9', {validators: [Validators.required]}),
    difficulty: this.fb.control('easy', {validators: [Validators.required]})
  });

  formValues = output<FormValues>();

  submit() {
    this.#questions.state.set({playGame: true, startGame: false, scoreTitle: false});
    this.formValues.emit(this.form.getRawValue());
  }

}
