export const APP_NAME = 'Olas Predict';

export const QUESTION_IMAGE_SIZE = 120;
export const QUESTION_IMAGE_MOBILE_SIZE = 180;
export const MENU_MAX_WIDTH = 224;
export const CHART_HEIGHT = 230;

export const PAGE_QUERY_PARAM = 'page';
export const STATE_QUERY_PARAM = 'state';

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

export const REALITY_QUESTION_URL = `https://reality.eth.limo/app/#!/network/100/question/0x79e32ae03fb27b07c89c0c568f80287c01ca2e57-`;

const SUBGRAPH_API_KEY = process.env.NEXT_PUBLIC_SUBGRAPH_API_KEY;
export const OMEN_SUBGRAPH_URL = `https://gateway-arbitrum.network.thegraph.com/api/${SUBGRAPH_API_KEY}/subgraphs/id/9fUVQpFwzpdWS9bq5WkAnmKbNNcoBwatMR4yZq81pbbz`;
export const OMEN_THUMBNAIL_MAPPING_SUBGRAPH_URL = `https://gateway-arbitrum.network.thegraph.com/api/${SUBGRAPH_API_KEY}/subgraphs/id/EWN14ciGK53PpUiKSm7kMWQ6G4iz3tDrRLyZ1iXMQEdu`;
export const XDAI_BLOCKS_SUBGRAPH_URL = `https://gateway-arbitrum.network.thegraph.com/api/${SUBGRAPH_API_KEY}/subgraphs/id/D58aXwnRLfosFtRaVJAbAjjvKZ11bEsbdiDLkJJRdSC9`;
