const markdownInput = document.getElementById("markdown-input");
const htmlOutput = document.getElementById("html-output");
const htmlPreview = document.getElementById("preview");

const regexArr = [
  {
    regex: /^# (.*)/gm,
    elementTag: "h1",
    specialElement: false
  },
  {
    regex: /^## (.*)/gm,
    elementTag: "h2",
    specialElement: false
  },
  {
    regex: /^### (.*)/gm,
    elementTag: "h3",
    specialElement: false
  },
  {
    regex: /[*_]{2}(.*)[*_]{2}/gm,
    elementTag: "strong",
    specialElement: false
  },
  {
    regex: /[*_]{1}(.*)[*_]{1}/gm,
    elementTag: "em",
    specialElement: false
  },
  {
    regex: /^> (.*)/gm,
    elementTag: "blockquote",
    specialElement: false
  },
  {
    regex: /^\[(.*)\]\((.*)\)/gm,
    elementTag: "a",
    specialElement: true
  },
  {
    regex: /^!\[(.*)\]\((.*)\)/gm,
    elementTag: "img",
    specialElement: true
  },
];

function handleEspElem(elem, g1, g2) {
  switch (elem) {
    case "a":
      return `<a href="${g2}">${g1}</a>`;
    case "img":
      return `<img alt="${g1}" src="${g2}">`
  }
}

function convertMarkdown() {
  let str = markdownInput.value;
  for (const curRegex of regexArr) {
    str = str.replace(curRegex.regex, (match, g1, g2) => {
      if (curRegex.specialElement) {
        return handleEspElem(curRegex.elementTag, g1, g2)
      }
      return `<${curRegex.elementTag}>${g1}</${curRegex.elementTag}>`;
    })
  }
  htmlOutput.textContent = str
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
  htmlPreview.innerHTML = str;
  return str;
}

markdownInput.addEventListener("input", () => {
  convertMarkdown()
})

