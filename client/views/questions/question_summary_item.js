/**
 * Created by milo on 24/01/2014.
 */
//currentMean
Template.questionSummaryItem.helpers({
  currentMean: function() {
    // http://stackoverflow.com/questions/15813329/how-i-can-sum-all-the-values-of-a-property-in-a-meteor-collection
    var total = 0;
    Ratings.find({questionId:this._id}).map(function(doc) {
      total += doc.score;
    });
    if (total) {
      console.log("Total: " + total);
      return (total/Ratings.find({questionId: this._id}).count()).toFixed(2);
    } else {
      return "No votes!";
    }
  }
});