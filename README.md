# Event Management App

## Description

The Event Management App is a mobile application designed to simplify event browsing and management. Built with TypeScript, React Native and Expo, the app allows users to:

- Browse a list of available events.
- Add events to their Mobile Calendar directly from the app.
- Provide admin access for event management.

## Installation Instructions

### Clone the Repository:
```bash
git clone https://github.com/jxffxjxke/Events-Platform.git
cd Events-Platform

```

### Make sure you have the EXPO CLI installed:
```bash
npm install --global expo

```

### Install Dependencies:
Ensure you have Node.js installed, then run:
```bash
npm install
```

### Create ENV variables:
1. Create a .env file.
2. Contact me regarding the **EXPO_PUBLIC_SUPABASE_URL** and **EXPO_PUBLIC_SUPABASE_ANON_KEY**.
3. Create the variables in the .env file
```bash
EXPO_PUBLIC_SUPABASE_URL=given_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=given_key
```

### Start the Development Server:
Run the app in Expo:
```bash
npx expo start
```

_I run:_
```bash
npx expo start --tunnel
```
_as I have LAN issues when hosting locally_

### Run on Your Device or Emulator:
- Use the Expo Go app on your mobile device to scan the QR code displayed in the terminal/browser.
- Alternatively, run the app on an emulator using Xcode.

## Usage Examples

### Browsing Events
1. Launch the app.
2. This should open on the Home page with a list of Events.
3. Tap an event to view more details.

### Adding Events to Calendar
1. As a user, select an event from the list.
2. Tap the **+** button.
3. The event will be added directly to your Mobile Calendar.

### Admin: Adding an Event
1. On the Home page, tap the **+** button located in the bottom right corner.
2. A form will appear prompting the admin to enter the event details (e.g., event name, date, time, description).
3. After filling in the details, tap "Save" to add the event to the Events list.

### Admin: Deleting an Event
1. Navigate to the **My Events** page, where the admin can view all of their events.
2. For each event, there will be a bin icon next to it.
3. Tap the bin icon to delete an event.

### Admin Access
Use the following test admin credentials to log in:
- **Username**: jaffajake25@gmail.com
- **Password**: examplepassword

Access event management features, such as adding and removing events.

### Test User Access
Use the following test user credentials:
- **Username**: jj.whittaker01@gmail.com
- **Password**: TestPassword

Explore event browsing and adding events to your calendar.

## Contact

If you have any questions or suggestions, feel free to reach out:

- **GitHub**: @Jxffxjxke
- **Email**: jj.whittaker01@gmail.com
