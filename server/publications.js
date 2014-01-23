Meteor.publish('questions', function() {
  return Questions.find();
});


Meteor.publish('ratings', function() {
  return Ratings.find();
});
