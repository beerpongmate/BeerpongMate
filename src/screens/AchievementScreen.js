import React from 'react';
import { View, StyleSheet, SectionList, Image, SafeAreaView } from 'react-native';
import partition from 'lodash/partition';
import { useAchievements } from '../components/Providers/WithAchievements';
import ThemedText from '../components/ThemedComponents/ThemedText';
import theme from '../../assets/theme';

const { cupRed, cupBlue } = theme.colors;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 4,
    marginHorizontal: 5,
    marginVertical: 5
  },
  textContainer: {
    flexDirection: 'column',
    flexShrink: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  name: {
    flexWrap: 'wrap',
    color: '#fff',
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center'
  },
  description: {
    flexWrap: 'wrap',
    color: '#fff',
    fontSize: 16,
    textAlign: 'center'
  },
  containerRight: {
    flex: 1,
    // height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  sectionHeader: {
    margin: 5,
    fontSize: 28
  },
  sectionHeaderContainer: {
    backgroundColor: '#e6e8eb',
    borderColor: 'grey',
    borderTopWidth: 1,
    borderBottomWidth: 1
  },
  lock: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 150,
    backgroundColor: '#4d4e4f',
    opacity: 0.95,
    alignItems: 'center',
    justifyContent: 'center'
  },
  lockText: {
    fontSize: 80,
    color: '#fff'
  }
});


const renderItem = ({ item: { image, name, description, unlocked } }) => (
  <View style={[styles.itemContainer, {borderColor: unlocked ? cupRed : cupBlue, backgroundColor: unlocked ? cupRed : cupBlue }]}>
    <Image style={{ width: 150, height: 150 , backgroundColor: '#fff' }} resizeMode="contain" source={image} />
    {!unlocked && <View style={styles.lock}><ThemedText style={styles.lockText}>?</ThemedText></View> }
    <View style={styles.containerRight}>
      <View style={styles.textContainer}>
        <ThemedText style={styles.name}>{name}</ThemedText>
        <ThemedText style={styles.description}>{description}</ThemedText>
      </View>
    </View>
  </View>
  );

const renderHeader = ({ section: { header } }) => <View style={styles.sectionHeaderContainer}><ThemedText style={styles.sectionHeader}>{header}</ThemedText></View>

const AchievementsScreen = () => {
  const { achievementData } = useAchievements();
  
  const [unlocked, locked] = partition(achievementData, ({ unlocked: unl }) => unl )
  const sectionData = [{
      header: 'Unlocked',
      data: unlocked
    },
    {
      header: 'Locked',
      data: locked
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <SectionList sections={sectionData} renderItem={renderItem} renderSectionHeader={renderHeader} />
      </View>
    </SafeAreaView>
  );
};

export default AchievementsScreen;