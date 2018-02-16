/**
 * ePaySpace namespace
 */
(function(ePaySpace, $, undefined) {

    /** 
     * Represents a form validator.
     * @constructor
     */
    ePaySpace.FormValidate = function() {
        
        // Private attributs
        var self = this;
        var formIsValid = true;
        var $cardNumberInput = $('#cardNumber');
        var $cardDate = $('#expiryDate');
        var $birthday = $('#birthday');
        var $termsAndCondition = $('#conditions');

        /**
         * Constructor
         */
        (function() { 
            handleEvents();
        })();

        /**
         * Method public that validates the form.
         */
        this.validate = function() {

            formIsValid = true;

            checkCardNumber($cardNumberInput);
            checkCardDate($cardDate);
            checkBirthday($birthday);
            checkTermsAndConditions($termsAndCondition);

            return formIsValid;
        }

        /**
         * Add valid class on inputs.
         * @param {jQuery} $input - The current input.  
         */
        function addClassValid($input) {
            if(!$input.hasClass("valid") && $input.val().length > 0){
                $input.addClass("valid");
            }
        }

        /**
         * Add error class on inputs.
         * @param {jQuery} $input - The current input.
         */
        function addClassError($input) {
            if(!$input.hasClass("error")){
                $input.addClass("error");
            }
        }
      
        /**
         * Clear valid and error class on inputs.
         * @param {jQuery} $input - The current input.
         */
        function clearClass($input) {
            $input.removeClass("valid").removeClass("error");
        }

        /**
         * Private method that validates the card number.
         * @param {jQuery} $input - The current input.
         */
        function checkCardNumber($input) {

            var value = $input.val().replace(/ /g, '');
            var creditCardRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;

            clearClass($input);

            if (creditCardRegEx.test(value)) {
                addClassValid($input);
            }
            else {
                formIsValid = false;
                addClassError($input);
            }
        };


        /** 
         * Check if the card date respects this format : MM/YY
         * @param {jQuery} $input - The current input.
         */
        function checkCardDate($input) {

            var creditCardDateRegEx = /^(0[1-9]|10|11|12)\/[0-9]{2}$/;

            clearClass($input);

            if (creditCardDateRegEx.test($input.val())) {
                addClassValid($input);
            }
            else {
                formIsValid = false;
                addClassError($input)
            }
        };

        /**
         * Check if the birthday date respects this format : DD/MM/YYYY
         * @param {jQuery} $input - The current input.
         */
        function checkBirthday($input) {

            var birthdayRegEx = /^[0-9]{2}[-|\/]{1}[0-9]{2}[-|\/]{1}[0-9]{4}$/;

            clearClass($input);

            if (birthdayRegEx.test($input.val())) {
                addClassValid($input);
            }
            else {
                formIsValid = false;
                addClassError($input);
            }
        };

        /**
         * Check Terms and Conditions checkbox.
         * @param {jQuery} $input - The current input. 
         */
        function checkTermsAndConditions($input) {

            var $label = $("label[for='"+$input.attr('id')+"']");

            clearClass($label);

            if(typeof($input.val()) === 'undefined' || $input.val() === '0') {
                formIsValid = false;
                addClassError($label);
            }
        };

        /** 
         * Init all events. 
         */
        function handleEvents() {
            
            $cardNumberInput.on('blur', function() {
                checkCardNumber($(this));
            });
            $cardDate.on('blur', function() {
                checkCardDate($(this));
            });
            $birthday.on('blur', function() {
                checkBirthday($(this));
            });
        };
    }

}( window.ePaySpace = window.ePaySpace || {}, jQuery ));