"use client";
import { useState } from "react";
import "./dashboard.css";
import { HiUsers } from "react-icons/hi";
import { BiLogOutCircle } from "react-icons/bi";
import Chart from "react-apexcharts";
import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";

import { BsCartCheckFill } from "react-icons/bs";
import { AiFillCar, AiFillMessage } from "react-icons/ai";
import { BiSolidDollarCircle, BiSolidMessageAltError } from "react-icons/bi";
import { MdOutlineAccountCircle } from "react-icons/md";
import { deleteCookie } from "cookies-next";

function Card({ title, value, icon }) {
  return (
    <div className="cards">
      <p className="card-inner-heading">{title}</p>
      <p className="card-inner-number-icon">
        {value} {icon}
      </p>
    </div>
  );
}

function page() {
  const [opened, { toggle }] = useDisclosure();

  const route = useRouter();

  const [options, setOptions] = useState({
    chart: {
      id: "apexchart-example",
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
    },
    colors: ["#FFA500"],
  });

  const [series, setSeries] = useState([
    {
      name: "series-1",
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
    },
  ]);

  const handleLogout = () => {
    deleteCookie("isAuthenticated");
    route.push("/login");
  };

  return (
    <AppShell header={{ height: 80 }} padding="md">
      <AppShell.Header style={{ backgroundColor: "lightbrown" }}>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <div
          style={{
            fontWeight: "bold",
            fontSize: "3rem",
            color: "brown",
            justifyContent: "space-between",
            display: "flex",
          }}
        >
          DASHBOARD{" "}
          <BiLogOutCircle
            style={{ width: "5rem", margin: "0.8rem", cursor: "pointer" }}
            onClick={() => handleLogout()}
            onMouseEnter={(e) => (e.target.style.color = "black")}
            onMouseLeave={(e) => (e.target.style.color = "brown")}
          />
        </div>
      </AppShell.Header>

      <div>
        <div style={{ display: "flex", marginTop: "7rem" }}>
          <Card title="Total Users" value={20} icon={<HiUsers />} />
          <Card title="Total Orders" value={400} icon={<BsCartCheckFill />} />
          <Card title="Total Vehicles" value={200} icon={<AiFillCar />} />
          <Card
            title="Total Payment"
            value={"$" + 189000}
            icon={<BiSolidDollarCircle />}
          />
        </div>

        <div style={{ display: "flex" }}>
          <Card
            title="Total Complaints"
            value={44}
            icon={<BiSolidMessageAltError />}
          />
          <Card title="Total Reviews" value={1000} icon={<AiFillMessage />} />
          <Card
            title="Total Accounts"
            value={67}
            icon={<MdOutlineAccountCircle />}
          />
          <Card
            title="Total Vehicles Delivered"
            value={"$" + 170}
            icon={<AiFillCar />}
          />
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "5rem",
            border: "2px solid #FFAC1C",
            borderRadius: "2px",
            backgroundColor: "white",
            width: "fit-content",
            margin: "8rem",
          }}
        >
          <Chart
            options={options}
            series={series}
            type="bar"
            width={1300}
            height={400}
          />
        </div>
      </div>
    </AppShell>
  );
}

export default page;
