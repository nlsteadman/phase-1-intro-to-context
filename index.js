// Your code here
function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

function createEmployeeRecords(employeeArray) {
    return employeeArray.map(array => createEmployeeRecord(array))
}

function createTimeInEvent(employee, timeInStamp) {
    let [date, hour] = timeInStamp.split(' ');

    employee.timeInEvents.push( {
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date,
    })
    return employee;
}

function createTimeOutEvent(employee, timeOutStamp) {
    let [date, hour] = timeOutStamp.split(' ');

    employee.timeOutEvents.push( {
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date,
    })
    return employee;
}

function hoursWorkedOnDate(employee, findDate) {
    console.log("hoursWorkedOnDate", employee.timeInEvents)
    let clockIn = employee.timeInEvents.find(e => e.date == findDate)
    let clockOut = employee.timeOutEvents.find(e => e.date == findDate)
    console.log("clockIn",clockIn)
    return (clockOut.hour - clockIn.hour) / 100
}

function wagesEarnedOnDate(employee, findDate) {
    console.log("wagesEarnedOnDate", employee)
    let wage = hoursWorkedOnDate(employee, findDate) * employee.payPerHour
    return wage;
}

function allWagesFor(employee) {
    let allDates = employee.timeInEvents.map(e => e.date);
    console.log("allWagesFor", allDates)

    return allDates.reduce((total, currentDate) => total + wagesEarnedOnDate(employee,currentDate), 0);
    
}

function calculatePayroll(employeeArray) {
    console.log("employeeArray", employeeArray)
    return employeeArray.reduce((total, employee) => {
        console.log("employee", employee)
        return total + allWagesFor(employee)}, 0)
}

