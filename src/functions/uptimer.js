module.exports = {
    uptimer: function (seconds) {
        seconds = seconds || 0;
        seconds = Number(seconds);
        seconds = Math.abs(seconds);

        var d = Math.floor(seconds / (3600 * 24));
        var h = Math.floor(seconds % (3600 * 24) / 3600);
        var m = Math.floor(seconds % 3600 / 60);
        var s = Math.floor(seconds % 60);
        var parts = new Array();

        if (d > 0) {
            var dDisplay = d > 0 ? d + ' ' + (d == 1 ? "day" : "days") : "";
            parts.push(dDisplay);
        }

        if (h > 0) {
            var hDisplay = h > 0 ? h + ' ' + (h == 1 ? "hour" : "hours") : "";
            parts.push(hDisplay)
        }

        if (m > 0) {
            var mDisplay = m > 0 ? m + ' ' + (m == 1 ? "minute" : "minutes") : "";
            parts.push(mDisplay)
        }

        if (s > 0) {
            var sDisplay = s > 0 ? s + ' ' + (s == 1 ? "second" : "seconds") : "";
            parts.push(sDisplay)
        }

        return parts.join(', ', parts);
    }
}