/**
 * @typedef {object} MouseEvent
 */

/**
 * ePaySpace namespace
 */
(function(ePaySpace, $, undefined) {

    /** 
     * Represents a Form.
     * @constructor
     */
    ePaySpace.Form = function() {
        
        // Private attributs
        var self = this;
        var formValidate = new ePaySpace.FormValidate();

        /**
         * Constructor
         */
        (function(){ 
            handleEvents();
        })();

        /**
         * Handle card mask.
         * @param {jQuery} $input - The current input.  
         */
        function handleCardMask($input) {
            $input.val(function (index, value) {
                return value.replace(/[^a-z0-9]+/gi, '').replace(/(.{4})/g, '$1 ');
            });
        }

        /**
         * Handle card date mask.
         * @param {MouseEvent} e - The current event.
         */
        function handleCardDateMask(e) {
            var inputLength = e.target.value.length;

            if (e.keyCode != 8){
                if(inputLength === 2){
                var thisVal = e.target.value;
                thisVal += '/';
                $(e.target).val(thisVal);
                }
            }
        }

        /**
         * Handle birthday mask.
         * @param {MouseEvent} e - The current event.
         */
        function handleBirthdayMask(e) {
            var inputLength = e.target.value.length;

            if (e.keyCode != 8){
                if(inputLength === 2 || inputLength === 5){
                var thisVal = e.target.value;
                thisVal += '/';
                $(e.target).val(thisVal);
                }
            }
        }

        /** 
         *  Toggle the checkbox value.
         */
        function handleToggleCheckbox() {
            var $checkbox = $('#conditions');
            var checkboxValue = $checkbox.is(':checked') ? 0 : 1;
            
            $checkbox.val(checkboxValue);
        }

        /**
         * Handle form submit.
         * @param {MouseEvent} e - The current event.
         */
        function handleSubmit(e) {
            
            if(formValidate.validate()) {
                alert("SUBMIT FORM");
            }
            else {
                e.preventDefault();
            }
        };

        /** 
         * Init all events. 
         */
        function handleEvents() {

            $('form').on('submit', function(e) { 
                handleSubmit(e);
            });

            // Card number event
            $('#cardNumber').on('keypress change blur', function() {
                handleCardMask($(this)); 
            });

            $('#expiryDate').on('keyup keydown', function(e) {
                handleCardDateMask(e);
            });

            $('#birthday').on('keyup keydown', function(e) {
                handleBirthdayMask(e);
            });

            // Toggle checkbox value
            $('label').on('click',function() {
                handleToggleCheckbox();
            });
        };
    }

}( window.ePaySpace = window.ePaySpace || {}, jQuery ));