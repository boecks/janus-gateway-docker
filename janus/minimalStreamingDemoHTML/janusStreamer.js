function openStream(paramStreamId,paramContainingTagId){
	var server = 'http://<ip-of-janus-server>:8088/janus'; //you could also use the Janus Websocket or whatever transport you have enabled
	var selectedStream = paramStreamId;
	var videoTagId = paramContainingTagId;
	var janus = null;
	var streaming = null;
	var opaqueId = "janusStreamer-"+Janus.randomString(12);

	Janus.init({debug: "all", callback: function() {
			if(!Janus.isWebrtcSupported()) {
				return;
			}
			janus = new Janus(
				{
					server: server,
					success: function() {
						janus.attach(
							{
								plugin: "janus.plugin.streaming",
								opaqueId: opaqueId,
								success: function(pluginHandle) {
									streaming = pluginHandle;
									var body = { "request": "watch", id: parseInt(selectedStream) };
									streaming.send({"message": body});
								},
								onmessage: function(msg, jsep) {
									var result = msg["result"];
									if(result !== null && result !== undefined) {
										if(result["status"] !== undefined && result["status"] !== null) {
											var status = result["status"];
											if(status === 'stopped'){
												var body = { "request": "stop" };
												streaming.send({"message": body});
												streaming.hangup();
											}
										}
									} else if(msg["error"] !== undefined && msg["error"] !== null) {
										var body = { "request": "stop" };
										streaming.send({"message": body});
										streaming.hangup();
										return;
									}
									if(jsep !== undefined && jsep !== null) {
										streaming.createAnswer(
											{
												jsep: jsep,
												media: { audioSend: false, videoSend: false },
												success: function(jsep) {
													var body = { "request": "start" };
													streaming.send({"message": body, "jsep": jsep});
												}
											});
									}
								},
								onremotestream: function(stream) {
									
									$('#'+videoTagId).bind("playing", function () {
										var videoTracks = stream.getVideoTracks();
										if(videoTracks === null || videoTracks === undefined || videoTracks.length === 0)
											return;
									});
									Janus.attachMediaStream($('#'+videoTagId).get(0), stream);
									
								}
							});
					},
					error: function(error) {
						Janus.error(error, function() {
							window.location.reload();
						});
					},
					destroyed: function() {
						window.location.reload();
					}
				});
	}});
}
