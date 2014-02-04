/**
 * Created by milo on 03/02/2014.
 */

Meteor.startup(function () {
  // bootstrap the admin user if they exist -- You'll be replacing the id later
  var admins = ['Ebyt8jpq75YYhvC8T','E2oTtuNRxG5HY3cd5']
  for (i=0;i<admins.length;i++) {
    var admin_id = admins[i];
    var user = Meteor.users.findOne(admin_id);
    if (user) {
      if (!user.roles) {
        Roles.addUsersToRoles(admin_id, ['admin']);
        console.log("Added admin: " + admin_id);
      } else {
        //console.log("Admin user " + admin_id + " already exists.");
      }
    }
  }
  // create a couple of roles
  //Roles.createRole("secret");
  //Roles.createRole("double-secret");
});