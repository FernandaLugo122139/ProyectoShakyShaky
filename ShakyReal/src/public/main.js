function setFormMessage(formElement, type, message)
{
    const messageElement = formElement.querySelector(".form__message");
    messageElement.textContent = message;
    message.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message)
{
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement)
{
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () =>
{
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");
    
    document.querySelector("#linkCreateAccount").addEventListener("click", () => 
    {
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");

    });

    document.querySelector("#linkLogin").addEventListener("click", () => 
    {
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");

    });


    loginForm.addEventListener("submit", e => 
    {
        //Hacer el submit de los datos 

        //setFormMessage(loginForm, "error", "Usuario/Correo o contraseña incorrecta");
    });

    document.querySelectorAll(".form__input").forEach(inputElement => 
    {
        /*inputElement.addEventListener("blur", e => 
        {
            if(e.target.id="SignUpUser" && e.target.value.length > 0  && e.target.value.length < 10)
            {
                setInputError(inputElement, "El nombre de usuario debe de ser mayor a 10 caracteres");
            }
        });*/
        
        inputElement.addEventListener("input", e => 
        {
            clearInputError(inputElement);
        });
    });

});