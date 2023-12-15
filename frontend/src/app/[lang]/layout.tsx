import type { Metadata } from "next";
import "./globals.css";
import { getStrapiMedia, getStrapiURL } from "./utils/api-helpers";
import { fetchAPI } from "./utils/fetch-api";

import { i18n } from "../../../i18n-config";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import {FALLBACK_SEO} from "@/app/[lang]/utils/constants";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/app/assets/vendors/animate/animate.min.css";
import "@/app/assets/vendors/animate/custom-animate.css";
import "@/app/assets/vendors/fontawesome/css/all.min.css";
import "@/app/assets/vendors/jarallax/jarallax.css";
import "@/app/assets/vendors/jquery-magnific-popup/jquery.magnific-popup.css";
import "@/app/assets/vendors/nouislider/nouislider.min.css";
import "@/app/assets/vendors/nouislider/nouislider.pips.css";
import "@/app/assets/vendors/odometer/odometer.min.css";
import "@/app/assets/vendors/swiper/swiper.min.css";
import "@/app/assets/vendors/agrion-icons/style.css";
import "@/app/assets/vendors/tiny-slider/tiny-slider.min.css";
import "@/app/assets/vendors/reey-font/stylesheet.css";
import "@/app/assets/vendors/owl-carousel/owl.carousel.min.css";
import "@/app/assets/vendors/owl-carousel/owl.theme.default.min.css";
import "@/app/assets/vendors/bxslider/jquery.bxslider.css";
import "@/app/assets/vendors/bootstrap-select/css/bootstrap-select.min.css";
import "@/app/assets/vendors/vegas/vegas.min.css";
import "@/app/assets/vendors/jquery-ui/jquery-ui.css";
import "@/app/assets/vendors/timepicker/timePicker.css";
import "@/app/assets/css/agrion.scss";
import "@/app/assets/css/agrion-responsive.scss";



async function getGlobal(lang: string): Promise<any> {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  if (!token) throw new Error("The Strapi API Token environment variable is not set.");

  const path = `/global`;
  const options = { headers: { Authorization: `Bearer ${token}` } };

  const urlParamsObject = {
    populate: [
      "metadata.shareImage",
      "favicon",
      "notificationBanner.link",
      "navbar.links",
      "navbar.navbarLogo.logoImg",
      "footer.footerLogo.logoImg",
      "footer.menuLinks",
      "footer.legalLinks",
      "footer.socialLinks",
      "footer.categories",
    ],
    locale: lang,
  };
  return await fetchAPI(path, urlParamsObject, options);
}

export async function generateMetadata({ params } : { params: {lang: string}}): Promise<Metadata> {
  const meta = await getGlobal(params.lang);

  if (!meta.data) return FALLBACK_SEO;

  const { metadata, favicon } = meta.data.attributes;
  const { url } = favicon.data.attributes;

  return {
    title: metadata.metaTitle,
    description: metadata.metaDescription,
    icons: {
      icon: [new URL(url, getStrapiURL())],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const global = await getGlobal(params.lang);
  // TODO: CREATE A CUSTOM ERROR PAGE
  if (!global.data) return null;

  const { notificationBanner, navbar, footer } = global.data.attributes;

  const navbarLogoUrl = getStrapiMedia(
    navbar.navbarLogo.logoImg.data.attributes.url
  );

  const footerLogoUrl = getStrapiMedia(
    footer.footerLogo.logoImg.data.attributes.url
  );

  return (
    <html lang={params.lang}>
      <body>
        <div className={`page-wrapper`}>
          <Navbar
              links={navbar.links}
              logoUrl={navbarLogoUrl}
              logoText={navbar.navbarLogo.logoText}
          />

          <main className="min-h-screen">
            {children}
          </main>

          {/*<Banner data={notificationBanner} />*/}

          <Footer
              logoUrl={footerLogoUrl}
              logoText={footer.footerLogo.logoText}
              menuLinks={footer.menuLinks}
              categoryLinks={footer.categories.data}
              legalLinks={footer.legalLinks}
              socialLinks={footer.socialLinks}
          />
        </div>
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
