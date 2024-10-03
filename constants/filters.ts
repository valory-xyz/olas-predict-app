import { FixedProductMarketMaker_OrderBy, OrderDirection } from 'graphql/types';

const nowTimestamp = Math.floor(Date.now() / 1000);

export const DEFAULT_STATE_FILTER = 'opened';

export const STATE_FILTER_VALUES = [
  { label: 'All', value: 'all' },
  {
    label: 'Opened',
    value: 'opened',
    params: {
      orderBy: FixedProductMarketMaker_OrderBy.UsdVolume,
      orderDirection: OrderDirection.Desc,
      openingTimestamp_gt: nowTimestamp,
      scaledLiquidityParameter_gt: 0,
    },
  },
  {
    label: 'Closed',
    value: 'closed',
    params: {
      orderBy: FixedProductMarketMaker_OrderBy.AnswerFinalizedTimestamp,
      orderDirection: OrderDirection.Desc,
      answerFinalizedTimestamp_lt: nowTimestamp,
    },
  },
];
