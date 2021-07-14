export const hasSpecialChar = (password: string) => {
    const specialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    const hasSpecialChar = specialChar.test(password);
    if (hasSpecialChar) return true;
    return false;
};
export const hasNumber = (password: string) => {
    const number = /[0-9]/;
    const hasNumber = number.test(password);
    if (hasNumber) return true;
    return false;
};
export const hasUpperCase = (password: string) => {
    const upperCase = /[A-Z]/;
    const hasUpperCase = upperCase.test(password);
    if (hasUpperCase) return true;
    return false;
};
export const hasLowerCase = (password: string) => {
    const lowerCase = /[a-z]/;
    const hasLowerCase = lowerCase.test(password);
    if (hasLowerCase) return true;
    return false;
};
export const getPasswordLength = (password: string) => {
    const length = password.length;
    return length;
};
export const isPasswordValid = (password: string): boolean => {
    const hasSpecialCharacter = hasSpecialChar(password);
    const hassNumber = hasNumber(password);
    const hasUpperCaseChar = hasUpperCase(password);
    const hasLowerCaseChar = hasLowerCase(password);
    const passwordLength = getPasswordLength(password);
    if (
        hasSpecialCharacter &&
        hassNumber &&
        hasUpperCaseChar &&
        hasLowerCaseChar &&
        passwordLength >= 8
    )
        return true;
    return false;
};
