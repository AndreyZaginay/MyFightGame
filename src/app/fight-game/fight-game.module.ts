import { FightGameService } from './services/fight-game.service';
import { FightGameComponent } from './fight-game.component';
import {MatButtonModule} from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SelectClassComponent } from './select-class/select-class.component';
import { DialogComponent } from './dialog/dialog.component';
import {MatDialogModule} from '@angular/material/dialog';

const routes: Routes = [
  {
    path: '',
    component: SelectClassComponent,
  },
  {
    path: 'game',
    component: FightGameComponent 
  }

]

@NgModule({
  declarations: [
    FightGameComponent,
    SelectClassComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    FightGameService
  ]
})
export class FightGameModule { }
