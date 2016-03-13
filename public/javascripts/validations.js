var password = document.getElementById("password");
var confirm_password = document.getElementById("confirm_password");

function validatePassword(){
	if(password.value != confirm_password.value){
		confirm_password.setCustomValidity("Hasła nie zgadzają się!");
	} else {
		confirm_password.setCustomValidity('');
	}
}

password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;