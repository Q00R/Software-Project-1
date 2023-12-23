import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
    </>
  );
}
