import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "What are your store's operating hours?",
    answer: "Our store is open from 8:00 AM to 8:00 PM, Monday to Sunday.",
  },
  {
    question: "Do you offer home delivery services?",
    answer:
      "Yes, we offer home delivery within a 10 km radius. Delivery charges may apply.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept cash, credit/debit cards, and mobile payments like eSewa and Khalti.",
  },
  {
    question: "Can I return or exchange products?",
    answer:
      "Yes, you can return or exchange products within 7 days of purchase with a valid receipt.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "You can contact us via email at grocerysupport@example.com or call us at 9876543210.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className=" p-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
          Frequently Asked Questions
        </h2>
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border-b py-4"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="text-lg font-semibold text-black">
                {faq.question}
              </h3>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-green-700" />
              ) : (
                <ChevronDown className="w-5 h-5 text-green-700" />
              )}
            </div>
            {openIndex === index && (
              <p className="mt-2 text-gray-600">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
