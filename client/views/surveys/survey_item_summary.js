/**
 * Created by milo on 30/01/2014.
 */


Template.surveyItemSummary.helpers({
  questions: function() {
    return Questions.find({surveyId: this._id});
  },
  isLoggedIn: function() {
    if (Meteor.user()) {
      return true;
    }
    return false;
  }

});

