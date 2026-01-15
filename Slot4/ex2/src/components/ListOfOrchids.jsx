import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import FilterSort from "./FilterSort";

function ListOfOrchids({ orchidList, onShowModal }) {
  const [searchParams] = useSearchParams();
  const searchText = searchParams.get("q") || "";

  const [filterCategory, setFilterCategory] = useState("");
  const [sortType, setSortType] = useState("");

  const getProcessedList = () => {
    let processed = [...orchidList];

    if (searchText) {
      processed = processed.filter((orchid) =>
        orchid.orchidName.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (filterCategory) {
      processed = processed.filter(
        (orchid) => orchid.category === filterCategory
      );
    }

    if (sortType) {
      processed.sort((a, b) => {
        switch (sortType) {
          case "name-asc":
            return a.orchidName.localeCompare(b.orchidName);
          case "name-desc":
            return b.orchidName.localeCompare(a.orchidName);
          case "price-asc":
            return (a.price || 0) - (b.price || 0);
          case "price-desc":
            return (b.price || 0) - (a.price || 0);
          default:
            return 0;
        }
      });
    }
    return processed;
  };

  const categories = [...new Set(orchidList.map((orchid) => orchid.category))];
  const displayedOrchids = getProcessedList();

  return (
    <>
      <FilterSort
        categories={categories}
        onFilterChange={setFilterCategory}
        onSortChange={setSortType}
      />

      <Row>
        {/* KIỂM TRA: Nếu có dữ liệu thì map, nếu không thì hiện thông báo */}
        {displayedOrchids.length > 0 ? (
          displayedOrchids.map((orchid) => (
            <Col md={3} key={orchid.id} className="mb-4 d-flex">
              <Card className="glass-card h-100 w-100 position-relative border-0">
                <Card.Img
                  variant="top"
                  src={orchid.image}
                  style={{ height: "250px", objectFit: "cover", borderRadius: "15px 15px 0 0" }}
                />
                <Card.Body>
                  <Card.Title className="text-black">{orchid.orchidName}</Card.Title>
                  <span className="text-warning fw-bold fs-5">${orchid.price}</span>
                  <div className="d-grid mt-3">
                    <Button
                      className="glass-btn"
                      onClick={() => onShowModal(orchid)}
                    >
                      Detail
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          /* THÔNG BÁO KHI KHÔNG CÓ KẾT QUẢ */
          <Col xs={12} className="text-center mt-5">
            <h5 className="text-white">
              Không tìm thấy kết quả nào phù hợp 😞
            </h5>
            <p className="text-white-50">Hãy thử thay đổi từ khóa tìm kiếm hoặc bộ lọc của bạn.</p>
          </Col>
        )}
      </Row>
    </>
  );
}

export default ListOfOrchids;
