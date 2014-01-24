/**
 * Created by milo on 24/01/2014.
 */
Template.questionSummary.helpers({
  questions: function() {
    return Questions.find();
  }
});