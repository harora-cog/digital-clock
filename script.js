// Default timezones to display
const DEFAULT_TIMEZONES = [
    'America/New_York',
    'Europe/London',
    'Europe/Paris',
    'Asia/Tokyo',
    'Australia/Sydney',
    'Asia/Dubai'
];

// Store current timezones
let timezones = [...DEFAULT_TIMEZONES];

// Initialize the clock
function init() {
    loadTimezones();
    updateClocks();
    setInterval(updateClocks, 1000);
}

// Load timezones from localStorage or use defaults
function loadTimezones() {
    const saved = localStorage.getItem('timezones');
    if (saved) {
        timezones = JSON.parse(saved);
    }
}

// Save timezones to localStorage
function saveTimezones() {
    localStorage.setItem('timezones', JSON.stringify(timezones));
}

// Update all clocks
function updateClocks() {
    const clockGrid = document.getElementById('clockGrid');
    clockGrid.innerHTML = '';
    
    timezones.forEach((timezone, index) => {
        try {
            const clockCard = createClockCard(timezone, index);
            clockGrid.appendChild(clockCard);
        } catch (error) {
            console.error(`Invalid timezone: ${timezone}`);
        }
    });
}

// Create a clock card for a timezone
function createClockCard(timezone, index) {
    const card = document.createElement('div');
    card.className = 'clock-card';
    
    // Get current time in the timezone
    const now = new Date();
    const timeInTimezone = now.toLocaleString('en-US', {
        timeZone: timezone
    });
    
    const dateObj = new Date(timeInTimezone);
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    const seconds = String(dateObj.getSeconds()).padStart(2, '0');
    
    // Get date
    const dateString = now.toLocaleDateString('en-US', {
        timeZone: timezone,
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    
    // Get UTC offset
    const utcOffset = getUTCOffset(timezone);
    
    // Determine AM/PM (for display purposes)
    const hour24 = parseInt(hours);
    const ampm = hour24 >= 12 ? 'PM' : 'AM';
    const hour12 = hour24 % 12 || 12;
    const timeDisplay = `${String(hour12).padStart(2, '0')}:${minutes}:${seconds}`;
    
    card.innerHTML = `
        <button class="remove-btn" onclick="removeTimezone(${index})">×</button>
        <div class="timezone-name">${timezone.replace(/_/g, ' ')}</div>
        <div class="time-display">${timeDisplay}</div>
        <div class="am-pm">${ampm}</div>
        <div class="date-display">${dateString}</div>
        <div class="utc-offset">UTC ${utcOffset}</div>
    `;
    
    return card;
}

// Get UTC offset for a timezone
function getUTCOffset(timezone) {
    try {
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            timeZoneName: 'shortOffset'
        });
        
        const parts = formatter.formatToParts(new Date());
        const offset = parts.find(part => part.type === 'timeZoneName')?.value || 'UTC';
        return offset;
    } catch (error) {
        return 'UTC';
    }
}

// Add a new timezone
function addTimezone() {
    const input = document.getElementById('timezoneInput');
    const timezone = input.value.trim();
    
    if (!timezone) {
        alert('Please enter a timezone');
        return;
    }
    
    // Validate timezone
    try {
        new Date().toLocaleString('en-US', { timeZone: timezone });
    } catch (error) {
        alert(`Invalid timezone: ${timezone}\nPlease use format like: America/New_York, Europe/London, etc.`);
        return;
    }
    
    // Check for duplicates
    if (timezones.includes(timezone)) {
        alert(`Timezone "${timezone}" is already added`);
        return;
    }
    
    if (timezones.length >= 12) {
        alert('Maximum 12 timezones allowed');
        return;
    }
    
    timezones.push(timezone);
    saveTimezones();
    updateClocks();
    input.value = '';
}

// Remove a timezone
function removeTimezone(index) {
    timezones.splice(index, 1);
    saveTimezones();
    updateClocks();
}

// Reset to default timezones
function resetToDefault() {
    if (confirm('Are you sure you want to reset to default timezones?')) {
        timezones = [...DEFAULT_TIMEZONES];
        saveTimezones();
        updateClocks();
        document.getElementById('timezoneInput').value = '';
    }
}

// Allow Enter key to add timezone
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('timezoneInput');
    if (input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addTimezone();
            }
        });
    }
});

// Start the clock
init();