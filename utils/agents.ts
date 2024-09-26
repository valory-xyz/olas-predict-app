const PREFIXES_BY_TYPE = {
  trader: 'T',
  creator: 'C',
  mech: 'M',
};

export const getAgentName = (address: string, type: 'trader' | 'creator' | 'mech') => {
  const prefix = address.slice(2, 6).toUpperCase();
  const end = address.slice(address.length - 2, address.length).toUpperCase();

  return `${PREFIXES_BY_TYPE[type]}-${prefix}${end}`;
};
