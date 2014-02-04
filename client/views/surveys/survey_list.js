/**
 * Created by milo on 27/01/2014.
 */

Template.surveyList.helpers({
  surveys: function() {
    console.log("survey_list.js, survey count: " + Surveys.find().count());
    return Surveys.find();
  },
  // check if user is an admin
  isAdminUser: function() {
    return Roles.userIsInRole(Meteor.user(), ['admin']);
  }
});