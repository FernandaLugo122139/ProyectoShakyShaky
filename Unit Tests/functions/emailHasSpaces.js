function emailHasSpaces(email)
{
    const emailSpace = email.indexOf(' ');
    return emailSpace != -1;
}

module.exports = emailHasSpaces;