import { cloneDeep } from 'lodash-es'

export default function (serviceTime) {
  let copyServiceTime = cloneDeep(serviceTime)

  const loops = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday'
  ]

  loops.forEach((loop, index) => {
    // delete useless key => open
    delete copyServiceTime[loop].open
    // grab time from the next day
    // merge that time into current time

    // can grab
    let nextDayIndex = (index + 1) % loops.length
    const currentDay = copyServiceTime[loop]
    const nextDay = copyServiceTime[loops[nextDayIndex]]

    let currentDayTimeWhichEndMinuteIsMax = currentDay.times.find(
      time => time.endMinute === 1440
    )
    let nextDayTimeWhichStartMinuteIs0 = nextDay.times.find(
      time => time.startMinute === 0
    )
    let nextDayTimeWhichStartMinuteIs0Index = nextDay.times.findIndex(
      time => time.startMinute === 0
    )

    const canGrab =
      currentDayTimeWhichEndMinuteIsMax && nextDayTimeWhichStartMinuteIs0

    if (canGrab) {
      // 如果可以grab，還分為兩種情況
      // 1. 如果nextDayTime的結束時間>720，要切成兩段
      // 2. 如果nextDayTime的結束時間<=720，直接併進currentDayTime
      let greaterThan720 = nextDayTimeWhichStartMinuteIs0.endMinute > 720

      if (greaterThan720) {
        currentDayTimeWhichEndMinuteIsMax.endMinute += 720
        nextDayTimeWhichStartMinuteIs0.startMinute = 720
      } else {
        currentDayTimeWhichEndMinuteIsMax.endMinute +=
          nextDayTimeWhichStartMinuteIs0.endMinute
        nextDay.times.splice(nextDayTimeWhichStartMinuteIs0Index, 1)
      }
    }
  })

  return copyServiceTime
}
