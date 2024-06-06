import { useIntl } from 'react-intl';

const getGreeting = () => {
  const intl = useIntl();
  const now = new Date();
  const hour = now.getHours();

  if (hour < 12) {
    return intl.formatMessage({ id: 'gretting.morning' });
  } else if (hour < 18) {
    return intl.formatMessage({ id: 'gretting.afternoon' });
  } else {
    return intl.formatMessage({ id: 'gretting.night' });
  }
};

const GreetingComponent = () => {
  return getGreeting();
};

export default GreetingComponent;
