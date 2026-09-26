import {
    ArrowRight,
    CheckCircle2,
    Circle,
    Clock,
    Search,
} from "lucide-react-native";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { AppShell } from "../components/layout/AppShell";
import { useRouter } from "expo-router";
import {
    currentSprint,
    currentUser,
    recentActivity,
    recentTasks,
} from "../mocks/home";
import { theme } from "../theme";

export default function Home() {
  const router = useRouter();

  const handleQuickAction = (action: string) => {
    if (action === "Resumen del sprint") router.push('/work');
    if (action === "Mis tareas") router.push('/work');
    if (action === "Buscar documento") router.push('/work');
  };

  return (
    <AppShell title="Inicio">
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Saludo */}
        <View style={styles.greetingSection}>
          <Text style={styles.greeting}>Buenos días, {currentUser.name}</Text>
          <Text style={styles.subtitle}>
            Esto es lo que está pasando con tu equipo.
          </Text>
        </View>

        {/* Milo Input Principal */}
        <View style={styles.miloCard}>
          <Text style={styles.miloTitle}>¿Qué necesitas saber?</Text>
          <View style={styles.inputContainer}>
            <Search
              size={20}
              color={theme.colors.text.tertiary}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Pregúntale algo a Milo..."
              placeholderTextColor={theme.colors.text.tertiary}
            />
            <Pressable style={styles.sendButton} onPress={() => router.push('/milo')}>
              <ArrowRight size={20} color={theme.colors.text.inverse} />
            </Pressable>
          </View>
          <View style={styles.quickActions}>
            {["Resumen del sprint", "Mis tareas", "Buscar documento"].map(
              (action, i) => (
                <Pressable key={i} style={styles.quickActionBadge} onPress={() => handleQuickAction(action)}>
                  <Text style={styles.quickActionText}>{action}</Text>
                </Pressable>
              ),
            )}
          </View>
        </View>

        {/* Contenido en Grid */}
        <View style={styles.grid}>
          {/* Columna Izquierda */}
          <View style={styles.columnLeft}>
            {/* Resumen del Sprint */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Resumen del Sprint</Text>
                <Pressable onPress={() => router.push('/work')}>
                  <Text style={styles.cardAction}>Ver detalles</Text>
                </Pressable>
              </View>
              <Text style={styles.sprintName}>{currentSprint.name}</Text>
              <View style={styles.progressContainer}>
                <View style={styles.progressHeader}>
                  <Text style={styles.progressText}>Progreso</Text>
                  <Text style={styles.progressValue}>
                    {currentSprint.progress}%
                  </Text>
                </View>
                <View style={styles.progressBarBg}>
                  <View
                    style={[
                      styles.progressBarFill,
                      { width: `${currentSprint.progress}%` },
                    ]}
                  />
                </View>
              </View>
              <View style={styles.sprintStats}>
                <View style={styles.statBox}>
                  <Text style={styles.statValue}>
                    {currentSprint.completedTasks}
                  </Text>
                  <Text style={styles.statLabel}>Completadas</Text>
                </View>
                <View style={styles.statBox}>
                  <Text style={styles.statValue}>
                    {currentSprint.pendingTasks}
                  </Text>
                  <Text style={styles.statLabel}>Pendientes</Text>
                </View>
              </View>
            </View>

            {/* Mis tareas */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Mis tareas</Text>
                <Pressable onPress={() => router.push('/work')}>
                  <Text style={styles.cardAction}>Ver todas</Text>
                </Pressable>
              </View>
              <View style={styles.list}>
                {recentTasks.map((task) => (
                  <View key={task.id} style={styles.listItem}>
                    {task.status === "completed" ? (
                      <CheckCircle2 size={20} color={theme.colors.success} />
                    ) : (
                      <Circle size={20} color={theme.colors.text.tertiary} />
                    )}
                    <Text
                      style={[
                        styles.listText,
                        task.status === "completed" && styles.listTextCompleted,
                      ]}
                    >
                      {task.title}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* Columna Derecha */}
          <View style={styles.columnRight}>
            {/* Actividad Reciente */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Actividad reciente</Text>
              </View>
              <View style={styles.list}>
                {recentActivity.map((activity) => (
                  <View key={activity.id} style={styles.activityItem}>
                    <View style={styles.activityIcon}>
                      <Clock size={16} color={theme.colors.text.secondary} />
                    </View>
                    <View style={styles.activityContent}>
                      <Text style={styles.activityText}>
                        {activity.description}
                      </Text>
                      <Text style={styles.activityTime}>{activity.time}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  greetingSection: {
    marginBottom: theme.spacing.xl,
  },
  greeting: {
    fontSize: theme.typography.size.xxl,
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.typography.size.md,
    color: theme.colors.text.secondary,
  },
  miloCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.xl,
    padding: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.sm,
  },
  miloTitle: {
    fontSize: theme.typography.size.lg,
    fontWeight: theme.typography.weight.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.lg,
    paddingHorizontal: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.md,
  },
  inputIcon: {
    marginRight: theme.spacing.sm,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: theme.typography.size.md,
    color: theme.colors.text.primary,
    outlineWidth: 0,
  },
  sendButton: {
    backgroundColor: theme.colors.primary,
    width: 32,
    height: 32,
    borderRadius: theme.radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  quickActions: {
    flexDirection: "row",
    gap: theme.spacing.sm,
    flexWrap: "wrap",
  },
  quickActionBadge: {
    backgroundColor: theme.colors.primaryLight,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.radius.full,
  },
  quickActionText: {
    color: theme.colors.primary,
    fontSize: theme.typography.size.sm,
    fontWeight: theme.typography.weight.medium,
  },
  grid: {
    flexDirection: "row",
    gap: theme.spacing.xl,
    flexWrap: "wrap",
  },
  columnLeft: {
    flex: 2,
    minWidth: 300,
    gap: theme.spacing.xl,
  },
  columnRight: {
    flex: 1,
    minWidth: 300,
    gap: theme.spacing.xl,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.sm,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.lg,
  },
  cardTitle: {
    fontSize: theme.typography.size.md,
    fontWeight: theme.typography.weight.semibold,
    color: theme.colors.text.primary,
  },
  cardAction: {
    fontSize: theme.typography.size.sm,
    color: theme.colors.primary,
    fontWeight: theme.typography.weight.medium,
  },
  sprintName: {
    fontSize: theme.typography.size.lg,
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.lg,
  },
  progressContainer: {
    marginBottom: theme.spacing.lg,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: theme.spacing.xs,
  },
  progressText: {
    fontSize: theme.typography.size.sm,
    color: theme.colors.text.secondary,
  },
  progressValue: {
    fontSize: theme.typography.size.sm,
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.primary,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.full,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.full,
  },
  sprintStats: {
    flexDirection: "row",
    gap: theme.spacing.md,
  },
  statBox: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    alignItems: "center",
  },
  statValue: {
    fontSize: theme.typography.size.xl,
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: theme.typography.size.sm,
    color: theme.colors.text.secondary,
  },
  list: {
    gap: theme.spacing.md,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  listText: {
    fontSize: theme.typography.size.md,
    color: theme.colors.text.primary,
    flex: 1,
  },
  listTextCompleted: {
    color: theme.colors.text.tertiary,
    textDecorationLine: "line-through",
  },
  activityItem: {
    flexDirection: "row",
    gap: theme.spacing.md,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: theme.typography.size.sm,
    color: theme.colors.text.primary,
    marginBottom: 2,
    lineHeight: 20,
  },
  activityTime: {
    fontSize: 12,
    color: theme.colors.text.tertiary,
  },
});
