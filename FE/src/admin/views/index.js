import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import axios from "axios";
import NumberFormat from "react-number-format";
const cookies = new Cookies();
export default function IndexAdmin() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [roomtype, setroomtype] = useState([]);
  const login = () => {
    axios
      .get(
        `http://127.0.0.1:8082/api/Users?username=` +
          username +
          `&password=` +
          password
      )
      .then((res) => {
        var aa = res.data;
        if (aa.length !== 0) {
          cookies.set("ID_Login", aa[0].name_user, { path: "/" });
          window.location.reload();
        } else {
          alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
        }
      });
  };
  useEffect(() => {
    axios.get(`http://127.0.0.1:8082/api/RoomType`).then((res) => {
      setroomtype(res.data);
    });
  }, []);
  if (cookies.get("ID_Login") === undefined) {
    return (
      <div
        style={{
          height: "100vh",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Card style={{ width: "40%", alignItems: "center", padding: "1rem" }}>
          <h2>Login Admin</h2>
          <hr style={{ width: "90%" }} />
          <Form
            style={{ width: "100%" }}
            onSubmit={(e) => {
              e.preventDefault();
              login();
            }}
          >
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setusername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Card>
      </div>
    );
  } else {
    return (
      <div>
        <Container>
          <Row>
            <Col>
              <div
                style={{ width: "100%", display: "flex", marginTop: "1rem" }}
              >
                <h2 style={{ width: "50%" }}>{cookies.get("ID_Login")}</h2>
                <div style={{ width: "50%", textAlign: "right" }}>
                  <Button
                    onClick={() => {
                      cookies.remove("ID_Login", { path: "/" });
                      window.location.reload();
                    }}
                  >
                    Logout
                  </Button>
                </div>
              </div>
              <hr />
            </Col>
          </Row>
          {roomtype.length !== 0 && (
            <Row>
              {roomtype.map((rt) => (
                <Col xs={12} md={6}>
                  <Card style={{ padding: "1rem",marginBottom:'1rem' }}>
                    <h2>Room Type : {rt.name_room_type}</h2>
                    <h3>
                      ราคา :{" "}
                      <NumberFormat
                        value={rt.price_room_type}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={""}
                      />{" "}
                      บาท/คืน
                    </h3>
                    <h3>จำนวนห้องทั้งหมด : {rt.total} ห้อง</h3>
                    <h3>จำนวนห้องว่าง : {rt.availability} ห้อง</h3>
                    <h3>จำนวนห้องที่จอง : {rt.busy} ห้อง</h3>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </div>
    );
  }
}
