import { Typography } from "@mui/material";
import { Female, Male } from "@mui/icons-material";
import { Gender, Patient } from "../../types";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import patientService from "../../services/patients";

const iconForGender = (gender: Gender) => {
  switch (gender) {
    case Gender.Female:
      return <Female fontSize="inherit" />;
    case Gender.Male:
      return <Male fontSize="inherit" />;
    case Gender.Other:
      return;
  }
};

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const [loading, setLoading] = useState(true);

  const id = useParams().id!;

  useEffect(() => {
    if (!patient) {
      patientService
        .getById(id)
        .then(data => {
          setPatient(data);
          setLoading(false);
        })
        .catch(_ => setLoading(false));
    }
  }, [id, patient]);

  if (loading) return null;

  if (!patient) {
    return (
      <>
        <Typography variant="h1" style={{ marginTop: "0.5em" }}>
          404
        </Typography>
        <Typography variant="h4">No patient matching ID found.</Typography>
      </>
    );
  }

  const { name, gender, occupation, ssn } = patient;

  return (
    <>
      <Typography variant="h4" style={{ margin: "0.8em 0" }}>
        {name} {iconForGender(gender)}
      </Typography>
      {ssn && <Typography variant="body1">ssn: {ssn}</Typography>}
      <Typography variant="body1">occupation: {occupation}</Typography>
    </>
  );
};

export default PatientPage;
