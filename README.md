# Multi-Timezone Digital Clock

A responsive web application that displays the current time in multiple time zones around the world.

## Features

✨ **Core Features:**
- Real-time clock display updating every second
- Display time in 6 default major time zones
- Add custom time zones dynamically
- Remove time zones individually
- Reset to default time zones
- UTC offset information for each timezone
- 12-hour and 24-hour time format support
- Date display for each timezone

🎨 **Design Features:**
- Beautiful gradient background
- Responsive grid layout
- Hover animations and transitions
- Mobile-friendly interface
- Clean and modern UI

💾 **Data Persistence:**
- Save custom timezone preferences in browser localStorage
- Preferences persist across sessions

## Default Timezones

1. America/New_York (EST/EDT)
2. Europe/London (GMT/BST)
3. Europe/Paris (CET/CEST)
4. Asia/Tokyo (JST)
5. Australia/Sydney (AEDT/AEST)
6. Asia/Dubai (GST)

## How to Use

1. Open `index.html` in a web browser
2. View the current time in default time zones
3. **Add a timezone:**
   - Enter a valid timezone identifier (e.g., `America/Los_Angeles`, `Asia/Singapore`)
   - Click "Add Timezone" or press Enter
   - Maximum 12 timezones can be displayed

4. **Remove a timezone:**
   - Click the "×" button on any clock card

5. **Reset to defaults:**
   - Click "Reset to Default" button

## Valid Timezone Formats

Use the IANA Time Zone Database format:
- `America/New_York`
- `Europe/London`
- `Asia/Tokyo`
- `Australia/Sydney`
- `America/Los_Angeles`
- `Asia/Singapore`
- `Europe/Paris`
- `Africa/Cairo`
- `America/Mexico_City`
- `Asia/Dubai`

[View all IANA timezones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)

## Technical Details

**Technologies Used:**
- HTML5
- CSS3 (Flexbox, Grid, Animations)
- Vanilla JavaScript (ES6)
- Browser LocalStorage API
- JavaScript Intl API

**Browser Support:**
- Chrome/Edge 61+
- Firefox 56+
- Safari 11+
- Opera 48+

## File Structure

```
digital-clock/
├── index.html      # Main HTML file
├── styles.css      # Styling
├── script.js       # JavaScript logic
└── README.md       # This file
```

## Features in Detail

### Real-time Updates
The clocks update every second using `setInterval()` to fetch current time data from the browser's system.

### Timezone Validation
The application validates timezone entries using JavaScript's `Intl.DateTimeFormat` API before adding them.

### Responsive Design
The layout uses CSS Grid with `auto-fit` for responsive behavior across different screen sizes.

### Local Storage
User's custom timezone selections are automatically saved to browser localStorage and restored on page reload.

## Customization

### Change Default Timezones
Edit the `DEFAULT_TIMEZONES` array in `script.js`:

```javascript
const DEFAULT_TIMEZONES = [
    'America/New_York',
    'Europe/London',
    // Add your preferred timezones here
];
```

### Modify Colors
Edit the CSS in `styles.css` for gradient colors and accent colors:

```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
color: #667eea;
```

### Change Update Frequency
Modify the interval in `script.js`:

```javascript
setInterval(updateClocks, 1000); // Change 1000 to desired milliseconds
```

## Future Enhancements

- [ ] Search functionality for timezones
- [ ] Alarm/notification system
- [ ] 24-hour format toggle
- [ ] Dark mode
- [ ] WorldClock comparison feature
- [ ] Export clock data
- [ ] Multiple clock themes

## License

This project is open source and available under the MIT License.

## Author

Created as a multi-timezone digital clock web application.