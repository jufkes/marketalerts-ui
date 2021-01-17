export interface EmaScanner {
  symbol: string;
  minute15: Direction;
  minute30: Direction;
  hour1: Direction;
  hour2: Direction;
  hour4: Direction;
  hour12: Direction;
  day1: Direction;
  week1: Direction;
  month1: Direction;
}

export enum Direction {
  BULLISH = 'BULLISH',
  BEARISH = 'BEARISH',
}
