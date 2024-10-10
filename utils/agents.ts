import { nameGenerator } from 'utils/nameGenerator';

export const getAgentName = (address: string) => nameGenerator(address);
