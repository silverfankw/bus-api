import _ from "lodash"

const regex = { capitalizeFirst: /\B[A-Z]|('S)/g }

export const capitalize = str => str.replace(regex.capitalizeFirst, matchChar => matchChar.toLowerCase())