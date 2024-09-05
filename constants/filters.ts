const nowTimestamp = Math.floor(Date.now() / 1000);

export const STATE_FILTER_VALUES = [
  { label: 'All', value: 'all' },
  {
    label: 'Opened',
    value: 'opened',
    when: {
      openingTimestamp_gt: nowTimestamp,
      scaledLiquidityParameter_gt: 0,
    },
  },
  {
    label: 'Closed',
    value: 'closed',
    when: {
      answerFinalizedTimestamp_lt: nowTimestamp,
    },
  },
];
