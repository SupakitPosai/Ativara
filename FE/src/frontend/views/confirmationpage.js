import React, { useContext, useEffect, useState } from "react";
import Context from "../../store/context";
import { Card, Image } from "react-bootstrap";
import NumberFormat from "react-number-format";

import Logtext from "../img/logo-text.png";
import Logo from "../img/logo.png";
export default function Confirmationpage(props) {
  const { state, actions } = useContext(Context);
  const [ci, setci] = useState("");
  const [co, setco] = useState("");
  useEffect(() => {
    if (state.confi.length === 0) {
      props.history.push("/");
    } else {
      var months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      var dd = new Date(state.confi[0].chi);
      var ll = new Date(state.confi[0].cho);
      setci(
        dd.getDate() + " " + months[dd.getMonth()] + " " + dd.getFullYear()
      );
      setco(
        ll.getDate() + " " + months[ll.getMonth()] + " " + ll.getFullYear()
      );
    }
  }, []);
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
      {state.confi.length !== 0 && (
        <div>
          <Card
            style={{
              padding: "1.5rem",
              marginBottom: "1rem",
            }}
          >
            <div
              style={{
                flexDirection: "row",
                width: "100%",
                marginBottom: "1rem",
              }}
            >
              <Image src={Logo} width="100px" style={{ marginRight: "1rem" }} />
              <Image src={Logtext} width="200px" />
            </div>

            <h3>Check in : {ci}</h3>
            <h3>Check out : {co}</h3>
            <h3>จำนวนคืนที่จอง : {state.confi[0].kk} คืน</h3>
            <h3>จำนวนคน : {state.confi[0].AD} คน</h3>

            <h3>
              ราคาต่อคืน :{" "}
              <NumberFormat
                value={state.confi[0].pk}
                displayType={"text"}
                thousandSeparator={true}
                prefix={""}
              />{" "}
              บาท/คืน
            </h3>
            <h3>
              ราคารวมทั้งสิ้น :{" "}
              <NumberFormat
                value={state.confi[0].pritotal}
                displayType={"text"}
                thousandSeparator={true}
                prefix={""}
              />{" "}
              บาท
            </h3>
          </Card>
        </div>
      )}
    </div>
  );
}
