export const documentTypeLabels = {
  protocol: 'Protocol',
  report: 'Report',
  regulation: 'Regulation',
  presentation: 'Presentation',
  other: 'Document',
} as const;

export type DocumentType = keyof typeof documentTypeLabels;

export function getDocumentTypeLabel(type: DocumentType) {
  return documentTypeLabels[type];
}