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
   // http://stackoverflow.com/questions/16078544/export-to-csv-using-jquery-and-html#answer-16203218
   /*
   First, get the summary of ratings and results.
    */
   /*
   var $rows = $('#results-summary').find('tr:has(td)');
   tmpColDelim = String.fromCharCode(11); // vertical tab character
   tmpRowDelim = String.fromCharCode(0); // null
   // actual delimiter characters for CSV format
   colDelim = '"|"';
   rowDelim = '"\r\n"';
   // Grab text from table into CSV formatted string
   var csv = '"' + $rows.map(function (i, row) {
     var $row = $(row),
       $cols = $row.find('td');

     return $cols.map(function (j, col) {
       var $col = $(col),
         text = $col.text();

       return text.replace('"', '""'); // escape double quotes

     }).get().join(tmpColDelim);

   }).get().join(tmpRowDelim)
     .split(tmpRowDelim).join(rowDelim)
     .split(tmpColDelim).join(colDelim) + '"';
   csv += "\n"
   console.log("CSV: " + csv);
   */
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

