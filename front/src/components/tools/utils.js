import { send } from "@emailjs/browser"

export const mongoDBDateConverter = ({ date, noHour }) => {
  const [y, m, d, hour] = date.split(/[-T.]/gi)
  return `${d}/${m}/${y} ${noHour ? "" : hour}`.trim()
}
export const getCountries = ({ code, country }) => {
  const countries = [
    { country: "Argentina", code: "AR" },
    { country: "Australia", code: "AU" },
    { country: "Austria", code: "AT" },
    { country: "Belgium", code: "BE" },
    { country: "Bolivia", code: "BO" },
    { country: "Brazil", code: "BR" },
    { country: "Bulgaria", code: "BG" },
    { country: "Canada", code: "CA" },
    { country: "Chile", code: "CL" },
    { country: "Colombia", code: "CO" },
    { country: "Costa Rica", code: "CR" },
    { country: "Croatia", code: "HR" },
    { country: "Cyprus", code: "CY" },
    { country: "Czech Republic", code: "CZ" },
    { country: "Denmark", code: "DK" },
    { country: "Dominican Republic", code: "DO" },
    { country: "Egypt", code: "EG" },
    { country: "Estonia", code: "EE" },
    { country: "Finland", code: "FI" },
    { country: "France", code: "FR" },
    { country: "Germany", code: "DE" },
    { country: "Greece", code: "GR" },
    { country: "Hong Kong SAR China", code: "HK" },
    { country: "Hungary", code: "HU" },
    { country: "Iceland", code: "IS" },
    { country: "India", code: "IN" },
    { country: "Indonesia", code: "ID" },
    { country: "Ireland", code: "IE" },
    { country: "Israel", code: "IL" },
    { country: "Italy", code: "IT" },
    { country: "Japan", code: "JP" },
    { country: "Latvia", code: "LV" },
    { country: "Liechtenstein", code: "LI" },
    { country: "Lithuania", code: "LT" },
    { country: "Luxembourg", code: "LU" },
    { country: "Malta", code: "MT" },
    { country: "Mexico ", code: "MX" },
    { country: "Netherlands", code: "NL" },
    { country: "New Zealand", code: "NZ" },
    { country: "Norway", code: "NO" },
    { country: "Paraguay", code: "PY" },
    { country: "Peru", code: "PE" },
    { country: "Poland", code: "PL" },
    { country: "Portugal", code: "PT" },
    { country: "Romania", code: "RO" },
    { country: "Singapore", code: "SG" },
    { country: "Slovakia", code: "SK" },
    { country: "Slovenia", code: "SI" },
    { country: "Spain", code: "ES" },
    { country: "Sweden", code: "SE" },
    { country: "Switzerland", code: "CH" },
    { country: "Thailand", code: "TH" },
    { country: "Trinidad & Tobago", code: "TT" },
    { country: "United Arab Emirates", code: "AE" },
    { country: "United Kingdom", code: "GB" },
    { country: "United States", code: "US" },
    { country: "Uruguay", code: "UY" }
  ]
  if (code) return countries.find((ctry) => ctry.code === code)
  if (country) return countries.find((ctry) => ctry.country === country)
  return countries
}

export function SendEmail({ welcome, data }) {
  const {
    REACT_APP_SERVICE_ID,
    REACT_APP_PAYMENT_TEMPLATE_ID,
    REACT_APP_WELCOME_TEMPLATE_ID,
    REACT_APP_USER_ID
  } = process.env
  send(
    REACT_APP_SERVICE_ID,
    welcome ? REACT_APP_WELCOME_TEMPLATE_ID : REACT_APP_PAYMENT_TEMPLATE_ID,
    data,
    REACT_APP_USER_ID 
  )
    .then(() => console.log("Email has been sent !"))
    .catch(console.error)
}

export function getTotalQuantity(colors) {
  return colors?.reduce((somme, { details }) => {
    const detailsSomme = details?.reduce(
      (dSomme, { quantity }) => dSomme + quantity,
      0
    )
    return somme + detailsSomme
  }, 0)
}
