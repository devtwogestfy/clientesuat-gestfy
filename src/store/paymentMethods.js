import React from 'react';
import { FormattedMessage } from 'react-intl';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import CancelIcon from '@mui/icons-material/Cancel';
import ComboPayImage from 'assets/images/logo-pays/combopay-short.png';
import ConektaImage from 'assets/images/logo-pays/conekta-short.png';
import EpaycoImage from 'assets/images/logo-pays/epayco-short.png';
import FlowPagoImage from 'assets/images/logo-pays/flowpago-short.png';
import MercadoPagoImage from 'assets/images/logo-pays/mercadopago-short.png';
import PagueloImage from 'assets/images/logo-pays/paguelo-facil-short.png';
import PaypalImage from 'assets/images/logo-pays/paypal-short.png';
import PayuImage from 'assets/images/logo-pays/payu-short.png';
import PixelPayImage from 'assets/images/logo-pays/pixelpay-short.png';

const paymentMethods = (handleClosePay) => [
  {
    id: 'card',
    icon: <CreditCardIcon fontSize="large" />,
    message: <FormattedMessage id="dialogs.buttons.card" />,
    onClick: () => handleClosePay('targeta')
  },
  {
    id: 'bizum',
    icon: <PhoneIphoneIcon fontSize="large" />,
    message: <FormattedMessage id="dialogs.buttons.bizum" />,
    onClick: handleClosePay
  },
  {
    id: 'combopay',
    icon: <img src={ComboPayImage} alt="Combopay" width={40} height={40} />,
    message: <FormattedMessage id="dialogs.buttons.combopay" />,
    onClick: handleClosePay
  },
  {
    id: 'conekta',
    icon: <img src={ConektaImage} alt="Conekta" width={40} height={40} />,
    message: <FormattedMessage id="dialogs.buttons.conekta" />,
    onClick: handleClosePay
  },
  {
    id: 'epayco',
    icon: <img src={EpaycoImage} alt="Epayco" width={40} height={40} />,
    message: <FormattedMessage id="dialogs.buttons.epayco" />,
    onClick: handleClosePay
  },
  {
    id: 'flowpago',
    icon: <img src={FlowPagoImage} alt="Flow Pago" width={40} height={40} />,
    message: <FormattedMessage id="dialogs.buttons.flowpago" />,
    onClick: handleClosePay
  },
  {
    id: 'mercadopago',
    icon: <img src={MercadoPagoImage} alt="Mercado Pago" width={40} height={40} />,
    message: <FormattedMessage id="dialogs.buttons.mercadopago" />,
    onClick: handleClosePay
  },
  {
    id: 'paguelo',
    icon: <img src={PagueloImage} alt="Paguelo Facil" width={40} height={40} />,
    message: <FormattedMessage id="dialogs.buttons.paguelo" />,
    onClick: handleClosePay
  },
  {
    id: 'paypal',
    icon: <img src={PaypalImage} alt="Paypal" width={40} height={40} />,
    message: <FormattedMessage id="dialogs.buttons.paypal" />,
    onClick: handleClosePay
  },
  {
    id: 'payu',
    icon: <img src={PayuImage} alt="PayU" width={40} height={40} />,
    message: <FormattedMessage id="dialogs.buttons.payu" />,
    onClick: handleClosePay
  },
  {
    id: 'pixelpay',
    icon: <img src={PixelPayImage} alt="Pixel Pay" width={40} height={40} />,
    message: <FormattedMessage id="dialogs.buttons.pixelpay" />,
    onClick: handleClosePay
  },
  {
    id: 'cancel',
    icon: <CancelIcon fontSize="large" />,
    message: <FormattedMessage id="dialogs.buttons.cancel" />,
    onClick: handleClosePay
  }
];

export default paymentMethods;
