import { type CSSProperties, useEffect, useState } from 'react'
import {
  CalendarDays,
  Check,
  CheckCircle2,
  Copy,
  ExternalLink,
  FileText,
  GraduationCap,
  Landmark,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Vote,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import './App.css'
import {
  campaignSources,
  candidates,
  contactLinks,
  electionFaqs,
  electionInfo,
  leadCandidates,
  legalInfo,
  membershipReasons,
  navigation,
  programHighlights,
  programSections,
  shareAssets,
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
  'kontakt',
  'impressum',
  'datenschutz',
]

const campaignImages = {
  brandLogo: 'assets/rcds-bremen-logo-white.png',
  heroTeam: 'assets/rcds-team-campus.webp',
  candidatesTeam: 'assets/rcds-team-domshof.webp',
  electionQr: 'assets/rcds-wahl-qr.svg',
}

const heroProgramPoints = [
  'Moderne Bibliotheken, mehr Lernplätze und digitale Sitzplatzanzeige',
  'Campusleben, Trinkwasser und Sicherheit ernst nehmen',
  'Eine App statt Website- und Plastikkartenchaos',
]

const overviewCards: Array<{
  page: PageKey
  title: string
  text: string
}> = [
  {
    page: 'wahl',
    title: 'Wahlinfo',
    text: `${electionInfo.dateRange}, Universität Bremen`,
  },
  {
    page: 'forderungen',
    title: 'Programm',
    text: 'Das RCDS-Programm mit vier Hot Takes und konkreten Forderungen.',
  },
  {
    page: 'kandidierende',
    title: 'Kandidierende',
    text: 'Die Liste für die Uni Bremen 2026 mit allen neun Listenplätzen.',
  },
  {
    page: 'kontakt',
    title: 'Mitmachen',
    text: 'Kontakt per E-Mail, Instagram oder über die offiziellen Wahlquellen.',
  },
]

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
const electionStart = new Date('2026-06-08T00:00:00+02:00')
const electionEnd = new Date('2026-06-12T23:59:59+02:00')

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
  if (currentPage === 'home') {
    return targetPage === 'home' ? './' : `${targetPage}/`
  }

  return targetPage === 'home' ? '../' : `../${targetPage}/`
}

function assetHref(currentPage: PageKey, path: string) {
  return currentPage === 'home' ? path : `../${path}`
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

function getElectionCountdown() {
  const now = new Date()

  if (now < electionStart) {
    const days = Math.ceil(
      (electionStart.getTime() - now.getTime()) / 86_400_000,
    )

    return {
      label: `Noch ${days} ${days === 1 ? 'Tag' : 'Tage'}`,
      text: 'bis zum Start der Gremienwahl',
    }
  }

  if (now <= electionEnd) {
    return {
      label: 'Jetzt wählen',
      text: 'die Gremienwahl läuft aktuell',
    }
  }

  return {
    label: 'Wahl beendet',
    text: 'die Gremienwahl 2026 ist abgeschlossen',
  }
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
          <img src={assetHref(currentPage, campaignImages.brandLogo)} alt="" />
        </span>
        <span>
          <strong>RCDS Bremen</strong>
          <small>Uni Bremen 2026</small>
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
      <a className="header-cta" href={pageHref(currentPage, 'wahl')}>
        <Vote size={18} aria-hidden="true" />
        RCDS wählen
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
            src={assetHref(currentPage, campaignImages.heroTeam)}
            alt=""
            loading="eager"
          />
        </div>
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="eyebrow">Hot Take zur Gremienwahl 2026</p>
          <h1>Uni Bremen kann mehr.</h1>
          <p className="hero-copy">
            Wir studieren 2026 wie in 2006. Der RCDS steht für eine Uni,
            die Praxis, Campusleben und digitale Verwaltung endlich ernst
            nimmt.
          </p>
          <figure className="hero-mobile-photo" aria-label="RCDS Bremen Teamfoto">
            <img
              src={assetHref(currentPage, campaignImages.heroTeam)}
              alt="Team des RCDS Bremen auf dem Campus"
              loading="eager"
            />
          </figure>
          <div className="hero-program-points" aria-label="Kernforderungen">
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
              href={pageHref(currentPage, 'forderungen')}
            >
              <FileText size={20} aria-hidden="true" />
              Programm ansehen
            </a>
            <a className="button button-secondary" href={pageHref(currentPage, 'wahl')}>
              <Vote size={20} aria-hidden="true" />
              RCDS wählen
            </a>
          </div>
          <div className="hero-facts" aria-label="Wahldaten">
            <span>
              <CalendarDays size={18} aria-hidden="true" />
              {electionInfo.dateRange}
            </span>
            <span>
              <MapPin size={18} aria-hidden="true" />
              Universität Bremen
            </span>
          </div>
        </div>
      </section>

      <section className="section section-light" data-reveal>
        <div className="section-kicker">Start</div>
        <div className="section-heading">
          <h2>Alles zur Gremienwahl auf eigenen Seiten.</h2>
          <p>
            Wahltermin, Programm, Kandidierende und Kontakt sind getrennt
            aufgebaut, damit jede Information direkt erreichbar bleibt.
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

      <WhyRcdsSection />
    </>
  )
}

function ElectionPage({ currentPage }: PageProps) {
  const electionCountdown = getElectionCountdown()

  return (
    <section className="section section-blue page-section">
      <div className="section-kicker">Wahlinfo</div>
      <div className="section-heading">
        <h1>{electionInfo.title}</h1>
        <p>{electionInfo.summary}</p>
      </div>
      <div className="election-layout">
        <article className="election-panel interactive-card" data-reveal>
          <span className="panel-icon">
            <Vote size={28} aria-hidden="true" />
          </span>
          <h2>Deine Stimme zählt</h2>
          <p>
            {electionInfo.electionNote}
          </p>
          <div className="text-link-group">
            <a
              className="text-link"
              href={electionInfo.sourceUrl}
              target="_blank"
              rel="noreferrer"
            >
              AS/FBR-Wahlseite öffnen
              <ExternalLink size={16} aria-hidden="true" />
            </a>
            <a
              className="text-link"
              href={electionInfo.studentCouncilSourceUrl}
              target="_blank"
              rel="noreferrer"
            >
              SR-Wahlseite öffnen
              <ExternalLink size={16} aria-hidden="true" />
            </a>
          </div>
        </article>
        <div className="election-details" aria-label="Details zur Wahl">
          <div className="countdown-panel" data-reveal>
            <strong>{electionCountdown.label}</strong>
            <span>{electionCountdown.text}</span>
          </div>
          <div data-reveal>
            <strong>Zeitraum</strong>
            <span>{electionInfo.dateRange}</span>
          </div>
          <div data-reveal>
            <strong>Gremien</strong>
            <span>{electionInfo.bodies.join(', ')}</span>
          </div>
          <div data-reveal>
            <strong>Wahlausweis</strong>
            <span>{electionInfo.votingNote}</span>
          </div>
          <div data-reveal>
            <strong>Wahllokale</strong>
            <span>{electionInfo.pollingPlaces.join(', ')}</span>
          </div>
        </div>
      </div>
      <LeadCandidatesBlock currentPage={currentPage} />
      <div className="election-support-grid">
        <section className="election-faq" aria-labelledby="wahl-faq" data-reveal>
          <div className="section-kicker">FAQ</div>
          <h2 id="wahl-faq">Kurz geklärt</h2>
          <div className="faq-list">
            {electionFaqs.map((item) => (
              <article key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </section>
        <aside className="qr-panel interactive-card" data-reveal>
          <img
            src={assetHref(currentPage, campaignImages.electionQr)}
            alt="QR-Code zur offiziellen Wahlseite der Universität Bremen"
            loading="lazy"
          />
          <div>
            <p className="program-kicker">QR-Code</p>
            <h2>Direkt zur Wahlseite</h2>
            <p>
              Für Flyer, Plakate und schnelle Weiterleitung zur offiziellen
              Wahlseite der Universität Bremen.
            </p>
            <a
              className="text-link"
              href={electionInfo.sourceUrl}
              target="_blank"
              rel="noreferrer"
            >
              Wahlseite öffnen
              <ExternalLink size={16} aria-hidden="true" />
            </a>
          </div>
        </aside>
      </div>
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
      aria-labelledby="spitzenkandidaturen"
      data-reveal
    >
      <header className="lead-candidates-header">
        <p className="program-kicker">Spitzenkandidaturen</p>
        <h2 id="spitzenkandidaturen">Unsere Köpfe für AS und SR.</h2>
        <p>
          Zwei starke Stimmen für die zentralen Entscheidungen der
          studentischen Selbstverwaltung und der Universität.
        </p>
      </header>
      <div className="lead-candidate-grid">
        {leadCandidates.map((candidate, index) => {
          const candidateDetails = candidates.find(
            (item) => item.name === candidate.name,
          )

          return (
            <article
              className="lead-candidate-card interactive-card"
              key={candidate.role}
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
                  {candidateDetails ? (
                    <span className="lead-candidate-number">
                      Listenplatz {candidateDetails.listPosition}
                    </span>
                  ) : null}
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
                      <dd>{candidateDetails.semester}</dd>
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
  const leadRolesByName = new Map(
    leadCandidates.map((candidate) => [candidate.name, candidate.role]),
  )

  return (
    <section className="section section-dark page-section">
      <div className="section-kicker">Liste</div>
      <div className="section-heading">
        <h1>Kandidierende</h1>
        <p>
          Die Liste für die Uni Bremen 2026 ist mit Studiengängen und
          Fachsemestern hinterlegt. Individuelle Steckbriefe können später
          ergänzt werden.
        </p>
      </div>
      <LeadCandidatesBlock currentPage={currentPage} />
      <figure className="team-photo" data-reveal>
        <img
          src={assetHref(currentPage, campaignImages.candidatesTeam)}
          alt="Team des RCDS Bremen vor dem Forum am Domshof"
          loading="lazy"
        />
      </figure>
      <div className="team-grid">
        {candidates.map((candidate) => (
          <article
            className={`team-card interactive-card${candidate.imagePath ? ' has-photo' : ''}`}
            key={candidate.listPosition}
            data-reveal
            style={{ transitionDelay: `${candidate.listPosition * 35}ms` }}
          >
            {candidate.imagePath ? (
              <figure className="candidate-photo">
                <img
                  src={assetHref(currentPage, candidate.imagePath)}
                  alt={`Foto von ${candidate.name}`}
                  loading="eager"
                  style={candidateImageStyle(candidate)}
                />
                <span aria-label={`Listenplatz ${candidate.listPosition}`}>
                  {candidate.listPosition}
                </span>
              </figure>
            ) : (
              <div className="avatar" aria-hidden="true">
                <span>{candidate.listPosition}</span>
              </div>
            )}
            <div>
              <h2>{candidate.name}</h2>
              {leadRolesByName.has(candidate.name) ? (
                <span className="status-pill">
                  {leadRolesByName.get(candidate.name)}
                </span>
              ) : null}
              <dl className="candidate-meta">
                <div>
                  <dt>Studiengang</dt>
                  <dd>{candidate.studyProgram}</dd>
                </div>
                <div>
                  <dt>Fachsemester</dt>
                  <dd>{candidate.semester}</dd>
                </div>
              </dl>
              {candidate.imagePath ? null : (
                <span className="status-pill status-pill-muted">Foto folgt</span>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function ContactPage({ currentPage }: PageProps) {
  const [emailCopied, setEmailCopied] = useState(false)

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
        <h1>Wahlkampf mitgestalten.</h1>
        <p>
          Ob Standdienst, Programmarbeit, Social Media oder Gespräch auf dem
          Campus: Trag dich ein, schreib uns oder komm beim nächsten Treffen
          dazu.
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
            href={mailtoWithSubject('Ich möchte Mitglied beim RCDS Bremen werden')}
          >
            <Mail size={20} aria-hidden="true" />
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
      <section className="share-panel" aria-labelledby="teilen" data-reveal>
        <div className="section-kicker">Teilen</div>
        <div className="section-heading compact-heading">
          <h2 id="teilen">Share-Kacheln für Instagram.</h2>
          <p>
            Vier quadratische Kampagnenmotive für Story, Feed und Weiterleitung
            in Chats.
          </p>
        </div>
        <div className="share-grid">
          {shareAssets.map((asset) => (
            <article className="share-card interactive-card" key={asset.title}>
              <img
                src={assetHref(currentPage, asset.imagePath)}
                alt={asset.title}
                loading="lazy"
              />
              <div>
                <h3>{asset.title}</h3>
                <p>{asset.text}</p>
                <a
                  className="text-link"
                  href={assetHref(currentPage, asset.imagePath)}
                  target="_blank"
                  rel="noreferrer"
                >
                  Kachel öffnen
                  <ExternalLink size={16} aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
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
          Stand: April 2026. Diese Hinweise beschreiben die Datenverarbeitung
          auf dieser Wahlkampf-Website.
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
          <h2>Kontaktaufnahme</h2>
          <p>
            Wenn du uns per E-Mail, Telefon oder später über ein Kontaktformular
            kontaktierst, verarbeiten wir deine Angaben zur Bearbeitung der
            Anfrage und möglicher Anschlussfragen. Rechtsgrundlage ist Art. 6
            Abs. 1 lit. b DSGVO, soweit es um vorvertragliche oder
            mitwirkungsbezogene Kommunikation geht, sonst Art. 6 Abs. 1 lit. f
            DSGVO.
          </p>
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
