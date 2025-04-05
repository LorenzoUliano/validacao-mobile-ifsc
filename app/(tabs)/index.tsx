import { StyleSheet, Platform, View } from 'react-native';
import { Link } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { TouchableOpacity } from 'react-native';

export default function HomeScreen() {
    return (
      <View style={styles.container}>
        <ThemedView style={styles.content}>
          <ThemedText type="title" style={styles.title}>
            School Manager
          </ThemedText>
  
          <ThemedText type="subtitle" style={styles.subtitle}>
            Gerencie alunos e disciplinas de forma simples
          </ThemedText>
  
          <View style={styles.buttonsContainer}>
            <Link href="/(tabs)/alunos" asChild>
              <TouchableOpacity style={[styles.card, styles.studentsCard]}>
                <View style={styles.iconWrapper}>
                  <IconSymbol
                    name="person.3.fill"
                    size={48}
                    color="#FFFFFF"
                  />
                </View>
                <ThemedText type="defaultSemiBold" style={styles.cardText}>
                  Alunos
                </ThemedText>
              </TouchableOpacity>
            </Link>
  
            <Link href="/(tabs)/disciplinas" asChild>
              <TouchableOpacity style={[styles.card, styles.subjectsCard]}>
                <View style={styles.iconWrapper}>
                  <IconSymbol
                    name="book.closed.fill"
                    size={48}
                    color="#FFFFFF"
                  />
                </View>
                <ThemedText type="defaultSemiBold" style={styles.cardText}>
                  Disciplinas
                </ThemedText>
              </TouchableOpacity>
            </Link>
          </View>
        </ThemedView>
      </View>
    );
  }
  
  // Atualize os estilos
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      padding: 24,
      alignItems: 'center',
    },
    title: {
      fontSize: 32,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 18,
      marginBottom: 40,
      color: '#666',
    },
    buttonsContainer: {
      flexDirection: 'row',
      gap: 20,
      justifyContent: 'center',
    },
    card: {
      width: 160,
      height: 160,
      borderRadius: 20,
      padding: 20,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 4,
    },
    iconWrapper: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderRadius: 24,
      padding: 12,
      marginBottom: 15,
    },
    studentsCard: {
        backgroundColor: '#2563EB',
    },
    subjectsCard: {
        backgroundColor: '#4F46E5',
    },
    cardIcon: {
        marginBottom: 15,
    },
    cardText: {
        color: '#FFFFFF',
        fontSize: 18,
        textAlign: 'center',
    },
    footerText: {
        textAlign: 'center',
        color: '#666',
        marginTop: 30,
    },
    headerImage: {
        color: '#A0A0A0',
        bottom: -60,
        left: -35,
        position: 'absolute',
        opacity: 0.8,
    },
});