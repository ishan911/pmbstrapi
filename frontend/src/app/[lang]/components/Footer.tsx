"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "./Logo";
import { CgWebsite } from "react-icons/cg";
import { FaDiscord } from "react-icons/fa";
import { AiFillTwitterCircle, AiFillYoutube } from "react-icons/ai";
import FooterBg from '@/app/assets/images/shapes/site-footer-shape-1.png'
import FooterLogoImg from '@/app/assets/images/footer-logo.png'
import Image from "next/image";

interface FooterLink {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
  social?: string;
}

interface CategoryLink {
  id: string;
  attributes: {
    name: string;
    slug: string;
  };
}

function FooterLink({ url, text }: FooterLink) {
  const path = usePathname();
  return (
    <li className="flex">
      <Link
        href={url}
        className={`hover:dark:text-violet-400 ${
          path === url && "dark:text-violet-400 dark:border-violet-400"
        }}`}
      >
        {text}
      </Link>
    </li>
  );
}

function CategoryLink({ attributes }: CategoryLink) {
  return (
    <li className="flex">
      <Link
        href={`/blog/${attributes.slug}`}
        className="hover:dark:text-violet-400"
      >
        {attributes.name}
      </Link>
    </li>
  );
}

function RenderSocialIcon({ social }: { social: string | undefined }) {
  switch (social) {
    case "WEBSITE":
      return <CgWebsite />;
    case "TWITTER":
      return <AiFillTwitterCircle />;
    case "YOUTUBE":
      return <AiFillYoutube />;
    case "DISCORD":
      return <FaDiscord />;
    default:
      return null;
  }
}

export default function Footer({
  logoUrl,
  logoText,
  menuLinks,
  categoryLinks,
  legalLinks,
  socialLinks,
}: {
  logoUrl: string | null;
  logoText: string | null;
  menuLinks: Array<FooterLink>;
  categoryLinks: Array<CategoryLink>;
  legalLinks: Array<FooterLink>;
  socialLinks: Array<FooterLink>;
}) {

  const footerStyle = {
    backgroundImage: `url(${FooterBg})`
  }

  return (
      <footer className="site-footer">
        <div className="site-footer__top">
          <div className="container">
            <div className="site-footer__top-inner">
              <div className="site-footer-shape-1 float-bob-x" style={footerStyle}></div>
              <div className="row">
                <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="100ms">
                  <div className="footer-widget__column footer-widget__about">
                    <div className="footer-widget__logo">
                      <a href={'/'}>
                        <Image src={FooterLogoImg} width={256} height={256} alt={''}/>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-xl-2 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="200ms">
                  <div className="footer-widget__column footer-widget__Explore">
                    <div className="footer-widget__title-box">
                      <h3 className="footer-widget__title">Explore</h3>
                    </div>
                    <ul className="footer-widget__Explore-list list-unstyled">
                      {menuLinks.map((link: FooterLink) => (
                          <FooterLink key={link.id} {...link} />
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="300ms">
                  <div className="footer-widget__column footer-widget__news">
                    <div className="footer-widget__title-box">
                      <h3 className="footer-widget__title">News</h3>
                    </div>
                    <ul className="footer-widget__news-list list-unstyled">
                      <li>
                        <div className="footer-widget__news-img">
                          <img src="assets/images/resources/footer-widget-news-img-1.jpg" alt=""/>
                        </div>
                        <div className="footer-widget__news-content">
                          <p className="footer-widget__news-date">20 Jul, 2022</p>
                          <h5 className="footer-widget__news-sub-title"><a href="blog-details.html">A
                            Organic Food
                            Gives
                            More Good Taste</a></h5>
                        </div>
                      </li>
                      <li>
                        <div className="footer-widget__news-img">
                          <img src="assets/images/resources/footer-widget-news-img-2.jpg" alt=""/>
                        </div>
                        <div className="footer-widget__news-content">
                          <p className="footer-widget__news-date">20 Jul, 2022</p>
                          <h5 className="footer-widget__news-sub-title"><a href="blog-details.html">A
                            Organic Food
                            Gives
                            More Good Taste</a></h5>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="400ms">
                  <div className="footer-widget__column footer-widget__Contact">
                    <div className="footer-widget__title-box">
                      <h3 className="footer-widget__title">Contact</h3>
                    </div>
                    <ul className="footer-widget__Contact-list list-unstyled">
                      <li>
                        <div className="icon">
                          <span className="fas fa-phone-square-alt"></span>
                        </div>
                        <div className="text">
                          <p><a href="tel:94112335411/ 14 ">+94 112 335 411/ 14 </a></p>
                        </div>
                      </li>
                      <li>
                        <div className="icon">
                          <span className="fas fa-envelope"></span>
                        </div>
                        <div className="text">
                          <p><a href="mailto:chairmanpmb@gmail.com">chairmanpmb@gmail.com</a></p>
                        </div>
                      </li>
                      <li>
                        <div className="icon">
                          <span className="icon-pin"></span>
                        </div>
                        <div className="text">
                          <p>6th Floor, Sir Chittampalam A. Gardiner Mw,<br/>
                            Colombo 02, Sri Lanka.</p>
                        </div>
                      </li>
                    </ul>
                    <form className="footer-widget__Contact-form">
                      <div className="footer-widget__Contact-input-box">
                        <input type="email" placeholder="Email Address" name="email"/>
                          <button type="submit" className="footer-widget__Contact-btn"><i
                              className="icon-right-arrow"></i></button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="site-footer__bottom">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="site-footer__bottom-inner">
                  <p className="site-footer__bottom-text">© Copyright 2023 by <a href="#">pmb.gov.lk</a></p>
                  <div className="site-footer__social">
                    <a href="#"><i className="fab fa-twitter"></i></a>
                    <a href="#"><i className="fab fa-facebook"></i></a>
                    <a href="#"><i className="fab fa-pinterest-p"></i></a>
                    <a href="#"><i className="fab fa-instagram"></i></a>
                  </div>
                  <div className="site-footer__bottom-scroll">
                    <a href="#" data-target="html" className="scroll-to-target scroll-to-top"><i
                        className="icon-up-arrow"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>)
}
