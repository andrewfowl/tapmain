import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import Script from 'next/script'
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-XXXXXXX"
const FB_PIXEL = process.env.NEXT_PUBLIC_FB_PIXEL_ID ?? "000000000000000"
const GTAG_ID = process.env.NEXT_PUBLIC_GTAG_ID ?? "G-0000000000"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: 'TechAccountingPro | Expert Technical Accounting Services Tailored to Your Business Needs.',
  description: 'Solve complex crypto accounting questions with TechAccountingPro. Access expert insights, actionable templates, and proven methodologies to modernize your accounting practices with cutting-edge technology. ',
  metadataBase: new URL("https://techaccountingpro.com"),
  openGraph: {
    url: 'https://techaccountingpro.com/',
    title: 'TechAccountingPro | Your Technical Accounting Expert.',
    description: 'Solve complex crypto accounting questions with TechAccountingPro.',
    images: ['https://techaccountingpro.com/placeholder-logo.png'],
    siteName: 'TechAccountingPro',
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    site: '@tech_accounting',
    creator: '@tech_accounting',
    title: 'TechAccountingPro | Expert Technical Accounting Services Tailored to Your Business Needs.',
    description: 'Unlock Complex Accounting Solutions with TechAccountingPro.',
    images: ['https://techaccountingpro.com/placeholder-logo.png']
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        
          {/* Google Tag Manager */}
          <Script
            id="gtm-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${GTM_ID}');
              `,
            }}
          />
     


      {/* Facebook Pixel */}
        <Script
            id="fb-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)n._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${FB_PIXEL}');
                fbq('track', 'PageView');
              `,
            }}
        />

        
      
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>
         {/* Google Tag Manager (noscript) */}
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>


        <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${FB_PIXEL}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        
        <SiteHeader />
        <main className="min-h-screen">{children}</main>
        <SiteFooter />
         {/* LinkedIn Insight Tag */}
        <Script id="linkedin-insight" strategy="afterInteractive" dangerouslySetInnerHTML={{
          __html: `
            _linkedin_partner_id = "8130930";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
          `
        }} />
        <Script id="linkedin-init" strategy="afterInteractive" dangerouslySetInnerHTML={{
          __html: `
            (function(l) {
              if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
              window.lintrk.q=[]}
              var s = document.getElementsByTagName("script")[0];
              var b = document.createElement("script");
              b.type = "text/javascript";b.async = true;
              b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
              s.parentNode.insertBefore(b, s);
            })(window.lintrk);
          `
        }} />
        <noscript>
          <img height="1" width="1" style={{ display: 'none' }} alt=""
            src="https://px.ads.linkedin.com/collect/?pid=8130930&fmt=gif" />
        </noscript>
      </body>
    </html>
  )
}
