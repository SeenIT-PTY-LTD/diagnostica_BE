const isNotEmpty = (value) => {
  if (value === null || value === undefined) return false;
  const strVal = String(value).trim().toLowerCase();
  return strVal !== "" && strVal !== "null" && strVal !== "undefined";
};

module.exports = { isNotEmpty };
