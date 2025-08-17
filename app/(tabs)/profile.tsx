import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { User, Settings, History, Award, Coins, Bell, Shield, CircleHelp as HelpCircle, LogOut, ChevronRight, CreditCard as Edit3, Star, Calendar, TrendingUp } from 'lucide-react-native';
import { useLanguage } from '@/hooks/useLanguage';
import { LanguageSelector } from '@/components/LanguageSelector';

export default function ProfileScreen() {
  const { t } = useLanguage();
  const [selectedTab, setSelectedTab] = useState('overview');

  const userStats = {
    totalCredits: 1247,
    co2Saved: 145.7,
    actionsLogged: 234,
    daysActive: 67,
    currentStreak: 12,
    totalBadges: 8
  };

  const recentActivities = [
    { id: 1, action: 'Used public transport', credits: 15, date: '2 hours ago' },
    { id: 2, action: 'Recycled plastic bottles', credits: 25, date: 'Yesterday' },
    { id: 3, action: 'Bought local produce', credits: 18, date: '2 days ago' },
    { id: 4, action: 'Used reusable bag', credits: 5, date: '3 days ago' },
    { id: 5, action: 'Switched to LED bulbs', credits: 25, date: '1 week ago' },
  ];

  const badges = [
    { id: 1, name: 'First Steps', icon: '🌱', earned: true, date: '2 months ago' },
    { id: 2, name: 'Week Warrior', icon: '📅', earned: true, date: '1 month ago' },
    { id: 3, name: 'Transport Hero', icon: '🚌', earned: true, date: '3 weeks ago' },
    { id: 4, name: 'Energy Saver', icon: '⚡', earned: true, date: '2 weeks ago' },
    { id: 5, name: 'Recycling Pro', icon: '♻️', earned: true, date: '1 week ago' },
    { id: 6, name: 'Green Shopper', icon: '🛍️', earned: true, date: '5 days ago' },
    { id: 7, name: 'Eco Warrior', icon: '⚔️', earned: true, date: '3 days ago' },
    { id: 8, name: 'Planet Protector', icon: '🛡️', earned: true, date: 'Today' },
    { id: 9, name: 'Carbon Neutral', icon: '🌍', earned: false, date: null },
    { id: 10, name: 'Sustainability Master', icon: '👑', earned: false, date: null },
  ];

  const settingsOptions = [
    { id: 1, title: t('notifications'), icon: Bell, hasToggle: true },
    { id: 2, title: t('privacySecurity'), icon: Shield, hasToggle: false },
    { id: 3, title: t('helpSupport'), icon: HelpCircle, hasToggle: false },
    { id: 4, title: t('about'), icon: Settings, hasToggle: false },
    { id: 5, title: t('signOut'), icon: LogOut, hasToggle: false, isDestructive: true },
  ];

  const renderOverview = () => (
    <View style={styles.overviewContainer}>
      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Coins size={24} color="#8B5CF6" />
          <Text style={styles.statValue}>{userStats.totalCredits.toLocaleString()}</Text>
          <Text style={styles.statLabel}>{t('totalCredits')}</Text>
        </View>
        <View style={styles.statCard}>
          <TrendingUp size={24} color="#00FF88" />
          <Text style={styles.statValue}>{userStats.co2Saved}kg</Text>
          <Text style={styles.statLabel}>{t('co2Saved')}</Text>
        </View>
        <View style={styles.statCard}>
          <Award size={24} color="#F59E0B" />
          <Text style={styles.statValue}>{userStats.totalBadges}</Text>
          <Text style={styles.statLabel}>{t('badgesEarned')}</Text>
        </View>
        <View style={styles.statCard}>
          <Calendar size={24} color="#EF4444" />
          <Text style={styles.statValue}>{userStats.currentStreak}</Text>
          <Text style={styles.statLabel}>{t('dayStreak')}</Text>
        </View>
      </View>

      {/* Achievement Progress */}
      <View style={styles.progressCard}>
        <Text style={styles.progressTitle}>{t('achievementProgress')}</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '80%' }]} />
        </View>
        <Text style={styles.progressText}>8 {t('of')} 10 {t('badgesEarnedProgress')}</Text>
      </View>

      {/* Recent Activity */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t('recentActivity')}</Text>
          <TouchableOpacity>
            <ChevronRight size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>
        {recentActivities.slice(0, 3).map((activity) => (
          <View key={activity.id} style={styles.activityItem}>
            <View style={styles.activityContent}>
              <Text style={styles.activityAction}>{activity.action}</Text>
              <Text style={styles.activityDate}>{activity.date}</Text>
            </View>
            <Text style={styles.activityCredits}>+{activity.credits}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderHistory = () => (
    <View style={styles.historyContainer}>
      <Text style={styles.sectionTitle}>Action History</Text>
      {recentActivities.map((activity) => (
        <View key={activity.id} style={styles.historyItem}>
          <View style={styles.historyContent}>
            <Text style={styles.historyAction}>{activity.action}</Text>
            <Text style={styles.historyDate}>{activity.date}</Text>
          </View>
          <Text style={styles.historyCredits}>+{activity.credits}</Text>
        </View>
      ))}
    </View>
  );

  const renderBadges = () => (
    <View style={styles.badgesContainer}>
      <Text style={styles.sectionTitle}>Badges & Achievements</Text>
      <View style={styles.badgesGrid}>
        {badges.map((badge) => (
          <View 
            key={badge.id} 
            style={[styles.badgeCard, !badge.earned && styles.lockedBadge]}
          >
            <Text style={styles.badgeIcon}>{badge.icon}</Text>
            <Text style={[styles.badgeName, !badge.earned && styles.lockedBadgeName]}>
              {badge.name}
            </Text>
            {badge.earned && (
              <Text style={styles.badgeDate}>{badge.date}</Text>
            )}
            {!badge.earned && (
              <Text style={styles.lockedText}>Locked</Text>
            )}
          </View>
        ))}
      </View>
    </View>
  );

  const renderSettings = () => (
    <View style={styles.settingsContainer}>
      <Text style={styles.sectionTitle}>{t('settings')}</Text>
      
      {/* Language Selector */}
      <LanguageSelector style={styles.languageSelector} />
      
      {settingsOptions.map((option) => {
        const IconComponent = option.icon;
        return (
          <TouchableOpacity key={option.id} style={styles.settingItem}>
            <View style={styles.settingContent}>
              <IconComponent 
                size={20} 
                color={option.isDestructive ? '#EF4444' : '#9CA3AF'} 
              />
              <Text style={[
                styles.settingTitle,
                option.isDestructive && styles.destructiveText
              ]}>
                {option.title}
              </Text>
            </View>
            <ChevronRight 
              size={20} 
              color={option.isDestructive ? '#EF4444' : '#6B7280'} 
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.profileInfo}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/1115697/pexels-photo-1115697.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' }}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editButton}>
            <Edit3 size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <Text style={styles.profileName}>{t('ecoWarrior')}</Text>
        <Text style={styles.profileEmail}>ecowarrior@greencredit.app</Text>
        <View style={styles.profileBadge}>
          <Star size={16} color="#F59E0B" />
          <Text style={styles.profileBadgeText}>{t('risingStar')}</Text>
        </View>
      </View>

      {/* Navigation Tabs */}
      <View style={styles.navTabs}>
        {[
          { key: 'overview', label: t('overview') },
          { key: 'history', label: t('history') },
          { key: 'badges', label: t('badges') },
          { key: 'settings', label: t('settings') },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.navTab, selectedTab === tab.key && styles.activeNavTab]}
            onPress={() => setSelectedTab(tab.key)}
          >
            <Text style={[styles.navTabText, selectedTab === tab.key && styles.activeNavTabText]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {selectedTab === 'overview' && renderOverview()}
        {selectedTab === 'history' && renderHistory()}
        {selectedTab === 'badges' && renderBadges()}
        {selectedTab === 'settings' && renderSettings()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  profileHeader: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  profileInfo: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#00FF88',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#00FF88',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 12,
  },
  profileBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F59E0B20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  profileBadgeText: {
    fontSize: 12,
    color: '#F59E0B',
    fontWeight: '600',
    marginLeft: 4,
  },
  navTabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  navTab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#1F2937',
    marginHorizontal: 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#374151',
  },
  activeNavTab: {
    backgroundColor: '#00FF88',
    borderColor: '#00FF88',
  },
  navTabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  activeNavTabText: {
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  overviewContainer: {
    paddingBottom: 32,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: '#1F2937',
    width: '48%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  progressCard: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#374151',
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#374151',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00FF88',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#9CA3AF',
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#374151',
  },
  activityContent: {
    flex: 1,
  },
  activityAction: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  activityDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  activityCredits: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#00FF88',
  },
  historyContainer: {
    paddingBottom: 32,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#374151',
  },
  historyContent: {
    flex: 1,
  },
  historyAction: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  historyDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  historyCredits: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#00FF88',
  },
  badgesContainer: {
    paddingBottom: 32,
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  badgeCard: {
    backgroundColor: '#1F2937',
    width: '48%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  lockedBadge: {
    opacity: 0.5,
  },
  badgeIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  badgeName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  lockedBadgeName: {
    color: '#9CA3AF',
  },
  badgeDate: {
    fontSize: 10,
    color: '#00FF88',
  },
  lockedText: {
    fontSize: 10,
    color: '#6B7280',
  },
  settingsContainer: {
    paddingBottom: 32,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#374151',
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 12,
  },
  destructiveText: {
    color: '#EF4444',
  },
  languageSelector: {
    marginBottom: 20,
  },
});