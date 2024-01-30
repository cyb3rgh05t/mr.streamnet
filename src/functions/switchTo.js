module.exports = {
    switchTo: function (val) {
        var status = " ";
        switch (val) {
            case 0:
                status = `<:icon_offline:993232252647514152> DISCONNECTED`
                break;

            case 1:
                status = `<:icon_online:993231898291736576> CONNECTED`
                break;

            case 2:
                status = `<:icon_connecting:993232321685762048> CONNECTING`
                break;

            case 3:
                status = `<:icon_disconnecting:993232346172104756> DISCONNECTING`
                break;
        }
        return status;
    }
}