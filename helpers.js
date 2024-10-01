function formatDateFromNow() {
  // Create a Date object using Date.now() which gives current timestamp in milliseconds
  const date = new Date(Date.now());

  // Arrays to map day and month numbers to names
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Extract day name, month name, day of month, and full year
  const dayName = days[date.getDay()];
  const monthName = months[date.getMonth()];
  const day = String(date.getDate()).padStart(2, '0'); // Add leading zero for single-digit days
  const year = date.getFullYear();

  // Return the formatted date string
  return `${dayName} ${monthName} ${day} ${year}`;
}



function formatDate(inputDate) {
  // Create a Date object from the yyyy-mm-dd string
  const date = new Date(inputDate);

  // Arrays to map day and month numbers to names
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Extract day name, month name, day of month, and full year
  const dayName = days[date.getDay()];
  const monthName = months[date.getMonth()];
  const day = String(date.getDate()).padStart(2, '0'); // Add leading zero for single-digit days
  const year = date.getFullYear();

  // Return the formatted date string
  return `${dayName} ${monthName} ${day} ${year}`;
}

function formatDate2(inputDate) {
  // Arrays to map day and month numbers to names
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Extract day name, month name, day of month, and full year
  const dayName = days[date.getDay()];
  const monthName = months[date.getMonth()];
  const day = String(date.getDate()).padStart(2, '0'); // Add leading zero for single-digit days
  const year = date.getFullYear();

  // Return the formatted date string
  return `${dayName} ${monthName} ${day} ${year}`;
}

const filterLogsByDate = async(logs,start,end)=>{
  const filteredLogs = [];
  let s = new Date(start)
  let e = new Date(end)

  for (const date of datesBetween(s, e)) {
      let d = formatDate2(date)
      logs.forEach(logItem=>{
          if(logItem.date==d) filteredLogs.push(logItem)
      })
  }
  return filteredLogs
    
}



module.exports = {formatDate,formatDateFromNow,filterLogsByDate}
