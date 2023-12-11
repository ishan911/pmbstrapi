import {Button, Picture} from "@/app/[lang]/utils/model";
import {getStrapiMedia} from "@/app/[lang]/utils/api-helpers";

interface ParallaxProps {
    data: {
        id: string;
        tagline: string;
        title: string;
        link: Button;
        background: Picture;
    }
}

export default function Parallax({ data }: ParallaxProps) {
    const imgUrl = getStrapiMedia(data.background.data.attributes.url);
    const parallaxStyle = {
        backgroundImage: `url(${imgUrl})`
    }

    return (
        <section className="unbeatable-one">
            <div className="unbeatable-one__bg  jarallax" data-jarallax data-speed="0.2" data-imgPosition="50% 0%" style={parallaxStyle}></div>
            <div className="container">
                <div className="unbeatable-one__inner text-center">
                    <div className="unbeatable-one__content">
                        <p className="unbeatable-one__tagline">{data.tagline}</p>
                        <h3 className="unbeatable-one__title" dangerouslySetInnerHTML={{ __html: data.title }}></h3>
                        {
                            data.link && <div className="unbeatable-one__btn-box">
                                <a href={data.link.url} className="thm-btn unbeatable-one__btn">{data.link.text} <i className="icon-right-arrow"></i> </a>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}
