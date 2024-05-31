import { backendAPI } from 'configuraciones/app';

const InfoInvoice = () => {
  const apiUrl = backendAPI;

  const getInvoices = async (page = 1, limit = 25, sort = '', from = null, end = null, state = null) => {
    let filter =
      '[{"property": "desde", "value":"' +
      from +
      '"}, {"property": "hasta", "value":"' +
      end +
      '"}, {"property": "estado", "value":"' +
      state +
      '"}]';
    const params = {
      page: page.toString(),
      limit: limit.toString(),
      sort: sort,
      filter: filter
    };
    return request('/appclientes/facturas', params);
  };

  const getInvoicesSummary = async () => {
    try {
      const response = await backendAPI.get('/portal/facturas/datos');
      const data = response.data;
      return data;
    } catch (error) {
      throw new Error(error.response || 'Network request failed');
    }
  };

  const getDataInvoices = async (page = 1, limit = 25, sort = '', from = null, end = null, state = null) => {
    try {
      let filter =
        '[{"property": "desde", "value":"' +
        from +
        '"}, {"property": "hasta", "value":"' +
        end +
        '"}, {"property": "estado", "value":"' +
        state +
        '"}]';

      const params = {
        page: page.toString(),
        limit: limit.toString(),
        sort: sort,
        filter: filter
      };

      const response = await backendAPI.get('/portal/facturas', { params });
      const data = response.data;
      return data;
    } catch (error) {
      throw new Error(error.response || 'Network request failed');
    }
  };

  const startPurchase = async (factId = null, url = location.href, type = 'bizum') => {
    const params = {
      url: url,
      type: type
    };

    try {
      const response = await apiUrl
        .post(`/portal-payment/${factId}`, params)
        .then((response) => {
          generateFormPayBizum(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const startPurchaseCeca = async (factId = null, url = location.href, type = 'bizum') => {
    const params = {
      url: url,
      type: type
    };

    try {
      const response = await apiUrl
        .post(`/portal-payment/ceca/${factId}`, params)
        .then((response) => {
          generateFormPayCeca(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const generateFormPayBizum = (data) => {
    console.log(data);

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

  const generateFormPayCeca = (data) => {
    console.log(data);

    let form = document.createElement('form');
    form.action = data.url;
    form.method = 'POST';
    form.target = '_self';
    form.style.display = 'none';
    form.id = 'cecaForm';

    for (const key in data.merchantParams) {
      if (data.merchantParams.hasOwnProperty(key)) {
        console.log(`${key} : ${data.merchantParams[key]}`);
        let input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.id = key;
        input.value = data.merchantParams[key];
        form.appendChild(input);
      }
    }

    var submit = document.createElement('input');
    submit.type = 'submit';
    submit.id = 'submitPurchase';

    form.appendChild(submit);
    document.body.appendChild(form);
    let submit2 = document.getElementById('submitPurchase');
    submit2.click();

    form.parentElement.removeChild(form);
  };

  const descargarFactura = async (id) => {
    try {
      const response = await backendAPI.get('/portal/factura/' + id, { responseType: 'blob', observe: 'response' });
      let title = response.headers.get('content-disposition').split('filename=')[1].split(';')[0];
      title = title?.substring(1, title.length - 1);

      console.log(response);
      let data = {
        file: response.data,
        filename: title
      };
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response || 'Network request failed');
    }
  };

  return {
    getInvoices,
    getInvoicesSummary,
    getDataInvoices,
    startPurchase,
    startPurchaseCeca,
    descargarFactura
  };
};
export default InfoInvoice;
