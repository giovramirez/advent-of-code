import { readFile } from '../../utils';

function totalizeCalories(elfInventory: number[]) {
  const totalCalories = elfInventory.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  )
  return totalCalories;
}

function isElfCaloriesDone(calories: string) {
  return !calories;
}

function checkTopThreePositions(totalElfCalories: number, topThreeCalories: number[]) {
  if (totalElfCalories > topThreeCalories[0]) {
    topThreeCalories[2] = topThreeCalories[1];
    topThreeCalories[1] = topThreeCalories[0];
    topThreeCalories[0] = totalElfCalories;
  } else if (totalElfCalories > topThreeCalories[1]) {
    topThreeCalories[2] = topThreeCalories[1];
    topThreeCalories[1] = totalElfCalories;
  } else if (totalElfCalories > topThreeCalories[2]) {
    topThreeCalories[2] = totalElfCalories;
  }
}

function checkElvesInventory() {
  const input = readFile('input.txt');
  const allElvesCalories = input?.split('\n')!;
  const topThreeCalories: number[] = [0, 0, 0];
  let heighestElfCalories = 0;
  let elfCalories: number[] = [];

  for (const elfCalorie of allElvesCalories) {
    if (isElfCaloriesDone(elfCalorie)) {
      const totalElfCalories = totalizeCalories(elfCalories);

      if (totalElfCalories > heighestElfCalories) {
        heighestElfCalories = totalElfCalories;
      }

      checkTopThreePositions(totalElfCalories, topThreeCalories);

      elfCalories = [];
    } else {
      elfCalories.push(Number(elfCalorie));
    }
  }

  console.log(`heighestElfCalories: ${heighestElfCalories}`);
  console.log(`topThreeCaloriesTotal: ${totalizeCalories(topThreeCalories)}`)
}

checkElvesInventory();
