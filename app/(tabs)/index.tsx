import { ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';
import { Link } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { SFSymbol } from 'expo-symbols';

export default function HomeScreen() {
    return (
        <LinearGradient
            colors={['#0F172A', '#1E40AF']}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <ThemedView style={styles.content}>
                    {/* Header Section */}
                    <View style={styles.header}>
                        <View style={styles.logoContainer}>
                            <IconSymbol
                                name="graduationcap.fill"
                                size={100}
                                color="#FFFFFF"
                                style={styles.logoIcon}
                            />
                            <View style={styles.logoGlow} />
                        </View>
                        <ThemedText type="title" style={styles.title}>
                            SchoolSync
                        </ThemedText>
                        <ThemedText type="subtitle" style={styles.subtitle}>
                            Sua plataforma de gestão educacional
                        </ThemedText>
                    </View>

                    {/* Cards Grid */}
                    <View style={styles.grid}>
                        <GlassCard
                            title="Gerenciar Alunos"
                            icon="person.3.fill"
                            href="/(tabs)/alunos"
                            color="#6366F1"
                        />
                        
                        <GlassCard
                            title="Disciplinas"
                            icon="book.closed.fill"
                            href="/(tabs)/disciplinas"
                            color="#8B5CF6"
                        />
                    </View>

                    {/* Footer */}
                    <ThemedText style={styles.footerText}>
                        Gestão simplificada, resultados extraordinários
                    </ThemedText>
                </ThemedView>
            </ScrollView>
        </LinearGradient>
    );
}

const GlassCard = ({ title, icon, href, color }: {
    title: string;
    icon: SFSymbol;
    href: string;
    color: string;
}) => (
    <Link href={href} asChild>
        <TouchableOpacity>
            <BlurView intensity={30} style={[styles.card, { borderColor: color }]}>
                <View style={styles.cardContent}>
                    <View style={[styles.iconContainer, { backgroundColor: `${color}20` }]}>
                        <IconSymbol
                            name={icon}
                            size={40}
                            color="#FFFFFF"
                            style={styles.icon}
                        />
                    </View>
                    <ThemedText type="defaultSemiBold" style={styles.cardText}>
                        {title}
                    </ThemedText>
                </View>
            </BlurView>
        </TouchableOpacity>
    </Link>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 50,
    },
    scrollContent: {
        flexGrow: 1,
    },
    content: {
        flex: 1,
        padding: 24,
        justifyContent: 'space-between',
    },
    header: {
        alignItems: 'center',
        marginTop: 40,
    },
    logoContainer: {
        position: 'relative',
        marginBottom: 20,
    },
    logoIcon: {
        opacity: 0.9,
        transform: [{ rotate: '15deg' }],
    },
    logoGlow: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#6366F1',
        opacity: 0.2,
        borderRadius: 50,
        transform: [{ scale: 1.4 }],
    },
    title: {
        fontSize: 40,
        color: '#FFFFFF',
        fontWeight: '800',
        marginBottom: 8,
        textAlign: 'center',
        textShadowColor: 'rgba(99, 102, 241, 0.4)',
        textShadowOffset: { width: 0, height: 4 },
        textShadowRadius: 10,
        paddingTop: 10,
    },
    subtitle: {
        fontSize: 18,
        color: '#CBD5E1',
        textAlign: 'center',
        maxWidth: 300,
        lineHeight: 24,
    },
    grid: {
        gap: 20,
        marginVertical: 40,
    },
    card: {
        borderRadius: 24,
        padding: 24,
        overflow: 'hidden',
        borderWidth: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        minHeight: 160,
        justifyContent: 'center',
        backdropFilter: 'blur(10px)',
    },
    cardContent: {
        alignItems: 'center',
        gap: 20,
    },
    iconContainer: {
        padding: 16,
        borderRadius: 16,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        transform: [{ scale: 1.2 }],
    },
    cardText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#FFFFFF',
        textAlign: 'center',
        letterSpacing: 0.5,
    },
    footerText: {
        color: '#94A3B8',
        textAlign: 'center',
        fontSize: 14,
        marginBottom: 20,
    },
});