"use client";

import {useCallback, useEffect, useState} from "react";
import {fetchStocks} from "@/app/services/StockService";
import {Swiper, SwiperSlide} from "swiper/react";


interface StockData {
    id: string;
    attributes: {
        location: string;
        stock: string;
    }
}

export default function Stocks() {

    const [stocks, setStocks] = useState<any>([]);
    const [isLoading, setLoading] = useState(true);

    const fetchData = useCallback(async (start: number, limit: number) => {
        setLoading(true);

        const responseData = await fetchStocks();

        if (start === 0) {
            setStocks(responseData.data);
        } else {
            setStocks((prevData: any[] ) => [...prevData, ...responseData.data]);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchData(0, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT));
    }, [fetchData]);

    return (
        <section className="brand-one">
            <div className="brand-one__inner">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <Swiper
                                spaceBetween={50}
                                slidesPerView={5}
                            >
                                {stocks.map((stock:StockData, index: number) => {
                                    return (
                                        <SwiperSlide key={`stock_item_${index}`} className="item stock-one__single fadeInLeft" data-wow-delay="100ms">
                                            <div className="counter-one__content-box count-box">
                                                <h3 className="count-text" data-stop="6420" data-speed="1500">{stock.attributes.stock}</h3>
                                                <p className="counter-one__text">{stock.attributes.location}</p>
                                            </div>
                                        </SwiperSlide>
                                    )
                                })}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
