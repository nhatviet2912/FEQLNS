export function formatDate(inputDateString) {
    const inputDate = new Date(inputDateString);
    
    if (isNaN(inputDate.getTime())) {
      // Invalid date string, return input as is or handle accordingly
      return inputDateString;
    }
  
    const day = String(inputDate.getDate()).padStart(2, '0');
    const month = String(inputDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = inputDate.getFullYear();
  
    return `${day}/${month}/${year}`;
}

export function formatGender(gender) {
    return gender === 0 ? 'Nữ' : 'Nam';
}