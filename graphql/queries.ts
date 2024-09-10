import { gql, request } from 'graphql-request';

import {
  CREATOR_ADDRESSES,
  OMEN_SUBGRAPH_URL,
  OMEN_THUMBNAIL_MAPPING_SUBGRAPH_URL,
} from 'constants/index';

import {
  FixedProductMarketMaker_Filter,
  FpmmTrade_Filter,
  OmenThumbnailMapping,
  OutcomeTokenMarginalPricesResponse,
  Query,
  QueryFixedProductMarketMakerArgs,
  QueryFixedProductMarketMakersArgs,
  QueryFpmmTradesArgs,
} from './types';

const marketDataFragment = gql`
  fragment marketData on FixedProductMarketMaker {
    id
    collateralVolume
    collateralToken
    creationTimestamp
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
  ) {
    fixedProductMarketMakers(
      first: $first
      skip: $skip
      orderBy: creationTimestamp
      orderDirection: desc
      where: {
        outcomeSlotCount: 2,
        creator_in: [${CREATOR_ADDRESSES.map((address) => `"${address}"`)}],
        ${params.openingTimestamp_gt ? 'openingTimestamp_gt: $openingTimestamp_gt' : ''}
        ${params.answerFinalizedTimestamp_lt ? 'answerFinalizedTimestamp_lt: $answerFinalizedTimestamp_lt' : ''}
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
      fpmm {
        outcomes
      }
      creator {
        id
      }
    }
  }
`;

const getMarginalPriceQuery = gql`
  query marginalPricesByBlockNumber($id: ID!, $block: Int) {
    fixedProductMarketMaker(id: $id, block: { number: $block }) {
      outcomeTokenMarginalPrices
    }
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

export const getMarginalPrice = async (params: { id: string; block: number }) =>
  request<OutcomeTokenMarginalPricesResponse>(OMEN_SUBGRAPH_URL, getMarginalPriceQuery, params);

export const getMarketThumbnail = async (params: { id: string }) =>
  request<OmenThumbnailMapping>(
    OMEN_THUMBNAIL_MAPPING_SUBGRAPH_URL,
    getMarketThumbnailQuery,
    params,
  );

export const getMarket = async (params: QueryFixedProductMarketMakerArgs) =>
  request<Pick<Query, 'fixedProductMarketMaker'>>(OMEN_SUBGRAPH_URL, getMarketQuery, params);
