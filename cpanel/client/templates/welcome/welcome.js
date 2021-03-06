/**
 * Declare template
 */
var indexTpl = Template.Cpanel_welcome,
    loginTpl = Template.Cpanel_welcomeLogin,
    configTpl = Template.Cpanel_welcomeConfig;

/**
 * Index
 */
indexTpl.helpers({
    role() {
        let role = Roles.getGroupsForUser(Meteor.userId());
        if (role.length > 0) {
            return true;
        }

        return false;
    }
});

/**
 * Login
 */
// Hook
AutoForm.hooks({
    Cpanel_welcomeLogin: {
        onSubmit: function (insertDoc, updateDoc, currentDoc) {
            this.event.preventDefault();
            this.done(null, insertDoc);
        },
        onSuccess: function (formType, result) {
            Meteor.loginWithPassword(result.username, result.password, (error)=> {
                if (error) {
                    Bert.alert({
                        // title: 'Error',
                        message: error.message,
                        type: 'danger'
                    });
                } else {
                    Bert.alert({
                        // title: 'Success',
                        message: 'You are sign in',
                        type: 'success'
                    });
                }
            });
        },
        onError: function (formType, error) {
            Bert.alert({
                // title: 'Error',
                message: error.message,
                type: 'danger'
            });
        }
    }
});

/**
 * Config
 */
configTpl.onCreated(function () {
    let self = this;
    self.autorun(function () {
        let currentUser = Meteor.user();
        if (currentUser && currentUser.rolesBranch) {
            self.subscribe('Cpanel.branch', {_id: {$in: currentUser.rolesBranch}});
        }
    });

});

configTpl.events({
    'click .js-sign-out': function (e, t) {
        SignOut();
    }
});

// Hook
AutoForm.hooks({
    Cpanel_welcomeConfig: {
        onSubmit: function (insertDoc, updateDoc, currentDoc) {
            this.event.preventDefault();
            this.done(null, insertDoc);
        },
        onSuccess: function (formType, result) {
            // Set current session
            Session.setAuth('currentModule', result.module);
            Session.setAuth('currentBranch', result.branch);

            FlowRouter.go(s.decapitalize(result.module) + '.home');
        }
    }
});
