"use client";

import { useState } from "react";
import type { Clinic, Doctor } from "@/lib/data";
import {
  IconBriefcase,
  IconCost,
  IconStaff,
  IconStar,
} from "./icons";

type DoctorBookingSidebarProps = {
  doctor: Doctor;
  clinic: Clinic;
};

export function DoctorBookingSidebar({
  doctor,
  clinic,
}: DoctorBookingSidebarProps) {
  const [showAllConditions, setShowAllConditions] = useState(false);
  const visibleConditions = showAllConditions
    ? doctor.conditions
    : doctor.conditions.slice(0, 3);

  return (
    <aside className="doctor-booking-sidebar">
      <div className="doctor-booking-header">
        <img
          className="doctor-booking-avatar"
          src={doctor.avatar}
          alt={doctor.name}
          width={88}
          height={88}
        />
        <h2 className="doctor-booking-name">{doctor.name}</h2>
        <p className="doctor-booking-sub">
          {doctor.code} - {doctor.specialty}
        </p>
        <p className="doctor-rating">
          {Array.from({ length: 5 }).map((_, i) => (
            <IconStar
              key={i}
              className={i < Math.round(doctor.rating) ? "star on" : "star"}
            />
          ))}
          <span>
            {doctor.rating.toFixed(1)} ({doctor.reviews})
          </span>
        </p>
      </div>

      <div className="profile-stats doctor-booking-stats">
        <div className="stat">
          <span className="stat-icon">
            <IconBriefcase />
          </span>
          <strong>{doctor.experienceYears} years</strong>
          <span>Experience</span>
        </div>
        <div className="stat">
          <span className="stat-icon">
            <IconStaff />
          </span>
          <strong>{doctor.consultations} visits</strong>
          <span>Consultations</span>
        </div>
        <div className="stat">
          <span className="stat-icon">
            <IconCost />
          </span>
          <strong>{doctor.price}</strong>
          <span>Cost</span>
        </div>
      </div>

      <section className="doctor-booking-section">
        <h3>Treatment of conditions</h3>
        <div className="tag-list">
          {visibleConditions.map((condition) => (
            <span key={condition} className="info-tag">
              {condition}
            </span>
          ))}
          {doctor.conditions.length > 3 ? (
            <button
              type="button"
              className="show-more"
              onClick={() => setShowAllConditions((value) => !value)}
            >
              {showAllConditions ? "SHOW LESS" : "SHOW MORE"}
            </button>
          ) : null}
        </div>
      </section>

      <section className="doctor-booking-section">
        <h3>Kinh nghiệm và chứng chỉ</h3>
        <div className="experience-item">
          <strong>
            {doctor.role} - {doctor.rolePeriod}
          </strong>
          <p>{clinic.name}</p>
        </div>
        <button type="button" className="show-more">
          SHOW MORE
        </button>
      </section>

      <section className="doctor-booking-section">
        <h3>Languages</h3>
        <div className="tag-list">
          {doctor.languages.map((language) => (
            <span key={language} className="info-tag soft">
              {language}
            </span>
          ))}
        </div>
      </section>
    </aside>
  );
}
