"use client";

import { useEffect, useId, useState } from "react";
import type { Clinic, Doctor } from "@/lib/data";
import {
  IconBag,
  IconCare,
  IconChevronRight,
  IconFlame,
  IconInfo,
  IconStar,
} from "./icons";

type BookingDoctorCardProps = {
  doctor: Doctor;
  clinic: Clinic;
  highlighted?: boolean;
};

const badgeIcon = {
  flame: IconFlame,
  care: IconCare,
  bag: IconBag,
} as const;

function groupSlots(slots: string[]) {
  const morning = slots.filter((slot) => {
    const hour = Number(slot.split(":")[0]);
    return hour < 12;
  });
  const afternoon = slots.filter((slot) => {
    const hour = Number(slot.split(":")[0]);
    return hour >= 12;
  });
  return { morning, afternoon };
}

export function BookingDoctorCard({
  doctor,
  clinic,
  highlighted = false,
}: BookingDoctorCardProps) {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isSlotsOpen, setIsSlotsOpen] = useState(false);
  const titleId = useId();
  const BadgeIcon = badgeIcon[doctor.badge];
  const { morning, afternoon } = groupSlots(doctor.allSlots);

  useEffect(() => {
    if (!isSlotsOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsSlotsOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isSlotsOpen]);

  const selectSlot = (slot: string) => {
    setSelectedSlot(slot);
    setIsSlotsOpen(false);
  };

  return (
    <>
      <article className={`booking-card${highlighted ? " is-highlighted" : ""}`}>
        <div className="booking-card-top">
          <img
            className="booking-avatar"
            src={doctor.avatar}
            alt={doctor.name}
            width={72}
            height={72}
          />

          <div className="booking-meta">
            <h3 className="doctor-name">{doctor.name}</h3>
            <p className="doctor-sub">
              {doctor.code} • {doctor.specialty}
            </p>
            <p className="doctor-rating">
              <IconStar className="star on" />
              <span>
                {doctor.rating.toFixed(1)} ({doctor.reviews})
              </span>
            </p>
            <p className="booking-hospital">
              {clinic.name} • {clinic.city}
            </p>
          </div>

          <div className="booking-actions">
            <span className="doctor-badge" aria-hidden>
              <BadgeIcon />
            </span>
            <button type="button" className="book-btn">
              Book Appointment
            </button>
          </div>
        </div>

        <div className="booking-card-bottom">
          <p className="price-row">
            <strong>{doctor.price}</strong>
            <span> / visit</span>
            <IconInfo className="info-icon" />
          </p>

          <div className="slot-row">
            {doctor.slots.map((slot) => (
              <button
                key={slot}
                type="button"
                className={`slot-btn${selectedSlot === slot ? " is-selected" : ""}`}
                onClick={() => setSelectedSlot(slot)}
              >
                {slot}
              </button>
            ))}
            <button
              type="button"
              className="see-all"
              onClick={() => setIsSlotsOpen(true)}
            >
              See All <IconChevronRight />
            </button>
          </div>
        </div>
      </article>

      {isSlotsOpen ? (
        <div
          className="slot-modal-backdrop"
          role="presentation"
          onClick={() => setIsSlotsOpen(false)}
        >
          <div
            className="slot-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="slot-modal-header">
              <div>
                <h2 id={titleId}>Available time slots</h2>
                <p>
                  {doctor.name} • {doctor.specialty}
                </p>
              </div>
              <button
                type="button"
                className="slot-modal-close"
                aria-label="Close"
                onClick={() => setIsSlotsOpen(false)}
              >
                ×
              </button>
            </div>

            {morning.length > 0 ? (
              <section className="slot-group">
                <h3>Morning</h3>
                <div className="slot-grid">
                  {morning.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      className={`slot-btn${selectedSlot === slot ? " is-selected" : ""}`}
                      onClick={() => selectSlot(slot)}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </section>
            ) : null}

            {afternoon.length > 0 ? (
              <section className="slot-group">
                <h3>Afternoon</h3>
                <div className="slot-grid">
                  {afternoon.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      className={`slot-btn${selectedSlot === slot ? " is-selected" : ""}`}
                      onClick={() => selectSlot(slot)}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </section>
            ) : null}

            <div className="slot-modal-footer">
              <button
                type="button"
                className="slot-modal-cancel"
                onClick={() => setIsSlotsOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="book-btn"
                disabled={!selectedSlot}
                onClick={() => setIsSlotsOpen(false)}
              >
                {selectedSlot ? `Confirm ${selectedSlot}` : "Select a slot"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
