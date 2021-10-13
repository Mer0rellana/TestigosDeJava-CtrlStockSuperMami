const PasswordReg = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/
const PhoneReg =/^([0-9]{2,3})([0-9]{3})([0-9]{4})$/

module.exports = {
    PasswordReg,
    PhoneReg
}