/**
 * Created by milo on 03/02/2014.
 */

Template.someQuestions.helpers({
  questionNumber: function() {
    return Session.get("questionNumber");
  }
});
