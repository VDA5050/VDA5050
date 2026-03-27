import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(process.cwd());
const sourcePath = path.join(repoRoot, "VDA5050_EN.md");
const outRoot = path.join(repoRoot, "docs", "spec");
const rawAssetsBase = "https://raw.githubusercontent.com/VDA5050/VDA5050/main/assets/";

function mkdirp(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeFileEnsured(filePath, content) {
  mkdirp(path.dirname(filePath));
  fs.writeFileSync(filePath, content, "utf8");
}

function normalizeNewlines(s) {
  return s.replace(/\r\n/g, "\n");
}

function replaceAssets(content) {
  // Do not touch the source file; this is applied only to generated output.
  return content.replaceAll("](./assets/", `](${rawAssetsBase}`);
}

function sanitizeHtml(content) {
  // Do not touch the source file; this is applied only to generated output.
  // 1) Fix invalid </br> tags.
  // 2) Ensure <ul> is closed on the same line when used inside tables.
  const lines = content.split("\n").map((line) => {
    let out = line.replaceAll("</br>", "<br>");
    if (out.includes("<ul>") && !out.includes("</ul>")) {
      // Insert closing tag before the last pipe (table cell end) if present.
      const lastPipe = out.lastIndexOf("|");
      if (lastPipe !== -1) {
        out = out.slice(0, lastPipe) + "</ul>" + out.slice(lastPipe);
      } else {
        out = out + "</ul>";
      }
    }
    return out;
  });
  return lines.join("\n");
}

function routeFromOutPath(filePath) {
  const rel = path
    .relative(outRoot, filePath)
    .replaceAll("\\", "/")
    .replace(/\.md$/, "");
  // index.md becomes /spec/
  if (rel === "index") return "/spec/";
  return `/spec/${rel}`;
}

function anchorToRoute(anchor) {
  // Major anchors as used by the upstream ToC
  const majorMap = new Map([
    ["0-foreword", "/spec/0-foreword"],
    ["1-introduction", "/spec/1-introduction"],
    ["2-scope", "/spec/2-scope"],
    // These majors have no dedicated page; route to the first logical child.
    ["3-definitions", "/spec/3/3.1-1"],
    ["4-transport-protocol", "/spec/4/4.0"],
    ["5-process-and-content-of-communication", "/spec/5/5.1"],
    ["6-protocol-specification", "/spec/6/6.1"],
    ["7-message-specification", "/spec/7/7.1"],
    ["bibliography", "/spec/bibliography"],
  ]);
  if (majorMap.has(anchor)) return majorMap.get(anchor);

  // Numeric anchors like 31-mobile-robot, 731-format-of-...
  const m = anchor.match(/^(\d{2,4})/);
  if (!m) return null;
  const digits = m[1];

  const chapter = digits[0];
  if (chapter === "3") {
    const sec = digits[1];
    return `/spec/3/3.${sec}-${sec}`;
  }
  if (chapter === "4") {
    const sec = digits[1];
    // Some upstream references use "4.4" while the document defines 4.3 as "Topics for communication".
    if (Number(sec) > 3) return "/spec/4/4.3";
    return `/spec/4/4.${sec}`;
  }
  if (chapter === "5") {
    const sec = digits[1];
    return `/spec/5/5.${sec}`;
  }
  if (chapter === "6" || chapter === "7") {
    // Handle x.10 (610..., 710...)
    if (digits.length >= 3 && digits.slice(1, 3) === "10") {
      return `/spec/${chapter}/` + `${chapter}.10`;
    }
    const sec = digits[1];
    return `/spec/${chapter}/` + `${chapter}.${sec}`;
  }
  return null;
}

function fixInternalLinks(content, currentRoute) {
  // Normalize malformed "double-paren" hash links like ]((#...)) found upstream.
  let normalized = content.replace(/\]\(\(#([^)]+)\)\)/g, "](#$1)");

  // Replace markdown links of the form ](#anchor) with the appropriate /spec/... route.
  // Keep same-page anchors untouched.
  normalized = normalized.replace(/\]\(#([^)]+)\)/g, (full, anchor) => {
    let effectiveAnchor = anchor;
    // Upstream uses "#44-topics-for-communication" in one place; the actual heading is "#43-...".
    if (anchor === "44-topics-for-communication") effectiveAnchor = "43-topics-for-communication";

    const targetRoute = anchorToRoute(anchor);
    if (!targetRoute) return full;
    if (targetRoute === currentRoute || targetRoute === `${currentRoute}/`) return full;
    return `](${targetRoute}#${effectiveAnchor})`;
  });

  // Fix known absolute links embedded in the source text (not hash-only links).
  normalized = normalized.replaceAll(
    "(/spec/4/4.4#44-topics-for-communication)",
    "(/spec/4/4.3#43-topics-for-communication)",
  );

  return normalized;
}

function extractSectionByHeading(lines, headingRegex) {
  const idx = lines.findIndex((l) => headingRegex.test(l));
  if (idx === -1) return null;

  const start = idx;
  let end = lines.length;
  for (let i = start + 1; i < lines.length; i++) {
    if (/^#\s+/.test(lines[i])) {
      end = i;
      break;
    }
  }
  return lines.slice(start, end).join("\n").replace(/\n?$/, "\n");
}

function extractSubsectionsWithinMajor(lines, majorHeadingRegex, subHeadingRegexes) {
  const majorIdx = lines.findIndex((l) => majorHeadingRegex.test(l));
  if (majorIdx === -1) return null;

  // major section goes until next major (# ...)
  let majorEnd = lines.length;
  for (let i = majorIdx + 1; i < lines.length; i++) {
    if (/^#\s+/.test(lines[i])) {
      majorEnd = i;
      break;
    }
  }

  const majorLines = lines.slice(majorIdx, majorEnd);

  const results = [];
  for (const { key, regex } of subHeadingRegexes) {
    const subIdx = majorLines.findIndex((l) => regex.test(l));
    if (subIdx === -1) continue;

    const start = subIdx;
    let end = majorLines.length;
    for (let i = start + 1; i < majorLines.length; i++) {
      if (/^##\s+/.test(majorLines[i]) || /^#\s+/.test(majorLines[i])) {
        end = i;
        break;
      }
    }

    results.push({
      key,
      content: majorLines.slice(start, end).join("\n").replace(/\n?$/, "\n"),
    });
  }

  return results;
}

function main() {
  // Start fresh each time to avoid stale pages.
  fs.rmSync(outRoot, { recursive: true, force: true });

  const raw = normalizeNewlines(fs.readFileSync(sourcePath, "utf8"));
  const lines = raw.split("\n");

  // Keep the exact source content. We only slice it and write files verbatim.
  // Everything before "# 0 Foreword" becomes spec/index.md
  const forewordIdx = lines.findIndex((l) => /^#\s+0\s+Foreword\s*$/.test(l));
  if (forewordIdx === -1) {
    throw new Error('Could not find "# 0 Foreword" heading.');
  }

  const indexFile = path.join(outRoot, "index.md");
  let indexContent = lines.slice(0, forewordIdx).join("\n").replace(/\n?$/, "\n");
  indexContent = sanitizeHtml(replaceAssets(indexContent));
  indexContent = fixInternalLinks(indexContent, routeFromOutPath(indexFile));
  writeFileEnsured(indexFile, indexContent);

  // Major sections 0..7 + Bibliography
  const majors = [
    { key: "0", regex: /^#\s+0\s+Foreword\s*$/ },
    { key: "1", regex: /^#\s+1\s+Introduction\s*$/ },
    { key: "2", regex: /^#\s+2\s+Scope\s*$/ },
    { key: "3", regex: /^#\s+3\s+Definitions\s*$/ },
    { key: "4", regex: /^#\s+4\s+Transport protocol\s*$/ },
    { key: "5", regex: /^#\s+5\s+Process and content of communication\s*$/ },
    { key: "6", regex: /^#\s+6\s+Protocol specification\s*$/ },
    { key: "7", regex: /^#\s+7\s+Message specification\s*$/ },
    { key: "biblio", regex: /^#\s+Bibliography\s*$/ },
  ];

  // Write 0,1,2 as standalone pages
  for (const k of ["0", "1", "2"]) {
    const major = majors.find((m) => m.key === k);
    const content = extractSectionByHeading(lines, major.regex);
    if (!content) throw new Error(`Missing major section ${k}.`);
    const outFile = path.join(
      outRoot,
      `${k}-${k === "0" ? "foreword" : k === "1" ? "introduction" : "scope"}.md`,
    );
    let out = sanitizeHtml(replaceAssets(content));
    out = fixInternalLinks(out, routeFromOutPath(outFile));
    writeFileEnsured(outFile, out);
  }

  // Split 3 into 3.1..3.7 (no additional text is invented)
  const defsSubs = [
    { key: "3.1", regex: /^##\s+3\.1\s+Mobile Robot\s*$/ },
    { key: "3.2", regex: /^##\s+3\.2\s+Moving\s*$/ },
    { key: "3.3", regex: /^##\s+3\.3\s+Driving\s*$/ },
    { key: "3.4", regex: /^##\s+3\.4\s+Automatic driving\s*$/ },
    { key: "3.5", regex: /^##\s+3\.5\s+Manual driving\s*$/ },
    { key: "3.6", regex: /^##\s+3\.6\s+Line-guided mobile robot\s*$/ },
    { key: "3.7", regex: /^##\s+3\.7\s+Freely navigating mobile robot\s*$/ },
  ];
  const defsParts = extractSubsectionsWithinMajor(lines, /^#\s+3\s+Definitions\s*$/, defsSubs);
  if (!defsParts || defsParts.length === 0) throw new Error("Failed splitting Definitions (3.x).");
  for (const p of defsParts) {
    const outFile = path.join(outRoot, "3", `${p.key}-${p.key.split(".")[1]}.md`);
    let out = sanitizeHtml(replaceAssets(p.content));
    out = fixInternalLinks(out, routeFromOutPath(outFile));
    writeFileEnsured(outFile, out);
  }

  // Split 4 into 4.1..4.3 (4.0 intro content is written as 4/4.0.md if present)
  const transportMajor = extractSectionByHeading(lines, /^#\s+4\s+Transport protocol\s*$/);
  if (!transportMajor) throw new Error("Missing major section 4.");
  {
    const transportLines = transportMajor.split("\n");
    // transportMajor starts with "# 4 ...". Keep its pre-subheading text in 4/4.0.md
    const firstSub = transportLines.findIndex((l) => /^###\s+4\./.test(l));
    const intro = firstSub === -1 ? transportMajor : transportLines.slice(0, firstSub).join("\n").replace(/\n?$/, "\n");
    const outFile = path.join(outRoot, "4", "4.0.md");
    let out = sanitizeHtml(replaceAssets(intro));
    out = fixInternalLinks(out, routeFromOutPath(outFile));
    writeFileEnsured(outFile, out);
  }
  const transportSubs = [
    { key: "4.1", regex: /^###\s+4\.1\s+Connection handling, security and QoS\s*$/ },
    { key: "4.2", regex: /^###\s+4\.2\s+Topic levels\s*$/ },
    { key: "4.3", regex: /^###\s+4\.3\s+Topics for communication\s*$/ },
  ];
  const transportMajorIdx = lines.findIndex((l) => /^#\s+4\s+Transport protocol\s*$/.test(l));
  let transportEnd = lines.length;
  for (let i = transportMajorIdx + 1; i < lines.length; i++) {
    if (/^#\s+/.test(lines[i])) {
      transportEnd = i;
      break;
    }
  }
  const transportMajorLines = lines.slice(transportMajorIdx, transportEnd);
  for (const sub of transportSubs) {
    const subIdx = transportMajorLines.findIndex((l) => sub.regex.test(l));
    if (subIdx === -1) continue;
    let end = transportMajorLines.length;
    for (let i = subIdx + 1; i < transportMajorLines.length; i++) {
      if (/^###\s+4\./.test(transportMajorLines[i]) || /^#\s+/.test(transportMajorLines[i])) {
        end = i;
        break;
      }
    }
    const outFile = path.join(outRoot, "4", `${sub.key}.md`);
    let out = transportMajorLines.slice(subIdx, end).join("\n").replace(/\n?$/, "\n");
    out = sanitizeHtml(replaceAssets(out));
    out = fixInternalLinks(out, routeFromOutPath(outFile));
    writeFileEnsured(outFile, out);
  }

  // Split 5 into 5.1..5.4
  const major5Idx = lines.findIndex((l) => /^#\s+5\s+Process and content of communication\s*$/.test(l));
  if (major5Idx === -1) throw new Error("Missing major section 5.");
  let major5End = lines.length;
  for (let i = major5Idx + 1; i < lines.length; i++) {
    if (/^#\s+/.test(lines[i])) {
      major5End = i;
      break;
    }
  }
  const major5Lines = lines.slice(major5Idx, major5End);
  const subs5 = [
    { key: "5.1", regex: /^##\s+5\.1\s+General\s*$/ },
    { key: "5.2", regex: /^##\s+5\.2\s+Implementation Phase\s*$/ },
    { key: "5.3", regex: /^##\s+5\.3\s+Functions of the fleet control\s*$/ },
    { key: "5.4", regex: /^##\s+5\.4\s+Functions of the mobile robots\s*$/ },
  ];
  for (const sub of subs5) {
    const subIdx = major5Lines.findIndex((l) => sub.regex.test(l));
    if (subIdx === -1) continue;
    let end = major5Lines.length;
    for (let i = subIdx + 1; i < major5Lines.length; i++) {
      if (/^##\s+5\./.test(major5Lines[i]) || /^#\s+/.test(major5Lines[i])) {
        end = i;
        break;
      }
    }
    const outFile = path.join(outRoot, "5", `${sub.key}.md`);
    let out = major5Lines.slice(subIdx, end).join("\n").replace(/\n?$/, "\n");
    out = sanitizeHtml(replaceAssets(out));
    out = fixInternalLinks(out, routeFromOutPath(outFile));
    writeFileEnsured(outFile, out);
  }

  // Split 6 into 6.1..6.10
  const major6Idx = lines.findIndex((l) => /^#\s+6\s+Protocol specification\s*$/.test(l));
  if (major6Idx === -1) throw new Error("Missing major section 6.");
  let major6End = lines.length;
  for (let i = major6Idx + 1; i < lines.length; i++) {
    if (/^#\s+/.test(lines[i])) {
      major6End = i;
      break;
    }
  }
  const major6Lines = lines.slice(major6Idx, major6End);
  const subs6 = [
    { key: "6.1", regex: /^##\s+6\.1\s+Order\s*$/ },
    { key: "6.2", regex: /^##\s+6\.2\s+Actions\s*$/ },
    { key: "6.3", regex: /^##\s+6\.3\s+Maps\s*$/ },
    { key: "6.4", regex: /^##\s+6\.4\s+Zones\s*$/ },
    { key: "6.5", regex: /^##\s+6\.5\s+Connection\s*$/ },
    { key: "6.6", regex: /^##\s+6\.6\s+State\s*$/ },
    { key: "6.7", regex: /^##\s+6\.7\s+Visualization\s*$/ },
    { key: "6.8", regex: /^##\s+6\.8\s+Sharing of planned paths for freely navigating mobile robots\s*$/ },
    { key: "6.9", regex: /^##\s+6\.9\s+Request\/response mechanism\s*$/ },
    { key: "6.10", regex: /^##\s+6\.10\s+Factsheet\s*$/ },
  ];
  for (const sub of subs6) {
    const subIdx = major6Lines.findIndex((l) => sub.regex.test(l));
    if (subIdx === -1) continue;
    let end = major6Lines.length;
    // Next chunk starts at ## 6.1 … ## 6.10 only (not ## 6.4.3-style sub-subsections).
    for (let i = subIdx + 1; i < major6Lines.length; i++) {
      if (/^##\s+6\.(10|[1-9])\s/.test(major6Lines[i]) || /^#\s+/.test(major6Lines[i])) {
        end = i;
        break;
      }
    }
    const outFile = path.join(outRoot, "6", `${sub.key}.md`);
    let out = major6Lines.slice(subIdx, end).join("\n").replace(/\n?$/, "\n");
    out = sanitizeHtml(replaceAssets(out));
    out = fixInternalLinks(out, routeFromOutPath(outFile));
    writeFileEnsured(outFile, out);
  }

  // Split 7 into 7.1..7.10
  const major7Idx = lines.findIndex((l) => /^#\s+7\s+Message specification\s*$/.test(l));
  if (major7Idx === -1) throw new Error("Missing major section 7.");
  let major7End = lines.length;
  for (let i = major7Idx + 1; i < lines.length; i++) {
    if (/^#\s+/.test(lines[i])) {
      major7End = i;
      break;
    }
  }
  const major7Lines = lines.slice(major7Idx, major7End);
  const subs7 = [
    { key: "7.1", regex: /^##\s+7\.1\s+Symbols of the tables and meaning of formatting\s*$/ },
    { key: "7.2", regex: /^##\s+7\.2\s+Protocol header\s*$/ },
    { key: "7.3", regex: /^##\s+7\.3\s+Implementation of the order message\s*$/ },
    { key: "7.4", regex: /^##\s+7\.4\s+Implementation of the instantAction message\s*$/ },
    { key: "7.5", regex: /^##\s+7\.5\s+Implementation of the response message\s*$/ },
    { key: "7.6", regex: /^##\s+7\.6\s+Implementation of the zoneSet message\s*$/ },
    { key: "7.7", regex: /^##\s+7\.7\s+Implementation of the connection message\s*$/ },
    { key: "7.8", regex: /^##\s+7\.8\s+Implementation of the state message\s*$/ },
    { key: "7.9", regex: /^##\s+7\.9\s+Implementation of the visualization message\s*$/ },
    { key: "7.10", regex: /^##\s+7\.10\s+Implementation of the factsheet message\s*$/ },
  ];
  for (const sub of subs7) {
    const subIdx = major7Lines.findIndex((l) => sub.regex.test(l));
    if (subIdx === -1) continue;
    let end = major7Lines.length;
    // Next chunk starts at ## 7.1 … ## 7.10 only (not ## 7.1.1-style sub-subsections).
    for (let i = subIdx + 1; i < major7Lines.length; i++) {
      if (/^##\s+7\.(10|[1-9])\s/.test(major7Lines[i]) || /^#\s+/.test(major7Lines[i])) {
        end = i;
        break;
      }
    }
    const outFile = path.join(outRoot, "7", `${sub.key}.md`);
    let out = major7Lines.slice(subIdx, end).join("\n").replace(/\n?$/, "\n");
    out = sanitizeHtml(replaceAssets(out));
    out = fixInternalLinks(out, routeFromOutPath(outFile));
    writeFileEnsured(outFile, out);
  }

  // Bibliography
  const biblio = extractSectionByHeading(lines, /^#\s+Bibliography\s*$/);
  if (biblio) {
    const outFile = path.join(outRoot, "bibliography.md");
    let out = sanitizeHtml(replaceAssets(biblio));
    out = fixInternalLinks(out, routeFromOutPath(outFile));
    writeFileEnsured(outFile, out);
  }

  console.log(`Wrote split docs to ${path.relative(repoRoot, outRoot)}`);
}

main();
