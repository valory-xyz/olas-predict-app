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
export const OLAS_AGENTS_SUBGRAPH_URL =
  'https://api.studio.thegraph.com/query/67875/olas-agents/v0.0.25';
export const OLAS_MECH_SUBGRAPH_URL = 'https://api.studio.thegraph.com/query/57238/mech/v0.0.1';
