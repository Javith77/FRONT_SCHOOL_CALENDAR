const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 8000;
const server = require('http').Server(app);

app.use(express.static(__dirname, 'dist', {index: false}));

//start app by listening on the default Heroku port
server.listen(port, function() {
  console.log("App running on port " + port);
})

// Serve static files
app.use(express.static(path.join(__dirname, 'dist','FRONT_SCHOOL_CALENDAR')));

// Send all requests to index.html
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'FRONT_SCHOOL_CALENDAR', 'index.html'));
});
