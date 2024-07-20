'use client';
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import { MyContextProvider, useMyContext } from './Context';
import MainNavbar from './components/MainNavbar';
import FAQs from './components/FAQs';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Footer from './components/Footer';
import { useParams } from 'next/navigation';
import { OrganisationProvider } from './OrganisationContext';



const metadata: Metadata = {
  title: 'Promaestro-ProTeams',
  description: 'Contractors Work Space',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;

}) 

{
  const params = useParams();
  const contractor_company = Array.isArray(params.contractorId)
    ? params.contractorId.join(",")  // Join array elements into a single string
    : params.contractorId;
  
  const decodedContractorId = decodeURIComponent(contractor_company);
  return (
    <html lang="en">
        <Head>
        <title>KuickPlan - Dream Meets Reality</title>
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <body>
      <MyContextProvider>
        <OrganisationProvider>
          
          {children}
          </OrganisationProvider>
        
        </MyContextProvider>
      </body>
    </html>
  );
}

