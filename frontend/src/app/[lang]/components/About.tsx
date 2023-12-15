import AboutShape1 from "@/app/assets/images/shapes/about-one-shape-1.png"
import AboutImage1 from "@/app/assets/images/resources/about-one-img-1.jpg"
import AboutImage2 from "@/app/assets/images/resources/about-one-img-2.jpg"
import Image from "next/image";
import {amaticFontClass} from "@/app/utils/GoogleFonts";

interface AboutProps {
    data: {
        id: string;
        title: string;
        description: string;
        youtube: string;
    }
}

export default function About({ data }: AboutProps) {
    return (
        <section className="about-one">
            <div className="about-one-shape-1 float-bob-x">
                <Image src={AboutShape1} alt=""/>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-xl-6">
                        <div className="about-one__left">
                            <div className="section-title text-left">
                                <span className="section-title__tagline"></span>
                                <h2 className={`section-title__title ${amaticFontClass}`}>{data.title}</h2>
                            </div>
                            <p className="about-one__text-2">{data.description}</p>

                        </div>
                    </div>
                    <div className="col-xl-6">
                        <div className="about-one__right">
                            <div className="about-one__img-box wow slideInRight" data-wow-delay="100ms"
                                 data-wow-duration="2500ms">
                                <div className="about-one__img-one">
                                    <Image src={AboutImage1} alt="" width={302} height={332}/>
                                </div>
                                <div className="about-one__img-two">
                                    <Image src={AboutImage2} alt=""/>
                                </div>
                                <div className="about-one__video-link">
                                    <a href={data.youtube} className="video-popup">
                                        <div className="about-one__video-icon">
                                            <span className="fa fa-play"></span>
                                            <i className="ripple"></i>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
