/**
 * Created by milo on 07/02/2014.
 */
Template.questionEdit.events({
  'click .close': function() {
    //alert("clicked a close buttong: " + event.target.id);
    console.log("Question ID: " + this._id);
    Meteor.call('qpurge',this._id);
  }
});
