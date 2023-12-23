import React, { useEffect, useState } from 'react';
import axios from 'axios';

const knowledgebaseURL = 'http://localhost:3000/knowledgebase';

export default function KnowledgebaseFAQs(faqsInput) {
  faqsInput = faqsInput.faqsInput
  sessionStorage.setItem("faqs", faqsInput);

  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    const fetchFaqs = async () => {
        setFaqs(faqsInput);
    };
    fetchFaqs();
  }, []);

  window.addEventListener('faqs', () => {
    console.log(JSON.parse(sessionStorage.getItem("faqs")));
    setFaqs(JSON.parse(sessionStorage.getItem("faqs")));
  })
  
  return (
    <>
    <button style={{margin: "20%"}} className="btn" onClick={()=>document.getElementById('my_modal_2').showModal()}>open modal</button>
    <dialog id="my_modal_2" className="modal">
      <div className="modal-box w-11/12 max-w-6xl">
        <div className="border rounded-box" style={{ height: '100%' }}>
          <div className="border rounded-box" style={{ width: '100%', height: '8%', display: 'flex', marginBottom: '1%' }}>
            <div className="font-bold text-5xl" style={{ marginLeft: "5%" }}>FAQs</div>
            <div style={{ display: 'flex', marginLeft: "10%", width:"30%" }}>
              <div className="label" style={{ width:"20%" }}>
                <span className="label-text">Search FAQs</span>
              </div>
              <input  style={{ width:"90%" }} type="text" placeholder="Search Keyword" className="input input-bordered input-info" />
            </div>
          </div>
          <div style={{ maxHeight: '90%', overflowY: 'auto' }}>
            {faqs.map((faq, index) => (
              <div className="collapse bg-base-200" style={{ width: '90%', left: '5%', marginBottom: '1%' }} key={index}>
                <input type="checkbox" />
                <div className="collapse-title text-xl font-medium">
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1%' }}>
                    <div className="font-bold text-2xl">Title: {faq.title}</div>
                    <div className="font-mono text-1xl">{faq.mainIssue + "(" + faq.subIssue + ")"}</div>
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
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  </>
  )
}