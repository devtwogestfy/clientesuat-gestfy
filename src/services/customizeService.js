import GetInfoService from 'configuraciones/servicios/client';
import apiLogin from 'configuraciones/servicios/login';

const infoService = GetInfoService();
const instanceLogin = new apiLogin();

const GetCustomization = async () => {
  if (!instanceLogin.isLoggedIn()) {
    try {
      const ret = await infoService.getBeforeConfig();

      if (ret && typeof ret === 'object') {
        if (ret.hasOwnProperty('language') && ret.hasOwnProperty('reset_password')) {
          return {
            language: ret.language,
            color: ret.color,
            online_payments: ret.online_payments,
            terms_conditions: ret.terms_conditions,
            reset_password: ret.reset_password
          };
        }
        return {
          language: 'es_ES',
          color: ret.color,
          online_payments: false,
          terms_conditions: false,
          reset_password: false
        };
      }

      return {
        language: 'es_ES',
        color: '#1976d2',
        online_payments: false,
        terms_conditions: false,
        reset_password: false
      };
    } catch (error) {
      console.error('Error fetching before config:', error);
    }
  } else {
    try {
      const ret = await infoService.getBaseconfig();
      return ret;
    } catch (error) {
      console.error('Error fetching base config:', error);
      return error;
    }
  }
};

export default GetCustomization;
