"use client";

import { db } from "@/firebase";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { useSubscriptionStore } from "@/store/store";
import ManageAccountButton from "./ManageAccountButton";

type Props = {};

const CheckoutButton = (props: Props) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const subscription = useSubscriptionStore((state) => state.subscription);

  const isLoadingSubscription = subscription === undefined;

  const isSubscribed =
    subscription?.status === "active" && subscription?.role === "pro";

  const createCheckoutSession = async () => {
    if (!session) return;

    //push a document into firestore database
    setLoading(true);

    const docRef = await addDoc(
      collection(db, "customers", session.user.id, "checkout_sessions"),
      {
        price: "price_1OPkZKLgPTRNuSZTXwvvWXEL",
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      }
    );

    //stripe extension on firebase will create a checkout session

    return onSnapshot(docRef, async (snap) => {
      const data = snap.data();
      const url = data?.url;
      const error = data?.error;

      if (error) {
        //show an error to your customer and inspect your cloud function logs in the firebase console
        alert(`An error occured: ${error.message}`);
        setLoading(false);
      }

      if (url) {
        //redirect to stripe checkout
        window.location.assign(url);
        setLoading(false);
      }
    });
    //redirect user to checkout session
  };
  return (
    <div className="flex flex-col space-y-2">
      {/* If subscribed show me the user is subscribed */}
      {isSubscribed && (
        <>
          <hr className="mt-5" />
          <p className="pt-5 text-center text-xs text-indigo-600">
            You are subscribed to PRO
          </p>
        </>
      )}

      <div
        className="mt-8 block rounded-md bg-indigo-600 px-3.5 py-2 text-center text-sm font-semibold 
  leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline 
  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 
  cursor-pointer disabled:opacity-80 disabled:bg-indigo-600/50 disabled:text-white disabled:cursor-default"
      >
        {isSubscribed ? (
          <ManageAccountButton />
        ) : isLoadingSubscription || loading ? (
          <LoadingSpinner />
        ) : (
          <button onClick={() => createCheckoutSession()}>Sign Up</button>
        )}
      </div>
    </div>
  );
};

export default CheckoutButton;
