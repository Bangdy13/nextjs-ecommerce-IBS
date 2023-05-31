import React from "react";

const Banner = () => {
  return (
    <>
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-ride="carousel"
        data-interval={3000}
      >
        <div className="carousel-inner">
          <div className="carousel-item active ">
            <img src="/slide3.jpeg" alt="..." />
            <div className="carousel-caption">
              <div className="container">
                <div className="content text-left">
                  <p>SPRING / SUMMER COLLECTION 2020</p>
                  <h3>
                    Get up to <span className="diskon">30%</span> off
                  </h3>
                  <h3>Girl&apos;s Fashion</h3>
                  <button className="btn_shop_now ml-1">
                    <a
                      href="#arrivals"
                      className="text-decoration-none text-white"
                    >
                      shop now
                    </a>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <img src="/slide1.jpeg" alt="..." />
            <div className="carousel-caption">
              <div className="container">
                <div className="content text-left justify-content-start">
                  <p>SPRING / SUMMER COLLECTION 2020</p>
                  <h3>
                    Get up to <span className="diskon">30%</span> off
                  </h3>
                  <h3>Boy&apos;s Fashion</h3>
                  <button className="btn_shop_now ml-1">
                    <a
                      href="#arrivals"
                      className="text-decoration-none text-white"
                    >
                      shop now
                    </a>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <button
            className="carousel-control-prev"
            type="button"
            data-target="#carouselExampleFade"
            data-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="sr-only">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-target="#carouselExampleFade"
            data-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="sr-only">Next</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Banner;
