import React, {useEffect, useState} from 'react';
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
  Alert,
} from 'react-native';
import _ from 'lodash';
import {
  getContactById,
  resetContact,
  deleteContact,
  getContacts,
  resetPostContact,
} from '../../../actions/';
import MI from 'react-native-vector-icons/MaterialIcons';
const styles = StyleSheet.create({
  viewParentHeader: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewBack: {flexDirection: 'row', alignItems: 'center'},
  txtHeader: {
    color: '#0b70e2',
    fontFamily: 'SFUIText-Regular',
    fontSize: 15,
  },
  viewLoading: {
    width: Dimensions.get('window').width * 1,
    height: Dimensions.get('screen').height * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewName: {marginBottom: 30},
  imgPhoto: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 100,
  },
  viewImgDefault: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtImgDefault: {
    position: 'absolute',
    fontSize: 45,
    fontFamily: 'SFUIText-Bold',
    color: '#fff',
  },
  viewHeaderImg: {justifyContent: 'center', alignItems: 'center'},
  txtName: {
    fontSize: 25,
    fontFamily: 'SFUIText-Regular',
    color: '#000',
    textAlign: 'center',
    marginTop: 12,
  },
  txtTitleContent: {
    fontSize: 13,
    fontFamily: 'SFUIText-Regular',
    color: '#000',
  },
  txtDeleteContact: {
    fontSize: 13,
    fontFamily: 'SFUIText-Regular',
    color: 'red',
  },
  viewNotes: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
    backgroundColor: '#fff',
    width: '98%',
    alignSelf: 'center',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginTop: 10,
    height: 100,
  },
  cardSection: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
    backgroundColor: '#fff',
    width: '98%',
    alignSelf: 'center',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginTop: 10,
  },
  txtDescContent: {
    fontSize: 13,
    fontFamily: 'SFUIText-Regular',
    color: '#4a4a4a',
    marginTop: 5,
  },
  txtHeaderContent: {
    fontSize: 15,
    fontFamily: 'SFUIText-Regular',
    color: '#000',
    marginBottom: 15,
  },
});
const Detail = props => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const {navigation, route, setIsEdit} = props;
  const {params} = route;
  const {val} = params;
  const detailContactData = useSelector(store => store.data?.contact?.data);
  const successDeleteContact = useSelector(store => store.data?.message);
  let fullName = '';
  if (detailContactData !== undefined) {
    fullName = detailContactData.firstName + ' ' + detailContactData.lastName;
  }
  useEffect(() => {
    dispatch(getContactById(dispatch, val.id));
  }, []);
  useEffect(() => {
    if (detailContactData !== undefined) {
      setLoading(false);
    }
  }, [detailContactData]);
  useEffect(() => {
    if (successDeleteContact !== null) {
      if (successDeleteContact === 'contact deleted') {
        dispatch(resetPostContact());
        dispatch(getContacts(dispatch));
        navigation.goBack();
      }
    }
  }, [successDeleteContact]);
  const handleDeleteContact = () => {
    dispatch(deleteContact(dispatch, val.id));
  };
  return (
    <View>
      <View style={styles.viewParentHeader}>
        <TouchableOpacity
          onPress={() => {
            dispatch(resetContact());
            navigation.goBack();
          }}
          style={styles.viewBack}>
          <MI name="arrow-back-ios" size={22} color={'#0b70e2'} />
          <Text style={styles.txtHeader}>Contacts</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsEdit(true)}>
          <Text style={styles.txtHeader}>Edit</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <View style={styles.viewLoading}>
          <ActivityIndicator size={'large'} color={'#4a4a4a'} />
        </View>
      ) : (
        <View>
          <View style={styles.viewHeaderImg}>
            {detailContactData?.photo !== 'N/A' ? (
              <Image
                source={{
                  uri: detailContactData.photo,
                }}
                style={styles.imgPhoto}
              />
            ) : (
              <View style={styles.viewImgDefault}>
                <Text style={styles.txtImgDefault}>
                  {detailContactData.firstName[0]}
                </Text>
              </View>
            )}
          </View>
          <View style={styles.viewName}>
            <Text style={styles.txtName}>{fullName}</Text>
          </View>

          <View style={styles.cardSection}>
            <Text style={styles.txtHeaderContent}>Detail Information *</Text>
            <View>
              <Text style={styles.txtTitleContent}>First Name</Text>
              <Text style={styles.txtDescContent}>
                {detailContactData?.firstName}
              </Text>
            </View>
          </View>
          <View style={styles.cardSection}>
            <View>
              <Text style={styles.txtTitleContent}>Last Name</Text>
              <Text style={styles.txtDescContent}>
                {detailContactData?.lastName}
              </Text>
            </View>
          </View>
          <View style={styles.cardSection}>
            <View>
              <Text style={styles.txtTitleContent}>Age</Text>
              <Text style={styles.txtDescContent}>
                {detailContactData?.age}
              </Text>
            </View>
          </View>
          <View style={styles.viewNotes}>
            <View>
              <Text style={styles.txtTitleContent}>Notes</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() =>
              Alert.alert('', 'Delete this Contact ?', [
                {
                  text: 'Cancel',
                  onPress: () => {},
                  style: 'cancel',
                },
                {text: 'Yes', onPress: () => handleDeleteContact()},
              ])
            }
            style={styles.cardSection}>
            <View>
              <Text style={styles.txtDeleteContact}>Delete Contact</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Detail;
