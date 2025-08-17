import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { 
  Users, 
  Trophy, 
  Target, 
  Heart, 
  MessageCircle, 
  Share2,
  Medal,
  Crown,
  Star,
  Flame
} from 'lucide-react-native';

export default function CommunityScreen() {
  const [activeTab, setActiveTab] = useState('feed');

  const tabs = [
    { key: 'feed', label: 'Feed', icon: Users },
    { key: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { key: 'challenges', label: 'Challenges', icon: Target },
  ];

  const feedPosts = [
    {
      id: 1,
      user: 'GreenGuru23',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      action: 'Used public transport for a week!',
      credits: 105,
      likes: 24,
      comments: 8,
      timeAgo: '2 hours ago',
      badge: 'Transport Hero'
    },
    {
      id: 2,
      user: 'EcoWarrior',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      action: 'Completed the Zero Waste challenge!',
      credits: 200,
      likes: 31,
      comments: 12,
      timeAgo: '4 hours ago',
      badge: 'Zero Waste Champion'
    },
    {
      id: 3,
      user: 'SolarSaver',
      avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      action: 'Installed solar panels at home',
      credits: 500,
      likes: 45,
      comments: 15,
      timeAgo: '1 day ago',
      badge: 'Energy Pioneer'
    },
  ];

  const leaderboard = [
    {
      rank: 1,
      user: 'EcoChampion',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      credits: 5247,
      badge: 'Planet Protector',
      streak: 45
    },
    {
      rank: 2,
      user: 'GreenGuru23',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      credits: 4891,
      badge: 'Transport Hero',
      streak: 32
    },
    {
      rank: 3,
      user: 'SolarSaver',
      avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      credits: 4523,
      badge: 'Energy Pioneer',
      streak: 28
    },
    {
      rank: 4,
      user: 'EcoWarrior',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      credits: 3967,
      badge: 'Zero Waste Champion',
      streak: 19
    },
    {
      rank: 5,
      user: 'You',
      avatar: 'https://images.pexels.com/photos/1115697/pexels-photo-1115697.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      credits: 1247,
      badge: 'Rising Star',
      streak: 12
    },
  ];

  const challenges = [
    {
      id: 1,
      title: 'Zero Waste Week',
      description: 'Produce no waste for 7 consecutive days',
      participants: 234,
      reward: 300,
      difficulty: 'Hard',
      timeLeft: '3 days',
      joined: false
    },
    {
      id: 2,
      title: 'Public Transport Month',
      description: 'Use only public transport for 30 days',
      participants: 567,
      reward: 500,
      difficulty: 'Medium',
      timeLeft: '12 days',
      joined: true
    },
    {
      id: 3,
      title: 'Plant a Tree',
      description: 'Plant and register a tree in your community',
      participants: 89,
      reward: 150,
      difficulty: 'Easy',
      timeLeft: '7 days',
      joined: false
    },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown size={24} color="#F59E0B" />;
      case 2: return <Medal size={24} color="#6B7280" />;
      case 3: return <Medal size={24} color="#CD7F32" />;
      default: return <Trophy size={24} color="#6B7280" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return '#00FF88';
      case 'Medium': return '#F59E0B';
      case 'Hard': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const renderFeed = () => (
    <View style={styles.feedContainer}>
      {feedPosts.map((post) => (
        <View key={post.id} style={styles.postCard}>
          <View style={styles.postHeader}>
            <Image source={{ uri: post.avatar }} style={styles.avatar} />
            <View style={styles.postUserInfo}>
              <View style={styles.userRow}>
                <Text style={styles.username}>{post.user}</Text>
                <View style={styles.badgeContainer}>
                  <Star size={12} color="#F59E0B" />
                  <Text style={styles.badgeText}>{post.badge}</Text>
                </View>
              </View>
              <Text style={styles.timeAgo}>{post.timeAgo}</Text>
            </View>
          </View>
          
          <Text style={styles.postAction}>{post.action}</Text>
          
          <View style={styles.postStats}>
            <View style={styles.creditsEarned}>
              <Text style={styles.creditsText}>+{post.credits} credits earned</Text>
            </View>
          </View>
          
          <View style={styles.postActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Heart size={20} color="#9CA3AF" />
              <Text style={styles.actionText}>{post.likes}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <MessageCircle size={20} color="#9CA3AF" />
              <Text style={styles.actionText}>{post.comments}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Share2 size={20} color="#9CA3AF" />
              <Text style={styles.actionText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );

  const renderLeaderboard = () => (
    <View style={styles.leaderboardContainer}>
      {leaderboard.map((user) => (
        <View key={user.rank} style={[styles.leaderboardItem, user.user === 'You' && styles.currentUser]}>
          <View style={styles.rankContainer}>
            {getRankIcon(user.rank)}
            <Text style={styles.rankNumber}>#{user.rank}</Text>
          </View>
          
          <Image source={{ uri: user.avatar }} style={styles.leaderboardAvatar} />
          
          <View style={styles.leaderboardUserInfo}>
            <Text style={[styles.leaderboardUsername, user.user === 'You' && styles.currentUserText]}>
              {user.user}
            </Text>
            <View style={styles.leaderboardBadge}>
              <Star size={12} color="#F59E0B" />
              <Text style={styles.leaderboardBadgeText}>{user.badge}</Text>
            </View>
          </View>
          
          <View style={styles.leaderboardStats}>
            <Text style={styles.creditsCount}>{user.credits.toLocaleString()}</Text>
            <View style={styles.streakContainer}>
              <Flame size={14} color="#F59E0B" />
              <Text style={styles.streakText}>{user.streak}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );

  const renderChallenges = () => (
    <View style={styles.challengesContainer}>
      {challenges.map((challenge) => (
        <View key={challenge.id} style={styles.challengeCard}>
          <View style={styles.challengeHeader}>
            <Text style={styles.challengeTitle}>{challenge.title}</Text>
            <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(challenge.difficulty) + '20' }]}>
              <Text style={[styles.difficultyText, { color: getDifficultyColor(challenge.difficulty) }]}>
                {challenge.difficulty}
              </Text>
            </View>
          </View>
          
          <Text style={styles.challengeDescription}>{challenge.description}</Text>
          
          <View style={styles.challengeStats}>
            <View style={styles.challengeStat}>
              <Users size={16} color="#9CA3AF" />
              <Text style={styles.challengeStatText}>{challenge.participants} joined</Text>
            </View>
            <View style={styles.challengeStat}>
              <Trophy size={16} color="#F59E0B" />
              <Text style={styles.challengeStatText}>{challenge.reward} credits</Text>
            </View>
            <View style={styles.challengeStat}>
              <Target size={16} color="#8B5CF6" />
              <Text style={styles.challengeStatText}>{challenge.timeLeft} left</Text>
            </View>
          </View>
          
          <TouchableOpacity 
            style={[styles.challengeButton, challenge.joined && styles.joinedButton]}
          >
            <Text style={[styles.challengeButtonText, challenge.joined && styles.joinedButtonText]}>
              {challenge.joined ? 'Joined' : 'Join Challenge'}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Community</Text>
        <Text style={styles.subtitle}>Connect with fellow eco-warriors</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tab, activeTab === tab.key && styles.activeTab]}
              onPress={() => setActiveTab(tab.key)}
            >
              <IconComponent size={20} color={activeTab === tab.key ? '#FFFFFF' : '#9CA3AF'} />
              <Text style={[styles.tabText, activeTab === tab.key && styles.activeTabText]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {activeTab === 'feed' && renderFeed()}
        {activeTab === 'leaderboard' && renderLeaderboard()}
        {activeTab === 'challenges' && renderChallenges()}
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
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1F2937',
    paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#374151',
  },
  activeTab: {
    backgroundColor: '#00FF88',
    borderColor: '#00FF88',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9CA3AF',
    marginLeft: 6,
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  feedContainer: {
    paddingBottom: 32,
  },
  postCard: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  postUserInfo: {
    flex: 1,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginRight: 8,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F59E0B20',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 10,
    color: '#F59E0B',
    fontWeight: '600',
    marginLeft: 2,
  },
  timeAgo: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  postAction: {
    fontSize: 16,
    color: '#D1D5DB',
    marginBottom: 12,
  },
  postStats: {
    marginBottom: 12,
  },
  creditsEarned: {
    backgroundColor: '#00FF8820',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  creditsText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#00FF88',
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#374151',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  actionText: {
    fontSize: 14,
    color: '#9CA3AF',
    marginLeft: 6,
  },
  leaderboardContainer: {
    paddingBottom: 32,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  currentUser: {
    borderColor: '#00FF88',
    backgroundColor: '#00FF8810',
  },
  rankContainer: {
    alignItems: 'center',
    marginRight: 12,
    minWidth: 50,
  },
  rankNumber: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  leaderboardAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  leaderboardUserInfo: {
    flex: 1,
  },
  leaderboardUsername: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  currentUserText: {
    color: '#00FF88',
  },
  leaderboardBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leaderboardBadgeText: {
    fontSize: 12,
    color: '#F59E0B',
    fontWeight: '600',
    marginLeft: 4,
  },
  leaderboardStats: {
    alignItems: 'flex-end',
  },
  creditsCount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakText: {
    fontSize: 12,
    color: '#F59E0B',
    fontWeight: '600',
    marginLeft: 4,
  },
  challengesContainer: {
    paddingBottom: 32,
  },
  challengeCard: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  challengeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  challengeTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
  },
  challengeDescription: {
    fontSize: 14,
    color: '#D1D5DB',
    marginBottom: 16,
    lineHeight: 20,
  },
  challengeStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  challengeStat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
  },
  challengeStatText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginLeft: 6,
  },
  challengeButton: {
    backgroundColor: '#00FF88',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  joinedButton: {
    backgroundColor: '#374151',
  },
  challengeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  joinedButtonText: {
    color: '#9CA3AF',
  },
});