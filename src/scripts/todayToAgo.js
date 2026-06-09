const timeClasses = document.querySelectorAll('.box-head a');

timeClasses.forEach((timeClass) => {
  let fullText = timeClass.textContent.trim();
  
  timeClass.setAttribute('title', fullText);

  const timeMatch = fullText.match(/\d{1,2}:\d{2}(:\d{2})?/);
  let timeString = timeMatch ? timeMatch[0] : "00:00:00";

  let timeParts = timeString.split(':');
  let postHours = parseInt(timeParts[0]);
  let postMinutes = parseInt(timeParts[1]);
  let totalPostMinutes = (postHours * 60) + postMinutes;

  const now = new Date();
  let currentHours = now.getHours();
  let currentMinutes = now.getMinutes();
  let totalCurrentMinutes = (currentHours * 60) + currentMinutes;

  let diffMinutes = 0;

  if (fullText.startsWith("Today")) {
    diffMinutes = totalCurrentMinutes - totalPostMinutes;
  } 
  else if (fullText.startsWith("Yesterday")) {
    diffMinutes = (totalCurrentMinutes + 1440) - totalPostMinutes;
  } 
  else {
    let parsedPastDate = Date.parse(fullText);
    if (!isNaN(parsedPastDate)) {
      diffMinutes = Math.floor((Date.now() - parsedPastDate) / 60000);
    } else {
      return;
    }
  }

  let diffHours = Math.floor(diffMinutes / 60);
  let diffDays = Math.floor(diffHours / 24);
  let relativeText = "";

  if (diffMinutes < 1) {
    relativeText = "just now";
  } else if (diffMinutes < 60) {
    relativeText = `about ${diffMinutes} minutes ago`;
  } else if (diffHours < 24) {
    relativeText = `about ${diffHours} hours ago`;
  } else {
    relativeText = `about ${diffDays} days ago`;
  }

  timeClass.textContent = relativeText;
});
