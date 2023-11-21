// FeeGeneration.jsx

import React from "react";
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
        <Text style={styles.value}>{studentData.name}</Text>
        <Text style={styles.label}>{`Roll Number:`}</Text>
        <Text style={styles.value}>{studentData.rollNumber}</Text>
        <Text style={styles.label}>{`Program:`}</Text>
        <Text style={styles.value}>{studentData.program}</Text>
        <Text style={styles.label}>{`Courses:`}</Text>
        <Text style={styles.value}>{studentData.courses.join(", ")}</Text>
        <Text style={styles.label}>{`Total Fee:`}</Text>
        <Text style={styles.value}>{`$${studentData.fees}`}</Text>
      </View>
    </Page>
  </Document>
);

const FeeGeneration = () => {
  const studentData = {
    name: "John Doe",
    rollNumber: "123456",
    program: "Computer Science",
    courses: ["Mathematics", "Computer Science", "Physics"],
    fees: "10,000",
    // Add more details as needed
  };

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
