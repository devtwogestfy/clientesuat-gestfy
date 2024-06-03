import { backendAPI } from 'settings/app';

const GetInfoService = () => {
  const apiUrl = backendAPI;

  const getPhoneRecord = async (id, type, from, end, incoming) => {
    const sentido = incoming ? 'entrante' : 'saliente';
    const filter = JSON.stringify([
      { property: 'id', value: id },
      { property: 'tipo', value: type },
      { property: 'desde', value: from },
      { property: 'hasta', value: end },
      { property: 'sentido', value: sentido }
    ]);

    const params = {
      filter: filter
    };

    const response = await apiUrl.get(`/portal/cdr`, { params });
    return response.data;
  };

  const getPrepayments = async (page = 1, limit = 25, sort = '', servId = null) => {
    const filter = JSON.stringify([{ property: 'servicio_id', value: servId }]);

    const params = {
      filter: filter,
      page: page,
      limit: limit,
      sort: sort
    };

    const response = await apiUrl.get(`/portal/prepay-list`, { params });
    return response.data;
  };

  const createPrepay = async (values) => {
    const response = await apiUrl.post('/prepaid-gen/cliente', values);
    const data = response.data;
    return data;
  };

  const validatePrepay = async (id) => {
    const response = await apiUrl.post('/prepaid-validate/' + id);
    const data = response.data;
    return data;
  };

  const cancelPrepay = async (id) => {
    const response = await apiUrl.put('/prepaid-cancel/' + id);
    const data = response.data;
    return data;
  };

  const generateFormPayBizum = (data) => {
    let form = document.createElement('form');
    form.action = data.url;
    form.method = 'POST';
    form.target = '_self';
    form.style.display = 'none';
    form.id = 'redsysForm';

    let input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'Ds_SignatureVersion';
    input.id = 'Ds_SignatureVersion';
    input.value = data.signatureVersion;

    let input2 = document.createElement('input');
    input2.type = 'hidden';
    input.id = 'Ds_MerchantParameters';
    input2.name = 'Ds_MerchantParameters';
    input2.value = data.merchantParams;

    let input3 = document.createElement('input');
    input3.type = 'hidden';
    input3.name = 'Ds_Signature';
    input.id = 'Ds_Signature';
    input3.value = data.signature;

    var submit = document.createElement('input');
    submit.type = 'submit';
    submit.id = 'submitPurchase';

    form.appendChild(input);
    form.appendChild(input2);
    form.appendChild(input3);
    form.appendChild(submit);
    document.body.appendChild(form);
    let submit2 = document.getElementById('submitPurchase');
    submit2.click();

    input.parentElement.removeChild(input);
    input2.parentElement.removeChild(input2);
    input3.parentElement.removeChild(input3);
    form.parentElement.removeChild(form);
  };
  const startPurchasePrepaid = async (factId = null, url = location.href, type = 'bizum', action = 'continue') => {
    const params = {
      url: url,
      type: type,
      action: action
    };

    const response = await apiUrl
      .post(`/portal-payment-prepay/${factId}`, params)
      .then((response) => {
        generateFormPayBizum(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getRouterData = async (id) => {
    const response = await apiUrl.get('/portal/router/config/' + id);
    const data = response.data;
    return data;
  };

  const updateRouterConfig = async (params = '', id = null) => {
    const response = await apiUrl.put('/portal/router/config/' + id, params);
    const data = response.data;
    return data;
  };

  const getPhones = async (page = 1, limit = 25, sort = '') => {
    const params = {
      page: page.toString(),
      limit: limit.toString(),
      sort: sort
    };

    const response = await backendAPI.get('/portal/tels', { params });
    const data = response.data;
    return data;
  };

  const getServices = async (page = 1, limit = 25, sort = '') => {
    const params = {
      page: page.toString(),
      limit: limit.toString(),
      sort: sort
    };

    const response = await backendAPI.get('/portal/pservs', { params });
    const data = response.data;
    return data;
  };

  const getBilling = async (page = 1, limit = 25, sort = '') => {
    const params = {
      page: page.toString(),
      limit: limit.toString(),
      sort: sort
    };

    const response = await backendAPI.get('/portal/facturacion', { params });
    const data = response.data;

    return data;
  };

  const getServicesList = async (page = 1, limit = 25, sort = '') => {
    const params = {
      page: page.toString(),
      limit: limit.toString(),
      sort: sort
    };

    const response = await backendAPI.get('/portal/servicios', { params });
    const data = response.data;
    return data;
  };

  return {
    getPhoneRecord,
    getPrepayments,
    createPrepay,
    validatePrepay,
    cancelPrepay,
    startPurchasePrepaid,
    getRouterData,
    updateRouterConfig,
    getPhones,
    getServices,
    getBilling,
    getServicesList
  };
};

export default GetInfoService;
