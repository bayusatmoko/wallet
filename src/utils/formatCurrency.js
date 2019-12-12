const formatCurrency = (amount, currency = '$') => {
  let parseAmount = parseFloat(amount);
  parseAmount = parseAmount.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
  return `${currency} ${parseAmount}`;
};

export default formatCurrency;
