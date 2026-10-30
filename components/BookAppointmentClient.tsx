"use client";

import { useState } from "react";
import type { Clinic, Doctor } from "@/lib/data";
import { BookingDoctorCard } from "./BookingDoctorCard";
import { FilterBar } from "./FilterBar";
import { IconCalendar } from "./icons";

type BookAppointmentClientProps = {
  clinic: Clinic;
  doctors: Doctor[];
  selectedDoctorId: string;
};

export function BookAppointmentClient({
  clinic,
  doctors,
  selectedDoctorId,
}: BookAppointmentClientProps) {
  const [selectedDate, setSelectedDate] = useState("");

  return (
    <>
      <div className="service-tabs underline" role="tablist" aria-label="Appointment type">
        <button
          type="button"
          className="service-tab underline is-active"
          role="tab"
          aria-selected="true"
        >
          Online
        </button>
        <button type="button" className="service-tab underline" role="tab">
          At Clinic / Hospital
        </button>
        <button type="button" className="service-tab underline" role="tab">
          At Home
        </button>
      </div>

      <div className="section-head book-section-head">
        <h2 className="section-title">Our Specialists</h2>
        <label className="appointment-date-field">
          <span>Date</span>
          <div className="form-input-wrap">
            <input
              type="date"
              value={selectedDate}
              onChange={(event) => setSelectedDate(event.target.value)}
              aria-label="Appointment date"
            />
            <IconCalendar className="form-input-icon" />
          </div>
        </label>
      </div>

      <FilterBar
        filters={[
          "Most Relevant",
          "Clinic/Hospital",
          "Condition",
          "Profile badge",
        ]}
      />

      <div className="booking-list">
        {doctors.map((doctor) => (
          <BookingDoctorCard
            key={doctor.id}
            doctor={doctor}
            clinic={clinic}
            highlighted={doctor.id === selectedDoctorId}
            selectedDate={selectedDate}
          />
        ))}
      </div>
    </>
  );
}
