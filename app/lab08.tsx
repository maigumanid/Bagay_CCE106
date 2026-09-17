import { useEffect, useState } from 'react';
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

type Status = 'Present' | 'Absent' | '';

type Student = {
  id: number;
  name: string;
  status: Status;
};

const initialStudents: Student[] = [
  { id: 1, name: 'Rainier Saul', status: '' },
  { id: 2, name: 'Michaela Bagay', status: '' },
  { id: 3, name: 'Karl Calizar', status: '' },
  { id: 4, name: 'Trisha Facundo', status: '' },
  { id: 5, name: 'Aye Enargan', status: '' },
  { id: 6, name: 'Mark Catolico', status: '' },
  { id: 7, name: 'Desiree Alindajao', status: '' },
  { id: 8, name: 'Joyce Jayagan', status: '' },
  { id: 9, name: 'Jade Olacao', status: '' },
  { id: 10, name: 'Zhianne Trono', status: '' },
  { id: 11, name: 'Dwayne Gonzales', status: '' },
  { id: 12, name: 'Denver Catulong', status: '' },
];

export default function Lab08() {
  const [students, setStudents] =
    useState<Student[]>(initialStudents);

  const [presentCount, setPresentCount] = useState(0);
  const [absentCount, setAbsentCount] = useState(0);

  useEffect(() => {
    const present = students.filter(
      (student) => student.status === 'Present'
    ).length;

    const absent = students.filter(
      (student) => student.status === 'Absent'
    ).length;

    setPresentCount(present);
    setAbsentCount(absent);
  }, [students]);

  const markAttendance = (
    id: number,
    status: Status
  ) => {
    setStudents((previousStudents) =>
      previousStudents.map((student) =>
        student.id === id
          ? { ...student, status }
          : student
      )
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>

        <Text style={styles.title}>
          Attendance List
        </Text>

        <Text style={styles.subtitle}>
          Lab 08
        </Text>

        <View style={styles.counterContainer}>
          <View style={styles.counterBox}>
            <Text style={styles.counterNumber}>
              {presentCount}
            </Text>
            <Text style={styles.presentLabel}>
              Present
            </Text>
          </View>

          <View style={styles.counterBox}>
            <Text style={styles.counterNumber}>
              {absentCount}
            </Text>
            <Text style={styles.absentLabel}>
              Absent
            </Text>
          </View>
        </View>

        <View style={styles.headerRow}>
          <Text style={styles.nameHeader}>
            Student Name
          </Text>

          <Text style={styles.columnHeader}>
            Present
          </Text>

          <Text style={styles.columnHeader}>
            Absent
          </Text>
        </View>

        {students.map((student) => (
          <View
            key={student.id}
            style={styles.studentRow}
          >
            <Text style={styles.studentName}>
              {student.id}. {student.name}
            </Text>

            <View style={styles.checkboxColumn}>
              <Pressable
                style={[
                  styles.checkbox,
                  student.status === 'Present' &&
                    styles.presentChecked,
                ]}
                onPress={() =>
                  markAttendance(
                    student.id,
                    'Present'
                  )
                }
              >
                {student.status === 'Present' && (
                  <Text style={styles.checkmark}>
                    ✓
                  </Text>
                )}
              </Pressable>
            </View>

            <View style={styles.checkboxColumn}>
              <Pressable
                style={[
                  styles.checkbox,
                  student.status === 'Absent' &&
                    styles.absentChecked,
                ]}
                onPress={() =>
                  markAttendance(
                    student.id,
                    'Absent'
                  )
                }
              >
                {student.status === 'Absent' && (
                  <Text style={styles.checkmark}>
                    ✓
                  </Text>
                )}
              </Pressable>
            </View>
          </View>
        ))}

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6F8',
  },

  content: {
    padding: 20,
    paddingTop: 50,
    paddingBottom: 50,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
  },

  subtitle: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
    marginBottom: 20,
  },

  counterContainer: {
    flexDirection: 'row',
    marginBottom: 25,
  },

  counterBox: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 5,
  },

  counterNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
  },

  presentLabel: {
    color: '#16803A',
    fontWeight: '600',
  },

  absentLabel: {
    color: '#C62828',
    fontWeight: '600',
  },

  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#E5E7EB',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 5,
  },

  nameHeader: {
    flex: 1,
    fontWeight: 'bold',
    color: '#333',
  },

  columnHeader: {
    width: 75,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
  },

  studentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginBottom: 4,
    borderRadius: 6,
  },

  studentName: {
    flex: 1,
    fontSize: 14,
    color: '#222',
  },

  checkboxColumn: {
    width: 75,
    alignItems: 'center',
  },

  checkbox: {
    width: 25,
    height: 25,
    borderWidth: 2,
    borderColor: '#A0A0A0',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },

  presentChecked: {
    backgroundColor: '#16A34A',
    borderColor: '#16A34A',
  },

  absentChecked: {
    backgroundColor: '#DC2626',
    borderColor: '#DC2626',
  },

  checkmark: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});