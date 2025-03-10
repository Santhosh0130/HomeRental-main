import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Container, Row, Col, Form, Button, Image, FormControl, Card, CardBody, InputGroup } from 'react-bootstrap';
import HomeContext from '../context/Context';
import AppCard from './AppCard';
import axios from 'axios';
import NoResults from '../assets/no_results.svg'

const SearchFilter = () => {
  const { API, data } = useContext(HomeContext);

  // const [city, setCity] = useState('');
  // const [district, setDistrict] = useState('');
  // const [houseType, setHouseType] = useState('Independent House');
  // const [furnished, setFurnished] = useState('unfurnished');
  // const [bhk, setBhk] = useState('1BHK');

  const [sliderValue, setSliderValue] = useState(15000); // Initial value for the slider
  const [filter, setFilter] = useState([]);
  const [showResults, setShowResults] = useState(false)

  const [filterProperties, setFilterProperties] = useState({
    rent: sliderValue,
    area: '',
    city: '',
    type: 'villa',
    parking: 'yes',
    bhk: 2,
  })

  useEffect(() => {
    setFilterProperties((prev) => ({ ...prev, rent: sliderValue }))
  }, [sliderValue])
  console.log(filterProperties)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilterProperties((prev) => ({ ...prev, [name]: value }));
  }

  const handleSliderChange = (e) => {
    setSliderValue(e.target.value); // Update the state with the slider value
  };

  const handleSearch = async () => {
    await axios.get(API + 'products/search', {params: filterProperties})
    .then((response) => {
      setFilter(response.data);
      setShowResults(response.data.length > 0);
    }).catch((err) => {
      setShowResults(false)
      console.log("Error ", err)
    })
    console.log("Hello")
    console.log(filterProperties)
  };

  return (
    <Container fluid>
      {/* <Row className="my-5">
        <Col>
          <h2>Search Filters</h2>
          <p>Use the filters below to find the right property for you</p>
        </Col>
      </Row> */}

      <Row>
        <Col sm={12} lg={5}>
          {/* Rent Range */}
          <Form>
            <Card className='shadow m-md-4'>
              <CardBody>
                <Row className="mb-3">
                  <Col md={12}>
                    <Form.Group>
                      <Form.Label>Rent Range</Form.Label>
                      <div>
                        <Form.Range
                          min={5000}
                          max={50000}
                          step={500}
                          value={sliderValue}
                          onChange={handleSliderChange}
                        />
                        <div className="d-flex justify-content-between">
                          <small>₹ 5000</small>
                          <small>₹ 50000</small>
                        </div>
                        <InputGroup>
                          <InputGroup.Text>₹</InputGroup.Text>
                          <Form.Control
                            type='text'
                            value={sliderValue}
                            onChange={handleSliderChange}
                          />
                          <InputGroup.Text>Rent per Month</InputGroup.Text>
                        </InputGroup>
                      </div>
                    </Form.Group>
                  </Col>
                </Row>

                {/* City and District Search */}
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="areaSearch">
                      <Form.Label>Area</Form.Label>
                      <FormControl
                        type="text"
                        placeholder="Enter area"
                        name="area"
                        value={filterProperties.area}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group controlId="citySearch">
                      <Form.Label>City</Form.Label>
                      <FormControl
                        type="text"
                        placeholder="Enter city"
                        name="city"
                        value={filterProperties.city}
                        // onChange={(e) => setDistrict(e.target.value)}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* House Type Selection */}
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="houseType">
                      <Form.Label>House Type</Form.Label>
                      {/* <DropdownButton
                      variant="outline-primary"
                      name="type"
                      title={filterProperties.type || 'Select House Type'}
                      // onSelect={(e) => setHouseType(e)}
                      onSelect={handleChange}
                    >
                      <Dropdown.Item eventKey="Villa">Villa</Dropdown.Item>
                      <Dropdown.Item eventKey="Apartment">Apartment</Dropdown.Item>
                      <Dropdown.Item eventKey="Independent House">Independent House</Dropdown.Item>
                    </DropdownButton> */}
                      <Form.Control
                        as='select'
                        name='type'
                        value={filterProperties.type}
                        onChange={handleChange}
                      >
                        <option value="villa">Villa</option>
                        <option value="apartment">Apartment</option>
                        <option value="independent">Independent House</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  
                </Row>

                {/* {/* Furnished Status */}
                <Row className="mb-3">
                <Col sm={6}>
                    <Form.Group>
                      <Form.Label>Parking</Form.Label>
                      <Form.Control
                        as='select'
                        name='parking'
                        value={filterProperties.parking}
                        onChange={handleChange}
                      >
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>

                  {/* <Col md={6}>
                    <Form.Group controlId="furnishedSelect">
                      <Form.Label>Furnished</Form.Label>
                      <Form.Check
                        type="radio"
                        label="Fully"
                        name="furnished"
                        value="full"
                        checked={filterProperties.furnished === 'full'}
                        // onChange={() => setFurnished('furnished')}
                        onChange={handleChange}
                      />
                      <Form.Check
                        type="radio"
                        label="Semi"
                        name="furnished"
                        value="semi"
                        checked={filterProperties.furnished === 'semi'}
                        // onChange={() => setFurnished('unfurnished')}
                        onChange={handleChange}
                      />
                      <Form.Check
                        type="radio"
                        label="Unfurnished"
                        name="furnished"
                        value="un"
                        checked={filterProperties.furnished === 'un'}
                        // onChange={() => setFurnished('unfurnished')}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col> */}

                  {/* BHK Selection */}
                  <Col sm={6}>
                    <Form.Group controlId="bhkSelect">
                      <Form.Label>BHK</Form.Label>
                      <Form.Control
                        as="select"
                        value={filterProperties.bhk}
                        name='bhk'
                        // onChange={(e) => setBhk(e.target.value)}
                        onChange={handleChange}
                      >
                        <option value="">Select BHK</option>
                        <option value={1}>1 BHK</option>
                        <option value={2}>2 BHK</option>
                        <option value={3}>3 BHK</option>
                        <option value={4}>4 BHK</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Search Button */}
                <Row className="p-0 d-flex mx-2">
                  <Col>
                    <Button variant="color1" onClick={handleSearch}>
                      Search
                    </Button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Form>
        </Col>

        <Col sm={12} lg={7}>
          <Row>
            <Col sm={12} className='my-4'>
              <div className='display-6 text-lg-start text-sm-center border-bottom pb-3'>Search Results,</div>
            </Col>
          </Row>

          <Row>
            {showResults ? filter.map((item, index) => (
              <Col sm={12} md={6} key={index}>
                <AppCard datavalue={item} />
              </Col>)) : (
              <div className='d-flex flex-column justify-content-center align-items-center'>
                <Image src={NoResults} className='w-50' />
                <h4 className='text-color5'>No Results Found.</h4>
              </div>
            )}
          </Row>
        </Col>
      </Row >
    </Container >
  );
};

export default SearchFilter;
