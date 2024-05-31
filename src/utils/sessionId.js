export function createSessionId() {
  let date = new Date();
  let day = `${date.getDate()}`.padStart(2, '0');
  let month = `${date.getMonth() + 1}`.padStart(2, '0');
  let year = date.getFullYear();
  // return `sessionId-${day}-${month}-${year}-${id}`;
  return `sessionId-${day}-${month}-${year}`;
}

export function getSessionId() {
  let date = new Date();
  let day = `${date.getDate()}`.padStart(2, '0');
  let month = `${date.getMonth() + 1}`.padStart(2, '0');
  let year = date.getFullYear();

  return `sessionId-${day}-${month}-${year}`;
}
