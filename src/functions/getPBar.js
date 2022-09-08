module.exports = {
    getPBar: function (percent) {
        let thick = Math.floor(percent / 5);
        let thin = Math.ceil((100 - percent) / 10) * 2;
        let str = " [";

        for (let i = 0; i < thick; i++) str += "▰";
        for (let i = 0; i < thin; i++) str += "▱";

        str += "] ";
        return str;
    }
}