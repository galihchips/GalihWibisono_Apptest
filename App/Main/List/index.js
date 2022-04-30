import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import _ from 'lodash';

const styles = StyleSheet.create({
  viewParentList: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    paddingBottom: 5,
    marginBottom: 5,
    borderBottomWidth: 0.5,
  },

  txtList: {
    fontFamily: 'SFUIText-Bold',
    fontSize: 18,
    color: '#000',
  },
  txtLetter: {fontFamily: 'SFUIText-Bold', fontSize: 15, color: 'grey'},
  viewImgDefault: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  txtImgDefault: {
    position: 'absolute',
    fontSize: 22,
    fontFamily: 'SFUIText-Bold',
    color: '#fff',
  },
  imgPhoto: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    borderRadius: 100,
    marginRight: 15,
  },
  viewParentLetter: {
    marginTop: 10,
  },
  viewMarginList: {marginBottom: Dimensions.get('screen').height * 0.2},
});
const List = props => {
  const {valueSearch, navigation} = props;
  const dataContact = useSelector(store => store.data?.listContact?.data);
  let dataFinal = dataContact;
  if (dataContact !== undefined) {
    dataFinal = dataFinal.filter(val => {
      const fullName = val.firstName + val.lastName;
      return fullName.toLowerCase().includes(valueSearch);
    });
  }

  const renderList = ({item, index}) => {
    return (
      <>
        <View>
          <View style={styles.viewParentLetter}>
            <Text style={styles.txtLetter}>{item.letter}</Text>
          </View>

          {item.contacts.map((val, idx) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('edit', {val})}
                key={idx}
                style={styles.viewParentList}>
                {val.photo !== 'N/A' ? (
                  <Image
                    source={{
                      uri: val.photo,
                    }}
                    style={styles.imgPhoto}
                  />
                ) : (
                  <View style={styles.viewImgDefault}>
                    <Text style={styles.txtImgDefault}>{val.firstName[0]}</Text>
                  </View>
                )}
                <Text style={styles.txtList}>{val.firstName + ' '}</Text>
                <Text style={styles.txtList}>{val.lastName}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </>
    );
  };
  return (
    <View>
      <FlatList
        style={styles.viewMarginList}
        data={_(dataFinal)
          .groupBy('firstName[0]')
          .map((contacts, letter) => ({letter, contacts}))
          .value()}
        renderItem={renderList}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
export default List;
