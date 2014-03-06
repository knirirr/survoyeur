/**
 * Created by milo on 27/02/2014.
 */

Template.notifications.helpers({
  notifications: function() {
  return Notifications.find({userId: Meteor.userId(), read: false});
  },
  notificationCount: function(){
    return Notifications.find({userId: Meteor.userId(), read: false}).count();
  }
});
Template.notification.helpers({
  notificationPostPath: function() {
    /*
    Deep linking within a page doesn't seem to work; I'll investigate this code later, but for now
    it does at least get the user to the correct page...
     */
    //console.log("Notification: " + this._id + " " + this.answerId);
    /*
    answer = Answers.findOne({_id: this.answerId});
    //console.log("Answer: " + answer._id);
    question = Questions.findOne({answers: {$in: [answer._id]}});
    //console.log("Question: " + question._id);
    survey = Surveys.findOne({questions: {$in: [question._id]}});
    */
    //console.log("Survey: " + survey._id);
    //return "/survey/" + survey._id + "/summary#comment-" + this.answerId
    return "/surveys"
  }
})
Template.notification.events({
  'click a': function()  {
    Notifications.update(this._id, {$set: {read: true}});
  }
})