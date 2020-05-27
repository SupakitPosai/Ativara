import React, { useState,useRef, useEffect, useContext } from "react";
// import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";
import Icon from "@material-ui/core/Icon";
import Banner from "../img/banner.png";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Logo from "../img/logo.png";
import Grid from "@material-ui/core/Grid";
import Logtext from "../img/logo-text.png";
import G1 from "../img/g1.png";
import G2 from "../img/g2.png";
import G3 from "../img/g3.png";
import G4 from "../img/g4.png";
import Map from "../img/map.png";
import Foo from "../img/footlogo.png";
import So from "../img/socail.png";
import {
  Container,
  Row,
  Col,
  Modal,
  Card,
  Navbar,
  Nav,
  Image,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import NumberFormat from "react-number-format";
import Context from "../../store/context";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  btnnn1: {
    backgroundColor: "#48392e",
  },
}));
const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);
const useMountEffect = (fun) => useEffect(fun, []);
export default function IndexUser(props) {
  const classes = useStyles();
  const [startDate, setStartDate] = useState(new Date());
  const [startDate2, setStartDate2] = useState(new Date());
  const [show, setshow] = useState(false);
  const [roomtype, setroomtype] = useState([]);
  const [casss, setcasss] = useState([]);
  const [btndis, setbtndis] = useState({ display: "none" });
  const [Aa, setAa] = useState("");
  const [Dd, setDd] = useState("");
  const [Kk, setKk] = useState(0);
  const [pk, setpk] = useState(0);
  const [idroom, setidroom] = useState("");
  const { state, actions } = useContext(Context);
  const dateee = (date) => {
    setStartDate2(date);
    var sDate = new Date(startDate);
    var eDate = new Date(date);
    var daysDiff = Math.round((eDate - sDate) / 86400000);
    setKk(daysDiff);
  };
  useEffect(() => {
    axios.get(`http://127.0.0.1:8082/api/RoomType`).then((res) => {
      var ii = res.data;
      var aa = [];
      for (let index = 0; index < ii.length; index++) {
        aa.push({ cass: "caa" });
        if (index === ii.length - 1) {
          setcasss(aa);
        }
      }
      setroomtype(res.data);
    });
  }, []);
  const clickroom = (index1) => {
    var aa = [];
    for (let index = 0; index < casss.length; index++) {
      aa.push({ cass: "caa" });
      if (index === casss.length - 1) {
        aa[index1].cass = "caaactive";
        setcasss(aa);
        setbtndis({ display: "block" });
      }
    }
  };
  const Confirm = () => {
    axios.put(`http://127.0.0.1:8082/api/RoomType/` + idroom).then((res) => {
      var aa = [];
      aa.push({
        chi: startDate,
        cho: startDate2,
        kk: Kk,
        A: Aa,
        D: Dd,
        AD: Number(Aa) + Number(Dd),
        pk: pk,
        pritotal: Number(pk) * Number(Kk),
      });
      actions({
        type: "setState",
        payload: {
          ...state,
          confi: [...aa],
        },
      });

      // console.log({
      //   chi: startDate,
      //   cho: startDate2,
      //   kk: Kk,
      //   A: Aa,
      //   D: Dd,
      //   AD: Number(Aa) + Number(Dd),
      //   pk: pk,
      //   pritotal: Number(pk) * Number(Kk),
      // });
      setshow(false);

      props.history.push("/Confirmationpage");
    });
  };
  const myRef = useRef(null);

  // useMountEffect(() => scrollToRef(myRef));
  return (
    <div>
      <Modal show={show} centered onHide={() => setshow(false)}>
        <Modal.Header closeButton>
          <Modal.Title style={{ textTransform: "uppercase" }}>
            Choose room type
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {roomtype.length !== 0 && (
            <Row>
              {roomtype.map((rt, index) => (
                <>
                  {rt.availability !== 0 && (
                    <Col xs={12} md={6} style={{ marginBottom: "1rem" }}>
                      <a className="aa" href="##">
                        <Card
                          className={casss[index].cass}
                          onClick={() => {
                            setidroom(rt.id_room_type);
                            setpk(rt.price_room_type);
                            clickroom(index);
                          }}
                          style={{ padding: "1.5rem", textAlign: "center" }}
                        >
                          <h5>{rt.name_room_type}</h5>
                          <div>
                            <NumberFormat
                              value={rt.price_room_type}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={""}
                            />
                            <span> บาท / คืน</span>
                          </div>
                        </Card>
                      </a>
                    </Col>
                  )}
                </>
              ))}
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: "space-between" }}>
          <Button variant="contained" onClick={() => setshow(false)}>
            Close
          </Button>
          <Button
            variant="contained"
            className={classes.btnnn1}
            color="secondary"
            style={btndis}
            onClick={() => {
              Confirm();
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      <div
        style={{
          backgroundImage: `url(${Banner})`,

          width: "100%",
          height: "100vh",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <Box
          display="flex"
          alignItems="flex-end"
          justifyContent="center"
          style={{ height: "50%" }}
        >
          <h1
            className="textbannn"
            style={{ color: "#fff", textTransform: "uppercase", margin: "0" }}
          >
            exploring Inle Lake
          </h1>
        </Box>
        <Box
          display="flex"
          alignItems="end"
          justifyContent="center"
          style={{ height: "50%" }}
        >
          <p
            className="textbannn2"
            style={{ color: "#fff", textTransform: "uppercase", margin: "0" }}
          >
            In the unique watery world oF Myanmar
          </p>
        </Box>
        <Box style={{ width: "100%", marginTop: "-5vw" }}>
          <Container>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                var aa = [];
                for (let index = 0; index < casss.length; index++) {
                  aa.push({ cass: "caa" });
                  if (index === casss.length - 1) {
                    setcasss(aa);
                  }
                }
                setbtndis({ display: "none" });
                setshow(true);
              }}
            >
              <Row>
                <Col
                  xs={12}
                  md={10}
                  style={{
                    width: "100%",
                    backgroundColor: "#90725c",
                    margin: "0",
                  }}
                >
                  <Row style={{ padding: "1.3rem 1rem 1.7rem 1rem" }}>
                    <Col xs={12} md={3}>
                      <p style={{ marginBottom: "5px", color: "#fff" }}>
                        CHECK-IN
                      </p>
                      {/* <input
                      type="date"
                      id="birthday"
                      name="birthday"
                      className="form-control"
                      style={{ backgroundColor: "#ece3d9" }}
                     
                    ></input> */}
                      <DatePicker
                        className="form-control"
                        dateFormat="dd MMMM yyyy"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        required
                      />
                    </Col>
                    <Col xs={12} md={3}>
                      <p style={{ marginBottom: "5px", color: "#fff" }}>
                        CHECK-OUT
                      </p>
                      <DatePicker
                        className="form-control"
                        dateFormat="dd MMMM yyyy"
                        selected={startDate2}
                        onChange={(date) => {
                          dateee(date);
                        }}
                        required
                      />
                    </Col>
                    <Col xs={6} md={3}>
                      <p style={{ marginBottom: "5px", color: "#fff" }}>
                        ADULT
                      </p>
                      <select
                        id="cars"
                        className="form-control"
                        style={{ backgroundColor: "#ece3d9" }}
                        required
                        onChange={(e) => {
                          setAa(e.target.value);
                        }}
                      >
                        <option value="">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </Col>
                    <Col xs={6} md={3}>
                      <p style={{ marginBottom: "5px", color: "#fff" }}>
                        CHILDREN
                      </p>
                      <select
                        className="form-control"
                        style={{ backgroundColor: "#ece3d9" }}
                        onChange={(e) => {
                          setDd(e.target.value);
                        }}
                      >
                        <option value="">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </Col>
                  </Row>
                </Col>
                <Col xs={12} md={2} style={{ padding: "0" }}>
                  <button
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: "#323233",
                      color: "#fff",
                    }}
                    className="form-control btn1"
                    type="submit"
                  >
                    BOOK NOW
                  </button>
                </Col>
              </Row>
            </form>
            <Row style={{ margin: "1.5rem 0 1.5rem 0" }}>
              <Col>
                <center>
                  <p
                    style={{
                      fontWeight: "bold",
                      marginBottom: "0",
                      fontSize: "3rem",
                    }}
                  >
                    "
                  </p>
                  <p style={{ textTransform: "uppercase", marginBottom: "0" }}>
                    Nestled on four acres of beautifully landscaped gardens,
                  </p>
                  <p style={{ textTransform: "uppercase", marginBottom: "0" }}>
                    ATIVARA Hotel nyaung shwe is strategically located in the
                    heart of the city{" "}
                  </p>
                  <p style={{ textTransform: "uppercase", marginBottom: "0" }}>
                    and faces the majestic Royal Palace and TAung gyi Hill –
                    sights that are a pleasure to behold. As one of the best
                    hotels in nyaung shwe, Myanmar,
                  </p>
                  <p style={{ textTransform: "uppercase", marginBottom: "0" }}>
                    {" "}
                    At ATIVARA Hotel nyaung shwe, we enrich your tour of
                    Myanmar.
                  </p>
                  <p style={{ fontWeight: "bold", fontSize: "3rem" }}>"</p>
                </center>
              </Col>
            </Row>
            <Row style={{ marginBottom: "1.7rem" }}>
              <Col>
                <Image src={G1} width="100%" />
              </Col>
            </Row>
            <Row ref={myRef} style={{ marginBottom: "1.7rem" }}>
              <Col xs={12} md={4}>
                <Image src={G2} width="100%" />
              </Col>
              <Col xs={12} md={8}>
                <Row style={{ marginBottom: "1.7rem" }}>
                  <Col>
                    <div
                      style={{
                        backgroundColor: "#ebebeb",
                        padding: "2rem",
                      }}
                    >
                      <p
                        style={{
                          textAlign: "justify",
                          textTransform: "uppercase",
                          marginBottom: "0",
                        }}
                      >
                        Getting out onto the water is naturally the most popular
                        way to experience Inle Lake. Every morning a flotilla of
                        slender wooden canoes fitted with long-tailed outboard
                        motors surges forth, transporting visitors to various
                        natural, cultural, religious and historic sites.
                        Nyaungshwe, on the northern edge of the lake, is the
                        base for setting out on motorboat trips – every hotel
                        and guesthouse in town can help arrange one, or just
                        wait for a boat captain to approach you in the street.
                      </p>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={6}>
                    <Image src={G3} width="100%" />
                  </Col>
                  <Col xs={12} md={6}>
                    <Image src={G4} width="100%" />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col>
                <h1
                  style={{
                    textTransform: "uppercase",
                    textAlign: "center",
                    color: "#90715c",
                    marginBottom: "2rem",
                  }}
                >
                  access the hotel
                </h1>
              </Col>
            </Row>
            <Row>
              <Col xs={6} md={3}>
                <p style={{ fontWeight: "bold" }}>ADDRESS</p>
                <p>
                  (142), NO(28), YONE GYI Road, AGRICULTURE (SOUTH VILLAGE),
                  NYAUNG SHWE TOWNSHIP, SHAN, MYANMAR
                </p>
              </Col>
              <Col xs={6} md={3}>
                <p style={{ fontWeight: "bold" }}>CONTACT</p>
                <p style={{ marginBottom: "0" }}>T: +95 9 777790055 </p>
                <p style={{ marginBottom: "0" }}>+95 9 777790066 </p>
                <p style={{ marginBottom: "0" }}>E: service@ATIVARA. com</p>
              </Col>
              <Col xs={6} md={3}>
                <p style={{ fontWeight: "bold" }}>29 KM</p>
                <p>TO heho AIRPORT</p>
              </Col>
              <Col xs={6} md={3}>
                <p style={{ fontWeight: "bold" }}>8.8 KM</p>
                <p>TO inle lake</p>
              </Col>
            </Row>
          </Container>

          <div>
            <Image src={Map} width="100%" />
          </div>
          <div style={{ backgroundColor: "#2e2e2f" }}>
            <Container>
              <Row style={{ padding: "2rem" }}>
                <Col
                  style={{ alignSelf: "flex-end", marginBottom: "1rem" }}
                  xs={12}
                  md={4}
                >
                  <Image src={Foo} width="200px" />
                  <p
                    style={{
                      marginBottom: "0",
                      color: "#fff",
                      textTransform: "uppercase",
                    }}
                  >
                    © 2017 DEGITO BY MIRATARA CO., LTD.{" "}
                  </p>
                  <p
                    style={{
                      marginBottom: "0",
                      color: "#fff",
                      textTransform: "uppercase",
                    }}
                  >
                    All rights reserved.
                  </p>
                  <p
                    style={{
                      marginBottom: "0",
                      color: "#fff",
                      textTransform: "uppercase",
                    }}
                  >
                    Website Terms of Use | Privacy POLICY
                  </p>
                </Col>
                <Col
                  style={{ alignSelf: "flex-end", marginBottom: "1rem" }}
                  xs={12}
                  md={4}
                >
                  <p
                    style={{
                      marginBottom: "0",
                      color: "#fff",
                      textTransform: "uppercase",
                    }}
                  >
                    STAY CONNECT WITH ATIVARA
                  </p>
                  <Image src={So} width="200px" />
                </Col>
                <Col
                  style={{ alignSelf: "flex-end", marginBottom: "1rem" }}
                  xs={12}
                  md={4}
                >
                  <p
                    style={{
                      marginBottom: "0",
                      color: "#fff",
                      textTransform: "uppercase",
                    }}
                  >
                    SUBSCRIBE NEWSLETTER
                  </p>
                  <InputGroup className="mb-3">
                    <FormControl
                      style={{ backgroundColor: "#636363", color: "#ffff" }}
                      placeholder="YOUR EMAIL ADDRESS"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                      <Button style={{ backgroundColor: "#fff" }}>
                        Button
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                </Col>
              </Row>
            </Container>
          </div>
        </Box>
      </div>
      <div style={{ width: "100%", position: "absolute", top: "0" }}>
        <Container>
          <Navbar
            style={{
              backgroundColor: "#fff",
              color: "#000",
              boxShadow: "unset",
              padding: "0",
            }}
            bg="light"
            expand="lg"
            className="navvv1"
          >
            <Navbar.Brand
              className="bandimg"
              style={{ position: "absolute", alignSelf: "start", padding: "0" }}
              href="#home"
            >
              <Image style={{ width: "100px", height: "100px" }} src={Logo} />
            </Navbar.Brand>
            <Navbar.Brand
              className="bandimg2"
              style={{ paddingLeft: "120px" }}
              href="#home"
            >
              <Image style={{ width: "200px" }} src={Logtext} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Link
                  className="nav-link"
                  onClick={() => scrollToRef(myRef)}
                  to="/"
                >
                  DISCOVER1
                </Link>

                <Nav.Link href="/upload">SLEEP</Nav.Link>
                <Nav.Link href="/Chatbot">RELAX</Nav.Link>
                <Nav.Link href="#RATES">{"RATES & OFFERS"}</Nav.Link>
                <Nav.Link href="#ACCESS">ACCESS</Nav.Link>
                <Nav.Link href="#CONTACT">CONTACT</Nav.Link>
                <Nav.Link href="#EN">EN</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Container>
      </div>
    </div>
  );
}
