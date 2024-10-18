import get from 'lodash/get';

import { PREDICTION_DAA_QUERY_ID } from '../constants';

const duneApiCall = async ({ queryId }: { queryId: string }) => {
  const response = await fetch(`https://api.dune.com/api/v1/query/${queryId}/results`, {
    headers: { 'X-Dune-API-Key': process.env.NEXT_PUBLIC_DUNE_API_KEY as string },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data from Dune API, status: ${response.status}`);
  }

  const json = await response.json();
  return json;
};

export const getPredictionDaa = async () => {
  try {
    const json = await duneApiCall({ queryId: PREDICTION_DAA_QUERY_ID });
    const average = get(json, 'result.rows[0].avg_7d_active_agents_count');
    return Math.ceil(average);
  } catch (error) {
    console.error('Error in getPredictionDaa:', error);
    return;
  }
};
