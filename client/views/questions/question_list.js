Template.questionList.helpers({
  questions: function() {
    console.log("Questions: " + Questions.find().count());
    return Questions.find();
  }
});

