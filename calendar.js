const calendarId =
  'd34a7730554333eb96c45c5cc66ef691a120630af8507e670f5a364abfa5e033@group.calendar.google.com';
// const calendarId = 'primary';

const skeletorColors = [
  CalendarApp.EventColor.YELLOW,
  CalendarApp.EventColor.MAUVE,
  CalendarApp.EventColor.PALE_BLUE,
];

function recolorSkeletons() {
  const skeletons = buildSkeletonMap();
 
  var colorIndex = 0;
  for (const key in skeletons) {
    const events = skeletons[key];
    const color = skeletorColors[colorIndex++ % skeletorColors.length];
    for (const e of events) {
      e.setColor(color);
      console.log(JSON.stringify(e));
    }
  }
}

function buildSkeletonMap() {
  const calendar = CalendarApp.getOwnedCalendarById(calendarId);
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 1);
  const endDate = new Date();
  endDate.setFullYear(endDate.getFullYear() + 1);

  const eventsByKey = {};
  const events = calendar.getEvents(startDate, endDate);
  for (const e of events) {
    const key = getKeyForEvent(e);
    if (!key) continue;

    var t = e.getTag("skeletor");
    if (t) {
      t = JSON.parse(t);
      if (t.key !== key) {
        t = null;
      }
    }

    if (!t) {
      t = buildTagForEvent(e);
      e.setTag('skeletor', JSON.stringify(t));
    }

    e.metadata = t;
    (eventsByKey[key] = eventsByKey[key] || []).push(e);
  }

  return eventsByKey;
}

function getKeyForEvent(e) {
  var desc = e.getDescription();
  let match = (/^skeletor:\s*(.*)$/m).exec(desc);
  if (!match) return null;
  return match[1];
}

function buildTagForEvent(e, key) {
  return {
    key: key,
    start_time: e.getStartTime().toISOString(),
  };
}
