/* eslint-disable global-require */
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
require('./models/User');
require('./models/Survey');
require('./services/passport');

const passport = require('passport');
const keys = require('./config/keys');

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(bodyParser.json());
app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [keys.cookieKey],
}));

app.use(passport.initialize());
app.use(passport.session());

require('./routes/auth')(app);
require('./routes/billing')(app);
require('./routes/survey')(app);

if (process.env.NODE_ENV === 'production') {
  // to serve production assets
  app.use(express.static('client/build'));

  // to serve production index.html for other routes
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
