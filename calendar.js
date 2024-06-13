const calendarId =
  'd34a7730554333eb96c45c5cc66ef691a120630af8507e670f5a364abfa5e033@group.calendar.google.com';
// const calendarId = 'primary';

const skeletorColors = [
  CalendarApp.EventColor.YELLOW,
  CalendarApp.EventColor.MAUVE,
  CalendarApp.EventColor.PALE_BLUE,
];

function updateAllSkeletons() {
  const skeletons = buildSkeletonMap();
  recolorSkeletons(skeletons);
  rescheduleSkeletons(skeletons);
}

function rescheduleSkeletons(skeletons) {
  for (const key in skeletons) {
    const events = skeletons[key];
    console.log("Evaluating group '%s'...", key);
    rescheduleEvents(events);
  }
}

function rescheduleEvents(events) {
  var offset_event = null;
  for (const e of events) {
    if (e.metadata.start_time !== e.getStartTime().toISOString()) {
      if (offset_event !== null) {
        console.log("Skeletor group '%s' has multiple moved events!", e.metadata.key);
        recolorEvents(events, CalendarApp.EventColor.RED);
        return;
      }
      offset_event = e;
    }
  }
  if (offset_event === null) return;


  const offset = computeOffset(offset_event);
  console.log("Moving group '%s' by %d minutes...", offset_event.metadata.key, offset / (60 * 1000));
  for (const e of events) {
    if (e === offset_event) continue;
    const ts = e.getStartTime();
    const te = e.getEndTime();
    ts.setMilliseconds(offset);
    te.setMilliseconds(offset);
    e.setTime(ts, te);
  }

  for (const e of events) {
    e.metadata = buildTagForEvent(e, e.metadata.key);
  }
}

function computeOffset(e) {
  const o = new Date(e.metadata.start_time);
  const n = e.getStartTime();
  return n - o;
}

function recolorSkeletons(skeletons) {
  var colorIndex = 0;
  for (const key in skeletons) {
    const events = skeletons[key];
    const color = skeletorColors[colorIndex++ % skeletorColors.length];
    recolorEvents(events, color);
  }
}

function recolorEvents(events, color) {
  for (const e of events) {
    e.setColor(color);
  }
}

function buildSkeletonMap() {
  const calendar = CalendarApp.getOwnedCalendarById(calendarId);
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 1);
  const endDate = new Date();
  endDate.setFullYear(endDate.getFullYear() + 1);

  const eventsByKey = new Map;
  const events = calendar.getEvents(startDate, endDate);
  for (const e of events) {
    const key = getKeyForEvent(e);
    if (!key) continue;
    

    var t = e.getTag("skeletor");
    if (t) {
      t = JSON.parse(t);
      if (t.key !== key) t = null;
    }

    if (!t) t = buildTagForEvent(e, key);
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
  const tag = {
    key: key,
    start_time: e.getStartTime().toISOString(),
  };

  e.setTag('skeletor', JSON.stringify(tag));
  return tag;
}
