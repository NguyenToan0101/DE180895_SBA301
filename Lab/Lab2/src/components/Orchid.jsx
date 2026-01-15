import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import ListOfOrchids from "./ListOfOrchids";
import TestCount from "./TestCount";

function Orchid({ orchidList }) {
  const navigate = useNavigate();

  const handleShowDetail = (orchid) => {
    navigate(`/orchid/${orchid.id}`);
  };

  return (
    <div>
      <Container className="py-5">
        <h1 className="text-white mb-5 text-center">🌺 Our Beautiful Orchids Collection</h1>
        <ListOfOrchids orchidList={orchidList} onShowModal={handleShowDetail} />
      </Container>
      <div className="text-center my-4">
        <TestCount />
      </div>
    </div>
  );
}

export default Orchid;
