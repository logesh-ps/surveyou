const mongoose = require('mongoose');

const requireLogin = require('../middlewares/requireLogin');
const requireCredtis = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = (app) => {
  app.post('/api/surveys', requireLogin, requireCredtis, async (req, res) => {
    const {
      subject, body, title, recipients,
    } = req.body;
    const survey = new Survey({
      subject,
      body,
      title,
      recipients: recipients
        .split(',')
        .map((email) => ({ email: email.trim() })), // TODO : Lodash functions
      _user: req.user.id,
      dateSent: Date.now(),
    });

    const mailer = new Mailer(survey, surveyTemplate(survey));
    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      res.send(user);
    } catch (error) {
      res.status(422).send({ error });
    }
  });
};
