const formatDate = (date) => {
  const parseDate = new Date(date);
  const monthNames = [
    'January', 'February', 'March',
    'April', 'May', 'June', 'July',
    'August', 'September', 'October',
    'November', 'December'
  ];
  const day = parseDate.getDate();
  const monthIndex = parseDate.getMonth();
  const year = parseDate.getFullYear();

  return `${day} ${monthNames[monthIndex]} ${year}`;
};

export default formatDate;
