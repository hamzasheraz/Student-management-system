// FeeGeneration.jsx

import React, { useEffect, useState } from "react";
import {
  PDFViewer,
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import "../stylefeegeneration.css";
import axios from "axios";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    justifyContent: "center",
  },
  section: {
    margin: 20,
    padding: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    border: "1px solid #000",
    borderRadius: 5,
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  value: {
    fontSize: 16,
    marginBottom: 20,
  },
});

const generateFeePDF = (studentData) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.heading}>Fee Voucher</Text>
        <Text style={styles.label}>{`Name:`}</Text>
        <Text style={styles.value}>
          {studentData.first_name} {studentData.last_name}
        </Text>
        <Text style={styles.label}>{`Roll Number:`}</Text>
        <Text style={styles.value}>{studentData.roll_number}</Text>
        <Text style={styles.label}>{`Program:`}</Text>
        <Text style={styles.value}>{studentData.program}</Text>
        <Text style={styles.label}>{`Department:`}</Text>
        <Text style={styles.value}>{studentData.department}</Text>
        {/* <Text style={styles.label}>{`Courses:`}</Text>
        <Text style={styles.value}>{studentData.courses.join(", ")}</Text> */}
        <Text style={styles.label}>{`Total Fee:$10000`}</Text>
        <Text style={styles.value}>{`$${studentData.fees}`}</Text>
      </View>
    </Page>
  </Document>
);

const FeeGeneration = () => {
  let apiKey = process.env.REACT_APP_API_KEY;

  const token = localStorage.getItem("accessToken");

  // Set the default authorization header for all axios requests
  axios.defaults.headers.common["Authorization"] = `JWT ${token}`;

  const [studentData, setStudentData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch student and academy data using the token
    const token1 = localStorage.getItem("accessToken");

    if (!token1) {
      // Redirect only if not already on the student profile page
      if (window.location.pathname !== "/student-login") {
        window.location.href = "/student-login";
      }
    }
    const fetchData = async () => {
      try {
        // Fetch student data
        const studentResponse = await axios.get(apiKey + "/student-info");
        setStudentData(studentResponse.data);
        // console.log(studentData1);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [apiKey]);

  return (
    <>
      <div className="fee-generation-container">
        <h2>Fee Generation</h2>
        <PDFViewer width="100%" height={500}>
          {generateFeePDF(studentData)}
        </PDFViewer>
        <PDFDownloadLink
          document={generateFeePDF(studentData)}
          fileName="fee_voucher.pdf"
        >
          {({ blob, url, loading, error }) =>
            loading ? "Loading document..." : "Download Fee Voucher"
          }
        </PDFDownloadLink>
      </div>
    </>
  );
};

export default FeeGeneration;
