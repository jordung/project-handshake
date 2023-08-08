export function formatDateTime(startDate, endDate) {
  const startDateTime = new Date(startDate);
  const endDateTime = new Date(endDate);

  const formatDate = (dateTime) => {
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, "0");
    const day = String(dateTime.getDate()).padStart(2, "0");
    return `${day}/${month}/${year}`;
  };

  const formatTime = (dateTime) => {
    const hours = String(dateTime.getHours()).padStart(2, "0");
    const minutes = String(dateTime.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}H`;
  };

  const sameDate = startDateTime.toDateString() === endDateTime.toDateString();

  if (sameDate) {
    const startTime = formatTime(startDateTime);
    const endTime = formatTime(endDateTime);
    return `${formatDate(startDateTime)} ${startTime} - ${endTime}`;
  } else {
    const startFormatted = `${formatDate(startDateTime)} ${formatTime(
      startDateTime
    )}`;
    const endFormatted = `${formatDate(endDateTime)} ${formatTime(
      endDateTime
    )}`;
    return `${startFormatted} - ${endFormatted}`;
  }
}

export function getProjectTargetDisplay(targetId) {
  switch (targetId) {
    case 1:
      return "Seniors";
    case 2:
      return "Youths";
    case 3:
      return "Animals";
    case 4:
      return "Environment";
    case 5:
      return "PWD";
    case 6:
      return "Others";
    default:
      return "Unknown";
  }
}

export function getOrganiserTypeDisplay(typeId) {
  switch (typeId) {
    case 1:
      return "Volunteer";
    case 2:
      return "Organisation";
    case 3:
      return "Team";
    default:
      return "Unknown";
  }
}
