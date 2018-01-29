var Wizard = function(steps) {
    var numberOfSteps;

    var currentStep = ko.observable();

    // method to go back a step
    var back = function() {
        currentStep(currentStep() - 1);
    };

    // method to go fordward a step
    var next = function() {
        currentStep(currentStep() + 1);
    };

    var done = function() {
        // complete it and reset the wizard
        console.log("user clicked done");
        currentStep(1);
    };

    var isLastStep = ko.pureComputed(function() {
        return currentStep() == numberOfSteps;
    });

    var isFirstStep = ko.pureComputed(function() {
        return currentStep() == 1;
    });

    var init = function() {
        numberOfSteps = steps;
        currentStep(1);
    };

    init();

    return {
        currentStep: currentStep,
        back: back,
        next: next,
        done: done,
        isLastStep: isLastStep,
        isFirstStep: isFirstStep
    };
};