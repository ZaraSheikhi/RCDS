import { type CSSProperties, useEffect, useState } from 'react'
import {
  ArrowLeft,
  CalendarDays,
  Check,
  CheckCircle2,
  Copy,
  ExternalLink,
  FileText,
  GraduationCap,
  Landmark,
  ListChecks,
  Mail,
  Menu,
  MessageCircle,
  Newspaper,
  Send,
  ShieldCheck,
  Sparkles,
  UserPlus,
  Vote,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import './App.css'
import {
  campaignSources,
  candidates,
  contactGroups,
  contactLinks,
  currentProjects,
  electionInfo,
  electionResults,
  leadCandidates,
  legalInfo,
  membershipFieldGroups,
  membershipFormUrl,
  membershipReasons,
  membershipSteps,
  navigation,
  programHighlights,
  programSections,
  pressReleases,
  upcomingEvents,
} from './data/campaign'
import type { Candidate, ContactIcon, PageKey } from './data/campaign'

const iconMap: Record<ContactIcon, LucideIcon> = {
  mail: Mail,
  instagram: MessageCircle,
  source: ExternalLink,
}

const programSectionIcons: LucideIcon[] = [
  GraduationCap,
  ShieldCheck,
  Sparkles,
  Landmark,
]

const pageKeys: PageKey[] = [
  'home',
  'wahl',
  'forderungen',
  'kandidierende',
  'presse',
  'pressemitteilung-bsu',
  'mitglied-werden',
  'kontakt',
  'impressum',
  'datenschutz',
]

const pagePaths: Record<PageKey, string> = {
  home: '',
  wahl: 'wahl',
  forderungen: 'forderungen',
  kandidierende: 'kandidierende',
  presse: 'presse',
  'pressemitteilung-bsu': 'presse/internationale-studierende',
  'mitglied-werden': 'mitglied-werden',
  kontakt: 'kontakt',
  impressum: 'impressum',
  datenschutz: 'datenschutz',
}

const siteImages = {
  brandLogo: 'assets/rcds-bremen-logo-white.png',
  heroTeam: 'assets/rcds-team-campus.webp',
  candidatesTeam: 'assets/rcds-team-domshof.webp',
}

const heroProgramPoints = [
  'Zwei Sitze im Studierendenrat für die Amtszeit 2026/27',
  'Zara Sheikhi und Amira Challaoui vertreten den RCDS',
  'Campus-Anliegen aufnehmen und in die Gremien bringen',
]

const overviewCards: Array<{
  page: PageKey
  title: string
  text: string
}> = [
  {
    page: 'wahl',
    title: 'Wahlarchiv',
    text: 'Offizielle Ergebnisse der SR- und Gremienwahlen 2026.',
  },
  {
    page: 'forderungen',
    title: 'Positionen',
    text: 'Unser Programm bleibt die Grundlage für die politische Arbeit.',
  },
  {
    page: 'kandidierende',
    title: 'Ansprechpartner',
    text: 'Getrennte Teams für Universität Bremen und Hochschule Bremen.',
  },
  {
    page: 'mitglied-werden',
    title: 'Mitmachen',
    text: 'Offizieller Aufnahmeantrag, Ablauf und Gründe für eine Mitgliedschaft.',
  },
]

const institutionSections = [
  {
    id: 'universitaet-bremen' as const,
    label: 'Uni Bremen',
    title: 'Universität Bremen',
    description:
      'Ansprechpartner für Studierendenrat, Akademischen Senat und die vertretenen Fachbereiche der Universität Bremen.',
  },
  {
    id: 'hochschule-bremen' as const,
    label: 'HS Bremen',
    title: 'Hochschule Bremen',
    description:
      'Das Team und die Zuständigkeiten an der Hochschule Bremen werden ergänzt, sobald die Personen feststehen.',
  },
]

const candidatesByName = new Map(
  candidates.map((candidate) => [candidate.name, candidate]),
)

const latestPressRelease = pressReleases[0]

type CookieConsent = {
  necessary: true
  analytics: boolean
}

type CookieBannerProps = {
  analyticsDraft: boolean
  cookieConsent: CookieConsent | null
  onAcceptAll: () => void
  onAcceptNecessary: () => void
  onAnalyticsDraftChange: (enabled: boolean) => void
  onOpenSettings: () => void
  onSaveSelection: () => void
  showCookieSettings: boolean
}

type PageProps = {
  currentPage: PageKey
}

type ShellProps = PageProps & {
  onOpenCookieSettings: () => void
}

const consentStorageKey = 'rcds-cookie-consent'
function isPageKey(value: string | undefined): value is PageKey {
  return pageKeys.includes(value as PageKey)
}

function getCurrentPage(): PageKey {
  if (typeof document === 'undefined') {
    return 'home'
  }

  const page = document.body.dataset.page

  return isPageKey(page) ? page : 'home'
}

function pageHref(currentPage: PageKey, targetPage: PageKey) {
  const rootHref =
    currentPage === 'home'
      ? './'
      : currentPage === 'pressemitteilung-bsu'
        ? '../../'
        : '../'

  return targetPage === 'home'
    ? rootHref
    : `${rootHref}${pagePaths[targetPage]}/`
}

function assetHref(currentPage: PageKey, path: string) {
  const rootHref =
    currentPage === 'home'
      ? './'
      : currentPage === 'pressemitteilung-bsu'
        ? '../../'
        : '../'

  return `${rootHref}${path}`
}

function candidateImageStyle(
  candidate: Pick<
    Candidate,
    'imageHoverScale' | 'imagePosition' | 'imageScale'
  >,
): CSSProperties {
  return {
    objectPosition: candidate.imagePosition ?? 'center',
    '--candidate-image-hover-scale': candidate.imageHoverScale ?? '1.055',
    '--candidate-image-scale': candidate.imageScale ?? '1',
  } as CSSProperties
}

function mailtoWithSubject(subject: string) {
  return `mailto:${legalInfo.email}?subject=${encodeURIComponent(subject)}`
}

function parseCookieConsent(value: string | null): CookieConsent | null {
  if (!value) {
    return null
  }

  try {
    const parsed = JSON.parse(value) as Partial<CookieConsent>

    if (typeof parsed.analytics === 'boolean') {
      return {
        necessary: true,
        analytics: parsed.analytics,
      }
    }
  } catch {
    return null
  }

  return null
}

function readStoredCookieConsent(): CookieConsent | null {
  if (typeof window === 'undefined') {
    return null
  }

  return parseCookieConsent(window.localStorage.getItem(consentStorageKey))
}

function currentSemester(baseSemester: number, now = new Date()) {
  const semesterIndex =
    now.getFullYear() * 2 +
    (now.getMonth() >= 9 ? 1 : now.getMonth() >= 3 ? 0 : -1)
  const summer2026Index = 2026 * 2

  return `${Math.max(baseSemester + semesterIndex - summer2026Index, 1)}. FS`
}

function candidateInitials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
}

function Header({ currentPage }: PageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isCompact, setIsCompact] = useState(
    () => typeof window !== 'undefined' && window.scrollY > 24,
  )

  useEffect(() => {
    const updateHeaderState = () => {
      setIsCompact(window.scrollY > 24)
    }

    window.addEventListener('scroll', updateHeaderState, { passive: true })

    return () => {
      window.removeEventListener('scroll', updateHeaderState)
    }
  }, [])

  return (
    <header
      className={`site-header${isCompact ? ' site-header-compact' : ''}${mobileMenuOpen ? ' menu-open' : ''}`}
      aria-label="Hauptnavigation"
    >
      <a
        className="brand"
        href={pageHref(currentPage, 'home')}
        aria-label="RCDS Bremen Start"
      >
        <span className="brand-mark" aria-hidden="true">
          <img src={assetHref(currentPage, siteImages.brandLogo)} alt="" />
        </span>
        <span>
          <strong>RCDS Bremen</strong>
          <small>Hochschulpolitik</small>
        </span>
      </a>
      <button
        className="mobile-menu-button"
        type="button"
        aria-controls="site-navigation"
        aria-expanded={mobileMenuOpen}
        onClick={() => {
          setMobileMenuOpen((open) => !open)
        }}
      >
        {mobileMenuOpen ? (
          <X size={22} aria-hidden="true" />
        ) : (
          <Menu size={22} aria-hidden="true" />
        )}
        <span>{mobileMenuOpen ? 'Schließen' : 'Menü'}</span>
      </button>
      <nav
        className="nav-links"
        id="site-navigation"
        aria-label="Seitennavigation"
      >
        {navigation.map((item) => (
          <a
            key={item.page}
            href={pageHref(currentPage, item.page)}
            aria-current={currentPage === item.page ? 'page' : undefined}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <a className="header-cta" href={pageHref(currentPage, 'kontakt')}>
        <Send size={18} aria-hidden="true" />
        Anliegen melden
      </a>
    </header>
  )
}

function HomePage({ currentPage }: PageProps) {
  return (
    <>
      <section className="hero-section">
        <div className="hero-media" aria-hidden="true">
          <img
            src={assetHref(currentPage, siteImages.heroTeam)}
            alt=""
            loading="eager"
          />
        </div>
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="eyebrow">Nach der Wahl 2026</p>
          <h1>Danke für euer Vertrauen.</h1>
          <p className="hero-copy">
            Mit zwei Sitzen im Studierendenrat beginnt für uns die Arbeit.
            Wir bleiben ansprechbar, bringen eure Anliegen in die Gremien und
            machen unsere nächsten Schritte hier sichtbar.
          </p>
          <div className="hero-program-points" aria-label="Ergebnis und Auftrag">
            {heroProgramPoints.map((point) => (
              <span key={point}>
                <CheckCircle2 size={18} aria-hidden="true" />
                {point}
              </span>
            ))}
          </div>
          <div className="hero-actions" aria-label="Wichtige Aktionen">
            <a
              className="button button-primary"
              href={pageHref(currentPage, 'kontakt')}
            >
              <Send size={20} aria-hidden="true" />
              Campus-Anliegen melden
            </a>
            <a
              className="button button-secondary"
              href={pageHref(currentPage, 'wahl')}
            >
              <Vote size={20} aria-hidden="true" />
              Wahlergebnis 2026
            </a>
          </div>
          <div className="hero-facts" aria-label="Wahlergebnis">
            <span>
              <Vote size={18} aria-hidden="true" />
              93 Stimmen · 2 Sitze
            </span>
            <span>
              <CalendarDays size={18} aria-hidden="true" />
              Amtszeit 2026/27
            </span>
          </div>
        </div>
      </section>

      <section className="section section-work" id="projekte" data-reveal>
        <div className="work-column">
          <div className="section-kicker">Aktuelle Projekte</div>
          <div className="work-list">
            {currentProjects.map((project) => (
              <article className="work-item" key={project.title} data-reveal>
                <span>{project.status}</span>
                <div>
                  <h2>{project.title}</h2>
                  <p>{project.text}</p>
                  {project.page ? (
                    <a
                      className="text-link"
                      href={pageHref(currentPage, project.page)}
                    >
                      Mehr erfahren
                      <ExternalLink size={16} aria-hidden="true" />
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
        <aside className="events-panel" aria-labelledby="naechste-termine">
          <CalendarDays size={30} aria-hidden="true" />
          <p className="program-kicker">Kalender</p>
          <h2 id="naechste-termine">Nächste Termine</h2>
          {upcomingEvents.length > 0 ? (
            <div className="event-list">
              {upcomingEvents.map((event) => (
                <article key={`${event.date}-${event.title}`}>
                  <time dateTime={event.date}>{event.date}</time>
                  <h3>{event.title}</h3>
                  <p>{event.details}</p>
                  {event.href ? (
                    <a className="text-link" href={event.href}>
                      Termin öffnen
                      <ExternalLink size={16} aria-hidden="true" />
                    </a>
                  ) : null}
                </article>
              ))}
            </div>
          ) : (
            <div className="events-empty">
              <p>
                Der nächste öffentliche Termin wird hier veröffentlicht,
                sobald er feststeht.
              </p>
              <a
                className="text-link"
                href="https://www.instagram.com/rcds.bremen/"
                target="_blank"
                rel="noreferrer"
              >
                Auf Instagram folgen
                <ExternalLink size={16} aria-hidden="true" />
              </a>
            </div>
          )}
        </aside>
      </section>

      <section className="section section-light" data-reveal>
        <div className="section-kicker">Direkt erreichbar</div>
        <div className="section-heading">
          <h2>Ergebnisse, Positionen und Ansprechpartner.</h2>
          <p>
            Die Wahl ist abgeschlossen. Das Programm bleibt unser Auftrag und
            die richtigen Kontaktpersonen sind weiterhin direkt erreichbar.
          </p>
        </div>
        <div className="overview-grid">
          {overviewCards.map((card) => (
            <a
              className="overview-card interactive-card"
              href={pageHref(currentPage, card.page)}
              key={card.page}
              data-reveal
            >
              <span>{card.title}</span>
              <p>{card.text}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="section home-press-preview" data-reveal>
        <div>
          <div className="section-kicker">Aktuelles</div>
          <h2>
            {latestPressRelease
              ? 'Neue Pressemitteilung.'
              : 'Pressemeldungen und Stellungnahmen.'}
          </h2>
          <p>
            {latestPressRelease
              ? `${latestPressRelease.dateLabel}: ${latestPressRelease.title}`
              : 'Neue Meldungen erscheinen künftig gesammelt im Pressebereich.'}
          </p>
        </div>
        <a className="button button-outline" href={pageHref(currentPage, 'presse')}>
          <Newspaper size={20} aria-hidden="true" />
          Zum Pressebereich
        </a>
      </section>

      <WhyRcdsSection />
    </>
  )
}

function ElectionPage({ currentPage }: PageProps) {
  return (
    <section className="section section-blue page-section">
      <div className="section-kicker">Wahlarchiv</div>
      <div className="section-heading">
        <h1>{electionInfo.title}</h1>
        <p>{electionInfo.summary}</p>
      </div>

      <nav className="election-year-nav" aria-label="Wahljahre">
        <a href="#wahl-2026" aria-current="page">2026</a>
      </nav>

      <section className="election-year" id="wahl-2026" aria-labelledby="wahljahr-2026">
        <header className="election-year-header" data-reveal>
          <div>
            <p className="program-kicker">Universität Bremen</p>
            <h2 id="wahljahr-2026">2026</h2>
          </div>
          <p>
            Wahlzeitraum: {electionInfo.dateRange}. Angezeigt werden die
            endgültigen, von den zuständigen Wahlleitungen veröffentlichten
            Ergebnisse.
          </p>
        </header>

        <div className="election-highlight-grid" aria-label="RCDS-Ergebnis im Studierendenrat">
          <div data-reveal><strong>93</strong><span>Stimmen im SR</span></div>
          <div data-reveal><strong>6,36 %</strong><span>Stimmenanteil</span></div>
          <div data-reveal><strong>2</strong><span>Sitze im SR</span></div>
          <div data-reveal><strong>2</strong><span>gewählte Mitglieder</span></div>
        </div>

        <div className="election-result-list">
          {electionResults.map((result) => (
            <article
              className="election-result-card interactive-card"
              id={result.id}
              key={result.id}
              data-reveal
            >
              <header>
                <div>
                  <p>{result.detail}</p>
                  <h3>{result.body}</h3>
                </div>
                <span className={`result-seat-badge${result.seats > 0 ? ' result-seat-won' : ''}`}>
                  {result.seats} {result.seats === 1 ? 'Sitz' : 'Sitze'}
                </span>
              </header>
              <dl className="result-stats">
                <div><dt>Stimmen</dt><dd>{result.votes}</dd></div>
                <div><dt>Anteil</dt><dd>{result.voteShare}</dd></div>
                <div><dt>Wahlbeteiligung</dt><dd>{result.turnout}</dd></div>
              </dl>
              {result.note ? <p className="result-note">{result.note}</p> : null}
              <details className="personal-results">
                <summary>Personenstimmen anzeigen</summary>
                <ul>
                  {result.people.map((person) => (
                    <li key={person.name}>
                      <span>
                        <strong>{person.name}</strong>
                        <small>{person.outcome}</small>
                      </span>
                      <b>{person.votes}</b>
                    </li>
                  ))}
                </ul>
              </details>
              <a className="text-link" href={result.sourceUrl} target="_blank" rel="noreferrer">
                Offizielle Quelle öffnen
                <ExternalLink size={16} aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </section>

      <LeadCandidatesBlock currentPage={currentPage} />
    </section>
  )
}

function DemandsPage() {
  return (
    <section className="section section-light page-section">
      <div className="section-kicker">Programm</div>
      <div className="section-heading">
        <h1>Unser Programm für die Uni Bremen</h1>
        <p>
          Vier Hot Takes, konkrete Verbesserungen im Studienalltag und klare
          Prioritäten für einen Campus, der mehr kann als Verwaltung und
          Stillstand.
        </p>
      </div>
      <div className="program-summary-grid" aria-label="Kurzprogramm">
        {programHighlights.map((highlight) => (
          <a
            className="program-summary-card interactive-card"
            href={`#${highlight.targetId}`}
            key={highlight.targetId}
            data-reveal
          >
            <span>Hot Take</span>
            <h2>{highlight.title}</h2>
            <p>{highlight.text}</p>
          </a>
        ))}
      </div>
      <nav className="program-nav" aria-label="Programmbereiche">
        {programSections.map((section, index) => {
          const Icon = programSectionIcons[index % programSectionIcons.length]

          return (
            <a
              className="program-nav-item interactive-card"
              href={`#${section.id}`}
              key={section.id}
              data-reveal
            >
              <Icon size={22} aria-hidden="true" />
              <span>{section.hotTake}</span>
            </a>
          )
        })}
      </nav>
      <div className="program-sections">
        {programSections.map((section, index) => {
          const Icon = programSectionIcons[index % programSectionIcons.length]

          return (
            <article
              className="program-section"
              id={section.id}
              key={section.id}
              data-reveal
            >
              <header className="program-section-header">
                <span className="program-section-icon" aria-hidden="true">
                  <Icon size={28} />
                </span>
                <div>
                  <p className="program-kicker">Hot Take</p>
                  <h2>{section.hotTake}</h2>
                  {section.tagline ? (
                    <p className="program-tagline">{section.tagline}</p>
                  ) : null}
                  <div className="program-intro">
                    {section.intro.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </header>
              <div className="program-demand-grid">
                {section.demands.map((demand) => (
                  <article
                    className="program-demand-card interactive-card"
                    key={demand.title}
                    data-reveal
                  >
                    <h3>{demand.title}</h3>
                    <p>{demand.text}</p>
                  </article>
                ))}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

function WhyRcdsSection() {
  return (
    <section className="section section-split" data-reveal>
      <div className="split-copy">
        <div className="section-kicker">Warum RCDS?</div>
        <h2>Hochschulpolitik, die den Campus ernst nimmt.</h2>
        <p>
          Der RCDS steht für eine studentische Interessenvertretung, die gute
          Studienbedingungen, verlässliche Organisation und eine offene
          Debattenkultur in den Mittelpunkt stellt.
        </p>
      </div>
      <div className="principle-list">
        <div data-reveal>
          <CheckCircle2 size={22} aria-hidden="true" />
          <span>Pragmatische Lösungen statt Symbolpolitik</span>
        </div>
        <div data-reveal>
          <CheckCircle2 size={22} aria-hidden="true" />
          <span>Freiheitliche Debattenkultur am Campus</span>
        </div>
        <div data-reveal>
          <CheckCircle2 size={22} aria-hidden="true" />
          <span>Studierbarkeit, Digitalisierung und Servicequalität</span>
        </div>
      </div>
    </section>
  )
}

function LeadCandidatesBlock({ currentPage }: PageProps) {
  return (
    <section
      className="lead-candidates"
      aria-labelledby="gremienvertretung"
      data-reveal
    >
      <header className="lead-candidates-header">
        <p className="program-kicker">Gewählt 2026</p>
        <h2 id="gremienvertretung">Unsere Stimmen im Studierendenrat.</h2>
        <p>
          Zara Sheikhi und Amira Challaoui vertreten den RCDS mit zwei Sitzen
          im Studierendenrat der Universität Bremen.
        </p>
      </header>
      <div className="lead-candidate-grid">
        {leadCandidates.map((candidate, index) => {
          const candidateDetails = candidatesByName.get(candidate.name)

          return (
            <article
              className="lead-candidate-card interactive-card"
              key={`${candidate.name}-${candidate.role}`}
              style={{ transitionDelay: `${index * 70}ms` }}
            >
              {candidateDetails?.imagePath ? (
                <figure className="lead-candidate-photo">
                  <img
                    src={assetHref(currentPage, candidateDetails.imagePath)}
                    alt={`Foto von ${candidate.name}`}
                    loading="eager"
                    style={candidateImageStyle(candidateDetails)}
                  />
                  <span className="lead-candidate-number">Gewählt 2026</span>
                </figure>
              ) : null}
              <div className="lead-candidate-content">
                <span className="status-pill">{candidate.role}</span>
                <h3>{candidate.name}</h3>
                <p className="lead-body">{candidate.body}</p>
                {candidateDetails ? (
                  <dl className="lead-candidate-meta">
                    <div>
                      <dt>Studiengang</dt>
                      <dd>{candidateDetails.studyProgram}</dd>
                    </div>
                    <div>
                      <dt>Fachsemester</dt>
                      <dd>
                        {currentSemester(candidateDetails.semesterSummer2026)}
                      </dd>
                    </div>
                  </dl>
                ) : null}
                <p className="lead-text">{candidate.text}</p>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

function CandidatesPage({ currentPage }: PageProps) {
  return (
    <section className="section section-dark page-section">
      <div className="section-kicker">Direkter Draht</div>
      <div className="section-heading">
        <h1>Ansprechpartner</h1>
        <p>
          Die Ansprechpartner sind nach Universität Bremen und Hochschule
          Bremen getrennt. Das Team der Hochschule Bremen folgt.
        </p>
      </div>
      <nav className="institution-nav" aria-label="Hochschulen">
        {institutionSections.map((institution) => (
          <a href={`#${institution.id}`} key={institution.id}>
            {institution.title}
          </a>
        ))}
      </nav>

      {institutionSections.map((institution) => {
        const institutionGroups = contactGroups.filter(
          (group) => group.institution === institution.id,
        )
        const institutionCandidates = candidates.filter(
          (candidate) => candidate.institution === institution.id,
        )

        return (
          <section
            className="institution-section"
            id={institution.id}
            key={institution.id}
            data-reveal
          >
            <header className="institution-header">
              <span>{institution.label}</span>
              <div>
                <h2>{institution.title}</h2>
                <p>{institution.description}</p>
              </div>
            </header>

            {institution.id === 'universitaet-bremen' ? (
              <figure className="team-photo" data-reveal>
                <img
                  src={assetHref(currentPage, siteImages.candidatesTeam)}
                  alt="Team des RCDS Bremen vor dem Forum am Domshof"
                  loading="lazy"
                />
              </figure>
            ) : null}

            {institutionGroups.length > 0 ? (
              <div
                className="contact-group-grid"
                aria-label={`Ansprechpartner ${institution.title}`}
              >
                {institutionGroups.map((group) => (
                  <section
                    className="contact-group-card interactive-card"
                    id={group.id}
                    key={group.id}
                    data-reveal
                  >
                    <span className="contact-group-label">{group.label}</span>
                    <h3>{group.title}</h3>
                    <p>{group.description}</p>
                    <ul>
                      {group.memberNames.map((name) => {
                        const person = candidatesByName.get(name)

                        return (
                          <li key={name}>
                            <strong>{name}</strong>
                            {person ? <span>{person.studyProgram}</span> : null}
                          </li>
                        )
                      })}
                    </ul>
                    <a
                      className="text-link text-link-light"
                      href={mailtoWithSubject(`Anfrage zu ${group.label}`)}
                    >
                      Anfrage senden
                      <Mail size={16} aria-hidden="true" />
                    </a>
                  </section>
                ))}
              </div>
            ) : (
              <div className="institution-empty">
                <Landmark size={34} aria-hidden="true" />
                <div>
                  <h3>Ansprechpartner folgen.</h3>
                  <p>
                    Die Personen und Zuständigkeiten der Hochschule Bremen
                    werden hier ergänzt, sobald sie feststehen.
                  </p>
                </div>
                <a
                  className="button button-primary"
                  href={mailtoWithSubject(
                    'Interesse am RCDS an der Hochschule Bremen',
                  )}
                >
                  <Mail size={20} aria-hidden="true" />
                  Kontakt aufnehmen
                </a>
              </div>
            )}

            {institutionCandidates.length > 0 ? (
              <>
                <div className="section-heading compact-heading people-heading">
                  <h2>Das Team im Überblick.</h2>
                  <p>
                    Einige Personen decken mehrere Bereiche ab. Die
                    Zuständigkeiten stehen direkt beim jeweiligen Profil.
                  </p>
                </div>
                <div className="team-grid">
                  {institutionCandidates.map((candidate, index) => (
                    <article
                      className={`team-card interactive-card${candidate.imagePath ? ' has-photo' : ''}`}
                      key={candidate.name}
                      data-reveal
                      style={{ transitionDelay: `${index * 35}ms` }}
                    >
                      {candidate.imagePath ? (
                        <figure className="candidate-photo">
                          <img
                            src={assetHref(currentPage, candidate.imagePath)}
                            alt={`Foto von ${candidate.name}`}
                            loading="lazy"
                            style={candidateImageStyle(candidate)}
                          />
                        </figure>
                      ) : (
                        <div className="avatar" aria-hidden="true">
                          <span>{candidateInitials(candidate.name)}</span>
                        </div>
                      )}
                      <div>
                        <h3>{candidate.name}</h3>
                        <div className="responsibility-list">
                          {candidate.responsibilities.map((responsibility) => (
                            <span className="status-pill" key={responsibility}>
                              {responsibility}
                            </span>
                          ))}
                        </div>
                        <dl className="candidate-meta">
                          <div>
                            <dt>Studiengang</dt>
                            <dd>{candidate.studyProgram}</dd>
                          </div>
                          <div>
                            <dt>Fachsemester</dt>
                            <dd>
                              {currentSemester(candidate.semesterSummer2026)}
                            </dd>
                          </div>
                        </dl>
                        {candidate.imagePath ? null : (
                          <span className="status-pill status-pill-muted">
                            Foto folgt
                          </span>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </>
            ) : null}
          </section>
        )
      })}
    </section>
  )
}

function PressPage({ currentPage }: PageProps) {
  return (
    <section className="section section-light page-section">
      <div className="section-kicker">Presse</div>
      <div className="section-heading">
        <h1>Pressemeldungen</h1>
        <p>
          Stellungnahmen, Ankündigungen und Meldungen des RCDS Bremen an einem
          zentralen Ort.
        </p>
      </div>
      <div className="press-layout">
        <section className="press-archive" aria-labelledby="presse-archiv" data-reveal>
          <div>
            <p className="program-kicker">Archiv</p>
            <h2 id="presse-archiv">Aktuelle Meldungen</h2>
          </div>
          {pressReleases.length > 0 ? (
            <div className="press-release-list">
              {pressReleases.map((release) => (
                <article className="press-release-card interactive-card" key={`${release.date}-${release.title}`}>
                  <time dateTime={release.date}>{release.dateLabel}</time>
                  <h3>
                    <a
                      className="press-release-title-link"
                      href={pageHref(currentPage, release.page)}
                    >
                      {release.title}
                    </a>
                  </h3>
                  <p>{release.summary}</p>
                  <div className="press-release-actions">
                    <a
                      className="text-link"
                      href={pageHref(currentPage, release.page)}
                    >
                      Pressemitteilung lesen
                      <FileText size={16} aria-hidden="true" />
                    </a>
                    {release.attachments?.length ? (
                      <div className="press-attachment-list">
                        <strong>Zugehörige Stellungnahmen</strong>
                        <ul>
                          {release.attachments.map((attachment) => (
                            <li key={attachment.href}>
                              <a
                                href={attachment.href}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {attachment.label}
                                <ExternalLink size={14} aria-hidden="true" />
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="press-empty-state">
              <Newspaper size={34} aria-hidden="true" />
              <h3>Noch keine Pressemeldungen veröffentlicht.</h3>
              <p>Neue Meldungen erscheinen künftig an dieser Stelle.</p>
            </div>
          )}
        </section>
        <aside className="press-contact interactive-card" data-reveal>
          <Mail size={30} aria-hidden="true" />
          <p className="program-kicker">Pressekontakt</p>
          <h2>Anfragen und Interviewwünsche</h2>
          <p>
            Für Presseanfragen, O-Töne und Hintergrundgespräche erreichst du
            den RCDS Bremen direkt per E-Mail.
          </p>
          <a
            className="button button-primary"
            href={mailtoWithSubject('Presseanfrage an den RCDS Bremen')}
          >
            <Mail size={20} aria-hidden="true" />
            Presseanfrage senden
          </a>
        </aside>
      </div>
    </section>
  )
}

function PressReleasePage({ currentPage }: PageProps) {
  const release = latestPressRelease

  if (!release) {
    return (
      <section className="section section-light page-section">
        <div className="section-heading">
          <h1>Pressemitteilung nicht gefunden</h1>
          <a className="text-link" href={pageHref(currentPage, 'presse')}>
            Zum Pressebereich
          </a>
        </div>
      </section>
    )
  }

  return (
    <section className="section section-light page-section press-detail-page">
      <div className="press-detail-shell">
        <a
          className="press-detail-back"
          href={pageHref(currentPage, 'presse')}
        >
          <ArrowLeft size={18} aria-hidden="true" />
          Alle Pressemeldungen
        </a>

        <header className="press-detail-header" data-reveal>
          <div className="press-detail-meta">
            <span>Pressemitteilung</span>
            <time dateTime={release.date}>{release.dateLabel}</time>
          </div>
          <p className="press-detail-kicker">{release.kicker}</p>
          <h1>{release.title}</h1>
          <div className="press-detail-actions">
            {release.href ? (
              <a
                className="button button-primary"
                href={release.href}
                target="_blank"
                rel="noreferrer"
              >
                <FileText size={19} aria-hidden="true" />
                Original-PDF öffnen
              </a>
            ) : null}
            <a
              className="button button-outline"
              href={mailtoWithSubject(
                `Presseanfrage: ${release.title}`,
              )}
            >
              <Mail size={19} aria-hidden="true" />
              Presseanfrage
            </a>
          </div>
        </header>

        <div className="press-detail-layout">
          <article className="press-article-body" data-reveal>
            {release.content.map((block, index) =>
              block.type === 'quote' ? (
                <blockquote key={`${block.type}-${index}`}>
                  <p>„{block.text}“</p>
                </blockquote>
              ) : (
                <p key={`${block.type}-${index}`}>{block.text}</p>
              ),
            )}
          </article>

          <aside className="press-detail-aside" data-reveal>
            <section className="press-detail-aside-card">
              <p className="program-kicker">Dokumente</p>
              <h2>Originale und Stellungnahmen</h2>
              <ul>
                {release.href ? (
                  <li>
                    <a href={release.href} target="_blank" rel="noreferrer">
                      Pressemitteilung als PDF
                      <ExternalLink size={15} aria-hidden="true" />
                    </a>
                  </li>
                ) : null}
                {release.attachments?.map((attachment) => (
                  <li key={attachment.href}>
                    <a
                      href={attachment.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {attachment.label}
                      <ExternalLink size={15} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <section className="press-detail-aside-card press-detail-contact">
              <p className="program-kicker">Pressekontakt</p>
              <h2>Zara Sheikhi</h2>
              <p>Landesvorsitzender des RCDS Bremen</p>
              <a href={`mailto:${legalInfo.email}`}>{legalInfo.email}</a>
              <a href={`tel:${legalInfo.phone.replace(/\s/g, '')}`}>
                {legalInfo.phone}
              </a>
            </section>
          </aside>
        </div>
      </div>
    </section>
  )
}

function ContactPage({ currentPage }: PageProps) {
  const [emailCopied, setEmailCopied] = useState(false)
  const wishSent =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('gesendet') === '1'

  const copyEmailAddress = async () => {
    if (!navigator.clipboard) {
      window.location.href = `mailto:${legalInfo.email}`
      return
    }

    try {
      await navigator.clipboard.writeText(legalInfo.email)
      setEmailCopied(true)
      window.setTimeout(() => {
        setEmailCopied(false)
      }, 2200)
    } catch {
      window.location.href = `mailto:${legalInfo.email}`
    }
  }

  return (
    <section className="section section-contact page-section">
      <div className="contact-copy" data-reveal>
        <div className="section-kicker">Mitmachen</div>
        <h1>Hochschulpolitik mitgestalten.</h1>
        <p>
          Ob Programmarbeit, Social Media oder Gespräche auf dem Campus: Schreib
          uns, bring dein Anliegen ein oder komm beim nächsten Treffen dazu.
        </p>
      </div>
      <div className="contact-actions" data-reveal>
        {contactLinks.map((link) => {
          const Icon = iconMap[link.icon]

          return (
            <a
              className="button button-contact"
              href={link.href}
              key={link.label}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
            >
              <Icon size={20} aria-hidden="true" />
              {link.label}
            </a>
          )
        })}
        <button
          className="button button-contact copy-contact"
          type="button"
          onClick={copyEmailAddress}
        >
          {emailCopied ? (
            <Check size={20} aria-hidden="true" />
          ) : (
            <Copy size={20} aria-hidden="true" />
          )}
          {emailCopied ? 'E-Mail kopiert' : 'E-Mail kopieren'}
        </button>
      </div>
      <section
        className="campus-wish-panel"
        aria-labelledby="campus-wunsch"
        data-reveal
      >
        <div className="campus-wish-copy">
          <div className="section-kicker">Dein Campus</div>
          <h2 id="campus-wunsch">Was soll sich an deiner Hochschule ändern?</h2>
          <p>
            Sag uns, was auf dem Campus fehlt, nicht funktioniert oder besser
            werden sollte. Wir sammeln konkrete Anliegen und bringen sie in die
            zuständigen Gremien ein.
          </p>
          <p className="campus-wish-note">
            Name und E-Mail sind freiwillig. Ohne Kontaktdaten bleibt dein
            Hinweis anonym.
          </p>
        </div>
        {wishSent ? (
          <div className="campus-wish-success" role="status">
            <CheckCircle2 size={34} aria-hidden="true" />
            <h3>Danke für deinen Campus-Wunsch.</h3>
            <p>Deine Nachricht wurde direkt an den RCDS Bremen gesendet.</p>
          </div>
        ) : (
        <form
          className="campus-wish-form"
          action={`https://formsubmit.co/${legalInfo.email}`}
          method="POST"
        >
          <input
            type="hidden"
            name="_subject"
            value="Neuer Campus-Wunsch über rcds-bremen.de"
          />
          <input type="hidden" name="_template" value="table" />
          <input
            type="hidden"
            name="_next"
            value="https://rcds-bremen.de/kontakt/?gesendet=1"
          />
          <input
            className="form-honeypot"
            type="text"
            name="_honey"
            tabIndex={-1}
            autoComplete="off"
          />
          <label>
            <span>Thema</span>
            <select name="Thema" required defaultValue="">
              <option value="" disabled>
                Bitte auswählen
              </option>
              <option>Studium und Lehre</option>
              <option>Lernräume und Bibliothek</option>
              <option>Mensa und Verpflegung</option>
              <option>Digitalisierung und Verwaltung</option>
              <option>Mobilität und Erreichbarkeit</option>
              <option>Sicherheit und Sauberkeit</option>
              <option>Campusleben und Veranstaltungen</option>
              <option>Sonstiges</option>
            </select>
          </label>
          <label>
            <span>Ort auf dem Campus</span>
            <input
              name="Ort auf dem Campus"
              type="text"
              placeholder="z. B. GW2, Mensa oder Domshof"
            />
          </label>
          <label className="campus-wish-message">
            <span>Dein Wunsch oder Problem</span>
            <textarea
              name="Wunsch oder Problem"
              rows={6}
              required
              minLength={10}
              placeholder="Beschreibe möglichst konkret, was sich ändern soll."
            />
          </label>
          <label>
            <span>Name (optional)</span>
            <input name="Name" type="text" autoComplete="name" />
          </label>
          <label>
            <span>E-Mail für Rückfragen (optional)</span>
            <input
              name="E-Mail für Rückfragen"
              type="email"
              autoComplete="email"
            />
          </label>
          <label className="campus-wish-consent">
            <input name="Datenschutz-Einwilligung" type="checkbox" required />
            <span>
              Ich bin damit einverstanden, dass meine Angaben zur Bearbeitung
              des Anliegens per E-Mail an den RCDS Bremen übermittelt werden.
            </span>
          </label>
          <button className="button button-primary" type="submit">
            <Send size={20} aria-hidden="true" />
            Wunsch absenden
          </button>
        </form>
        )}
      </section>
      <section
        className="membership-panel interactive-card"
        aria-labelledby="mitglied-werden"
        data-reveal
      >
        <div className="membership-copy">
          <div className="section-kicker">Mitglied werden</div>
          <h2 id="mitglied-werden">Gründe, Mitglied des RCDS zu werden.</h2>
          <p>
            Beim RCDS Bremen kannst du Hochschulpolitik mitgestalten, Netzwerke
            aufbauen und praktische Erfahrung für Studium, Beruf und Ehrenamt
            sammeln.
          </p>
          <a
            className="button button-primary"
            href={pageHref(currentPage, 'mitglied-werden')}
          >
            <UserPlus size={20} aria-hidden="true" />
            Mitglied werden
          </a>
        </div>
        <ul className="membership-reasons">
          {membershipReasons.map((reason) => (
            <li key={reason.title}>
              <CheckCircle2 size={20} aria-hidden="true" />
              <span>
                <strong>{reason.title}:</strong> {reason.text}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </section>
  )
}

function MembershipPage() {
  return (
    <section className="section section-membership page-section">
      <div className="section-kicker">Mitglied werden</div>
      <div className="section-heading">
        <h1>Mach beim RCDS Bremen mit.</h1>
        <p>
          Die Mitgliedschaft läuft über den offiziellen Aufnahmeantrag des
          RCDS. Dort werden deine Angaben sicher erfasst, verifiziert und an den
          zuständigen Verband vor Ort weitergeleitet.
        </p>
      </div>

      <div className="membership-hero-panel" data-reveal>
        <div>
          <p className="program-kicker">Offizieller Antrag</p>
          <h2>Online aufnehmen lassen, Bremen als Gruppe angeben.</h2>
          <p>
            Im Formular wählst du den passenden Landesverband aus und trägst
            als gewünschte Hochschulgruppe RCDS Bremen ein. Nach der
            E-Mail-Bestätigung kann dein Antrag vor Ort bearbeitet werden.
          </p>
          <div className="membership-actions">
            <a
              className="button button-primary"
              href={membershipFormUrl}
              target="_blank"
              rel="noreferrer"
            >
              <Send size={20} aria-hidden="true" />
              Aufnahmeantrag öffnen
            </a>
            <a
              className="button button-outline"
              href={mailtoWithSubject('Frage zur RCDS-Mitgliedschaft')}
            >
              <Mail size={20} aria-hidden="true" />
              Frage stellen
            </a>
          </div>
        </div>
        <aside className="membership-note" aria-label="Hinweis zum Formular">
          <ListChecks size={30} aria-hidden="true" />
          <strong>Was passiert mit dem Antrag?</strong>
          <span>
            Der Online-Aufnahmeantrag wird laut RCDS an den Verband vor Ort
            geschickt, in dessen Hochschulort du aktiv werden möchtest.
          </span>
        </aside>
      </div>

      <div className="membership-content-grid">
        <section className="membership-process" aria-labelledby="ablauf">
          <div className="section-kicker">Ablauf</div>
          <h2 id="ablauf">In drei Schritten zur Mitgliedschaft.</h2>
          <div className="membership-step-grid">
            {membershipSteps.map((step, index) => (
              <article className="membership-step interactive-card" key={step.title} data-reveal>
                <span>{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <aside className="membership-fields interactive-card" data-reveal>
          <div className="section-kicker">Vorbereiten</div>
          <h2>Diese Angaben brauchst du.</h2>
          <div className="membership-field-groups">
            {membershipFieldGroups.map((group) => (
              <section key={group.title}>
                <h3>{group.title}</h3>
                <ul>
                  {group.fields.map((field) => (
                    <li key={field}>
                      <CheckCircle2 size={18} aria-hidden="true" />
                      <span>{field}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </aside>
      </div>

      <section
        className="membership-reason-block"
        aria-labelledby="mitgliedschaft-gruende"
        data-reveal
      >
        <div className="section-kicker">Gründe</div>
        <h2 id="mitgliedschaft-gruende">
          Gründe, Mitglied des RCDS zu werden.
        </h2>
        <ul className="membership-reasons membership-reasons-featured">
          {membershipReasons.map((reason) => (
            <li key={reason.title}>
              <CheckCircle2 size={20} aria-hidden="true" />
              <span>
                <strong>{reason.title}:</strong> {reason.text}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <WhyRcdsSection />
    </section>
  )
}

function ImprintPage() {
  return (
    <section className="section section-legal page-section">
      <div className="section-kicker">Rechtliches</div>
      <div className="section-heading">
        <h1>Impressum</h1>
        <p>
          Anbieterkennzeichnung nach § 5 DDG und Angaben zur inhaltlichen
          Verantwortung nach § 18 MStV.
        </p>
      </div>
      <div className="legal-grid">
        <article className="legal-panel interactive-card" data-reveal>
          <h2>Angaben zum Anbieter</h2>
          <dl className="legal-list">
            <div>
              <dt>Name</dt>
              <dd>{legalInfo.providerName}</dd>
            </div>
            <div>
              <dt>Rechtsform</dt>
              <dd>{legalInfo.legalForm}</dd>
            </div>
            <div>
              <dt>Anschrift</dt>
              <dd>
                {legalInfo.street}
                <br />
                {legalInfo.postalCode} {legalInfo.city}
              </dd>
            </div>
            <div>
              <dt>Vertreten durch</dt>
              <dd>{legalInfo.representedBy}</dd>
            </div>
            <div>
              <dt>Register</dt>
              <dd>{legalInfo.registerInfo}</dd>
            </div>
          </dl>
        </article>
        <article className="legal-panel interactive-card" data-reveal>
          <h2>Kontakt und Inhalt</h2>
          <dl className="legal-list">
            <div>
              <dt>Telefon</dt>
              <dd>
                <a href={`tel:${legalInfo.phone.replace(/\s/g, '')}`}>
                  {legalInfo.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt>E-Mail</dt>
              <dd>
                <a href={`mailto:${legalInfo.email}`}>{legalInfo.email}</a>
              </dd>
            </div>
            <div>
              <dt>Inhaltlich verantwortlich</dt>
              <dd>
                {legalInfo.responsiblePerson}
                <br />
                {legalInfo.street}, {legalInfo.postalCode} {legalInfo.city}
              </dd>
            </div>
          </dl>
        </article>
      </div>
    </section>
  )
}

function PrivacyPage({ onOpenCookieSettings }: ShellProps) {
  return (
    <section className="section section-privacy page-section">
      <div className="section-kicker">Datenschutz</div>
      <div className="section-heading">
        <h1>Datenschutzerklärung</h1>
        <p>
          Stand: August 2026. Diese Hinweise beschreiben die Datenverarbeitung
          auf dieser Website.
        </p>
      </div>
      <div className="privacy-layout">
        <article className="interactive-card" data-reveal>
          <h2>Verantwortlicher</h2>
          <p>
            Verantwortlich für die Datenverarbeitung ist {legalInfo.providerName},
            {` ${legalInfo.street}, ${legalInfo.postalCode} ${legalInfo.city}`}.
            Kontakt: <a href={`mailto:${legalInfo.email}`}>{legalInfo.email}</a>.
          </p>
        </article>
        <article className="interactive-card" data-reveal>
          <h2>Hosting</h2>
          <p>
            Die Website wird über {legalInfo.hostingProvider} bereitgestellt.
            Beim Aufruf der Seite können technisch erforderliche Zugriffsdaten
            wie IP-Adresse, Datum und Uhrzeit des Abrufs, Browserinformationen
            und angeforderte Dateien verarbeitet werden. Rechtsgrundlage ist
            Art. 6 Abs. 1 lit. f DSGVO, unser berechtigtes Interesse an einer
            sicheren und stabilen Bereitstellung der Website.
          </p>
          <a
            className="text-link text-link-light"
            href={legalInfo.hostingPrivacyUrl}
            target="_blank"
            rel="noreferrer"
          >
            Datenschutzhinweise von GitHub öffnen
            <ExternalLink size={16} aria-hidden="true" />
          </a>
        </article>
        <article className="interactive-card" data-reveal>
          <h2>Kontaktaufnahme und Campus-Wunschformular</h2>
          <p>
            Wenn du uns per E-Mail, Telefon oder über das Campus-Wunschformular
            kontaktierst, verarbeiten wir deine Angaben zur Bearbeitung der
            Anfrage und möglicher Anschlussfragen. Das Formular wird über den
            Dienst FormSubmit übermittelt. Dabei werden die eingegebenen Daten
            an FormSubmit übertragen und von dort per E-Mail an uns
            weitergeleitet. Die Übermittlung erfolgt auf Grundlage deiner
            Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO. Name und
            Kontaktadresse sind freiwillig.
          </p>
          <a
            className="text-link text-link-light"
            href="https://formsubmit.co/"
            target="_blank"
            rel="noreferrer"
          >
            Informationen zu FormSubmit öffnen
            <ExternalLink size={16} aria-hidden="true" />
          </a>
        </article>
        <article className="interactive-card" data-reveal>
          <h2>Newsletter</h2>
          <p>
            Wenn später ein Newsletter angeboten wird, erfolgt der Versand nur
            nach ausdrücklicher Anmeldung. Die Verarbeitung der E-Mail-Adresse
            und der Anmeldedaten beruht dann auf deiner Einwilligung nach Art. 6
            Abs. 1 lit. a DSGVO. Eine Abmeldung wird jederzeit möglich sein.
          </p>
        </article>
        <article className="interactive-card" data-reveal>
          <h2>Cookies und Analytics</h2>
          <p>
            Aktuell setzen wir nur eine technisch notwendige Speicherung im
            Browser ein, um deine Datenschutzauswahl zu merken. Optionale
            Analytics werden nur nach Einwilligung aktiviert; derzeit ist noch
            kein Analytics-Dienst eingebunden. Du kannst deine Entscheidung
            jederzeit ändern.
          </p>
          <button
            className="text-button"
            type="button"
            onClick={onOpenCookieSettings}
          >
            Cookie-Einstellungen ändern
          </button>
        </article>
        <article className="interactive-card" data-reveal>
          <h2>Deine Rechte</h2>
          <p>
            Du hast nach Maßgabe der DSGVO insbesondere Rechte auf Auskunft,
            Berichtigung, Löschung, Einschränkung der Verarbeitung,
            Datenübertragbarkeit und Widerspruch. Einwilligungen kannst du mit
            Wirkung für die Zukunft widerrufen. Außerdem kannst du dich bei
            einer Datenschutzaufsichtsbehörde beschweren.
          </p>
        </article>
      </div>
    </section>
  )
}

function SiteFooter({ currentPage, onOpenCookieSettings }: ShellProps) {
  return (
    <footer className="site-footer">
      <div>
        <strong>RCDS Bremen</strong>
        <p>
          <a href={pageHref(currentPage, 'impressum')}>Impressum</a>
          {' · '}
          <a href={pageHref(currentPage, 'datenschutz')}>Datenschutz</a>
          {' · '}
          <button type="button" onClick={onOpenCookieSettings}>
            Cookie-Einstellungen
          </button>
        </p>
      </div>
      <div className="source-links" aria-label="Quellen">
        {campaignSources.map((source) => (
          <a href={source.href} target="_blank" rel="noreferrer" key={source.href}>
            {source.label}
            <ExternalLink size={14} aria-hidden="true" />
          </a>
        ))}
      </div>
    </footer>
  )
}

function CookieBanner({
  analyticsDraft,
  cookieConsent,
  onAcceptAll,
  onAcceptNecessary,
  onAnalyticsDraftChange,
  onOpenSettings,
  onSaveSelection,
  showCookieSettings,
}: CookieBannerProps) {
  if (cookieConsent !== null && !showCookieSettings) {
    return null
  }

  return (
    <section
      className="cookie-banner"
      id="cookies"
      aria-label="Cookie-Einstellungen"
    >
      <div className="cookie-copy">
        <p className="cookie-title">Datenschutzeinstellungen</p>
        <p>
          Wir speichern deine Auswahl lokal im Browser. Optionale Analytics
          werden nur nach Einwilligung aktiviert; aktuell ist noch kein
          Analytics-Dienst eingebunden.
        </p>
        {showCookieSettings ? (
          <div className="cookie-options">
            <label>
              <input type="checkbox" checked readOnly />
              <span>
                <strong>Notwendig</strong>
                Speichert deine Auswahl und stellt die Website bereit.
              </span>
            </label>
            <label>
              <input
                type="checkbox"
                checked={analyticsDraft}
                onChange={(event) => {
                  onAnalyticsDraftChange(event.currentTarget.checked)
                }}
              />
              <span>
                <strong>Analytics</strong>
                Hilft später, die Nutzung der Website statistisch zu verstehen.
              </span>
            </label>
          </div>
        ) : null}
      </div>
      <div className="cookie-actions">
        {showCookieSettings ? (
          <>
            <button
              className="button button-primary"
              type="button"
              onClick={onSaveSelection}
            >
              Auswahl speichern
            </button>
            <button
              className="button button-secondary cookie-button-secondary"
              type="button"
              onClick={onAcceptNecessary}
            >
              Nur notwendige
            </button>
          </>
        ) : (
          <>
            <button
              className="button button-primary"
              type="button"
              onClick={onAcceptNecessary}
            >
              Nur notwendige
            </button>
            <button
              className="button button-secondary cookie-button-secondary"
              type="button"
              onClick={onAcceptAll}
            >
              Alle akzeptieren
            </button>
            <button
              className="button button-secondary cookie-button-secondary"
              type="button"
              onClick={onOpenSettings}
            >
              Einstellungen
            </button>
          </>
        )}
      </div>
    </section>
  )
}

function renderPage(
  currentPage: PageKey,
  onOpenCookieSettings: () => void,
) {
  switch (currentPage) {
    case 'wahl':
      return <ElectionPage currentPage={currentPage} />
    case 'forderungen':
      return <DemandsPage />
    case 'kandidierende':
      return <CandidatesPage currentPage={currentPage} />
    case 'presse':
      return <PressPage currentPage={currentPage} />
    case 'pressemitteilung-bsu':
      return <PressReleasePage currentPage={currentPage} />
    case 'mitglied-werden':
      return <MembershipPage />
    case 'kontakt':
      return <ContactPage currentPage={currentPage} />
    case 'impressum':
      return <ImprintPage />
    case 'datenschutz':
      return (
        <PrivacyPage
          currentPage={currentPage}
          onOpenCookieSettings={onOpenCookieSettings}
        />
      )
    case 'home':
    default:
      return <HomePage currentPage={currentPage} />
  }
}

function App() {
  const currentPage = getCurrentPage()
  const [cookieConsent, setCookieConsent] = useState<CookieConsent | null>(
    readStoredCookieConsent,
  )
  const [showCookieSettings, setShowCookieSettings] = useState(false)
  const [analyticsDraft, setAnalyticsDraft] = useState(
    () => cookieConsent?.analytics ?? false,
  )

  const saveCookieConsent = (nextConsent: CookieConsent) => {
    window.localStorage.setItem(
      consentStorageKey,
      JSON.stringify(nextConsent),
    )
    setCookieConsent(nextConsent)
    setAnalyticsDraft(nextConsent.analytics)
    setShowCookieSettings(false)
  }

  const acceptAllCookies = () => {
    saveCookieConsent({ necessary: true, analytics: true })
  }

  const acceptNecessaryCookies = () => {
    saveCookieConsent({ necessary: true, analytics: false })
  }

  const openCookieSettings = () => {
    setAnalyticsDraft(cookieConsent?.analytics ?? false)
    setShowCookieSettings(true)
  }

  const saveCookieSettings = () => {
    saveCookieConsent({ necessary: true, analytics: analyticsDraft })
  }

  useEffect(() => {
    document.body.classList.add('reveal-ready')

    const revealElements = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal]'),
    )

    if (!('IntersectionObserver' in window)) {
      revealElements.forEach((element) => {
        element.classList.add('is-visible')
      })
      return () => {
        document.body.classList.remove('reveal-ready')
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
    )

    revealElements.forEach((element) => {
      observer.observe(element)
    })

    return () => {
      observer.disconnect()
      document.body.classList.remove('reveal-ready')
    }
  }, [currentPage])

  return (
    <>
      <Header currentPage={currentPage} />
      <main>{renderPage(currentPage, openCookieSettings)}</main>
      <SiteFooter
        currentPage={currentPage}
        onOpenCookieSettings={openCookieSettings}
      />
      <CookieBanner
        analyticsDraft={analyticsDraft}
        cookieConsent={cookieConsent}
        onAcceptAll={acceptAllCookies}
        onAcceptNecessary={acceptNecessaryCookies}
        onAnalyticsDraftChange={setAnalyticsDraft}
        onOpenSettings={openCookieSettings}
        onSaveSelection={saveCookieSettings}
        showCookieSettings={showCookieSettings}
      />
    </>
  )
}

export default App
