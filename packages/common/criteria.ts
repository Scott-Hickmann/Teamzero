import { Criteria } from '@teamzero/types';

export const criteria: Readonly<Criteria>[] = [
  'hasFamilyMember',
  'homelessSinceMoreThan3Months',
  'hasADisability'
];

export const criteriaStringArrayToIntArray = (
  chosenCriteria: Criteria[]
): number[] => {
  const baseArray = new Array(criteria.length).fill(0);
  chosenCriteria.forEach((criterion) => {
    if (criteria.indexOf(criterion) !== -1) {
      baseArray[criteria.indexOf(criterion)] = 1;
    }
  });
  return baseArray;
};
