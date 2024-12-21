import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomCalendar = ({ highlightedDates = [] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date();

  // Helper function to get days in a month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Generate the calendar dates
  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    // Create an array of dates for the current month
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    // Add empty slots for alignment
    const leadingEmptyDays = Array(firstDayOfMonth).fill(null);
    return [...leadingEmptyDays, ...days];
  };

  const calendarDays = generateCalendar();

  // Handle navigation
  const handlePreviousMonth = () => {
    setCurrentDate((prev) => {
      const prevMonth = new Date(prev.setMonth(prev.getMonth() - 1));
      return prevMonth;
    });
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => {
      const nextMonth = new Date(prev.setMonth(prev.getMonth() + 1));
      return nextMonth;
    });
  };

  // Check if a date is today
  const isToday = (day) => {
    return (
      today.getDate() === day &&
      today.getMonth() === currentDate.getMonth() &&
      today.getFullYear() === currentDate.getFullYear()
    );
  };

  // Check if a date is highlighted
  const isHighlighted = (day) => {
    const dateString = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;
    return highlightedDates.includes(dateString);
  };

  const [selectedDate,setSelectedDate] = useState('')

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePreviousMonth} style={styles.button}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>
          {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
        </Text>
        <TouchableOpacity onPress={handleNextMonth} style={styles.button}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>

      {/* Weekday Headers */}
      <View style={styles.weekDays}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <Text key={day} style={styles.weekDayText}>
            {day}
          </Text>
        ))}
      </View>

      {/* Calendar Dates */}
      <View style={styles.calendar}>
        {calendarDays.map((day, index) => (
          <TouchableOpacity onPress={()=>{console.log(index,day,'index - day',currentDate);setSelectedDate(day)}} key={index} style={styles.dayContainer}>
            {day ? (
              <Text
                style={[
                  styles.dayText,
                  isToday(day) && styles.today,
                  isHighlighted(day) && styles.highlighted,
                  selectedDate === day && styles.today
                ]}
              >
                {day}
              </Text>
            ) : (
              <Text style={styles.emptySlot}></Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'white'
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  weekDayText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 300,
    color: 'lightgray',
  },
  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayContainer: {
    width: '14.28%', // 7 columns
    alignItems: 'center',
    marginBottom: 10,
  },
  dayText: {
    fontSize: 16,
    color: 'white',
  },
  today: {
    color: 'white',
    backgroundColor: 'red',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  highlighted: {
    color: 'white',
    backgroundColor: 'blue',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  emptySlot: {
    width: '100%',
    height: 20,
  },
});

export default CustomCalendar;
