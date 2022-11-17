const emailIsValid = require("../functions/emailIsValid")

test("Valida si el correo tiene un dominio válido.", () => {
    expect(emailIsValid("hectoriinq@hotmail.com")).toBe(true);
    expect(emailIsValid("hectoriinq@outlook.com")).toBe(false);
});