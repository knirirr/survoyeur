/**
 * Created by milo on 25/02/2014.
 */


Template.answerSpyItem.events({
  'click .remove-comment': function() {
    var parts = event.target.id.split("-");
    var commentId = parts[parts.length-1];
    Meteor.call('cpurge',commentId);
    /*
    var data = {commentId: commentId, answerId: this._id};
    Meteor.call('answerRemoveComment',data);
    */
  }
});

Template.commentItem.helpers({
  user: function() {
    quser = Meteor.users.findOne({_id: this.userId});
    return quser.emails[0].address;
  },
  commentText: function() {
    return this.text;
  },
  checkOwner: function () {
    console.log("Comment: " + this._id + " user: " + Meteor.user()._id + " isOwner " + isOwner(this.userId, this));
    return isOwner(Meteor.user()._id,this);
  }
});