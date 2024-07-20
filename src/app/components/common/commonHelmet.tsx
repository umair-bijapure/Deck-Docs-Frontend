import React from "react";
import { Helmet } from "react-helmet";

interface CommonHelmetProps {
  pageTitle: string;
  applicationTitle: string;
  favicon: string;
  language?: string;
}

export function CommonHelmet({
  pageTitle,
  applicationTitle,
  favicon,
  language,
}: CommonHelmetProps) {
  return (
    <Helmet htmlAttributes={{ lang: language ? language : "en" }}>
      <meta charSet="utf-8" />
      <title>
        {pageTitle} | {applicationTitle}
      </title>
      <link rel="icon" type="image/png" href={favicon} sizes="16x16" />
      <meta name="description" content={`${applicationTitle} Application`} />
    </Helmet>
  );
}
