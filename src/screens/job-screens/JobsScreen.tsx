import React, { useState, useRef, useEffect } from "react";
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from "axios";
import Text from "../../components/atoms/Text";
import JobDetails from "../../components/molecules/JobDetails";
import { colors } from "../../styles/colors";
import { FlashList } from "@shopify/flash-list";
import CustomModal from "../../components/organisms/CustomModal";
import { dummyShimmerData } from "../../dummyData/dummyShimmerData";
import NetInfo from "@react-native-community/netinfo";

const estimatedItemSize = 100;
const keyExtractor = (item: object, index: number) => `${(item as any)?.id}${index}`;

const JobsScreen = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean | null>(false);
  const flashlistRef = useRef<any>();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
  
    return () => {
      unsubscribe();
    };
  });

  const fetchJobs = async ({ pageParam = 1 }:  { pageParam: number }) => {
    //we can move the api calls, api constants and/or axios configurations 
    //to a different network folder for good code practice. Since we're just calling
    //one api, we'll keep it here for simplicity (for time being).
    try {
      const response = await axios.get(`https://testapi.getlokalapp.com/common/jobs?page=${pageParam}`);
      return response.data.results ?? []; 
    } catch (error) {
      setIsModalOpen(true);
      return [];
    }
  };

  const {
    data, 
    isLoading, 
    status, 
    fetchNextPage, 
    hasNextPage,
    isFetchingNextPage,  
    refetch 
  } = useInfiniteQuery({
    queryKey: ['jobs'],
    queryFn: fetchJobs,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if(lastPage.length === 0){
        return undefined;
      }
      return allPages.length + 1;
    },
  });


  const renderEmpty = () => {
    return (
      <View style={styles.moreLoader}>
       <Text>No jobs to show</Text>
      </View>
    )
  };

  const renderJobCard = ({ item }: {item: object}) => {
    if(!item.hasOwnProperty('job_role')){
      return null;
    }
    return <JobDetails item={item} isLoading={isLoading}/>
  }

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refetch();
    } catch (error: Error | any | unknown) {
      setIsModalOpen(true);
    } finally {
      setRefreshing(false);
    }
  }

  const onClose = () => {
    setIsModalOpen(false);
  }

  if (status === 'error') {
    setIsModalOpen(true);
    return;
  }

  if(!isConnected){
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 5}}>
        <Text style={{ fontSize: 26, color: colors.dimGray }}>
          No internet connection
        </Text>
        <Text style={{ fontSize: 18, color: colors.darkBlue }}>
          but you can still see your bookmarks!
        </Text>
      </View>
    )
  }

  if(isLoading){
    return (
      <View style={{ flex: 1 }}>
        <FlashList
          estimatedItemSize={estimatedItemSize}
          data={dummyShimmerData}
          renderItem={renderJobCard}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
        />
      </View>
    )
  }


  return (
    <View style={{ flex: 1 }}>
      <FlashList
        ref={flashlistRef}
        estimatedItemSize={estimatedItemSize}
        data={data?.pages.flatMap(page => page)}
        renderItem={renderJobCard}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmpty}
        refreshControl={
          <RefreshControl
            tintColor={colors.dimGray}
            colors={[colors.dimGray]}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        ListHeaderComponent={<View style={{ marginTop: 10 }} />}
        ListFooterComponent={
          hasNextPage && isFetchingNextPage ? (
            <View style={styles.moreLoader}>
              <Pressable onPress={fetchNextPage}>
                <ActivityIndicator color={colors.dimGray}/>
                <Text>Loading more jobs...</Text>
              </Pressable>
            </View>
          ) : (
            <View />
          )
        }
        onEndReached={fetchNextPage} 
        onEndReachedThreshold={0.1}
        renderScrollComponent={ScrollView}
      />
      <CustomModal
        isVisible={isModalOpen}
        message="Something went wrong, try again later."
        onClose={onClose}
      />
    </View>
  );
};

export default JobsScreen;

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
