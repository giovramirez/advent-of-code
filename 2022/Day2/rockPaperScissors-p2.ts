import { readFile } from '../../utils';

const opponentShapes = {
  A: 'Rock',
  B: 'Paper',
  C: 'Scissors'
};

const myMoves = {
  Rock: { name: 'Rock', score: 1 },
  Paper: { name: 'Paper', score: 2 },
  Scissors: { name: 'Scissors', score: 3 }
};

const scores = { win: 6, draw: 3, loose: 0 };

const elfIndications = {
  X: 'loose',
  Y: 'draw',
  Z: 'win'
};

const roundResults = {
  Aloose: myMoves.Scissors,
  Adraw: myMoves.Rock,
  Awin: myMoves.Paper,
  Bloose: myMoves.Rock,
  Bdraw: myMoves.Paper,
  Bwin: myMoves.Scissors,
  Cloose: myMoves.Paper,
  Cdraw: myMoves.Scissors,
  Cwin: myMoves.Rock,
}

type RoundResultKey = keyof typeof roundResults;
type ElfIndicationsKey = keyof typeof elfIndications;
type ScoreKey = keyof typeof scores;

function predicElfStrategy() {
  const input = readFile('input.txt');
  const allRounds = input?.split('\n')!;
  let totalScore = 0;

  for (const round of allRounds) {
    const roundShapes = round.replace('\r', '').split(' ');
    const [elfShape, elfIndication] = roundShapes;

    const elfIndicationResult = elfIndications[elfIndication as ElfIndicationsKey];
    const roundResult = roundResults[`${elfShape}${elfIndicationResult}` as RoundResultKey];
    const myIndicationScore = scores[elfIndicationResult as ScoreKey];

    const roundScore = roundResult.score + myIndicationScore;
    totalScore += roundScore;
  }

  console.log(`totalScore ${totalScore}`);
}

predicElfStrategy();

