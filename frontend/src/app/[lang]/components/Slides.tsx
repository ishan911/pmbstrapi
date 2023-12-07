"use client"

import Link from "next/link";
import Image from "next/image";
import HighlightedText from "./HighlightedText";
import { getStrapiMedia } from "../utils/api-helpers";
import { renderButtonStyle } from "../utils/render-button-style";
import {Button, Picture, Slide} from "@/app/[lang]/utils/model";
import {ArrowLeftIcon, ArrowRightIcon} from "@heroicons/react/24/solid";
import {Zoom} from "react-slideshow-image";
import sliderStyles from "../../styles/slider.module.scss"

interface SlidesProps {
    data: {
        id: string;
        title: string;
        description: string;
        slides: Slide[];
    }
}

export default function Slides({ data }: SlidesProps) {
    console.log('slides ', data)

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
            <div className="swiper-container thm-swiper__slider" data-swiper-options='{"slidesPerView": 1, "loop": true,
                "effect": "fade",
                "pagination": {
                "el": "#main-slider-pagination",
                "type": "bullets",
                "clickable": true
                },
                "navigation": {
                "nextEl": "#main-slider__swiper-button-next",
                "prevEl": "#main-slider__swiper-button-prev"
                },
                "autoplay": {
                "delay": 5000
                }}'>
            </div>

            <div className="swiper-wrapper">
                {
                    data.slides.map((slide: Slide, index: number) => {
                        const imgUrl = getStrapiMedia(slide.picture.data.attributes.url);
                        const slideStyle = {
                            backgroundImage: `url(${imgUrl})`
                        }
                        return (
                            <div key={`swiper_slide_${index}`} className="swiper-slide">
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
                            </div>
                        )
                    })
                }
            </div>
            <div className="swiper-pagination" id="main-slider-pagination"></div>
            <div className="main-slider__nav">
                <div className="swiper-button-prev" id="main-slider__swiper-button-next">
                    <i className="icon-right-arrow"></i>
                </div>
                <div className="swiper-button-next" id="main-slider__swiper-button-prev">
                    <i className="icon-right-arrow"></i>
                </div>
            </div>
        </section>
    )
}
