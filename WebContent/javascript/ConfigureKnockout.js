/* Module for configuration of library */
var ConfigureKnockout = function() {

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

    var init = function() {
        applyCurrencyBinding();
    }();

    return {

    };
}();