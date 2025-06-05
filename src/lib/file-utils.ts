import { FileType } from './api/models/file-type';

export function getFileType(file: File): FileType {
  const mime = file.type;
  const name = file.name.toLowerCase();

  if (mime === 'image/png' || name.endsWith('.png')) return FileType.PNG;
  if (mime === 'image/jpeg' || name.endsWith('.jpg') || name.endsWith('.jpeg'))
    return FileType.JPG;
  if (mime === 'image/gif' || name.endsWith('.gif')) return FileType.GIF;
  if (mime === 'image/webp' || name.endsWith('.webm')) return FileType.WEBM;
  if (mime === 'image/svg+xml' || name.endsWith('.svg')) return FileType.SVG;
  if (name.endsWith('.ai')) return FileType.AI;

  if (mime === 'application/pdf' || name.endsWith('.pdf')) return FileType.PDF;
  if (
    mime ===
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
    name.endsWith('.xlsx')
  )
    return FileType.XLSX;

  if (name.endsWith('.glb')) return FileType.GLB;
  if (name.endsWith('.gltf')) return FileType.GLTF;

  if (mime === 'audio/mpeg' || name.endsWith('.mp3')) return FileType.MP3;
  if (mime === 'audio/wav' || name.endsWith('.wav')) return FileType.WAV;

  if (mime === 'video/mp4' || name.endsWith('.mp4')) return FileType.MP4;

  if (
    mime ===
      'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
    name.endsWith('.pptx')
  )
    return FileType.PPTX;

  return FileType.None;
}
