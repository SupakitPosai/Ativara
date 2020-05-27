import React, { useState } from "react";
import Logo from "../img/logo.png";
import { Image } from "react-bootstrap";
import axios from "axios";
export default function Upload() {
  const [src, setsrc] = useState(Logo);
  const [files, setfiles] = useState(null);
  const upfile = (e) => {
    let file = e.target.files[0];
    setfiles(file);
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (e) => {
      setsrc([reader.result]);
    };
  };
  const postt = () => {
    let file = files;
    let formdata = new FormData();
    formdata.append("img", file);
    axios({
      url: "http://127.0.0.1:8082/api/RoomType",
      method: "POST",
      data: formdata,
    }).then((res) => {
      alert("upload สำเร็จ");
    });
  };
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          postt();
        }}
      >
        <input
          type="file"
          name="file"
          onChange={(e) => {
            upfile(e);
          }}
        />
        <button type="submit">send</button>
      </form>
      <Image width="200px" src={src} />
    </div>
  );
}
