const mongoose = require('mongoose');
const _ = require('lodash');
const { Path } = require('path-parser');

const requireLogin = require('../middlewares/requireLogin');
const requireCredtis = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = (app) => {
  app.get('/api/surveys', async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({ recipients: false });

    res.send(surveys);
  });

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send(`Hey ${req.user.displayName} !! Thanks for voting`);
  });

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

  app.post('/api/surveys/webhooks', (req, res) => {
    console.log('req: ', req.body);
    const p = new Path('/api/surveys/:surveyId/:choice');

    _.chain(req.body)
      .map(({ email, url }) => {
        const pathName = new URL(url).pathname;
        const match = p.test(pathName);

        if (match) return { ...match, email };
        return undefined;
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne({
          _id: surveyId,
          recipients: {
            $elemMatch: { email, responded: false },
          },
        }, {
          $inc: { [choice]: 1 },
          $set: { 'recipients.$.responded': true },
        })
          .exec();
      })
      .value();

    res.send({});
  });
};
