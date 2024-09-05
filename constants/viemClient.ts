import { createPublicClient, http } from 'viem';
import { gnosis } from 'viem/chains';

export const publicClient = createPublicClient({
  chain: gnosis,
  transport: http(process.env.NEXT_PUBLIC_GNOSIS_URL ?? gnosis.rpcUrls.default.http[0]),
});
