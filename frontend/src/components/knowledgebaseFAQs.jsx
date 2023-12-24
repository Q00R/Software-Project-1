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
    setFaqs(JSON.parse(sessionStorage.getItem("faqs")));
  })

  const search = async () => {
    const keyword = document.getElementById('keyword').value;
    const filteredFaqs = await axios.get(`${knowledgebaseURL}/search/${keyword}`, { withCredentials: true });
    setFaqs(filteredFaqs.data);
  }
  (faqs.length == 0 ? console.log("FAQs Found:", faqs) : console.log("No FAQs found", faqs))
  return (
    <>
    <dialog id="my_modal_2" className="modal">
      <div className="modal-box w-11/12 max-w-7xl">
        <div className="border rounded-box" style={{ height: '100%' }}>
          <div className="border rounded-box" style={{ width: '100%', height: '8%', display: 'flex', marginBottom: '1%' }}>
            <div className="font-bold text-5xl" style={{ marginLeft: "5%", margin: "1%" }}>FAQs</div>
            <div style={{ display:"flex", width:"100%", marginLeft: "20%", margin: "auto" }}>
              <input id='keyword' type="text" placeholder="Search Keyword" className="input input-bordered input-info" />
              <button className="btn btn-info" onClick={search}>Search</button>
            </div>
          </div>
          
          <div style={{ maxHeight: '90%', overflowY: 'auto' }}>
            {(faqs.length != 0 ?
              faqs.map((faq, index) => (
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
              ))
            :
              <div style={{ padding:"10%", width: '100%', textAlign:'center' }}>
                  <div className="font-bold text-2xl" style={{height: "10%"}}>No FAQs found</div>
              </div>
            )}
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