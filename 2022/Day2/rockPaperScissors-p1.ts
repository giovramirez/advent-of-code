import { readFile } from '../../utils';

const opponentShapes = {
  A: 'Rock',
  B: 'Paper',
  C: 'Scissors'
};

const myShapes = {
  X: { name: 'Rock', score: 1 },
  Y: { name: 'Paper', score: 2 },
  Z: { name: 'Scissors', score: 3 }
};

const scores = { won: 6, draw: 3, lost: 0 };

const roundResults = {
  AX: scores.draw,
  AY: scores.won,
  AZ: scores.lost,
  BX: scores.lost,
  BY: scores.draw,
  BZ: scores.won,
  CX: scores.won,
  CY: scores.lost,
  CZ: scores.draw,
}

type RoundResultKey = keyof typeof roundResults;
type MyShapeKey = keyof typeof myShapes;

function predicElfStrategy() {
  const input = readFile('input.txt');
  const allRounds = input?.split('\n')!;
  let totalScore = 0;

  for (const round of allRounds) {
    const roundShapes = round.replace('\r', '').split(' ');
    const [elfShape, myShape] = roundShapes;
    const roundResult = roundResults[`${elfShape}${myShape}` as RoundResultKey];
    const myShapeScore = myShapes[myShape as MyShapeKey];

    const roundScore = myShapeScore.score + roundResult;
    totalScore += roundScore;
  }

  console.log(`totalScore ${totalScore}`);
}

predicElfStrategy();

