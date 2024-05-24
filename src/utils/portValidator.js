export function portValidator(control) {
    if (control.value <= 65534 && control.value >= 1) {
        return null;
    }
    return { port: 'Bad port number' };
}
