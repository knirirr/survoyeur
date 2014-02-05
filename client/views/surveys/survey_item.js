/**
 * Created by milo on 27/01/2014.
 */

Template.surveyItem.helpers({
  questions: function() {
    console.log("Calling survey_item.js");
    console.log("ID used: " + this._id);
    console.log("Questions: " + Questions.find({surveyId: this._id}).count());
    //console.log("Questions: " + Questions.find({}).count());
    return Questions.find({surveyId: this._id},{$sort: {number: -1}});
    //return Questions.find({});
  },
  aboutSurvey: function() {
    return this.about;
  }
});

Template.surveyItem.events({
  'submit form': function(e, template) {
    e.preventDefault();

    /*
      Collect up good responses; if there are any unanswered questions then prevent form submission
      and highlight the unanswered areas.
     */
    var noResponse = Array();
    var goodResponse = {};
    $.each( $("[name^='answer-']"), function () {
      var questionId = this.name.split("-")[1];
      var answerText = this.value;
      console.log("Answer text: " + answerText);
      console.log("Question id: " + questionId);
      if (answerText) {
        goodResponse[questionId] = answerText;
      } else {
        noResponse.push(questionId);
      }
    });

    if (noResponse.length > 0) {
      // chastise the user
      alert("You must complete all the fields!");
    } else {
      //submit the form
      var frc = null;
      for (var key in goodResponse) {
        var answer = {
          text: goodResponse[key],
          questionId: key
        }
        Meteor.call('answer',answer,function(error,answerId){
          frc = error;
        });
      }
      // save the last error, rather than fill screen with them
      if (frc) {
        Errors.throw(frc.reason);
      } else {
        Router.go("/survey/" + this._id + "/summary");
      }
    }
  }
});

