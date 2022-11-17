const emailHasSpaces = require("../functions/emailHasSpaces")

test("Valida si el correo tiene espacios.", () => {
    expect(emailHasSpaces("hectoriinq @hotmail.com")).toBe(true);
});