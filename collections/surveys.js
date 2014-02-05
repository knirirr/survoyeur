/**
 * Created by milo on 27/01/2014.
 */

Surveys = new Meteor.Collection('surveys');

Meteor.methods({
  survey: function(surveyAttributes) {
    var user = Meteor.user();
    console.log("ID passed: " + surveyAttributes._id);

    if (!user)
      throw new Meteor.Error(401,"You must log in to create a survey.");

    if(!Roles.userIsInRole(user, ['admin']))
      throw new Meteor.Error(403,"Only an admin may create a survey.");

    // begin checking for existing survey
    if (surveyAttributes._id) {
      var oldSurvey = Surveys.findOne({_id: surveyAttributes._id});
      if (oldSurvey) {
        console.log("oldSurvey: " + oldSurvey._id);
        Surveys.update(oldSurvey._id,{$addToSet: {questions: surveyAttributes.questionId}})
        return oldSurvey._id;
      } else {
        console.log("Old survey not found.");
      }
    }
    // end

    survey = _.extend(_.pick(surveyAttributes, 'title', 'about'), {
      questions: [],
      created: new Date().getTime()
    });

    console.log("Survey title is " + survey.title);

    var surveyId = Surveys.insert(survey);

    console.log("Survey id is " + surveyId);

    return surveyId;
  }
});