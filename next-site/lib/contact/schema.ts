import { z } from "zod";
import { budgets, serviceOptions } from "./options.ts";
const line = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .transform((v) => v.replace(/\s+/g, " "));
const requiredLine = (max: number) =>
  line(max).pipe(z.string().min(2, "Please provide at least two characters."));
export const inquirySchema = z
  .object({
    submissionId: z.uuid(),
    name: requiredLine(100),
    email: z.string().trim().toLowerCase().max(254).pipe(z.email()),
    company: line(160),
    website: line(500).refine((v) => {
      if (!v) return true;
      try {
        return ["http:", "https:"].includes(new URL(v).protocol);
      } catch {
        return false;
      }
    }, "Use a full http or https website address."),
    country: requiredLine(100),
    projectType: z.enum([
      "New website",
      "Website redesign",
      "Business software",
      "AI workflow",
      "Search visibility",
      "Not sure",
    ]),
    stage: z.enum(["Exploring options", "Ready to plan", "Design exists", "Existing product"]),
    problem: requiredLine(1500),
    budget: z.enum(budgets),
    timeline: z.enum(["Flexible", "Within 1 month", "1–3 months", "3–6 months", "Later"]),
    services: z.array(z.enum(serviceOptions)).min(1, "Choose at least one service.").max(6),
    source: line(200),
    message: z.string().trim().max(3000),
    consent: z.literal(true, { error: "Please consent to being contacted about this inquiry." }),
    websiteCompany: line(200).default(""),
    utmSource: line(160).default(""),
    utmCampaign: line(160).default(""),
  })
  .strict();
export type Inquiry = z.infer<typeof inquirySchema>;
export function scoreInquiry(v: Inquiry) {
  return Math.min(
    100,
    30 +
      (v.company ? 10 : 0) +
      (v.website ? 10 : 0) +
      (v.problem.length >= 80 ? 20 : 0) +
      (v.stage === "Ready to plan" ? 15 : 0) +
      (v.message.length >= 50 ? 10 : 0) +
      (v.services.length ? 5 : 0),
  );
}
