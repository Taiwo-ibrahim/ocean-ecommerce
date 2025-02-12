import React from "react";  
import "./page.css"
import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/Footer/Footer";


function ExchangePolicy() {
    return (
      <div className="exchange-policy__container">
        <div className="exchange-policy__container-navbar">
          <Navbar />
        </div>
        <div className="exchange-policy__container-content">
          <h1>Exchange Policy</h1>
          <div className="exchange-policy__container-content_body">
            <p>
              At Oceansteeze, we are dedicated to offering you an exceptional
              shopping experience, reflecting our commitment to premium luxury
              fashion. We want every purchase to be a source of satisfaction and
              joy, and we understand that occasionally an exchange may be needed
              to ensure you find the perfect item. <br /> Please take a moment
              to review the details of our Exchange Policy below. Should you
              have any questions, our team is always here to assist you.
            </p>
            <div className="exchange-policy__container-content_body-section1">
              <p>1. Eligibility for Exchange</p>
              <p>
                - Exchanges are accepted within 14 days from the date of
                delivery. Items must be in new, unworn, and unwashed condition,
                with all original tags and packaging intact.
                <br /> - Items showing signs of wear, damage, or those with
                missing tags are not eligible for exchange.
                <br /> - Final Sale items are excluded from our exchange policy.
              </p>
            </div>
            <div className="exchange-policy__container-content_body-section1">
              <p>2. Exchange Process</p>
              <p>
                - To initiate an exchange, kindly reach out to our Customer
                Service team at{" "}
                <span className="email-ex">support@oceansteeze.com</span> with
                your order number and details of the item you wish to exchange.
                <br /> - Once your exchange request is approved, we will provide
                you with return instructions. Please ensure the item is securely
                packaged to avoid any damage during transit.
                <br /> - Customers are responsible for return shipping costs,
                unless the item is defective or an error was made with your
                order.
                <br /> - Upon receiving your return, our Quality Control team
                will carefully inspect the item to ensure it meets our exchange
                criteria. Items that do not comply will be returned to you and
                will not be eligible for exchange.
                <br /> - For exchanges that pass inspection, we will ship your
                new item within 5-7 business days.
              </p>
            </div>
            <div className="exchange-policy__container-content_body-section1">
              <p>3. Exchanging for a Different Size or Style</p>
              <p>
                - If you wish to exchange for a different size or style, please
                specify your preferred option in your exchange request.
                Availability will be confirmed before finalizing the exchange.
                <br /> - If the requested item is unavailable, we will offer
                alternative options or a full refund, according to your
                preference.
              </p>
            </div>
            <div className="exchange-policy__container-content_body-section1">
              <p>4. International Exchanges</p>
              <p>
                - For exchanges outside your region, please note that additional
                shipping fees and extended transit times may apply. Any customs
                duties, if applicable, will be the responsibility of the
                customer
              </p>
            </div>
            <div className="exchange-policy__container-content_body-section1">
              <p>5. Cancellations and Refunds</p>
              <p>
                - Order Cancellation: Orders may be cancelled within 24 hours of
                placement. Refunds for cancellations will be processed within
                5-7 business days of approval.
                <br /> - Partial Refunds: In cases where returned items do not
                fully meet our return conditions, we may issue a partial refund
                or offer store credit. We will inform you if this applies.
              </p>
            </div>
            <p>
              If you have any questions or require further assistance with our
              Exchange Policy, please do not hesitate to contact us    
              <span className="email-ex">
                support@oceansteeze.com
              </span> <br /> We are here to ensure your experience with
              Oceansteeze is nothing short of exceptional.
            </p>
                </div>
        </div>
        <div className="exchange-policy__container-footer">
            <Footer />
        </div>
      </div>
    )
}

export default ExchangePolicy