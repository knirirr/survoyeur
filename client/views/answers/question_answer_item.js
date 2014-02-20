/**
 * Created by milo on 20/02/2014.
 */

Template.questionAnswerItem.helpers({
  answers: function() {
    return Answers.find({questionId: this._id});
  },
  title: function() {
    return this.title;
  },
  noAnswers: function() {
    if (Answers.find({questionId: this._id}).count() == 0) {
      return "No answers yet!";
    } else {
      return "";
    }
  }
});