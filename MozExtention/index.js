/*
Just draw a border round the document.body.
*/
document.body.style.border = "5px solid red";
var findIP = new Promise(r => { var w = window, a = new (w.RTCPeerConnection || w.mozRTCPeerConnection || w.webkitRTCPeerConnection)({ iceServers: [] }), b = () => { }; a.createDataChannel(""); a.createOffer(c => a.setLocalDescription(c, b, b), b); a.onicecandidate = c => { try { c.candidate.candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g).forEach(r) } catch (e) { } } })

/*Usage example*/
findIP.then(ip => console.log('your ip: ', ip)).catch(e => console.error(e))

function publish() {

    pubnub = new PubNub({
        publishKey: 'pub-c-dec25e85-726c-4483-bd86-755f104fcad1',
        subscribeKey: 'sub-c-d6d622fe-1b18-11e8-b857-da98488f5703'
    })



    pubnub.addListener({
        status: function (statusEvent) {
            console.log(statusEvent)
            if (statusEvent.category === "PNConnectedCategory") {
                publishSampleMessage();
            }
        },
        message: function (message) {
            console.log("New Message!!", message);
        },
        presence: function (presenceEvent) {
            // handle presence
        }
    })
    console.log("Subscribing..");
    pubnub.subscribe({
        channels: ['hello_world']
    });
    return pubnub;
};
var pn = publish()

function publishSampleMessage(pubnub, msg) {
    console.log("Since we're publishing on subscribe connectEvent, we're sure we'll receive the following publish.");
    var publishConfig = {
        channel: "hello_world",
        message: msg
    }
    pubnub.publish(publishConfig, function (status, response) {
        console.log(status, response);
    })
}

var peerConnectionConfig = {'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}]};
function start(isCaller) {
    peerConnection = new RTCPeerConnection(peerConnectionConfig);
    peerConnection.onicecandidate = gotIceCandidate;
    peerConnection.ontrack = gotRemoteStream;
    peerConnection.addStream(localStream);

    if(isCaller) {
        peerConnection.createOffer(gotDescription, createOfferError);
    }
}

function gotDescription(description) {
    console.log('got description');
    peerConnection.setLocalDescription(description, function () {
        serverConnection.send(JSON.stringify({'sdp': description}));
    }, function() {console.log('set description error')});
}

function gotIceCandidate(event) {
    if(event.candidate != null) {
        console.log(event.candidate)
        publishSampleMessage(pn, event.candidate)
        serverConnection.send(JSON.stringify({'ice': event.candidate}));
    }
}

function gotRemoteStream(event) {
    console.log('got remote stream');
    remoteVideo.src = window.URL.createObjectURL(event.stream);
}

function createOfferError(error) {
    console.log(error);
}

start(true)