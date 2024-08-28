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

const generateFeePDF = (studentData, courseData) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.heading}>Fee Voucher</Text>
        <Text style={styles.label}>{`Name:`}</Text>
        <Text style={styles.value}>{studentData.name}</Text>
        <Text style={styles.label}>{`Roll Number:`}</Text>
        <Text style={styles.value}>{studentData.rollNumber}</Text>
        <Text style={styles.label}>{`Program:`}</Text>
        <Text style={styles.value}>{studentData.department}</Text>
        <Text style={styles.label}>{`Courses:`}</Text>
        <Text style={styles.value}>{courseData.course_title}</Text>
        <Text style={styles.label}>{`Total Fee:`}</Text>
        <Text style={styles.value}>{`$${courseData.fee}`}</Text>
      </View>
    </Page>
  </Document>
);

const FeeGeneration = () => {
  let [studentData, setstudentData] = useState([]);
  let [courseData, setCourseData] = useState([]);
  useEffect(() => {
    const roll_number = localStorage.getItem("rollnumber");

    let getstudentdata = async () => {
      try {
        let data = await fetch(
          `http://127.0.0.1:8000/api/studentsdata/${roll_number}`
        );
        let d = await data.json();
        setstudentData(d);
      } catch (error) {
        console.log(error);
      }
    };

    getstudentdata();
  }, []);

  useEffect(() => {
    const fetchCourse = async () => {
      // if (studentData) {
      const course_id = studentData.course;
      //   console.log(course_id);
      axios
        .post("http://127.0.0.1:8000/api/courses-info/", {
          course_id,
        })
        .then((response) => {
          if (response.data) {
            setCourseData(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchCourse();
  }, [studentData]);

  return (
    <>
      <div className="fee-generation-container">
        <h2>Fee Generation</h2>

        <PDFViewer width="100%" height={500}>
          {generateFeePDF(studentData, courseData)}
        </PDFViewer>

        <PDFDownloadLink
          document={generateFeePDF(studentData, courseData)}
          fileName="fee_voucher.pdf"
        >
          {({loading}) =>
            loading ? "Loading document..." : "Download Fee Voucher"
          }
        </PDFDownloadLink>
      </div>
    </>
  );
};

export default FeeGeneration;
