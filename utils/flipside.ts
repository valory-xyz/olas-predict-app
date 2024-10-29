import { get } from 'lodash';

const flipsideCryptoApiCall = async ({ queryId }: { queryId: string }) => {
  try {
    const response = await fetch(
      `https://flipsidecrypto.xyz/api/v1/queries/${queryId}/data/latest`,
    );
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }

  return null;
};

const SEVEN_DAY_AVG_DAILY_ACTIVE_AGENTS_ID = '276784c3-8481-4b46-9334-6e579b524628';
export const getPredictionDaa = async () => {
  try {
    const result = await flipsideCryptoApiCall({
      queryId: SEVEN_DAY_AVG_DAILY_ACTIVE_AGENTS_ID,
    });
    const average = get(result, "[0]['AVG_7D_ACTIVE_AGENTS_COUNT']") || null;
    return Math.floor(average);
  } catch (error) {
    console.error('Error in getSevenDayAvgDailyActiveAgents: ', error);
    return null;
  }
};
