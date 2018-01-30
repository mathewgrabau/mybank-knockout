var Authenticator = function(serverModule) {
    var server = serverModule;

    var credentials = {
        userName: ko.observable(),
        password: ko.observable()
    };

    var authenticationToken = ko.observable();

    var loginCallback;

    var getAuthenticationToken = function() {
        return authenticationToken();
    };

    var isAuthenticated = ko.pureComputed(function() {
        return authenticationToken() !== false;
    });

    /* Exposed login method */
    var login = function() {
        var token = server.login(credentials.userName(), credentials.password());
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
    }();

    return {
        isAuthenticated: isAuthenticated,
        credentials: credentials,
        getAuthenticationToken: getAuthenticationToken,
        setCallback: setCallback,
        login: login
    };
};