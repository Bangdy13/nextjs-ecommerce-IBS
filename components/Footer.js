import React from "react";

const Footer = () => {
  return (
    <>
      <section className="footer-section py-5 shadow-sm">
        <div className="container py-3">
          <div className="row  g-4">
            <div className="col-md-6 col-lg-3">
              <a className="navbar-brand" href="/">
                <img src="/ibs.png" alt="logo" width={"80px"} />
              </a>
              <p>Terwuwu kemeja panjang pria cowok gatlemen</p>
            </div>
            <div className="col-lg-3 col-md-6">
              <h5 className="fw-light">Links</h5>
              <ul className="list-unstyled">
                <li className="my-3">
                  <a href="/" className=" text-decoration-none">
                    <i
                      className="fas fa-chevron-right me-1"
                      aria-hidden="true"
                    ></i>{" "}
                    Home
                  </a>
                </li>
                <li className="my-3">
                  <a href="/cart" className=" text-decoration-none">
                    <i
                      className="fas fa-chevron-right me-1"
                      aria-hidden="true"
                    ></i>{" "}
                    Cart
                  </a>
                </li>
                <li className="my-3">
                  <a href="/galeriproduk" className=" text-decoration-none">
                    <i
                      className="fas fa-chevron-right me-1"
                      aria-hidden="true"
                    ></i>{" "}
                    Produk
                  </a>
                </li>
                <li className="my-3">
                  <a href="/signin" className=" text-decoration-none">
                    <i
                      className="fas fa-chevron-right me-1"
                      aria-hidden="true"
                    ></i>{" "}
                    Signin
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6">
              <h5 className="fw-light mb-3">Contact Us</h5>
              <div className="d-flex justify-content-start align-items-start my-2">
                <span className="me-3">
                  <i className="fas fa-map-marked-alt" aria-hidden="true"></i>
                </span>
                <span className="fw-light ml-2">
                  Ferdy Street, TBB, Bali 18776, United America
                </span>
              </div>
              <div className="d-flex justify-content-start align-items-start my-2">
                <span className="me-3">
                  <i className="fas fa-envelope" aria-hidden="true"></i>
                </span>
                <span className="fw-light  ml-2">
                  ferdy.wahyudi13@gmail.com
                </span>
              </div>
              <div className="d-flex justify-content-start align-items-start my-2">
                <span className="me-3">
                  <i className="fas fa-phone-alt" aria-hidden="true"></i>
                </span>
                <span className="fw-light  ml-2">+62819906xxxxx</span>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 ">
              <h5>Follow Us</h5>
              <div>
                <ul className="list-unstyled d-flex">
                  <li>
                    <a href="#" className=" text-decoration-none fs-4 me-4">
                      <i
                        className="fa-brands fa-facebook-f mr-3"
                        aria-hidden="true"
                      ></i>
                    </a>
                  </li>
                  <li>
                    <a href="#" className=" text-decoration-none fs-4 me-4">
                      <i
                        className="fa-brands fa-instagram mr-3"
                        aria-hidden="true"
                      ></i>
                    </a>
                  </li>
                  <li>
                    <a href="#" className=" text-decoration-none fs-4 me-4">
                      <i
                        className="fa-brands fa-whatsapp"
                        aria-hidden="true"
                      ></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
