import { NgClass } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { LocalStorageService } from "@services/local-storage.service";

type LocalStorageItem = {
  category: string;
  score: number;
  level: string;
}

@Component({
  selector: 'section.high-score',
  templateUrl: 'high-score.page.html',
  standalone: true,
  imports: [
    RouterLink,
    NgClass
  ]
})

export class HighScorePage implements OnInit {
  #localStorage = inject(LocalStorageService);
  highScores: Array<LocalStorageItem> = [];

  ngOnInit(): void {
    if (this.#localStorage.getItem('highscores')) {
      this.highScores = JSON.parse(this.#localStorage.getItem('highscores') ?? '');
    }
  }
}
