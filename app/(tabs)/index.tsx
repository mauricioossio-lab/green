import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Leaf, Coins, Zap, Lightbulb, Plus, ChevronRight } from 'lucide-react-native';
import { useLanguage } from '@/hooks/useLanguage';

export default function HomeScreen() {
  const { t } = useLanguage();

  const impactStats = {
    co2Saved: 45.7,
    creditsEarned: 1247,
    streakDays: 12
  };

  const dailyTip = t('language') === 'es' 
    ? "Cambia a bombillas LED para reducir el consumo de energía hasta un 80% comparado con las bombillas incandescentes tradicionales."
    : "Switch to LED bulbs to reduce energy consumption by up to 80% compared to traditional incandescent bulbs.";

  const quickActions = [
    { id: 1, title: t('usedPublicTransportAction'), icon: 'bus', credits: 15 },
    { id: 2, title: t('recycledPlastic'), icon: 'recycle', credits: 10 },
    { id: 3, title: t('energySaving'), icon: 'zap', credits: 12 },
    { id: 4, title: t('boughtEcoProduct'), icon: 'leaf', credits: 20 }
  ];

  const getActionIcon = (iconName: string) => {
    switch (iconName) {
      case 'leaf': return <Leaf size={24} color="#00FF88" />;
      case 'zap': return <Zap size={24} color="#00FF88" />;
      default: return <Leaf size={24} color="#00FF88" />;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{t('goodMorning')}</Text>
            <Text style={styles.username}>{t('ecoWarrior')}</Text>
          </View>
          <View style={styles.creditsContainer}>
            <Coins size={24} color="#8B5CF6" />
            <Text style={styles.creditsText}>{impactStats.creditsEarned}</Text>
          </View>
        </View>

        {/* Impact Overview */}
        <View style={styles.impactCard}>
          <Text style={styles.sectionTitle}>{t('yourImpactToday')}</Text>
          <View style={styles.impactGrid}>
            <View style={styles.impactItem}>
              <Leaf size={32} color="#00FF88" />
              <Text style={styles.impactValue}>{impactStats.co2Saved}kg</Text>
              <Text style={styles.impactLabel}>{t('co2Saved')}</Text>
            </View>
            <View style={styles.impactItem}>
              <Zap size={32} color="#8B5CF6" />
              <Text style={styles.impactValue}>{impactStats.streakDays}</Text>
              <Text style={styles.impactLabel}>{t('dayStreak')}</Text>
            </View>
            <View style={styles.impactItem}>
              <Coins size={32} color="#F59E0B" />
              <Text style={styles.impactValue}>+127</Text>
              <Text style={styles.impactLabel}>{t('creditsToday')}</Text>
            </View>
          </View>
        </View>

        {/* Daily Eco Tip */}
        <View style={styles.tipCard}>
          <View style={styles.tipHeader}>
            <Lightbulb size={24} color="#F59E0B" />
            <Text style={styles.tipTitle}>{t('ecoTipOfTheDay')}</Text>
          </View>
          <Text style={styles.tipText}>{dailyTip}</Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('logQuickAction')}</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity key={action.id} style={styles.actionButton}>
                {getActionIcon(action.icon)}
                <Text style={styles.actionTitle}>{action.title}</Text>
                <View style={styles.actionCredits}>
                  <Text style={styles.actionCreditsText}>+{action.credits}</Text>
                  <Coins size={16} color="#8B5CF6" />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t('recentActivity')}</Text>
            <TouchableOpacity>
              <ChevronRight size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
          <View style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <Leaf size={20} color="#00FF88" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>{t('usedPublicTransport')}</Text>
              <Text style={styles.activityTime}>2 {t('hoursAgo')}</Text>
            </View>
            <Text style={styles.activityCredits}>+15</Text>
          </View>
          <View style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <Zap size={20} color="#8B5CF6" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>{t('recycledPlasticBottles')}</Text>
              <Text style={styles.activityTime}>{t('yesterday')}</Text>
            </View>
            <Text style={styles.activityCredits}>+25</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 30,
  },
  greeting: {
    fontSize: 16,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  creditsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#374151',
  },
  creditsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  impactCard: {
    backgroundColor: '#1F2937',
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#374151',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  impactGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  impactItem: {
    alignItems: 'center',
    flex: 1,
  },
  impactValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 8,
    marginBottom: 4,
  },
  impactLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  tipCard: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#374151',
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#D1D5DB',
    lineHeight: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: '#1F2937',
    width: '48%',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 8,
    marginBottom: 8,
    textAlign: 'center',
  },
  actionCredits: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionCreditsText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8B5CF6',
    marginRight: 4,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#374151',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  activityCredits: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#00FF88',
  },
});