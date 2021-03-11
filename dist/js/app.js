
// Array - url backgrounds
$photo = ['url("assets/bg1.jpg")', 'url("assets/bg2.jpg")','url("assets/bg3.jpg")'];
$photoNow = 0;


// Functions
(function ($) {
	// Set maxlength input
    $.fn.maxlength = function (length) {
        return this.on('keydown', function () {
            var maxlength = length || parseInt($(this).attr('maxlength'), 10) ;
            if (maxlength && $(this).val().length >= maxlength) {
                $(this).val($(this).val().slice(0, maxlength - 1));
            }
        });
    };
    //Validation input
    // "name" is the name of the field
    // "value" is the length of the text that was entered
    $.fn.validation = function(name, value){
    	if(name === 'number'){
    		return value === 19 ? true : false
    	}
    	if(name === 'name'){
    		return value >1 ? true : false
    	}
    	if(name === 'cvv'){
    		return value >= 3 ? true : false
    	}
    };
}($));


// Change background card
$('.card').click(function(){
	$photoNow++
	if($photoNow > $photo.length - 1 || $photoNow === 'undefined'){
		$photoNow = 0
	}
	$('.card-front').css({'background':$photo[$photoNow], 'background-size':'cover'});
	$('.card-back').css({'background':$photo[$photoNow], 'background-size':'cover'});
});


// Change side card
//Back side
$('.card').mouseenter(function(){
	$(this).addClass('active');
});
// Front side
$('.card').mouseleave(function(){
	$(this).removeClass('active');
});

// Enter number card
$('#inputNumber').keyup(function() {
	$('.card').removeClass('active')
	if($(this).validation('number', $(this).val().length) == false) $(this).addClass('invalid')
    	else {
    		$(this).removeClass('invalid')
    		$(this).addClass('valid')
    	}
	var re = /\d{1,4}/g;

  	var foo = $(this).val().split(" ").join("");

	if (foo.length > 0) {
	   foo = foo.match(new RegExp(re)).join(" ");
	}

  	$(this).val(foo);

  	if(foo != ''){
  		$('#number').text(foo)
  	}else{
  		$('#number').text('#### #### #### ####')
  	}
});

// Check charCode 
$("#inputNumber").keypress(function(event){
  event = event || window.event;
  if (event.charCode && event.charCode!=0 && event.charCode!=46 && (event.charCode < 48 || event.charCode > 57) )
    return false;
});

// Enter name card
$('#inputName').keyup(function(){
	$('.card').removeClass('active')
	if($(this).validation('name', $(this).val().length) == false) $(this).addClass('invalid')
    	else {
    		$(this).removeClass('invalid')
    		$(this).addClass('valid')
    	}
	if($(this).val() != ''){
		$('#name').text($(this).val())
	}else{
		$('#name').text('None name')
	}
});

// Select month
$('#inputMonth').change(function(){
	var re = /(^[0-9])\w+/g;
	var text = $('#date').text();
	var select = $(this).val();
	var result = text.replace(re, select);
	$('#date').text(result);
});

// Select year
$('#inputYear').change(function(){
	var re = /([0-9])[^/]*$/g;
	var text = $('#date').text();
	var select = $(this).val();
	var result = text.replace(re, select);
	$('#date').text(result);
});

// Enter cvv code
$('#inputCvv').keyup(function() {
	if($(this).validation('cvv', $(this).val().length) == false) $(this).addClass('invalid')
    	else {
    		$(this).removeClass('invalid')
    		$(this).addClass('valid')
    	}
	if($(this).val() != ''){
		$('.card').addClass('active')
		$('.cvv-text').text($(this).val())
	}else{
		$('.cvv-text').text('***')
		$('.card').removeClass('active')
	}
});

// Set maxLength cvv input
$('#inputCvv').maxlength(3)

// Submit
$('.btn-submit').click(function(event) {
	if($("#inputNumber").validation('number', $("#inputNumber").val().length) == false) $("#inputNumber").addClass('invalid');
    	else {
    		$("#inputNumber").removeClass('invalid');
    		$("#inputNumber").addClass('valid');

    		if($('#inputName').validation('name', $('#inputName').val().length) == false) $('#inputName').addClass('invalid');
		    	else {
		    		$('#inputName').removeClass('invalid');
		    		$('#inputName').addClass('valid');

		    		if($('#inputCvv').validation('cvv', $('#inputCvv').val().length) == false) $('#inputCvv').addClass('invalid');
				    	else {
				    		$('#inputCvv').removeClass('invalid');
				    		$('#inputCvv').addClass('valid');
				    		alert('Succses!!!!');
				    	}
		    	}
    	}
});

