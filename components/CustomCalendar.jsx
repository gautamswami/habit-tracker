import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ModalContext } from '@/app/_layout';
const CustomCalendar = ({ highlightedDates = [],calendarDate,setCalendarDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null); // State to track selected date

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
    setSelectedDate(null); // Reset selected date when changing months
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => {
      const nextMonth = new Date(prev.setMonth(prev.getMonth() + 1));
      return nextMonth;
    });
    setSelectedDate(null); // Reset selected date when changing months
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

  // Check if a date is selected
  const isSelected = (day) => {
    return (
      selectedDate &&
      selectedDate.day === day &&
      selectedDate.month === currentDate.getMonth() &&
      selectedDate.year === currentDate.getFullYear()
    );
  };

  // Handle date selection
  const handleDateSelect = (day) => {
    setSelectedDate({ day, month: currentDate.getMonth(), year: currentDate.getFullYear() });
    setCalendarDate(`${currentDate.getMonth() + 1}/${day}/${currentDate.getFullYear()}`);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePreviousMonth} style={styles.button}>
        <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>
          {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
        </Text>
        <TouchableOpacity onPress={handleNextMonth} style={styles.button}>
        <Ionicons name="chevron-forward-outline" size={24} color="white" />
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
          <View key={index} style={styles.dayContainer}>
            {day ? (
              <TouchableOpacity onPress={() => handleDateSelect(day)}>
                <Text
                  style={[
                    styles.dayText,
                    isToday(day) && styles.today,
                    isHighlighted(day) && styles.highlighted,
                    isSelected(day) && styles.selected,
                  ]}
                >
                  {day}
                </Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.emptySlot}></Text>
            )}
          </View>
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
    backgroundColor: '#7C55FE',
    borderRadius: 50,
  },
  buttonText: {
    color: 'white',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color:"white"
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
    marginTop: 10,
    
  },
  dayText: {
    fontSize: 16,
    color: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  today: {
    color: 'white',
    backgroundColor: '#7C55FE',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
   
  },
  highlighted: {
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 30,
  },
  selected: {
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 20,
  },
  emptySlot: {
    width: '100%',
    height: 20,
  },
});

export default CustomCalendar;
