import Link from "next/link";
import type { Doctor } from "@/lib/data";
import { IconStar } from "./icons";

type DoctorCardProps = {
  doctor: Doctor;
  clinicId: string;
};

export function DoctorCard({ doctor, clinicId }: DoctorCardProps) {
  return (
    <Link
      href={`/book/${clinicId}/${doctor.id}`}
      className="doctor-card"
    >
      <img
        className="doctor-avatar"
        src={doctor.avatar}
        alt={doctor.name}
        width={72}
        height={72}
      />
      <div className="doctor-meta">
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
      </div>
    </Link>
  );
}
