Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

SurveyController = RouteController.extend({
  template: 'surveyList',
  data: function() { return Surveys.find(); },
  before: function() {
    this.subscribe('surveys').wait();
    this.subscribe('questions').wait();
    this.subscribe('ratings'); // .wait();
    this.subscribe('answers'); // waiting here might make things hang, as there are no answers
    this.subscribe('directory');
    this.subscribe('notifications');
  }
});

Router.before(function() {
  Errors.clearSeen();
});

Router.map(function() {
  this.route('welcome',{
    path: '/',
    before: function() {
      this.subscribe('notifications');
    }
  });
  this.route('newSurvey', {
    path: '/new',
    // why does Meteor.user() return undefined in this function if the
    // page is reloaded in the browser?
    before: function() {
      if(!Roles.userIsInRole(Meteor.user(), ['admin'])) {
        console.log('Redirecting naughty user.');
        // I'd like to throw an error here, if I could work out how
        this.redirect('/');
      } else {
        Session.set('questionNumber',1);
        console.log("Admin approved.");
      }
      this.subscribe('surveys').wait();
      this.subscribe('questions').wait();
      this.subscribe('directory');
      this.subscribe('notifications');
    }
  }),
  this.route('editSurvey', {
    path: '/survey/:_id/edit',
    data: function() { return Surveys.findOne(this.params._id); },
    before: function() {
      if(!Roles.userIsInRole(Meteor.user(), ['admin'])) {
        console.log('Redirecting naughty user.');
        // I'd like to throw an error here, if I could work out how
        this.redirect('/');
      } else {
        console.log("Admin approved.");
      }
      this.subscribe('singleSurvey', this.params._id).wait();
      this.subscribe('surveyQuestions', this.params._id).wait();
      this.subscribe('surveyRatings', this.params._id);
      this.subscribe('surveyAnswers', this.params._id);
      this.subscribe('directory');
      this.subscribe('notifications');
    }
  }),
  this.route('surveyList',{
    path: '/surveys',
    controller: SurveyController,
    before: function() {
      this.subscribe('notifications');
    }

  });
  this.route('surveyItem',{
    path: '/survey/:_id',
    template: 'surveyItem',
    data: function() { return Surveys.findOne(this.params._id); },
    before: function() {
      this.subscribe('singleSurvey', this.params._id).wait();
      this.subscribe('surveyQuestions', this.params._id).wait();
      this.subscribe('surveyRatings', this.params._id);
      this.subscribe('surveyAnswers', this.params._id);
      this.subscribe('surveyComments', this.params._id);
      this.subscribe('directory');
      this.subscribe('notifications');
    }
  });
  this.route('surveySummary', {
    path: '/survey/:_id/summary',
    template: 'surveyItemSummary',
    data: function() { return Surveys.findOne(this.params._id); },
    before: function() {
      this.subscribe('singleSurvey', this.params._id).wait();
      this.subscribe('surveyQuestions', this.params._id).wait();
      this.subscribe('surveyRatings', this.params._id);
      this.subscribe('surveyAnswers', this.params._id);
      this.subscribe('surveyComments', this.params._id);
      this.subscribe('directory');
      this.subscribe('notifications');
    }
  });
});

