var calendarId =
    'd34a7730554333eb96c45c5cc66ef691a120630af8507e670f5a364abfa5e033@group.calendar.google.com';
// const calendarId = 'primary';

function collectBones() {
  var calendar = CalendarApp.getOwnedCalendarById(calendarId);
  Logger.log('The calendar is named "%s".', calendar.getName());
  var startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 1);
  var endDate = new Date();
  endDate.setFullYear(endDate.getFullYear() + 1);
  var events = calendar.getEvents(startDate, endDate);
  for (var e of events) {
    console.log(e.getTitle());
  }
}
