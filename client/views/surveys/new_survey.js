/**
 * Created by milo on 03/02/2014.
 */

Template.newSurvey.events({
  'click #moar': function(e) {
    //alert("Moar buttong clicked!");
    questionNumber = Session.get('questionNumber');
    Session.set('questionNumber', questionNumber + 1);
    $("#question-section").append(Template[ 'someQuestions' ]());
  },
  'submit form': function(e, template) {
    e.preventDefault();
    /*
    Do some processing of the contents of the form...
     */
    Router.go("/surveys")
  }
});

/*
Inserting a question is done here rather than having it already in the template
in order to prevent the first question's number from being increased every time a
new one is added. I'm damned if I know why that happens, but it does.
 */

Template.newSurvey.rendered = function() {
  $("#question-section").append(Template[ 'someQuestions' ]());
}