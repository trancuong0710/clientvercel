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
  { icon: IconGrid, label: "Dashboard", href: "/" },
  { icon: IconFolder, label: "Records", href: "/" },
  { icon: IconUsers, label: "Patients", href: "/" },
  { icon: IconCalendar, label: "Appointments", href: "/calendar" },
  { icon: IconMessage, label: "Messages", href: "/" },
  { icon: IconDocument, label: "Documents", href: "/" },
  { icon: IconChart, label: "Reports", href: "/" },
  { icon: IconSettings, label: "Settings", href: "/" },
];

type AppShellProps = {
  children: React.ReactNode;
  backHref?: string;
  showFooter?: boolean;
  plainContent?: boolean;
  title?: string;
  searchPlaceholder?: string;
  showBack?: boolean;
  activeNav?: string;
};

export function AppShell({
  children,
  backHref = "/",
  showFooter = false,
  plainContent = false,
  title = "Set A New Appointment",
  searchPlaceholder = "Search",
  showBack = true,
  activeNav = "Appointments",
}: AppShellProps) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link href="/" className="brand" aria-label="YSalus home">
          <img
            className="brand-logo"
            src="https://ysalus.io/logos/ysalus_full.png"
            alt="YSalus"
            width={48}
            height={48}
          />
        </Link>
        <nav className="sidebar-nav" aria-label="Main">
          {navItems.map(({ icon: Icon, label, href }) => {
            const active = label === activeNav;
            return (
              <Link
                key={label}
                href={href}
                className={`nav-btn${active ? " is-active" : ""}`}
                aria-label={label}
                aria-current={active ? "page" : undefined}
              >
                <Icon />
              </Link>
            );
          })}
        </nav>
        <button type="button" className="nav-btn sidebar-help" aria-label="Help">
          <IconHelp />
        </button>
      </aside>

      <div className="main-area">
        <header className="topbar">
          <div className="topbar-left">
            {showBack ? (
              <Link href={backHref} className="back-btn" aria-label="Go back">
                <IconBack />
              </Link>
            ) : null}
            <div>
              <h1 className="page-title">{title}</h1>
              {showBack ? (
                <p className="breadcrumbs">Details &gt; Details &gt; Details</p>
              ) : null}
            </div>
          </div>

          <div className="topbar-right">
            <label className="search-field">
              <IconSearch className="search-icon" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                aria-label={searchPlaceholder}
                autoComplete="off"
              />
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

        <main className={plainContent ? "content-plain" : "content-panel"}>
          {children}
        </main>

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
