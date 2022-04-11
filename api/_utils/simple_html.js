export const sbzInfectionHead = () => `<html><head><title>SBZ Infection</title>
  <link href="favicon.ico" rel="shortcut icon" type="image/x-icon" />
  <link href="/defaults.css" rel="stylesheet" />
  <link href="/main.css" rel="stylesheet" />
`;
export const autoRefresh = (n) => `<meta http-equiv="refresh" content="${n}">`;
export const fadeMessage = (message) => `<section class="fade-message"><h1>${message}</h1></section>`;
export const playerList = (players) => `<h2>Players:</h2><ul><li>${Object.values(players).join('</li><li>')}</li></ul>`;
export const gameForm = (inputs, event, submit = "Submit") => `<form method="post">
  ${inputs.join('')}
  <input type="hidden" name="type" value="${event}">
  <input type="submit" name="submit" value="${submit}">
  </form>
`;
export const textInput = (label, name) => `<label>${label}<input type="text" name="${name}" /></label>`;
