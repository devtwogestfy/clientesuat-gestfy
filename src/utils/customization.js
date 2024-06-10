const getCustomization = () => {
  let customization = {};

  try {
    const storedData = localStorage.getItem('user');
    if (storedData) {
      customization = JSON.parse(storedData);
    } else {
      // Handle the case where the data doesn't exist
      customization = { terms_conditions: false };
      customization = { img_login: 'https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg', };
    }
  } catch (error) {
    console.error('Error parsing customization data from localStorage:', error);
    customization = { terms_conditions: false };
    customization = { img_login: 'https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg' };
  }

  return customization;
};

export default getCustomization;
