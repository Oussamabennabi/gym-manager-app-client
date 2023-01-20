import {DATE_FORMATE} from '../constants'
export function formatDate(date) {
  const newDate = new Date(date)
  const f = new Intl.DateTimeFormat("en-us", {
 
    dateStyle:DATE_FORMATE
  })
  return f.format(newDate)
}
