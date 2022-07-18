import { Key } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { INFT } from "types";
import { RegularCard } from "@module/Card";

import "swiper/css";
import "swiper/css/pagination";


export interface IProps {
    data: INFT[]
}

export const Slider: React.FC<IProps> = ({data}) => {
    return (
        <Swiper
            slidesPerView={4.2}
            spaceBetween={30}
            className="mix-blend-luminosity"
        >
            {data.map((data: INFT, key: Key) => {
                return <SwiperSlide key={key}><RegularCard key={key} data={data} /></SwiperSlide>
            })}
        </Swiper>
    )
}
