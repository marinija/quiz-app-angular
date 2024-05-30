import { Component, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionsService } from '@services/questions.service';
import { QuestionsComponent } from '@components/questions/questions.component';
import { LoadingScreenComponent } from '@components/loading-screen/loading-screen.component';
import { Params } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, QuestionsComponent, LoadingScreenComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  #questions = inject(QuestionsService);
  questions = computed(() => this.#questions.questions() ?? []);
  score = computed(() => this.#questions.score() ?? 0);
  endGame = computed(() => this.#questions.endGame());
  loadingScreen = true;
  params!: Params;

  ngOnInit(): void {
  }
}
