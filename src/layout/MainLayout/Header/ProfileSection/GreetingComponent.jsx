const getGreeting = () => {
    const now = new Date();
    const hour = now.getHours();

    if (hour < 12) {
        return 'Buenos días';
    } else if (hour < 18) {
        return 'Buenas tardes';
    } else {
        return 'Buenas noches';
    }
};

const GreetingComponent = () => {
    return getGreeting();
};

export default GreetingComponent;
