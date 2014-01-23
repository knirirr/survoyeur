/**
 * Created by milo on 23/01/2014.
 */

Template.questionItem.rendered = function() {
  $(this.findAll('.rateit')).rateit();
}

Template.questionItem.events({
  'click .rateit-range' : function() {
    var score = $('#' + this._id).rateit('value');
    console.log(this.title + ": " + score);
    var rating = {
      score: score,
      questionId: this._id
    };
    Meteor.call('rating', rating, function(error,ratingId) {
      if (error) {
        Errors.throw(error.reason);
      } else {
        console.log("Created rating: " + ratingId);
      }

    });
  }
});