const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5005;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize SQLite database
const dbPath = path.resolve(__dirname, 'bookings.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    // Create bookings table if it doesn't exist
    db.run(`
      CREATE TABLE IF NOT EXISTS bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_name TEXT,
        phone TEXT,
        email TEXT,
        booking_date TEXT NOT NULL,
        start_time TEXT NOT NULL,
        end_time TEXT NOT NULL,
        duration TEXT NOT NULL,
        status TEXT DEFAULT 'confirmed',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) {
        console.error('Error creating table:', err.message);
      } else {
        console.log('Bookings table ready.');
      }
    });
  }
});

// Helper function to convert time string (HH:MM or HH:MM AM/PM) to minutes since midnight
const timeToMinutes = (timeStr) => {
  if (!timeStr) return 0;
  
  let hours, minutes;
  
  if (timeStr.includes('AM') || timeStr.includes('PM')) {
    const [time, modifier] = timeStr.split(' ');
    let [h, m] = time.split(':');
    hours = parseInt(h, 10);
    minutes = parseInt(m, 10);
    
    if (hours === 12) {
      hours = modifier === 'AM' ? 0 : 12;
    } else if (modifier === 'PM') {
      hours += 12;
    }
  } else {
    // 24-hour format
    const [h, m] = timeStr.split(':');
    hours = parseInt(h, 10);
    minutes = parseInt(m, 10);
  }
  
  return hours * 60 + minutes;
};

// API: Check Availability
app.get('/api/bookings/check', (req, res) => {
  const { date, startTime, endTime } = req.query;

  if (!date || !startTime || !endTime) {
    return res.status(400).json({ error: 'date, startTime, and endTime are required' });
  }

  const requestedStart = timeToMinutes(startTime);
  const requestedEnd = timeToMinutes(endTime);

  const query = `SELECT * FROM bookings WHERE booking_date = ? AND status = 'confirmed'`;
  
  db.all(query, [date], (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Database error' });
    }

    // Check for overlaps
    let overlappingBooking = null;
    
    for (const booking of rows) {
      const existingStart = timeToMinutes(booking.start_time);
      const existingEnd = timeToMinutes(booking.end_time);

      // Overlap logic: (StartA < EndB) and (EndA > StartB)
      if (requestedStart < existingEnd && requestedEnd > existingStart) {
        overlappingBooking = booking;
        break;
      }
    }

    if (overlappingBooking) {
      return res.json({
        available: false,
        booking: overlappingBooking
      });
    }

    return res.json({
      available: true
    });
  });
});

// API: Create Booking
app.post('/api/bookings', (req, res) => {
  const { customer_name, phone, email, booking_date, start_time, end_time, duration } = req.body;

  if (!booking_date || !start_time || !end_time || !duration) {
    return res.status(400).json({ error: 'Missing required booking fields' });
  }

  // Double check availability before saving
  const requestedStart = timeToMinutes(start_time);
  const requestedEnd = timeToMinutes(end_time);

  const checkQuery = `SELECT * FROM bookings WHERE booking_date = ? AND status = 'confirmed'`;
  
  db.all(checkQuery, [booking_date], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    let hasOverlap = false;
    for (const booking of rows) {
      const existingStart = timeToMinutes(booking.start_time);
      const existingEnd = timeToMinutes(booking.end_time);

      if (requestedStart < existingEnd && requestedEnd > existingStart) {
        hasOverlap = true;
        break;
      }
    }

    if (hasOverlap) {
      return res.status(409).json({ error: 'Time slot is already booked.' });
    }

    // Save booking
    const insertQuery = `
      INSERT INTO bookings (customer_name, phone, email, booking_date, start_time, end_time, duration)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(insertQuery, [customer_name, phone, email, booking_date, start_time, end_time, duration], function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to create booking' });
      }
      
      res.status(201).json({
        message: 'Booking created successfully',
        bookingId: this.lastID
      });
    });
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
