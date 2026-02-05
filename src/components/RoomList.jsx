import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms } from '../redux/thunks/roomThunks';
import RoomDetails from './RoomDetails';
import { Container, Row, Col, Form, Spinner, Alert } from 'react-bootstrap';
import { FaFilter, FaSortAmountDown, FaSearch } from 'react-icons/fa';

const RoomList = () => {
  const dispatch = useDispatch();
  const { rooms, loading, error } = useSelector((state) => state.rooms);
  const [sortBy, setSortBy] = useState('price');
  const [filterType, setFilterType] = useState('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  // Filter and sort rooms
  const getFilteredSortedRooms = () => {
    let result = [...rooms];

    // Filter by type
    if (filterType !== 'all') {
      result = result.filter(room => room.type === filterType);
    }

    // Filter by price range
    if (minPrice) {
      result = result.filter(room => room.price >= parseInt(minPrice));
    }
    if (maxPrice) {
      result = result.filter(room => room.price <= parseInt(maxPrice));
    }

    // Sort
    switch (sortBy) {
      case 'price':
        return result.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return result.sort((a, b) => b.price - a.price);
      case 'capacity':
        return result.sort((a, b) => b.capacity - a.capacity);
      case 'type':
        return result.sort((a, b) => a.type.localeCompare(b.type));
      default:
        return result;
    }
  };

  const filteredRoomsList = getFilteredSortedRooms();
  const roomTypes = [...new Set(rooms.map(room => room.type))];

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-white">
        <Spinner animation="border" variant="dark" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger" className="text-center rounded-0 border-0">
          Error: {error}
        </Alert>
      </Container>
    );
  }

  return (
    <div className="bg-white min-vh-100 py-6" style={{ paddingTop: '100px' }}>
      <Container>
        <div className="text-center mb-5 animate-fade-in">
          <h2 className="display-5 mb-2" style={{ fontFamily: '"Playfair Display", serif' }}>Accommodations</h2>
          <p className="text-muted small text-uppercase letter-spacing-2">Curated selection of luxury suites</p>
        </div>

        {/* Filters and Sorting */}
        <div className="border-top border-bottom py-4 mb-5">
          <Row className="gy-4 align-items-end">
            <Col xs={12} lg={3}>
              <Form.Group>
                <Form.Label className="small text-uppercase fw-bold letter-spacing-1 text-muted">Sort By</Form.Label>
                <Form.Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="form-control-modern rounded-0 border-0 border-bottom"
                >
                  <option value="price">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="capacity">Capacity</option>
                  <option value="type">Room Type</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col xs={12} lg={3}>
              <Form.Group>
                <Form.Label className="small text-uppercase fw-bold letter-spacing-1 text-muted">Room Type</Form.Label>
                <Form.Select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="form-control-modern rounded-0 border-0 border-bottom"
                >
                  <option value="all">All Types</option>
                  {roomTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col xs={6} lg={3}>
              <Form.Group>
                <Form.Label className="small text-uppercase fw-bold letter-spacing-1 text-muted">Min Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="0"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="form-control-modern rounded-0 border-0 border-bottom"
                />
              </Form.Group>
            </Col>

            <Col xs={6} lg={3}>
              <Form.Group>
                <Form.Label className="small text-uppercase fw-bold letter-spacing-1 text-muted">Max Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="form-control-modern rounded-0 border-0 border-bottom"
                />
              </Form.Group>
            </Col>
          </Row>
        </div>

        {/* Room Grid */}
        <Row xs={1} md={2} lg={3} className="g-5">
          {filteredRoomsList.length > 0 ? (
            filteredRoomsList.map((room) => (
              <Col key={room.id} className="animate-fade-in">
                <RoomDetails room={room} />
              </Col>
            ))
          ) : (
            <Col xs={12}>
              <div className="text-center py-5">
                <h4 className="text-muted fw-light" style={{ fontFamily: '"Playfair Display", serif' }}>No rooms found</h4>
                <p className="text-muted small">Please adjust your search criteria</p>
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default RoomList;
