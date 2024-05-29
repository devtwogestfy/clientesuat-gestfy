import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import TotalServiceCard from '../services/TotalServiceCard';
import GetInfoService from 'configuraciones/servicios/info-client';
import ServicesDataGrid from '../services/ServicesDataGrid';

const ServiceTabPanel = () => {
  const theme = useTheme();
  const [data, setData] = useState([]);
  const [phones, setPhones] = useState(0);
  const [mobiles, setMobiles] = useState(0);
  const [ftth, setFtth] = useState(0);
  const [others, setOthers] = useState(0);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateData = () => {
    fetchData();
  };

  const infoService = GetInfoService();
  const fetchData = async () => {
    try {
      const [servicesResponse, phonesResponse] = await Promise.all([infoService.getServices(1, 500), infoService.getPhones(1, 500)]);

      const servicesData = servicesResponse.items;
      const phonesData = phonesResponse.items;
      const newData = [...servicesData, ...phonesData];
      let phonesCount = 0;
      let mobilesCount = 0;
      let ftthCount = 0;
      let othersCount = 0;

      const updatedData = newData.map((element) => {
        let updatedElement = { ...element };
        updatedElement.tipoId = element.tipo;
        updatedElement.prepaid = element.prepaid;

        if (element.tipo === 'F') {
          phonesCount++;
          updatedElement.tipo = 'Fijo';
        } else if (element.tipo === 'M') {
          mobilesCount++;
          updatedElement.tipo = 'Movil';
        } else if (!element.tipo && element.tecnologia === 1) {
          ftthCount++;
          updatedElement.tipo = 'FTTH';
        } else if ((element.tipo && element.tipo !== 'F' && element.tipo !== 'M') || (!element.tipo && element.tecnologia !== 1)) {
          othersCount++;
          updatedElement.tipo = 'Wimax';
        }

        return updatedElement;
      });

      setData(updatedData);
      setPhones(phonesCount);
      setMobiles(mobilesCount);
      setFtth(ftthCount);
      setOthers(othersCount);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  console.log(data);
  return (
    <MainCard>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12} sm={3} md={3} lg={3}>
          <Grid container spacing={gridSpacing} direction="column">
            <Grid item xs={12}>
              <TotalServiceCard
                title="FTTH"
                total={ftth}
                colorCard={theme.palette.secondary.dark}
                backgroundCard={theme.palette.secondary[800]}
                icon="router"
              />
            </Grid>
            <Grid item xs={12}>
              <TotalServiceCard
                title="Fijos"
                total={phones}
                colorCard={theme.palette.primary.dark}
                backgroundCard={theme.palette.primary[800]}
                icon="phone"
              />
            </Grid>
            <Grid item xs={12}>
              <TotalServiceCard
                title="Móviles"
                total={mobiles}
                colorCard={theme.palette.success.dark}
                backgroundCard={theme.palette.success.light}
                icon="mobile"
              />
            </Grid>
            <Grid item xs={12}>
              <TotalServiceCard
                title="Otros"
                total={others}
                colorCard={theme.palette.error.dark}
                backgroundCard={theme.palette.error.light}
                icon="other"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={9} md={9} lg={9}>
          <ServicesDataGrid rows={data} updateData={updateData} />
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default ServiceTabPanel;
