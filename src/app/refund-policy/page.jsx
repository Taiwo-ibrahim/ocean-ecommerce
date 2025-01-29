import React from "react";
import "./page.css";
import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/Footer/Footer";

function RefundPolicy() {
    return (
      <div className="refund-policy__container">
        <div className="refund-policy__container-navbar">
          <Navbar />
        </div>
        <div className="refund-policy__container-content">
          <h1>Refund Policy</h1>
          <div className="refund-policy__container-content_body">
            <p>
              At Oceansteeze, we are committed to providing you with an
              exceptional shopping experience. Our Refund Policy is designed
              with clarity and care, ensuring that your satisfaction remains our
              top priority. Please review the following details regarding our
              refund process.
            </p>
            <div className="refund-policy__container-content_body-section1">
              <h4>1. Eligibility for Refund</h4>
              <p>
                - Return Approval: Refunds are only issued for items that have
                been returned in compliance with our Return Policy and meet the
                necessary standards upon inspection.
                <br />- ⁠Original Payment Method: Refunds will be processed to
                the original payment method used at the time of purchase. If the
                returned item does not meet our conditions, it will be sent back
                to you.
              </p>
            </div>
            <div className="refund-policy__container-content_body-section1">
              <h4>2. Refund Processing</h4>
              <p>
                - Inspection Process: Once your return is received, our Quality
                Control team will conduct a meticulous inspection to confirm the
                item adheres to our return standards. Only items that meet these
                criteria will proceed to refund processing.
                <br /> - Refund Timeline: Refunds are typically processed within
                5-7 business days following approval from our Quality Control
                team. Please allow an additional 7-10 business days for the
                funds to reflect in your account.
                <br /> - Refund Confirmation: You will receive a confirmation
                email once your refund has been successfully processed.
              </p>
            </div>
            <div className="refund-policy__container-content_body-section1">
              <h4>3. Non-Refundable Items </h4>
              <p>
                - Shipping, Duties, and Taxes: Please note that shipping fees,
                customs duties, and any local taxes paid at the time of purchase
                are non-refundable.
                <br /> - Non-Returnable Items: Gift cards, Final Sale items, and
                personalized merchandise are excluded from our refund policy.
              </p>
            </div>
            <div className="refund-policy__container-content_body-section1">
              <h4>4. Refunds for Faulty or Incorrect Items</h4>
              <p>
                - Notification Requirement: If you receive an item that is
                faulty or not as described, please notify us within 48 hours of
                delivery at customerservice@oceansteeze.com, providing detailed
                information and photo of the issue.
                <br /> - Refund Coverage: For confirmed faulty or incorrect
                items, we will issue a full refund, including the original
                shipping charges.
              </p>
            </div>
            <div className="refund-policy__container-content_body-section1">
              <h4>5. Cancellations and Refunds</h4>
              <p>
                - Order Cancellation: Orders may be cancelled within 24 hours of
                placement. Refunds for cancellations will be processed within
                5-7 business days of approval.<br /> - Partial Refunds: In cases where
                returned items do not fully meet our return conditions, we may
                issue a partial refund or offer store credit. We will inform you
                if this applies.
              </p>
            </div>
            <p>
              If you have any questions or require assistance regarding our
              Refund Policy, please contact us at
              customerservice@oceansteeze.com. Our dedicated team is here to
              provide you with exceptional service and support.
              <br />
              We value your trust in Oceansteeze and are committed to ensuring
              your experience with us exceeds expectations.
            </p>
          </div>
        </div>
        <div className="refund-policy__container-footer">
          <Footer />
        </div>
      </div>
    )
}

export default RefundPolicy;