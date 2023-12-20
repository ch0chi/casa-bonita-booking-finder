# Casa Bonita Booking Finder 🌮🗓️

Welcome to the Casa Bonita Booking Finder repository! This bot is your trusty companion for keeping track of new booking dates at the legendary Casa Bonita.

## Features 🌯

- **Burrito-Powered Search:** Casa Bonita Booking Finder tirelessly scans for new booking dates, ensuring you stay in the loop.
- **Salsa-fied Notifications:** Receive instant notifications via slack when new dates become available, so you can secure your spot at Casa Bonita without hesitation.

## Getting Started 🚀

To get started with Casa Bonita Booking Finder, follow these simple steps:

1.  Clone the Repository:  
    `git clone git@github.com:ch0chi/casa-bonita-booking-finder.git`
2.  Create .env file  
    `cp .env.example .env`
3.  Configure the .env parameters

| Parameter | Description |
| --- | --- |
| BOOKING_URL | The booking url from the main booking reservation page. Just copy and paste the url here. |
| FETCH_INTERVAL | A number, in minutes, representing the time between fetching intervals. The number will be converted into milliseconds |
| SLACK_WEBHOOK_URL | A slack webhook url for sending slack notifications. |

Example

| Parameter | Description |
| --- | --- |
| BOOKING_URL | "https://tickets.casabonitadenver.com/?sQSB0ZXN0IGJhc2U2NCBlbmNvZGVkIHBhcmFtIHN0cmluZy4gQ2FzYSBCb25pdGEgQ2FzYSBCb25pdGEgbmFuYW5hbmE=" |
| FETCH_INTERVAL | 5   |
| SLACK_WEBHOOK_URL | "https://hooks.slack.com/services/" |

4.  Configure the docker-compose.yaml
    1.  You really only need to change the `network_mode` . I use wireguard to mask my ip, but setting it to `host` will work.
5.  Run the bot
	`docker compose up --build -d`