const calendarId = 'primary';

const skeletorColors = [
  CalendarApp.EventColor.YELLOW,
  CalendarApp.EventColor.MAUVE,
  CalendarApp.EventColor.PALE_BLUE,
];

function updateAllSkeletons() {
  const skeletons = buildSkeletonMap();
  colorSkeletons(skeletons);
  rescheduleSkeletons(skeletons);
}

function getKeyForEvent(e) {
  let match = (/^skeletor:\s*(.*)$/m).exec(e.getDescription());
  if (!match) return null;
  return match[1];
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

    e.metadata = getTagForEvent(e, key);
    (eventsByKey[key] = eventsByKey[key] || []).push(e);
  }

  return eventsByKey;
}

function rescheduleSkeletons(skeletons) {
  for (const key in skeletons) {
    const events = skeletons[key];
    console.log("Evaluating group '%s'...", key);
    rescheduleSkeleton(events);
  }
}

function rescheduleSkeleton(events) {
  var offset_event = null;
  for (const e of events) {
    if (e.metadata.start_time !== e.getStartTime().toISOString()) {
      if (offset_event !== null) {
        console.error("Skeletor group '%s' has multiple moved events!",
                      e.metadata.key);
        colorEvents(events, CalendarApp.EventColor.RED);
        return;
      }
      offset_event = e;
    }
  }
  if (offset_event === null) return;

  const offset_ms = computeOffsetInMilliseconds(offset_event);
  console.log("Moving group '%s' by %d minutes...", offset_event.metadata.key,
              millisecondsToMinutes(offset_ms));
  for (const e of events) {
    if (e === offset_event) continue;

    e.setTime(offsetTime(e.getStartTime(), offset_ms),
              offsetTime(e.getEndTime(), offset_ms));
  }

  for (const e of events) {
    e.metadata = buildTagForEvent(e, e.metadata.key);
  }
}

function computeOffsetInMilliseconds(e) {
  const o = new Date(e.metadata.start_time);
  const n = e.getStartTime();
  return n - o;
}

function millisecondsToMinutes(ms) {
  return ms / (60 * 1000);
}

function offsetTime(t, offset_ms) {
  t.setMilliseconds(t.getMilliseconds() + offset_ms);
  return t;
}

function colorSkeletons(skeletons) {
  var colorIndex = 0;
  for (const key in skeletons) {
    const events = skeletons[key];
    const color = skeletorColors[colorIndex++ % skeletorColors.length];
    colorEvents(events, color);
  }
}

function colorEvents(events, color) {
  for (const e of events) {
    e.setColor(color);
  }
}

function getTagForEvent(e, key) {
  var t = e.getTag("skeletor");
  if (t) {
    t = JSON.parse(t);
    if (t.key !== key) t = null;
  }

  if (!t) t = buildTagForEvent(e, key);
  return t;
}

function buildTagForEvent(e, key) {
  const tag = {
    key: key,
    start_time: e.getStartTime().toISOString(),
  };

  e.setTag('skeletor', JSON.stringify(tag));
  return tag;
}
