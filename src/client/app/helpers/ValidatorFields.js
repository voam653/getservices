class ValidatorFields {

    constructor() {
        this.emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        this.cepFormat = /^[0-9]{5}-[\d]{3}$|^[0-9]{5}[\d]{3}$/;
        this.phoneFormat = /^[0-9]{11}$|^[0-9]{7}-[0-9]{4}$|^\([0-9]{2}\)[0-9]{5}-[0-9]{4}$|^[0-9]{2}\s[0-9]{5}-[0-9]{4}/;
    }

    isValidEmail(text) {
        return text.match(this.emailFormat);
    }

    isValidCEP(text) {
        return text.match(this.cepFormat);
    }

    isValidPhone(text) {
        return text.match(this.phoneFormat);
    }

}