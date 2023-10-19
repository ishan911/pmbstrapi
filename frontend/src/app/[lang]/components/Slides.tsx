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
        <section className="dark:bg-black dark:text-gray-100 sliders">
            <div className="relative bg-gray-800">
                <div className={`w-full ${sliderStyles.slider}`}>
                    <Zoom {...zoomInProperties}>
                        {data.slides.map((slide: Slide, index: number) => {
                            const imgUrl = getStrapiMedia(slide.picture.data.attributes.url);
                            return <div key={index} className={`flex justify-center md:items-center items-start w-screen relative ${sliderStyles.slide}`}>
                                <Image
                                    src={imgUrl || ""}
                                    alt={
                                        slide.picture.data.attributes.alternativeText || "none provided"
                                    }
                                    className="w-screen object-cover block w-full h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128 "
                                    width={0}
                                    height={600}
                                    sizes="100vw"
                                    style={{ width: '100%', height: '600px' }}
                                />
                                <HighlightedText
                                    text={slide.title}
                                    tag="h1"
                                    className="absolute md:top-60 top-24 inset-x-1/4 text-center z-10 md:text-6xl text-4xl bold text-white"
                                    color="dark:text-violet-400"
                                />
                                <HighlightedText
                                    text={slide.description}
                                    tag="p"
                                    className="absolute md:top-80 top-40 inset-x-1/4 text-center z-10 md:text-2xl text-xl bold text-white"
                                    color="dark:text-violet-400"
                                />
                                <div className="absolute md:top-90 top-70 flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
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
                        })}
                    </Zoom>
                </div>





                {/*<div id="default-carousel" className="relative w-full" data-carousel="slide">
                    <div className="relative h-56 overflow-hidden rounded-lg md:h-96">

                        {data.slides.map((slide: Slide, index: number) => {
                            const imgUrl = getStrapiMedia(slide.picture.data.attributes.url);
                            return <div key={index} className="hidden duration-700 ease-in-out" data-carousel-item>
                                <Image
                                    src={imgUrl || ""}
                                    alt={
                                        slide.picture.data.attributes.alternativeText || "none provided"
                                    }
                                    className="object-contain block w-full h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128 "
                                    width={600}
                                    height={600}
                                />
                                <div className="absolute inset-0 bg-black opacity-50"></div>
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                                    <HighlightedText
                                        text={slide.title}
                                        tag="h1"
                                        className="text-5xl font-bold leading-none sm:text-6xl mb-8"
                                        color="dark:text-violet-400"
                                    />
                                    <HighlightedText
                                        text={slide.description}
                                        tag="p"
                                        className="tmt-6 mb-8 text-lg sm:mb-12"
                                        color="dark:text-violet-400"
                                    />
                                    <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
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
                        })}
                    </div>
                </div>*/}
            </div>
        </section>
    );
}
