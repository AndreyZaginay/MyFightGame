import { Observable, takeUntil, Subject } from 'rxjs';
import { FightGameService } from './services/fight-game.service';
import { Component, OnInit } from '@angular/core';
import { GameState } from './models/classes';

@Component({
  selector: 'app-fight-game',
  templateUrl: './fight-game.component.html',
  styleUrls: ['./fight-game.component.css']
})
export class FightGameComponent implements OnInit {
  state$: Observable<GameState> = this.fightGameService.state$;
  
  constructor(
    private readonly fightGameService: FightGameService
  ) { }

  ngOnInit(): void {
  }

  reset(): void {
    this.fightGameService.reset();
  }

  step(): void {
    this.fightGameService.step();
  }
}
