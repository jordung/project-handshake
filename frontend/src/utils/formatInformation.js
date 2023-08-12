export function formatDateTime(startDate, endDate) {
  const startDateTime = new Date(startDate);
  const endDateTime = new Date(endDate);

  // Adjust for Singapore time zone offset (UTC+8)
  startDateTime.setUTCHours(startDateTime.getUTCHours() - 8);
  endDateTime.setUTCHours(endDateTime.getUTCHours() - 8);

  const formatDate = (dateTime) => {
    const day = String(dateTime.getDate()).padStart(2);
    const month = dateTime.toLocaleString("default", { month: "short" });
    const year = dateTime.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const formatTime = (dateTime) => {
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: "Asia/Singapore",
    };
    return new Intl.DateTimeFormat("en-US", options).format(dateTime);
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
      return "NIL";
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
      return "NIL";
  }
}

export function getVolunteerStatus(statusId) {
  switch (statusId) {
    case 1:
      return "Pending";
    case 2:
      return "Confirmed";
    case 3:
      return "Rejected";
    default:
      return "NIL";
  }
}

export function getVolunteerRole(roleId) {
  switch (roleId) {
    case 0:
      return "Unassigned";
    case 1:
      return "Committee";
    case 2:
      return "Facilitator";
    case 3:
      return "Participant";
    default:
      return "NIL";
  }
}
