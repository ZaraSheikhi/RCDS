import pressReleaseBsuUrl from '../../presse/PM/PM_BSU_020826.pdf?url'
import statementInteriorUrl from '../../presse/PM/S21-338 Stellungnahme INNERES - Bearbeitung Aufenthaltstitel internationale Studierende.pdf?url'
import statementScienceUrl from '../../presse/PM/S21-338 Stellungnahme UMWELT - Bearbeitung Aufenthaltstitel internationale Studierende.pdf?url'

export type ElectionInfo = {
  title: string
  dateRange: string
  summary: string
  studentCouncilResultUrl: string
  committeeResultUrl: string
}

export type ElectionPersonResult = {
  name: string
  votes: number
  outcome: 'Gewählt' | 'Vertretung'
}

export type ElectionResult = {
  id: string
  body: string
  detail: string
  votes: number
  voteShare: string
  seats: number
  turnout: string
  people: ElectionPersonResult[]
  note?: string
  sourceUrl: string
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
  institution: InstitutionKey
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

export type MembershipReason = {
  title: string
  text: string
}

export type ContactGroup = {
  id: string
  institution: InstitutionKey
  label: string
  title: string
  description: string
  memberNames: string[]
}

export type PressRelease = {
  date: string
  dateLabel: string
  page: PageKey
  kicker: string
  title: string
  summary: string
  href?: string
  content: Array<{
    type: 'paragraph' | 'quote'
    text: string
  }>
  attachments?: Array<{
    label: string
    href: string
  }>
}

export type CurrentProject = {
  status: string
  title: string
  text: string
  page?: PageKey
}

export type UpcomingEvent = {
  date: string
  title: string
  details: string
  href?: string
}

export type InstitutionKey = 'universitaet-bremen' | 'hochschule-bremen'

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
  | 'pressemitteilung-bsu'
  | 'kontakt'
  | 'mitglied-werden'
  | 'impressum'
  | 'datenschutz'

export type NavigationItem = {
  label: string
  page: Exclude<
    PageKey,
    'home' | 'impressum' | 'datenschutz' | 'pressemitteilung-bsu'
  >
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
  title: 'Wahl',
  dateRange: '08.-12. Juni 2026',
  summary:
    'Im Wahlarchiv dokumentieren wir die offiziellen Ergebnisse der Studierendenrats- und Gremienwahlen an der Universität Bremen.',
  studentCouncilResultUrl:
    'https://sr.uni-bremen.de/w/images/e/e3/Endgueltiges_Wahlergebnis_2026.pdf',
  committeeResultUrl:
    'https://www.uni-bremen.de/fileadmin/user_upload/sites/gremienwahlen/Gremienwahlen2026_Wahlergebnisse_Committee_Elections2026_Election_Results.pdf',
}

export const electionResults: ElectionResult[] = [
  {
    id: 'studierendenrat',
    body: 'Studierendenrat',
    detail: 'Liste 2: RCDS',
    votes: 93,
    voteShare: '6,36 %',
    seats: 2,
    turnout: '8,40 %',
    people: [
      { name: 'Zara Sheikhi', votes: 24, outcome: 'Gewählt' },
      { name: 'Amira Challaoui', votes: 9, outcome: 'Gewählt' },
      { name: 'Nils Gutmann', votes: 8, outcome: 'Vertretung' },
      { name: 'Mattis Wolf', votes: 2, outcome: 'Vertretung' },
      { name: 'Charlotte Krömker', votes: 2, outcome: 'Vertretung' },
      { name: 'Lili Bürgerhoff', votes: 1, outcome: 'Vertretung' },
      { name: 'Lukas Aygün', votes: 1, outcome: 'Vertretung' },
      { name: 'Jakob Hornhues', votes: 0, outcome: 'Vertretung' },
      { name: 'Toni Foitl', votes: 0, outcome: 'Vertretung' },
    ],
    note: 'Zara Sheikhi erhielt mit 24 persönlichen Stimmen die meisten Stimmen auf der RCDS-Liste. Er und Amira Challaoui sind für die Amtszeit 2026/27 in den Studierendenrat gewählt.',
    sourceUrl:
      'https://sr.uni-bremen.de/w/images/e/e3/Endgueltiges_Wahlergebnis_2026.pdf',
  },
  {
    id: 'akademischer-senat',
    body: 'Akademischer Senat',
    detail: 'Liste 1: RCDS',
    votes: 142,
    voteShare: '10,43 %',
    seats: 0,
    turnout: '8,60 %',
    people: [
      { name: 'Zara Sheikhi', votes: 73, outcome: 'Vertretung' },
      { name: 'Mattis Wolf', votes: 41, outcome: 'Vertretung' },
      { name: 'Amira Challaoui', votes: 28, outcome: 'Vertretung' },
    ],
    sourceUrl:
      'https://www.uni-bremen.de/fileadmin/user_upload/sites/gremienwahlen/Gremienwahlen2026_Wahlergebnisse_Committee_Elections2026_Election_Results.pdf',
  },
  {
    id: 'fachbereich-3',
    body: 'Fachbereichsrat 3',
    detail: 'Einzelbewerbung RCDS',
    votes: 41,
    voteShare: '25,00 %',
    seats: 0,
    turnout: '7,20 %',
    people: [{ name: 'Zara Sheikhi', votes: 41, outcome: 'Vertretung' }],
    note: 'Der zweite Sitz wurde bei gleicher Höchstzahl durch Los an die Liste der Stugen des FB 3 vergeben.',
    sourceUrl:
      'https://www.uni-bremen.de/fileadmin/user_upload/sites/gremienwahlen/Gremienwahlen2026_Wahlergebnisse_Committee_Elections2026_Election_Results.pdf',
  },
  {
    id: 'fachbereich-8',
    body: 'Fachbereichsrat 8',
    detail: 'Einzelbewerbung Amira Challaoui',
    votes: 21,
    voteShare: '6,73 %',
    seats: 0,
    turnout: '15,40 %',
    people: [{ name: 'Amira Challaoui', votes: 21, outcome: 'Vertretung' }],
    sourceUrl:
      'https://www.uni-bremen.de/fileadmin/user_upload/sites/gremienwahlen/Gremienwahlen2026_Wahlergebnisse_Committee_Elections2026_Election_Results.pdf',
  },
]

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

export const candidates: Candidate[] = [
  {
    listPosition: 1,
    name: 'Zara Sheikhi',
    institution: 'universitaet-bremen',
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
    institution: 'universitaet-bremen',
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
    institution: 'universitaet-bremen',
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
    institution: 'universitaet-bremen',
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
    institution: 'universitaet-bremen',
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
    institution: 'universitaet-bremen',
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
    institution: 'universitaet-bremen',
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
    institution: 'universitaet-bremen',
    studyProgram: 'Jura',
    semesterSummer2026: 2,
    responsibilities: ['Fachbereich 6'],
    placeholder: true,
  },
  {
    listPosition: 9,
    name: 'Lukas Aygün',
    institution: 'universitaet-bremen',
    studyProgram: 'Jura',
    semesterSummer2026: 10,
    responsibilities: ['Fachbereich 6'],
    placeholder: true,
  },
]

export const contactGroups: ContactGroup[] = [
  {
    id: 'studierendenrat',
    institution: 'universitaet-bremen',
    label: 'SR',
    title: 'Studierendenrat',
    description:
      'Ansprechpersonen für studentische Selbstverwaltung, AStA-Kontrolle und die Verwendung studentischer Beiträge.',
    memberNames: ['Zara Sheikhi', 'Amira Challaoui'],
  },
  {
    id: 'akademischer-senat',
    institution: 'universitaet-bremen',
    label: 'AS',
    title: 'Akademischer Senat',
    description:
      'Ansprechpartner für universitätsweite Entscheidungen zu Studium, Lehre und zentralen Einrichtungen.',
    memberNames: ['Mattis Wolf'],
  },
  {
    id: 'fachbereich-3',
    institution: 'universitaet-bremen',
    label: 'FB 3',
    title: 'Mathematik und Informatik',
    description: 'Ansprechpartner für Themen aus dem Fachbereich 3.',
    memberNames: ['Zara Sheikhi'],
  },
  {
    id: 'fachbereich-6',
    institution: 'universitaet-bremen',
    label: 'FB 6',
    title: 'Rechtswissenschaft',
    description: 'Ansprechpartner für Themen aus dem Fachbereich 6.',
    memberNames: ['Mattis Wolf', 'Nils Gutmann'],
  },
  {
    id: 'fachbereich-8',
    institution: 'universitaet-bremen',
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
    institution: 'universitaet-bremen',
    label: 'FB 9',
    title: 'Kulturwissenschaften',
    description: 'Ansprechpartnerin für Themen aus dem Fachbereich 9.',
    memberNames: ['Charlotte Krömker'],
  },
]

export const pressReleases: PressRelease[] = [
  {
    date: '2026-08-02',
    dateLabel: '02.08.2026',
    page: 'pressemitteilung-bsu',
    kicker: 'Stellungnahmen zur Petition machen Ausmaß der Probleme deutlich',
    title:
      'Internationale Studierende dürfen nicht länger im Stich gelassen werden',
    summary:
      'Die Stellungnahmen zur RCDS-Petition zeigen die strukturelle Überlastung des Bremen Service Universität. Der RCDS Bremen fordert schnellere Verfahren, ausreichend Personal, zügige Fiktionsbescheinigungen und eine transparente Kommunikation mit den Betroffenen.',
    href: pressReleaseBsuUrl,
    content: [
      {
        type: 'paragraph',
        text: 'Die Stellungnahme des Innenresorts zur vom RCDS bei der Bremischen Bürgerschaft eingereichten Petition „S21-338—Bearbeitung Aufenthaltstitel Internationale Studierende“ wirft die Frage auf, welche Prioritäten der Senat gesetzt hat. Innerhalb von nur zwei Semestern ist der Semesterbeitrag um mehr als 100 Euro gestiegen. Studierende sollen diese zusätzlichen Belastungen tragen und sich ihren Lebensunterhalt zunehmend selbst finanzieren. Doch ausgerechnet diejenigen, die bereit sind zu arbeiten, werden durch monatelange Wartezeiten bei Aufenthaltstiteln und Fiktionsbescheinigungen daran gehindert. Wer Studierenden höhere finanzielle Belastungen zumutet, muss auch sicherstellen, dass sie überhaupt die Möglichkeit haben, legal zu arbeiten und ihren Lebensunterhalt zu sichern.',
      },
      {
        type: 'paragraph',
        text: 'Bremen wirbt international um Studierende und zukünftige Fachkräfte. Wer diesen Anspruch ernst nimmt, muss auch dafür sorgen, dass Menschen nicht monatelang auf aufenthaltsrechtlich notwendige Dokumente warten oder ihren Arbeitsplatz verlieren, weil die Verwaltung überlastet ist.',
      },
      {
        type: 'paragraph',
        text: 'Zara Sheikhi, Landesvorsitzender des RCDS Bremen, zeigt sich besorgt.',
      },
      {
        type: 'quote',
        text: 'Der Senat gefährdet die Attraktivität des Wissenschafts- und Wirtschaftsstandorts Bremen.',
      },
      {
        type: 'paragraph',
        text: 'Besonders enttäuschend ist auch das Schweigen des AStA. Als Interessenvertretung aller Studierenden müsste er sich gerade bei einem Problem, das so viele internationale Studierende in ihrer Existenz betrifft, deutlich positionieren. Statt politischen Druck in der Politik für eine Entlastung des Bremen Service Universität aufzubauen oder das Thema öffentlich sichtbar zu machen, hört man aus der AStA Etage nichts. Internationale Studierende dürfen nicht erst dann Thema sein, wenn über Diversität gesprochen wird. Sie brauchen auch Unterstützung, wenn ihre Existenz durch Verwaltungsversagen gefährdet wird.',
      },
      {
        type: 'paragraph',
        text: 'Mit den vorliegenden Stellungnahmen der Senatorin für Inneres und Sport liegt erstmals eine offizielle Einschätzung der Situation internationaler Studierender in Bremen vor. Das Ressort betont ausdrücklich die große Bedeutung internationaler Studierender für den Wissenschafts- und Wirtschaftsstandort Bremen sowie für die Fachkräftesicherung. Gleichzeitig räumt es ein, dass das Migrationsamt und der Bremen Service Universität (BSU) seit Jahren unter struktureller Überlastung leiden. Als Ursachen werden steigende Fallzahlen, eine wachsende Zahl an Anträgen und E-Mails sowie fehlende personelle Kapazitäten genannt. Organisatorische Verbesserungen und die Digitalisierung hätten zwar einzelne Abläufe erleichtert, könnten die grundlegenden Probleme allerdings nicht lösen.',
      },
      {
        type: 'paragraph',
        text: 'Besonders alarmierend ist, dass das Innenressort selbst von lediglich drei Mitarbeitenden spricht, die beim Bremen Service Universität für die aufenthaltsrechtlichen Angelegenheiten von mehr als 5.500 internationalen Studierenden und Forschenden zuständig sind. Gleichzeitig werden Terminwartezeiten von rund 13 Wochen genannt. Aus Gesprächen mit Betroffenen ist dem RCDS Bremen bekannt, dass die Realität häufig noch deutlich drastischer aussieht. Bearbeitungszeiten von sechs Monaten oder länger sind längst keine Seltenheit. Hinzu kommen erhebliche Verzögerungen bei der Ausstellung von Fiktionsbescheinigungen, obwohl gerade diese verhindern sollen, dass Studierende aufgrund behördlicher Bearbeitungszeiten Nachteile erleiden. Die verzögerte Ausstellung setzt die Studierenden erheblich unter Druck. Für viele steht die Wohnung oder der Nebenjob, der häufig die finanzielle Grundlage für das Studium bildet, auf dem Spiel.',
      },
      {
        type: 'paragraph',
        text: 'Wenn wegen ausstehender Dokumente der Arbeitsplatz verloren geht, geraten Studium, Wohnung und Lebensunterhalt gleichzeitig in Gefahr. Betroffene Studenten beschreiben die Situation dem RCDS gegenüber wie folgt:',
      },
      {
        type: 'quote',
        text: 'Dann ist das wirklich stressig, mit so vielen Sachen gleichzeitig umzugehen.',
      },
      {
        type: 'paragraph',
        text: 'Es geht um Menschen, die über Monate in Unsicherheit leben, weil sie trotz rechtzeitig gestellter Anträge nicht wissen, ob sie weiter arbeiten, ihr Praktikum antreten oder ihren Lebensunterhalt sichern können.',
      },
      {
        type: 'paragraph',
        text: 'Die Petition hat diese Missstände sichtbar gemacht. Jetzt müssen den Erkenntnissen konkrete Maßnahmen folgen: schnellere Verfahren, ausreichend Personal, eine zügige Ausstellung von Fiktionsbescheinigungen und eine transparente Kommunikation mit den Betroffenen.',
      },
    ],
    attachments: [
      {
        label: 'Stellungnahme der Senatorin für Inneres und Sport',
        href: statementInteriorUrl,
      },
      {
        label:
          'Stellungnahme der Senatorin für Umwelt, Klima und Wissenschaft',
        href: statementScienceUrl,
      },
    ],
  },
]

export const currentProjects: CurrentProject[] = [
  {
    status: 'Laufend',
    title: 'Campus-Anliegen aufnehmen',
    text: 'Wir sammeln konkrete Probleme und Ideen aus dem Hochschulalltag und bringen sie in die zuständigen Gremien ein.',
    page: 'kontakt',
  },
  {
    status: 'Amtszeit 2026/27',
    title: 'Arbeit im Studierendenrat',
    text: 'Mit zwei Sitzen vertreten Zara Sheikhi und Amira Challaoui den RCDS im Studierendenrat der Universität Bremen.',
    page: 'kandidierende',
  },
  {
    status: 'Nächster Schritt',
    title: 'Wahlprogramm weiterverfolgen',
    text: 'Die Forderungen aus der Wahl werden priorisiert und Schritt für Schritt in die politische Arbeit übersetzt.',
    page: 'forderungen',
  },
]

// Neue Termine können hier ergänzt werden und erscheinen automatisch auf der Startseite.
export const upcomingEvents: UpcomingEvent[] = []

export const leadCandidates: LeadCandidate[] = [
  {
    role: 'Gewählt 2026',
    body: 'Studierendenrat',
    name: 'Zara Sheikhi',
    text: 'Zara vertritt den RCDS im Studierendenrat. Er ist Ansprechpartner für die Arbeit der studentischen Selbstverwaltung, die Kontrolle des AStA und den verantwortungsvollen Umgang mit studentischen Beiträgen.',
  },
  {
    role: 'Gewählt 2026',
    body: 'Studierendenrat',
    name: 'Amira Challaoui',
    text: 'Amira vertritt den RCDS im Studierendenrat. Sie ist Ansprechpartnerin für die Arbeit der studentischen Selbstverwaltung, die Kontrolle des AStA und den verantwortungsvollen Umgang mit studentischen Beiträgen.',
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
    label: 'Wahlergebnis 2026 öffnen',
    href: electionInfo.studentCouncilResultUrl,
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
    label: 'SR-Wahlergebnis 2026',
    href: electionInfo.studentCouncilResultUrl,
  },
  {
    label: 'Gremienwahlergebnis 2026',
    href: electionInfo.committeeResultUrl,
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
