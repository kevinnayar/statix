import {
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
  groupedMode,
  variance,
  standardDeviation,
} from './index';

describe('min', () => {
  test('min', () => {
    expect(min([1, 2, 3, 4])).toEqual(1);
    expect(min([-1, 0, 2, 3, 4])).toEqual(-1)
  });
});

describe('max', () => {
  test('max', () => {
    expect(max([1, 2, 3, 4])).toEqual(4);
    expect(max([-1, 0, 2, 3, 4])).toEqual(4);
  });
});

describe('sum', () => {
  test('sum', () => {
    expect(sum([1, 2, 3, 4])).toEqual(10);
    expect(sum([])).toEqual(0);
    expect(sum([10])).toEqual(10);
    expect(sum([-1, 2, -3, 4])).toEqual(2);
    expect(sum([0, 0, 0, 0])).toEqual(0);
    expect(sum([3.14, 3.14, 3.14])).toEqual(9.42);
  });
});

describe('prod', () => {
  test('prod', () => {
    expect(prod([3, 3, 3, 3])).toEqual(81);
    expect(prod([])).toEqual(0);
    expect(prod([10])).toEqual(10);
    expect(prod([-1, -2, -3])).toEqual(-6);
    expect(prod([0, 0, 0, 0])).toEqual(0);
    expect(prod([3.14, 3.14])).toEqual(9.8596);
  });
});

describe('mean', () => {
  test('mean', () => {
    expect(mean([1, 2, 3, 4, 5])).toEqual(3);
    expect(mean([1, 2, 3, 4, 5, 6, 80])).toEqual(14.428571428571429);
  });
});

describe('median', () => {
  test('median', () => {
    expect(median([1, 2, 3, 4, 5])).toEqual(3);
    expect(median([1, 2, 3, 4, 5, 6, 80])).toEqual(4);
  });
});

describe('mode', () => {
  test('mode', () => {
    expect(mode([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
    expect(mode([1, 1, 2, 3, 4, 5])).toEqual([1]);
    expect(mode([1, 2, 3, 5, 7, 8, 2, 3, 5, 9, 5, 7, 8, 1])).toEqual([5]);
    expect(mode(['foo', 'bar', 'baz', 'bar', 'bart', 'bart', 'cart', 'baz'])).toEqual(['bar', 'bart', 'baz']);
    expect(mode([])).toEqual([]);
    expect(mode(['foo'])).toEqual(['foo']);
  });
});

describe('weightedMean', () => {
  test('weightedMean', () => {
    expect(
      weightedMean([
        [5, 0.25],
        [3, 0.5],
        [8, 0.125],
        [9, 0.125],
      ]),
    ).toEqual(4.875);
    expect(
      weightedMean([
        [5, 20],
        [4, 10],
      ]),
    ).toEqual(4.666666666666667);
  });
});

describe('harmonicMean', () => {
  test('harmonicMean', () => {
    expect(harmonicMean([1, 2, 4])).toEqual(1.7142857142857142);
  });
});

describe('geometricMean', () => {
  test('geometricMean', () => {
    expect(geometricMean([10, 51.2, 8])).toEqual(15.999999999999998);
  });
});

describe('groupedMean', () => {
  test('groupedMean', () => {
    expect(groupedMean([
      [51, 55, 2],
      [56, 60, 7],
      [61, 65, 8],
      [66, 70, 4],
    ])).toEqual(61.333333333333336);
    expect(groupedMean([
      [1, 5, 3],
      [6, 10, 7],
      [11, 15, 8],
      [16, 20, 10],
      [21, 25, 7],
      [26, 30, 4],
    ])).toEqual(15.948717948717949);
    expect(groupedMean([
      [0, 10, 3],
      [10, 20, 10],
      [20, 30, 6],
      [30, 40, 4],
      [40, 50, 2],
    ])).toEqual(21.8);
  });
});

describe('groupedMedian', () => {
  test('groupedMedian', () => {
    expect(groupedMedian([
      [51, 55, 2],
      [56, 60, 7],
      [61, 65, 8],
      [66, 70, 4],
    ])).toEqual(61.4375);
    expect(groupedMedian([
      [1, 100, 38],
      [101, 200, 37],
      [201, 300, 32],
      [301, 400, 28],
      [401, 500, 43],
    ])).toEqual(244.25);
    expect(groupedMedian([
      [16, 20, 2],
      [21, 25, 7],
      [26, 30, 14], 
      [31, 35, 8],
      [36, 40, 8],
      [41, 45, 1],
    ])).toEqual(29.428571428571427);
  });
});

describe('groupedMode', () => {
  test('groupedMode', () => {
    expect(groupedMode([
      [51, 55, 2],
      [56, 60, 7],
      [61, 65, 8],
      [66, 70, 4],
    ])).toEqual(61.5);
    expect(groupedMode([
      [5, 6, 16,],
      [6, 7, 28,],
      [7, 8, 24,],
      [8, 9, 32,],
      [9, 10, 20,],
    ])).toEqual(8.3);
  })
});

describe('variance', () => {
  test('variance', () => {
    expect(variance([4, 5, 6], 'population')).toEqual(0.6666666666666666);
    expect(variance([4, 5, 6], 'sample')).toEqual(1);
  });
});

describe('standardDeviation', () => {
  test('standardDeviation', () => {
    expect(standardDeviation([1, 2, 3, 4, 5], 'population')).toEqual(1.4142135623730951);
    expect(standardDeviation([1, 2, 3, 4, 5], 'sample')).toEqual(1.5811388300841898);
  });
});



