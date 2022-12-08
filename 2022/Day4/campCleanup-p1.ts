import { readFile } from '../../utils';


function getElfSections(elfRange: string[]) {
  const start = Number(elfRange[0]);
  const end = Number(elfRange[1]);
  const numberOfSections = ((end - start) + 1);
  return Array(numberOfSections).fill(0).map((v, i) => (i + start));
}

function compareSections(overlaps: number[], elfSection: number[]) {
  var i = elfSection.length;
  while (i--) {
      if (elfSection[i] !== overlaps[i]) return false;
  }
  return true;
}

function containsOverlaps(elf1Sections: number[], elf2Sections: number[]) {
  const overlaps = elf1Sections.filter(section => elf2Sections.includes(section))

  if (overlaps.length) {
    return compareSections(overlaps, elf1Sections) || compareSections(overlaps, elf2Sections);
  }

  return false;
}

function checkAssignmentsOverlaps() {
  const input = readFile('input.txt');
  const allLines = input?.split('\n')!;
  let overlapsCount = 0;

  for (const line of allLines) {
    const pairs = line.replace('\r', '').split(',');
    const elf1Range = pairs[0].split('-');
    const elf2Range = pairs[1].split('-');
    const elf1Sections = getElfSections(elf1Range);
    const elf2Sections = getElfSections(elf2Range);

    if (containsOverlaps(elf1Sections, elf2Sections)) {
      overlapsCount++;
    }
  }

  console.log('overlapsCount', overlapsCount);
}

checkAssignmentsOverlaps();