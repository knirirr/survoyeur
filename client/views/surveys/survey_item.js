/**
 * Created by milo on 27/01/2014.
 */

Template.surveyItem.helpers({
  questions: function() {
    console.log("Calling survey_item.js");
    console.log("ID used: " + this._id);
    console.log("Questions: " + Questions.find({surveyId: this._id}).count());
    //console.log("Questions: " + Questions.find({}).count());
    return Questions.find({surveyId: this._id});
    //return Questions.find({});
  }
});

Template.surveyItem.events({
  'submit form': function(e, template) {
    e.preventDefault();

    /*
      Collect up good responses; if there are any unanswered questions then prevent form submission
      and highlight the unanswered areas.
     */
    var noResponse = Array();
    var goodResponse = {};
    $.each( $("[name^='answer-']"), function () {
      var questionId = this.name.split("-")[1];
      var answerText = this.value;
      console.log("Answer text: " + answerText);
      console.log("Question id: " + questionId);
      if (answerText) {
        goodResponse[questionId] = answerText;
      } else {
        noResponse.push(questionId);
      }
    });

    if (noResponse.length > 0) {
      // chastise the user
      alert("You must complete all the fields!");
    } else {
      //submit the form
    }


    /*
     var $body = $(e.target).find('[name=body]');
     var comment = {
     body: $body.val(),
     postId: template.data._id
     };

     Meteor.call('comment', comment, function(error, commentId) {
     if (error){
     throwError(error.reason);
     } else {
     $body.val('');
     }
     });
     */
  }
});