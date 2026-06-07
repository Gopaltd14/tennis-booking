function pad(n) {
  return String(n).padStart(2, '0');
}

function addMinutes(h, m, delta) {
  const total = h * 60 + m + delta;
  return { h: Math.floor(total / 60), m: total % 60 };
}

function formatTime(h, m) {
  return `${pad(h)}:${pad(m)}`;
}

function formatLabel(h, m) {
  const suffix = h < 12 ? 'AM' : 'PM';
  const display = h % 12 === 0 ? 12 : h % 12;
  return `${display}:${pad(m)} ${suffix}`;
}

export function generateSlots(courtId, date) {
  const slots = [];
  let h = 7, m = 0;

  while (h < 21 || (h === 20 && m === 30)) {
    const next = addMinutes(h, m, 30);
    slots.push({
      id: `${courtId}__${date}__${formatTime(h, m)}`,
      courtId,
      date,
      startTime: formatTime(h, m),
      endTime: formatTime(next.h, next.m),
      label: formatLabel(h, m),
    });
    ({ h, m } = next);
    if (h > 20 || (h === 20 && m > 30)) break;
  }

  return slots;
}
