"use client"

import { useActionState, useEffect, useRef, useState } from "react"
import { useFormStatus } from "react-dom"
import { VscTerminalBash } from "react-icons/vsc"
import { BsGithub, BsLinkedin } from "react-icons/bs"
import { HiOutlineMail } from "react-icons/hi"
import { useApp } from "@/context/AppProvider"
import { sendFooterEmail } from "@/app/actions/send-footer-email"

/* ================= TYPES ================= */

type FooterActionState =
  | { success: true }
  | { success: false; error: string }

/* ================= CONSTANTS ================= */

const COMMANDS = [
  "Booting global edge environment...",
  "Deploying services across regions...",
  "Latency optimized < 100ms worldwide",
  "Status: AVAILABLE",
]

const initialState: FooterActionState = {
  success: false,
  error: "",
}

/* ================= SUBMIT BUTTON ================= */

function SubmitButton({
  label,
  sending,
}: {
  label: string
  sending: string
}) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-6 w-full rounded-xl bg-emerald-400 text-black py-2 font-semibold transition
                 hover:bg-emerald-300 disabled:opacity-40 disabled:cursor-not-allowed
                 flex items-center justify-center gap-2"
    >
      {pending && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
      )}
      {pending ? sending : label}
    </button>
  )
}

/* ================= FOOTER ================= */

export default function Footer() {
  const { t } = useApp()
  const [line, setLine] = useState(0)
  const [state, formAction] = useActionState(sendFooterEmail, initialState)
  const formRef = useRef<HTMLFormElement>(null)

  /* terminal typing effect */
  useEffect(() => {
    if (line >= COMMANDS.length) return
    const timer = setTimeout(() => setLine((v) => v + 1), 900)
    return () => clearTimeout(timer)
  }, [line])

  /* reset form on success */
  useEffect(() => {
    if (state.success) {
      formRef.current?.reset()
    }
  }, [state.success])

  return (
    <footer className="relative overflow-hidden bg-black/10 border-t border-neutral-600/40">
      {/* ===== Ambient Background ===== */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-[600px] w-[600px] rounded-full bg-emerald-500/10 blur-[140px]" />
        <div className="absolute right-1/4 bottom-0 h-[600px] w-[600px] rounded-full bg-blue-500/10 blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto p-6">
        {/* ===== Terminal + Contact ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* ===== Terminal ===== */}
          <div>
            <div className="mb-10 flex items-center gap-3 text-emerald-400 font-mono text-sm">
              <VscTerminalBash className="text-xl" />
              <span>root@thuyamyint.dev</span>
              <span className="text-white/40">:</span>
              <span className="text-blue-400">~</span>
            </div>

            <div className="font-mono text-sm space-y-2 text-white/70">
              {COMMANDS.slice(0, line).map((cmd, i) => (
                <div key={i} className="flex gap-2">
                  <span className="text-emerald-400">$</span>
                  <span className="typing">{cmd}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ===== Contact Form ===== */}
          <form
            ref={formRef}
            action={formAction}
            className="relative rounded-2xl border border-neutral-600/40 bg-black/30 p-8"
          >
            {/* glow */}
            <div className="absolute -z-10 inset-0 rounded-2xl bg-gradient-to-br from-emerald-400/10 to-blue-400/10 blur-xl" />

            <h3 className="text-lg font-semibold mb-6">
              {t("connectViaDirect")}
            </h3>

            {/* Email */}
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              placeholder={t("email")}
              className="w-full rounded-xl bg-black/40 border border-neutral-600/40 px-4 py-2 outline-none transition focus:border-emerald-400/40"
            />

            {/* Message */}
            <label htmlFor="message" className="sr-only">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              placeholder={t("enterMessage")}
              className="mt-3 w-full rounded-xl bg-black/40 border border-neutral-600/40 px-4 py-2 outline-none transition focus:border-emerald-400/40"
            />

            {/* Honeypot */}
            <input
              name="company"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
            />

            <SubmitButton
              label={t("send")}
              sending={t("sending")}
            />

            {state.error && (
              <p className="text-center text-red-500/50 text-sm mt-2">
                {state.error}
              </p>
            )}

            {state.success && (
              <p className="text-center text-green-400/50 text-sm mt-2">
                {t("emailSent")}
              </p>
            )}

            <p className="mt-3 text-xs text-white/40 text-center">
              {`echo "Inbound connections accepted | SLA: 24h | Spam: dropped"`}
            </p>
          </form>
        </div>

        {/* ===== Identity + Actions ===== */}
        <div className="mt-24 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="space-y-3 text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-tight">
              {t("title")}
            </h2>
            <p className="text-white/60 max-w-md">
              {t("footerDescription")}
            </p>
            <p className="text-green-400">
              {`echo "Let’s build something that actually scales."`}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {[
              {
                href: "https://github.com/Thuya-Myint",
                label: "GitHub",
                icon: <BsGithub />,
              },
              {
                href: "https://www.linkedin.com/in/thuya-myint-28ba4639a/",
                label: "LinkedIn",
                icon: <BsLinkedin />,
              },
              {
                href: "https://mail.google.com/mail/?view=cm&to=thuyamyint2022@gmail.com",
                label: "Email",
                icon: <HiOutlineMail />,
              },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                aria-label={item.label}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-2 py-2 text-sm transition
                           hover:-translate-y-1 hover:bg-white/10 hover:shadow-lg"
              >
                {item.icon}
                {item.label}
              </a>
            ))}
          </div>
        </div>

        {/* ===== Availability ===== */}
        <div className="mt-16 text-center font-mono text-xs text-white/40">
          $ status --global{" "}
          <span className="text-emerald-400 animate-pulse">
            AVAILABLE · MULTI-REGION · LOW LATENCY █
          </span>
        </div>
      </div>
    </footer>
  )
}