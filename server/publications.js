Meteor.publish('surveys',function() {
  return Surveys.find();
})

Meteor.publish('singleSurvey', function(id) {
  return id && Surveys.find(id);
});

Meteor.publish('questions', function() {
  return Questions.find();
});

Meteor.publish('surveyQuestions', function(id) {
  return id && Questions.find({surveyId: id});
})

Meteor.publish('ratings', function() {
  return Ratings.find();
});


Meteor.publish('questionsRatings', function(id) {
  return id && Ratings.find({questionId: id});
})

