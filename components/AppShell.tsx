import Link from "next/link";
import {
  IconBell,
  IconCalendar,
  IconChart,
  IconDocument,
  IconFolder,
  IconGrid,
  IconHelp,
  IconMessage,
  IconSearch,
  IconSettings,
  IconUsers,
  IconBack,
  IconChatFab,
} from "./icons";

const navItems = [
  { icon: IconGrid, label: "Dashboard" },
  { icon: IconFolder, label: "Records" },
  { icon: IconUsers, label: "Patients" },
  { icon: IconCalendar, label: "Appointments", active: true },
  { icon: IconMessage, label: "Messages" },
  { icon: IconDocument, label: "Documents" },
  { icon: IconChart, label: "Reports" },
  { icon: IconSettings, label: "Settings" },
];

type AppShellProps = {
  children: React.ReactNode;
  backHref?: string;
  showFooter?: boolean;
};

export function AppShell({
  children,
  backHref = "/",
  showFooter = false,
}: AppShellProps) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link href="/" className="brand" aria-label="YSalus home">
          <span className="brand-mark">Y</span>
        </Link>
        <nav className="sidebar-nav" aria-label="Main">
          {navItems.map(({ icon: Icon, label, active }) => (
            <button
              key={label}
              type="button"
              className={`nav-btn${active ? " is-active" : ""}`}
              aria-label={label}
              aria-current={active ? "page" : undefined}
            >
              <Icon />
            </button>
          ))}
        </nav>
        <button type="button" className="nav-btn sidebar-help" aria-label="Help">
          <IconHelp />
        </button>
      </aside>

      <div className="main-area">
        <header className="topbar">
          <div className="topbar-left">
            <Link href={backHref} className="back-btn" aria-label="Go back">
              <IconBack />
            </Link>
            <div>
              <h1 className="page-title">Set A New Appointment</h1>
              <p className="breadcrumbs">Details &gt; Details &gt; Details</p>
            </div>
          </div>

          <div className="topbar-right">
            <label className="search-field">
              <IconSearch className="search-icon" />
              <input type="search" placeholder="Search" aria-label="Search" />
            </label>
            <button type="button" className="icon-round" aria-label="Notifications">
              <IconBell />
              <span className="badge">99</span>
            </button>
            <img
              className="avatar"
              src="https://i.pravatar.cc/80?img=12"
              alt="User avatar"
              width={40}
              height={40}
            />
          </div>
        </header>

        <main className="content-panel">{children}</main>

        {showFooter ? (
          <footer className="app-footer">© 2025 YSalus All rights reserved.</footer>
        ) : null}
      </div>

      <button type="button" className="chat-fab" aria-label="Open chat support">
        <IconChatFab />
        <span className="chat-dot" aria-hidden />
      </button>
    </div>
  );
}
