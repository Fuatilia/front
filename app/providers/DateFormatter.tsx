const FormatDate = (dateString?: string | null): string => {
  if (!dateString) return "N/A";

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Safely extract YYYY-MM-DD from ISO timestamp or standard date string
  const datePart = dateString.split("T")[0]; 
  const [year, month, day] = datePart.split("-");

  if (!year || !month || !day) return dateString;

  const monthIndex = parseInt(month, 10) - 1;
  const monthName = months[monthIndex];

  if (!monthName) return dateString;

  return `${parseInt(day, 10)}-${monthName}-${year}`;
};

export default FormatDate;