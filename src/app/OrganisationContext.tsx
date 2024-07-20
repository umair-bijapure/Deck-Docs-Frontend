import React, { createContext, useContext, useState, ReactNode } from 'react';

interface OrganisationContextType {
  organisationId: string;
  setOrganisationId: (id: string) => void;
}

const OrganisationContext = createContext<OrganisationContextType | undefined>(undefined);

export const OrganisationProvider = ({ children }: { children: ReactNode }) => {
  const [organisationId, setOrganisationId] = useState<string>('');

  return (
    <OrganisationContext.Provider value={{ organisationId, setOrganisationId }}>
      {children}
    </OrganisationContext.Provider>
  );
};

export const useOrganisation = (): OrganisationContextType => {
  const context = useContext(OrganisationContext);
  if (context === undefined) {
    throw new Error('useOrganisation must be used within an OrganisationProvider');
  }
  return context;
};
