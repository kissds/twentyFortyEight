import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type FieldState = number[][];

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {

  private size = 4;
  private baseValue = 2;
  private state$ = new BehaviorSubject<FieldState>(new Array(this.size).fill(null).map(_ => new Array(this.size).fill(null)));

  constructor() { }

  ngOnInit() {
    // console.log(this.state$.value);
  }
  fill(x, y) {
      let field = this.state$.value;

      field[x][y] = this.baseValue;
  }

  fillRandom() {
    let field = this.state$.value;

    let empties = [];
      field.forEach((row, rowIndex) => {
      row.forEach((tile, tileIndex) => {
        if (tile === null) {
            empties.push([rowIndex, tileIndex]);
        }
      });
    });

    // console.log(empties);

    if (empties.length === 0) {
      throw new Error('Empty entries');
    }

    let coords = empties[Math.floor(Math.random() * empties.length)];
    field[coords[0]][coords[1]] = this.baseValue;

    // console.log('upd', coords, field)

    // this.state$.next(field);
  }

    moveUp() {
        let field = this.state$.value;

        for (let rowIndex = 0; rowIndex < this.size; rowIndex++) {
            for (let tileIndex = 0; tileIndex < this.size; tileIndex++) {
                const tileValue = field[rowIndex][tileIndex];
                if (tileValue !== null && rowIndex > 0 && field[rowIndex - 1][tileIndex] === null) {
                    field[rowIndex - 1][tileIndex] = tileValue;
                    field[rowIndex][tileIndex] = null;
                }
            }
        }
    }

    moveRight() {
      const field = this.state$.value;

      for (let rowIndex = 0; rowIndex < this.size; rowIndex++) {
        for (let tileIndex = this.size - 1; tileIndex >= 0; tileIndex--) {
          const tileValue = field[rowIndex][tileIndex];
          if (tileValue !== null && tileIndex < this.size - 1 && field[rowIndex][tileIndex + 1] === null) {
            field[rowIndex][tileIndex + 1] = tileValue;
            field[rowIndex][tileIndex] = null;
          }
        }
      }
    }

    moveDown() {
        let field = this.state$.value;

        for (let rowIndex = this.size - 1; rowIndex >= 0; rowIndex--) {
            for (let tileIndex = 0; tileIndex < this.size; tileIndex++) {
                const tileValue = field[rowIndex][tileIndex];
                if (tileValue !== null && rowIndex < this.size - 1 && field[rowIndex + 1][tileIndex] === null) {
                    field[rowIndex + 1][tileIndex] = tileValue;
                    field[rowIndex][tileIndex] = null;
                }
            }
        }
    }

    moveLeft() {
        let field = this.state$.value;

        for (let rowIndex = 0; rowIndex < this.size; rowIndex++) {
            for (let tileIndex = 0; tileIndex < this.size; tileIndex++) {
                const tileValue = field[rowIndex][tileIndex];
                if (tileValue !== null && tileIndex > 0 && field[rowIndex][tileIndex - 1] === null) {
                    field[rowIndex][tileIndex - 1] = tileValue;
                    field[rowIndex][tileIndex] = null;
                }
            }
        }
    }
}
