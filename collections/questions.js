Questions = new Meteor.Collection('questions');

/*
 Answering questions only allowed when logged in
 */
Questions.allow({
  update: function(userId, doc) {
    return !! userId; }
});