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
    questionNumber = Session.get('questionNumber');
    Session.set('questionNumber', questionNumber + 1);
    $("#question-section").append(Template[ 'someQuestions' ]());
  },
  'click #purge': function(e) {
    var sure = confirm("Delete this survey? Are you sure? This cannot be undone.");
    if (sure == false) {
      return;
    }
    questions = Questions.find({surveyId: this._id});
    questions.forEach(function(q){
      console.log("Question: " + q._id);
      answers = Answers.find({questionId: q._id});
      answers.forEach(function(a){
        console.log("Answer: " + a._id);
        Meteor.call('apurge', a._id);
      });
      ratings = Ratings.find({questionId: q._id});
      ratings.forEach(function(r){
        console.log("Rating: " + r._id);
        Meteor.call('rpurge', r._id);
      });
      // delete the question...
      Meteor.call('qpurge', q._id);
    });
    //...and delete the survey
    Meteor.call('spurge',this._id);
    Router.go("/surveys");
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
      console.log("Title: " + title);
      var survey = {
        _id: this._id,
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
