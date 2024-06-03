import React, {useState, useEffect} from "react";
import axios from "axios";
import {Card, ListGroup, Row, Col, Form, Button} from "react-bootstrap";
import styles from "../../styles/ProfilesList.module.css";

const ProfileList = () => {
  const [profiles, setProfiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get("/profiles/");
        setProfiles(response.data.results);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };
    fetchProfiles();
  }, []);

  useEffect(() => {
    const results = profiles.filter((profile) => profile.owner.toLowerCase().includes(searchTerm.toLowerCase()));
    setSearchResults(results);
  }, [searchTerm, profiles]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchUser = () => {
    const results = profiles.filter((profile) => profile.owner.toLowerCase().includes(searchTerm.toLowerCase()));
    setSearchResults(results);
  };

  return (
    <div>
      <Form className="d-flex justify-content-between mb-2">
        <Form.Control type="text" placeholder="Search by name..." value={searchTerm} onChange={handleSearchChange} className="mr-2" />
      </Form>
      <Row>
        {searchResults.map((profile) => (
          <Col key={profile.id} lg={3} md={4} sm={6} xs={12} style={{marginBottom: "1rem"}}>
            <Card style={{height: "100%"}}>
              <Card.Img variant="top" src={profile.image} />
              <Card.Body>
                <Card.Title>{profile.name}</Card.Title>
                <Card.Text>@{profile.owner}</Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>
                  <strong>Followers:</strong> {profile.followers_count}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Following:</strong> {profile.following_count}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Reviews:</strong> {profile.reviews_count}
                </ListGroup.Item>
              </ListGroup>
              <Card.Body>
                <Card.Link href={`/profiles/${profile.id}`}>View Profile</Card.Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProfileList;
