import * as React from 'react';
import MarketingPage from '../marketing-page/MarketingPage';

export default function Marketing() {
  return <MarketingPage disableCustomTheme />;
}

Marketing.getLayout = (page: React.ReactNode) => page;
