import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// 1. Define an Interface for Props
interface HeaderProps {
  title: string;
  subtitle?: string; // Question mark makes it optional
}

// 2. Typed Functional Component
const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const { title, subtitle } = props;
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
};

const App: React.FC = () => {
  // 3. Typed Event Handler
  const handlePress = (): void => {
    console.log("TSX Button Pressed");
  };

  return (
    <View style={styles.container}>
      <Header 
        title="TypeScript Native" 
        subtitle="Building with type safety" 
      />
      
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Click Me</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default App;