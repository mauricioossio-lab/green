import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Gift, Star, ShoppingBag, Heart, Leaf, Coins } from 'lucide-react-native';

export default function RewardsScreen() {
  const [activeTab, setActiveTab] = useState('products');
  const userCredits = 1247;

  const rewardCategories = ['products', 'discounts', 'experiences', 'donations'];
  
  const rewards = {
    products: [
      {
        id: 1,
        title: 'Bamboo Water Bottle',
        description: 'Sustainable 500ml bamboo water bottle',
        credits: 150,
        image: 'https://images.pexels.com/photos/1000084/pexels-photo-1000084.jpeg?auto=compress&cs=tinysrgb&w=400',
        rating: 4.8,
        inStock: true
      },
      {
        id: 2,
        title: 'Solar Phone Charger',
        description: 'Portable solar-powered phone charger',
        credits: 300,
        image: 'https://images.pexels.com/photos/159045/the-interior-of-the-repair-interior-laptop-keyboard-159045.jpeg?auto=compress&cs=tinysrgb&w=400',
        rating: 4.6,
        inStock: true
      },
      {
        id: 3,
        title: 'Organic Cotton Tote Bag',
        description: 'Reusable organic cotton shopping bag',
        credits: 80,
        image: 'https://images.pexels.com/photos/1148399/pexels-photo-1148399.jpeg?auto=compress&cs=tinysrgb&w=400',
        rating: 4.9,
        inStock: false
      },
    ],
    discounts: [
      {
        id: 4,
        title: '20% Off Whole Foods',
        description: 'Discount on organic produce',
        credits: 100,
        image: 'https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&w=400',
        expiresIn: '30 days'
      },
      {
        id: 5,
        title: 'Free Coffee at Green Café',
        description: 'One free organic fair-trade coffee',
        credits: 50,
        image: 'https://images.pexels.com/photos/302896/pexels-photo-302896.jpeg?auto=compress&cs=tinysrgb&w=400',
        expiresIn: '7 days'
      },
    ],
    experiences: [
      {
        id: 6,
        title: 'Nature Photography Workshop',
        description: 'Learn eco-friendly photography techniques',
        credits: 500,
        image: 'https://images.pexels.com/photos/1230302/pexels-photo-1230302.jpeg?auto=compress&cs=tinysrgb&w=400',
        duration: '4 hours'
      },
      {
        id: 7,
        title: 'Organic Farm Visit',
        description: 'Tour of local sustainable farm',
        credits: 200,
        image: 'https://images.pexels.com/photos/169523/pexels-photo-169523.jpeg?auto=compress&cs=tinysrgb&w=400',
        duration: '2 hours'
      },
    ],
    donations: [
      {
        id: 8,
        title: 'Plant 10 Trees',
        description: 'Support reforestation efforts',
        credits: 200,
        image: 'https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&w=400',
        impact: '10 trees planted'
      },
      {
        id: 9,
        title: 'Ocean Cleanup',
        description: 'Remove 5kg of plastic from oceans',
        credits: 300,
        image: 'https://images.pexels.com/photos/683535/pexels-photo-683535.jpeg?auto=compress&cs=tinysrgb&w=400',
        impact: '5kg plastic removed'
      },
    ],
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'products': return <ShoppingBag size={20} color="#00FF88" />;
      case 'discounts': return <Gift size={20} color="#8B5CF6" />;
      case 'experiences': return <Star size={20} color="#F59E0B" />;
      case 'donations': return <Heart size={20} color="#EF4444" />;
      default: return <Gift size={20} color="#00FF88" />;
    }
  };

  const renderRewardCard = (reward: any, category: string) => {
    const canAfford = userCredits >= reward.credits;
    
    return (
      <View key={reward.id} style={styles.rewardCard}>
        <Image source={{ uri: reward.image }} style={styles.rewardImage} />
        <View style={styles.rewardContent}>
          <View style={styles.rewardHeader}>
            <Text style={styles.rewardTitle} numberOfLines={2}>{reward.title}</Text>
            {category === 'products' && reward.rating && (
              <View style={styles.rating}>
                <Star size={12} color="#F59E0B" />
                <Text style={styles.ratingText}>{reward.rating}</Text>
              </View>
            )}
          </View>
          <Text style={styles.rewardDescription} numberOfLines={2}>{reward.description}</Text>
          
          {category === 'products' && (
            <Text style={[styles.stockText, reward.inStock ? styles.inStock : styles.outOfStock]}>
              {reward.inStock ? 'In Stock' : 'Out of Stock'}
            </Text>
          )}
          
          {category === 'discounts' && (
            <Text style={styles.expiryText}>Expires in {reward.expiresIn}</Text>
          )}
          
          {category === 'experiences' && (
            <Text style={styles.durationText}>Duration: {reward.duration}</Text>
          )}
          
          {category === 'donations' && (
            <Text style={styles.impactText}>Impact: {reward.impact}</Text>
          )}
          
          <View style={styles.rewardFooter}>
            <View style={styles.priceContainer}>
              <Coins size={16} color="#8B5CF6" />
              <Text style={styles.priceText}>{reward.credits}</Text>
            </View>
            <TouchableOpacity 
              style={[styles.redeemButton, !canAfford && styles.disabledButton]}
              disabled={!canAfford}
            >
              <Text style={[styles.redeemText, !canAfford && styles.disabledText]}>
                {canAfford ? 'Redeem' : 'Insufficient'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>EcoCanje</Text>
        <View style={styles.creditsDisplay}>
          <Coins size={24} color="#8B5CF6" />
          <Text style={styles.creditsAmount}>{userCredits}</Text>
        </View>
      </View>

      {/* Category Tabs */}
      <View style={styles.tabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {rewardCategories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[styles.tab, activeTab === category && styles.activeTab]}
              onPress={() => setActiveTab(category)}
            >
              {getCategoryIcon(category)}
              <Text style={[styles.tabText, activeTab === category && styles.activeTabText]}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Rewards List */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.rewardsGrid}>
          {rewards[activeTab as keyof typeof rewards]?.map((reward) => 
            renderRewardCard(reward, activeTab)
          )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  creditsDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#374151',
  },
  creditsAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  tabsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 12,
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
  rewardsGrid: {
    paddingBottom: 100,
  },
  rewardCard: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#374151',
    overflow: 'hidden',
  },
  rewardImage: {
    width: '100%',
    height: 160,
    backgroundColor: '#374151',
  },
  rewardContent: {
    padding: 16,
  },
  rewardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  rewardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
    marginRight: 12,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#F59E0B',
    marginLeft: 4,
    fontWeight: '600',
  },
  rewardDescription: {
    fontSize: 14,
    color: '#D1D5DB',
    marginBottom: 12,
    lineHeight: 18,
  },
  stockText: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 12,
  },
  inStock: {
    color: '#00FF88',
  },
  outOfStock: {
    color: '#EF4444',
  },
  expiryText: {
    fontSize: 12,
    color: '#F59E0B',
    fontWeight: '600',
    marginBottom: 12,
  },
  durationText: {
    fontSize: 12,
    color: '#8B5CF6',
    fontWeight: '600',
    marginBottom: 12,
  },
  impactText: {
    fontSize: 12,
    color: '#00FF88',
    fontWeight: '600',
    marginBottom: 12,
  },
  rewardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 6,
  },
  redeemButton: {
    backgroundColor: '#00FF88',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: '#374151',
  },
  redeemText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  disabledText: {
    color: '#9CA3AF',
  },
});