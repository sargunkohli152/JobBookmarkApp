import { StyleSheet, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler';
import { colors } from '../../styles/colors';

const ListHeader = ({ handleSearch }: {handleSearch: (text: string) => void}) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput 
        onChangeText={handleSearch} 
        style={styles.textInput} 
        placeholder='Search for a job...'
      />
    </View>
  )
}

export default ListHeader;

const styles = StyleSheet.create({
  searchContainer: { 
    flex: 1,
    flexDirection: 'row',
    justifyContent: "flex-start",
    alignItems: "center",
    height: 40, 
    margin: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.dimGray,
    overflow: "hidden",
    textAlign: "center",
  },
  textInput: {
    fontSize: 15,
    marginLeft: 10,
    padding: 5,
  },
})