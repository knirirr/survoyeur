/**
 * Created by milo on 30/01/2014.
 */
Template.surveyItemSummary.helpers({
  questions: function() {
    return Questions.find();
  }
});