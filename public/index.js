const joinMetting = () => {
  var meetingId = $("#join-meetno");
  var errorBox = $(".index__room_error");

  console.log(meetingId.val());
  (async () => {
    const rawResponse = await fetch(`/validateName/${meetingId.val()}`);
    const content = await rawResponse.json();

    console.log(content);
    if (content.valid) {
      errorBox.css("visibility", "hidden");
      window.location.href = `/${meetingId.val()}`;
    } else {
      errorBox.text("No Room Found");
      errorBox.css("visibility", "inherit");
    }
  })();
};
const createMeeting = () => {};
