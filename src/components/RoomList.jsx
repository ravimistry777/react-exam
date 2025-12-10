import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms } from '../redux/thunks/roomThunks';
import RoomDetails from './RoomDetails';

const RoomList = () => {
  const dispatch = useDispatch();
  const { rooms, loading, error, filteredRooms } = useSelector((state) => state.rooms);
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
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Available Rooms</h2>
      
      {/* Filters and Sorting */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-3">
              <label className="form-label">Sort By</label>
              <select 
                className="form-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="price">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="capacity">Capacity</option>
                <option value="type">Room Type</option>
              </select>
            </div>
            
            <div className="col-md-3">
              <label className="form-label">Filter by Type</label>
              <select 
                className="form-select"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Types</option>
                {roomTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div className="col-md-3">
              <label className="form-label">Min Price</label>
              <input
                type="number"
                className="form-control"
                placeholder="₹ Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </div>
            
            <div className="col-md-3">
              <label className="form-label">Max Price</label>
              <input
                type="number"
                className="form-control"
                placeholder="₹ Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Room */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {filteredRoomsList.length > 0 ? (
          filteredRoomsList.map(room => (
            <div key={room.id} className="col">
              <RoomDetails room={room} />
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="alert alert-info">
              No rooms available matching your criteria.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomList;