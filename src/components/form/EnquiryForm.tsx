"use client";

import Link from "next/link";
import { useId, useRef, useState, type FormEvent } from "react";

/**
 * Where enquiries are sent.
 *
 * Set NEXT_PUBLIC_FORM_ENDPOINT to a URL that accepts a JSON POST — a Formspree
 * / Resend / Web3Forms endpoint, or your own API route. Until it is set the
 * form validates and formats the enquiry but tells the visitor plainly that it
 * has NOT been delivered, and offers email instead. It never fakes a success.
 *
 * See INTEGRATIONS.md for three worked options.
 */
const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "";
const fallbackEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "";

type Status = "idle" | "submitting" | "success" | "error" | "unconfigured";

type Fields = {
  fullName: string;
  email: string;
  destination: string;
  timing: string;
  guests: string;
  style: string;
  budget: string;
  message: string;
  consent: boolean;
  /** Honeypot — real people leave this empty. */
  company: string;
};

const initialFields: Fields = {
  fullName: "",
  email: "",
  destination: "",
  timing: "",
  guests: "",
  style: "",
  budget: "",
  message: "",
  consent: false,
  company: "",
};

const guestOptions = [
  "Under 50",
  "50 – 100",
  "100 – 200",
  "200 – 350",
  "350+",
  "Not sure yet",
];

const styleOptions = [
  "Spanish",
  "French-inspired",
  "Indian",
  "Multicultural — a combination",
  "Not sure yet",
];

const budgetOptions = [
  "Under €25,000",
  "€25,000 – €50,000",
  "€50,000 – €100,000",
  "€100,000 – €200,000",
  "€200,000+",
  "Prefer to discuss",
];

type Errors = Partial<Record<keyof Fields, string>>;

function validate(fields: Fields): Errors {
  const errors: Errors = {};

  if (!fields.fullName.trim()) {
    errors.fullName = "Please tell us your name.";
  }

  const email = fields.email.trim();
  if (!email) {
    errors.email = "Please add an email address so we can reply.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    errors.email = "That email address doesn’t look right.";
  }

  if (!fields.message.trim()) {
    errors.message = "A sentence or two about your celebration is enough.";
  } else if (fields.message.trim().length < 10) {
    errors.message = "Could you add a little more detail?";
  }

  if (!fields.consent) {
    errors.consent =
      "Please confirm you’re happy for us to use your details to reply.";
  }

  return errors;
}

/* ------------------------------------------------------------------ */

const fieldClass =
  "w-full rounded-[2px] border border-charcoal/20 bg-white px-4 py-3.5 font-sans text-[0.95rem] text-charcoal transition-colors duration-200 placeholder:text-charcoal/35 hover:border-charcoal/35 focus:border-olive focus:outline-none focus-visible:outline-2 focus-visible:outline-olive focus-visible:outline-offset-2 aria-[invalid=true]:border-[#9b4a3a]";

function Label({
  htmlFor,
  children,
  optional = false,
}: {
  htmlFor: string;
  children: React.ReactNode;
  optional?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2.5 flex items-baseline gap-2 font-sans text-[0.72rem] uppercase tracking-[0.16em] text-charcoal/70"
    >
      {children}
      {optional && (
        <span className="text-[0.62rem] normal-case tracking-normal text-charcoal/40">
          optional
        </span>
      )}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-[0.8rem] text-[#9b4a3a]">
      {message}
    </p>
  );
}

/* ------------------------------------------------------------------ */

export function EnquiryForm() {
  const uid = useId();
  const [fields, setFields] = useState<Fields>(initialFields);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  const fid = (name: string) => `${uid}-${name}`;
  const eid = (name: string) => `${uid}-${name}-error`;

  const update = <K extends keyof Fields>(name: K, value: Fields[K]) => {
    setFields((prev) => ({ ...prev, [name]: value }));
    if (submitted) {
      setErrors(validate({ ...fields, [name]: value }));
    }
  };

  const describedBy = (name: keyof Fields, extra?: string) =>
    [errors[name] ? eid(name) : null, extra].filter(Boolean).join(" ") ||
    undefined;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);

    const nextErrors = validate(fields);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const firstKey = Object.keys(nextErrors)[0];
      formRef.current
        ?.querySelector<HTMLElement>(`#${CSS.escape(fid(firstKey))}`)
        ?.focus();
      return;
    }

    // Bot submission — behave as if nothing happened.
    if (fields.company) return;

    if (!endpoint) {
      setStatus("unconfigured");
      statusRef.current?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: fields.fullName,
          email: fields.email,
          destination: fields.destination,
          timing: fields.timing,
          guests: fields.guests,
          weddingStyle: fields.style,
          budget: fields.budget,
          message: fields.message,
          consent: fields.consent,
          source: typeof window !== "undefined" ? window.location.href : "",
        }),
      });

      if (!response.ok) throw new Error(`Request failed (${response.status})`);

      setStatus("success");
      setFields(initialFields);
      setSubmitted(false);
      statusRef.current?.focus();
    } catch {
      setStatus("error");
      statusRef.current?.focus();
    }
  }

  const hasErrors = submitted && Object.keys(errors).length > 0;

  if (status === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="border border-olive/30 bg-sand-light p-9 sm:p-12"
      >
        <p className="eyebrow text-olive">Enquiry received</p>
        <h3 className="mt-5 font-display text-[2rem] leading-tight text-charcoal">
          Thank you — your enquiry is with us.
        </h3>
        <p className="mt-5 max-w-[48ch] text-[0.98rem] leading-relaxed text-charcoal-muted">
          We read every enquiry personally and will reply to the email address
          you gave us. If you need to add anything in the meantime, just reply
          to our message when it arrives.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 font-sans text-[0.75rem] uppercase tracking-[0.16em] text-charcoal underline decoration-1 underline-offset-[7px] hover:text-olive"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="w-full">
      {/* Honeypot */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor={fid("company")}>Company</label>
        <input
          id={fid("company")}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={fields.company}
          onChange={(event) => update("company", event.target.value)}
        />
      </div>

      {hasErrors && (
        <div
          role="alert"
          className="mb-8 border-l-2 border-[#9b4a3a] bg-[#9b4a3a]/5 px-5 py-4"
        >
          <p className="text-[0.9rem] text-[#9b4a3a]">
            There {Object.keys(errors).length === 1 ? "is" : "are"}{" "}
            {Object.keys(errors).length}{" "}
            {Object.keys(errors).length === 1 ? "field" : "fields"} to check
            before this can be sent.
          </p>
        </div>
      )}

      <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
        <div>
          <Label htmlFor={fid("fullName")}>Full name</Label>
          <input
            id={fid("fullName")}
            name="fullName"
            type="text"
            autoComplete="name"
            required
            value={fields.fullName}
            onChange={(event) => update("fullName", event.target.value)}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={describedBy("fullName")}
            className={fieldClass}
            placeholder="Your name"
          />
          <FieldError id={eid("fullName")} message={errors.fullName} />
        </div>

        <div>
          <Label htmlFor={fid("email")}>Email address</Label>
          <input
            id={fid("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={fields.email}
            onChange={(event) => update("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
            className={fieldClass}
            placeholder="you@example.com"
          />
          <FieldError id={eid("email")} message={errors.email} />
        </div>

        <div>
          <Label htmlFor={fid("destination")} optional>
            Preferred destination
          </Label>
          <input
            id={fid("destination")}
            name="destination"
            type="text"
            value={fields.destination}
            onChange={(event) => update("destination", event.target.value)}
            className={fieldClass}
            placeholder="Mallorca, Seville, still deciding…"
          />
        </div>

        <div>
          <Label htmlFor={fid("timing")} optional>
            Date or season
          </Label>
          <input
            id={fid("timing")}
            name="timing"
            type="text"
            value={fields.timing}
            onChange={(event) => update("timing", event.target.value)}
            className={fieldClass}
            placeholder="June 2027, or late spring"
          />
        </div>

        <div>
          <Label htmlFor={fid("guests")} optional>
            Guest count
          </Label>
          <select
            id={fid("guests")}
            name="guests"
            value={fields.guests}
            onChange={(event) => update("guests", event.target.value)}
            className={fieldClass}
          >
            <option value="">Select…</option>
            {guestOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label htmlFor={fid("style")} optional>
            Wedding style
          </Label>
          <select
            id={fid("style")}
            name="style"
            value={fields.style}
            onChange={(event) => update("style", event.target.value)}
            className={fieldClass}
          >
            <option value="">Select…</option>
            {styleOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor={fid("budget")} optional>
            Approximate budget
          </Label>
          <select
            id={fid("budget")}
            name="budget"
            value={fields.budget}
            onChange={(event) => update("budget", event.target.value)}
            aria-describedby={fid("budget-hint")}
            className={fieldClass}
          >
            <option value="">Select…</option>
            {budgetOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <p
            id={fid("budget-hint")}
            className="mt-2 text-[0.8rem] text-charcoal/50"
          >
            A rough range is enough. It helps us give you a useful first reply
            rather than a generic one.
          </p>
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor={fid("message")}>Your message</Label>
          <textarea
            id={fid("message")}
            name="message"
            rows={6}
            required
            value={fields.message}
            onChange={(event) => update("message", event.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={describedBy("message")}
            className={`${fieldClass} resize-y`}
            placeholder="Tell us about your celebration — where you’re thinking, who’s coming, and what matters most to you."
          />
          <FieldError id={eid("message")} message={errors.message} />
        </div>

        <div className="sm:col-span-2">
          <div className="flex items-start gap-3">
            <input
              id={fid("consent")}
              name="consent"
              type="checkbox"
              checked={fields.consent}
              onChange={(event) => update("consent", event.target.checked)}
              aria-invalid={Boolean(errors.consent)}
              aria-describedby={describedBy("consent")}
              className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-olive)]"
            />
            <label
              htmlFor={fid("consent")}
              className="text-[0.85rem] leading-relaxed text-charcoal-muted"
            >
              I’m happy for my details to be stored and used to respond to this
              enquiry, as described in the{" "}
              <Link
                href="/privacy"
                className="underline decoration-1 underline-offset-4 hover:text-olive"
              >
                privacy policy
              </Link>
              .
            </label>
          </div>
          <FieldError id={eid("consent")} message={errors.consent} />
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-7">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center gap-3 rounded-[2px] border border-charcoal bg-charcoal px-9 py-4 font-sans text-[0.78rem] uppercase tracking-[0.16em] text-ivory transition-colors duration-300 hover:border-olive hover:bg-olive disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" && (
            <span
              aria-hidden="true"
              className="h-3.5 w-3.5 animate-spin rounded-full border border-ivory/40 border-t-ivory"
            />
          )}
          {status === "submitting" ? "Sending…" : "Send enquiry"}
        </button>
        <p className="text-[0.8rem] leading-relaxed text-charcoal/50">
          We reply to every enquiry personally.
        </p>
      </div>

      {/* Status messages. Focusable so the outcome is announced. */}
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="focus:outline-none"
      >
        {status === "unconfigured" && (
          <div className="mt-8 border border-[#9b4a3a]/35 bg-[#9b4a3a]/5 p-6">
            <p className="eyebrow text-[#9b4a3a]">Not sent</p>
            <p className="mt-3 max-w-[56ch] text-[0.92rem] leading-relaxed text-charcoal/80">
              This form isn’t connected to an inbox yet, so{" "}
              <strong className="font-normal">
                your message has not been delivered
              </strong>
              . Nothing was sent and nothing was stored.
              {fallbackEmail ? (
                <>
                  {" "}
                  Please email{" "}
                  <a
                    href={`mailto:${fallbackEmail}`}
                    className="underline decoration-1 underline-offset-4 hover:text-olive"
                  >
                    {fallbackEmail}
                  </a>{" "}
                  in the meantime.
                </>
              ) : null}
            </p>
            <p className="mt-4 text-[0.78rem] leading-relaxed text-charcoal/50">
              Developer note: set <code className="font-mono">NEXT_PUBLIC_FORM_ENDPOINT</code>{" "}
              to enable delivery. See INTEGRATIONS.md.
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="mt-8 border border-[#9b4a3a]/35 bg-[#9b4a3a]/5 p-6">
            <p className="eyebrow text-[#9b4a3a]">Something went wrong</p>
            <p className="mt-3 max-w-[56ch] text-[0.92rem] leading-relaxed text-charcoal/80">
              Your enquiry didn’t go through. Please try again in a moment
              {fallbackEmail ? (
                <>
                  {" "}
                  — or email{" "}
                  <a
                    href={`mailto:${fallbackEmail}`}
                    className="underline decoration-1 underline-offset-4 hover:text-olive"
                  >
                    {fallbackEmail}
                  </a>{" "}
                  directly
                </>
              ) : null}
              .
            </p>
          </div>
        )}
      </div>
    </form>
  );
}
