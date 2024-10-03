import base58 from 'bs58';

import { IPFS_GATEWAY_URL } from 'constants/index';

/**
 * Convert 32 bytes hex string to ipfscidv0.
 * @param hexstr - 32 Bytes long string
 * @returns IPFS CID Version 0
 */
export function byte32ToIPFSCIDV0(hexstr: string): string {
  const binaryStr = Buffer.from(hexstr, 'hex');
  const completedBinaryStr = Buffer.concat([Buffer.from([0x12, 0x20]), binaryStr]);
  return base58.encode(completedBinaryStr);
}

export const getIpfsResponse = async (hash: string) => {
  try {
    const ipfsUrl = `${IPFS_GATEWAY_URL}f01701220${hash.substring(2)}`;
    const response = await fetch(ipfsUrl);
    const json = await response.json();
    return json;
  } catch (e) {
    window.console.error('Error fetching metadata from IPFS', e);
    throw e;
  }
};
