if (Questions.find().count() === 0) {
  var q1 = Questions.insert({
    title:  "How much do you like pies? "
  });
  var q2 = Questions.insert({
    title:  "How about cakes? "
  });
  console.log("Inserted: " + q1);
  console.log("Inserted: " + q2);
}