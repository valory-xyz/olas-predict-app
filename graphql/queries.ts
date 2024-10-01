import { gql, request } from 'graphql-request';

import {
  BROKEN_MARKETS,
  CREATOR_ADDRESSES,
  INVALID_ANSWER_HEX,
  OLAS_AGENTS_SUBGRAPH_URL,
  OMEN_SUBGRAPH_URL,
  OMEN_THUMBNAIL_MAPPING_SUBGRAPH_URL,
  XDAI_BLOCKS_SUBGRAPH_URL,
} from 'constants/index';

import {
  AgentsGlobal,
  FixedProductMarketMaker,
  FixedProductMarketMaker_Filter,
  FpmmTrade_Filter,
  OmenThumbnailMapping,
  OutcomeTokenMarginalPricesResponse,
  Query,
  QueryFixedProductMarketMakerArgs,
  QueryFixedProductMarketMakersArgs,
  QueryFpmmLiquiditiesArgs,
  QueryFpmmTradesArgs,
  TraderAgents,
} from './types';

const marketDataFragment = gql`
  fragment marketData on FixedProductMarketMaker {
    id
    collateralVolume
    collateralToken
    creationTimestamp
    answerFinalizedTimestamp
    creator
    lastActiveDay
    outcomeTokenAmounts
    runningDailyVolumeByHour
    scaledLiquidityParameter
    title
    outcomes
    openingTimestamp
    arbitrator
    category
    templateId
    scaledLiquidityParameter
    curatedByDxDao
    klerosTCRregistered
    outcomeTokenMarginalPrices
    condition {
      id
      oracle
      scalarLow
      scalarHigh
      __typename
    }
    question {
      id
      data
      currentAnswer
      outcomes
      answers {
        answer
        bondAggregate
        __typename
      }
      __typename
    }
    outcomes
    outcomeTokenMarginalPrices
    usdVolume
    __typename
  }
`;

const getMarketsQuery = (
  params: QueryFixedProductMarketMakersArgs & FixedProductMarketMaker_Filter,
) => gql`
  query GetMarkets(
    $first: Int!
    $skip: Int!
    $openingTimestamp_gt: Int
    $answerFinalizedTimestamp_lt: Int
    $scaledLiquidityParameter_gt: Int
    $orderBy: String
    $orderDirection: String
  ) {
    fixedProductMarketMakers(
      first: $first
      skip: $skip
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: {
        outcomeSlotCount: 2
        id_not_in: [${BROKEN_MARKETS.map((address) => `"${address}"`)}]
        creator_in: [${CREATOR_ADDRESSES.map((address) => `"${address}"`)}]
        ${params.openingTimestamp_gt ? 'openingTimestamp_gt: $openingTimestamp_gt' : ''}
        ${
          params.answerFinalizedTimestamp_lt
            ? `
          answerFinalizedTimestamp_lt: $answerFinalizedTimestamp_lt,
          currentAnswer_not: "${INVALID_ANSWER_HEX}"
          `
            : ''
        }
        ${params.scaledLiquidityParameter_gt !== undefined ? 'scaledLiquidityParameter_gt: $scaledLiquidityParameter_gt' : ''}
      }
    ) {
      ...marketData
      __typename
    }
  }

  ${marketDataFragment}
`;

const getMarketTradesQuery = gql`
  query GetMarketUserTrades(
    $first: Int!
    $fpmm: ID!
    $skip: Int
    $orderBy: String
    $orderDirection: String
  ) {
    fpmmTrades(
      where: { fpmm: $fpmm }
      first: $first
      skip: $skip
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      creationTimestamp
      id
      outcomeIndex
      outcomeTokensTraded
      transactionHash
      collateralAmountUSD
      feeAmount
      type
      fpmm {
        outcomes
      }
      creator {
        id
      }
    }
  }
`;

const getMarketLiquidityQuery = gql`
  query GetMarketLiquidity(
    $first: Int!
    $fpmm: ID!
    $skip: Int
    $orderBy: String
    $orderDirection: String
  ) {
    fpmmLiquidities(
      where: { fpmm: $fpmm }
      first: $first
      skip: $skip
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      id
      outcomeTokenAmounts
      creationTimestamp
    }
  }
`;

const getMarginalPriceQuery = (blockNumbers: number[]) => gql`
  query MarginalPricesByBlockNumber($id: ID!, $block: Int) {
    ${blockNumbers.map(
      (block) => `_${block}: fixedProductMarketMaker(id: $id, block: { number: ${block} }) {
        outcomeTokenMarginalPrices
      }`,
    )}
  }
`;

const getMarketThumbnailQuery = gql`
  query GetOmenThumbnail($id: ID) {
    omenThumbnailMapping(id: $id) {
      image_hash
    }
  }
`;

const getMarketQuery = gql`
  query GetMarket($id: ID!) {
    fixedProductMarketMaker(id: $id) {
      ...marketData
      __typename
    }
  }

  ${marketDataFragment}
`;

const getBlocksQuery = (timestamps: number[]) => gql`
  query GetBlocks {
    ${timestamps.map(
      (timestamp) => `_${timestamp}: blocks(where: {timestamp: ${timestamp}}, first: 1) {
        number
      }`,
    )}
  }

  ${marketDataFragment}
`;

const getGlobalQuery = gql`
  query GetAgentsGlobal {
    global(id: "") {
      id
      totalActiveTraderAgents
    }
  }
`;

const getTraderAgentsQuery = gql`
  query GetOlasTraderAgents($first: Int!, $skip: Int!) {
    traderAgents(
      first: $first
      skip: $skip
      orderBy: totalBets
      orderDirection: desc
      where: { totalBets_gt: 0 }
    ) {
      id
      totalBets
    }
  }
`;

export const getMarkets = async (
  params: QueryFixedProductMarketMakersArgs & FixedProductMarketMaker_Filter,
) =>
  request<Pick<Query, 'fixedProductMarketMakers'>>(
    OMEN_SUBGRAPH_URL,
    getMarketsQuery(params),
    params,
  );

export const getMarketTrades = async (params: QueryFpmmTradesArgs & FpmmTrade_Filter) =>
  request<Pick<Query, 'fpmmTrades'>>(OMEN_SUBGRAPH_URL, getMarketTradesQuery, params);

export const getMarketLiquidity = async (params: QueryFpmmLiquiditiesArgs & FpmmTrade_Filter) =>
  request<Pick<Query, 'fpmmLiquidities'>>(OMEN_SUBGRAPH_URL, getMarketLiquidityQuery, params);

export const getMarginalPrices = async (params: {
  id: FixedProductMarketMaker['id'];
  blockNumbers: number[];
}) =>
  request<OutcomeTokenMarginalPricesResponse>(
    OMEN_SUBGRAPH_URL,
    getMarginalPriceQuery(params.blockNumbers),
    { id: params.id },
  );

export const getMarketThumbnail = async (params: { id: FixedProductMarketMaker['id'] }) =>
  request<OmenThumbnailMapping>(
    OMEN_THUMBNAIL_MAPPING_SUBGRAPH_URL,
    getMarketThumbnailQuery,
    params,
  );

export const getMarket = async (params: QueryFixedProductMarketMakerArgs) =>
  request<Pick<Query, 'fixedProductMarketMaker'>>(OMEN_SUBGRAPH_URL, getMarketQuery, params);

export const getBlocksByTimestamps = async ({ timestamps }: { timestamps: number[] }) =>
  request<Record<string, { number: string }[]>>(
    XDAI_BLOCKS_SUBGRAPH_URL,
    getBlocksQuery(timestamps),
  );

export const getGlobal = async () =>
  request<AgentsGlobal>(OLAS_AGENTS_SUBGRAPH_URL, getGlobalQuery);

export const getTraderAgents = async (params: { first: number; skip: number }) =>
  request<TraderAgents>(OLAS_AGENTS_SUBGRAPH_URL, getTraderAgentsQuery, params);
