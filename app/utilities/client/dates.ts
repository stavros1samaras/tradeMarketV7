import type { date } from "~/types/date";


export const findPreviousYearDate = (): date => {

    const currentFullDate = new Date();
    let currentDate: (number | string) = currentFullDate.getDate();

    if (currentDate < 10) {
        const currentDateCorrected: string = "0" + currentDate.toString();
        currentDate = currentDateCorrected;
    }

    let currentMonth: (number | string) = currentFullDate.getMonth() + 1;

    if (currentMonth < 10) {
        const currentMonthCorrected = "0" + currentMonth.toString();
        currentMonth = currentMonthCorrected;
    }

    const newYear: (number | string) = currentFullDate.getFullYear() - 1;

    const startDate: string = newYear.toString() + "-" + currentMonth.toString() + "-" + currentDate.toString();
    console.log(startDate);
    return ({ startDate: startDate, interval: 50 })
}

export const currentDate = (): string => {
    const currentFullDate = new Date();
    let date: (number | string) = currentFullDate.getDate();
    let month: (number | string) = currentFullDate.getMonth() + 1;
    const year: (number | string) = currentFullDate.getFullYear();
    if (date < 10) date = "0" + date;
    if (month < 10) month = "0" + month;
    const currentDate: string = year.toString() + "-" + month.toString() + "-" + date.toString();
    console.log(currentDate);
    return (currentDate)
}

export const findPreviousMonthDate = (): { startDate: string; interval: number } => {

    const currentFullDate = new Date();

    let currentYear = currentFullDate.getFullYear();
    let currentMonth = currentFullDate.getMonth(); // 0-based (0 = Ιανουάριος)
    let currentDay = currentFullDate.getDate();

    // Υπολογίζουμε τον προηγούμενο μήνα
    let previousMonth = currentMonth - 1;
    let previousYear = currentYear;

    // Αν είναι Ιανουάριος (0), τότε πάμε στον Δεκέμβριο του προηγούμενου έτους
    if (previousMonth < 0) {
        previousMonth = 11;
        previousYear -= 1;
    }

    // Υπολογίζουμε πόσες μέρες έχει ο προηγούμενος μήνας
    const daysInPreviousMonth = new Date(previousYear, previousMonth + 1, 0).getDate();

    // Αν η τρέχουσα μέρα δεν υπάρχει στον προηγούμενο μήνα (π.χ. 31 -> 30 ή 28/29)
    if (currentDay > daysInPreviousMonth) {
        currentDay = daysInPreviousMonth;
    }

    // Δημιουργούμε το νέο Date αντικείμενο
    const previousMonthDate = new Date(previousYear, previousMonth, currentDay);

    // Φτιάχνουμε σωστή μορφή YYYY-MM-DD
    const year = previousMonthDate.getFullYear();
    const month = (previousMonthDate.getMonth() + 1).toString().padStart(2, "0");
    const day = previousMonthDate.getDate().toString().padStart(2, "0");

    const startDate = `${year}-${month}-${day}`;
    console.log(startDate);

    return { startDate: startDate, interval: 10 };
};
