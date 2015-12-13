module.exports = function (day,month,year) {

  if (!year) return false;

  day = parseInt(day);
  month = parseInt(month);

  var d = new Date(year, month-1, day);

  return d && (d.getMonth() + 1) == month && d.getDate() == Number(day)?d:false;

}
