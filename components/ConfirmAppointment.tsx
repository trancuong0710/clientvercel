"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  HARDCODED_PRICING,
  PATIENT_OPTIONS,
  formatBookingDateTime,
  getBookingDraft,
  saveBooking,
  type BookingDraft,
} from "@/lib/bookings";
import {
  IconCalendar,
  IconChevronRight,
  IconClock,
  IconHospital,
  IconPdf,
  IconPill,
  IconPin,
  IconReason,
} from "./icons";

type ConfirmAppointmentProps = {
  clinicId: string;
  doctorId: string;
};

function DetailRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="confirm-detail-row">
      <span className="confirm-detail-icon" aria-hidden>
        {icon}
      </span>
      <div>
        <strong>{label}</strong>
        <div className="confirm-detail-body">{children}</div>
      </div>
    </div>
  );
}

export function ConfirmAppointment({
  clinicId,
  doctorId,
}: ConfirmAppointmentProps) {
  const router = useRouter();
  const [draft, setDraft] = useState<BookingDraft | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"momo" | "vnpay">("momo");
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const stored = getBookingDraft();
    if (
      !stored ||
      stored.clinicId !== clinicId ||
      stored.doctorId !== doctorId
    ) {
      router.replace(`/book/${clinicId}/${doctorId}/form`);
      return;
    }
    setDraft(stored);
  }, [clinicId, doctorId, router]);

  const patientMeta = useMemo(
    () => (draft ? PATIENT_OPTIONS[draft.patientId] : null),
    [draft],
  );

  if (!draft) {
    return <div className="confirm-loading">Loading booking details...</div>;
  }

  const canPay = privacyChecked && authChecked;
  const documents = draft.documents
    ? draft.documents
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    : [];
  const displayDocs =
    documents.length > 0
      ? documents.map((doc) =>
          /\.(pdf|PDF)/.test(doc) || doc.includes("(12MB)")
            ? doc
            : `${doc}.PDF (12MB)`,
        )
      : ["File name.PDF (12MB)", "File name.PDF (12MB)"];

  const guardianName = patientMeta?.guardian || "Pham Linh";
  const guardianId = patientMeta?.guardianId || "ID1234";
  const guardianCondition = patientMeta?.guardianCondition || "Diabetes";
  const patientId = patientMeta?.accountId || "ID1158";
  const patientCondition = patientMeta?.condition || "None";

  return (
    <div className="confirm-layout">
      <div className="confirm-main">
        <div className="confirm-banner">
          <div className="confirm-banner-left">
            <span className="confirm-banner-icon">
              <IconCalendar />
            </span>
            <p>
              You&apos;re booking an <strong>Online Appointment</strong>
            </p>
          </div>
          <div className="confirm-banner-meta">
            <span>15 min</span>
            <strong>{formatBookingDateTime(draft.date, draft.time)}</strong>
          </div>
        </div>

        <section className="confirm-card">
          <h3>Patient</h3>
          <div className="info-patient-row">
            <article className="info-person-card">
              <img
                src={
                  patientMeta?.guardianAvatar ||
                  "https://i.pravatar.cc/80?img=12"
                }
                alt=""
                width={48}
                height={48}
              />
              <div>
                <p className="person-name">{guardianName}</p>
                <p className="person-sub">
                  {guardianId} • {guardianCondition}
                </p>
              </div>
            </article>

            <span className="info-arrow" aria-hidden>
              <IconChevronRight />
            </span>

            <article className="info-person-card">
              <img
                src={patientMeta?.avatar || "https://i.pravatar.cc/80?img=32"}
                alt=""
                width={48}
                height={48}
              />
              <div>
                <p className="person-name">
                  {draft.patientName}
                  {patientMeta?.isChild ? (
                    <span className="child-tag">CHILD</span>
                  ) : null}
                </p>
                <p className="person-sub">
                  {patientId} • {patientCondition}
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className="confirm-card">
          <h3>Doctor</h3>
          <div className="info-doctor-row">
            <article className="info-person-card">
              <img
                src={draft.doctorAvatar || "https://i.pravatar.cc/80?img=11"}
                alt=""
                width={48}
                height={48}
              />
              <div>
                <p className="person-name">{draft.doctorName}</p>
                <p className="person-sub">
                  {draft.doctorCode} • {draft.doctorSpecialty}
                </p>
              </div>
            </article>

            <article className="info-meta-card">
              <span className="info-meta-icon">
                <IconHospital />
              </span>
              <div>
                <p className="info-meta-label">Clinic / Hospital</p>
                <p className="info-meta-value">{draft.clinicName}</p>
              </div>
            </article>

            <article className="info-meta-card">
              <span className="info-meta-icon">
                <IconPin />
              </span>
              <div>
                <p className="info-meta-label">Province</p>
                <p className="info-meta-value">{draft.clinicCity}</p>
              </div>
            </article>
          </div>
        </section>

        <section className="confirm-card">
          <div className="confirm-section-head">
            <h3>Booking Details</h3>
            <Link
              href={`/book/${clinicId}/${doctorId}/form?slot=${encodeURIComponent(draft.time)}${draft.date ? `&date=${draft.date}` : ""}`}
              className="edit-link"
            >
              Điều Chỉnh <IconChevronRight />
            </Link>
          </div>

          <DetailRow icon={<IconReason />} label="Reason">
            <p>{draft.reason || "—"}</p>
          </DetailRow>
          <DetailRow icon={<IconDocumentLike />} label="Details">
            <p>{draft.details || "—"}</p>
          </DetailRow>
          <DetailRow icon={<IconClock />} label="Symptoms onset">
            <p>{draft.symptomsStart || "—"}</p>
          </DetailRow>
          <DetailRow icon={<IconReason />} label="Symptoms severity">
            <p className="capitalize">{draft.severity || "—"}</p>
          </DetailRow>
          <DetailRow icon={<IconPill />} label="Medications being used">
            <p>{draft.medication || "None"}</p>
          </DetailRow>
          <DetailRow icon={<IconPdf />} label="Document">
            <div className="doc-list">
              {displayDocs.map((doc, index) => (
                <button
                  key={`${doc}-${index}`}
                  type="button"
                  className="doc-file"
                >
                  <IconPdf />
                  <span>{doc}</span>
                </button>
              ))}
            </div>
          </DetailRow>
        </section>
      </div>

      <aside className="confirm-aside">
        <section className="confirm-side-card">
          <div className="price-row-item">
            <span>Appointment fee</span>
            <strong>{HARDCODED_PRICING.appointmentFee}</strong>
          </div>
          <div className="price-row-item">
            <span>Application fee</span>
            <strong>{HARDCODED_PRICING.applicationFee}</strong>
          </div>
          <div className="price-row-item">
            <span>Participant fee</span>
            <strong>{HARDCODED_PRICING.participantFee}</strong>
          </div>
          <div className="price-row-item discount">
            <span>Discount</span>
            <strong>{HARDCODED_PRICING.discount}</strong>
          </div>
          <p className="tax-note">Tax included, where applicable.</p>
          <div className="price-row-item total">
            <span>Total cost</span>
            <strong>{HARDCODED_PRICING.total}</strong>
          </div>
        </section>

        <section className="confirm-side-card">
          <h3>Payment Method</h3>
          <label
            className={`payment-option-card${paymentMethod === "momo" ? " is-selected" : ""}`}
          >
            <input
              type="radio"
              name="payment"
              checked={paymentMethod === "momo"}
              onChange={() => setPaymentMethod("momo")}
            />
            <img
              className="payment-logo-img"
              src="https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a0/MoMo_Logo_App.svg/3840px-MoMo_Logo_App.svg.png"
              alt="MoMo"
              width={34}
              height={34}
            />
            <span>MoMo wallet</span>
          </label>
          <label
            className={`payment-option-card${paymentMethod === "vnpay" ? " is-selected" : ""}`}
          >
            <input
              type="radio"
              name="payment"
              checked={paymentMethod === "vnpay"}
              onChange={() => setPaymentMethod("vnpay")}
            />
            <img
              className="payment-logo-img"
              src="https://thuonghieumanh.vneconomy.vn/upload/vnpay.png"
              alt="VNPAY"
              width={34}
              height={34}
            />
            <span>VNPAY</span>
          </label>
        </section>

        <section className="confirm-side-card legal-card">
          <label className="consent-row compact">
            <input
              type="checkbox"
              checked={privacyChecked}
              onChange={(event) => setPrivacyChecked(event.target.checked)}
            />
            <span>
              I confirm <a href="#">Privacy Policy</a> and{" "}
              <a href="#">Term of Use</a>
            </span>
          </label>

          <label className="consent-row compact">
            <input
              type="checkbox"
              checked={authChecked}
              onChange={(event) => setAuthChecked(event.target.checked)}
            />
            <span>
              I authorize YSalus to collect, use, and disclose my personal data
              and health information to medical partners for treatment, payment
              and healthcare operations in accordance with Vietnamese government
              decree No. 356/2025/NĐ-CP.
            </span>
          </label>

          <button
            type="button"
            className="confirm-pay-btn"
            disabled={!canPay}
            onClick={() => {
              saveBooking(draft);
              router.push("/calendar");
            }}
          >
            Confirm And Pay
          </button>
        </section>
      </aside>
    </div>
  );
}

function IconDocumentLike() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 3.5h7l4.5 4.5V19A1.5 1.5 0 0 1 17 20.5H7A1.5 1.5 0 0 1 5.5 19V5A1.5 1.5 0 0 1 7 3.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M14 3.5V8h4.5M8.5 12h7M8.5 15.5h5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
