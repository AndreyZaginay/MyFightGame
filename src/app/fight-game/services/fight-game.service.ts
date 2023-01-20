import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { Character, GameState } from './../models/classes';
import { BehaviorSubject, Observable, tap } from 'rxjs';

const GAME_STATE: GameState = {
  yourState: {
    yourHp: 0,
    className: '',
    maxDmg: 0,
    minDmg: 0,
    sound: '',
    img: ''
  },
  enemyState: {
    enemyHp: 0,
    className: '',
    maxDmg: 0,
    minDmg: 0,
    img: ''
  },
  outputMsg: [],
  isGameEnd: false
}

@Injectable({
  providedIn: 'root'
})
export class FightGameService {
  private state!: GameState;
  private select$!: BehaviorSubject<GameState>;
  
  
  get state$(): Observable<GameState> {
    return this.select$.asObservable().pipe(
      tap((state: GameState) => this.state = state)
    );
  }

  constructor(
   private readonly router: Router,
  ) {}

  public selectClass(yourChose: Character, enemyChose: Character ): void {
    this.state = {
      yourState : {className: yourChose.className, yourHp: yourChose.hp, maxDmg: yourChose.maxDmg, minDmg: yourChose.minDmg, sound: yourChose.sound , img: yourChose.img},
      enemyState: {className: enemyChose.className, enemyHp: enemyChose.hp, maxDmg: enemyChose.maxDmg, minDmg: enemyChose.minDmg, img: enemyChose.img },
      outputMsg: [],
      isGameEnd: false,
      
    }
    this.select$ = new BehaviorSubject<GameState>(this.state);
    this.patchState(this.state);
  }

  public step(): void{   
    const { yourState, enemyState} = this.state;    
    this.yourAttack();
    this.enemyAttack();
    this.checkWin(yourState.yourHp, enemyState.enemyHp)
  }
  
  public reset(): void {
    this.patchState(GAME_STATE);
    this.router.navigate(['fightGame'])
  }

  private playSound(src: string): void {
    let sound = new Audio();
    sound.src = src;
    sound.play();
  }

  private yourAttack(): void {
    let { yourState, enemyState, outputMsg} = this.state;    
    const dmg = this.getCurrentDmg(yourState.minDmg, yourState.maxDmg);
    enemyState.enemyHp -= dmg;
    this.playSound(yourState.sound)
    outputMsg.push(`Вы нанесли ${dmg} урона`);
    this.patchState({enemyState, outputMsg});
  }

  private enemyAttack(): void{
    let { yourState, enemyState, outputMsg } = this.state;    
    const dmg = this.getCurrentDmg(enemyState.minDmg, enemyState.maxDmg);
    yourState.yourHp -= dmg;
    outputMsg.push(`Противник нанёс ${dmg} урона`);    
    this.patchState({yourState, outputMsg});   
  }

  private checkWin(yourHp: number, enemyHp: number): void{
    if (yourHp <= 0 && enemyHp <= 0) {
      this.state.outputMsg.push('draw');
      this.patchState({isGameEnd: true})
      return;
    }
    if (yourHp <= 0) {
      this.state.outputMsg.push('enemy win');
      this.patchState({isGameEnd: true})
      return
    }
    if (enemyHp <= 0) {
      this.state.outputMsg.push('you win');
      this.patchState({isGameEnd: true})
      return
    }
  }
  
  private getCurrentDmg(minDmg: number, maxDmg: number): number {
    return Math.floor(Math.random() * (maxDmg - minDmg + 1)) + minDmg;
  }

  private patchState(payload: Partial<GameState>): void {
    this.select$.next({ ...this.state, ...payload });
  }
}
