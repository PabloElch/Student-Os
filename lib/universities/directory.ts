export interface UniversityDirectoryEntry {
  id: string;
  name: string;
  region?: string;
  abbreviation?: string;
  type: "public" | "private";
  hasIndividualConfig: boolean;
}

export const ethiopianUniversities: UniversityDirectoryEntry[] = [
  { id: "adama-st", name: "Adama Science and Technology University", region: "Oromia", abbreviation: "ASTU", type: "public", hasIndividualConfig: false },
  { id: "addis-ababa-st", name: "Addis Ababa Science and Technology University", region: "Addis Ababa", abbreviation: "AASTU", type: "public", hasIndividualConfig: false },
  { id: "addis-ababa", name: "Addis Ababa University", region: "Addis Ababa", abbreviation: "AAU", type: "public", hasIndividualConfig: true },
  { id: "adigrat", name: "Adigrat University", region: "Tigray", abbreviation: "AGU", type: "public", hasIndividualConfig: false },
  { id: "axum", name: "Aksum University", region: "Tigray", abbreviation: "AKU", type: "public", hasIndividualConfig: false },
  { id: "ambo", name: "Ambo University", region: "Oromia", abbreviation: "AMU", type: "public", hasIndividualConfig: false },
  { id: "arbaminch", name: "Arba Minch University", region: "South Ethiopia", abbreviation: "AMU", type: "public", hasIndividualConfig: false },
  { id: "arsi", name: "Arsi University", region: "Oromia", abbreviation: "ASU", type: "public", hasIndividualConfig: false },
  { id: "assosa", name: "Assosa University", region: "Benishangul-Gumuz", abbreviation: "ASU", type: "public", hasIndividualConfig: false },
  { id: "bahir-dar", name: "Bahir Dar University", region: "Amhara", abbreviation: "BDU", type: "public", hasIndividualConfig: true },
  { id: "bonga", name: "Bonga University", region: "South West", abbreviation: "BoU", type: "public", hasIndividualConfig: false },
  { id: "bule-hora", name: "Bule Hora University", region: "Oromia", abbreviation: "BHU", type: "public", hasIndividualConfig: false },
  { id: "debark", name: "Debark University", region: "Amhara", abbreviation: "DeU", type: "public", hasIndividualConfig: false },
  { id: "debre-berhan", name: "Debre Berhan University", region: "Amhara", abbreviation: "DBU", type: "public", hasIndividualConfig: false },
  { id: "debre-markos", name: "Debre Markos University", region: "Amhara", abbreviation: "DMU", type: "public", hasIndividualConfig: false },
  { id: "debre-tabor", name: "Debre Tabor University", region: "Amhara", abbreviation: "DTU", type: "public", hasIndividualConfig: false },
  { id: "dilla", name: "Dilla University", region: "Sidama", abbreviation: "DU", type: "public", hasIndividualConfig: false },
  { id: "dire-dawa", name: "Dire Dawa University", region: "Dire Dawa", abbreviation: "DDU", type: "public", hasIndividualConfig: false },
  { id: "civil-service", name: "Ethiopian Civil Service University", region: "Addis Ababa", abbreviation: "ECSU", type: "public", hasIndividualConfig: false },
  { id: "gambella", name: "Gambella University", region: "Gambela", abbreviation: "GU", type: "public", hasIndividualConfig: false },
  { id: "haramaya", name: "Haramaya University", region: "Oromia", abbreviation: "HRU", type: "public", hasIndividualConfig: true },
  { id: "hawassa", name: "Hawassa University", region: "Sidama", abbreviation: "HwU", type: "public", hasIndividualConfig: true },
  { id: "injibara", name: "Injibara University", region: "Amhara", abbreviation: "IJU", type: "public", hasIndividualConfig: false },
  { id: "jigjiga", name: "Jigjiga University", region: "Somali", abbreviation: "JJU", type: "public", hasIndividualConfig: false },
  { id: "jimma", name: "Jimma University", region: "Oromia", abbreviation: "JU", type: "public", hasIndividualConfig: true },
  { id: "jinka", name: "Jinka University", region: "South Ethiopia", abbreviation: "JkU", type: "public", hasIndividualConfig: false },
  { id: "kebri-dehar", name: "Kebri Dehar University", region: "Somali", abbreviation: "KDU", type: "public", hasIndividualConfig: false },
  { id: "kotebe", name: "Kotebe Education University", region: "Addis Ababa", abbreviation: "KEU", type: "public", hasIndividualConfig: false },
  { id: "madda-walabu", name: "Madda Walabu University", region: "Oromia", abbreviation: "MWU", type: "public", hasIndividualConfig: false },
  { id: "metu", name: "Mattu University", region: "Oromia", abbreviation: "Mtu", type: "public", hasIndividualConfig: false },
  { id: "megdela-amba", name: "Mekdela Amba University", region: "Amhara", abbreviation: "MAU", type: "public", hasIndividualConfig: false },
  { id: "mekelle", name: "Mekelle University", region: "Tigray", abbreviation: "MU", type: "public", hasIndividualConfig: false },
  { id: "mizan-tepi", name: "Mizan-Tepi University", region: "South West", abbreviation: "MTU", type: "public", hasIndividualConfig: false },
  { id: "oda-bultum", name: "Oda Bultum University", region: "Oromia", abbreviation: "OBU", type: "public", hasIndividualConfig: false },
  { id: "oromia-state", name: "Oromia State University", region: "Oromia", abbreviation: "OSU", type: "public", hasIndividualConfig: false },
  { id: "raya", name: "Raya University", region: "Tigray", abbreviation: "RaU", type: "public", hasIndividualConfig: false },
  { id: "samara", name: "Samara University", region: "Afar", abbreviation: "SU", type: "public", hasIndividualConfig: false },
  { id: "selale", name: "Selale University", region: "Oromia", abbreviation: "SlU", type: "public", hasIndividualConfig: false },
  { id: "semera", name: "Semera University", region: "Afar", abbreviation: "SeU", type: "public", hasIndividualConfig: false },
  { id: "gondar", name: "University of Gondar", region: "Amhara", abbreviation: "UoG", type: "public", hasIndividualConfig: false },
  { id: "wachemo", name: "Wachamo University", region: "South Ethiopia", abbreviation: "WaU", type: "public", hasIndividualConfig: false },
  { id: "werabe", name: "Werabe University", region: "South West", abbreviation: "WeU", type: "public", hasIndividualConfig: false },
  { id: "wolaita-sodo", name: "Wolaita Sodo University", region: "South Ethiopia", abbreviation: "WSU", type: "public", hasIndividualConfig: false },
  { id: "woldiya", name: "Woldia University", region: "Amhara", abbreviation: "WDU", type: "public", hasIndividualConfig: false },
  { id: "wolkite", name: "Wolkite University", region: "South West", abbreviation: "WKU", type: "public", hasIndividualConfig: false },
  { id: "wollega", name: "Wollega University", region: "Oromia", abbreviation: "WOU", type: "public", hasIndividualConfig: false },
  { id: "wollo", name: "Wollo University", region: "Amhara", abbreviation: "WU", type: "public", hasIndividualConfig: false },
];

export function getUniversityById(id: string): UniversityDirectoryEntry | undefined {
  return ethiopianUniversities.find((u) => u.id === id);
}

export function getUniversitiesByRegion(region: string): UniversityDirectoryEntry[] {
  return ethiopianUniversities.filter((u) => u.region === region);
}

export function getAllUniversityRegions(): string[] {
  const regions = new Set(ethiopianUniversities.map((u) => u.region).filter((r): r is string => Boolean(r)));
  return Array.from(regions).sort();
}

export function searchUniversities(query: string): UniversityDirectoryEntry[] {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return ethiopianUniversities;
  return ethiopianUniversities.filter(
    (u) =>
      u.name.toLowerCase().includes(normalizedQuery) ||
      u.id.toLowerCase().includes(normalizedQuery) ||
      u.abbreviation?.toLowerCase().includes(normalizedQuery)
  );
}