/**
 * Created by milo on 03/02/2014.
 */

Template.someQuestions.helpers({
  questionNumber: function() {
    if (Session.get("questionNumber")) {
      return Session.get("questionNumber")
    } else {
      length = $("[name^='question-text-']").length + 1;
      return  length;
    }
  },
  'submit form': function(e, template) {
    e.preventDefault();
  }
});
