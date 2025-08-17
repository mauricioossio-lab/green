import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { 
  Car, 
  Recycle, 
  Zap, 
  ShoppingBag, 
  Droplets, 
  TreePine, 
  Plus,
  Check
} from 'lucide-react-native';

export default function LogScreen() {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [notes, setNotes] = useState('');

  const actionCategories = [
    {
      title: 'Transportation',
      actions: [
        { id: 'public-transport', title: 'Used Public Transport', credits: 15, icon: Car, color: '#00FF88' },
        { id: 'bike', title: 'Biked Instead of Driving', credits: 20, icon: Car, color: '#00FF88' },
        { id: 'walk', title: 'Walked Instead of Driving', credits: 12, icon: Car, color: '#00FF88' },
      ]
    },
    {
      title: 'Recycling & Waste',
      actions: [
        { id: 'recycle-plastic', title: 'Recycled Plastic', credits: 10, icon: Recycle, color: '#8B5CF6' },
        { id: 'recycle-paper', title: 'Recycled Paper', credits: 8, icon: Recycle, color: '#8B5CF6' },
        { id: 'compost', title: 'Composted Organic Waste', credits: 15, icon: Recycle, color: '#8B5CF6' },
      ]
    },
    {
      title: 'Energy Saving',
      actions: [
        { id: 'led-bulb', title: 'Switched to LED Bulbs', credits: 25, icon: Zap, color: '#F59E0B' },
        { id: 'unplug', title: 'Unplugged Electronics', credits: 8, icon: Zap, color: '#F59E0B' },
        { id: 'ac-temp', title: 'Adjusted AC Temperature', credits: 12, icon: Zap, color: '#F59E0B' },
      ]
    },
    {
      title: 'Sustainable Shopping',
      actions: [
        { id: 'local-produce', title: 'Bought Local Produce', credits: 18, icon: ShoppingBag, color: '#10B981' },
        { id: 'reusable-bag', title: 'Used Reusable Shopping Bag', credits: 5, icon: ShoppingBag, color: '#10B981' },
        { id: 'eco-product', title: 'Bought Eco-Friendly Product', credits: 22, icon: ShoppingBag, color: '#10B981' },
      ]
    },
  ];

  const handleLogAction = () => {
    if (selectedAction) {
      // Here you would typically save to backend
      console.log('Logging action:', selectedAction, notes);
      setSelectedAction(null);
      setNotes('');
      // Show success message or redirect
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.title}>Log Eco Action</Text>
        <Text style={styles.subtitle}>Track your sustainable activities</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {actionCategories.map((category, categoryIndex) => (
          <View key={categoryIndex} style={styles.category}>
            <Text style={styles.categoryTitle}>{category.title}</Text>
            <View style={styles.actionsContainer}>
              {category.actions.map((action) => {
                const IconComponent = action.icon;
                const isSelected = selectedAction === action.id;
                
                return (
                  <TouchableOpacity
                    key={action.id}
                    style={[styles.actionCard, isSelected && styles.selectedAction]}
                    onPress={() => setSelectedAction(action.id)}
                  >
                    <View style={styles.actionHeader}>
                      <View style={[styles.iconContainer, { backgroundColor: action.color + '20' }]}>
                        <IconComponent size={24} color={action.color} />
                      </View>
                      {isSelected && (
                        <View style={styles.checkmark}>
                          <Check size={16} color="#FFFFFF" />
                        </View>
                      )}
                    </View>
                    <Text style={styles.actionTitle}>{action.title}</Text>
                    <View style={styles.creditsContainer}>
                      <Text style={styles.creditsText}>+{action.credits} credits</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}

        {selectedAction && (
          <View style={styles.notesSection}>
            <Text style={styles.notesTitle}>Add Notes (Optional)</Text>
            <TextInput
              style={styles.notesInput}
              placeholder="Add details about your eco action..."
              placeholderTextColor="#6B7280"
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={3}
            />
          </View>
        )}
      </ScrollView>

      {selectedAction && (
        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.logButton} onPress={handleLogAction}>
            <Plus size={20} color="#FFFFFF" />
            <Text style={styles.logButtonText}>Log Action</Text>
          </TouchableOpacity>
        </View>
      )}
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
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  category: {
    marginBottom: 32,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  actionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#374151',
  },
  selectedAction: {
    borderColor: '#00FF88',
    backgroundColor: '#1F2937',
  },
  actionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#00FF88',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
    lineHeight: 18,
  },
  creditsContainer: {
    alignSelf: 'flex-start',
  },
  creditsText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8B5CF6',
  },
  notesSection: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#374151',
  },
  notesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  notesInput: {
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 16,
    color: '#FFFFFF',
    fontSize: 14,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#374151',
  },
  bottomBar: {
    padding: 20,
    paddingBottom: 30,
  },
  logButton: {
    backgroundColor: '#00FF88',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
  },
  logButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
  },
});