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
  gameEnded = false;

  numPlayers: number;
  numPlayersValue: string;
  numRounds: number;
  playersIndex: number[];
  playersIndex2: number[];

  currentWinner = 0;

  nextScores: number[][];
  dartFocus: number[][];

  scores = null;
  scores2 = null;
  bustedScores = null;

  scoreTotals: eachTotal[];

  isVisible = false;

  currentDart = 0;
  currentPlayer = 0;

  currentBuster = 0;
  bustIsVisible = false;



  constructor() {}

  ngOnInit(): void {



  }

  initGame() {

    this.gameEnded = false;
    this.numRounds = 0;

    this.scores = [];
    this.scores2 = [{
      'Round': 'Round 777',
      'Player 1': 0
    }];
    this.bustedScores = [];

    this.playersIndex = [];
    this.playersIndex2 = [0];
    this.nextScores = [];
    this.dartFocus = [];

    this.scoreTotals = [
      {
        'Totals': '',
      }
    ]

    for (let t = 0; t < 3; t++) {
      this.nextScores.push([]);
      this.dartFocus.push([]);
      this.playersIndex = [];
      for (let i = 0; i < this.numPlayers; i++) {
        this.playersIndex.push(i);
        const num: number = null;
        this.nextScores[t].push(num);
        if (t == 0 && i == 0) {
          this.dartFocus[t].push(1);
        } else {
          this.dartFocus[t].push(0);
        }
        this.scoreTotals[0]['Player ' + (i + 1)] = 0;
      }
    }
  }

  startGame() {
    if (!this.numPlayersValue) {
      this.numPlayersValue = '1';
      this.changeNumPlayers();
    }
    this.gameStarted = true;
    this.initGame();
  }

  changeNumPlayers() {
    if (this.numPlayersValue) {
      this.numPlayers = parseInt(this.numPlayersValue, 0);
    }
  }

  markPlayerScores() {
    let i = 0;
    const nextItem = {
      Round: 'Round ' + (this.numRounds + 1),
    };

    const self = this;
    const fullRound = [];
    const fullBustedRound = [];
    const playersHaveBusted = [];
    for (let p = 0; p < this.numPlayers; p++) {
      playersHaveBusted.push(0);
    }

    for (let t = 0; t < 3; t++) {

      fullRound[t] = [];
      fullBustedRound[t] = [];

      for (let i = 0; i < this.nextScores[t].length; i++) {

        fullRound[t][i] = [];
        fullBustedRound[t][i] = [];
        let item: number = (this.nextScores[t][i]) ? this.nextScores[t][i] : 0;

        if (playersHaveBusted[i] == 1) {
          item = 0;
        }

        fullRound[t][i]['Player ' + (i + 1)] = item;

        self.scoreTotals[0]['Player ' + (i + 1)] += item;
        if (self.scoreTotals[0]['Player ' + (i + 1)] == 300) {
          this.currentWinner = i + 1;
          this.isVisible = true;
          fullBustedRound[t][i]['Player ' + (i + 1)] = 0;
        } else if (self.scoreTotals[0]['Player ' + (i + 1)] > 300) {
          this.currentBuster = i + 1;
          this.bustIsVisible = true;
          fullBustedRound[t][i]['Player ' + (i + 1)] = 1;
          self.scoreTotals[0]['Player ' + (i + 1)] = self.scoreTotals[0]['Player ' + (i + 1)] - 300;
          playersHaveBusted[i] = 1;
        } else {
          fullBustedRound[t][i]['Player ' + (i + 1)] = 0;
        }
      }

    }
    this.scores.push(fullRound);
    this.bustedScores.push(fullBustedRound);
    console.log('scores at 2: ', this.scores);
    console.log('bustedScores at 2: ', this.bustedScores);

    this.nextScores = [];
    for (let s = 0; s < 3; s++) {
      if (this.nextScores.length - 1 < s) {
        this.nextScores[s] = [];
      }
      for (i = 0; i < this.numPlayers; i++) {
        this.nextScores[s].push(null);
      }
    }
    this.currentDart = 0;
    this.currentPlayer = 0;
    this.setDartFocus();
    this.numRounds += 1;
  }

  nextDart(dartNum, playerNum, event: Event) {

    if (dartNum < 2) {
      this.currentDart = dartNum + 1
    } else {
      this.currentDart = 0;
      if (playerNum < this.numPlayers) {
        this.currentPlayer = playerNum + 1;
      }
    }
    this.setDartFocus();
  }

  previousDart() {
    if (this.currentDart > 0) {
      this.currentDart--;
    } else {
      if (this.currentPlayer > 0) {
        this.currentPlayer--;
        this.currentDart = 2;
      }
    }
    this.setDartFocus();
  }

  hasFocus(dartNum, playerNum) {
    if (dartNum == this.currentDart && playerNum == this.currentPlayer) {
      return true;
    } else {
      return false;
    }
  }

  setDartFocus() {
    for (let t = 0; t < this.dartFocus.length; t++) {
      for (let i = 0; i < this.dartFocus[t].length; i++) {
        if (t == this.currentDart && i == this.currentPlayer) {
          this.dartFocus[t][i] = 1
        } else {
          this.dartFocus[t][i] = 0;
        }
      }
    }
  }

  handleCancel() {
    this.currentWinner = 0;
    this.isVisible = false;
    this.numPlayersValue = null;
    this.gameStarted = false;
    this.gameEnded = true;
  }

  handleOk() {
    this.currentWinner = 0;
    this.isVisible = false;
    this.gameEnded = true;
  }

  handleBustCancel() {
    this.currentBuster = 0;
    this.bustIsVisible = false;
  }

  handleBustOk() {
    this.currentBuster = 0;
    this.bustIsVisible = false;
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
