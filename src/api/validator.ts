
export class Validator {
    static validEmail(address:string): boolean {
        // eslint-disable-next-line no-useless-escape
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(address)
    }

    static strongPassword(password:string): boolean {
        return  /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/.test(password)
    }

    static hasMinLength(subject:string, minLength: number): boolean {
        return (subject != "") && (subject.length >= minLength)
    }
}