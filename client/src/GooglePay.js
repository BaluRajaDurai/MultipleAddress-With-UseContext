import { useState} from "react";
import GooglePayButton from "@google-pay/button-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GooglePay = () => {

    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState({});

  return (
    <div class="container-fluid mt-5">
      <ToastContainer />
      <GooglePayButton
        environment="TEST"
        paymentRequest={{
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: [
            {
              type: "CARD",
              parameters: {
                allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                allowedCardNetworks: ["MASTERCARD", "VISA"],
              },
              tokenizationSpecification: {
                type: "PAYMENT_GATEWAY",
                parameters: {
                  gateway: "example",
                  gatewayMerchantId: "exampleGatewayMerchantId",
                },
              },
            },
          ],
          merchantInfo: {
            merchantId: "12345678901234567890110100",
            merchantName: "Demo Merchant",
          },
          transactionInfo: {
            totalPriceStatus: "FINAL",
            totalPriceLabel: "Total",
            totalPrice: "10",
            currencyCode: "INR",
            countryCode: "IN",
          },
          shippingAddressRequired: true,
          callbackIntents: ["SHIPPING_ADDRESS", "PAYMENT_AUTHORIZATION"],
        }}
        onLoadPaymentData={(paymentRequest) => {
          console.log("Success", paymentRequest);
          setSuccess(paymentRequest);
          setShow(true);
          toast.success("Payment Successfull", { autoClose: 2500 });
        }}
        onPaymentAuthorized={(paymentData) => {
          console.log("Payment Authorised Success", paymentData);
          return { transactionState: "SUCCESS" };
        }}
        onPaymentDataChanged={(paymentData) => {
          console.log("On Payment Data Changed", paymentData);
          return {};
        }}
        existingPaymentMethodRequired="false"
        buttonColor="white"
        buttonType="buy"
      />

      <>
        {show ? (
          <>
            <div class="card mt-5" style={{ width: "950px" }}>
              <div class="card-body">
                <h5 class="card-title">Payment Details</h5>
                <p class="card-text">
                  {
                    /* {success} */

                    console.log()
                  }

                  <div class="mb-1 row">
                    <label for="staticEmail" class="col-sm-2 col-form-label">
                      Payment Type
                    </label>
                    <div class="col-sm-10">
                      <input
                        type="text"
                        readonly
                        class="form-control-plaintext"
                        value={success.paymentMethodData.tokenizationData.type}
                      />
                    </div>
                  </div>

                  <div class="mb-1 row">
                    <label for="staticEmail" class="col-sm-2 col-form-label">
                      Card Details 
                    </label>
                    <div class="col-sm-10">
                      <input
                        type="text"
                        readonly
                        class="form-control-plaintext"
                        value={success.paymentMethodData.description}
                      />
                    </div>
                  </div>

                  <div class="mb-1 row">
                    <label for="staticEmail" class="col-sm-2 col-form-label">
                      Name
                    </label>
                    <div class="col-sm-10">
                      <input
                        type="text"
                        readonly
                        class="form-control-plaintext"
                        value={success.shippingAddress.name}
                      />
                    </div>
                  </div>

                  <div class="mb-1 row">
                    <label for="staticEmail" class="col-sm-2 col-form-label">
                      Address 1
                    </label>
                    <div class="col-sm-10">
                      <input
                        type="text"
                        readonly
                        class="form-control-plaintext"
                        value={success.shippingAddress.address1}
                      />
                    </div>
                  </div>

                  <div class="mb-1 row">
                    <label for="staticEmail" class="col-sm-2 col-form-label">
                      Address 2
                    </label>
                    <div class="col-sm-10">
                      <input
                        type="text"
                        readonly
                        class="form-control-plaintext"
                        value={success.shippingAddress.address2}
                      />
                    </div>
                  </div>

                  <div class="mb-1 row">
                    <label for="staticEmail" class="col-sm-2 col-form-label">
                      City
                    </label>
                    <div class="col-sm-10">
                      <input
                        type="text"
                        readonly
                        class="form-control-plaintext"
                        value={success.shippingAddress.locality}
                      />
                    </div>
                  </div>
                  <div class="mb-1 row">
                    <label for="staticEmail" class="col-sm-2 col-form-label">
                      State
                    </label>
                    <div class="col-sm-10">
                      <input
                        type="text"
                        readonly
                        class="form-control-plaintext"
                        value={success.shippingAddress.administrativeArea}
                      />
                    </div>
                  </div>
                  <div class="mb-1 row">
                    <label for="staticEmail" class="col-sm-2 col-form-label">
                      Postal Code
                    </label>
                    <div class="col-sm-10">
                      <input
                        type="text"
                        readonly
                        class="form-control-plaintext"
                        value={success.shippingAddress.postalCode}
                      />
                    </div>
                  </div>

                </p>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </>
    </div>
  );
};

export default GooglePay;
