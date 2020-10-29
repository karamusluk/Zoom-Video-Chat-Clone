# Zoom Video/Chat Clone

This is a working clone of Zoom with video conferencing and chatting peer-to-peer.

[Live Example on Heroku](https://intense-temple-83154.herokuapp.com/)<sup> (may not work occasionally)</sup>

## Setup

There is no explicity insturctions to run this app.

Run following command to start in development mode.

```bash
npm i && nodemon server.js
```

### Deployment

You can with 1-click.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/karamusluk/Zoom-Video-Chat-Clone)

### Features

- Users can create meeting or join to a created one with the id from the URL.
  i.e. https://intense-temple-83154.herokuapp.com/06fd8079-88af-486e-998c-04e30783d0d2 where id is **06fd8079-88af-486e-998c-04e30783d0d2**

- On the room page, users can toggle voice and video.
- Users can chat in the room. This chat is peer-to-peer and will be only availble to a particular user after user joins. User cannot see the previously sent messages.
- Users can leave the room with 1-click .

### To-Dos

- [ ] Participants will be added.
- [ ] Chat can be toggled.
- [ ] User authentication will be added.
- [ ] Private rooms with password protection
- [ ] Room creation will be stored in db.

### Used Technologies

[ExpressJS](https://expressjs.com/)
[Node.js](https://nodejs.org/en/)
[peer.js](https://peerjs.com/)
[socket.io](https://socket.io/)

### Screenshots

Join or Create a meeting Screen

![Join/Create Meeting Page](/screenshots/landing.png "OJoin/Create Meeting Page")

Room Screen

![Join/Create Meeting Page](/screenshots/room.png "OJoin/Create Meeting Page")
