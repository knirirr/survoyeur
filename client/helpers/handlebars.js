/**
 * Created by milo on 30/01/2014.
 */

// basic pluraliser from the Meteor book
Handlebars.registerHelper('pluralise', function(n, thing) {
  if (n === 1) {
    return '1 ' + thing; } else {
    return n + ' ' + thing + 's'; }
});
