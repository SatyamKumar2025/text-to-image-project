import React, { useState, useContext } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { AppContext } from "../Context/AppContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const PaymentCard = () => {
  const { user } = useContext(AppContext);
  const [utr, setUtr] = useState("");
  const [screenshot, setScreenshot] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleScreenshot = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setScreenshot(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!utr || !screenshot) {
      toast.error("Please fill UTR and upload screenshot");
      return;
    }

    setLoading(true);

    const templateParams = {
      user_name: user?.name,
      user_email: user?.email,
      email: "satyamgabbar8@gmail.com",
      utr: utr,
      screenshot: screenshot,
    };

    emailjs
      .send(
        "service_b6tlesy",
        "template_2qkelsj",
        templateParams,
        "K9_eZGwZ1oI3Xcrak"
      )
      .then(() => {
        toast.success("Payment proof submitted successfully!");
        setUtr("");
        setScreenshot(null);
      })
      .catch((error) => {
        toast.error("Failed to submit payment. Try again.");
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <motion.div
      className="bg-blue-100 p-6 rounded-2xl w-full max-w-md mx-auto shadow-md"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Back Button */}
      <button
        onClick={() => navigate("/buy")}
        className="mb-4 text-blue-700 hover:underline"
      >
        ← Back to Credits
      </button>

      <div className="w-full flex justify-center mb-6">
        <img
          src={assets.scanner}
          alt="Scan to Pay"
          className="w-80 h-80 object-contain rounded shadow"
        />
      </div>

      {/* UPI ID */}
      <div className="w-full bg-white p-2 rounded border border-gray-300 mb-4">
        <label className="text-sm font-medium text-gray-600 block mb-1">
          Pay via UPI ID:
        </label>
        <div className="text-black font-semibold select-all">
          satyamraj305448@okicici
        </div>
      </div>

      <h2 className="text-xl font- me-3 mb-4">
        Upload Payment Proof [file size should be less than 50kb]
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Enter UPI Reference Number"
          value={utr}
          onChange={(e) => setUtr(e.target.value)}
          className="w-full p-2 rounded border border-gray-300"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleScreenshot}
          className="w-full"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          disabled={loading}
        >
          {loading ? "Sending..." : "Submit Payment Proof"}
        </button>
      </form>
    </motion.div>
  );
};

export default PaymentCard;
