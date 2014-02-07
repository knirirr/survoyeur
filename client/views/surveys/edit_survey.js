Template.editSurvey.helpers({
  questions: function() {
    return Questions.find({surveyId: this._id});
  },
  questionNumber: function() {
    questionNumber = Questions.find({surveyId: this._id}).sort({number: -1}).limit(1).first();
    console.log("Question number: " + questionNumber);
    Session.set('questionNumber', questionNumber);
    return questionNumber;
  }
});

Template.editSurvey.events({
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
