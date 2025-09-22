import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Link } from "react-router-dom";
import Stripe from "stripe";
import PaymentInfoRequest from "../../models/PaymentInfoRequest";

export const PaymentPage = () => {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const [httpError, setHttpError] = useState<string | null>(null);
  const [submitDisabled, setSubmitDisable] = useState(false);
  const [fees, setFees] = useState(0);
  const [loadingFees, setLoadingFees] = useState(true);

  useEffect(() => {
    const fetchFees = async () => {
      if (isAuthenticated && user?.email) {
        const accessToken = await getAccessTokenSilently();
        const url = `http://localhost:8080/api/payment/secure/user`;

        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };

        const paymentResponse = await fetch(url, requestOptions);

        if (paymentResponse.ok) {
          const paymentResponseJson = await paymentResponse.json();
          setFees(paymentResponseJson.amount);
          setLoadingFees(false);
        } else if (paymentResponse.status === 404) {
          setFees(0);
          setLoadingFees(false);
        } else {
          throw new Error("Something went wrong!");
        }
      }
    };
    fetchFees().catch((error: any) => {
      setLoadingFees(false);
      setHttpError(error.message);
    });
  }, [isAuthenticated, user, getAccessTokenSilently]);

  const elements = useElements();
  const stripe = useStripe();

  async function checkout() {
    if (!stripe || !elements || !elements.getElement(CardElement)) {
      return;
    }

    setSubmitDisable(true);

    try {
      const accessToken = await getAccessTokenSilently();

      let paymentInfo = new PaymentInfoRequest(
        Math.round(fees * 100), // Stripe yêu cầu amount theo cents
        "USD",
        user?.email
      );

      const url = `http://localhost:8080/api/payment/secure/payment-intent`;
      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentInfo),
      };

      const stripeResponse = await fetch(url, requestOptions);

      if (!stripeResponse.ok) {
        setHttpError("Failed to create payment intent");
        setSubmitDisable(false);
        return;
      }

      const stripeResponseJson = await stripeResponse.json();

      // 👇 confirm payment với stripe
      const result = await stripe.confirmCardPayment(
        stripeResponseJson.client_secret,
        {
          payment_method: {
            card: elements.getElement(CardElement)!,
            billing_details: {
              email: user?.email || "unknown@example.com",
            },
          },
        }
      );

      if (result.error) {
        setSubmitDisable(false);
        alert("Payment failed: " + result.error.message);
      } else if (result.paymentIntent?.status === "succeeded") {
        // gọi API backend để hoàn tất
        const completeUrl = `http://localhost:8080/api/payment/secure/payment-complete`;
        const completeOptions = {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };
        const completeResponse = await fetch(completeUrl, completeOptions);

        if (!completeResponse.ok) {
          setHttpError("Payment completion failed");
          setSubmitDisable(false);
          return;
        }

        setFees(0);
        setSubmitDisable(false);
      }
    } catch (error: any) {
      setHttpError(error.message);
      setSubmitDisable(false);
    }
  }

  if (loadingFees) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  return (
    <div className="container">
      {fees > 0 && (
        <div className="card mt-3">
          <h5 className="card-header">
            Fees pending: <span className="text-danger">${fees}</span>
          </h5>
          <div className="card-body">
            <h5 className="card-title mb-3">Credit Card</h5>
            <CardElement id="card-element" />
            <button
              disabled={submitDisabled}
              type="button"
              className="btn btn-md main-color btn-outline-light mt-3"
              onClick={checkout}
            >
              Pay fees
            </button>
          </div>
        </div>
      )}

      {fees === 0 && (
        <div className="mt-3">
          <h5>You have no fees!</h5>
          <Link
            type="button"
            className="btn main-color btn-outline-light"
            to="search"
          >
            Explore top books
          </Link>
        </div>
      )}
      {submitDisabled && <SpinnerLoading />}
    </div>
  );
};
