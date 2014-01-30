/**
 * Created by milo on 30/01/2014.
 */

Template.surveyChoiceItem.helpers({
  numberAnswered: function() {
    var questions = Questions.find({surveyId: this._id}).map(getid);
    return Answers.find({questionId: {$in: questions},userId: Meteor.userId()}).count();
  },
  alreadyTaken: function() {
    var questions = Questions.find({surveyId: this._id}).map(getid);
    if (Answers.find({questionId: {$in: questions}}).count() > 0) {
      return true;
    } else {
      return false;
    }
  }
});

function getid(thingy) {
  return thingy._id;
}