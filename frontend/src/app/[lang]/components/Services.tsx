import {Picture} from "@/app/[lang]/utils/model";
import {getStrapiMedia} from "@/app/[lang]/utils/api-helpers";
import ServiceShape from "@/app/assets/images/shapes/services-one-shape-1.png"
import Image from "next/image";
import {amaticFontClass} from "@/app/utils/GoogleFonts";

interface ServicesProps {
    data: {
        id: string;
        title: string;
        tagline: string;
        services: Service[];
    }
}

interface Service {
    id: string;
    title: string;
    description: string;
    icon: string;
    link: string;
    image: Picture
}

export default function Services({ data }: ServicesProps) {
    const serviceUrl = getStrapiMedia(ServiceShape.src);
    const serviceBgStyle = {
        backgroundImage: `url(${ServiceShape})`
    }

    return (
        <section className="services-one">
            <div className="services-one__bg" style={serviceBgStyle}>
            </div>
            <div className="container">
                <div className="section-title text-center">
                    <span className="section-title__tagline">{data.tagline}</span>
                    <h2 className={`section-title__title ${amaticFontClass}`}>{data.title}</h2>
                    <div className="section-title__icon">
                        <img src="assets/images/icon/section-title-icon-1.png" alt=""/>
                    </div>
                </div>
                <div className="row">
                    {
                        data.services.map((service: Service, index: number) => {
                            const imgUrl = getStrapiMedia(service.image.data.attributes.url);
                            return (
                                <div key={`service_item_${index}`} className="col-xl-3 col-lg-6 col-md-6 wow fadeInLeft" data-wow-delay="100ms">
                                    <div className="services-one__single">
                                        <div className="services-one__img-box">
                                            {
                                                imgUrl && <div className="services-one__img">
                                                    <Image className={`aspect-square`} src={imgUrl} alt="" width={196} height={196}/>
                                                </div>
                                            }
                                            <div className="services-one__icon">
                                                <span className={`icon-${service.icon}`}></span>
                                            </div>
                                        </div>
                                        <div className="services-one__content">
                                            <h3 className="services-one__title">
                                                <a href="agriculture-products.html">{service.title}</a>
                                            </h3>
                                            <p className="services-one__text">{service.description}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}
