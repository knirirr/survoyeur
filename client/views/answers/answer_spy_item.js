/**
 * Created by milo on 20/02/2014.
 */

Template.answerSpyItem.events({
  'click .add-form': function() {
    var parts = event.target.id.split("-");
    var answerId = parts[parts.length-1];
    var data = {answerId: answerId};
    if ($("#comments-section-" + answerId).children().length == 0) {
      $("#comments-section-" + answerId).append(Template[ 'commentSubmit' ](data));
    } else {
      console.log("Only one answer at a time!");
    }
  },
  'click .delete-form': function() {
    console.log("Clicked delete button for element: " + event.target.id);
    var parts = event.target.id.split("-");
    var answerId = parts[parts.length-1];
    $("#comment-form-" + answerId).remove();
  },
  /*
  This stops the forms submitting unless the button is clicked
   */
  'submit form': function(e,template) {
    e.preventDefault();
    return false;
  },
  'click .submit-form': function() {
    var parts = event.target.id.split("-");
    var answerId = parts[parts.length-1];
    var $text = $('#answer-comment-' + answerId);
    console.log("Got comment text: " + $text.val());
    var comment = {
      text: $text.val(),
      answerId: this._id
    };
    if (!$text.val()) {
      alert("You must supply some text for your comment!");
      return false;
    }
    Meteor.call('comment',comment);
    console.log("Will try to remove: #comment-form-" + answerId);
    $("#comment-form-" + answerId).remove();
  }
});

Template.answerSpyItem.helpers({
  user: function() {
    quser = Meteor.users.findOne({_id: this.userId});
    //console.log("User: " + quser.emails[0].address);
    if (quser) {
      return quser.emails[0].address;
    } else {
      return "No email";
    }
  },
  text: function() {
    return this.text;
  },
  comments: function() {
    return Comments.find({answerId: this._id});
  },
  getscore: function() {
    /*
    console.log("QID: " + this._id);
    console.log("UID: " + this.userId);
    */
    qrating = Ratings.findOne({questionId: this.questionId, userId: this.userId});
    if (qrating != null) {
      return qrating.score;
    } else {
      return 0;
    }
  }
});
