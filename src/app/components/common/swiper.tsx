'use client';
import React, { useState } from 'react';
import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Import FontAwesome icons

interface Swiper {
  name: string;
  content: React.ReactNode;
}

interface CommonSwiperProps {
  tabs: Swiper[];
}

export const CommonSwiper: React.FC<CommonSwiperProps> = ({ tabs }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const PrevArrow = (props: { onClick: React.MouseEventHandler<HTMLDivElement> | undefined }) => (
    <div className=" ml-[-100px] slick-arrow slick-prev" onClick={props.onClick}>
      <FaChevronLeft />
    </div>
  );

  const NextArrow = (props: { onClick: React.MouseEventHandler<HTMLDivElement> | undefined }) => (
    <div className="slick-arrow slick-next"onClick={props.onClick}>
      <FaChevronRight  />
    </div>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: activeIndex,
    
    prevArrow: <PrevArrow onClick={undefined} />,
    nextArrow: <NextArrow onClick={undefined} />,
    beforeChange: (current: any, next: React.SetStateAction<number>) => setActiveIndex(next),
  };

  return (
    
    <div className="bg-gray-100 w-auto ">
      <div className="">
        <Slider {...settings} >
          {tabs.map((tab, index) => (
            <div key={index}>
                 
                 <div className=" space-x-2 space-y-2 ">
                 <div className="flex text-lg font-semibold justify-center mt-[4px] ">{tab.name}</div>
                    <div>{tab.content}</div>
                 </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
   
  );
};






interface Tab {
  name: string;
  content: React.ReactNode;
}

interface CardCarouselProps {
  tabs: Tab[];
}

const CardCarousel: React.FC<CardCarouselProps> = ({ tabs }) => {
  const [index, setIndex] = useState(0);

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex === 0 ? tabs.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex === tabs.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="card-carousel">
      <button className="arrow left-arrow" onClick={handlePrev}>
        &lt;
      </button>
      {tabs.map((tab, i) => (
        <div
          key={i}
          className={`card ${i === index ? 'active' : ''} ${i === index - 1 ? 'prev' : ''} ${
            i === index + 1 ? 'next' : ''
          }`}
          style={{ width: i === index ? '70%' : '50%' }}
        >
          {tab.content}
        </div>
      ))}
      <button className="arrow right-arrow" onClick={handleNext}>
        &gt;
      </button>
    </div>
  );
};

export default CardCarousel;


