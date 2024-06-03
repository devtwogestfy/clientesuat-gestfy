import { useState, useEffect } from 'react';
import { getServicesList } from 'services/servicesService';

const useServicesData = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataServices = await getServicesList(1, 25);
        setServices(dataServices.items);
      } catch (error) {
        console.error('Error fetching services list:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { services, isLoading };
};

export default useServicesData;
