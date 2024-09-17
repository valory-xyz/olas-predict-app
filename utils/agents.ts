export const getAgentName = (address: string) => {
  const prefix = address.slice(2, 6).toUpperCase();
  const end = address.slice(address.length - 2, address.length).toUpperCase();

  return `T-${prefix}${end}`;
};
