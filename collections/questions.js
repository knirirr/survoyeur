Questions = new Meteor.Collection('questions');

/*
 Answering questions only allowed when logged in
 */
Questions.allow({
  update: function(userId, doc) {
    return !! userId; }
});

Meteor.methods({
  question: function(questionAttributes) { // update or create a new rating
    var user = Meteor.user();

    if (!user)
      throw new Meteor.Error(401,"You must log in to create a question.");

    if(!Roles.userIsInRole(user, ['admin']))
      throw new Meteor.Error(403,"Only an admin may create a question.");

    question = _.extend(_.pick(questionAttributes, 'title', 'surveyId', 'number'), {
      ratings: [],
      answers: []
    });

    var questionId = Questions.insert(question);
    return questionId;
  },
  qpurge: function(id) { // delete a question
    Questions.remove({_id: id});
  }
});