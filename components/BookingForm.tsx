"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Clinic, Doctor } from "@/lib/data";
import { PATIENT_OPTIONS, saveBookingDraft } from "@/lib/bookings";
import { IconCalendar, IconClock, IconChevronDown } from "./icons";

type BookingFormProps = {
  clinic: Clinic;
  doctor: Doctor;
  selectedSlot: string;
  selectedDate?: string;
};

const PATIENT_LIST = [
  { id: "patient-1", label: "Nguyễn Văn A / YS1001" },
  { id: "patient-2", label: "Trần Thị B / YS1002" },
  { id: "patient-3", label: "Phạm Trần Trúc Linh / ID1158" },
];

const SEVERITY_LIST = [
  { id: "mild", label: "Mild" },
  { id: "moderate", label: "Moderate" },
  { id: "severe", label: "Severe" },
];

export function BookingForm({
  clinic,
  doctor,
  selectedSlot,
  selectedDate = "",
}: BookingFormProps) {
  const router = useRouter();
  const [patient, setPatient] = useState("");
  const [date, setDate] = useState(selectedDate || "");
  const [time, setTime] = useState(selectedSlot || "");
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [symptomsStart, setSymptomsStart] = useState("");
  const [severity, setSeverity] = useState("");
  const [medication, setMedication] = useState("");
  const [documents, setDocuments] = useState("");
  const [consent, setConsent] = useState(false);
  const [patientOpen, setPatientOpen] = useState(false);
  const [severityOpen, setSeverityOpen] = useState(false);
  const patientRef = useRef<HTMLDivElement>(null);
  const severityRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (patientRef.current && !patientRef.current.contains(target)) {
        setPatientOpen(false);
      }
      if (severityRef.current && !severityRef.current.contains(target)) {
        setSeverityOpen(false);
      }
    };
    window.addEventListener("mousedown", onPointerDown);
    return () => window.removeEventListener("mousedown", onPointerDown);
  }, []);

  const selectedPatientLabel =
    PATIENT_LIST.find((item) => item.id === patient)?.label ||
    "Enter patient's name / ID Account";
  const selectedSeverityLabel =
    SEVERITY_LIST.find((item) => item.id === severity)?.label ||
    "Select severity";

  return (
    <form
      className="booking-form"
      onSubmit={(event) => {
        event.preventDefault();
        if (!consent || !patient || !severity) return;

        const patientInfo = PATIENT_OPTIONS[patient];
        saveBookingDraft({
          clinicId: clinic.id,
          doctorId: doctor.id,
          doctorName: doctor.name,
          doctorCode: doctor.code,
          doctorSpecialty: doctor.specialty,
          doctorAvatar: doctor.avatar,
          clinicName: clinic.name,
          clinicCity: clinic.city,
          patientId: patient,
          patientName: patientInfo?.name || patient,
          date,
          time,
          reason,
          details,
          symptomsStart,
          severity,
          medication,
          documents,
        });

        router.push(`/book/${clinic.id}/${doctor.id}/confirm`);
      }}
    >
      <div className="form-field">
        <span className="form-label">
          Who needs a visit?<span className="required">*</span>
        </span>
        <div className="custom-select" ref={patientRef}>
          <button
            type="button"
            className={`custom-select-trigger${patient ? "" : " is-placeholder"}`}
            onClick={() => {
              setPatientOpen((open) => !open);
              setSeverityOpen(false);
            }}
          >
            <span>{selectedPatientLabel}</span>
            <IconChevronDown />
          </button>
          {patientOpen ? (
            <ul className="custom-select-menu" role="listbox">
              {PATIENT_LIST.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className={patient === item.id ? "is-active" : undefined}
                    onClick={() => {
                      setPatient(item.id);
                      setPatientOpen(false);
                    }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      <div className="form-row-2">
        <label className="form-field">
          <span className="form-label">Date</span>
          <div className="form-input-wrap">
            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
            <IconCalendar className="form-input-icon" />
          </div>
        </label>

        <label className="form-field">
          <span className="form-label">Time</span>
          <div className="form-input-wrap">
            <input
              type="time"
              value={time}
              onChange={(event) => setTime(event.target.value)}
            />
            <IconClock className="form-input-icon" />
          </div>
        </label>
      </div>

      <label className="form-field">
        <span className="form-label">
          What is the reason for the appointment?
          <span className="required">*</span>
        </span>
        <input
          type="text"
          value={reason}
          onChange={(event) => setReason(event.target.value)}
          required
        />
      </label>

      <label className="form-field">
        <span className="form-label">
          Describe details<span className="required">*</span>
        </span>
        <input
          type="text"
          value={details}
          onChange={(event) => setDetails(event.target.value)}
          required
        />
      </label>

      <label className="form-field">
        <span className="form-label">
          When did you start feeling the symptoms?
          <span className="required">*</span>
        </span>
        <input
          type="text"
          value={symptomsStart}
          onChange={(event) => setSymptomsStart(event.target.value)}
          required
        />
      </label>

      <div className="form-field">
        <span className="form-label">
          How severe are the symptoms?<span className="required">*</span>
        </span>
        <div className="custom-select" ref={severityRef}>
          <button
            type="button"
            className={`custom-select-trigger${severity ? "" : " is-placeholder"}`}
            onClick={() => {
              setSeverityOpen((open) => !open);
              setPatientOpen(false);
            }}
          >
            <span>{selectedSeverityLabel}</span>
            <IconChevronDown />
          </button>
          {severityOpen ? (
            <ul className="custom-select-menu" role="listbox">
              {SEVERITY_LIST.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className={severity === item.id ? "is-active" : undefined}
                    onClick={() => {
                      setSeverity(item.id);
                      setSeverityOpen(false);
                    }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      <label className="form-field">
        <span className="form-label">Have you taken any medication?</span>
        <input
          type="text"
          value={medication}
          onChange={(event) => setMedication(event.target.value)}
        />
      </label>

      <div className="form-field">
        <span className="form-label">Do you have any documents to share?</span>
        <div className="document-row">
          <input
            type="text"
            value={documents}
            onChange={(event) => setDocuments(event.target.value)}
          />
          <label className="upload-btn">
            Upload Document
            <input
              type="file"
              hidden
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) setDocuments(file.name);
              }}
            />
          </label>
        </div>
      </div>

      <label className="consent-row">
        <input
          type="checkbox"
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
          required
        />
        <span>
          I acknowledge and agree to the release of my protected health
          information (PHI) to the Doctor/Clinic for treatment, payment, and
          healthcare operations.
        </span>
      </label>

      <div className="form-actions">
        <button type="submit" className="next-btn" disabled={!consent}>
          Next
        </button>
      </div>
    </form>
  );
}
