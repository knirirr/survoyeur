/**
 * Created by milo on 25/02/2014.
 */
Comments = new Meteor.Collection('comments');

/*
 Comments only allowed when logged in
 */
Comments.allow({
  insert: function(userId, doc) {
    return !! userId;
  }
});

Meteor.methods({
  comment: function(commentAttributes) {
    var user = Meteor.user();
    var answer = Answers.findOne(commentAttributes.answerId);

    if (!user)
      throw new Meteor.Error(401,"Only logged-in users may comment on answers.");

    if (!answer)
      throw new Meteor.Error(422, "You may only comment on an answer.");

    comment = _.extend(_.pick(commentAttributes, 'answerId','text'), {
      userId: user._id,
      author: user.emails[0].address,
      submitted: new Date().getTime()
    });

    var commentId = Comments.insert(comment);
    console.log("Comment: " + commentId + " answer " + answer._id);
    //Answers.update(answer,{$addToSet: {comments: commentId}});
    createCommentNotification(comment);
    return commentId;
  },
  cpurge: function(id) {
    // is owner
    var comment = Comments.findOne({_id: id});
    if (isOwner(Meteor.user()._id,comment) || Roles.userIsInRole(Meteor.user(), ['admin'])) {
      Comments.remove({_id: id});
    } else {
      console.log("Naughty!");
    }
  }
})