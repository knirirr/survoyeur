/**
 * Created by milo on 03/02/2014.
 */

Template.newSurvey.events({
  'click #moar': function(e) {
    //alert("Moar buttong clicked!");
    questionNumber = Session.get('questionNumber');
    Session.set('questionNumber', questionNumber + 1);
    $("#question-section").append(Template[ 'someQuestions' ]());
  },
  'submit form': function(e, template) {
    e.preventDefault();
    /*
    Do some processing of the contents of the form...
     */
    var moar = 0;
    var title = $("[name='survey-title']").val();
    var about = $("[name='survey-description']").val();
    if (!title) {
      alert("Please supply a survey title.");
      return;
    }
    if (!about) {
      alert("Please supply a survey description.");
      return;
    }
    var questions = {};
    $.each( $("[name^='question-text-']"), function () {
      var questionRef = this.name.split("-").slice(-1)[0];
      var questionText = this.value; // this returns DOM and not jquery object...
      if (questionText ) {
        moar = 1;
      }
      questions[questionRef] = questionText;
    });
    // submit
    if (moar == 1) {
      // create a survey
      console.log("Title: " + title);
      var survey = {
        title: title,
        about: about
      }
      Meteor.call('survey', survey, function(error,newSurveyId) {
        if (error) {
          Errors.throw(error.reason);
          return;
        } else {
          survey._id = newSurveyId;
          console.log("New survey: " + newSurveyId);
          if (!newSurveyId) {
            Errors.throw("Survey not created!");
            return;
          } else {
            console.log("Survey created: " + newSurveyId);
          }
          // create questions between here...
             // create questions
      for (var key in questions) {
        var text = questions[key];
        if (text) {
          // create a question with this value
          console.log("Question " + key + " value is " + text);
          var question = {
            title: text,
            number: key,
            surveyId: survey._id
            /*
            ,
            hideRating: $('#hide-rating-' + key).attr('checked'),
            hideComments: $('#hide-comments-' + key).attr('checked')
            */
          }
          console.log("Question: " + question.text + ", " + question.surveyId);
          Meteor.call('question', question, function(error,newQuestionId) {
            if (error) {
              Errors.throw(error.reason);
            } else {
              survey.questionId = newQuestionId;
              Meteor.call('survey',survey, function(error,surveyId) {
                if (error) {
                  Errors.throw(error.reason);
                }
              });
            }
          });
        }
      }
          // ... and here?
        }
      });

    } else {
      //
      alert ("Please supply at least one question.");
      return;
    }
    Router.go("/surveys")
  }
});

/*
Inserting a question is done here rather than having it already in the template
in order to prevent the first question's number from being increased every time a
new one is added. I'm damned if I know why that happens, but it does.
 */

Template.newSurvey.rendered = function() {
  $("#question-section").append(Template[ 'someQuestions' ]());
}