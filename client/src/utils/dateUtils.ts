//date formatting function:
//example
//2023-12-28T20:25:52.282+00:00 => 28-12-2023

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${day}-${month}-${year}`;
};

export default formatDate;
