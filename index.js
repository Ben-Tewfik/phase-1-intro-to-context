// Your code here
function createEmployeeRecord(employeeArray) {
  const [firstName, familyName, title, payRatePerHour] = employeeArray;
  return {
    firstName: firstName,
    familyName: familyName,
    title: title,
    payPerHour: payRatePerHour,
    timeInEvents: [],
    timeOutEvents: [],
  };
}
function createEmployeeRecords(employeesArrays) {
  return employeesArrays.map(createEmployeeRecord);
}

function createTimeInEvent(employeeRecord, dateStamp) {
  const [date, hour] = dateStamp.split(" ");
  employeeRecord.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour),
    date,
  });
  return employeeRecord;
}
function createTimeOutEvent(employeeRecord, dateStamp) {
  const [date, hour] = dateStamp.split(" ");
  employeeRecord.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour),
    date,
  });
  return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
  const timeInCheck = employeeRecord.timeInEvents.find(
    event => event.date === date
  );
  const timeOutCheck = employeeRecord.timeOutEvents.find(
    event => event.date === date
  );

  if (timeInCheck && timeOutCheck) {
    const timeIn = timeInCheck.hour;
    const timeOut = timeOutCheck.hour;

    const hoursWorked = (timeOut - timeIn) / 100;

    return hoursWorked;
  }

  return 0;
}

function wagesEarnedOnDate(employeeRecord, date) {
  const payOwed =
    hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour;
  return payOwed;
}

function allWagesFor(employeeRecord) {
  const datesWorked = employeeRecord.timeInEvents.map(event => event.date);
  const totalPayOwed = datesWorked.reduce((total, date) => {
    const payOwed = wagesEarnedOnDate(employeeRecord, date);
    return total + payOwed;
  }, 0);
  return totalPayOwed;
}

function calculatePayroll(employeesArrays) {
  const totalPayroll = employeesArrays.reduce((total, employeeRecord) => {
    const payOwed = allWagesFor(employeeRecord);
    return total + payOwed;
  }, 0);
  return totalPayroll;
}
