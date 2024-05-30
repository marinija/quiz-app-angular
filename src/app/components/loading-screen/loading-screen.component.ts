import { KeyValue } from '@angular/common';
import { Component, inject, output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Categories, Difficulty } from 'app/models';

@Component({
  selector: 'loading-screen',
  templateUrl: './loading-screen.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ]
})
export class LoadingScreenComponent {
  fb = inject(NonNullableFormBuilder);

  categories: Array<KeyValue<string, string>> = Object.entries(Categories).filter(([_, v]) => typeof v === 'string').map(([key, value]) => ({key, value: String(value)}))
  difficulty: Array<KeyValue<string, string>> = Object.entries(Difficulty).map(([key, value]) => ({key: String(key).toLowerCase(), value: String(value)}));

  form = this.fb.group({
    amount: this.fb.control(10, {validators: [Validators.min(10), Validators.max(50), Validators.required]}),
    category: this.fb.control('9', {validators: [Validators.required]}),
    difficulty: this.fb.control('easy', {validators: [Validators.required]})
  });

  formValues = output<any>();

  submit() {
    this.formValues.emit(this.form.getRawValue());
  }

}
