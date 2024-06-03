import GetInfoService from 'settings/servicios/service';

const infoService = GetInfoService();

export const getServicesList = async (page, limit) => {
  try {
    const dataServices = await infoService.getServicesList(page, limit);
    return dataServices;
  } catch (error) {
    console.error('Error fetching services list:', error);
    throw error;
  }
};
