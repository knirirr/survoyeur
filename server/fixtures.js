if (Surveys.find().count() == 0) {

  /*
  N.B. insert returns the id of the inserted record
   */

  console.log("Starting database update.");

  var s1 = Surveys.insert({
    title: "Tasty food survey",
    about: "This survey seeks your opinion on the relative awesomeness of pies and cakes. These, together with beer and whisky, form the only feast a gentleman need consider.",
    created: new Date().getTime(),
    questions: []
  });

  var q1 = Questions.insert({
    title:  "How much do you like pies? ",
    number: 1,
    surveyId: s1,
    ratings: [],
    answers: []
  });
  var q2 = Questions.insert({
    title:  "How about cakes? ",
    number: 2,
    surveyId: s1,
    ratings: [],
    answers: []
  });

  Surveys.update(s1,{
      $addToSet: {questions: {$each: [q1,q2]}}
    })

  /*
  Answers and Ratings will be added by the user, so I've
  not bothered to create any here.
   */

  console.log("Inserted survey: " + s1);
  console.log("Inserted question: " + q1);
  console.log("Inserted question: " + q2);
}