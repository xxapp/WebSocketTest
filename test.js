
window.onload = function () {
	var io = null;
	$('connect').onclick = function () {
		io = new IO($('url').value + ':' + $('port').value);
		var status = '';
		switch (io.ws.readyState) {
			case 0: status = 'Connecting';break;
			case 1: status = 'Opened';break;
			case 2: status = 'Closing';break;
			case 3: status = 'Closed';break;
		}
		$('status').innerHTML = status;
		if (io != null) {
			io.ws.addEventListener('message', function (e) {
				$('console').value += e.data + '\n';
			});
		}
	}
	$('send').onclick = function () {
		if (io != null) {
			var message = $('message').value;
			io.send(message, function (data) {
				$('console').value += data + '\n';
			});
			$('sended').value += message + '\n';
		}
	}

}
function $ (id) {
	return document.getElementById(id);
}