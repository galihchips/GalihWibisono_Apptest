import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
  Keyboard,
  FlatList,
} from 'react-native';
import _ from 'lodash';
import MI from 'react-native-vector-icons/MaterialIcons';
import {postContact, getContacts, resetPostContact} from '../../actions/';
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
  txtHeaderSave: valid => ({
    color: valid ? '#0b70e2' : '#cacaca',
    fontFamily: 'SFUIText-Regular',
    fontSize: 15,
  }),
  txtHeaderTitle: {
    color: '#000',
    fontFamily: 'SFUIText-Bold',
    fontSize: 18,
  },
  viewLoading: {
    width: Dimensions.get('window').width * 1,
    height: Dimensions.get('screen').height * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewName: {marginBottom: 30},
  imgPhoto: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    borderRadius: 100,
  },
  viewImgDefault: {
    width: 120,
    height: 120,
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
    textTransform: 'capitalize',
  },
  viewHeaderImg: {justifyContent: 'center', alignItems: 'center'},
  txtAddPhoto: {
    fontFamily: 'SFUIText-Bold',
    color: '#0b70e2',
    fontSize: 15,
    marginTop: 10,
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
    marginTop: 20,
  },
  txtInputForm: {
    fontFamily: 'SFUIText-Regular',
    color: '#000',
    fontSize: 15,
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
    paddingVertical: 5,
    marginVertical: 5,
    marginHorizontal: 15,
    paddingHorizontal: 0,
  },
  txtInputAge: {
    fontFamily: 'SFUIText-Regular',
    color: '#000',
    fontSize: 15,
    paddingVertical: 5,
    marginVertical: 5,
    marginHorizontal: 15,
    paddingHorizontal: 0,
  },
  centeredView: {
    justifyContent: 'center',
  },
  modalView: {
    width: '90%',
    height: '70%',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontFamily: 'SFUIText-Bold',
    color: '#000',
    fontSize: 18,
    marginTop: 5,
    marginBottom: 10,
  },
  imgAvatar: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    margin: 8,
    borderRadius: 25,
  },
  bgShadow: {
    width: 100,
    height: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    margin: 8,
    borderRadius: 25,
  },
  btnChooseImg: {
    alignSelf: 'flex-end',
  },
  removePhoto: {
    position: 'absolute',
    width: '40%',
    right: '0.5%',
    top: '5%',
    alignSelf: 'center',
  },
});
const initialContactForm = {
  firstName: '',
  lastName: '',
  age: '',
  photo: '',
};

const Add = props => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const [contactForm, setContactForm] = useState(initialContactForm);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState('');
  const successAddContact = useSelector(store => store.data?.message);
  const listAvatar = [
    'https://www.pngfind.com/pngs/m/5-52097_avatar-png-pic-vector-avatar-icon-png-transparent.png',
    'https://www.pngfind.com/pngs/m/114-1146521_girl-avatar-png-picture-female-avatar-no-face.png',
    'https://www.pngfind.com/pngs/m/114-1146554_girl-avatar-png-pic-female-avatar-icon-transparent.png',
    'https://www.pngfind.com/pngs/m/521-5217216_male-icons-free-and-clipart-avatar-hd-png.png',
  ];
  let valid = false;
  if (
    contactForm.firstName !== '' &&
    contactForm.lastName !== '' &&
    contactForm.age !== ''
  ) {
    valid = true;
  }

  useEffect(() => {
    if (successAddContact !== null) {
      dispatch(resetPostContact());
      dispatch(getContacts(dispatch));
      navigation.goBack();
    }
  }, [successAddContact]);
  const handleSave = () => {
    let data = {
      firstName: contactForm.firstName,
      lastName: contactForm.lastName,
      age: contactForm.age,
      photo: contactForm.photo !== '' ? contactForm.photo : 'N/A',
    };
    dispatch(postContact(dispatch, data));
  };
  const renderAvatar = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => setSelectedPhoto(item)}>
        <Image source={{uri: item}} style={styles.imgAvatar} />
        {selectedPhoto === item && <View style={styles.bgShadow} />}
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <View style={styles.viewParentHeader}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.viewBack}>
          <Text style={styles.txtHeader}>Cancel</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.txtHeaderTitle}>New Contact</Text>
        </View>
        <TouchableOpacity disabled={!valid} onPress={() => handleSave()}>
          <Text style={styles.txtHeaderSave(valid)}>Done</Text>
        </TouchableOpacity>
      </View>
      <View>
        <View style={styles.viewHeaderImg}>
          {contactForm.photo !== '' ? (
            <Image
              source={{
                uri: contactForm.photo,
              }}
              style={styles.imgPhoto}
            />
          ) : contactForm.firstName ? (
            <View style={styles.viewImgDefault}>
              <Text style={styles.txtImgDefault}>
                {contactForm.firstName[0]}
              </Text>
            </View>
          ) : (
            <Image
              source={{
                uri: 'https://cdn141.picsart.com/321556657089211.png',
              }}
              style={styles.imgPhoto}
            />
          )}
          {contactForm.photo !== '' && (
            <TouchableOpacity
              style={styles.removePhoto}
              onPress={() => setContactForm({...contactForm, photo: ''})}>
              <MI name="cancel" size={30} color={'red'} />
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.txtAddPhoto}>Add Photo</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.cardSection}>
        <TextInput
          style={styles.txtInputForm}
          placeholder="First name"
          placeholderTextColor={'grey'}
          value={contactForm.firstName}
          autoFocus
          onChangeText={text =>
            setContactForm({...contactForm, firstName: text})
          }
        />
        <TextInput
          style={styles.txtInputForm}
          placeholder="Last name"
          placeholderTextColor={'grey'}
          value={contactForm.lastName}
          onChangeText={text =>
            setContactForm({...contactForm, lastName: text})
          }
        />
        <TextInput
          style={styles.txtInputAge}
          placeholder="Age"
          placeholderTextColor={'grey'}
          value={contactForm.age}
          keyboardType="number-pad"
          onChangeText={text => setContactForm({...contactForm, age: text})}
          onEndEditing={() => Keyboard.dismiss()}
        />
      </View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                width: '95%',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setSelectedPhoto('');
                  setModalVisible(false);
                }}
                style={styles.btnChooseImg}>
                <Text style={styles.txtHeader}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setContactForm({...contactForm, photo: selectedPhoto});
                  setModalVisible(false);
                  setSelectedPhoto('');
                }}
                style={styles.btnChooseImg}>
                <Text style={styles.txtHeader}>Done</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.modalText}>Choose your photo</Text>
            <View>
              <FlatList
                numColumns={2}
                data={listAvatar}
                renderItem={renderAvatar}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Add;
