/**
 * Created by milo on 23/01/2014.
 */

Template.questionItem.rendered = function() {
  $(this.findAll('.rateit')).rateit();
}

Template.questionItem.events({
  'click .rateit-range': function() {
    var score = $('#' + this._id).rateit('value');
    doRating(score,this._id);
  },
  'click .rateit-reset': function() {
    var score = 0;
    doRating(score,this._id);
  }
});

function doRating(score,questionId) {
  console.log(this.title + ": " + score);
  var rating = {
    score: score,
    questionId: questionId
  };
  Meteor.call('rating', rating, function(error,ratingId) {
    if (error) {
      Errors.throw(error.reason);
    } else {
      console.log("Rating ID: " + ratingId);
    }
  });
}