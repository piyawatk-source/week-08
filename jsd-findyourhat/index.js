const prompt = require("prompt-sync")({ sigint: true });

const hat = "🎩";
const hole = "💀";
const fieldCharacter = "🟩";
const pathCharacter = "😎";

function generateField(rows, cols, holePercentage = 0.2) {
  const field = [];

  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      if (Math.random() < holePercentage) {
        row.push(hole);
      } else {
        row.push(fieldCharacter);
      }
    }
    field.push(row);
  }

  let playerRow, playerCol;
  do {
    playerRow = Math.floor(Math.random() * rows);
    playerCol = Math.floor(Math.random() * cols);
  } while (field[playerRow][playerCol] === hole);
  field[playerRow][playerCol] = pathCharacter;

  let hatRow, hatCol;
  do {
    hatRow = Math.floor(Math.random() * rows);
    hatCol = Math.floor(Math.random() * cols);
  } while (field[hatRow][hatCol] !== fieldCharacter);
  field[hatRow][hatCol] = hat;

  return field;
}

class Field {
  constructor(field) {
    this.field = field;

    for (let i = 0; i < field.length; i++) {
      for (let j = 0; j < field[i].length; j++) {
        if (field[i][j] === pathCharacter) {
          this.playerRow = i;
          this.playerCol = j;
        }
      }
    }
  }

  print() {
    const display = this.field.map((row) => row.join("")).join("\n");
    console.log(display);
  }
}
