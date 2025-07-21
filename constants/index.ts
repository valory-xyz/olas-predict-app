export const APP_NAME = 'Olas Predict Beta';

export const QUESTION_IMAGE_SIZE = 120;
export const QUESTION_IMAGE_MOBILE_SIZE = 180;
export const MENU_MAX_WIDTH = 224;
export const CHART_HEIGHT = 230;

export const PAGE_QUERY_PARAM = 'page';
export const STATE_QUERY_PARAM = 'state';

export const NA = 'n/a';

export const CREATORS: Record<string, { name: string; image: string }> = {
  '0x89c5cc945dd550bcffb72fe42bff002429f46fec': {
    name: 'Quickstart',
    image: '/images/github.svg',
  },
  '0xffc8029154ecd55abed15bd428ba596e7d23f557': {
    name: 'Pearl',
    image: '/images/pearl.svg',
  },
};

export const CREATOR_ADDRESSES = Object.keys(CREATORS);

export const BROKEN_MARKETS = [
  '0xe7ed8a5f2f0f17f7d584ae8ddd0592d1ac67791f',
  '0xbfa584b29891941c8950ce975c1f7fa595ce1b99',
];

export const INVALID_ANSWER_HEX =
  '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';

export const REALITY_QUESTION_URL =
  'https://reality.eth.limo/app/#!/network/100/question/0x79e32ae03fb27b07c89c0c568f80287c01ca2e57-';
export const GNOSIS_SCAN_URL = 'https://gnosisscan.io';
export const IPFS_GATEWAY_URL = 'https://gateway.autonolas.tech/ipfs/';

const SUBGRAPH_API_KEY = process.env.NEXT_PUBLIC_SUBGRAPH_API_KEY;
export const OMEN_SUBGRAPH_URL = `https://gateway-arbitrum.network.thegraph.com/api/${SUBGRAPH_API_KEY}/subgraphs/id/9fUVQpFwzpdWS9bq5WkAnmKbNNcoBwatMR4yZq81pbbz`;
export const OMEN_THUMBNAIL_MAPPING_SUBGRAPH_URL = `https://gateway-arbitrum.network.thegraph.com/api/${SUBGRAPH_API_KEY}/subgraphs/id/EWN14ciGK53PpUiKSm7kMWQ6G4iz3tDrRLyZ1iXMQEdu`;
export const XDAI_BLOCKS_SUBGRAPH_URL = `https://gateway-arbitrum.network.thegraph.com/api/${SUBGRAPH_API_KEY}/subgraphs/id/D58aXwnRLfosFtRaVJAbAjjvKZ11bEsbdiDLkJJRdSC9`;
export const CONDITIONAL_TOKENS_SUBGRAPH_URL = `https://gateway-arbitrum.network.thegraph.com/api/${SUBGRAPH_API_KEY}/subgraphs/id/7s9rGBffUTL8kDZuxvvpuc46v44iuDarbrADBFw5uVp2`;

export const OLAS_AGENTS_SUBGRAPH_URL = 'https://predict-agents.subgraph.autonolas.tech';
export const OLAS_MECH_SUBGRAPH_URL = 'https://subgraph.autonolas.tech/subgraphs/name/mech';
export const GNOSIS_STAKING_SUBGRAPH_URL =
  'https://gateway.thegraph.com/api/5c035877a4af18d178c96afe55ed41ae/subgraphs/id/F3iqL2iw5UTrP1qbb4S694pGEkBwzoxXp1TRikB2K4e';

export const ARTICLE_SOURCE_BY_CREATOR: Record<string, string> = {
  '0x89c5cc945dd550bcffb72fe42bff002429f46fec': 'https://marketserver.autonolas.tech/market',
  '0xffc8029154ecd55abed15bd428ba596e7d23f557':
    'https://market-approval-pearl.autonolas.tech/market',
};

export const DUNE_QUERY_URL = 'https://dune.com/queries';
export const PREDICTION_DAA_QUERY_ID = '4165113';
export const PREDICTION_ECONOMY_DASHBOARD_URL =
  'https://dune.com/adrian0x/the-olas-predict-agent-economy';

export const COINGECKO_OLAS_IN_USD_PRICE_URL =
  'https://api.coingecko.com/api/v3/simple/token_price/xdai?contract_addresses=0xcE11e14225575945b8E6Dc0D4F2dD4C570f79d9f&vs_currencies=usd';

export const OLAS_ADDRESS = '0xce11e14225575945b8e6dc0d4f2dd4c570f79d9f';
