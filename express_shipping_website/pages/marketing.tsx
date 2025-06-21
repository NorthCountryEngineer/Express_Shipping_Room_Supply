import * as React from 'react';
import HomePage from '../home-page/HomePage';

export default function Marketing() {
  return <HomePage />;
}

Marketing.getLayout = (page: React.ReactNode) => page;
