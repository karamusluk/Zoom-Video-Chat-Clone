const socket = io("/");
const videoGrid = document.getElementById("video-grid");
const myVideo = document.createElement("video");
myVideo.muted = true;

var peer = new Peer(undefined, {
  path: "/peerjs",
  host: "/",
  port: "3030",
});

let myVideoStream;
navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then((stream) => {
    myVideoStream = stream;
    muteUnmute();
    playStop();
    addVideoStream(myVideo, stream);

    peer.on("call", (call) => {
      call.answer(stream);
      const video = document.createElement("video");
      call.on("stream", (userVideoStream) => {
        addVideoStream(video, userVideoStream);
      });
    });
    socket.on("user-connected", (userId) => {
      connectToNewUser(userId, stream);
    });

    let msg = $("#chat_message");
    $("html").keydown((e) => {
      if (e.which === 13 && msg.val().length !== 0) {
        socket.emit("message", msg.val());
        msg.val("");
      }
    });

    socket.on("createMessage", (message, userId) => {
      $(".messages").append(
        `<li class="message"><b>${userId}</b><br/>${message}</li>`
      );
      scroolToBottom();
    });
  });
const addVideoStream = (video, stream) => {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  videoGrid.append(video);
};
peer.on("open", (id) => {
  socket.emit("join-room", ROOM_ID, id);
});

const connectToNewUser = (userId, stream) => {
  const call = peer.call(userId, stream);
  const video = document.createElement("video");
  call.on("stream", (userVideoStream) => {
    addVideoStream(video, userVideoStream);
  });
};

const scroolToBottom = () => {
  var d = $(".main__chat_window");
  d.scrollTop(d.prop("scrollHeight"));
};

const muteUnmute = () => {
  const enabled = myVideoStream.getAudioTracks()[0].enabled;
  if (enabled) {
    myVideoStream.getAudioTracks()[0].enabled = false;
    setUnmuteButton();
  } else {
    setMuteButton();
    myVideoStream.getAudioTracks()[0].enabled = true;
  }
};

const setMuteButton = () => {
  const html = `
      <i class="fas fa-microphone"></i>
      <span>Mute</span>
    `;
  document.querySelector(".main__mute_button").innerHTML = html;
};

const setUnmuteButton = () => {
  const html = `
      <i class="unmute fas fa-microphone-slash"></i>
      <span>Unmute</span>
    `;
  document.querySelector(".main__mute_button").innerHTML = html;
};

const playStop = () => {
  let enabled = myVideoStream.getVideoTracks()[0].enabled;
  if (enabled) {
    myVideoStream.getVideoTracks()[0].enabled = false;
    setPlayVideo();
  } else {
    setStopVideo();
    myVideoStream.getVideoTracks()[0].enabled = true;
  }
};

const setStopVideo = () => {
  const html = `
      <i class="fas fa-video"></i>
      <span>Stop Video</span>
    `;
  document.querySelector(".main__video_button").innerHTML = html;
};

const setPlayVideo = () => {
  const html = `
    <i class="stop fas fa-video-slash"></i>
      <span>Play Video</span>
    `;
  document.querySelector(".main__video_button").innerHTML = html;
};

document.addEventListener("DOMContentLoaded", function () {
  function dragElement(element, direction) {
    var md; // remember mouse down info

    const first = document.getElementsByClassName("main__left")[0];
    const second = document.getElementsByClassName("main__right")[0];

    element.onmousedown = onMouseDown;

    function onMouseDown(e) {
      //console.log("mouse down: " + e.clientX);
      md = {
        e,
        offsetLeft: element.offsetLeft,
        offsetTop: element.offsetTop,
        firstWidth: first.offsetWidth,
        secondWidth: second.offsetWidth,
      };

      document.onmousemove = onMouseMove;
      document.onmouseup = () => {
        //console.log("mouse up");
        document.onmousemove = document.onmouseup = null;
      };
    }

    function onMouseMove(e) {
      //console.log("mouse move: " + e.clientX);
      var delta = { x: e.clientX - md.e.clientX, y: e.clientY - md.e.clientY };

      if (direction === "H") {
        // Horizontal
        // Prevent negative-sized elements
        delta.x = Math.min(Math.max(delta.x, -md.firstWidth), md.secondWidth);

        element.style.left = md.offsetLeft + delta.x + "px";
        first.style.width = md.firstWidth + delta.x + "px";
        second.style.width = md.secondWidth - delta.x + "px";
      }
    }
  }
  dragElement(document.getElementById("dragMe"), "H");
});

const leaveMeeting = () => {
  const html = `
        <i class="fas fa-microphone"></i>
        <span>Mute</span>
      `;
  document.querySelector(".main__mute_button").innerHTML = html;
};
