(function(ePaySpace,$,undefined){
    var myForm = document.getElementById('form');
  
    myForm.addEventListener('submit', function(e) {
        alert('Vous avez envoyé le formulaire !\n\nMais celui-ci a été bloqué pour que vous ne changiez pas de page.');
        e.preventDefault();
    });


    $('#cardNumber').on('keypress change blur', function () {
        $(this).val(function (index, value) {
          return value.replace(/[^a-z0-9]+/gi, '').replace(/(.{4})/g, '$1 ');
        });
    });

    /////////////////////////////
    //DECLARATION DES PROTOTYPES//
    /////////////////////////////
    ePaySpace.Validate = function(f){
        var form = f;
       
        this.checkForm = function(){
          var valid = 1;

            form.each(function(){
    
                clearClass($(this));
        
                valid += checkCardNumber($(this));
                valid += checkExpiryDate($(this));
                valid += checkBirthDate($(this));
        
                switch($(this).attr("type")){
        
                case "cardNumber":
                    valid += checkCardNumber($(this));
                break;
        
                case "expiryDate":
                    valid += checkExpiryDate($(this));
                break;
        
                case "birthDate":
                    valid += checkBirthDate($(this));
                break;
                }
            });
            if(valid === 1){
                return true;
            }
            return false;
        }
    
        //methode privé
        function addClassValid(input){
            if(!input.hasClass("valid") && input.val().length > 0){
                input.addClass("valid");
            }
        }
    
        function addClassError(input){
            if(!input.hasClass("error")){
                input.addClass("error");
            }
        }
    
        function clearClass(input){
            input.removeClass("valid").removeClass("error");
        }
    
        function checkCardNumber(input){
            var regex = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
    
            clearClass($(this));
    
            if(regex.test(input.val())){
             addClassValid(input);
                return 0;
            }
    
            addClassError(input);
            return -1;  
        }
    
        function checkExpiryDate(input){
            var regex = /\b(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})\b/;
            clearClass($(this));
    
            if(regex.test(input.val())){
                addClassValid(input);
                return 0;
            }
    
          addClassError(input);
          return -1;  
        }
    
        function checkBirthDate(input){
            var regex ="^(0[1-9]|1[012])[-/.](0[1-9]|[12][0-9]|3[01])[-/.](19|20)\\d\\d$" ;
            clearClass($(this));
    
            if(regex.test(input.val())){
                addClassValid(input);
                return 0;
            }
    
            addClassError(input);
            return -1;  
        }
    }
    
})(window.ePaySpace = window.ePaySpace || {}, jQuery);