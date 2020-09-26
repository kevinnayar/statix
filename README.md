# statix

A JS library for basic statistics methods:


```ts
min(items: number[]): number {}
```

```ts
max(items: number[]): number {}
```

```ts
sum(items: number[]): number {}
```

```ts
prod(items: number[]): number {}
```

```ts
mean(items: number[]): number {}
```

```ts
median(items: number[]): number {}
```

```ts
mode(items: any[]): any[] {}
```

```ts
weightedMean(items: Array<[number, number]>): number {} 
// items: Array<[value, weight]>
```

```ts
geometricMean(items: number[]): number {}
```

```ts
harmonicMean(items: number[]): number {}
```

```ts
groupedMean(items: Array<[number, number, number]>): number {} 
// items: Array<[rangeStart, rangeEnd, frequency]>
```

```ts
groupedMedian(items: Array<[number, number, number]>): number {}
// items: Array<[rangeStart, rangeEnd, frequency]>
```

```ts
groupedMode(items: Array<[number, number, number]>): number {} 
// items: Array<[rangeStart, rangeEnd, frequency]>
```

```ts
variance(items: number[], type: 'population' | 'sample'): number {}
```

```ts
standardDeviation(items: number[], type: 'population' | 'sample'): number {}
```