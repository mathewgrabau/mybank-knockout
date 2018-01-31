var Authenticator = function(serverModule) {
    var server = serverModule;

    var credentials = {
        userName: ko.observable().extend({ required: true }),
        password: ko.observable().extend({ required: true })
    };

    var authenticationToken = ko.observable();

    var loginCallback;

    var getAuthenticationToken = function() {
        return authenticationToken();
    };

    var isAuthenticated = ko.pureComputed(function() {
        return authenticationToken() !== false;
    });

    var showAuthenticationFailed = ko.observable(false);

    /* Exposed login method */
    var login = function() {
        if (credentials.errors().length > 0) {
            console.log("credentials are invalid");
            credentials.errors.showAllMessages();
            return;
        }
        var token = server.login(credentials.userName(), credentials.password());
        if (token == false) {
            showAuthenticationFailed(true);
            return;
        }
        authenticationToken(token);
        console.log("Login: " + authenticationToken());
        loginCallback();
    };

    /* Set the callback for the login */
    var setCallback = function(callback) {
        loginCallback = callback;
    };

    var init = function() {
        var token = sessionStorage.getItem("token");
        if (token == null) {
            authenticationToken(false);
        } else {
            authenticationToken(token);
        }

        /* Validation errors */
        credentials.errors = ko.validation.group(credentials);
    }();

    return {
        isAuthenticated: isAuthenticated,
        credentials: credentials,
        getAuthenticationToken: getAuthenticationToken,
        setCallback: setCallback,
        login: login,
        showAuthenticationFailed: showAuthenticationFailed
    };
};