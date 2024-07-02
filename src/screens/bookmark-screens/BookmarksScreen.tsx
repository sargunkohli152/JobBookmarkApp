import React, { useRef } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import JobDetails from '../../components/molecules/JobDetails';
import { FlashList } from '@shopify/flash-list';
import { useSelector } from 'react-redux';

const estimatedItemSize = 100;
const keyExtractor = (item: object, index: number) => `${(item as any)?.id}${index}`;

const BookmarksScreen = () => {
  const flashlistRef = useRef<any>();
  const bookmarkedJobs = useSelector(state => state.bookmarks.bookmarks);

  const renderEmpty = () => {
    return (
      <View style={styles.moreLoader}>
       <Text>No jobs bookmarked!</Text>
      </View>
    )
  };

  const renderJobCard = ({ item }: {item: object}) => {
    if(!item.hasOwnProperty('job_role')){
      return null;
    }
    return <JobDetails item={item} isLoading={false}/>
  }

  // if(){
  //   return (
  //     <View style={{ flex: 1 }}>
  //       <FlashList
  //         estimatedItemSize={estimatedItemSize}
  //         data={dummyShimmerData}
  //         renderItem={renderJobCard}
  //         keyExtractor={keyExtractor}
  //         showsVerticalScrollIndicator={false}
  //       />
  //     </View>
  //   )
  // }


  return (
    <View style={{ flex: 1 }}>
      <FlashList
        ref={flashlistRef}
        estimatedItemSize={estimatedItemSize}
        data={bookmarkedJobs}
        renderItem={renderJobCard}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmpty}
        ListHeaderComponent={<View style={{ marginTop: 10 }} />}
        renderScrollComponent={ScrollView}
      />
    </View>
  );
};

export default BookmarksScreen;

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  moreLoader: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
});