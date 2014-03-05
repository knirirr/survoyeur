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

    // begin checking for existing question
    if (questionAttributes._id) {
      var oldQuestion = Questions.findOne({_id: questionAttributes._id});
      if (oldQuestion) {
        //console.log("oldQuestion by id: " + oldQuestion._id);
        Questions.update(oldQuestion._id, questionAttributes);
        // don't re-add questions...
        return oldQuestion._id;
      } else {
        //console.log("Old question not found.");
      }
    }
    // end
    var oldQuestion = Questions.findOne({title: questionAttributes.title})
    if (oldQuestion) {
      //console.log("oldQuestion by text: " + oldQuestion._id);
      Questions.update(oldQuestion._id, questionAttributes);
      return oldQuestion._id;
    }
    question = _.extend(_.pick(questionAttributes, 'title', 'surveyId', 'number','hideRating','hideComments'), {
      ratings: [],
      answers: []
    });

    var questionId = Questions.insert(question);
    return questionId;
  },
  qpurge: function(id) { // delete a question
    var question = Questions.findOne({_id: id});
    if (isOwner(Meteor.user()._id,question) || Roles.userIsInRole(Meteor.user(), ['admin'])) {
      Questions.remove({_id: id});
      /*
      var survey = Surveys.find({questions: {$in: [id]}});
      Surveys.update(survey,{questions: {$pull: id}})
      */
    } else {
      console.log("Naughty!");
    }
  }
});