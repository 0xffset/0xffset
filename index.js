import fs from "fs/promises";
import Mustache from "mustache";
import { load } from "cheerio";

const MAX_PROBLEMS = 1000;

function cleanProblem(html) {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

async function fetchProblem(problemId) {
  const url = `https://www.erdosproblems.com/latex/${problemId}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed: ${url}`);
  }

  const html = await response.text();

  const $ = load(html);

  const content = $("#content").html();
  const aditionalText = $(".problem-additional-text").html() 
  
  if (!content) {
    throw new Error(`Problem ${problemId} not found`);
  }

  return { "problem": cleanProblem(content), "aditionalText": cleanProblem(aditionalText)};
}

async function main() {
  const id = Math.floor(Math.random() * MAX_PROBLEMS) + 1;

  const {problem, aditionalText} = await fetchProblem(id);

  const template = await fs.readFile(
    "./templates/README.mustache",
    "utf8"
  );

  const readme = Mustache.render(template, {
    id,
    problem,
    aditionalText,
    date: new Date().toISOString()
  });

  await fs.writeFile("README.md", readme);

  console.log(`README generated using problem ${id}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});