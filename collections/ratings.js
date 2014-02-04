/**
 * Created by milo on 23/01/2014.
 */
Ratings = new Meteor.Collection('ratings');

/*
Ratings only allowed when logged in
 */
Ratings.allow({
  insert: function(userId, doc) {
  return !! userId; }
});

Meteor.methods({
  rating: function(ratingAttributes) { // update or create a new rating
    var user = Meteor.user();
    var question = Questions.findOne(ratingAttributes.questionId);

    if (!user)
      throw new Meteor.Error(401,"Only logged-in users may answer questions.");

    if (!question)
      throw new Meteor.Error(422, "You may only rate a question.");

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
    Questions.update(question,{$addToSet: {ratings: ratingId}});
    return ratingId;
  },
  purgeRating: function(ratingAttributes) { // purge an existing rating
    var user = Meteor.user();
    var question = Questions.findOne(ratingAttributes.questionId);

    if (!user)
      throw new Meteor.Error(401,"Only logged-in users may answer questions.");

    if (!question)
      throw new Meteor.Error(422, "You may only rate a question.");

    var oldRating = Ratings.findOne({questionId: question._id, userId: user._id});
    if (oldRating) {
      Ratings.remove(oldRating._id);
      Questions.update(question,{$pull: {ratings: ratingId}});
      console.log("Rating " + oldRating._id + " purged.");
    } else {
      console.log("Old rating not found.");
    }
  }
});
