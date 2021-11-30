const videoIcon = document.getElementById("videoIcon");
const audioIcon = document.getElementById("audioIcon");

var localTrackState = {
    videoTrackMuted: false,
    audioTrackMuted: false,
};

$("#muteAudio").click(function (e) {
    if (!localTrackState.audioTrackMuted) {
        muteAudio();
    } else {
        unmuteAudio();
    }
});

$("#muteVideo").click(function (e) {
    if (!localTrackState.videoTrackMuted) {
        muteVideo();
    } else {
        unmuteVideo();
    }
});

async function muteAudio() {
    if (!localTracks.audioTrack) return;
    totalUsers[options.uid].audioTrack._originMediaStreamTrack.enabled = false;
    audioIcon.className = "fa fa-microphone-slash";
    alert("audio mute activation");
}

async function unmuteAudio() {
    if (!localTracks.audioTrack) return;
    totalUsers[options.uid].audioTrack._originMediaStreamTrack.enabled = true;
    audioIcon.className = "fa fa-microphone";
    alert("audio unmute activation");
}

async function muteVideo() {
    debugger;
    if (!localTracks.videoTrack) return;
    totalUsers[options.uid].videoTrack._originMediaStreamTrack.enabled = false;
    videoIcon.className = "fas fa-video-slash";
    alert("video mute activation");
}

async function unmuteVideo() {
    if (!localTracks.videoTrack) return;
    totalUsers[options.uid].videoTrack._originMediaStreamTrack.enabled = true;
    videoIcon.className = "fas fa-video";
    alert("video unmute activation");
}
