"use client";

import {Picture} from "@/app/[lang]/utils/model";
import {getStrapiMedia, getStrapiMediaScaled} from "@/app/[lang]/utils/api-helpers";
import ServiceShape from "@/app/assets/images/shapes/services-one-shape-1.png";
import SectionTitleIcon from "@/app/assets/images/icon/section-title-icon-1.png";
import Image from "next/image";
import {fetchArticles} from "@/app/services/ArticleService";
import {useCallback, useEffect, useState} from "react";
import {fetchAPI} from "@/app/[lang]/utils/fetch-api";
import {amaticFontClass} from "@/app/utils/GoogleFonts";

interface ServicesProps {
    data: {
        id: string;
        title: string;
        tagline: string;
        // services: Service[];
    }
}

interface ArticlesData {
    id: string;
    attributes: {
        title: string;
        description: string;
        slug: string;
        cover: {
            data: {
                id: string,
                attributes: {
                    url: string
                }
            }
        }
    }
}

export default function Articles({ data }: ServicesProps) {
    const serviceUrl = getStrapiMedia(ServiceShape.src);
    const serviceBgStyle = {
        backgroundImage: `url(${ServiceShape})`
    }

    const [articles, setArticles] = useState<any>([]);
    const [isLoading, setLoading] = useState(true);

    // const articles:ArticlesData =  fetchArticles(0, 4);

    const fetchData = useCallback(async (start: number, limit: number) => {
        setLoading(true);

        const responseData = await fetchArticles(0, 3);

        if (start === 0) {
            setArticles(responseData.data);
        } else {
            setArticles((prevData: any[] ) => [...prevData, ...responseData.data]);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchData(0, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT));
    }, [fetchData]);

    return (
        <section className="blog-one">
            <div className="container">
                <div className="section-title text-center">
                    <span className="section-title__tagline">{data.tagline}</span>
                    <h2 className={`section-title__title ${amaticFontClass}`}>{data.title}</h2>
                    <div className="section-title__icon">
                        <Image src={SectionTitleIcon} alt="" width={54} height={21}/>
                    </div>
                </div>

                <div className="row">
                    {articles.map((article:ArticlesData) => {
                        const imageUrl = getStrapiMediaScaled(article.attributes.cover.data?.attributes.url, { width: 370, height: 409, fit: 'cover' });

                        return (
                            <div className="col-xl-4 col-lg-4 wow fadeInUp" data-wow-delay="100ms">
                                <div className="blog-one__single">
                                    <div className="blog-one__img">
                                        {imageUrl && <Image src={imageUrl} alt="" width={370} height={409}/>}
                                            <div className="blog-one__date">
                                                <span>28</span>
                                                <p>Aug</p>
                                            </div>
                                    </div>
                                    <div className="blog-one__content">
                                        <h3 className="blog-one__title">
                                            <a href="blog-details.html">{article.attributes.title}</a>
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
