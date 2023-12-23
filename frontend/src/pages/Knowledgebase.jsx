import React, { useEffect, useState } from "react";
import axios from "axios";

<<<<<<< HEAD
import KnowledgebaseSidebar from "../components/knowledgebaseSidebar";
import KnowledgebaseFAQs from "../components/knowledgebaseFAQs";

export default function Knowledgebase() {

  return (
    <>
      <KnowledgebaseSidebar/>
      <KnowledgebaseFAQs
        faqsInput = {[
        ]}
      />
=======
const knowledgebaseURL = "http://localhost:3000/knowledgebase";

export default function Knowledgebase() {
  const [categories, setCategories] = useState([]);
  const [faqs, setFaqs] = useState([]);

  const getCategories = async () => {
    const { categories } = (
      await axios.get(`${knowledgebaseURL}/categories`, {
        withCredentials: true,
      })
    ).data;
    return categories;
  };

  const fetchFaqs = async (subcategory) => {
    const faqsData = (
      await axios.get(`${knowledgebaseURL}/category/${subcategory}`, {
        withCredentials: true,
      })
    ).data;
    setFaqs(faqsData);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const categos = await getCategories();
      setCategories(categos);
    };
    fetchCategories();
  }, []);

  return (
    <>
      <ul
        className="menu bg-base-200 w-56 rounded-box"
        style={{
          position: "fixed",
          width: "15%",
          height: "93%",
          top: "7%",
          left: 0,
        }}
      >
        {Object.entries(categories).map(([key, value], index) => (
          <li key={index}>
            <details open>
              <summary>{key}</summary>
              <ul>
                {value.map((subcategory, subIndex) => (
                  <li key={subIndex}>
                    <a onClick={() => fetchFaqs(subcategory)}>{subcategory}</a>
                  </li>
                ))}
              </ul>
            </details>
          </li>
        ))}
      </ul>
      <div
        className="border rounded-box"
        style={{ width: "85%", height: "100%", marginLeft: "15%" }}
      >
        <div
          className="border rounded-box"
          style={{
            width: "100%",
            height: "8%",
            display: "flex",
            marginBottom: "1%",
          }}
        >
          <div className="font-bold text-5xl" style={{ marginLeft: "5%" }}>
            FAQs
          </div>
          <div style={{ display: "flex", marginLeft: "10%", width: "30%" }}>
            <div className="label" style={{ width: "10%" }}>
              <span className="label-text">Search FAQs</span>
            </div>
            <input
              style={{ width: "90%" }}
              type="text"
              placeholder="Search Keyword"
              className="input input-bordered input-info"
            />
          </div>
        </div>
        <div style={{ maxHeight: "90%", overflowY: "auto" }}>
          {faqs.map((faq, index) => (
            <div
              className="collapse bg-base-200"
              style={{ width: "90%", left: "5%", marginBottom: "1%" }}
              key={index}
            >
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "1%",
                  }}
                >
                  <div className="font-bold text-2xl">Title: {faq.title}</div>
                  <div className="font-mono text-1xl">
                    {faq.mainIssue + "(" + faq.subIssue + ")"}
                  </div>
                </div>
                <div className="font-mono text-1xl">
                  <div>Question: {faq.question}</div>
                </div>
              </div>
              <div className="collapse-content text-1xl">
                <p>Answer: {faq.solution}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
>>>>>>> 59812724487e4f6886b7a13bc21c48867e65ff6c
    </>
  );
}
