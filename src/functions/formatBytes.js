module.exports = {
    formatBytes: function (bytes) {
        if (bytes === 0) return "0 B";
        const sizes = ["B", "KB", "MB", "GB", "TB"];
        return `${(bytes / Math.pow(1024, Math.floor(Math.log(bytes) / Math.log(1024)))).toFixed(2)} ${sizes[Math.floor(Math.log(bytes) / Math.log(1024))]}`;
    }
}