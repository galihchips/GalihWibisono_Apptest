import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Keyboard,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {getContacts} from '../actions/';
import Io from 'react-native-vector-icons/Ionicons';
import List from './List';

const styles = StyleSheet.create({
  txtHeader: {
    fontFamily: 'SFUIText-Bold',
    fontSize: 30,
    color: '#000',
    letterSpacing: 0,
  },
  viewHeader: {padding: 0},
  viewAdd: {alignSelf: 'flex-end', padding: 8},
  viewContent: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  viewLoading: {
    width: Dimensions.get('window').width * 1,
    height: Dimensions.get('screen').height * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewSearch: onFocus => ({
    backgroundColor: '#e6e6e6',
    padding: 1,
    borderRadius: 10,
    paddingLeft: 30,
    width: onFocus ? '85%' : '100%',
  }),
  viewParentSearch: {flexDirection: 'row', marginTop: 10, marginBottom: 10},
  viewIconSearch: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    height: '100%',
    left: 5,
  },
  viewCancelSearch: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '18%',
  },
  txtCancelSearch: {
    color: '#007AFF',
    fontFamily: 'SFUIText-Regular',
    fontSize: 15,
    textAlign: 'center',
  },
  viewMarginList: {marginBottom: Dimensions.get('screen').height * 0.2},
});
const Main = props => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const [valueSearch, setValueSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [onFocus, setOnFocus] = useState(false);
  const fetchingContact = useSelector(store => store.data?.fetching);
  useEffect(() => {
    if (!fetchingContact) setRefreshing(false);
  }, [fetchingContact]);
  useEffect(() => {
    dispatch(getContacts(dispatch));
  }, []);
  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getContacts(dispatch));
  };
  return (
    <View>
      <View style={styles.viewHeader}>
        <TouchableOpacity
          onPress={() => navigation.navigate('add')}
          style={styles.viewAdd}>
          <Io name={'add'} size={30} color={'#007AFF'} />
        </TouchableOpacity>
      </View>
      <View style={styles.viewContent}>
        <Text style={styles.txtHeader}>Contacts</Text>
        <View style={styles.viewParentSearch}>
          <TextInput
            placeholder="Search"
            value={valueSearch}
            style={styles.viewSearch(onFocus)}
            placeholderTextColor={'grey'}
            onFocus={() => setOnFocus(true)}
            onBlur={() => setOnFocus(false)}
            onChangeText={text => setValueSearch(text)}
          />
          <View style={styles.viewIconSearch}>
            <Io name="search" color={'grey'} size={20} />
          </View>
          {onFocus && (
            <TouchableOpacity
              onPress={() => {
                Keyboard.dismiss();
                setOnFocus(false);
                setValueSearch('');
              }}
              style={styles.viewCancelSearch}>
              <Text style={styles.txtCancelSearch}>Cancel</Text>
            </TouchableOpacity>
          )}
        </View>
        {fetchingContact ? (
          <View style={styles.viewLoading}>
            <ActivityIndicator size={'large'} color={'#4a4a4a'} />
          </View>
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => onRefresh()}
              />
            }
            showsVerticalScrollIndicator={false}
            style={styles.viewMarginList}>
            <List valueSearch={valueSearch} navigation={navigation} />
          </ScrollView>
        )}
      </View>
    </View>
  );
};
export default Main;
