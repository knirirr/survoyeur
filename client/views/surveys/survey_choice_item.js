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
    if (Answers.find({questionId: {$in: questions}, userId: Meteor.userId()}).count() > 0) {
      return true;
    } else {
      return false;
    }
  },
  totalQuestions: function() {
    return questions = Questions.find({surveyId: this._id}).count();
  },
  isAdminUser: function() {
    return Roles.userIsInRole(Meteor.user(), ['admin']);
  }
});

function getid(thing) {
  return thing._id;
}
