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
import {fetchMembers} from "@/app/services/MemberService";

interface MemberProps {
    data: {
        id: string;
        title: string;
        tagline: string;
        // services: Service[];
    }
}

interface MembersData {
    id: string;
    attributes: {
        name: string;
        position: string;
        message: string;
        picture: {
            data: {
                id: string,
                attributes: {
                    url: string
                }
            }
        }
    }
}

export default function Members({ data }: MemberProps) {

    const [members, setMembers] = useState<any>([]);
    const [isLoading, setLoading] = useState(true);

    // const articles:ArticlesData =  fetchArticles(0, 4);

    const fetchData = useCallback(async (start: number, limit: number) => {
        setLoading(true);

        const responseData = await fetchMembers(0, 4);

        if (start === 0) {
            setMembers(responseData.data);
        } else {
            setMembers((prevData: any[] ) => [...prevData, ...responseData.data]);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchData(0, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT));
    }, [fetchData]);

    return (
        <section className="members">
            <div className="container">
                <div className="section-title text-center">
                    <span className="section-title__tagline">{data.tagline}</span>
                    <h2 className={`section-title__title ${amaticFontClass}`}>{data.title}</h2>
                    <div className="section-title__icon">
                        <Image src={SectionTitleIcon} alt="" width={54} height={21}/>
                    </div>
                </div>

                <div className="row">
                    {members.map((article:MembersData) => {
                        const imageUrl = getStrapiMediaScaled(article.attributes.picture.data?.attributes.url, { width: 370, height: 409, fit: 'cover' });

                        return (
                            <div className="col-xl-3 col-lg-3 wow fadeInUp" data-wow-delay="100ms">
                                <div className="blog-one__single">
                                    <div className="blog-one__img">
                                        {imageUrl && <Image className={`aspect-square object-cover`} src={imageUrl} alt="" width={370} height={409}/>}
                                    </div>
                                    <div className="member__content">
                                        <div className="member__name">{article.attributes.name}</div>
                                        <div className="member__position">{article.attributes.position}</div>
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
