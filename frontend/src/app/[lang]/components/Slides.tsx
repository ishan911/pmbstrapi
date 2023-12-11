"use client"

import Link from "next/link";
import { getStrapiMedia } from "../utils/api-helpers";
import { renderButtonStyle } from "../utils/render-button-style";
import {Button, Picture, Slide} from "@/app/[lang]/utils/model";
import {ArrowLeftIcon, ArrowRightIcon} from "@heroicons/react/24/solid";

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

interface SlidesProps {
    data: {
        id: string;
        title: string;
        description: string;
        slides: Slide[];
    }
}

export default function Slides({ data }: SlidesProps) {
    const zoomInProperties = {
        scale: 1,
        duration: 5000,
        transitionDuration: 300,
        infinite: true,
        prevArrow: (
            <div className="ml-10 top-40 md:top-72">
                <ArrowLeftIcon className="h-8 w-8 text-white cursor-pointer" />
            </div>
        ),
        nextArrow: (
            <div className="mr-10 top-40 md:top-72">
                <ArrowRightIcon className="h-8 w-8 text-white cursor-pointer" />
            </div>
        ),
    };

    return (
        <section className="main-slider clearfix">
            <Swiper
                spaceBetween={50}
                slidesPerView={1}
                onSlideChange={() => console.log('slide change')}
            >
                {
                    data.slides.map((slide: Slide, index: number) => {
                        const imgUrl = getStrapiMedia(slide.picture.data.attributes.url);
                        const slideStyle = {
                            backgroundImage: `url(${imgUrl})`
                        }
                        return (
                            <SwiperSlide>
                                <div className="image-layer" style={slideStyle}></div>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-xl-12">
                                            <div className="main-slider__content">
                                                <p className="main-slider__sub-title">{slide.sub_title}</p>
                                                <h2 className="main-slider__title">{slide.title}</h2>
                                                <div className="main-slider__btn-box">
                                                    {slide.buttons.map((button: Button, index: number) => (
                                                        <Link
                                                            key={index}
                                                            href={button.url}
                                                            target={button.newTab ? "_blank" : "_self"}
                                                            className={renderButtonStyle(button.type)}
                                                        >
                                                            {button.text}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </section>
    )
}
