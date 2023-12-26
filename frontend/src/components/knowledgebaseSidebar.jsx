import React, { useEffect, useState } from 'react';
import axios from 'axios';
import KnowledgebaseFAQs from './knowledgebaseFAQs';

const knowledgebaseURL = 'http://localhost:3000/knowledgebase';

export default function KnowledgebaseSidebar() {

    const [faqs, setFaqs] = useState([]);

    const [categories, setCategories] = useState([]);

    const getCategories = async () => {
      const { categories } = (await axios.get(`${knowledgebaseURL}/categories`, { withCredentials: true })).data;
      return categories;
    };

    useEffect(() => {
    const fetchCategories = async () => {
        const categos = await getCategories();
        setCategories(categos);
    };
    fetchCategories();
    }, []);

    const fetchFaqs = async (subcategory) => {
        const faqsData = (await axios.get(`${knowledgebaseURL}/category/${subcategory}`, { withCredentials: true })).data;
        sessionStorage.setItem("faqs", JSON.stringify(faqsData));
        window.dispatchEvent(new Event("faqs"));
        setFaqs(faqsData);
        document.getElementById('my_modal_2').showModal();
    };
    
    return (
        <>
            <ul className="menu bg-base-200 w-56 rounded-box">
                <div className="text-xl text-opacity-100">
                    FAQs Categories
                </div>
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
            <KnowledgebaseFAQs faqsInput={faqs} />
        </>
    )
}