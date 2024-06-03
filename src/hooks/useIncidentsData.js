import { useState, useEffect } from 'react';
import { getIncidentsSummary, getSat, getTickets, createIncident } from 'settings/servicios/incident';

const useIncidentsData = () => {
  const [totalIncidents, setTotalIncidents] = useState(null);
  const [totalOpen, setTotalOpen] = useState(null);
  const [totalClose, setTotalClose] = useState(null);
  const [totalHours, setTotalHours] = useState(null);
  const [incidents, setIncidents] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const summaryIncident = await getIncidentsSummary();
        setTotalIncidents(summaryIncident.numeroincidencias);
        setTotalOpen(summaryIncident.abiertas);
        setTotalClose(summaryIncident.cerradas);

        const summaryHour = await getSat();
        setTotalHours(summaryHour.formateado);

        const dataIncidents = await getTickets();
        setIncidents(dataIncidents.items);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCreateIncident = async (parameters, setErrors, fetchData, setIsAlertSuccess, setOpen) => {
    try {
      await createIncident(parameters);
      fetchData();
      setIsAlertSuccess(true);
      setTimeout(() => {
        setIsAlertSuccess(false);
      }, 3000);
      setOpen(false);
    } catch (error) {
      console.error('Error creating incident:', error);
    }
  };

  return {
    totalIncidents,
    totalOpen,
    totalClose,
    totalHours,
    incidents,
    isLoading,
    handleCreateIncident
  };
};

export default useIncidentsData;
