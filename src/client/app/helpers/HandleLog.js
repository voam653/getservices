class HandleLog {
    static error(description = '', message = '') {
        const error = `ERROR: ${description} ${message}`;
        throw new Error(error);
    }

    static warning(description = '', message = '') {
        const warning = `WARNING: ${description} ${message}`;
        console.warn(warning);
    }

    static info(description = '', message = '') {
        const info = `INFO: ${description} ${message}`;
        console.info(info);
    }

    static log(description = '', message = '') {
        const log = `LOG: ${description} ${message}`;
        console.log(log);
    }
};