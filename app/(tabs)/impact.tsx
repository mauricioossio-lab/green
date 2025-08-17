import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { 
  Leaf, 
  Zap, 
  Droplets, 
  Recycle, 
  TrendingUp, 
  Calendar,
  Target,
  Award
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function ImpactScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const periods = [
    { key: 'week', label: 'This Week' },
    { key: 'month', label: 'This Month' },
    { key: 'year', label: 'This Year' },
    { key: 'all', label: 'All Time' },
  ];

  const impactData = {
    week: {
      co2Saved: 12.3,
      energySaved: 45.2,
      waterSaved: 128,
      wasteRecycled: 8.7,
      actionsLogged: 15,
    },
    month: {
      co2Saved: 67.8,
      energySaved: 234.5,
      waterSaved: 567,
      wasteRecycled: 42.1,
      actionsLogged: 89,
    },
    year: {
      co2Saved: 523.4,
      energySaved: 1834.2,
      waterSaved: 4231,
      wasteRecycled: 298.7,
      actionsLogged: 456,
    },
    all: {
      co2Saved: 1245.7,
      energySaved: 4567.8,
      waterSaved: 9876,
      wasteRecycled: 567.3,
      actionsLogged: 1234,
    },
  };

  const currentData = impactData[selectedPeriod as keyof typeof impactData];

  const achievements = [
    { id: 1, title: 'First Steps', description: 'Logged your first eco action', earned: true, icon: Leaf },
    { id: 2, title: 'Week Warrior', description: 'Logged actions for 7 consecutive days', earned: true, icon: Calendar },
    { id: 3, title: 'Carbon Saver', description: 'Saved 100kg of CO₂', earned: false, icon: Target },
    { id: 4, title: 'Energy Hero', description: 'Saved 500kWh of energy', earned: false, icon: Zap },
  ];

  const monthlyProgress = [
    { month: 'Jan', co2: 45, energy: 234, water: 456 },
    { month: 'Feb', co2: 52, energy: 267, water: 523 },
    { month: 'Mar', co2: 48, energy: 198, water: 434 },
    { month: 'Apr', co2: 67, energy: 334, water: 567 },
    { month: 'May', co2: 73, energy: 389, water: 612 },
    { month: 'Jun', co2: 81, energy: 445, water: 678 },
  ];

  const impactMetrics = [
    {
      icon: Leaf,
      title: 'CO₂ Saved',
      value: currentData.co2Saved,
      unit: 'kg',
      color: '#00FF88',
      comparison: '+15% from last period',
    },
    {
      icon: Zap,
      title: 'Energy Saved',
      value: currentData.energySaved,
      unit: 'kWh',
      color: '#F59E0B',
      comparison: '+8% from last period',
    },
    {
      icon: Droplets,
      title: 'Water Saved',
      value: currentData.waterSaved,
      unit: 'L',
      color: '#3B82F6',
      comparison: '+22% from last period',
    },
    {
      icon: Recycle,
      title: 'Waste Recycled',
      value: currentData.wasteRecycled,
      unit: 'kg',
      color: '#8B5CF6',
      comparison: '+12% from last period',
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Impact Tracker</Text>
        <Text style={styles.subtitle}>Your environmental contribution</Text>
      </View>

      {/* Period Selector */}
      <View style={styles.periodSelector}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {periods.map((period) => (
            <TouchableOpacity
              key={period.key}
              style={[styles.periodButton, selectedPeriod === period.key && styles.activePeriod]}
              onPress={() => setSelectedPeriod(period.key)}
            >
              <Text style={[styles.periodText, selectedPeriod === period.key && styles.activePeriodText]}>
                {period.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <TrendingUp size={24} color="#00FF88" />
            <Text style={styles.summaryTitle}>Environmental Impact</Text>
          </View>
          <Text style={styles.actionsCount}>{currentData.actionsLogged} eco actions logged</Text>
        </View>

        {/* Impact Metrics Grid */}
        <View style={styles.metricsGrid}>
          {impactMetrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <View key={index} style={styles.metricCard}>
                <View style={[styles.metricIcon, { backgroundColor: metric.color + '20' }]}>
                  <IconComponent size={28} color={metric.color} />
                </View>
                <Text style={styles.metricTitle}>{metric.title}</Text>
                <Text style={styles.metricValue}>
                  {metric.value}
                  <Text style={styles.metricUnit}> {metric.unit}</Text>
                </Text>
                <Text style={styles.metricComparison}>{metric.comparison}</Text>
              </View>
            );
          })}
        </View>

        {/* Monthly Progress Chart */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Monthly CO₂ Savings</Text>
          <View style={styles.chart}>
            {monthlyProgress.map((data, index) => {
              const height = (data.co2 / 90) * 100; // Normalize to 100px max height
              return (
                <View key={index} style={styles.chartColumn}>
                  <View style={[styles.chartBar, { height, backgroundColor: '#00FF88' }]} />
                  <Text style={styles.chartLabel}>{data.month}</Text>
                  <Text style={styles.chartValue}>{data.co2}kg</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.achievementsSection}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementsList}>
            {achievements.map((achievement) => {
              const IconComponent = achievement.icon;
              return (
                <View key={achievement.id} style={styles.achievementItem}>
                  <View style={[
                    styles.achievementIcon, 
                    achievement.earned ? styles.earnedIcon : styles.lockedIcon
                  ]}>
                    <IconComponent 
                      size={20} 
                      color={achievement.earned ? '#00FF88' : '#6B7280'} 
                    />
                  </View>
                  <View style={styles.achievementContent}>
                    <Text style={[
                      styles.achievementTitle,
                      achievement.earned ? styles.earnedTitle : styles.lockedTitle
                    ]}>
                      {achievement.title}
                    </Text>
                    <Text style={styles.achievementDescription}>
                      {achievement.description}
                    </Text>
                  </View>
                  {achievement.earned && (
                    <Award size={20} color="#F59E0B" />
                  )}
                </View>
              );
            })}
          </View>
        </View>

        {/* Environmental Equivalents */}
        <View style={styles.equivalentsSection}>
          <Text style={styles.sectionTitle}>Environmental Equivalents</Text>
          <View style={styles.equivalentCard}>
            <Text style={styles.equivalentText}>
              Your CO₂ savings are equivalent to:
            </Text>
            <View style={styles.equivalentItem}>
              <Text style={styles.equivalentValue}>🌳 {Math.round(currentData.co2Saved / 22)} trees planted</Text>
            </View>
            <View style={styles.equivalentItem}>
              <Text style={styles.equivalentValue}>🚗 {Math.round(currentData.co2Saved * 2.3)} km not driven</Text>
            </View>
            <View style={styles.equivalentItem}>
              <Text style={styles.equivalentValue}>🏠 {Math.round(currentData.energySaved / 30)} days of home energy</Text>
            </View>
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
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  periodSelector: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  periodButton: {
    backgroundColor: '#1F2937',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  activePeriod: {
    backgroundColor: '#00FF88',
    borderColor: '#00FF88',
  },
  periodText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  activePeriodText: {
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  summaryCard: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#374151',
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 12,
  },
  actionsCount: {
    fontSize: 16,
    color: '#D1D5DB',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  metricCard: {
    backgroundColor: '#1F2937',
    width: '48%',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  metricIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#D1D5DB',
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  metricUnit: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#9CA3AF',
  },
  metricComparison: {
    fontSize: 12,
    color: '#00FF88',
  },
  chartContainer: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#374151',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
  },
  chartColumn: {
    alignItems: 'center',
    flex: 1,
  },
  chartBar: {
    width: 20,
    backgroundColor: '#00FF88',
    borderRadius: 10,
    marginBottom: 8,
  },
  chartLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 2,
  },
  chartValue: {
    fontSize: 10,
    color: '#D1D5DB',
    fontWeight: '600',
  },
  achievementsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  achievementsList: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  earnedIcon: {
    backgroundColor: '#00FF8820',
  },
  lockedIcon: {
    backgroundColor: '#374151',
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  earnedTitle: {
    color: '#FFFFFF',
  },
  lockedTitle: {
    color: '#9CA3AF',
  },
  achievementDescription: {
    fontSize: 14,
    color: '#D1D5DB',
  },
  equivalentsSection: {
    marginBottom: 32,
  },
  equivalentCard: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#374151',
  },
  equivalentText: {
    fontSize: 16,
    color: '#D1D5DB',
    marginBottom: 16,
  },
  equivalentItem: {
    marginBottom: 8,
  },
  equivalentValue: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});