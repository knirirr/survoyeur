/**
 * Created by milo on 27/02/2014.
 */

/*
No way of deleting these is implemented yet...
 */
Notifications = new Meteor.Collection('notifications');

Notifications.allow({
  update: isOwner
});

createCommentNotification = function(comment) {
  //var comment = Comments.findOne({_id: commentId});
  //console.log("Got comment: " + comment._id + ", Answer: " + comment.answerId + " User: " + comment.userId);
  var answer = Answers.findOne({_id: comment.answerId});
  if (comment.userId !== answer.userId) {
    Notifications.insert({
      userId: answer.userId,
      answerId: answer._id,
      commentId: comment._id,
      commenterName: comment.author,
      read: false
    });
  }
};