import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'fightGame',
    loadChildren: () => import('./fight-game/fight-game.module').then(m => m.FightGameModule)
  },
  {
    path: '',
    redirectTo: 'fightGame',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
