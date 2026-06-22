const links = [
  {
    href: 'https://t.me/mixdsa',
    label: 'Telegram',
    icon: (
      <path d="M21 4 3 11.2l6.8 2.4M21 4l-2.6 16-8.6-6.4M21 4 9.8 13.6m0 0L8.9 20l3.7-4.8" />
    ),
  },
  {
    href: 'mailto:giulergashimova@gmail.com',
    label: 'Email',
    icon: <path d="M4 6h16v12H4V6Zm0 1 8 6 8-6" />,
  },
  {
    href: 'https://www.linkedin.com/in/giuler-g/',
    label: 'LinkedIn',
    icon: (
      <>
        <path d="M7 10v8M7 7v.01M11 18v-8M11 13c0-2 1.2-3.2 3-3.2s3 1.2 3 3.6V18" />
        <path d="M4 4h16v16H4z" />
      </>
    ),
  },
  {
    href: 'https://github.com/giulerg',
    label: 'GitHub',
    icon: (
      <path d="M9 19c-4 1.2-4-2-5.5-2.5M14.5 21v-3.5c0-1 .1-1.4-.5-2 2-.2 4-1 4-4.5 0-1-.4-1.9-1-2.6.1-.3.4-1.3-.1-2.6 0 0-.8-.3-2.7 1a9.3 9.3 0 0 0-4.9 0c-1.9-1.3-2.7-1-2.7-1-.5 1.3-.2 2.3-.1 2.6-.6.7-1 1.6-1 2.6 0 3.5 2 4.3 4 4.5-.3.3-.5.8-.5 1.5V21" />
    ),
  },
]

export function Footer() {
  return (
    <footer className="app-footer">
      <strong>Giuler Gashimova</strong>
      <nav aria-label="Social links">
        {links.map((link) => (
          <a href={link.href} key={link.label} target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              {link.icon}
            </svg>
            <span>{link.label}</span>
          </a>
        ))}
      </nav>
    </footer>
  )
}
