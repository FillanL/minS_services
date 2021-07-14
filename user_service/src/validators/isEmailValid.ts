export const isNoSpace = (email: string): boolean => {
    const tempEmail: string = email.split(" ")[0];
    if (tempEmail === email) return true;
    return false;
};
export const isDotCom = (email: string): boolean => {
    const validString = isNoSpace(email);
    const noMultiDotCom = email.split(".").length === 2;
    const noMultiAt = email.split("@").length === 2;
    const emailSubstring: string = email.substring(email.length - 4);
    const dotCom: boolean = emailSubstring === ".com";
    if (!noMultiDotCom || !noMultiAt || !validString) return false;
    if (dotCom) return true;
    return false;
};
export const findDomain = (email: string): string | null => {
    const domain: string = email.split("@")[1];
    if (!isDotCom(email)) return null;
    if (!domain) return null;
    return domain;
};
export const isEmailDomainsAllowed = (email: string): boolean => {
    const emailList = ["google", "gmail", "yahoo", "aol", "icloud"];
    const checkDoamin = findDomain(email);
    const domain = checkDoamin ? checkDoamin.split(".")[0] : false;
    if (!domain) return false;
    if (emailList.indexOf(domain) !== -1) return true;
    return false;
};
export const isEmailValid = (email: string): boolean => {
    const isValidSapcing = isNoSpace(email);
    const isdotCom: boolean = isDotCom(email);
    const isValidDomain: boolean = isEmailDomainsAllowed(email);
    if (!isValidSapcing) return false;
    if (isdotCom && isValidDomain) return true;
    return false;
};