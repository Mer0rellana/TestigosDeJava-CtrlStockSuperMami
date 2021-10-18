const PasswordReg = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/
const PhoneReg =/^([0-9]{2,3})([0-9]{3})([0-9]{4})$/
const DateReg = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/

module.exports = {
    PasswordReg,
    PhoneReg,
    DateReg
}