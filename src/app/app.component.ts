import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'dartscore';

  gameStarted = false;

  numPlayers: number;
  numPlayersValue: string;
  numRounds: number;
  playersIndex: number[];

  currentWinner = 0;

  nextScores: number[];

  scores = null;
  scores2 = null;

  scoreTotals: eachTotal[];

  isVisible = false;



  constructor() {}

  ngOnInit(): void {



  }

  initGame() {

    this.numRounds = 0;

    this.scores = [];
    this.scores2 = [{
      'Round': 'Round 777',
      'Player 1': 0
    }];

    this.playersIndex = [];
    this.nextScores = [];

    this.scoreTotals = [
      {
        'Totals': '',
      }
    ]

    for (let i = 0; i < this.numPlayers; i++) {
      this.playersIndex.push(i);
      const num: number = 0;
      this.nextScores.push(num);
      this.scoreTotals[0]['Player ' + (i + 1)] = 0;
    }
    console.log('this.playersIndex: ', this.playersIndex);
  }

  changeNumPlayers() {
    if (this.numPlayersValue) {
      this.numPlayers = parseInt(this.numPlayersValue, 0);
      this.gameStarted = true;
      this.initGame();
    }
  }

  markPlayerScores() {
    let i = 0;
    const nextItem = {
      Round: 'Round ' + (this.numRounds + 1),
    };
    const self = this;
    for (let i = 0; i < this.nextScores.length; i++) {

      const item: number = this.nextScores[i];
      nextItem['Player ' + (i + 1)] = item;
      self.scoreTotals[0]['Player ' + (i + 1)] += item;
      if (self.scoreTotals[0]['Player ' + (i + 1)] == 300) {
        this.currentWinner = i + 1;
        this.isVisible = true;
      }
    };
    this.scores.push(nextItem);
    this.nextScores = [];
    for (i = 0; i < this.numPlayers; i++) {
      this.nextScores.push(0);

    }
  }

  handleCancel() {
    this.currentWinner = 0;
    this.isVisible = false;
    this.numPlayersValue = null;
    this.gameStarted = false;
  }

  handleOk() {
    this.currentWinner = 0;
    this.isVisible = false;
    this.numPlayersValue = null;
    this.gameStarted = false;
  }

  objectKeys(item) {
    return Object.keys(item);
  }
}

export class eachTotal {
  Totals: string
  'Player 1'?: number;
  'Player 2'?: number;
  'Player 3'?: number;
  'Player 4'?: number;
  'Player 5'?: number;
  'Player 6'?: number;
}
