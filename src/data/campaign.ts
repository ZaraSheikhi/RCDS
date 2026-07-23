export type ElectionInfo = {
  title: string
  dateRange: string
  bodies: string[]
  votingNote: string
  electionNote: string
  pollingPlaces: string[]
  summary: string
  sourceUrl: string
  studentCouncilSourceUrl: string
}

export type ProgramDemand = {
  title: string
  text: string
}

export type ProgramSection = {
  id: string
  hotTake: string
  tagline?: string
  intro: string[]
  demands: ProgramDemand[]
}

export type Candidate = {
  listPosition: number
  name: string
  studyProgram: string
  semesterSummer2026: number
  responsibilities: string[]
  imagePath?: string
  imagePosition?: string
  imageScale?: string
  imageHoverScale?: string
  placeholder?: boolean
}

export type LeadCandidate = {
  role: string
  body: string
  name: string
  text: string
}

export type ContactIcon = 'mail' | 'instagram' | 'source'

export type ContactLink = {
  label: string
  href: string
  icon: ContactIcon
}

export type ProgramHighlight = {
  title: string
  text: string
  targetId: string
}

export type ElectionFaq = {
  question: string
  answer: string
}

export type MembershipReason = {
  title: string
  text: string
}

export type ShareAsset = {
  title: string
  text: string
  imagePath: string
}

export type ContactGroup = {
  id: string
  label: string
  title: string
  description: string
  memberNames: string[]
}

export type PressRelease = {
  date: string
  title: string
  summary: string
  href?: string
}

export type MembershipStep = {
  title: string
  text: string
}

export type MembershipFieldGroup = {
  title: string
  fields: string[]
}

export type PageKey =
  | 'home'
  | 'wahl'
  | 'forderungen'
  | 'kandidierende'
  | 'presse'
  | 'kontakt'
  | 'mitglied-werden'
  | 'impressum'
  | 'datenschutz'

export type NavigationItem = {
  label: string
  page: Exclude<PageKey, 'home' | 'impressum' | 'datenschutz'>
}

export type LegalInfo = {
  providerName: string
  legalForm: string
  street: string
  postalCode: string
  city: string
  representedBy: string
  registerInfo: string
  phone: string
  email: string
  responsiblePerson: string
  hostingProvider: string
  hostingPrivacyUrl: string
}

export const navigation: NavigationItem[] = [
  { label: 'Wahl', page: 'wahl' },
  { label: 'Programm', page: 'forderungen' },
  { label: 'Ansprechpartner', page: 'kandidierende' },
  { label: 'Presse', page: 'presse' },
  { label: 'Mitglied werden', page: 'mitglied-werden' },
  { label: 'Kontakt', page: 'kontakt' },
]

export const membershipFormUrl = 'https://www.rcds.de/formulare/Mitgliedwerden/'

export const membershipSteps: MembershipStep[] = [
  {
    title: 'Aufnahmeantrag ausfüllen',
    text: 'Das offizielle Bundesformular fragt die notwendigen Kontaktdaten, den Landesverband und die gewünschte RCDS-Gruppe ab.',
  },
  {
    title: 'E-Mail bestätigen',
    text: 'Aus Sicherheitsgründen wird eine Verifikationsmail verschickt. Erst nach der Bestätigung werden die Angaben weitergegeben.',
  },
  {
    title: 'Rückmeldung vor Ort',
    text: 'Der Antrag geht an den zuständigen Verband vor Ort. Für Bremen melden wir uns anschließend direkt bei dir.',
  },
]

export const membershipFieldGroups: MembershipFieldGroup[] = [
  {
    title: 'Kontaktdaten',
    fields: [
      'Vorname und Nachname',
      'E-Mail-Adresse',
      'Geburtsdatum',
      'Adresse',
      'Telefon optional',
    ],
  },
  {
    title: 'Zuordnung',
    fields: [
      'Landesverband',
      'Gewünschte RCDS-Gruppe',
      'Werbung durch Person optional',
    ],
  },
  {
    title: 'Datenschutz',
    fields: [
      'Einwilligung zur Datenverarbeitung',
      'E-Mail-Adresse zur Verifikation',
    ],
  },
]

export const electionInfo: ElectionInfo = {
  title: 'Gremienwahlen vom 08. bis 12. Juni 2026',
  dateRange: '08.-12. Juni 2026',
  bodies: ['Studierendenrat', 'Akademischer Senat', 'Fachbereichsräte 1-12'],
  votingNote: 'Als Wahlausweis gilt der aktuelle Studierendenausweis.',
  electionNote:
    'SR-Wahl und Gremienwahlen finden in derselben Wahlwoche statt, sind aber getrennte Wahlen mit eigenen Wahlordnungen.',
  pollingPlaces: [
    'Glashalle',
    'Grazer Straße 2',
    'Forum am Domshof',
    'GW 2',
    'Mensa',
    'MZH',
    'NW 1',
    'SFG',
  ],
  summary:
    'Im Sommersemester 2026 wählt die Universität Bremen die studentischen Vertreterinnen und Vertreter für Studierendenrat, Akademischen Senat und Fachbereichsräte.',
  sourceUrl: 'https://www.uni-bremen.de/gremienwahlen',
  studentCouncilSourceUrl: 'https://sr.uni-bremen.de/wiki/Hauptseite',
}

export const programSections: ProgramSection[] = [
  {
    id: 'studium-2026',
    hotTake: 'Wir studieren 2026 wie in 2006.',
    intro: [
      'Die Universität Bremen darf kein Ort des Stillstands sein. Studium muss heute mehr sein als reine Theorie: Es soll auf das Berufsleben vorbereiten, Innovation fördern und Studierenden die bestmöglichen Bedingungen zum Lernen bieten.',
      'Wir wollen eine moderne Hochschule, die Praxisnähe, Eigenverantwortung und Zukunftskompetenzen stärkt. Deshalb setzen wir uns für konkrete Verbesserungen im Studienalltag ein: von sauberen Lernräumen bis hin zu mehr Kooperationen mit Unternehmen und Start-ups.',
    ],
    demands: [
      {
        title: 'Bibliotheken modernisieren',
        text: 'Bibliotheken sind zentrale Lernorte. Wir setzen uns für mehr Lernplätze, längere Öffnungszeiten, besonders in Prüfungsphasen und am Wochenende, moderne Arbeitsbereiche, Gruppenarbeitsräume, stabile digitale Infrastruktur und ruhige Lernzonen ein. Die juristische Teilbibliothek soll als geschützter Lernraum für Jura-Studierende erhalten bleiben. Außerdem fordern wir eine digitale Anzeige der Sitzplatzbelegung und online reservierbare Lernplätze.',
      },
      {
        title: 'Kontrollierter Zugang zu KI-Tools',
        text: 'Fachschaften und studentische Initiativen sollen einen eingeschränkten, aber kostenfreien Zugang zu KI-Tools wie ChatGPT Plus erhalten, um organisatorische Aufgaben, Projektarbeiten und studentische Angebote effizienter gestalten zu können.',
      },
      {
        title: 'Saubere Hochschulen und Vorgehen gegen Vandalismus',
        text: 'Ein gutes Lernumfeld beginnt bei den grundlegenden Bedingungen. Verschmutzte Hörsäle, unzureichend gereinigte Sanitäranlagen und überfüllte Mülleimer beeinträchtigen den Studienalltag. Wir fordern bessere Reinigungskonzepte, regelmäßige Pflege der Hochschulgebäude und konsequente Maßnahmen gegen Beschädigungen an Bibliotheken, Lernräumen und Hochschulgebäuden.',
      },
      {
        title: 'Videoaufzeichnungen ausbauen',
        text: 'Nicht alle Studierenden können jede Vorlesung in Präsenz besuchen, etwa wegen Arbeit, familiärer Verpflichtungen oder langer Pendelwege. Digitale Lehrangebote schaffen mehr Flexibilität und ermöglichen individuelles Lernen ohne Nachteile.',
      },
      {
        title: 'Mehr Kooperationen mit Unternehmen',
        text: 'Studium darf nicht an der Praxis vorbeigehen. Wir wollen die Zusammenarbeit zwischen Universität und Unternehmen stärken, damit Studierende frühzeitig Einblicke in Berufsfelder erhalten, Netzwerke aufbauen und praktische Erfahrungen sammeln können.',
      },
      {
        title: 'Projektarbeit und Case Studies fördern',
        text: 'Theorie bleibt wichtig, muss aber stärker mit praktischen Anwendungen verbunden werden. Wir setzen uns für mehr projektorientiertes Arbeiten, reale Fallstudien und Kooperationen mit Unternehmen innerhalb der Lehrveranstaltungen ein.',
      },
      {
        title: 'Bessere Kooperationen für Praktika',
        text: 'Viele Studierende haben Schwierigkeiten, passende Praktikumsplätze zu finden. Wir möchten langfristige Partnerschaften zwischen Hochschulen, Unternehmen und Organisationen fördern, um den Zugang zu hochwertigen Praktika zu erleichtern und den Berufseinstieg zu unterstützen.',
      },
      {
        title: 'Start-ups und Innovation fördern',
        text: 'Innovative Ideen von Studierenden verdienen Unterstützung. Wir wollen Gründungsinitiativen stärken und Programme wie BRIDGE weiter ausbauen. Wer eigene Projekte oder Start-ups entwickelt, soll an der Hochschule Beratung, Infrastruktur und Förderung erhalten.',
      },
    ],
  },
  {
    id: 'campusleben',
    hotTake: 'Der Campus Bremen ist tot!',
    intro: [
      'Das Campusleben an der Universität Bremen ist für Studierende aus anderen Städten oft nicht attraktiv genug. Viele beklagen ein fehlendes Sicherheitsgefühl und einen geringen Wohlfühlfaktor am Campus.',
      'Wir glauben: Wer sich wohlfühlt, lernt besser. Deshalb wollen wir den Campus lebendiger, sicherer und alltagstauglicher machen.',
    ],
    demands: [
      {
        title: 'Bremen lebt!',
        text: 'Wir wollen mehr Events am Campus der Universität Bremen und bis in die Innenstadt hinein. Veranstaltungen wie die Campus Night sollen keine Ausnahme sein. Fachschaften sollen finanzielle Unterstützung der Universität erhalten, um solche Events umzusetzen und dabei zugleich Kompetenzen im Eventmanagement aufzubauen.',
      },
      {
        title: 'Mensa für alle',
        text: 'Mit Maß und Mitte: Alle Studierenden sollen sich mit dem Essensangebot identifizieren können. Wir stellen uns gegen Initiativen wie eine rein vegane Mensa und wollen, dass vegetarische, vegane und omnivore Studierende in der Mensa passende Angebote finden.',
      },
      {
        title: 'Den Studierenden nicht den Hahn abdrehen',
        text: 'Die Universität Bremen bietet aktuell keine offizielle kostenlose Möglichkeit, sich am Campus mit Wasser zu versorgen. Wir fordern kostenlose Trinkwasserversorgung durch zusätzliche Wasserhähne mit Leitungswasser auf dem Campus.',
      },
      {
        title: 'Feel-Good-Campus werden',
        text: 'Die Universität soll ein offener Ort bleiben, an dem sich Studierende sicher und wohl fühlen. Wir fordern, den Sicherheitsdienst aus der Bibliothek auf den gesamten Campus auszuweiten, Vandalismus stärker zu verfolgen und Beschmierungen sowie Beschädigungen konsequenter zu verhindern.',
      },
    ],
  },
  {
    id: 'verwaltung',
    hotTake: 'Verwaltung ist kein Escape Room',
    intro: [
      'Wer in Bremen studiert, muss sich durch PABO, FlexNow, MOIN, Stud.IP, Fachschaftsseiten, Fachbereichsseiten, Studierendenwerk und SuUB klicken. Dazu kommen Mensakarte, Bibliothekskarte und weitere Verfahren in den ersten Wochen.',
      'Diese Prozesse müssen verschlankt werden. Gleichzeitig zeigen steigende Semesterbeiträge, dass Universität und studentische Selbstverwaltung klare Prioritäten bei Ausgaben und Investitionen setzen müssen.',
    ],
    demands: [
      {
        title: 'AStA-Reform jetzt',
        text: 'Wir wollen einen AStA, der verantwortungsvoll und transparent mit den Geldern der Studierenden umgeht. Ein AStA-Beitrag von 10 Euro pro Studierendem reicht aus, um die Projekte des AStA zu finanzieren. Das Land soll künftig Verwaltungskosten decken. Der AStA soll jährlich öffentlich darlegen, wofür die Gelder ausgegeben werden.',
      },
      {
        title: 'Digitale Gremienwahl ermöglichen',
        text: 'Eine Wahlbeteiligung von rund 6 Prozent für eines der wichtigsten hochschulpolitischen Gremien ist zu wenig. Gerade Pendlerinnen und Pendler sowie verhinderte Studierende brauchen eine niedrigschwellige Möglichkeit zur Teilnahme. Deshalb fordern wir digitale Wahlen.',
      },
      {
        title: 'Weg vom Website- und Plastikkartenchaos',
        text: 'Die Vielzahl an Websites und Karten überfordert besonders neue Studierende. Eine Integration zentraler Dienste in eine App würde den Alltag deutlich erleichtern. Andere Hochschulen zeigen, dass digitale Ausweise und gebündelte Dienste möglich sind.',
      },
      {
        title: 'Hin zur Volluniversität',
        text: 'Bremen ist die zehntgrößte Stadt Deutschlands, aber die einzige Universität des Bundeslandes ist noch keine Volluniversität. Dazu gehört auch der Aufbau einer medizinischen Fakultät in Kooperation mit Kliniken im Bundesland.',
      },
    ],
  },
  {
    id: 'stadt-und-land',
    hotTake: 'Die Uni kann nicht alle Probleme alleine lösen',
    intro: [
      'Nicht jedes Problem kann die Universität im Alleingang lösen. Hier braucht es Unterstützung aus der Bürgerschaft und von anderen Hochschulen.',
      'Wir setzen deshalb auf intensive Zusammenarbeit mit unseren Partnern auf allen Ebenen und bringen diese Themen auch über die Studierendenratsebene hinaus ein.',
    ],
    demands: [
      {
        title: 'Bessere Anbindung an den Zentralcampus',
        text: 'Der Campus in Horn-Lehe muss besser durch den ÖPNV mit Bremen-Nord, Bremerhaven und dem Umland verbunden werden. Der geplante DB-Haltepunkt Bremen Universität wird dringend gebraucht. Außerdem braucht es häufigere Bus-Takte, den Ausbau der Linie 8 bis zum GW1 zur Entlastung der Linie 6 und bis dahin temporär eine Buslinie S6 mit den Haltestellen Domsheide, Hauptbahnhof, GW1, Zentralbereich und NW1.',
      },
      {
        title: 'Abschaffung der Zivilklausel',
        text: 'Die Zivilklausel im Bremischen Hochschulgesetz halten wir für ein falsches Signal gegenüber Wissenschaft, Industrie und europäischen Partnern. Angesichts aktueller sicherheitspolitischer Herausforderungen fordern wir ihre Abschaffung.',
      },
      {
        title: 'Ein Veranstaltungsgebäude in der City',
        text: 'Das Galeria-Kaufhof-Gebäude soll umgebaut und von den Bremer Hochschulen gemeinsam als Veranstaltungs- und Vorlesungsgebäude genutzt werden. So kommen mehr Studierende in die Stadt, die Innenstadt wird belebt und der Austausch zwischen den Hochschulen gestärkt.',
      },
    ],
  },
]

export const programHighlights: ProgramHighlight[] = [
  {
    title: 'Uni kann mehr',
    text: 'Mehr Praxis, moderne Bibliotheken, KI-Zugang, Videoaufzeichnungen und echte Innovationsförderung.',
    targetId: 'studium-2026',
  },
  {
    title: 'Campus lebt',
    text: 'Mehr Events, Trinkwasser, Mensa für alle und ein Campus, auf dem man sich gerne aufhält.',
    targetId: 'campusleben',
  },
  {
    title: 'Verwaltung vereinfachen',
    text: 'Eine App statt Website- und Plastikkartenchaos, digitale Gremienwahl und transparente Beiträge.',
    targetId: 'verwaltung',
  },
  {
    title: 'Bremen besser anbinden',
    text: 'Bessere ÖPNV-Anbindung, City-Veranstaltungsort und klare Position zur Zivilklausel.',
    targetId: 'stadt-und-land',
  },
]

export const electionFaqs: ElectionFaq[] = [
  {
    question: 'Wann wird gewählt?',
    answer:
      'Die Gremienwahl an der Universität Bremen läuft vom 08. bis 12. Juni 2026.',
  },
  {
    question: 'Was wird gewählt?',
    answer:
      'Gewählt werden die studentischen Vertreterinnen und Vertreter im Akademischen Senat sowie in den Fachbereichsräten 1 bis 12.',
  },
  {
    question: 'Was brauche ich zur Wahl?',
    answer:
      'Studierende wählen mit dem Studierendenausweis. Weitere organisatorische Hinweise veröffentlicht die Universität auf ihrer offiziellen Wahlseite.',
  },
  {
    question: 'Warum ist die Wahl wichtig?',
    answer:
      'Die gewählten Vertreterinnen und Vertreter sprechen in zentralen Hochschulgremien mit, wenn es um Studienbedingungen, Organisation und Prioritäten der Universität geht.',
  },
]

export const membershipReasons: MembershipReason[] = [
  {
    title: 'Studentische Interessen vertreten',
    text: 'Mitgestaltung an deiner Hochschule und in der Landespolitik.',
  },
  {
    title: 'Netzwerk aufbauen',
    text: 'Zugang zu einem internationalen Netzwerk im größten und ältesten Studentenverband Deutschlands.',
  },
  {
    title: 'Skills entwickeln',
    text: 'Kompetenzen in Organisation, Kommunikation und Leadership erwerben.',
  },
  {
    title: 'Politische Bildung',
    text: 'Teilnahme an spannenden Veranstaltungen und Seminaren.',
  },
  {
    title: 'Demokratische Werte fördern',
    text: 'Eintreten für eine realitätsnahe und ideologiefreie Hochschullandschaft.',
  },
]

export const shareAssets: ShareAsset[] = [
  {
    title: 'Uni Bremen kann mehr',
    text: 'Hot-Take-Kachel für Programm und Lernbedingungen.',
    imagePath: 'assets/share-uni-kann-mehr.png',
  },
  {
    title: 'Campus Bremen lebt',
    text: 'Share-Kachel für Events, Mensa, Trinkwasser und Sicherheit.',
    imagePath: 'assets/share-campus-lebt.png',
  },
  {
    title: 'Verwaltung ist kein Escape Room',
    text: 'Share-Kachel für App, digitale Wahl und AStA-Reform.',
    imagePath: 'assets/share-verwaltung.png',
  },
  {
    title: 'Mitglied des RCDS werden',
    text: 'Share-Kachel mit fünf Gründen für eine Mitgliedschaft.',
    imagePath: 'assets/share-mitglied-werden.png',
  },
]

export const candidates: Candidate[] = [
  {
    listPosition: 1,
    name: 'Zara Sheikhi',
    studyProgram: 'Informatik',
    semesterSummer2026: 4,
    responsibilities: ['Studierendenrat (SR)', 'Fachbereich 3'],
    imagePath: 'assets/candidates/zara2.webp',
    imagePosition: '50% 88%',
    imageScale: '1.12',
    imageHoverScale: '1.16',
    placeholder: true,
  },
  {
    listPosition: 2,
    name: 'Mattis Wolf',
    studyProgram: 'Jura',
    semesterSummer2026: 4,
    responsibilities: ['Akademischer Senat (AS)', 'Fachbereich 6'],
    imagePath: 'assets/candidates/mattis2.webp',
    imagePosition: '50% 42%',
    placeholder: true,
  },
  {
    listPosition: 3,
    name: 'Amira Challaoui',
    studyProgram: 'Politikwissenschaft',
    semesterSummer2026: 2,
    responsibilities: ['Studierendenrat (SR)', 'Fachbereich 8'],
    imagePath: 'assets/candidates/amira.webp',
    imagePosition: '58% 50%',
    placeholder: true,
  },
  {
    listPosition: 4,
    name: 'Nils Gutmann',
    studyProgram: 'Jura',
    semesterSummer2026: 2,
    responsibilities: ['Fachbereich 6'],
    imagePath: 'assets/candidates/nils.webp',
    imagePosition: '50% 50%',
    placeholder: true,
  },
  {
    listPosition: 5,
    name: 'Charlotte Krömker',
    studyProgram:
      'Kommunikations- und Medienwissenschaften, Politikwissenschaften',
    semesterSummer2026: 6,
    responsibilities: ['Fachbereich 8', 'Fachbereich 9'],
    imagePath: 'assets/candidates/charlotte.webp',
    imagePosition: '52% 50%',
    placeholder: true,
  },
  {
    listPosition: 6,
    name: 'Lili Bürgerhoff',
    studyProgram: 'Politikwissenschaften, Soziologie',
    semesterSummer2026: 3,
    responsibilities: ['Fachbereich 8'],
    imagePath: 'assets/candidates/lili.webp',
    imagePosition: '52% 50%',
    placeholder: true,
  },
  {
    listPosition: 7,
    name: 'Jakob Hornhues',
    studyProgram: 'Politikwissenschaft',
    semesterSummer2026: 2,
    responsibilities: ['Fachbereich 8'],
    imagePath: 'assets/candidates/jakob.webp',
    imagePosition: '50% 42%',
    placeholder: true,
  },
  {
    listPosition: 8,
    name: 'Toni Foitl',
    studyProgram: 'Jura',
    semesterSummer2026: 2,
    responsibilities: ['Fachbereich 6'],
    placeholder: true,
  },
  {
    listPosition: 9,
    name: 'Lukas Aygün',
    studyProgram: 'Jura',
    semesterSummer2026: 10,
    responsibilities: ['Fachbereich 6'],
    placeholder: true,
  },
]

export const contactGroups: ContactGroup[] = [
  {
    id: 'studierendenrat',
    label: 'SR',
    title: 'Studierendenrat',
    description:
      'Ansprechpersonen für studentische Selbstverwaltung, AStA-Kontrolle und die Verwendung studentischer Beiträge.',
    memberNames: ['Zara Sheikhi', 'Amira Challaoui'],
  },
  {
    id: 'akademischer-senat',
    label: 'AS',
    title: 'Akademischer Senat',
    description:
      'Ansprechpartner für universitätsweite Entscheidungen zu Studium, Lehre und zentralen Einrichtungen.',
    memberNames: ['Mattis Wolf'],
  },
  {
    id: 'fachbereich-3',
    label: 'FB 3',
    title: 'Mathematik und Informatik',
    description: 'Ansprechpartner für Themen aus dem Fachbereich 3.',
    memberNames: ['Zara Sheikhi'],
  },
  {
    id: 'fachbereich-6',
    label: 'FB 6',
    title: 'Rechtswissenschaft',
    description: 'Ansprechpartner für Themen aus dem Fachbereich 6.',
    memberNames: ['Mattis Wolf', 'Nils Gutmann'],
  },
  {
    id: 'fachbereich-8',
    label: 'FB 8',
    title: 'Sozialwissenschaften',
    description: 'Ansprechpartner für Themen aus dem Fachbereich 8.',
    memberNames: [
      'Amira Challaoui',
      'Charlotte Krömker',
      'Lili Bürgerhoff',
      'Jakob Hornhues',
    ],
  },
  {
    id: 'fachbereich-9',
    label: 'FB 9',
    title: 'Kulturwissenschaften',
    description: 'Ansprechpartnerin für Themen aus dem Fachbereich 9.',
    memberNames: ['Charlotte Krömker'],
  },
]

export const pressReleases: PressRelease[] = []

export const leadCandidates: LeadCandidate[] = [
  {
    role: 'SR',
    body: 'Studierendenrat',
    name: 'Zara Sheikhi',
    text: 'Zara vertritt den RCDS im Studierendenrat. Er ist Ansprechpartner für die Arbeit der studentischen Selbstverwaltung, die Kontrolle des AStA und den verantwortungsvollen Umgang mit studentischen Beiträgen.',
  },
  {
    role: 'SR',
    body: 'Studierendenrat',
    name: 'Amira Challaoui',
    text: 'Amira vertritt den RCDS im Studierendenrat. Sie ist Ansprechpartnerin für die Arbeit der studentischen Selbstverwaltung, die Kontrolle des AStA und den verantwortungsvollen Umgang mit studentischen Beiträgen.',
  },
  {
    role: 'AS',
    body: 'Akademischer Senat',
    name: 'Mattis Wolf',
    text: 'Mattis ist Ansprechpartner für den Akademischen Senat und für universitätsweite Entscheidungen zu Studium, Lehre, Prüfungsordnungen und zentralen Einrichtungen.',
  },
]

export const contactLinks: ContactLink[] = [
  {
    label: 'E-Mail schreiben',
    href: 'mailto:zara.sheikhi@ju-bremen.de?subject=Mitmachen%20beim%20RCDS%20Bremen',
    icon: 'mail',
  },
  {
    label: 'Instagram öffnen',
    href: 'https://www.instagram.com/rcds.bremen/',
    icon: 'instagram',
  },
  {
    label: 'SR-Wahlseite öffnen',
    href: electionInfo.studentCouncilSourceUrl,
    icon: 'source',
  },
]

export const legalInfo: LegalInfo = {
  providerName: 'RCDS e.V.',
  legalForm: 'eingetragener Verein',
  street: 'Am Wall 135',
  postalCode: '28195',
  city: 'Bremen',
  representedBy: 'Zara Sheikhi',
  registerInfo: 'Vereinsregister: Angaben folgen',
  phone: '0176 65707242',
  email: 'zara.sheikhi@ju-bremen.de',
  responsiblePerson: 'Zara Sheikhi',
  hostingProvider: 'GitHub Pages',
  hostingPrivacyUrl:
    'https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement',
}

export const campaignSources = [
  {
    label: 'Uni Bremen Gremienwahlen',
    href: 'https://www.uni-bremen.de/gremienwahlen',
  },
  {
    label: 'RCDS Aufnahmeantrag',
    href: membershipFormUrl,
  },
  {
    label: 'CDU Bremen RCDS',
    href: 'https://www.cdu-bremen.de/partei/ring-christlich-demokratischer-studenten-rcds',
  },
  {
    label: 'Studierendenrat Uni Bremen',
    href: 'https://sr.uni-bremen.de/wiki/Hauptseite',
  },
]
