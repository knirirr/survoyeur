/**
 * Created by milo on 30/01/2014.
 */


Template.surveyItemSummary.helpers({
  questions: function() {
    return Questions.find({surveyId: this._id});
  },
  isLoggedIn: function() {
    if (Meteor.user()) {
      return true;
    }
    return false;
  },
  isAdminUser: function() {
    return Roles.userIsInRole(Meteor.user(), ['admin']);
  }
});

Template.surveyItemSummary.events({
 'click #download': function() {
   var csv = "";
   Questions.find().forEach(function(question) {
     var total = 0;
     Ratings.find({questionId:question._id}).map(function(doc) {
       if (doc != null) {
         total += doc.score;
       }
     });
     var mean = (total/Ratings.find({questionId: question._id}).count()).toFixed(2);
     var answers = Answers.find({questionId: question._id}).count()
     csv += "question|" + question.title + "|" + answers + "|" + total + "\n"
   });

   /*
   Next, get the actual answers
    */
   Answers.find().forEach(function(answer) {
     question = Questions.findOne({_id: answer.questionId});
     user = Meteor.users.findOne({_id: answer.userId});
     rating = Ratings.findOne({questionId: question._id, userId: answer.userId});
     csv += "answer|" + user.emails[0].address + "|" + answer.text + "|" + rating.score + "\n";
     Comments.find({answerId: answer._id}, {$sort: {submitted: -1}}).forEach(function(comment) {
      csv += "comment|"  + comment.author + "|" + comment.text + "|" + "\n";
     });

   });
   // send it to the browser
   var blob = new Blob([csv], {type: "text/csv;charset=utf-8"});
   saveAs(blob, this._id + "_results.csv");

  }
})

