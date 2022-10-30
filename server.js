const path = require('path');
const express = require('express');
const app = express();

// Serve static files
app.use(express.static(__dirname + '/dist/FRONT_SCHOOL_CALENDAR'));

// Send all requests to index.html
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/FRONT_SCHOOL_CALENDAR/index.html'));
});

// start app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
