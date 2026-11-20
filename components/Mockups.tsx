import { useId, type CSSProperties, type ReactNode } from "react";
import { F, T } from "@/components/figma";
import Icon, { type IconName } from "@/components/Icon";

/*
 * The product mockups from the Figma "Components" page, drawn in HTML at their
 * Figma pixel sizes (windows are 640x440). They are illustrations: every figure
 * is sample data, each window says so, and callers wrap them in aria-hidden.
 * Where the page needs one smaller, it scales the whole thing with CSS `zoom`.
 */

/* ---------- shared bits ---------- */

type Tone = "ok" | "warn" | "info" | "neutral" | "white";
const TONES: Record<Tone, [bg: string, fg: string]> = {
  ok: ["ok-soft", "#067647"],
  warn: ["warn-soft", "#B54708"],
  info: ["tint", "accent"],
  neutral: ["bg2", "body"],
  white: ["white", "body"],
};

export function Pill({ tone = "info", children }: { tone?: Tone; children: ReactNode }) {
  const [bg, fg] = TONES[tone];
  return (
    <F d="H" p={[3, 8]} r={999} ai="CENTER" fill={bg}>
      <T s="ui-s" c={fg}>
        {children}
      </T>
    </F>
  );
}

function Avatar({ size, bg = "soft", fg = "accent", style, children }: { size: number; bg?: string; fg?: string; style?: CSSProperties; children: string }) {
  return (
    <F w={size} h={size} r={999} ai="CENTER" ji="CENTER" fill={bg} style={style}>
      <T s={size > 30 ? "ui-m" : "ui-xs"} c={fg}>
        {children}
      </T>
    </F>
  );
}

function IconTile({ name, size, icon, r = 8, fill = "accent", c = "white" }: { name: IconName; size: number; icon: number; r?: number; fill?: string; c?: string }) {
  return (
    <F w={size} h={size} r={r} ai="CENTER" ji="CENTER" fill={fill}>
      <Icon name={name} size={icon} c={c} />
    </F>
  );
}

function SmallButton({ primary, children }: { primary?: boolean; children: string }) {
  return (
    <F d="H" p={[7, 12]} r={8} ai="CENTER" fill={primary ? "accent" : "white"} stroke={primary ? undefined : "line-strong"}>
      <T s="ui-s" c={primary ? "white" : "heading"}>
        {children}
      </T>
    </F>
  );
}

function Bar({ w, h, value, fill = "accent" }: { w: number; h: number; value: number; fill?: string }) {
  return (
    <F w={w} h={h} r={3} fill="line" clip>
      <F w={Math.max(4, (w * value) / 100)} h={h} r={3} fill={fill} />
    </F>
  );
}

function Kpi({ label, value, delta, tone }: { label: string; value: string; delta: string; tone: Tone }) {
  return (
    <F g={6} p={12} r={12} w="fill" fill="white" stroke="line">
      <T s="ui-s" c="body">
        {label}
      </T>
      <T s="ui-val">{value}</T>
      <Pill tone={tone}>{delta}</Pill>
    </F>
  );
}

/** A window frame: 640 wide, rounded, hairline stroke, large shadow. */
function Win({ d = "H", h = 440, fill = "white", children }: { d?: "H" | "V"; h?: number; fill?: string; children: ReactNode }) {
  return (
    <F d={d} w={640} h={h} r={16} fill={fill} stroke="line" clip shadow="lg" className="mock">
      {children}
    </F>
  );
}

/* ---------- charts ---------- */

/** Smooth line through the points (Catmull-Rom to bezier), same curve the Figma chart uses. */
function curve(pts: number[][]) {
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(i - 1, 0)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(i + 2, pts.length - 1)];
    d += ` C${(p1[0] + (p2[0] - p0[0]) / 6).toFixed(1)} ${(p1[1] + (p2[1] - p0[1]) / 6).toFixed(1)} ${(p2[0] - (p3[0] - p1[0]) / 6).toFixed(1)} ${(p2[1] - (p3[1] - p1[1]) / 6).toFixed(1)} ${p2[0]} ${p2[1]}`;
  }
  return d;
}

type ChartProps = { w: number; h: number; vals: number[]; grid?: number; small?: boolean };

export function LineChart({ w, h, vals, grid = 0, small }: ChartProps) {
  const id = useId();
  const [px, py, sw, dot, dotSw] = small ? [5, 6, 2, 3, 2] : [6, 8, 2.5, 4, 2.5];
  const mx = Math.max(...vals);
  const mn = Math.min(...vals);
  const pts = vals.map((v, i) => [
    +(px + (i * (w - 2 * px)) / (vals.length - 1)).toFixed(1),
    +(py + (h - 2 * py) * (1 - (v - mn) / (mx - mn || 1))).toFixed(1),
  ]);
  const line = curve(pts);
  const last = pts[pts.length - 1];
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" style={{ flex: "none" }}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: "var(--accent)", stopOpacity: 0.26 }} />
          <stop offset="1" style={{ stopColor: "var(--accent)", stopOpacity: 0 }} />
        </linearGradient>
      </defs>
      {Array.from({ length: grid }, (_, i) => {
        const y = (py + (i * (h - 2 * py)) / (grid - 1)).toFixed(1);
        return <path key={y} d={`M0 ${y} H${w}`} stroke="var(--line)" />;
      })}
      <path d={`${line} L${last[0]} ${h} L${pts[0][0]} ${h} Z`} fill={`url(#${id})`} />
      <path d={line} stroke="var(--accent)" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={last[0]} cy={last[1]} r={dot} fill="#fff" stroke="var(--accent)" strokeWidth={dotSw} />
    </svg>
  );
}

/** A ring cut into arcs. `inner` is the hole as a share of the radius, as Figma stores it. */
function Ring({ size, inner, segs, gap = 0 }: { size: number; inner: number; segs: [share: number, color: string][]; gap?: number }) {
  const thick = (size / 2) * (1 - inner);
  const r = size / 2 - thick / 2;
  const turns = segs.map(([share]) => share);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" style={{ flex: "none" }}>
      {segs.map(([share, color], i) => {
        const start = turns.slice(0, i).reduce((a, b) => a + b, 0) * 2 * Math.PI + gap;
        const sweep = share * 2 * Math.PI - 2 * gap;
        return (
          <circle
            key={i}
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke={`var(--${color})`}
            strokeWidth={thick}
            strokeDasharray={`${(sweep * r).toFixed(2)} ${(2 * Math.PI * r).toFixed(2)}`}
            transform={`rotate(${((start * 180) / Math.PI - 90).toFixed(2)} ${size / 2} ${size / 2})`}
          />
        );
      })}
    </svg>
  );
}

/* ---------- product mockups ---------- */

const TEAM: [initials: string, role: string, zone: string][] = [
  ["AK", "Front desk", "Eastern"],
  ["SM", "Bookkeeping", "Eastern"],
  ["RH", "Paralegal", "Central"],
  ["NA", "Guest support", "Pacific"],
];

export function OpsDashboard() {
  const nav: IconName[] = ["home", "inbox", "users", "barChart", "sliders"];
  return (
    <Win>
      <F g={14} p={[16, 0]} w={60} h="fill" ai="CENTER" fill="navy">
        <F w={30} h={30} r={8} ai="CENTER" ji="CENTER" fill="accent">
          <T s="ui-m" c="white">
            V
          </T>
        </F>
        {nav.map((name, i) => (
          <F key={name} w={34} h={34} r={8} ai="CENTER" ji="CENTER" fill={i ? undefined : "navy2"}>
            <Icon name={name} size={16} c={i ? "on-navy" : "white"} />
          </F>
        ))}
      </F>
      <F w="fill" h="fill" fill="bg2">
        <F d="H" ai="CENTER" ji="SPACE_BETWEEN" p={[12, 20]} w="fill" fill="white" stroke="line" edge="bottom">
          <F g={1}>
            <T s="ui-m">Operations overview</T>
            <T s="ui-xs" c="body">
              All teams, this week
            </T>
          </F>
          <F d="H" g={8} ai="CENTER">
            <Pill tone="neutral">Sample data</Pill>
            <F d="H" g={6} ai="CENTER" p={[6, 10]} r={999} w={120} fill="bg2">
              <Icon name="search" size={12} c="muted" />
              <T s="ui-s" c="muted">
                Search
              </T>
            </F>
            <Avatar size={26} bg="accent" fg="white">
              VS
            </Avatar>
          </F>
        </F>
        <F g={12} p={[16, 20, 20, 20]} w="fill" h="fill">
          <F d="H" g={12} w="fill">
            <Kpi label="Tickets resolved" value="1,284" delta="+12%" tone="ok" />
            <Kpi label="First response" value="2m 14s" delta="18s faster" tone="ok" />
            <Kpi label="SLA met" value="98.6%" delta="On target" tone="info" />
            <Kpi label="Hours covered" value="312h" delta="7 day cover" tone="info" />
          </F>
          <F d="H" g={12} w="fill" h="fill">
            <F g={10} p={14} r={12} w="fill" h="fill" fill="white" stroke="line">
              <F d="H" ai="CENTER" ji="SPACE_BETWEEN" w="fill">
                <T s="ui-m">Work completed</T>
                <F d="H" g={6} ai="CENTER">
                  <F w={6} h={6} r={999} fill="accent" />
                  <T s="ui-xs" c="body">
                    Tasks per day
                  </T>
                </F>
              </F>
              <LineChart w={316} h={124} vals={[42, 48, 45, 58, 54, 66, 62, 74, 70, 82, 78, 90]} grid={4} />
              <F d="H" ji="SPACE_BETWEEN" w="fill">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                  <T key={day} s="ui-xs" c="muted">
                    {day}
                  </T>
                ))}
              </F>
            </F>
            <F g={10} p={14} r={12} w={184} h="fill" fill="white" stroke="line">
              <F d="H" ai="CENTER" ji="SPACE_BETWEEN" w="fill">
                <T s="ui-m">On shift now</T>
                <Pill tone="ok">4 live</Pill>
              </F>
              {TEAM.map(([initials, role, zone]) => (
                <F key={initials} d="H" g={8} ai="CENTER" w="fill">
                  <Avatar size={24}>{initials}</Avatar>
                  <F w="fill">
                    <T s="ui-s">{role}</T>
                    <T s="ui-xs" c="body">
                      {zone} hours
                    </T>
                  </F>
                  <F w={7} h={7} r={999} fill="ok" />
                </F>
              ))}
            </F>
          </F>
        </F>
      </F>
    </Win>
  );
}

const TICKETS: [initials: string, subject: string, preview: string, age: string][] = [
  ["JD", "Reschedule visit", "Is Friday morning possible?", "2m"],
  ["MP", "Invoice question", "Can you resend the March bill?", "14m"],
  ["TL", "Insurance check", "Does my plan cover this?", "31m"],
  ["RC", "New client intake", "Form attached for review.", "1h"],
  ["EW", "Portal login help", "I cannot reset my password.", "2h"],
];

function Bubble({ out, children }: { out?: boolean; children: string }) {
  const bubble = (
    <F p={[9, 12]} r={12} fill={out ? "accent" : "white"} stroke={out ? undefined : "line"}>
      <T s="ui-s" c={out ? "white" : "heading"} w={children.length > 40 ? 230 : undefined}>
        {children}
      </T>
    </F>
  );
  return out ? (
    <F d="H" w="fill" ji="MAX">
      {bubble}
    </F>
  ) : (
    <F d="H" g={8} ai="MAX" w="fill">
      <Avatar size={24}>JD</Avatar>
      {bubble}
    </F>
  );
}

function Composer({ placeholder }: { placeholder: string }) {
  return (
    <F d="H" g={8} ai="CENTER" p={[10, 14]} w="fill" fill="white" stroke="line" edge="top">
      <F d="H" p={[8, 12]} r={8} w="fill" fill="bg2">
        <T s="ui-s" c="muted">
          {placeholder}
        </T>
      </F>
      <IconTile name="send" size={32} icon={14} />
    </F>
  );
}

export function SupportConsole() {
  return (
    <Win>
      <F w={232} h="fill" fill="white" stroke="line" edge="right">
        <F d="H" ai="CENTER" ji="SPACE_BETWEEN" p={[14, 16]} w="fill">
          <T s="ui-m">Inbox</T>
          <Pill>12 open</Pill>
        </F>
        <F d="H" p={[0, 16, 10, 16]} w="fill">
          <F d="H" g={6} ai="CENTER" p={[7, 10]} r={8} w="fill" fill="bg2">
            <Icon name="search" size={12} c="muted" />
            <T s="ui-s" c="muted">
              Search tickets
            </T>
          </F>
        </F>
        {TICKETS.map(([initials, subject, preview, age], i) => (
          <F key={initials} d="H" g={10} p={[10, 16]} w="fill" fill={i ? undefined : "tint"}>
            <Avatar size={28} bg={i ? "soft" : "accent"} fg={i ? "accent" : "white"}>
              {initials}
            </Avatar>
            <F g={2} w="fill">
              <F d="H" ji="SPACE_BETWEEN" ai="CENTER" w="fill">
                <T s="ui-s">{subject}</T>
                <T s="ui-xs" c="muted">
                  {age}
                </T>
              </F>
              <T s="ui-xs" c="body">
                {preview}
              </T>
            </F>
          </F>
        ))}
      </F>
      <F w="fill" h="fill" fill="bg2">
        <F d="H" ai="CENTER" ji="SPACE_BETWEEN" p={[12, 18]} w="fill" fill="white" stroke="line" edge="bottom">
          <F g={1}>
            <T s="ui-m">Reschedule visit</T>
            <T s="ui-xs" c="body">
              Clinic front desk, ticket 4821
            </T>
          </F>
          <F d="H" g={6} ai="CENTER">
            <Pill tone="ok">SLA 42m left</Pill>
            <Pill>Open</Pill>
          </F>
        </F>
        <F g={12} p={18} w="fill" h="fill">
          <Bubble>Hi, I need to move my Thursday appointment. Is Friday morning possible?</Bubble>
          <Bubble out>Of course. I have 10:30 or 11:15 on Friday. Which works better?</Bubble>
          <Bubble>10:30 please.</Bubble>
          <F g={3} p={[9, 12]} r={12} w="fill" fill="warn-soft">
            <T s="ui-xs" c="#B54708">
              Internal note
            </T>
            <T s="ui-s" c="#93370D" w="fill">
              Calendar updated. Reminder set for Thursday at 4 PM.
            </T>
          </F>
        </F>
        <Composer placeholder="Write a reply" />
      </F>
    </Win>
  );
}

const WEEKS = [
  [52, 30],
  [60, 36],
  [48, 42],
  [72, 40],
  [66, 50],
  [84, 46],
  [78, 58],
  [96, 62],
];

const SOURCES: [name: string, share: number, color: string][] = [
  ["Search", 0.42, "accent"],
  ["Social", 0.24, "light"],
  ["Email", 0.18, "soft"],
  ["Ads", 0.16, "line-strong"],
];

export function MarketingAnalytics() {
  return (
    <Win d="V" fill="bg2">
      <F d="H" ai="CENTER" ji="SPACE_BETWEEN" p={[12, 20]} w="fill" fill="white" stroke="line" edge="bottom">
        <F g={1}>
          <T s="ui-m">Campaign performance</T>
          <T s="ui-xs" c="body">
            All channels, tied to pipeline
          </T>
        </F>
        <F d="H" g={8} ai="CENTER">
          <Pill tone="neutral">Sample data</Pill>
          <F d="H" g={6} ai="CENTER" p={[6, 10]} r={8} fill="white" stroke="line">
            <Icon name="calendar" size={12} c="body" />
            <T s="ui-s">Last 30 days</T>
          </F>
        </F>
      </F>
      <F g={12} p={[16, 20, 20, 20]} w="fill" h="fill">
        <F d="H" g={12} w="fill">
          <Kpi label="Qualified leads" value="482" delta="+14% vs prior" tone="ok" />
          <Kpi label="Cost per lead" value="$31.40" delta="8% lower" tone="ok" />
          <Kpi label="Pipeline influenced" value="$184k" delta="+22% vs prior" tone="ok" />
        </F>
        <F d="H" g={12} w="fill" h="fill">
          <F g={10} p={14} r={12} w="fill" h="fill" fill="white" stroke="line">
            <F d="H" ai="CENTER" ji="SPACE_BETWEEN" w="fill">
              <T s="ui-m">Leads by week</T>
              <F d="H" g={10} ai="CENTER">
                {[
                  ["accent", "Organic"],
                  ["soft", "Paid"],
                ].map(([color, label]) => (
                  <F key={label} d="H" g={5} ai="CENTER">
                    <F w={6} h={6} r={999} fill={color} />
                    <T s="ui-xs" c="body">
                      {label}
                    </T>
                  </F>
                ))}
              </F>
            </F>
            <F d="H" g={8} ai="MAX" w="fill" h="fill">
              {WEEKS.map(([organic, paid], i) => (
                <F key={i} g={6} ai="CENTER" ji="MAX" w="fill" h="fill">
                  <F d="H" g={3} ai="MAX">
                    <F w={9} h={organic} r={3} fill="accent" />
                    <F w={9} h={paid} r={3} fill="soft" />
                  </F>
                  <T s="ui-xs" c="muted">
                    W{i + 1}
                  </T>
                </F>
              ))}
            </F>
          </F>
          <F g={12} p={14} r={12} w={196} h="fill" fill="white" stroke="line" ai="CENTER">
            <F d="H" w="fill">
              <T s="ui-m">Source mix</T>
            </F>
            <div className="donut">
              <Ring size={92} inner={0.7} gap={0.03} segs={SOURCES.map(([, share, color]) => [share, color])} />
              <T s="ui-val">482</T>
            </div>
            <F g={5} w="fill">
              {SOURCES.map(([name, share, color]) => (
                <F key={name} d="H" ji="SPACE_BETWEEN" ai="CENTER" w="fill">
                  <F d="H" g={6} ai="CENTER">
                    <F w={6} h={6} r={999} fill={color} />
                    <T s="ui-s" c="body">
                      {name}
                    </T>
                  </F>
                  <T s="ui-s">{Math.round(share * 100)}%</T>
                </F>
              ))}
            </F>
          </F>
        </F>
      </F>
    </Win>
  );
}

const WORKFLOW: [title: string, sub: string, state: "done" | "active" | "todo"][] = [
  ["Form received", "From client portal", "done"],
  ["Fields extracted", "14 of 16 complete", "done"],
  ["Person reviews", "Assigned to reviewer", "active"],
  ["Filed to case system", "Waiting on approval", "todo"],
];

export function AiAssistant() {
  return (
    <Win>
      <F w="fill" h="fill" fill="bg2">
        <F d="H" ai="CENTER" ji="SPACE_BETWEEN" p={[12, 18]} w="fill" fill="white" stroke="line" edge="bottom">
          <F d="H" g={10} ai="CENTER">
            <IconTile name="sparkles" size={30} icon={15} />
            <F g={1}>
              <T s="ui-m">Document assistant</T>
              <T s="ui-xs" c="body">
                Works from your runbook
              </T>
            </F>
          </F>
          <Pill tone="neutral">Sample data</Pill>
        </F>
        <F g={10} p={[14, 18]} w="fill" h="fill">
          <F d="H" w="fill" ji="MAX">
            <F p={[9, 12]} r={12} fill="accent">
              <T s="ui-s" c="white" w={236}>
                Draft a reply for this intake form and flag anything missing.
              </T>
            </F>
          </F>
          <F g={8} p={12} r={12} w={330} fill="white" stroke="line" shadow="sm">
            <F d="H" g={6} ai="CENTER">
              <Icon name="sparkles" size={13} c="accent" />
              <T s="ui-m">Draft ready for review</T>
            </F>
            <T s="ui-s" c="body" w="fill">
              Reply drafted from the new client template. Two items need a person before it goes out.
            </T>
            {["Insurance ID is missing", "Signature date does not match"].map((issue) => (
              <F key={issue} d="H" g={8} ai="CENTER" p={[6, 10]} r={8} w="fill" fill="warn-soft">
                <Icon name="alert" size={12} c="#B54708" />
                <T s="ui-s" c="#93370D">
                  {issue}
                </T>
              </F>
            ))}
            <F d="H" g={6} ai="CENTER" p={[5, 9]} r={8} fill="bg2">
              <Icon name="fileText" size={12} c="body" />
              <T s="ui-s" c="body">
                intake-form.pdf
              </T>
            </F>
            <F d="H" g={8}>
              <SmallButton primary>Approve and Send</SmallButton>
              <SmallButton>Edit Draft</SmallButton>
            </F>
          </F>
        </F>
        <Composer placeholder="Ask about a document" />
      </F>
      <F g={12} p={16} w={220} h="fill" fill="white" stroke="line" edge="left">
        <T s="ui-m">Workflow</T>
        <Pill tone="ok">Person in the loop</Pill>
        <F w="fill" p={[4, 0, 0, 0]}>
          {WORKFLOW.map(([title, sub, state], i) => (
            <F key={title} w="fill">
              <F d="H" g={10} ai="CENTER" w="fill">
                <F
                  w={22}
                  h={22}
                  r={999}
                  ai="CENTER"
                  ji="CENTER"
                  fill={state === "done" ? "ok" : state === "active" ? "white" : "bg2"}
                  stroke={state === "active" ? "accent" : state === "todo" ? "line-strong" : undefined}
                  sw={2}
                >
                  {state === "done" && <Icon name="check" size={11} sw={3} c="white" />}
                  {state === "active" && <F w={8} h={8} r={999} fill="accent" />}
                </F>
                <F w="fill">
                  <T s="ui-s" c={state === "todo" ? "body" : "heading"}>
                    {title}
                  </T>
                  <T s="ui-xs" c="body">
                    {sub}
                  </T>
                </F>
              </F>
              {i < WORKFLOW.length - 1 && (
                <F d="H" p={[2, 0, 2, 10]}>
                  <F w={2} h={12} r={1} fill={state === "done" ? "ok" : "line-strong"} />
                </F>
              )}
            </F>
          ))}
        </F>
        <F w="fill" h="fill" />
        <F d="H" g={8} w="fill">
          {[
            ["Hours saved", "46h"],
            ["Manual errors", "0.4%"],
          ].map(([label, value]) => (
            <F key={label} g={2} p={10} r={8} w="fill" fill="bg2">
              <T s="ui-xs" c="body">
                {label}
              </T>
              <T s="ui-val">{value}</T>
            </F>
          ))}
        </F>
      </F>
    </Win>
  );
}

const JOBS = [
  ["13:00", "Client call", "Review drawings"],
  ["15:30", "Sign-off", "Phase two handover"],
  ["17:00", "Daily report", "Send to project lead"],
];

export function MobileApp() {
  const tabs: IconName[] = ["home", "calendar", "messageSquare", "user"];
  return (
    <F p={8} w={280} h={572} r={44} fill="navy" shadow="xl" className="mock">
      <F w="fill" h="fill" r={36} fill="bg2" clip>
        <F d="H" ai="CENTER" ji="SPACE_BETWEEN" p={[12, 22, 6, 22]} w="fill">
          <T s="ui-s">9:41</T>
          <F w={72} h={20} r={10} fill="navy" />
          <F d="H" g={4} ai="CENTER">
            <F w={12} h={8} r={2} fill="heading" />
            <F w={18} h={9} r={3} fill="heading" />
          </F>
        </F>
        <F g={14} p={[10, 18, 14, 18]} w="fill" h="fill">
          <F d="H" ai="CENTER" ji="SPACE_BETWEEN" w="fill">
            <F g={2}>
              <T s="ui-s" c="body">
                Good morning
              </T>
              <T s="ui-val">3 jobs today</T>
            </F>
            <Avatar size={34} bg="accent" fg="white">
              AK
            </Avatar>
          </F>
          <F g={8} p={16} r={16} w="fill" fill="linear-gradient(225deg, #6D28D9, #8B5CF6)" shadow="accent">
            <T s="ui-s" c="white" o={0.8}>
              Next up
            </T>
            <T s="ui-val" c="white">
              10:30&nbsp; Site visit
            </T>
            <F d="H" g={6} ai="CENTER">
              <Icon name="mapPin" size={12} c="white" />
              <T s="ui-s" c="white">
                14 Harbor Street
              </T>
            </F>
            <F d="H" p={[7, 14]} r={999} fill="white">
              <T s="ui-s" c="accent">
                Start Job
              </T>
            </F>
          </F>
          <F d="H" ai="CENTER" ji="SPACE_BETWEEN" w="fill">
            <T s="ui-m">Schedule</T>
            <T s="ui-s" c="accent">
              See all
            </T>
          </F>
          {JOBS.map(([time, title, sub]) => (
            <F key={time} d="H" g={10} ai="CENTER" p={12} r={12} w="fill" fill="white" stroke="line">
              <T s="ui-s" c="accent">
                {time}
              </T>
              <F g={1} w="fill">
                <T s="ui-s">{title}</T>
                <T s="ui-xs" c="body">
                  {sub}
                </T>
              </F>
              <Icon name="chevronRight" size={12} c="muted" />
            </F>
          ))}
        </F>
        <F d="H" ai="CENTER" ji="SPACE_BETWEEN" p={[12, 30, 18, 30]} w="fill" fill="white" stroke="line" edge="top">
          {tabs.map((name, i) => (
            <Icon key={name} name={name} size={18} c={i ? "muted" : "accent"} />
          ))}
        </F>
      </F>
    </F>
  );
}

const DOCS: [name: string, status: string, tone: Tone][] = [
  ["Engagement letter", "Signed", "ok"],
  ["ID verification", "Needs review", "warn"],
  ["Bank statements", "Uploaded", "white"],
];

const PORTAL_FEATURES: [icon: IconName, title: string, sub: string][] = [
  ["shield", "Secure uploads", "Encrypted in transit"],
  ["calendar", "Online booking", "Pick a time that suits"],
  ["clock", "Live status", "Know what happens next"],
];

export function WebPortal() {
  return (
    <Win d="V">
      <F d="H" g={10} ai="CENTER" p={[10, 14]} w="fill" fill="bg2" stroke="line" edge="bottom">
        <F d="H" g={5}>
          {["#F04438", "#F79009", "#17B26A"].map((dot) => (
            <F key={dot} w={8} h={8} r={999} fill={dot} />
          ))}
        </F>
        <F d="H" g={6} ai="CENTER" p={[5, 12]} r={999} w="fill" fill="white" stroke="line">
          <Icon name="lock" size={10} c="muted" />
          <T s="ui-s" c="body">
            portal.yourfirm.com
          </T>
        </F>
      </F>
      <F d="H" ai="CENTER" ji="SPACE_BETWEEN" p={[14, 28]} w="fill">
        <F d="H" g={8} ai="CENTER">
          <F w={18} h={18} r={6} fill="accent" />
          <T s="ui-m">Your Firm</T>
        </F>
        <F d="H" g={20} ai="CENTER">
          {["Documents", "Appointments", "Billing"].map((link) => (
            <T key={link} s="ui-s" c="body">
              {link}
            </T>
          ))}
        </F>
        <SmallButton primary>Client Sign In</SmallButton>
      </F>
      <F d="H" g={24} ai="CENTER" p={[20, 28, 24, 28]} w="fill" h="fill" fill="linear-gradient(180deg, #F5F3FB, #FFFFFF)">
        <F g={10} w="fill">
          <Pill>Client portal</Pill>
          <T s="h4" w="fill">
            Everything for your case, in one place.
          </T>
          <T s="ui-s" c="body" w="fill">
            Upload documents, book appointments, and follow progress without a phone call.
          </T>
          <F d="H" g={8} p={[4, 0, 0, 0]}>
            <SmallButton primary>Get Started</SmallButton>
            <SmallButton>Take a Tour</SmallButton>
          </F>
        </F>
        <F g={8} p={14} r={12} w={250} fill="white" stroke="line" shadow="md">
          <T s="ui-m">Your documents</T>
          {DOCS.map(([name, status, tone]) => (
            <F key={name} d="H" ai="CENTER" ji="SPACE_BETWEEN" w="fill" p={[6, 8]} r={8} fill="bg2">
              <F d="H" g={6} ai="CENTER">
                <Icon name="fileText" size={12} c="accent" />
                <T s="ui-s">{name}</T>
              </F>
              <Pill tone={tone}>{status}</Pill>
            </F>
          ))}
          <F g={5} w="fill" p={[4, 0, 0, 0]}>
            <F d="H" ji="SPACE_BETWEEN" w="fill">
              <T s="ui-xs" c="body">
                Case progress
              </T>
              <T s="ui-xs">68%</T>
            </F>
            <Bar w={222} h={6} value={68} />
          </F>
        </F>
      </F>
      <F d="H" g={12} p={[0, 28, 24, 28]} w="fill">
        {PORTAL_FEATURES.map(([icon, title, sub]) => (
          <F key={title} d="H" g={10} ai="CENTER" p={12} r={12} w="fill" fill="white" stroke="line">
            <IconTile name={icon} size={30} icon={14} fill="tint" c="accent" />
            <F g={1} w="fill">
              <T s="ui-s">{title}</T>
              <T s="ui-xs" c="body">
                {sub}
              </T>
            </F>
          </F>
        ))}
      </F>
    </Win>
  );
}

const BOARD: [name: string, dot: string, cards: [title: string, tag: string, done: number][]][] = [
  [
    "To set up",
    "muted",
    [
      ["Phone system access", "Systems", 20],
      ["Billing software login", "Systems", 10],
    ],
  ],
  [
    "In review",
    "warn",
    [
      ["Call handling script", "Runbook", 70],
      ["Escalation contacts", "Runbook", 85],
    ],
  ],
  [
    "Live",
    "ok",
    [
      ["Scheduling process", "Training", 100],
      ["Daily QA sampling", "QA", 100],
      ["Weekly report template", "Reporting", 100],
    ],
  ],
];

export function RunbookBoard() {
  return (
    <Win d="V" h={400}>
      <F d="H" ai="CENTER" ji="SPACE_BETWEEN" p={[12, 20]} w="fill" stroke="line" edge="bottom">
        <F g={1}>
          <T s="ui-m">Onboarding runbook</T>
          <T s="ui-xs" c="body">
            Supervised start, week 1 of 2
          </T>
        </F>
        <F d="H" g={10} ai="CENTER">
          <Pill tone="neutral">Sample data</Pill>
          <F d="H">
            {[
              ["AK", "soft"],
              ["SM", "ok-soft"],
              ["RH", "warn-soft"],
            ].map(([initials, bg], i) => (
              <Avatar key={initials} size={24} bg={bg} fg="heading" style={{ marginLeft: i ? -6 : 0, boxShadow: "0 0 0 2px #fff" }}>
                {initials}
              </Avatar>
            ))}
          </F>
        </F>
      </F>
      <F d="H" g={10} ai="CENTER" p={[12, 20]} w="fill">
        <T s="ui-s" c="body">
          Runbook complete
        </T>
        <Bar w={420} h={6} value={72} />
        <T s="ui-s">72%</T>
      </F>
      <F d="H" g={12} p={[0, 20, 20, 20]} w="fill" h="fill">
        {BOARD.map(([name, dot, cards]) => (
          <F key={name} g={8} p={10} r={12} w="fill" h="fill" fill="bg2">
            <F d="H" ai="CENTER" ji="SPACE_BETWEEN" w="fill" p={2}>
              <F d="H" g={6} ai="CENTER">
                <F w={7} h={7} r={999} fill={dot} />
                <T s="ui-m">{name}</T>
              </F>
              <T s="ui-s" c="muted">
                {cards.length}
              </T>
            </F>
            {cards.map(([title, tag, done]) => (
              <F key={title} g={7} p={10} r={8} w="fill" fill="white" stroke="line" shadow="sm">
                <T s="ui-s" w="fill">
                  {title}
                </T>
                <F d="H" ai="CENTER" ji="SPACE_BETWEEN" w="fill">
                  <Pill tone={done === 100 ? "ok" : "info"}>{tag}</Pill>
                  <Bar w={56} h={5} value={done} fill={done === 100 ? "ok" : "accent"} />
                </F>
              </F>
            ))}
          </F>
        ))}
      </F>
    </Win>
  );
}

/* ---------- mini mockups (service cards): fluid width, 160 tall ---------- */

function Mini({ g = 6, center, flush, children }: { g?: number; center?: boolean; flush?: boolean; children: ReactNode }) {
  return (
    <F g={g} p={flush ? [16, 16, 0, 16] : 16} h={160} r={12} fill="bg2" clip ai={center ? "CENTER" : undefined} className="mini">
      {children}
    </F>
  );
}

export function MiniPod() {
  return (
    <Mini>
      <F d="H" ai="CENTER" ji="SPACE_BETWEEN" w="fill" p={[0, 0, 4, 0]}>
        <T s="ui-m">Your dedicated pod</T>
        <Pill tone="ok">On shift</Pill>
      </F>
      {[
        ["AK", "Front desk", "9 to 5 ET"],
        ["SM", "Bookkeeping", "9 to 5 ET"],
        ["RH", "Paralegal support", "8 to 4 CT"],
      ].map(([initials, role, hours]) => (
        <F key={initials} d="H" ai="CENTER" ji="SPACE_BETWEEN" w="fill" p={[5, 8]} r={8} fill="white">
          <F d="H" g={8} ai="CENTER">
            <Avatar size={20}>{initials}</Avatar>
            <T s="ui-s">{role}</T>
          </F>
          <T s="ui-s" c="body">
            {hours}
          </T>
        </F>
      ))}
    </Mini>
  );
}

export function MiniChat() {
  return (
    <Mini g={8}>
      <F d="H" w="fill">
        <F p={[8, 12]} r={12} fill="white" stroke="line">
          <T s="ui-s">Can I move my appointment to Friday?</T>
        </F>
      </F>
      <F d="H" w="fill" ji="MAX">
        <F p={[8, 12]} r={12} fill="accent">
          <T s="ui-s" c="white">
            Done. You are booked for Friday, 10:30.
          </T>
        </F>
      </F>
      <F d="H" g={6} ai="CENTER" w="fill" p={[8, 0, 0, 0]}>
        <Pill tone="ok">First response 1m 48s</Pill>
        <Pill>Resolved</Pill>
      </F>
    </Mini>
  );
}

export function MiniBars() {
  const channels: [label: string, height: number, strong: boolean][] = [
    ["Search", 74, true],
    ["Social", 50, false],
    ["Email", 38, false],
    ["Ads", 62, true],
    ["Referral", 28, false],
  ];
  return (
    <Mini g={10}>
      <F d="H" ai="CENTER" ji="SPACE_BETWEEN" w="fill">
        <T s="ui-m">Leads by channel</T>
        <Pill tone="white">This month</Pill>
      </F>
      <F d="H" g={12} ai="MAX" w="fill" h="fill">
        {channels.map(([label, height, strong]) => (
          <F key={label} g={6} ai="CENTER" ji="MAX" w="fill" h="fill">
            <F w="fill" h={height} r={6} fill={strong ? "accent" : "soft"} />
            <T s="ui-xs" c="body">
              {label}
            </T>
          </F>
        ))}
      </F>
    </Mini>
  );
}

export function MiniPhone() {
  return (
    <Mini center flush>
      <F g={8} p={12} w={176} h={190} r={24} fill="white" stroke="heading" sw={4} ai="CENTER" shadow="md">
        <F w={44} h={5} r={3} fill="line-strong" />
        <F d="H" ai="CENTER" ji="SPACE_BETWEEN" w="fill">
          <T s="ui-m">Today</T>
          <Pill>3 jobs</Pill>
        </F>
        {[
          ["10:30", "Site visit"],
          ["13:00", "Client call"],
          ["15:30", "Sign-off"],
        ].map(([time, label]) => (
          <F key={time} d="H" g={8} ai="CENTER" w="fill" p={[7, 8]} r={8} fill="bg2">
            <T s="ui-s" c="accent">
              {time}
            </T>
            <T s="ui-s">{label}</T>
          </F>
        ))}
      </F>
    </Mini>
  );
}

export function MiniBrowser() {
  return (
    <Mini flush>
      <F w="fill" h={150} r={12} fill="white" stroke="line" clip>
        <F d="H" g={5} ai="CENTER" p={[8, 10]} w="fill" fill="bg2">
          {["#F04438", "#F79009", "#17B26A"].map((dot) => (
            <F key={dot} w={6} h={6} r={999} fill={dot} />
          ))}
          <F d="H" p={[3, 10]} r={999} fill="white" w="fill">
            <T s="ui-xs" c="body">
              yourbusiness.com/portal
            </T>
          </F>
        </F>
        <F d="H" g={12} p={14} w="fill" ai="CENTER">
          <F g={7} w="fill">
            <T s="ui-m">Client portal</T>
            <F w={110} h={5} r={3} fill="line" />
            <F w={84} h={5} r={3} fill="line" />
            <F p={[4, 10]} r={8} fill="accent">
              <T s="ui-xs" c="white">
                Sign In
              </T>
            </F>
          </F>
          <F w={100} h={68} r={8} fill="linear-gradient(225deg, #E0D4FA, #A78BFA)" />
        </F>
      </F>
    </Mini>
  );
}

export function MiniAi() {
  return (
    <Mini g={8}>
      <F d="H" g={8} ai="CENTER" p={[7, 10]} r={12} w="fill" fill="white" stroke="line">
        <Icon name="sparkles" size={14} c="accent" />
        <T s="ui-s">Summarize this intake form</T>
      </F>
      <F g={8} p={10} r={12} w="fill" fill="white" stroke="line">
        <T s="ui-s" c="body" w="fill">
          New patient, referred by a partner clinic. Insurance verified. Two fields need review.
        </T>
        <Pill tone="ok">Reviewed by a person</Pill>
      </F>
    </Mini>
  );
}
