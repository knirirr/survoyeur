/**
 * Created by milo on 20/02/2014.
 */

Template.answerSpyItem.helpers({
  user: function() {
    quser = Meteor.users.findOne({_id: this.userId});
    //console.log("User: " + quser.emails[0].address);
    return quser.emails[0].address;
  },
  text: function() {
    return this.text;
  },
  getscore: function() {
    console.log("QID: " + this._id);
    console.log("UID: " + this.userId);
    qrating = Ratings.findOne({questionId: this.questionId, userId: this.userId});
    return qrating.score;
  }
});
