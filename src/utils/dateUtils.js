export const isFutureDate = (date) => {
  return new Date(date) > new Date();
};

export const formatDate = (date) => {
  return new Date(date).toLocaleString();
};
