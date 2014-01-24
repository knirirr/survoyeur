/**
 * Created by milo on 23/01/2014.
 */
Ratings = new Meteor.Collection('ratings');

Meteor.methods({
  rating: function(ratingAttributes) { // update or create a new rating
    var user = Meteor.user();
    var question = Questions.findOne(ratingAttributes.questionId);

    if (!user)
      throw new meteor.error(401,"only logged-in users may answer questions.");

    if (!question)
      throw new meteor.error(422, "you may only rate a question.");

    var oldRating = Ratings.findOne({questionId: question._id, userId: user._id});
    if (oldRating) {
      console.log("oldRating: " + oldRating._id);
      if (oldRating.score != ratingAttributes.score) {
        console.log("Changing existing rating from " + oldRating.score + " to " + ratingAttributes.score + ".");
        Ratings.update(oldRating._id,{$set: {score: ratingAttributes.score}})
      } else {
        console.log("Rating unchanged at: " + oldRating.score);
      }
      return oldRating._id;
    } else {
      console.log("Old rating not found.");
    }

    rating = _.extend(_.pick(ratingAttributes, 'questionId','score'), {
      userId: user._id,
      submitted: new Date().getTime()
    });

    console.log("Rating: " + rating.userId + "/" + rating.submitted);

    var ratingId = Ratings.insert(rating);
    return ratingId;
  },
  purgeRating: function(ratingAttributes) { // purge an existing rating
    var user = Meteor.user();
    var question = Questions.findOne(ratingAttributes.questionId);

    if (!user)
      throw new meteor.error(401,"only logged-in users may answer questions.");

    if (!question)
      throw new meteor.error(422, "you may only rate a question.");

    var oldRating = Ratings.findOne({questionId: question._id, userId: user._id});
    if (oldRating) {
      Ratings.remove(oldRating._id);
      console.log("Rating " + oldRating._id + " purged.");
    } else {
      console.log("Old rating not found.");
    }
  }
});
