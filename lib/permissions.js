/**
 *
 * Created by milo on 21/02/2014.
 */

isOwner = function(userId, obj) {
  return obj && userId == obj.userId;
}
/*
isAdmin = function() {
  return Roles.userIsInRole(Meteor.user(), ['admin']);
}
 */