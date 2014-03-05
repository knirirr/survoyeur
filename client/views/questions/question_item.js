/**
 * Created by milo on 23/01/2014.
 */

/*
Sets up all the rating widgets.
 */
Template.questionItem.rendered = function() {
  $(this.findAll('.rateit')).rateit();
  //$('.rateit').rateit();
}

Template.questionItem.helpers({
  currVal: function() {
    var rating = Ratings.findOne({questionId:this._id, userId: Meteor.userId()});
    if (rating) {
      return rating.score;
    } else {
      return 0;
    }
  },
  lastAnswer: function() {
    var answer = Answers.findOne({questionId:this._id, userId: Meteor.userId()});
    if (answer) {
      return answer.text.replace(/\n/g,'<br>');
    } else {
      return "";
    }
  },
  getTitle: function() {
    return this.title.replace(/\n/g,'<br>');
  }
});

/*
Handles clicks on both the rating stars and the clear button, both of whic
call the doRating function for database calls.
 */
Template.questionItem.events({
  'click .rateit-range': function() {
    var score = $('#' + this._id).rateit('value');
    console.log(this.title + ": " + score);
    doRating(score,this._id);
  },
  'click .rateit-reset': function() {
    var score = 0;
    console.log(this.title + ": " + score);
    doRating(score,this._id);
  }
});

/*
This part of the code deals with creating new ratings, updating existing ones, or deleting
them. They're deleted rather than set to 0 so that questions are counted as unrated rather
than 0 and therefore don't skew the average.
See collections/ratings.js for the Meteor methods.
 */
function doRating(score,questionId) {
  $('#' + questionId).rateit('value',score);
  var rating = {
    score: score,
    questionId: questionId
  };
  if (score == 0) {
    Meteor.call('purgeRating',rating,function(error,ratingId){
      if (error) {
        Errors.throw(error.reason);
      }
    });
  } else {
    Meteor.call('rating', rating, function(error,ratingId) {
      if (error) {
        Errors.throw(error.reason);
      }
    });
  }
}