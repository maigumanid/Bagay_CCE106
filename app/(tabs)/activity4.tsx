import { useState } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import ActivityHeader from '@/components/ActivityHeader';
import CalculatorInput from '@/components/CalculatorInput';
import CalculatorButton from '@/components/CalculatorButton';
import CalculationResult from '@/components/CalculationResult';

export default function Activity4Screen() {
  const [firstValue, setFirstValue] = useState('');
  const [secondValue, setSecondValue] = useState('');
  const [result, setResult] = useState('');

  const [isError, setIsError] = useState(false);

  const calculate = (operation: string) => {
    if (!firstValue.trim() || !secondValue.trim()) {
      setResult('Please enter both numeric values.');
      setIsError(true);
      return;
    }

    const number1 = Number(firstValue);
    const number2 = Number(secondValue);

    if (!Number.isFinite(number1) || !Number.isFinite(number2)) {
      setResult('Please enter valid numeric values.');
      setIsError(true);
      return;
    }

    if (operation === '/' && number2 === 0) {
      setResult('Cannot divide by zero.');
      setIsError(true);
      return;
    }

    let calculation = 0;

    switch (operation) {
      case '+':
        calculation = number1 + number2;
        break;

      case '-':
        calculation = number1 - number2;
        break;

      case '*':
        calculation = number1 * number2;
        break;

      case '/':
        calculation = number1 / number2;
        break;
    }

    setResult(calculation.toString());
    setIsError(false);
  };

  return (
    <View style={styles.container}>

      <ActivityHeader title="Activity 4" />

      <View style={styles.content}>

        <View style={styles.card}>

          <ThemedText style={styles.sectionTitle}>
            Basic Calculator
          </ThemedText>

          <ThemedText style={styles.description}>
            Enter two numbers and choose an operation.
          </ThemedText>

          <CalculatorInput
            label="First Value"
            value={firstValue}
            onChangeText={setFirstValue}
          />

          <CalculatorInput
            label="Second Value"
            value={secondValue}
            onChangeText={setSecondValue}
          />

          <ThemedText style={styles.operationLabel}>
            OPERATIONS
          </ThemedText>

          <View style={styles.buttonRow}>
            <CalculatorButton
              label="+"
              onPress={() => calculate('+')}
            />

            <CalculatorButton
              label="−"
              onPress={() => calculate('-')}
            />
          </View>

          <View style={styles.buttonRow}>
            <CalculatorButton
              label="×"
              onPress={() => calculate('*')}
            />

            <CalculatorButton
              label="÷"
              onPress={() => calculate('/')}
            />
          </View>

          <CalculationResult
            result={result}
            isError={isError}
          />

        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3B0A18',
    paddingHorizontal: 28,
    paddingTop: 20,
  },

  content: {
    flex: 1,
    paddingTop: 25,
    alignItems: 'center',
  },

  card: {
    width: '100%',
    maxWidth: 650,
    backgroundColor: '#521525',
    borderRadius: 18,
    padding: 24,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
  },

  description: {
    fontSize: 14,
    lineHeight: 21,
    color: '#F4DDE2',
    marginBottom: 22,
  },

  operationLabel: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
    color: '#E7A0AA',
    marginBottom: 10,
  },

  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
});
