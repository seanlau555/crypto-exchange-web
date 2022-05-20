import { expect } from 'vitest'
import { parseResponse } from './utils'

test('data massage', () => {
  expect(
    parseResponse({
      data: {
        bars: [
          {
            c: 36183,
            h: 36217,
            l: 35920,
            n: 393,
            o: 35981,
            t: '2022-05-06T16:00:00Z',
            v: 74.1064,
            vw: 36114.086974,
            x: 'FTXU',
          },
        ],
      },
    }),
  ).toEqual([
    {
      close: 36183,
      date: '2022-05-06T16:00:00Z',
      high: 36217,
      low: 35920,
      open: 35981,
      volume: 74.1064,
    },
  ])
})
