const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
require('./models/User');
require('./services/passport');

const passport = require('passport');
const keys = require('./config/keys');

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [keys.cookieKey],
}));

app.use(passport.initialize());
app.use(passport.session());

require('./routes/auth')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
