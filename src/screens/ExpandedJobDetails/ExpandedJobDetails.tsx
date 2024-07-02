import { View, Text, Pressable, StyleSheet, ActivityIndicator } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../styles/colors';
import Icon from '../../components/atoms/Icon';
import { calculateDaysDifference } from '../../utils/DaysDifference';
import CustomModal from '../../components/organisms/CustomModal';
import { addBookmark, removeBookmark } from '../../redux/actions/bookmarkActions';
import { useDispatch, useSelector } from 'react-redux';

type PrimaryDetailsType = {
  Salary: string;
  Place: string;
  Experience: string;
}

type ItemTypes = {
  id: number,
  job_role: string;
  title: string;
  company_name: string;
  primary_details: PrimaryDetailsType;
  whatsapp_no: string;
  updated_on: string;
  job_hours: string;
}

type RouteParamsType = {
  params: {
    item: ItemTypes;
  };
};

const ExpandedJobDetails = ({ route }: { route: RouteParamsType }) => {
  const navigation = useNavigation();
  const { item } = route.params;
  const dispatch = useDispatch();
  const isJobBookmarked = useSelector(state =>
    state.bookmarks.bookmarks.some(jobItem => jobItem.id === item?.id)
  );
  const jobBookmarks = useSelector(state => state.bookmarks.bookmarks);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDispatching, setIsDispatching] = useState(false);
  const [customModalMessage, setCustomModalMessage] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(isJobBookmarked);
  const [bookmarkedJobs, setBookmarkedJobs] = useState<ItemTypes[]>(jobBookmarks);

  const handleOnPressBookmark = () => {
    setIsDispatching(true);
    try {
      if (isBookmarked) {
        // remove job from bookmarks
        dispatch(removeBookmark(item));
        setIsBookmarked(false);
        const updatedBookmarks = bookmarkedJobs.filter(job => job.id !== item.id);
        setBookmarkedJobs(updatedBookmarks);
        setCustomModalMessage("Job removed from bookmarked jobs");
      } else {
        // Add job to bookmarks
        dispatch(addBookmark(item));
        setIsBookmarked(true);
        const updatedBookmarks = [...bookmarkedJobs, item];
        setBookmarkedJobs(updatedBookmarks);
        setCustomModalMessage("You just bookmarked this job!");
      }
    } catch (error) {
      setCustomModalMessage("Something went wrong, try again later.");
    } finally {
      setIsDispatching(false);
      setIsModalVisible(true);
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const onPressBack = () => {
    navigation.goBack();
  };


  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none"
      }
    });
    return () => navigation.getParent()?.setOptions({
      tabBarStyle: { height: 60 }
    });
  }, [navigation]);

  return (
    <>
      <Pressable onPress={onPressBack} style={styles.backNavigation}>
        <Icon
          size={26}
          icon="backArrow"
          style={{padding: 8}}
          color={colors.darkBlue}
        />
      </Pressable>
      <View style={styles.card}>
        <View style={{flex: 1, backgroundColor: `${colors.white}`}}>
          <LinearGradient 
            useAngle={true}
            angle={80}
            colors={[`${colors.leftGradientWhite}`, `${colors.rightGradientBlue}`]}
            style={styles.linearGradient}>
              <View style={styles.topContainer}>
                <Text 
                  style={styles.jobRole} 
                  numberOfLines={1}
                >
                  {item?.job_role}
                </Text>
                <Text 
                  style={styles.companyName} 
                  numberOfLines={1} 
                >
                  {item?.company_name}
                </Text>
              </View>
              <View style={styles.circularBox}>
                <Text 
                  style={[styles.jobDetailPointersSubText, { color: colors.darkBlue }]}
                >
                  {item?.job_hours}
                </Text>
              </View>
          </LinearGradient>
          <View style={styles.jobInfo}>
            <View style={styles.iconValueContainer}>
              <View>
                <Icon
                  size={30.8}
                  icon="moneyIcon"
                />
              </View>
              <View style={styles.valueTextContainer}>
                <Text 
                  style={styles.jobDetailPointersHeading} 
                >
                  Salary
                </Text>
                <Text 
                  style={styles.jobDetailPointersSubText} 
                  numberOfLines={1}
                >
                  {item?.primary_details?.Salary === '-' ? "not mentioned" : item?.primary_details?.Salary}
                </Text>
              </View>
            </View>
            <View style={styles.iconValueContainer}>
              <View>
                <Icon 
                  size={30.8}
                  icon="mapIcon"
                />
              </View>
              <View style={styles.valueTextContainer}>
                <Text 
                  style={styles.jobDetailPointersHeading}
                >
                  Location
                </Text>
                <Text 
                  style={styles.jobDetailPointersSubText} 
                  numberOfLines={1}
                >
                  {item?.primary_details?.Place}
                </Text>
              </View>
            </View>
            <View style={styles.iconValueContainer}>
              <View>
                <Icon
                  size={30.8}
                  icon="empTypeIcon"
                />
              </View>
              <View style={styles.valueTextContainer}>
                <Text 
                  style={styles.jobDetailPointersHeading}
                >
                  Contact
                </Text>
                <Text 
                  style={styles.jobDetailPointersSubText} 
                  numberOfLines={1}
                >
                  {item?.whatsapp_no}
                </Text>
              </View>
            </View>
            <View style={styles.iconValueContainer}>
              <View>
                <Icon
                  size={30.8}
                  icon="watchIcon"
                />
              </View>
              <View style={styles.valueTextContainer}>
                <Text 
                  style={styles.jobDetailPointersHeading}
                >
                  Experience
                </Text>
                <Text 
                  style={styles.jobDetailPointersSubText} 
                  numberOfLines={1}
                >
                  {item?.primary_details?.Experience}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.horizontalLine} />
          <View style={styles.detailContainers}>
            <Text 
              style={styles.titleHeadings}
            >
              About
            </Text>
            <Text
              style={styles.titleDetails}
              numberOfLines={2}
            >
              {item?.title}
            </Text>
          </View>
          <View style={styles.horizontalLine} />
          <View style={styles.detailContainers}>
            <Text 
              style={styles.titleHeadings}
            >
              Last Updated
            </Text>
            <Text
              style={styles.titleDetails}
            >
              {`Updated ${calculateDaysDifference(item?.updated_on)}`}
            </Text>
          </View>
          <Pressable
            style={styles.bookmarkButton(isBookmarked)}
            onPress={handleOnPressBookmark}
          >
            <Text style={styles.bookmarkButtonText(isBookmarked)}>
              {isBookmarked ? 'Remove Bookmark' : 'Bookmark Job'}

              </Text>
          </Pressable>
        </View>
      </View>
      <CustomModal
        isVisible={isModalVisible}
        message={customModalMessage}
        onClose={closeModal}
      />
      {isDispatching && (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color={colors.rightGradientBlue} />
          <Text>HHIHIHIH</Text>
        </View>
      )}
    </>
  )
}

export default ExpandedJobDetails;

const styles = StyleSheet.create({
  backNavigation: {
    marginRight: 20,
    marginLeft: 20,
    marginTop: 10,
    backgroundColor: `${colors.white}`,
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: `${colors.buttonBorder}`,
    borderRadius: 100,
    padding: 5
  },
  linearGradient: {
    borderTopRightRadius: 7,
    borderTopLeftRadius: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 130,
    overflow: "hidden",
  },
  card: {
    backgroundColor: `${colors.white}`,
    marginRight: 20,
    marginLeft: 20,
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: `${colors.black}`,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    overflow: "hidden",
    flex: 1,
  },
  topContainer:{
    marginBottom: 10,
    paddingLeft: 20,
    width: "60%",
  },
  circularBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 75,
    width: 75,
    marginRight: 25,
    borderRadius: 100,
    backgroundColor: `${colors.white}`,
    shadowColor: `${colors.black}`,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    overflow: "hidden",
  },
  jobInfo: {
    marginHorizontal: 35,
    display: 'flex',
    justifyContent: 'space-evenly', 
    height: "47.5%",
  },
  iconValueContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    marginRight: 15,
  },
  valueTextContainer: {
    flexDirection: "column",
    gap: 5,
  },
  jobDetailPointersHeading: {
    fontWeight: '600',
  },
  titleHeadings: {
    fontWeight: '500',
    fontSize: 16,
  },
  titleDetails: {
    lineHeight: 20,
    fontWeight: "regular",
    fontSize: 14 
  },
  jobDetailPointersSubText: {
    fontWeight: 'regular',
  },
  jobRole: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  companyName: {
    fontWeight: 'semibold',
  },
  horizontalLine: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: `${colors.dimGray}`,
    marginHorizontal: 20,
  },
  detailContainers: {
    marginHorizontal: 20,
    marginVertical: 20,
    marginTop: 15,
    gap: 4,
  },
  bookmarkButton: (isBookmarked: boolean) => ({
    backgroundColor: isBookmarked ? colors.white : colors.darkBlue,
    borderWidth: 1.3,
    borderColor: colors.darkBlue,
    padding: 10,
    borderRadius: 100,
    alignItems: 'center',
    width: '80%',
    margin: 'auto',
    shadowColor: `${colors.black}`,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  }),
  bookmarkButtonText: (isBookmarked: boolean) => ({
    color: isBookmarked ? colors.darkBlue : colors.white,
    fontSize: 18,
    fontWeight: '700',
  }),
  activityIndicatorContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.opacityOverlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
});