import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { AppShell } from '../components/layout/AppShell';
import { theme } from '../theme';
import { crmContactsMock, crmDealsMock } from '../mocks/crm';
import { contractsMock } from '../mocks/contracts';
import { Building2, FileText, User } from 'lucide-react-native';

type BusinessTab = 'crm' | 'canvas' | 'contracts';

export default function BusinessScreen() {
  const [activeTab, setActiveTab] = useState<BusinessTab>('crm');

  const renderCRM = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Deals Activos</Text>
      <View style={styles.dealsGrid}>
        {crmDealsMock.map(deal => (
          <View key={deal.id} style={styles.dealCard}>
            <Text style={styles.dealTitle}>{deal.title}</Text>
            <View style={styles.dealMeta}>
              <Building2 size={14} color={theme.colors.text.secondary} />
              <Text style={styles.dealCompany}>{deal.company}</Text>
            </View>
            <View style={styles.dealAmountRow}>
              <Text style={styles.dealAmount}>${deal.amount.toLocaleString()}</Text>
              <View style={styles.stageBadge}>
                <Text style={styles.stageText}>{deal.stage}</Text>
              </View>
            </View>
            <View style={styles.probabilityBar}>
              <View style={[styles.probabilityFill, { width: `${deal.probability}%` }]} />
            </View>
            <Text style={styles.probabilityText}>{deal.probability}% de probabilidad</Text>
          </View>
        ))}
      </View>

      <Text style={[styles.sectionTitle, { marginTop: theme.spacing.xl }]}>Contactos Recientes</Text>
      <View style={styles.listContainer}>
        {crmContactsMock.map(contact => (
          <View key={contact.id} style={styles.listItem}>
            <View style={styles.contactLeft}>
              <View style={styles.avatarMini}>
                <User size={16} color={theme.colors.text.secondary} />
              </View>
              <View>
                <Text style={styles.contactName}>{contact.name}</Text>
                <Text style={styles.contactEmail}>{contact.email}</Text>
              </View>
            </View>
            <View style={styles.contactRight}>
              <Text style={styles.contactCompany}>{contact.company}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderCanvas = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Business Model Canvas</Text>
      <View style={styles.canvasContainer}>
        <View style={styles.canvasRow}>
          <View style={[styles.canvasBox, { flex: 1 }]}>
            <Text style={styles.canvasBoxTitle}>Socios Clave</Text>
            <Text style={styles.canvasBoxContent}>- Proveedores Cloud{'\n'}- Agencias partners</Text>
          </View>
          <View style={[styles.canvasColumn, { flex: 1 }]}>
            <View style={[styles.canvasBox, { flex: 1 }]}>
              <Text style={styles.canvasBoxTitle}>Actividades Clave</Text>
              <Text style={styles.canvasBoxContent}>- Desarrollo de plataforma{'\n'}- Marketing digital</Text>
            </View>
            <View style={[styles.canvasBox, { flex: 1 }]}>
              <Text style={styles.canvasBoxTitle}>Recursos Clave</Text>
              <Text style={styles.canvasBoxContent}>- Equipo de ingeniería{'\n'}- Marca</Text>
            </View>
          </View>
          <View style={[styles.canvasBox, { flex: 1, backgroundColor: theme.colors.primaryLight }]}>
            <Text style={[styles.canvasBoxTitle, { color: theme.colors.primary }]}>Propuesta de Valor</Text>
            <Text style={[styles.canvasBoxContent, { color: theme.colors.primary }]}>- Un workspace inteligente que centraliza el trabajo de tu equipo.</Text>
          </View>
          <View style={[styles.canvasColumn, { flex: 1 }]}>
            <View style={[styles.canvasBox, { flex: 1 }]}>
              <Text style={styles.canvasBoxTitle}>Relación Clientes</Text>
              <Text style={styles.canvasBoxContent}>- Soporte automatizado{'\n'}- Comunidad</Text>
            </View>
            <View style={[styles.canvasBox, { flex: 1 }]}>
              <Text style={styles.canvasBoxTitle}>Canales</Text>
              <Text style={styles.canvasBoxContent}>- Sitio web{'\n'}- Redes sociales</Text>
            </View>
          </View>
          <View style={[styles.canvasBox, { flex: 1 }]}>
            <Text style={styles.canvasBoxTitle}>Segmentos</Text>
            <Text style={styles.canvasBoxContent}>- Startups{'\n'}- Equipos remotos pequeños</Text>
          </View>
        </View>
        <View style={styles.canvasRow}>
          <View style={[styles.canvasBox, { flex: 1 }]}>
            <Text style={styles.canvasBoxTitle}>Estructura de Costes</Text>
            <Text style={styles.canvasBoxContent}>- Salarios del equipo{'\n'}- Infraestructura Cloud</Text>
          </View>
          <View style={[styles.canvasBox, { flex: 1 }]}>
            <Text style={styles.canvasBoxTitle}>Fuentes de Ingresos</Text>
            <Text style={styles.canvasBoxContent}>- Suscripción SaaS (MRR){'\n'}- Servicios Enterprise</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderContracts = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Contratos</Text>
      <View style={styles.listContainer}>
        {contractsMock.map(contract => (
          <View key={contract.id} style={styles.listItem}>
            <View style={styles.contactLeft}>
              <View style={styles.avatarMini}>
                <FileText size={16} color={theme.colors.text.secondary} />
              </View>
              <View>
                <Text style={styles.contactName}>{contract.name}</Text>
                <Text style={styles.contactEmail}>{contract.company} • Responsable: {contract.responsible}</Text>
              </View>
            </View>
            <View style={styles.contactRight}>
              <View style={[
                styles.stageBadge, 
                contract.status === 'active' ? { backgroundColor: theme.colors.successLight } : 
                contract.status === 'pending' ? { backgroundColor: theme.colors.warningLight } : 
                { backgroundColor: theme.colors.background }
              ]}>
                <Text style={[
                  styles.stageText,
                  contract.status === 'active' ? { color: theme.colors.success } : 
                  contract.status === 'pending' ? { color: theme.colors.warning } : 
                  { color: theme.colors.text.secondary }
                ]}>
                  {contract.status}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <AppShell title="Negocios">
      <View style={styles.container}>
        <View style={styles.tabsContainer}>
          <Pressable style={[styles.tab, activeTab === 'crm' && styles.activeTab]} onPress={() => setActiveTab('crm')}>
            <Text style={[styles.tabText, activeTab === 'crm' && styles.activeTabText]}>CRM</Text>
          </Pressable>
          <Pressable style={[styles.tab, activeTab === 'canvas' && styles.activeTab]} onPress={() => setActiveTab('canvas')}>
            <Text style={[styles.tabText, activeTab === 'canvas' && styles.activeTabText]}>Canvas</Text>
          </Pressable>
          <Pressable style={[styles.tab, activeTab === 'contracts' && styles.activeTab]} onPress={() => setActiveTab('contracts')}>
            <Text style={[styles.tabText, activeTab === 'contracts' && styles.activeTabText]}>Contratos</Text>
          </Pressable>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {activeTab === 'crm' && renderCRM()}
          {activeTab === 'canvas' && renderCanvas()}
          {activeTab === 'contracts' && renderContracts()}
        </ScrollView>
      </View>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    marginBottom: theme.spacing.xl,
  },
  tab: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: { borderBottomColor: theme.colors.primary },
  tabText: {
    fontSize: theme.typography.size.md,
    fontWeight: theme.typography.weight.medium,
    color: theme.colors.text.secondary,
  },
  activeTabText: {
    color: theme.colors.primary,
    fontWeight: theme.typography.weight.semibold,
  },
  tabContent: { paddingBottom: theme.spacing.xl },
  sectionTitle: {
    fontSize: theme.typography.size.lg,
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  dealsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  dealCard: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.lg,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    minWidth: 280,
    flex: 1,
    ...theme.shadows.sm,
  },
  dealTitle: {
    fontSize: theme.typography.size.md,
    fontWeight: theme.typography.weight.semibold,
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  dealMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: theme.spacing.md,
  },
  dealCompany: {
    fontSize: theme.typography.size.sm,
    color: theme.colors.text.secondary,
  },
  dealAmountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  dealAmount: {
    fontSize: theme.typography.size.xl,
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.text.primary,
  },
  stageBadge: {
    backgroundColor: theme.colors.background,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: theme.radius.sm,
  },
  stageText: {
    fontSize: 12,
    fontWeight: theme.typography.weight.medium,
    color: theme.colors.text.secondary,
    textTransform: 'capitalize',
  },
  probabilityBar: {
    height: 4,
    backgroundColor: theme.colors.background,
    borderRadius: 2,
    marginBottom: 4,
  },
  probabilityFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: 2,
  },
  probabilityText: {
    fontSize: 12,
    color: theme.colors.text.tertiary,
    textAlign: 'right',
  },
  listContainer: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.sm,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  },
  contactLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  avatarMini: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactName: {
    fontSize: theme.typography.size.sm,
    fontWeight: theme.typography.weight.semibold,
    color: theme.colors.text.primary,
  },
  contactEmail: {
    fontSize: 12,
    color: theme.colors.text.secondary,
  },
  contactRight: {},
  contactCompany: {
    fontSize: theme.typography.size.sm,
    color: theme.colors.text.primary,
  },
  canvasContainer: {
    gap: theme.spacing.md,
  },
  canvasRow: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    minHeight: 200,
  },
  canvasColumn: {
    gap: theme.spacing.md,
  },
  canvasBox: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
  },
  canvasBoxTitle: {
    fontSize: theme.typography.size.sm,
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  canvasBoxContent: {
    fontSize: theme.typography.size.sm,
    color: theme.colors.text.secondary,
    lineHeight: 20,
  }
});
