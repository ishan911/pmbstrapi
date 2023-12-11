import {Button, Picture, Slide} from "@/app/[lang]/utils/model";
import { Amatic_SC } from 'next/font/google'
import {getStrapiMedia} from "@/app/[lang]/utils/api-helpers";

const Amatic = Amatic_SC({
    weight: '700',
    subsets: ['latin'],
})

interface ClickToActionProps {
    data: {
        id: string;
        Title: string;
        Icon: string;
        description: string;
        link: Button;
        background: Picture;
    }
}

export default function ClickToAction({ data }: ClickToActionProps) {
    const imgUrl = getStrapiMedia(data.background.data.attributes.url);
    const ctaStyle = {
        backgroundImage: `url(${imgUrl})`
    }

    return (
        <section className="cta-one">
            <div className="cta-one__bg" data-jarallax data-speed="0.2" data-imgPosition="50% 0%" style={ctaStyle}></div>
            <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="cta-one__inner">
                            <div className="cta-one__left">
                                <div className="cta-one__icon">
                                    <span className={`icon-${data.Icon}`}></span>
                                </div>
                                <h3 className={`cta-one__title ${Amatic.className}`} dangerouslySetInnerHTML={{ __html: data.Title }}></h3>
                            </div>
                            {
                                data.link && <div className="cta-one__right">
                                    <a href={data.link.url} className="thm-btn cta-one__btn">{data.link.text} <i className="icon-right-arrow"></i> </a>
                                </div>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
