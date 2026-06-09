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
            relativeText = "Just now";
        } else if (diffMinutes < 60) {
            relativeText = diffMinutes === 1 ? "1 minute ago" : `${diffMinutes} minutes ago`;
        } else if (diffHours < 24) {
            relativeText = diffHours === 1 ? "1 hour ago" : `${diffHours} hours ago`;
        } else {
            relativeText = diffDays === 1 ? "1 day ago" : `${diffDays} days ago`;
        }

        timeClass.textContent = relativeText;
    });
