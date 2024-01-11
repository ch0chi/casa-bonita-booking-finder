import dotenv from 'dotenv';
dotenv.config();
import axios from "axios";
import {DateTime} from "luxon";
import {IncomingWebhook} from "@slack/webhook";


const fetchInterval = 3;
let slackWebhook = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL);
let intervalTime = process.env.FETCH_INTERVAL;
let syncInterval;
let currVisitDateEnd = null;

const getBookingCode = () => {
    let bookingUrl = process.env.BOOKING_URL;
    if(bookingUrl.trim().length === 0) {
        return null;
    }
    bookingUrl = new URL(bookingUrl);
    let params = new URLSearchParams(bookingUrl.search);
    let bookingState = JSON.parse(atob(params.get('s')));
    return bookingState.booking.bookingCode;
}

const checkForNewDates = async() => {
    let bookingCode = getBookingCode();
    const url = `https://casatix.casabonitadenver.com/api/v1/validate-booking-code?booking_code=${bookingCode}`;
    const res = await axios.get(url);
    let data = res.data;

    if(data['visit_date_end']){

        let visitDateEnd = DateTime.fromISO(data['visit_date_end']);

        if(getCurrVisitDateEnd() === null){
            setCurrVisitDateEnd(visitDateEnd);
        }

        if(visitDateEnd > getCurrVisitDateEnd()) {
            let message = `New booking dates added! ${getCurrVisitDateEnd().toFormat('DDDD')} to ${visitDateEnd.toFormat('DDDD')} are now available.`;
            await notifySlack(message,true);
        }

        setCurrVisitDateEnd(visitDateEnd);
    }
}

const notifySlack = async (message,important = false) => {
    let text = `${message}`;
    if(important) {
        text = `<!channel> ${message}`;
    }
    await slackWebhook.send({
        "text": `${text}`
    })
}

const setCurrVisitDateEnd = (date) => {
    currVisitDateEnd = date;
}

const getCurrVisitDateEnd = () => {
    return currVisitDateEnd;
}
const setIntervalTime = (time) => {
    intervalTime = time;
}

const getIntervalTime = () => {
    return intervalTime;
}

const stop = () => {
    clearInterval(syncInterval);
}


const start = async() => {
    console.log("Starting...");
    console.log(`Fetch Interval set to ${getIntervalTime()} minutes`);
    
    if(getBookingCode() === null) {
        throw new Error("Booking Url has not been set!");
    }

    await checkForNewDates();//run check immediately
    console.log(getCurrVisitDateEnd())
    await notifySlack(`Newest available booking date is: ${getCurrVisitDateEnd().toFormat('DDDD')}`);
    syncInterval = setInterval(async () => {
        await checkForNewDates();
        intervalCount++;
        totalIntervalCount++;
        console.log(`Performed ${totalIntervalCount} checks.`)
        if(intervalCount === 12) {
            await notifySlack(
                `Finder still running and no new booking dates have been found.
                There have been ${totalIntervalCount} booking date checks since starting.
                The newest available booking date is still ${getCurrVisitDateEnd().toFormat('DDDD')}`
            )
            intervalCount = 0;
        }
    },parseInt(getIntervalTime())*60000);
}

let intervalCount = 0;
let totalIntervalCount = 0;

await notifySlack(`Started Casa Bonita Scraper!`, true);
await start()
    .catch(async (err) => {
        console.log(err);
        await notifySlack(
            `There was an error fetching booking dates and the app has quit running. Error :${err}`,
            true
        )
        stop();
    })

