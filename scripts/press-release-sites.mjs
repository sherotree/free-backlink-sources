/**
 * Curated press-release newswires with a free submission path.
 *
 * These are deliberately outside the LaunchHub export:
 * - they publish company news rather than product listings, and
 * - the export carries no traffic or score figures for them.
 *
 * `verification` is a manual review label, not a scraped value.
 * - "verified" — a free self-serve submission path was confirmed by hand.
 * - "claimed"  — the site advertises a free path; review strictness still needs
 *                confirmation.
 *
 * Keep this file as the source of truth. The weekly sync renders it into
 * README.md as-is, so edits here survive regeneration. Update DR values from
 * the same source you use for the rest of the list.
 */
export const PRESS_RELEASE_SITES = [
  {
    name: "PRLog",
    siteUrl: "https://prlog.org/",
    dr: 83,
    verification: "verified",
  },
  {
    name: "PRFree",
    siteUrl: "https://prfree.org/",
    dr: 61,
    verification: "verified",
  },
  {
    name: "ARC Newswire",
    siteUrl: "https://arcnewswire.com/",
    dr: 38,
    verification: "verified",
  },
  {
    name: "PRBASE",
    siteUrl: "https://prbase.org/",
    dr: 34,
    verification: "verified",
  },
  {
    name: "OpenPR",
    siteUrl: "https://openpr.com/",
    dr: 83,
    verification: "claimed",
  },
  {
    name: "PR.com",
    siteUrl: "https://pr.com/",
    dr: 80,
    verification: "claimed",
  },
  {
    name: "IssueWire",
    siteUrl: "https://issuewire.com/",
    dr: 77,
    verification: "claimed",
  },
  {
    name: "1888PressRelease",
    siteUrl: "https://1888pressrelease.com/",
    dr: 66,
    verification: "claimed",
  },
];
