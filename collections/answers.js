/**
 * Created by milo on 27/01/2014.
 */
Answers = new Meteor.Collection("answers");

Meteor.methods({
  // update answers here
  answer: function(answerAttributes) {
    var user = Meteor.user();
    var question = Questions.findOne(answerAttributes.questionId);

    if (!user)
      throw new Meteor.error(401,"Only logged-in users may answer questions.");

    if (!question)
      throw new Meteor.error(422, "You must answer a question.");

    var oldAnswer = Answers.findOne({questionId: question._id, userId: user._id});
    if (oldAnswer) {
      console.log("oldAnswer: " + oldAnswer._id);
      if (oldAnswer.text != answerAttributes.text) {
        console.log("Changing existing answer from " + oldAnswer.text + " to " + answerAttributes.text + ".");
        Answers.update(oldAnswer._id,{$set: {text: answerAttributes.text}})
      } else {
        console.log("Answer unchanged at: " + oldAnswer.answer);
      }
      return oldAnswer._id;
    } else {
      console.log("Old answer not found.");
    }

    answer = _.extend(_.pick(answerAttributes, 'questionId','text'), {
      userId: user._id,
      submitted: new Date().getTime()
    });

    console.log("Answer: " + answer.userId + "/" + answer.submitted);

    var answerId = Answers.insert(answer);
    Questions.update(question,{$addToSet: {answers: answerId}});
    return answerId;
    /*
    N.B. there's not any means for users to delete questions at present...
     */
  },
  apurge: function(id) {
    Answers.remove({_id: id});
  }
});
