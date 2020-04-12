import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'dartscore';

  numDarts = [
    0,
    1,
    2
  ];

  gameStarted = false;

  numPlayers: number;
  numPlayersValue: string;
  numRounds: number;
  playersIndex: number[];

  currentWinner = 0;

  nextScores: number[][];

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

    for (let t = 0; t < 3; t++) {
      this.nextScores.push([]);
      this.playersIndex = [];
      for (let i = 0; i < this.numPlayers; i++) {
        this.playersIndex.push(i);
        const num: number = null;
        this.nextScores[t].push(num);
        this.scoreTotals[0]['Player ' + (i + 1)] = 0;
      }
    }
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
    const fullRound = [];
    for (let t = 0; t < 3; t++) {

      fullRound[t] = [];

      for (let i = 0; i < this.nextScores[t].length; i++) {

        fullRound[t][i] = []
        const item: number = (this.nextScores[t][i]) ? this.nextScores[t][i] : 0;
        fullRound[t][i]['Player ' + (i + 1)] = item;
        self.scoreTotals[0]['Player ' + (i + 1)] += item;
        if (self.scoreTotals[0]['Player ' + (i + 1)] == 300) {
          this.currentWinner = i + 1;
          this.isVisible = true;
        }
      }

    }
    this.scores.push(fullRound);

    this.nextScores = [];
    for (let s = 0; s < 3; s++) {
      if (this.nextScores.length - 1 < s) {
        this.nextScores[s] = [];
      }
      for (i = 0; i < this.numPlayers; i++) {
        this.nextScores[s].push(null);
      }
    }
    this.numRounds += 1;
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

  logItem(item) {
    console.log(item);
  }

  makeInt(val2) {
    return parseInt(val2, 0);
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
