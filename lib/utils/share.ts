import { siteConfig } from "@/lib/config/site";

export interface SummaryData {
  label: string;
  value: string;
  totalCredits: number;
  semesterName?: string;
}

export function generateGpaSummary(data: SummaryData): string {
  const lines: string[] = [];
  lines.push(`My GPA: ${data.value} (${data.totalCredits} credits)`);
  
  if (data.semesterName) {
    lines.push(`${data.semesterName}: ${data.value} over ${data.totalCredits} credits`);
  }
  
  lines.push(`Calculated with ${siteConfig.url}/`);
  
  return lines.join("\n");
}

export function generateCgpaSummary(data: SummaryData): string {
  const lines: string[] = [];
  lines.push(`My CGPA: ${data.value} (${data.totalCredits} credits)`);
  lines.push(`Calculated with ${siteConfig.url}/`);
  return lines.join("\n");
}

export async function copyToClipboard(text: string): Promise<boolean> {
  if (!navigator.clipboard) {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      return true;
    } catch {
      return false;
    }
  }
  
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export async function copyToClipboardOnly(text: string): Promise<boolean> {
  return copyToClipboard(text);
}

export async function shareResult(text: string, title: string): Promise<boolean> {
  if (!navigator.share) {
    return false;
  }
  
  try {
    await navigator.share({ title, text });
    return true;
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return false;
    }
    return false;
  }
}

export async function copyOrShare(
  text: string,
  title: string,
  onSuccess: (method: "copy" | "share") => void,
  onError: () => void
): Promise<void> {
  if (navigator.share) {
    try {
      await navigator.share({ title, text });
      onSuccess("share");
      return;
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }
    }
  }
  
  const copied = await copyToClipboard(text);
  if (copied) {
    onSuccess("copy");
  } else {
    onError();
  }
}