import { DialogComponent } from './../dialog/dialog.component';
import { FightGameService } from './../services/fight-game.service';
import { Character } from './../models/classes';
import { Component, OnInit } from '@angular/core';
import { Archer, Knight, Warrior } from '../models/classes';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-select-class',
  templateUrl: './select-class.component.html',
  styleUrls: ['./select-class.component.css']
})
export class SelectClassComponent implements OnInit {
  classes: Character[] = [Archer, Warrior, Knight]

  constructor(
    private readonly router: Router,
    private readonly fightGameService: FightGameService,
    private readonly route: ActivatedRoute,
    public dialog: MatDialog
    ) { }

  ngOnInit( ): void {
  }

  selectClass(yourChose: Character): void {
    const randomValue = Math.floor(Math.random() * this.classes.length);
    const randomCharacter = this.classes[randomValue]
    this.fightGameService.selectClass(yourChose, randomCharacter)
    this.router.navigate(['game'], {relativeTo:this.route}) 
  }
  
  openDialog(yourChose: Character): void {
    this.dialog.open(DialogComponent, {
      data : {...yourChose}
    })
  }
}
