import { createConfig, http } from '@wagmi/core';
import { gnosis } from '@wagmi/core/chains';

export const wagmiConfig = createConfig({
  chains: [gnosis],
  transports: {
    [gnosis.id]: http(process.env.NEXT_PUBLIC_GNOSIS_URL ?? gnosis.rpcUrls.default.http[0]),
  },
});
