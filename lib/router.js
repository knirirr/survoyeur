Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

SurveyController = RouteController.extend({
  template: 'surveyList',
  before: function() {
    this.subscribe('surveys').wait();
    this.subscribe('questions').wait();
    this.subscribe('ratings'); // .wait();
    this.subscribe('answers'); // waiting here might make things hang, as there are no answers
  },
  data: function() { return Surveys.find(); }
});

Router.before(function() {
  Errors.clearSeen();
});

Router.map(function() {
  this.route('surveyList',{
    path: '/',
    controller: SurveyController
  });
  this.route('surveyList',{
    path: '/surveys',
    controller: SurveyController
  });
  this.route('surveyItem',{
    path: '/survey/:_id',
    template: 'surveyItem',
    before: function() {
      this.subscribe('singleSurvey', this.params._id).wait();
      this.subscribe('surveyQuestions', this.params._id).wait();
      this.subscribe('ratings'); // .wait();
      this.subscribe('answers'); // waiting here might make things hang, as there are no answers
    },
    data: function() { return Surveys.findOne(this.params._id); }
  });
  this.route('questionSummary',{path: '/:_id/summary'});
});

