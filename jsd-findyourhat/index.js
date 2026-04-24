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

  moveUp() {
    this.playerRow -= 1;
  }
  moveDown() {
    this.playerRow += 1;
  }
  moveLeft() {
    this.playerCol -= 1;
  }
  moveRight() {
    this.playerCol += 1;
  }

  checkStatus() {
    const r = this.playerRow;
    const c = this.playerCol;

    if (r < 0 || r >= this.field.length || c < 0 || c >= this.field[0].length) {
      console.log("🚫 You went out of bounds! Game over.");
      return "lose";
    }

    if (this.field[r][c] === hole) {
      console.log("💀 You fell into a hole! Game over.");
      return "lose";
    }

    if (this.field[r][c] === hat) {
      console.log("🎉 You found the hat! You win!");
      return "win";
    }

    this.field[r][c] = pathCharacter;
    return "playing";
  }
}

function playGame() {
  console.log("\n===== Find Your Hat =====");
  console.log("🎩 = Hat (goal)");
  console.log("💀 = Hole (avoid)");
  console.log("🟩 = Field");
  console.log("😎 = You");
  console.log("Controls: u(up) d(down) l(left) r(right)");
  console.log("=========================\n");

  const myField = new Field(generateField(10, 10, 0.2));
  let status = "playing";

  while (status === "playing") {
    myField.print();
    const move = prompt("Which way? (u/d/l/r): ").toLowerCase();

    switch (move) {
      case "u":
        myField.moveUp();
        break;
      case "d":
        myField.moveDown();
        break;
      case "l":
        myField.moveLeft();
        break;
      case "r":
        myField.moveRight();
        break;
      default:
        console.log("⚠️  Invalid input! Use u/d/l/r\n");
        continue;
    }

    status = myField.checkStatus();
    console.log("");
  }

  console.log("===== Game Over =====\n");
}

playGame();
