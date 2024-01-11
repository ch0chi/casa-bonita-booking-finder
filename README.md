# Casa Bonita Booking Finder 🌮🗓️

Welcome to the Casa Bonita Booking Finder repository! This bot is your trusty companion for keeping track of new booking dates at the legendary Casa Bonita.

## Why Does This Exist?
When you receive your invite email from Casa Bonita, 9/10 times the date you want has already been booked. They only release a certain amount of dates at a time, and they get booked up rather quickly (especially the good times and seats). Personally, I wanted Cliff Side tickets, but they were always booked whenever I would check. So, I created this app.

## Features 🌯

- **Burrito-Powered Search:** Casa Bonita Booking Finder tirelessly scans for new booking dates, ensuring you stay in the loop.
- **Salsa-fied Notifications:** Receive instant notifications via slack when new dates become available, so you can secure your spot at Casa Bonita without hesitation.

## Getting Started 🚀

To get started with Casa Bonita Booking Finder, follow these simple steps:

1.  Clone the Repository:  
    `git clone git@github.com:ch0chi/casa-bonita-booking-finder.git`
2.  Create .env file  
    `cp .env.example .env`
3.  Create a Slack [webhook](https://api.slack.com/messaging/webhooks)
4.  Configure the .env parameters

| Parameter | Description |
| --- | --- |
| BOOKING_URL (required) | The booking url from the main booking reservation page. Just copy and paste the url here. |
| FETCH_INTERVAL (required) | A number, in minutes, representing the time between fetching intervals. The number will be converted into milliseconds |
| SLACK_WEBHOOK_URL (required) | A slack webhook url for sending slack notifications. You'll need to create one if you don't alreay have one.|

Example

| Parameter | Description |
| --- | --- |
| BOOKING_URL | "https://tickets.casabonitadenver.com/?sQSB0ZXN0IGJhc2U2NCBlbmNvZGVkIHBhcmFtIHN0cmluZy4gQ2FzYSBCb25pdGEgQ2FzYSBCb25pdGEgbmFuYW5hbmE=" |
| FETCH_INTERVAL | 5   |
| SLACK_WEBHOOK_URL | "https://hooks.slack.com/services/" |

5.  Configure the docker-compose.yaml
    1.  You really only need to change the `network_mode` . I use wireguard to mask my ip, but setting it to `host` will work.
6.  Run the bot
    `docker compose up --build -d`