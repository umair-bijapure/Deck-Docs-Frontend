'use client';
import { MyContextProvider } from "@/app/Context"
import { CommonSectionHeadings } from "@/app/components/common/bannersAndheadings"

export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
     
      <section className="mt-4 bsm:bg-none">
        {/* Include shared UI here e.g. a header or sidebar */}
        {/* <div className="hidden sm:flex flex-col md:mt-12 align-middle z-10 overflow-y-auto items-stretch"> */}
        {/* <CommonSectionHeadings
                showError={false}
                errorText={"No Error"}
                href={true} 
                color={'gray-300'} 
                heading={'ProTeams'} > */}

                      {/* <CommonTabs
                          tabs={tabs}            
                          /> */}
                          {children}

        {/* </CommonSectionHeadings> */}
      {/* </div> */}
   
        
      </section>
     
    )
  }