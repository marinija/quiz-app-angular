import { CommonModule } from "@angular/common";
import { Component, computed, inject } from "@angular/core";
import { Params } from "@angular/router";
import { EndScreenComponent } from "@components/end-screen/end-screen.component";
import { LoadingScreenComponent } from "@components/loading-screen/loading-screen.component";
import { QuestionsComponent } from "@components/questions/questions.component";
import { QuestionsService } from "@services/questions.service";

@Component({
  selector: 'section.game-score.h-full.w-full',
  templateUrl: 'game-screen.page.html',
  standalone: true,
  imports: [
    CommonModule,
    QuestionsComponent,
    LoadingScreenComponent,
    EndScreenComponent,
  ]
})
export class GameScreenPage {
  #questions = inject(QuestionsService);
  state = computed(() => this.#questions.state());
  params!: Params;
}
