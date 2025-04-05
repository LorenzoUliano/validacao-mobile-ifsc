import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Link } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { TouchableOpacity } from 'react-native';
import { useStudents } from '@/contexts/StudentContext';

export default function HomeScreen() {
    const { students, subjects } = useStudents();
    return (
        <LinearGradient
            colors={['#F8FAFC', '#E2E8F0']}
            style={styles.gradientContainer}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
        >
            <ScrollView 
                contentContainerStyle={styles.scrollContent}
                style={styles.scrollView}
            >
                <View style={styles.content}>
                    <View style={styles.header}>
                        <View style={styles.logoContainer}>
                            <IconSymbol
                                name="graduationcap.fill"
                                size={80}
                                color="#0F172A"
                            />
                            <View style={styles.logoBadge}>
                                <ThemedText style={styles.badgeText}>v2.0</ThemedText>
                            </View>
                        </View>
                        <ThemedText type="title" style={styles.title}>
                            SchoolSync
                        </ThemedText>
                        <ThemedText type="subtitle" style={styles.subtitle}>
                            Gestão Educacional Integrada
                        </ThemedText>
                    </View>

                    {/* Cards Grid */}
                    <View style={styles.grid}>
                        <DashboardCard
                            title="Alunos"
                            icon="person.3.fill"
                            href="/(tabs)/alunos"
                            count={students.length}
                        />
                        
                        <DashboardCard
                            title="Disciplinas"
                            icon="book.closed.fill"
                            href="/(tabs)/disciplinas"
                            count={subjects.length}
                        />
                    </View>
                </View>
            </ScrollView>
        </LinearGradient>
    );
}

const DashboardCard = ({ title, icon, href, count }: {
    title: string;
    icon: any;
    href: any;
    count: number;
}) => (
    <Link href={href} asChild>
        <TouchableOpacity style={styles.card}>
            <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                    <IconSymbol
                        name={icon}
                        size={24}
                        color="#0F172A"
                    />
                    <ThemedText type="defaultSemiBold" style={styles.cardTitle}>
                        {title}
                    </ThemedText>
                </View>
                <ThemedText type="title" style={styles.cardCount}>
                    {count}
                </ThemedText>
            </View>
        </TouchableOpacity>
    </Link>
);

const styles = StyleSheet.create({
    gradientContainer: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        minHeight: '100%',
    },
    content: {
        flex: 1,
        padding: 24,
        backgroundColor: 'transparent',
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    logoContainer: {
        position: 'relative',
        marginBottom: 20,
    },
    logoBadge: {
        position: 'absolute',
        top: -10,
        right: -20,
        backgroundColor: '#6366F1',
        borderRadius: 8,
        paddingVertical: 4,
        paddingHorizontal: 8,
    },
    badgeText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
    },
    title: {
        fontSize: 32,
        color: '#0F172A',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#64748B',
        textAlign: 'center',
        maxWidth: 280,
        lineHeight: 24,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
        justifyContent: 'center',
        marginBottom: 32,
    },
    card: {
        width: 160,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
    },
    cardContent: {
        gap: 16,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    cardTitle: {
        fontSize: 16,
        color: '#0F172A',
    },
    cardCount: {
        fontSize: 32,
        color: '#0F172A',
        fontWeight: '700',
    },
});