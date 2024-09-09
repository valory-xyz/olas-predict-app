export const APP_NAME = 'Olas Predict';

export const QUESTION_IMAGE_SIZE = 120;

export const PAGE_QUERY_PARAM = 'page';
export const STATE_QUERY_PARAM = 'state';

export const CREATOR_ADDRESSES = [
  // quickstart
  '0x89c5cc945dd550BcFfb72Fe42BfF002429F46Fec',
  // pearl
  '0xFfc8029154ECD55ABED15BD428bA596E7D23f557',
];

export const REALITY_QUESTION_URL = `https://reality.eth.limo/app/#!/network/100/question/0x79e32ae03fb27b07c89c0c568f80287c01ca2e57-`;

const SUBGRAPH_API_KEY = process.env.NEXT_PUBLIC_SUBGRAPH_API_KEY;
export const OMEN_SUBGRAPH_URL = `https://gateway-arbitrum.network.thegraph.com/api/${SUBGRAPH_API_KEY}/subgraphs/id/9fUVQpFwzpdWS9bq5WkAnmKbNNcoBwatMR4yZq81pbbz`;
export const OMEN_THUMBNAIL_MAPPING_SUBGRAPH_URL = `https://gateway-arbitrum.network.thegraph.com/api/${SUBGRAPH_API_KEY}/subgraphs/id/EWN14ciGK53PpUiKSm7kMWQ6G4iz3tDrRLyZ1iXMQEdu`;
