import React, { memo } from 'react';
import { View, StyleSheet, Pressable, Image } from 'react-native';
import Text from '../atoms/Text';
import Icon from '../atoms/Icon';
import LinearGradient from 'react-native-linear-gradient';
import { calculateDaysDifference } from '../../utils/DaysDifference';
import { colors } from '../../styles/colors';
import { useNavigation } from '@react-navigation/native';

type PrimaryDetailsTypes = {
  Salary?: string;
  Place?: string;
  Experience?: string;
}

type ItemTypes = {
  id: number,
  job_role: string;
  title: string;
  company_name: string;
  primary_details: PrimaryDetailsTypes;
  whatsapp_no: string;
  updated_on: string;
  job_hours: string;
}

const JobDetails = ({ item, isLoading }: { item: ItemTypes, isLoading: boolean}) => {
  const navigation = useNavigation();

  const handleOnPressJobCard = () => {
    navigation.navigate("ExpandedJobDetails", {
      item: item,
    });
  };

  return (
    <Pressable style={styles.card} onPress={handleOnPressJobCard} disabled={isLoading}>
      <LinearGradient 
        useAngle={true}
        angle={80}
        colors={[`${colors.leftGradientWhite}`, `${!isLoading ? colors.rightGradientBlue : colors.rightGradientShimmerBlue}`]}
        style={styles.linearGradient}>
          <View style={styles.topContainer}>
            <Text 
              style={styles.jobRole} 
              numberOfLines={1} 
              isLoading={isLoading} 
              shimmerStyle={styles.defaultShimmerStyle} 
            >
              {item?.job_role}
            </Text>
            <Text 
              style={styles.companyName} 
              numberOfLines={1} 
              isLoading={isLoading} 
              shimmerStyle={styles.defaultShimmerStyle}
            >
              {item?.company_name}
            </Text>
          </View>
          <View style={styles.circularBox}>
            <Text 
              style={[styles.jobDetailPointersSubText, { color: colors.darkBlue }]}
              isLoading={isLoading}
              shimmerStyle={[styles.defaultShimmerStyle, { width: "70%" }]}
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
              isLoading={isLoading}
              shimmerStyle={styles.defaultShimmerStyle}
            />
          </View>
          <View style={styles.valueTextContainer}>
            <Text 
              style={styles.jobDetailPointersHeading} 
              isLoading={isLoading} 
              shimmerStyle={[styles.defaultShimmerStyle, {width: "60%"}]}
            >
              Salary
            </Text>
            <Text 
              style={styles.jobDetailPointersSubText} 
              numberOfLines={1}
              isLoading={isLoading}
              shimmerStyle={[styles.defaultShimmerStyle, {width: "80%", height: 10}]}
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
              isLoading={isLoading}
              shimmerStyle={styles.defaultShimmerStyle}
            />
          </View>
          <View style={styles.valueTextContainer}>
            <Text 
              style={styles.jobDetailPointersHeading}
              isLoading={isLoading} 
              shimmerStyle={[styles.defaultShimmerStyle, {width: "60%"}]}
            >
              Location
            </Text>
            <Text 
              style={styles.jobDetailPointersSubText} 
              numberOfLines={1}
              isLoading={isLoading}
              shimmerStyle={[styles.defaultShimmerStyle, {width: "80%", height: 10}]}
            >
              {item?.primary_details?.Place}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.jobInfo}>
        <View style={styles.iconValueContainer}>
          <View>
            <Icon
              size={30.8}
              icon="empTypeIcon"
              isLoading={isLoading}
              shimmerStyle={styles.defaultShimmerStyle}
            />
          </View>
          <View style={styles.valueTextContainer}>
            <Text 
              style={styles.jobDetailPointersHeading}
              isLoading={isLoading} 
              shimmerStyle={[styles.defaultShimmerStyle, {width: "60%"}]}
            >
              Contact
            </Text>
            <Text 
              style={styles.jobDetailPointersSubText} 
              numberOfLines={1}
              isLoading={isLoading}
              shimmerStyle={[styles.defaultShimmerStyle, {width: "80%", height: 10}]}
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
              isLoading={isLoading}
              shimmerStyle={styles.defaultShimmerStyle}
            />
          </View>
          <View style={styles.valueTextContainer}>
            <Text 
              style={styles.jobDetailPointersHeading}
              isLoading={isLoading} 
              shimmerStyle={[styles.defaultShimmerStyle, {width: "60%"}]}
            >
              Experience
            </Text>
            <Text 
              style={styles.jobDetailPointersSubText} 
              numberOfLines={1}
              isLoading={isLoading}
              shimmerStyle={[styles.defaultShimmerStyle, {width: "80%", height: 10}]}
            >
              {item?.primary_details?.Experience}
            </Text>
          </View>
        </View>
      </View>
      <View 
        style={[
            styles.horizontalLine, 
            {
              backgroundColor: `${isLoading ? colors.platinum : colors.rightGradientBlue}`
            }
          ]}
        />
      <View style={styles.bottomContainer}>
        <Text isLoading={isLoading} shimmerStyle={[styles.defaultShimmerStyle, {width: "40%"}]}>
          {`Updated ${calculateDaysDifference(item?.updated_on)}`}
        </Text>
      </View>
    </Pressable>
  );
}

export default memo(JobDetails);

const styles = StyleSheet.create({
  linearGradient: {
    borderTopRightRadius: 7,
    borderTopLeftRadius: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 100,
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
      height: 2,
    },
    shadowOpacity: 0.3,
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
    height: 70,
    width: 70,
    marginRight: 20,
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
    padding: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-between',
    flex: 1,
  },
  iconValueContainer: {
    flexDirection: "row",
    gap: 7,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "50%",
    marginRight: 15,
  },
  valueTextContainer: {
    flexDirection: "column",
    gap: 5,
    width: "70%"
  },
  jobDetailPointersHeading: {
    fontWeight: '500',
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
    height: StyleSheet.hairlineWidth * 2,
    marginHorizontal: 20,
  },
  bottomContainer: {
    paddingHorizontal: 20,
    height: 50,
    flex: 1,
    justifyContent: 'center'
  },
  defaultShimmerStyle: {
    borderRadius: 50,
  }
});