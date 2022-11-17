function emailIsValid(email)
{
    var validDomains = ["@hotmail.com", "@yahoo.com", "@gmail.com", "@lasallistas"];
    
    for(let i = 0; i < 4; ++i)
    {
        let emailValid = email.indexOf(validDomains[i]);
        if (emailValid != -1) return true;
    }
    return false;
}

module.exports = emailIsValid;