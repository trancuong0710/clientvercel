import Link from "next/link";
import type { Clinic } from "@/lib/data";
import {
  IconCalendar,
  IconChevronRight,
  IconClock,
  IconPin,
  IconStar,
} from "./icons";

type ClinicCardProps = {
  clinic: Clinic;
};

export function ClinicCard({ clinic }: ClinicCardProps) {
  return (
    <Link href={`/clinics/${clinic.id}`} className="clinic-card">
      <div className="clinic-card-top">
        <img
          className="clinic-logo-img"
          src={clinic.logoSrc}
          alt=""
          width={56}
          height={56}
        />

        <div className="clinic-meta">
          <h3 className="clinic-name">{clinic.name}</h3>
          <p className="meta-row">
            <IconClock />
            <span>{clinic.hours}</span>
          </p>
          <p className="meta-row">
            <IconPin />
            <span>
              {clinic.city} • {clinic.distance}
            </span>
          </p>
          <p className="rating-row">
            {Array.from({ length: 5 }).map((_, i) => (
              <IconStar
                key={i}
                className={i < Math.round(clinic.rating) ? "star on" : "star"}
              />
            ))}
            <span>
              {clinic.rating.toFixed(1)} ({clinic.reviews})
            </span>
          </p>
        </div>

        <span className="calendar-btn" aria-hidden>
          <IconCalendar />
        </span>
      </div>

      <div className="clinic-card-divider" aria-hidden />

      <div className="clinic-card-bottom clinic-card-bottom-end">
        <span className="map-link">
          Go To Map <IconChevronRight />
        </span>
      </div>
    </Link>
  );
}
