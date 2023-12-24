import { useEffect,useState } from "react";
import VerticalModal from "../components/verticalModal";
import Button from "react-bootstrap/Button";

const FAQ = () => {
  const [modalShow, setModalShow] = useState(false);
  useEffect(() => {
    console.log("Show Model: ", modalShow); 
  },[])
  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Launch vertically centered modal
      </Button>

      <VerticalModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};

export default FAQ;
