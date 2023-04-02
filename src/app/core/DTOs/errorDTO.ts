export class ErrorDTO {
    message: string;
    display: boolean;

    public reset() {
        this.message = '';
        this.display = false;
    }

    public show(message) {
        this.message = message;
        this.display = true;
    }

}
