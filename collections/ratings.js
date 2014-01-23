/**
 * Created by milo on 23/01/2014.
 */
Ratings = new Meteor.Collection('ratings');

Meteor.methods({
  rating: function(ratingAttributes) {
    var user = Meteor.user();
    var question = Questions.findOne(ratingAttributes.questionId);

    if (!user)
      throw new Meteor.Error(401,"Only logged-in users may answer questions.");

    if (!post)
      throw new Meteor.Error(422, "You may only rate a question.");

    rating = _.extend(_.pick(ratingAttributes, 'questionId','score')), {
      userId: user._id,
      submitted: new Date().getTime()
    }

    var ratingId = Ratings.insert(rating);
    return ratingId;
  }
});
