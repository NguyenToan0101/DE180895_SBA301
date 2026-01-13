//FilterSort.jsx to filter and sort orchids

import { Form, Row, Col } from "react-bootstrap";

function FilterSort({ categories, onFilterChange, onSortChange }) {
  const handleFilterChange = (e) => {
    onFilterChange(e.target.value);
  };

  const handleSortChange = (e) => {
    onSortChange(e.target.value);
  };

  return (
    <Form className="mb-4 glass-container mx-3 rounded-4">
      <Row>
        <Col md={6}>
          <Form.Group controlId="filterCategory">
            <Form.Label className="text-white fw-bold">🔍 Filter by Category</Form.Label>
            <Form.Control 
              as="select" 
              onChange={handleFilterChange}
              className="glass-input"
            >
              <option value="">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group controlId="sortOrchids">
            <Form.Label className="text-white fw-bold">📊 Sort by</Form.Label>
            <Form.Control 
              as="select" 
              onChange={handleSortChange}
              className="glass-input"
            >
              <option value="">No Sorting</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
}

export default FilterSort;
