"use client"

import { useState, useEffect, useMemo } from "react"
import { GROUPS, REMINDERS, DOMAINS, type Group, type Sub } from "./checklist-data"

// ── Types ─────────────────────────────────────────────────────────────────────

type CheckState = "done" | "na"
type Checks = Record<string, CheckState>
type Included = Record<string, boolean>

interface Stats {
  applicable: number
  done: number
  na: number
  openCount: number
  pct: number
  includedSubs: number
}

interface SubStats { app: number; done: number; total: number }

// ── Persistence ───────────────────────────────────────────────────────────────

const STORE_KEY = "tap-arc-v2"

function loadState(): { included: Included; checks: Checks } | null {
  if (typeof window === "undefined") return null
  try { const r = localStorage.getItem(STORE_KEY); return r ? JSON.parse(r) : null }
  catch { return null }
}
function saveState(s: { included: Included; checks: Checks }) {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(s)) } catch {}
}

// ── Print styles ──────────────────────────────────────────────────────────────

function PrintStyles() {
  return (
    <style>{`
      @media print {
        header, footer { display: none !important; }
        .cl-no-print { display: none !important; }
        .cl-print-only { display: block !important; }
        body { background: #fff !important; color: #111 !important; }
        .cl-tool-section { background: #fff !important; padding: 0 !important; border: none !important; }
        .cl-tool-grid { display: block !important; }
        .cl-rail { display: none !important; }
        .cl-summary {
          position: static !important; background: #fff !important;
          border: 1.5px solid #111 !important; margin-bottom: 16px !important;
          break-inside: avoid;
        }
        .cl-summary-actions { display: none !important; }
        .cl-summary-pct { color: #111 !important; }
        .cl-group { break-inside: auto; margin-top: 20px !important; }
        .cl-group-num, .cl-group-title { color: #111 !important; }
        .cl-group-title { font-size: 1.35rem !important; }
        .cl-sub { border: 1px solid #ccc !important; background: #fff !important; break-inside: avoid; margin-top: 10px !important; }
        .cl-sub-head { border-bottom: 1px solid #ccc !important; padding: 10px 14px !important; }
        .cl-sub-title { color: #111 !important; }
        .cl-sub-area { color: #555 !important; }
        .cl-item { padding: 7px 14px !important; break-inside: avoid; }
        .cl-item + .cl-item { border-top: 1px solid #e8e8e8 !important; }
        .cl-item-na { display: none !important; }
        .cl-item-text { color: #111 !important; font-size: 10pt !important; }
        .cl-check {
          width: 13px !important; height: 13px !important; flex-shrink: 0;
          border: 1.5px solid #111 !important; background: #fff !important; color: #111 !important;
        }
        .cl-na-btn { display: none !important; }
        a { color: #111 !important; }
      }
    `}</style>
  )
}

// ── ItemRow ───────────────────────────────────────────────────────────────────

function ItemRow({
  text, state, onToggle, onNa,
}: {
  text: string; state: CheckState | undefined; onToggle: () => void; onNa: () => void
}) {
  const isDone = state === "done"
  const isNa = state === "na"
  return (
    <li
      className={`cl-item grid gap-3 px-5 py-3.5 border-t border-white/10 first:border-t-0 transition-opacity ${isNa ? "cl-item-na opacity-40" : ""}`}
      style={{ gridTemplateColumns: "auto 1fr auto" }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={isDone}
        className={`cl-check mt-0.5 w-5 h-5 flex-shrink-0 flex items-center justify-center border transition-all ${
          isDone ? "bg-[#FFC700] border-[#FFC700]" : "bg-white/5 border-white/20 hover:border-[#FFC700]"
        }`}
      >
        {isDone && (
          <svg viewBox="0 0 16 16" width="10" height="10" aria-hidden="true">
            <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="#000" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
      <p
        className={`cl-item-text m-0 text-sm leading-relaxed ${
          isDone ? "text-white/35 line-through decoration-white/20" : isNa ? "text-white/25 line-through decoration-white/15" : "text-white/80"
        }`}
      >
        {text}
      </p>
      <button
        type="button"
        onClick={onNa}
        aria-pressed={isNa}
        className={`cl-na-btn flex-shrink-0 self-start mt-0.5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest border transition-all ${
          isNa
            ? "bg-white/50 text-black border-white/50"
            : "bg-transparent text-white/25 border-white/12 hover:border-white/35 hover:text-white/50"
        }`}
      >
        N/A
      </button>
    </li>
  )
}

// ── SubCard ───────────────────────────────────────────────────────────────────

function SubCard({
  sub, groupTitle, checks, setItem, stat, onlyOpen,
}: {
  sub: Sub; groupTitle: string; checks: Checks
  setItem: (key: string, val: CheckState) => void; stat: SubStats; onlyOpen: boolean
}) {
  const allDone = stat.app > 0 && stat.done === stat.app
  return (
    <article className="cl-sub border border-white/10 bg-card mt-3 first:mt-0" id={"sub-" + sub.id}>
      <div className="cl-sub-head flex items-center justify-between gap-4 px-5 py-4 border-b border-white/10">
        <div className="min-w-0">
          <div className="cl-sub-area block text-[10px] font-bold uppercase tracking-widest text-white/35 mb-1">{groupTitle}</div>
          <h4 className="cl-sub-title m-0 text-base font-semibold text-white leading-tight">{sub.title}</h4>
        </div>
        <div className={`text-right flex-shrink-0 ${allDone ? "text-[#FFC700]" : "text-white"}`}>
          <div className="font-mono text-2xl leading-none">
            {stat.done}<span className="text-white/25">/</span>{stat.app}
          </div>
          <div className={`text-[10px] uppercase tracking-widest mt-1 ${allDone ? "text-[#FFC700]" : "text-white/35"}`}>
            {allDone ? "Complete" : "In place"}
          </div>
        </div>
      </div>
      <ul className="m-0 p-0 list-none">
        {sub.items.map((text, i) => {
          const key = `${sub.id}:${i}`
          const st = checks[key]
          if (onlyOpen && (st === "done" || st === "na")) return null
          return (
            <ItemRow key={key} text={text} state={st}
              onToggle={() => setItem(key, "done")}
              onNa={() => setItem(key, "na")} />
          )
        })}
      </ul>
    </article>
  )
}

// ── Rail ──────────────────────────────────────────────────────────────────────

function Rail({
  groups, included, checks, toggleSub, setAllIncluded, stats, subStat, jumpTo, onlyOpen, setOnlyOpen,
}: {
  groups: Group[]; included: Included; checks: Checks
  toggleSub: (id: string) => void; setAllIncluded: (v: boolean) => void
  stats: Stats; subStat: (s: Sub) => SubStats
  jumpTo: (id: string) => void; onlyOpen: boolean; setOnlyOpen: (v: boolean) => void
}) {
  return (
    <aside className="cl-rail lg:sticky lg:top-20">
      <div className="border border-white/10 bg-card overflow-hidden">
        {/* Readiness meter */}
        <div className="p-5 border-b border-white/10">
          <div className="flex items-baseline justify-between mb-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/35">Readiness</span>
            <span className="font-mono text-3xl leading-none text-[#FFC700]">
              {stats.pct}<span className="text-sm">%</span>
            </span>
          </div>
          <div className="h-1.5 bg-white/10 overflow-hidden">
            <div className="h-full bg-[#FFC700] transition-all duration-300" style={{ width: `${stats.pct}%` }} />
          </div>
          <div className="flex justify-between mt-3 text-[10px] uppercase tracking-widest text-white/35">
            <span><b className="text-white font-bold">{stats.done}</b> done</span>
            <span><b className="text-white font-bold">{stats.openCount}</b> open</span>
            <span><b className="text-white font-bold">{stats.na}</b> N/A</span>
          </div>
        </div>

        {/* Controls */}
        <div className="p-4 border-b border-white/10 space-y-2">
          <div className="flex gap-2">
            <button type="button" onClick={() => setAllIncluded(true)}
              className="flex-1 py-1.5 text-[10px] font-bold uppercase tracking-widest border border-white/15 text-white/50 hover:text-white hover:border-white/30 transition-all">
              All
            </button>
            <button type="button" onClick={() => setAllIncluded(false)}
              className="flex-1 py-1.5 text-[10px] font-bold uppercase tracking-widest border border-white/15 text-white/50 hover:text-white hover:border-white/30 transition-all">
              Clear
            </button>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={onlyOpen} onChange={(e) => setOnlyOpen(e.target.checked)}
              className="w-3.5 h-3.5 accent-[#FFC700]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/35">Only open items</span>
          </label>
        </div>

        {/* Section list */}
        <div className="overflow-y-auto lg:max-h-[calc(100vh-340px)] max-h-72">
          {groups.map((g) => (
            <div key={g.id} className="border-b border-white/10 last:border-0 py-2">
              <div className="flex items-center gap-2 px-4 py-1">
                <span className="font-mono text-[10px] text-[#FFC700]">{g.num}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/25">{g.title}</span>
              </div>
              {g.subs.map((s) => {
                const on = included[s.id] ?? true
                const st = subStat(s)
                return (
                  <div key={s.id} className={`flex items-center gap-2.5 px-4 py-1 transition-opacity ${on ? "" : "opacity-40"}`}>
                    <button type="button" onClick={() => toggleSub(s.id)} aria-pressed={on}
                      className="relative flex-shrink-0 transition-colors"
                      style={{
                        width: 30, height: 16, borderRadius: 999,
                        background: on ? "#FFC700" : "rgba(255,255,255,0.15)",
                      }}>
                      <span className="absolute top-[2px] w-3 h-3 bg-white transition-transform"
                        style={{ borderRadius: "50%", transform: on ? "translateX(14px)" : "translateX(2px)" }} />
                    </button>
                    <button type="button" onClick={() => on && jumpTo(s.id)} disabled={!on}
                      className="flex items-center justify-between flex-1 min-w-0 text-left gap-1">
                      <span className={`text-xs font-medium truncate transition-colors ${on ? "text-white/70 hover:text-white" : "text-white/25"}`}>
                        {s.title}
                      </span>
                      <span className="font-mono text-[10px] text-white/25 flex-shrink-0">
                        {on ? `${st.done}/${st.app}` : st.total}
                      </span>
                    </button>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}

// ── SummaryBar ────────────────────────────────────────────────────────────────

function SummaryBar({ stats }: { stats: Stats }) {
  return (
    <div className="cl-summary sticky top-20 z-10 flex flex-wrap items-center justify-between gap-4 px-5 py-4 mb-5 border border-white/10 bg-black">
      <div className="flex items-center gap-4">
        <div className="cl-summary-pct font-mono text-4xl leading-none text-[#FFC700]">
          {stats.pct}<span className="text-sm">%</span>
        </div>
        <div>
          <div className="text-sm font-semibold text-white">
            {stats.done} of {stats.applicable} applicable checks in place
          </div>
          <div className="text-xs text-white/40 mt-0.5">
            {stats.includedSubs} sections · {stats.openCount} open · {stats.na} N/A
          </div>
        </div>
      </div>
      <div className="cl-summary-actions">
        <button type="button" onClick={() => window.print()}
          className="px-4 py-2 text-xs font-bold uppercase tracking-widest bg-white text-black hover:bg-white/90 transition-all">
          Print / Save PDF ↓
        </button>
      </div>
    </div>
  )
}

// ── ChecklistTool ─────────────────────────────────────────────────────────────

function ChecklistTool() {
  const allSubs = useMemo(() => GROUPS.flatMap((g) => g.subs), [])

  const [included, setIncluded] = useState<Included>(() => {
    const init: Included = {}
    GROUPS.flatMap((g) => g.subs).forEach((s) => { init[s.id] = true })
    return init
  })
  const [checks, setChecks] = useState<Checks>({})
  const [onlyOpen, setOnlyOpen] = useState(false)
  const [hydrated, setHydrated] = useState(false)
  const [printDate, setPrintDate] = useState("")

  useEffect(() => {
    const saved = loadState()
    if (saved?.included) setIncluded(saved.included)
    if (saved?.checks) setChecks(saved.checks)
    setHydrated(true)
    setPrintDate(new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }))
  }, [])

  useEffect(() => {
    if (hydrated) saveState({ included, checks })
  }, [included, checks, hydrated])

  const setItem = (key: string, val: CheckState) =>
    setChecks((c) => { const n = { ...c }; c[key] === val ? delete n[key] : (n[key] = val); return n })

  const toggleSub = (id: string) => setIncluded((m) => ({ ...m, [id]: !m[id] }))

  const setAllIncluded = (val: boolean) => {
    const m: Included = {}
    allSubs.forEach((s) => { m[s.id] = val })
    setIncluded(m)
  }

  const stats = useMemo<Stats>(() => {
    let applicable = 0, done = 0, na = 0, openCount = 0
    allSubs.forEach((s) => {
      if (!included[s.id]) return
      s.items.forEach((_, i) => {
        const st = checks[`${s.id}:${i}`]
        if (st === "na") { na++; return }
        applicable++
        if (st === "done") done++; else openCount++
      })
    })
    return {
      applicable, done, na, openCount,
      pct: applicable ? Math.round((done / applicable) * 100) : 0,
      includedSubs: allSubs.filter((s) => included[s.id]).length,
    }
  }, [allSubs, included, checks])

  const subStat = (s: Sub): SubStats => {
    let app = 0, done = 0
    s.items.forEach((_, i) => {
      const st = checks[`${s.id}:${i}`]
      if (st === "na") return
      app++; if (st === "done") done++
    })
    return { app, done, total: s.items.length }
  }

  const jumpTo = (id: string) => {
    const el = document.getElementById("sub-" + id)
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 88, behavior: "smooth" })
  }

  useEffect(() => {
    (window as Window & { __jumpToGroup?: (gid: string) => void }).__jumpToGroup = (gid: string) => {
      const g = GROUPS.find((x) => x.id === gid)
      if (!g) return
      const el = document.getElementById("checklist")
      if (el) {
        window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" })
        setTimeout(() => jumpTo(g.subs[0].id), 380)
      }
    }
  }, [])

  return (
    <section className="cl-tool-section py-20 bg-black border-t border-white/10" id="checklist">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="cl-no-print max-w-2xl mb-12">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#FFC700] mb-4">Interactive checklist</p>
          <h2 className="text-3xl font-bold text-white mb-3">Build your readiness checklist.</h2>
          <p className="text-white/60 leading-relaxed text-sm">
            Turn off sections that don&apos;t apply, check off what&apos;s in place, and mark anything irrelevant as N/A.
            Progress saves in this browser. Print or save a tailored PDF of only your selected sections.
          </p>
        </div>

        {/* Print-only header */}
        <div className="cl-print-only hidden">
          <div style={{ borderBottom: "2px solid #111", paddingBottom: 10, marginBottom: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 15, letterSpacing: 2, color: "#111", textTransform: "uppercase" }}>
              TechAccountingPro
            </div>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginTop: 4 }}>
              <span style={{ fontWeight: 700, fontSize: 12, color: "#111" }}>Audit Readiness Checklist — Web3 Startups</span>
              <span style={{ fontSize: 9, color: "#555" }}>Prepared {printDate}</span>
            </div>
          </div>
        </div>

        <div className="cl-tool-grid grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] gap-6">
          <Rail groups={GROUPS} included={included} checks={checks}
            toggleSub={toggleSub} setAllIncluded={setAllIncluded}
            stats={stats} subStat={subStat} jumpTo={jumpTo}
            onlyOpen={onlyOpen} setOnlyOpen={setOnlyOpen} />

          <main className="min-w-0">
            <SummaryBar stats={stats} />

            {stats.includedSubs === 0 && (
              <div className="text-center py-16 border border-white/10">
                <p className="text-white/30 text-xs font-bold uppercase tracking-widest mb-1">No sections selected</p>
                <p className="text-white/40 text-sm">Turn sections on from the panel on the left.</p>
              </div>
            )}

            {GROUPS.map((g) => {
              const visible = g.subs.filter((s) => included[s.id])
              if (!visible.length) return null
              return (
                <div key={g.id} className="cl-group mt-10 first:mt-0" id={"group-" + g.id}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="cl-group-num font-mono text-xs text-[#FFC700]">{g.num}</span>
                    <h3 className="cl-group-title m-0 text-2xl font-bold text-white">{g.title}</h3>
                    <div className="flex-1 h-px bg-white/10" />
                  </div>
                  {visible.map((s) => (
                    <SubCard key={s.id} sub={s} groupTitle={g.title}
                      checks={checks} setItem={setItem} stat={subStat(s)} onlyOpen={onlyOpen} />
                  ))}
                </div>
              )
            })}
          </main>
        </div>
      </div>
    </section>
  )
}

// ── Hero card ─────────────────────────────────────────────────────────────────

function HeroCard() {
  const rows = [
    { label: "Revenue recognition", status: "Documented", cls: "text-green-400 border-green-400/30" },
    { label: "Digital asset custody", status: "In review", cls: "text-[#FFC700] border-[#FFC700]/30" },
    { label: "Internal controls", status: "Gaps found", cls: "text-red-400 border-red-400/30" },
    { label: "Reporting & tie-out", status: "Documented", cls: "text-green-400 border-green-400/30" },
  ]
  return (
    <div className="border border-white/10 bg-card p-5">
      <div className="flex justify-between items-center mb-3">
        <span className="text-[10px] font-bold uppercase tracking-widest text-white/35">Readiness</span>
        <span className="text-[10px] font-bold uppercase tracking-widest border border-[#FFC700]/40 text-[#FFC700] px-2 py-0.5">
          In progress
        </span>
      </div>
      <div className="flex items-baseline gap-3 mb-3">
        <span className="font-mono text-5xl leading-none text-[#FFC700]">68%</span>
        <span className="text-xs text-white/35">90 of 132 checks</span>
      </div>
      <div className="h-1.5 bg-white/10 mb-5">
        <div className="h-full bg-[#FFC700]" style={{ width: "68%" }} />
      </div>
      {rows.map(({ label, status, cls }) => (
        <div key={label} className="flex justify-between items-center py-2.5 border-b border-white/10 last:border-0 text-sm">
          <span className="text-white/80 font-medium">{label}</span>
          <span className={`text-[10px] font-bold uppercase tracking-widest border px-2 py-0.5 ${cls}`}>{status}</span>
        </div>
      ))}
      <p className="text-xs text-white/35 mt-4 leading-relaxed">
        Toggle sections that apply to your entity, check off what&apos;s in place, and print a tailored gap list.
      </p>
    </div>
  )
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function HeroSection({
  totalItems, totalSubs, totalGroups, onStart,
}: { totalItems: number; totalSubs: number; totalGroups: number; onStart: () => void }) {
  return (
    <section className="cl-no-print pt-32 pb-20 bg-black" id="top">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block bg-[#FFC700] text-black text-[10px] font-bold uppercase tracking-widest px-2.5 py-1.5 mb-6">
              Audit readiness · Web3 startups
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Audit readiness<br />checklist for<br />
              <span className="text-[#FFC700]">web3 startups.</span>
            </h1>
            <p className="text-lg text-white/60 leading-relaxed mb-8 max-w-lg">
              A practitioner&apos;s checklist that helps Web3 finance leaders prepare for financial statement audits —
              surfacing missing documentation, unclear policies, and weak controls before they turn into audit overages
              and re-audits.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              <button type="button" onClick={onStart}
                className="px-6 py-3 bg-white text-black font-bold text-sm hover:bg-white/90 transition-all">
                Build your checklist →
              </button>
              <button type="button" onClick={() => window.print()}
                className="px-6 py-3 border border-white/20 text-white font-bold text-sm hover:bg-white/5 transition-all">
                Print / Save as PDF ↓
              </button>
            </div>
            <div className="flex flex-wrap gap-10 pt-8 border-t border-white/10">
              {[
                { value: totalItems, label: "Readiness checks" },
                { value: totalSubs, label: "Functional sections" },
                { value: totalGroups, label: "Risk areas" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div className="font-mono text-3xl font-bold text-[#FFC700] mb-1 leading-none">{value}</div>
                  <div className="text-[10px] uppercase tracking-widest text-white/35 mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <HeroCard />
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Proof bar ─────────────────────────────────────────────────────────────────

function ProofBar() {
  return (
    <div className="cl-no-print py-5 border-y border-white/10 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/25 whitespace-nowrap mr-1">Covers</span>
          {DOMAINS.map((d) => (
            <span key={d} className="text-[10px] font-bold uppercase tracking-widest border border-white/10 text-white/35 px-2 py-1">
              {d}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── What's inside ─────────────────────────────────────────────────────────────

function WhatsInside() {
  const jump = (gid: string) => {
    const fn = (window as Window & { __jumpToGroup?: (id: string) => void }).__jumpToGroup
    if (fn) fn(gid)
  }
  return (
    <section className="cl-no-print py-20 bg-black" id="inside">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#FFC700] mb-4">How to use this</p>
          <h2 className="text-3xl font-bold text-white mb-4">Six functional areas. One readiness picture.</h2>
          <p className="text-white/60 leading-relaxed text-sm">
            Many Web3 startups discover during their first audit that missing documentation, unclear accounting policies,
            or weak internal controls significantly increase audit costs. Work through each area — keep what applies, skip what doesn&apos;t.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {GROUPS.map((g) => {
            const count = g.subs.reduce((n, s) => n + s.items.length, 0)
            return (
              <button key={g.id} type="button" onClick={() => jump(g.id)}
                className="text-left border border-white/10 bg-card hover:border-white/25 transition-all group">
                <div className="flex items-center justify-between p-5 border-b border-white/10">
                  <span className="font-mono text-4xl font-bold text-white/10 group-hover:text-[#FFC700] transition-colors">
                    {g.num}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/25">{count} checks</span>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-white mb-2">{g.title}</h3>
                  <p className="text-sm text-white/45 mb-4 leading-relaxed">{g.blurb}</p>
                  <div className="flex flex-wrap gap-0.5">
                    {g.subs.map((s, i) => (
                      <span key={s.id} className="text-[10px] text-white/25">
                        {s.title}{i < g.subs.length - 1 ? " ·" : ""}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ── Reminders ─────────────────────────────────────────────────────────────────

function RemindersSection() {
  return (
    <section className="cl-no-print py-20 bg-card border-t border-white/10" id="reminders">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#FFC700] mb-4">Before you begin</p>
            <h2 className="text-3xl font-bold text-white mb-4">Seven reminders for management.</h2>
            <p className="text-white/60 leading-relaxed text-sm">
              Responsibility for the financial statements ultimately lies with management.
              These principles set the tone before any box is checked.
            </p>
          </div>
          <div className="lg:col-span-3">
            {REMINDERS.map((r, i) => (
              <div key={r.h} className="grid gap-4 py-5 border-t border-white/10 first:border-0 first:pt-0"
                style={{ gridTemplateColumns: "2rem 1fr" }}>
                <span className="font-mono text-xs text-[#FFC700] pt-0.5">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <div className="text-sm font-bold text-white uppercase tracking-wide mb-1">{r.h}</div>
                  <p className="text-sm text-white/45 m-0 leading-relaxed">{r.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── CTA ───────────────────────────────────────────────────────────────────────

function CtaSection() {
  return (
    <section className="cl-no-print py-20 bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="border border-white/10 p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-lg">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#FFC700] mb-4">Helping accountants get it right</p>
            <h2 className="text-2xl font-bold text-white mb-3">Found gaps you&apos;d rather close before the auditors do?</h2>
            <p className="text-white/60 text-sm leading-relaxed">
              We write accounting memos, run readiness gap analyses, and implement crypto subledgers for validators,
              DAOs, token issuers, and foundations preparing for audit or IPO.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 flex-shrink-0">
            <a href="https://techaccountingpro.com" target="_blank" rel="noreferrer"
              className="px-6 py-3 bg-white text-black font-bold text-sm hover:bg-white/90 transition-all">
              Talk to TAP
            </a>
            <button type="button" onClick={() => window.print()}
              className="px-6 py-3 border border-white/20 text-white font-bold text-sm hover:bg-white/5 transition-all">
              Print your checklist ↓
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ChecklistClient() {
  const totalItems = GROUPS.reduce((n, g) => n + g.subs.reduce((m, s) => m + s.items.length, 0), 0)
  const totalSubs = GROUPS.reduce((n, g) => n + g.subs.length, 0)

  const handleStart = () => {
    const el = document.getElementById("checklist")
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" })
  }

  return (
    <div className="bg-black">
      <PrintStyles />
      <HeroSection totalItems={totalItems} totalSubs={totalSubs} totalGroups={GROUPS.length} onStart={handleStart} />
      <ProofBar />
      <WhatsInside />
      <ChecklistTool />
      <RemindersSection />
      <CtaSection />
    </div>
  )
}
