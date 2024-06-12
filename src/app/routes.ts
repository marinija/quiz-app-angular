import { Route } from "@angular/router";
import { HighScorePage } from "./pages/high-score/high-score.page";
import { AppComponent } from "./app.component";
import { GameScreenPage } from "./pages/game-screen/game-screen.page";


export const routes: Route[] = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/game-screen/game-screen.page').then(c => c.GameScreenPage)
      },
      {
        path: 'high-score',
        loadComponent: () => import('./pages/high-score/high-score.page').then(c => c.HighScorePage)
      }
    ]
  },

]
