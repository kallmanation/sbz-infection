export const sbzInfectionHead = () => `<html><head><title>SBZ Infection</title>
  <link href="/favicon.ico" rel="shortcut icon" type="image/x-icon" />
  <link href="/defaults.css" rel="stylesheet" />
  <link href="/main.css" rel="stylesheet" />
`;
export const autoRefresh = (n) => `<meta http-equiv="refresh" content="${n}">`;
export const fadeMessage = (message) => `<section class="fade-message"><h1>${message}</h1></section>`;
export const playerList = (players, title = "Players:") => `<h2>${title}</h2><ul><li>${Object.values(players).join('</li><li>')}</li></ul>`;
export const gameForm = (inputs, event, submit = "Submit") => `<form method="post">
  ${inputs.join('')}
  <input type="hidden" name="type" value="${event}">
  <input type="submit" name="submit" value="${submit}">
  </form>
`;
export const hiddenInput = (name, value) => `<input type="hidden" name="${name}" value="${value}">`;
export const textInput = (label, name, value = "") => `<label>${label}<input type="text" name="${name}" value="${value}"></label>`;
export const simpleSelect = (label, name, options, checked = "") => `<h2>${label}</h2>
  ${Object.keys(options).map((option) =>
    `<label>
      <input type="radio" name="${name}" value="${option}" ${checked === option ? 'checked' : ''}>
      ${options[option]}
    </label>`
  ).join('')}
`;
