var calendarId =
  'd34a7730554333eb96c45c5cc66ef691a120630af8507e670f5a364abfa5e033@group.calendar.google.com';
// const calendarId = 'primary';

function collectBones() {
  var calendar = CalendarApp.getOwnedCalendarById(calendarId);
  var startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 1);
  var endDate = new Date();
  endDate.setFullYear(endDate.getFullYear() + 1);

  var eventsByKey = {};
  var events = calendar.getEvents(startDate, endDate);
  for (e of events) {
    var t = e.getTag("skeletor");
    if (!t) {
      t = tryBuildTagForEvent(e);
      if (t) e.setTag('skeletor', JSON.stringify(t));
    } else {
      t = JSON.parse(t);
    }

    if (t) {
      e.metadata = t;

      if (!(t.key in eventsByKey)) {
        eventsByKey[t.key] = [];
      }
      eventsByKey[t.key].push(e);
    }
  }

  console.log(JSON.stringify(eventsByKey));
  return eventsByKey;
}

function tryBuildTagForEvent(e) {
  var desc = e.getDescription();
  let match = (/^skeletor:\s*(.*)$/m).exec(desc);
  if (!match) {
    return null;
  }

  return {
    key: match[1],
    start_time: e.getStartTime().toISOString(),
  };
}
