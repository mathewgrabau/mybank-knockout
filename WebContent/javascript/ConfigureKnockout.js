/* Module for configuration of library */
var ConfigureKnockout = function() {

    /* method to add memento observable */
    var createMementoObservable = function() {
        /* memento custom observable */
        ko.mementoObservable = function(initialValue) {
            // the crrent state
            var state = ko.observable(initialValue);
            // the remembered state
            var mementoState = initialValue;
            // commit the state
            state.commit = function() {
                mementoState = state();
            };

            // reset state from memory
            state.reset = function() {
                state(mementoState);
            };
            // return the current state
            return state;
        };
    };

    /* Custom currency binding */
    var applyCurrencyBinding = function() {
        /* custom binding for currency */
        ko.bindingHandlers.currency = {
            update: function(element, valueAccessor) {
                // retrieve observable value
                var value = ko.utils.unwrapObservable(valueAccessor()) || 0;
                // format currency
                var formattedText =  "$" + value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
                // apply formatted text to the underlying DOM element
                $(element).text(formattedText);
            }
        }
    };

    var configureValidatorPlugin = function() {
        ko.validation.init({
            errorElementClass: "has-error",
            errorMessageClass: "help-block"
        });

        
    };

    var init = function() {
        createMementoObservable();
        applyCurrencyBinding();
        configureValidatorPlugin();
    }();

    return {

    };
}();