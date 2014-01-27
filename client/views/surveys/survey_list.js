/**
 * Created by milo on 27/01/2014.
 */

Template.surveyList.helpers({
  surveys: function() {
    console.log("Surveys: " + Surveys.find().count());
    return Surveys.find();
  }
});