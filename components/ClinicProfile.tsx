import type { Clinic } from "@/lib/data";
import {
  IconBriefcase,
  IconClock,
  IconCost,
  IconPin,
  IconStaff,
  IconStar,
} from "./icons";

type ClinicProfileProps = {
  clinic: Clinic;
};

export function ClinicProfile({ clinic }: ClinicProfileProps) {
  return (
    <aside className="clinic-profile">
      <div className="profile-header">
        <img
          className="clinic-logo-img large"
          src={clinic.logoSrc}
          alt=""
          width={56}
          height={56}
        />
        <div>
          <h2 className="profile-name">{clinic.name}</h2>
          <p className="doctor-rating">
            <IconStar className="star on" />
            <span>
              {clinic.rating.toFixed(1)} ({clinic.reviews})
            </span>
          </p>
        </div>
      </div>

      <div className="profile-stats">
        <div className="stat">
          <span className="stat-icon">
            <IconBriefcase />
          </span>
          <strong>{clinic.establishedYears} years</strong>
          <span>Establish</span>
        </div>
        <div className="stat">
          <span className="stat-icon">
            <IconStaff />
          </span>
          <strong>{clinic.staffCount} specialists</strong>
          <span>Staff</span>
        </div>
        <div className="stat">
          <span className="stat-icon">
            <IconCost />
          </span>
          <strong>{clinic.price}</strong>
          <span>Cost</span>
        </div>
      </div>

      <div className="basic-info">
        <h3>Basic Info</h3>
        <p className="meta-row">
          <IconPin />
          <span>{clinic.address}</span>
        </p>
        <p className="meta-row">
          <IconClock />
          <span>{clinic.hours}</span>
        </p>
      </div>
    </aside>
  );
}
