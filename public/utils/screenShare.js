const screenShareBtn = document.getElementById("shareScreen");

screenShareBtn.addEventListener("click", screenShareJoin);

function LeaveShareScreen(screenClient, screenTrack) {
    screenClient.unpublish(screenTrack);
    if(screenTrack[1]){
        screenTrack.map((track) => {
            track.stop();
            track.close();
        });
    }else{
        screenTrack.stop();
        screenTrack.close();
    }
    
    screenClient.leave();
}

async function screenShareJoin() {
    const screenClient = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    
    await screenClient.join(
        options.appid,
        options.channel || window.sessionStorage.getItem("channel"),
        null,
        `${options.uid}Screen` ||
            `${window.sessionStorage.getItem("uid")}Screen`
    );
    
    const screenTrack = await AgoraRTC.createScreenVideoTrack(
        {
            encoderConfig: {
                framerate: 29.9
            },
        },
        "auto"
    );
    
    if(screenTrack[1]){
        await screenClient.publish([screenTrack[0],screenTrack[1]]);
        screenTrack[0].on("track-ended", () => {
            LeaveShareScreen(screenClient, screenTrack);
        });
    }else{
        await screenClient.publish(screenTrack);
        screenTrack.on("track-ended", () => {
            LeaveShareScreen(screenClient, screenTrack);
        });
    }

}
