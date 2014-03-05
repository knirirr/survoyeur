/**
 * Created by milo on 07/02/2014.
 */
Template.questionEdit.events({
  'click .close': function() {
    //alert("clicked a close buttong: " + event.target.id);
    //console.log("Question ID: " + this._id);
    Meteor.call('qpurge',this._id);
  },
  'submit form': function(e, template) {
    e.preventDefault();
  }
});

Template.questionEdit.helpers({
  qnumber: function() {
    if (this.number) {
      return this.number
    } else {
      length = $("[name^='question-text-']").length + 1;
      return  length;
    }
  }
})
