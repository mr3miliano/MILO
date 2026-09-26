import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../../theme';
import { Document } from '../../../mocks/documents';
import { FileText, FileSpreadsheet, FileIcon, Presentation } from 'lucide-react-native';

interface DocumentsViewProps {
  documents: Document[];
}

export const DocumentsView = ({ documents }: DocumentsViewProps) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileIcon size={24} color="#EF4444" />;
      case 'doc': return <FileText size={24} color="#3B82F6" />;
      case 'sheet': return <FileSpreadsheet size={24} color="#10B981" />;
      case 'slide': return <Presentation size={24} color="#F59E0B" />;
      default: return <FileText size={24} color={theme.colors.text.secondary} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'final': return theme.colors.success;
      case 'draft': return theme.colors.warning;
      case 'archived': return theme.colors.text.tertiary;
      default: return theme.colors.text.secondary;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'final': return 'Final';
      case 'draft': return 'Borrador';
      case 'archived': return 'Archivado';
      default: return status;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Archivos Recientes</Text>
      </View>
      <View style={styles.list}>
        {documents.map(doc => (
          <View key={doc.id} style={styles.docItem}>
            <View style={styles.docLeft}>
              <View style={styles.iconContainer}>
                {getIcon(doc.type)}
              </View>
              <View style={styles.docInfo}>
                <Text style={styles.docName}>{doc.name}</Text>
                <View style={styles.docMeta}>
                  <Text style={styles.docMetaText}>{doc.author}</Text>
                  <Text style={styles.docMetaText}>•</Text>
                  <Text style={styles.docMetaText}>{doc.date}</Text>
                </View>
              </View>
            </View>
            
            <View style={styles.docRight}>
              <View style={[styles.statusBadge, { borderColor: getStatusColor(doc.status) }]}>
                <View style={[styles.statusDot, { backgroundColor: getStatusColor(doc.status) }]} />
                <Text style={[styles.statusText, { color: getStatusColor(doc.status) }]}>
                  {getStatusText(doc.status)}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.sm,
  },
  header: {
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  },
  headerTitle: {
    fontSize: theme.typography.size.md,
    fontWeight: theme.typography.weight.semibold,
    color: theme.colors.text.primary,
  },
  list: {
    flexDirection: 'column',
  },
  docItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  },
  docLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  docInfo: {
    gap: 4,
  },
  docName: {
    fontSize: theme.typography.size.md,
    fontWeight: theme.typography.weight.medium,
    color: theme.colors.text.primary,
  },
  docMeta: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  docMetaText: {
    fontSize: theme.typography.size.sm,
    color: theme.colors.text.secondary,
  },
  docRight: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.radius.full,
    borderWidth: 1,
    gap: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 12,
    fontWeight: theme.typography.weight.medium,
  }
});
