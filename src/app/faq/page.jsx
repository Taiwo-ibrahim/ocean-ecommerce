import React from "react";
import "./page.css";
import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/Footer/Footer";


function FAQ() {
    return (
      <div className="faq__container">
        <div className="faq__container-navbar">
          <Navbar />
        </div>
        <div className="faq__container-content">
          <h1>Frequently Asked Questions (FAQs)</h1>
          <div className="faq__container-content_body">
            <div className="faq__container-content_body-section1">
              <h4>1. What currency do you use?</h4>
              <p>
                All prices listed in our web store and for shipping/handling
                charges are in U.S. Dollars.
              </p>
            </div>
            <div className="faq__container-content_body-section1">
              <h4>2. Where do you ship?</h4>
              <p>We ship worldwide, excluding a small number of countries .</p>
            </div>
            <div className="faq__container-content_body-section1">
              <h4>3. What shipping company do you use?</h4>
              <p>
                Domestic Nigerian Orders: We collaborate with trusted local
                delivery partners and have an internal logistics team to handle
                shipments within Nigeria.
                <br /> International Orders: We use GIG, DHL and UPS for
                international shipments.
              </p>
            </div>
            <div className="faq__container-content_body-section1">
              <h4>4. What does it cost to ship my order?</h4>
              <p>
                Shipping charges vary based on your delivery location and the
                weight of your package. The exact delivery charge will be
                confirmed at Checkout.
                <br /> Please Note: <br /> Both domestic and international
                orders may experience delays due to factors beyond our control,
                such as customs delays, adverse weather conditions, or high
                demand.
                <br /> Our Logistics Team will keep you informed if there are
                any changes to your order`&apos;`s status.
              </p>
            </div>
            <div className="faq__container-content_body-section1">
              <h4>5. What forms of payment do you accept?</h4>
              <p>
                We accept the following payment methods: Visa, Mastercard,
                American Express, Payments via Flutter wave.
              </p>
            </div>
            <div className="faq__container-content_body-section1">
              <h4>6. What is your general order processing time?</h4>
              <p>
                Orders placed Monday to Friday are processed within 1-2 business
                days.
              </p>
            </div>
            <div className="faq__container-content_body-section1">
              <h4>7. What happens after I place my order?</h4>
              <p>
                Order Confirmation: Once you place an order, you`&apos;`ll
                receive a confirmation email immediately.
                <br /> Shipping Confirmation: When your order is ready to ship,
                you will receive a second email containing shipping details and
                a tracking number.
                <br /> Important Note: Please retain the order confirmation
                email as it will be required for returns. <br />
                For any issues with delivery, please contact us at
                <span className="email-span">
                  {" "}
                  customerservice@oceansteeze.com
                </span>
              </p>
            </div>
            <div className="faq__container-content_body-section1">
              <h4>8. What type of packaging does my order come in?</h4>
              <p>
                We strive to use the original packaging provided by brands
                whenever possible.
                <br /> Orders are generally shipped in standard boxes or
                protective bags/boxes.
                <br /> Display items may not always include original packaging,
                but we ensure that all items are carefully packed to avoid
                damage during shipping.
              </p>
            </div>
            <div className="faq__container-content_body-section1">
              <h4>9. What is the return and/or refund process?</h4>
              <p>
                Returns: Items must be returned in new, unused condition within
                14 days of the original shipment. Please include a copy of the
                order confirmation email.
                <br /> Refund Process: Shipping and handling fees from the
                original purchase are not eligible for refunds. Customers are
                responsible for return shipping charges. Refunds will be issued
                to the original form of payment used for the purchase. <br />
                Important Notes: Sale items are not eligible for refunds or
                store credits. Returned items must be in perfect condition with
                all protective materials, designer tags, accessories, and
                authenticity cards (if applicable).
                <br /> We reserve the right to reject returns for products that
                show signs of wear or have been altered from their original
                condition. In such cases, we may reduce the amount of any refund
                or exchange.
              </p>
            </div>
            <div className="faq__container-content_body-section1">
              <h4>10. My order or refund is delayed. What’s going on?</h4>
              <p>
                While we strive to prevent delays, there may be occasional
                delays due to several factors, such as:
                <br /> Shipping Address Issues: If your shipping address differs
                from your billing address, we may verify the order for security
                reasons to protect you.
                <br />
                Backordered Items: Some products may be on backorder, requiring
                additional time for shipment.
                <br /> Incomplete Information: International orders placed with
                incomplete shipping and/or billing details may experience
                delays.
                <br /> Our team will notify you in case of any significant
                delays, and we appreciate your patience during such instances.
              </p>
            </div>
            <div className="faq__container-content_body-section1">
              <h4>Additional Information</h4>
              <p>
                Customer Support: For any questions or issues, don`&apos;`t
                hesitate to reach out to us at{" "}
                <span className="email-span">
                  customerservice@oceansteeze.com
                </span>
                <br /> Order Tracking: Always check your shipping confirmation
                email for tracking updates and estimated delivery times.
                <br /> We hope this FAQ section answers your questions. If you
                need more help, our support team is just an email away!
              </p>
            </div>
          </div>
        </div>
        <div className="faq__container-footer">
          <Footer />
        </div>
      </div>
    )
}

export default FAQ;