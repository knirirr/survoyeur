Meteor.publish('surveys',function() {
  return Surveys.find();
})

Meteor.publish('singleSurvey', function(id) {
  return id && Surveys.find(id);
});

Meteor.publish('questions', function() {
  return Questions.find();
});

Meteor.publish('ratings', function() {
  return Ratings.find();
});

Meteor.publish('answers', function() {
  return Answers.find();
})

Meteor.publish('surveyQuestions', function(id) {
  return id && Questions.find({surveyId: id});
})

Meteor.publish('surveyRatings', function(id) {
  questions = Questions.find({surveyId: id}).map(getid);
  return id && Ratings.find({questionId: {$in: questions}, userId: Meteor.userId});
})

Meteor.publish('surveyAnswers', function(id) {
  questions = Questions.find({surveyId: id}).map(getid);
  return id && Answers.find({questionId: {$in: questions}, userId: Meteor.userId});
})

Meteor.publish('allSurveyRatings', function(id) {
  questions = Questions.find({surveyId: id}).map(getid);
  return id && Ratings.find({questionId: {$in: questions}});
})

Meteor.publish('allSurveyAnswers', function(id) {
  questions = Questions.find({surveyId: id}).map(getid);
  return id && Answers.find({questionId: {$in: questions}});
})

/*
This is used for linking surveys,ratings,questions,answers by means
of cursor.map()
 */
function getid(thingy) {
  return thingy._id;
}
