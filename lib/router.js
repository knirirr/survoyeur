Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { return [Meteor.subscribe('questions'),Meteor.subscribe('ratings')]}
});

Router.before(function() {
  Errors.clearSeen();
});

Router.map(function() {
  this.route('questionList',{path: '/'});
  this.route('questionList',{path: '/questions'});
  this.route('testRoute',{path: '/test'});
});

