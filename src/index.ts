function checkArrayHasLength<T>(items: T[], message: string): T[] {
  if (!items.length) throw new Error(message);
  return items;
}

function checkEqualWidth(items: [number, number, number][], message: string): number {
  const width = items[0][1] - items[0][0] + 1;
  for (let i = 0; i < items.length; i += 1) {
    const item = items[i];
    if (item[1] - item[0] + 1 !== width) {
      throw new Error(message);
    }
  }
  return width;
}

type StandardDeviationType = 'population' | 'sample';

export function min(items: number[]): number {
  const validItems = checkArrayHasLength(items, 'min() items length cannot be 0');
  return Math.min(...validItems);
}

export function max(items: number[]): number {
  const validItems = checkArrayHasLength(items, 'max() items length cannot be 0');
  return Math.max(...validItems);
}

export function sum(items: number[]): number {
  let result = 0;
  for (let i = 0; i < items.length; i += 1) {
    result = result + items[i];
  }
  return result;
}

export function prod(items: number[]): number {
  if (!items.length) return 0;
  if (items.length === 1) return items[0];

  let result = 1;
  for (let i = 0; i < items.length; i += 1) {
    result = result * items[i];
  }
  return result;
}

export function mean(items: number[]): number {
  const validItems = checkArrayHasLength(items, 'mean() items length cannot be 0');
  return sum(validItems) / validItems.length;
}

export function median(items: number[]): number {
  const validItems = checkArrayHasLength(items, 'median() items length cannot be 0');
  const sorted = [...validItems].sort();
  const mid = Math.ceil(sorted.length / 2) - 1;
  return sorted.length % 2 === 1 ? sorted[mid] : (sorted[mid] + sorted[mid + 1]) / 2;
}

export function mode(items: any[]): any[] {
  if (!items.length) return [];
  if (items.length === 1) return [items[0]];

  const countMap: Map<any, number> = new Map();
  for (let i = 0; i < items.length; i += 1) {
    const existing = countMap.get(items[i]);
    const value = !!existing ? existing + 1 : 1;
    countMap.set(items[i], value);
  }

  const sortedTuple: Array<[any, number]> = [...countMap.entries()].sort((a, b) => {
    if (a[1] > b[1]) return -1;
    if (a[1] < b[1]) return 1;
    return 0;
  });
  const highest = sortedTuple[0][1];

  const result = [];
  for (let i = 0; i < sortedTuple.length; i += 1) {
    if (sortedTuple[i][1] === highest) {
      result.push(sortedTuple[i][0]);
    } else {
      break;
    }
  }
  return result.sort();
}

export function weightedMean(items: [number, number][]): number {
  // [value, weight]
  const validItems = checkArrayHasLength(items, 'weightedMean() items length cannot be 0');

  let weightedSum = 0;
  for (let i = 0; i < validItems.length; i += 1) {
    weightedSum = weightedSum + validItems[i][0] * validItems[i][1];
  }

  let totalWeights = 0;
  for (let i = 0; i < validItems.length; i += 1) {
    totalWeights = totalWeights + validItems[i][1];
  }

  return weightedSum / totalWeights;
}

export function geometricMean(items: number[]): number {
  const validItems = checkArrayHasLength(items, 'geometricMean() items length cannot be 0');
  return Math.pow(prod(validItems), 1 / validItems.length);
}

export function harmonicMean(items: number[]): number {
  const validItems = checkArrayHasLength(items, 'harmonicMean() items length cannot be 0');
  let reciprocalSum = 0;
  for (let i = 0; i < validItems.length; i += 1) {
    reciprocalSum = reciprocalSum + 1 / validItems[i];
  }
  return validItems.length / reciprocalSum;
}

export function groupedMean(items: [number, number, number][]): number {
  // [rangeStart, rangeEnd, frequency]
  const _width = checkEqualWidth(items, 'groupedMean() ranges must be equal in size');
  const validItems = checkArrayHasLength(items, 'groupedMean() items length cannot be 0');

  let frequenciesSum = 0;
  let midpointsXFrequencySum = 0;

  for (let i = 0; i < validItems.length; i += 1) {
    const item = validItems[i];
    const midpoint = (item[0] + item[1]) / 2;
    const frequency = item[2];

    frequenciesSum = frequenciesSum + frequency;
    midpointsXFrequencySum = midpointsXFrequencySum + (midpoint * frequency);
  }

  return midpointsXFrequencySum / frequenciesSum;
}

export function groupedMedian(items: [number, number, number][]): number {
  // [rangeStart, rangeEnd, frequency]
  const width = checkEqualWidth(items, 'groupedMedian() ranges must be equal in size');
  const validItems = checkArrayHasLength(items, 'groupedMedian() items length cannot be 0');
  
  let frequencySum = 0;
  for (let i = 0; i < validItems.length; i += 1) {
    const item = validItems[i];
    const frequency = item[2];
    frequencySum = frequencySum + frequency;
  }

  const frequencyMidpoint = frequencySum / 2;
  let cumulativeFrequencySum = 0;
  let medianClass: [number, number, number] = [0, 0, 0];

  for (let i = 0; i < validItems.length; i += 1) {
    const item = validItems[i];
    cumulativeFrequencySum = cumulativeFrequencySum + item[2];

    if (cumulativeFrequencySum >= frequencyMidpoint) {
      medianClass = item;
      break;
    }
  }

  let frequencySumBeforeMedian = 0;
  for (let i = 0; i < validItems.length; i += 1) {
    const item = validItems[i];
    if (
      item[0] === medianClass[0] &&
      item[1] === medianClass[1] &&
      item[2] === medianClass[2]
    ) {
      break;
    }
    frequencySumBeforeMedian = frequencySumBeforeMedian + item[2];
  }

  const lowerBound = medianClass[0] === 0 ? 0 : medianClass[0] - 0.5;
  const frequncyCalculation = (frequencyMidpoint - frequencySumBeforeMedian) / medianClass[2];
  const result = lowerBound + frequncyCalculation * width;
  return result;
}

export function groupedMode(items: [number, number, number][]): number {
  // [rangeStart, rangeEnd, frequency]
  const width = checkEqualWidth(items, 'groupedMode() ranges must be equal in size');
  const validItems = checkArrayHasLength(items, 'groupedMode() items length cannot be 0');

  let modalGroup: [number, number, number] = [0, 0, 0];
  let modalGroupIndex = -1;
  let frequencySum = 0;
  for (let i = 0; i < validItems.length; i += 1) {
    const item = validItems[i];
    if (item[2] > modalGroup[2]) {
      modalGroup = item;
      modalGroupIndex = i;
    }
    frequencySum = frequencySum + validItems[i][2];
  }

  const lowerBound = modalGroup[0] === 0 ? 0 : modalGroup[0] - 0.5;
  const frequencyModalGroup = modalGroup[2];

  const frequencyBeforeModalGroup = validItems[modalGroupIndex - 1][2];
  const frequencyAfterModalGroup = validItems[modalGroupIndex + 1][2];

  const frequencyCalculation = (frequencyModalGroup - frequencyBeforeModalGroup) / (
    (frequencyModalGroup - frequencyBeforeModalGroup) + 
    (frequencyModalGroup - frequencyAfterModalGroup)
  );

  const result = lowerBound + frequencyCalculation * width;
  return result;
}

export function variance(items: number[], type: StandardDeviationType): number {
  const len: number = type === 'population' ? items.length : items.length - 1;
  const average = mean(items);
  return items.reduce((all, n) => (all = all + Math.pow(n - average, 2)), 0) / len;
}

export function standardDeviation(items: number[], type: StandardDeviationType): number {
  return Math.sqrt(variance(items, type));
}

export default {
  min,
  max,
  sum,
  prod,
  mean,
  median,
  mode,
  weightedMean,
  geometricMean,
  harmonicMean,
  groupedMean,
  groupedMedian,
  variance,
  standardDeviation,
};
