var IO = null;
!function () {
    var WS_STATUS = {
        CONNECTING: 0,
        OPEN: 1,
        CLOSING: 2,
        CLOSED: 3
    };

    IO = function (url) {
        this.url = url;
        this.ws = null;
        try {
            if ("WebSocket" in window) {
                this.ws = new WebSocket("ws://" + url);
            }
            else if("MozWebSocket" in window) {
                this.ws = new MozWebSocket("ws://" + url);
            }
            else {
                alert('your borwser don\'t support WebSocket');
            }
        } catch (ex) {
            console.error(ex);
            return;
        }
        if (this.ws != null) {
            this.ws.onopen = WSonOpen;
            this.ws.onmessage = WSonMessage;
            this.ws.onclose = WSonClose;
            this.ws.onerror = WSonError;
        }
    }

    IO.prototype.send = function (message, callback) {
        if (this.ws != null && this.ws.readyState == WS_STATUS.OPEN) {
            this.ws.onmessage = function (e) {
                callback(e.data);
            }
            this.ws.send(message);
        } else {
            alert('Connecting...');
        }
    }

    function WSonOpen() {
        alert('Connected!');
    };

    function WSonMessage(event) {
        alert('Initiative message：' + event.data);
    };

    function WSonClose() {
        alert('Connection Closed');
    };

    function WSonError() {
        alert('Lose connection');
    };
}();