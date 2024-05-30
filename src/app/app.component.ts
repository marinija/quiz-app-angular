import { Component, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionsService } from '@services/questions.service';
import { QuestionsComponent } from '@components/questions/questions.component';
import { LoadingScreenComponent } from '@components/loading-screen/loading-screen.component';
import { Params } from '@angular/router';
import { EndScreenComponent } from '@components/end-screen/end-screen.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, QuestionsComponent, LoadingScreenComponent, EndScreenComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  #questions = inject(QuestionsService);
  state = computed(() => this.#questions.state());
  params!: Params;
}
