const calculateCommission = (saleAmount, rate) => {
  return (saleAmount * rate) / 100;
};

module.exports = calculateCommission;
