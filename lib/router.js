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
  }
});

Router.before(function() {
  Errors.clearSeen();
});

Router.map(function() {
  this.route('welcome',{
    path: '/'
  });
  this.route('surveyList',{
    path: '/surveys',
    controller: SurveyController
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
    }
  });
});

