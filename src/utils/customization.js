const getCustomization = () => {
  let customization = {};

  try {
    const storedData = localStorage.getItem('user');
    if (storedData) {
      customization = JSON.parse(storedData);
    } else {
      // Handle the case where the data doesn't exist
      customization = { terms_conditions: false }; // Default or fallback values
    }
  } catch (error) {
    console.error('Error parsing customization data from localStorage:', error);
    customization = { terms_conditions: false }; // Default or fallback values
  }

  return customization;
};

export default getCustomization;
